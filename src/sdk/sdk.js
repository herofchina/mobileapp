import {get,post} from './http';
import logger from './logger';
var  sdk=(function(){

  var SDK=function(){
    //微信配置首页地址
    //this.PROD_NAME='Repo/sevendays';

    this.PROD_NAME='htmlBin/mobile-app';

    //新版本的微信签权接口验证
    this.AUTH_HOST = '//tweb.hundun.cn/webcore';
    
    //微信跳转根地址
    this.TOOLS_HOST='http://ttools.hundun.cn/';

    //微信验证权限地址
    this.WXAUTHORIZEURL=this.TOOLS_HOST+this.PROD_NAME+'/authorize.html';//'http://hdyxs.hundun.cn/testRepo/sevens/authorize.html';
    

    this.TOOLS_URL=this.TOOLS_HOST+this.PROD_NAME+'/index.html';

    //基本接口的根目录
    this.ROOTHOST='//tuser.hundun.cn';//'http://123.57.143.47:8000';//'//tuser.hundun.cn';
    //this.ROOTHOST='//user.hundun.cn';
    //存储对象
    this.localStorage=window.localStorage;
    //location对象
    this.location=window.location;
    //是否跳转到微信授权页面
    this.isDirectWXURL=true;
    //模拟微信登录方法参数
    this.wxLogin={
            channel:'h5',
            head_img:'',//头像参数
            nickname:'',//昵称
            openid:'',//打开id
            type:'h5wx',//类型
            unionid:''//微信id
    }
    this.APP_ID='wx5ba7e61c94b8c010';
    //生成微信分享链接地址

    this.createWXShareURL=function(channelType,userId){
        var shareURL='';
        if(userId===""||userId==="undefined"||typeof userId==="undefined"){
              shareURL= this.TOOLS_HOST+this.PROD_NAME+'/authorize.html';//'http://hdyxs.hundun.cn/testRepo/sevens/authorize.html?channelType='+channelType;
        }else{
              shareURL= this.TOOLS_HOST+this.PROD_NAME+'/authorize.html?userId='+userId;//'http://hdyxs.hundun.cn/testRepo/sevens/authorize.html?channelType='+channelType+'!'+userId;
        }

        return shareURL;
    }
    
    //获取微信openid
    this.getUserRole=function(fn){
            var openid = '';
            
            var _this=this;
            //判断本地是否具有信息
            if (this.getWXInfo('openid') 
                &&this.getWXInfo('openid') !== null 
                && this.getWXInfo('openid') !== 'undefined' 
                && this.getWXInfo('unionid') 
                &&this.getWXInfo('unionid') !== null) {
                openid = this.getWXInfo('openid');
                //调用获取用户信息接口
                _this.getUserNameById(openid,function(data){
                       fn(data);
                });
                
            } else {
                //没有的话调用授权接口
                //获取微信返回的code
                var code = _this.getValueByKey('code');
                if(!code||code==="undefined"){
                    _this.redirectAuthorizeURL();
                }
                
                get(this.AUTH_HOST+'/base/get_wx_openid?code='+code, function(res) {
                    var openid = res.data.openid;
                    var unionid = res.data.unionid;
                    if (!unionid||unionid==="undefined") {
                        //跳转到微信授权链接
                        //logger.send('微信授权为获取openid',{noOpenId:'未获取oepnid'});
                        _this.redirectAuthorizeURL();
                        return false;
                    }
                    //获取微信用户信息
                    _this.getUserNameById(openid,function(data){
                       fn(data);
                    });

                   
            })
        }

            
    }
    this.getUserNameById=function(id,fn){
        var url='http://tweb.hundun.cn/webcore/base/get_wx_tagids';
        post(url,{openid:id},function(res){
             fn(res);
        })

    }
    //跳转到微信页面
    this.directWXURL=function(){
         this.location.href = this.createWXBaseURL({
                            url:this.TOOLS_URL,//传入微信基本url作为参数
                            channel:this.getValueByURL().channelType
         });
    }
  
    //根据存储的key获取本地信息
    this.getWXInfo=function(keyName){
         return localStorage.getItem(keyName);
    }
    this.getValueByKey= function(prop){
            var GETURL = {};
            if (window.location.search.length) {
                var args = decodeURIComponent(window.location.search).slice(1).split('&');
                for (var i = 0; i < args.length; i++) {
                    var arg = args[i].split('=');
                    GETURL[arg[0]] = arg[1];
                }
            }
            var _value=GETURL[prop];
            if(!_value||_value==="undefined"||typeof _value==="undefined"){
               _value='';
            }
            return _value;
    }
    //设置本地信息存储的key
    this.setWXInfo=function(ops){
         if(typeof ops==="string"){
             ops=JSON.parse(ops);
         }
         for(var key in ops){
            if(typeof ops[key]==="object"){
              ops[key]=JSON.stringify(ops[key]);
              logger.log('保存的key是:'+key+'    保存的值是 : '+ops[key]);
            }
            localStorage.setItem(key,ops[key]);
         }
    }
    // 设置用户信息
    this.setUserInfo=this.setWXInfo;
    //重写getUserInfoByKey方法
    this.getUserInfoByKey=this.getWXInfo;//获取本地存储的用户信息
    

    //清空本地微信存储信息
    this.clearUserWXInfo=function(){
         localStorage.clear();
    }
    //在app中获取用户信息
    this.getUserInfo=function(userId,userPhone,fn){
         var  url =this.ROOTHOST+this.SERVICE.GET_USET_INFO+'?user_id='+userId+'&phone='+userPhone
         var _this=this;
         get(url,function(data){
             if(data.error_no===0){
                            var _nickname=data.data.name||data.data.nickname;
                            if(_nickname!=='undefined'||_nickname){
                               _this.isAppUserLogin=true;//如果在app登陆状态 状态为true
                               _this.nickname=_nickname;
                               _this.userHeaderImage=data.data.head_img;
                            }
                            fn({code:1,msg:data.data});
             }else{
                            fn({code:0,msg:'error'});
             }   
         }); 
    }
    //创建带参数的微信重定向链接
    this.createWXBaseURL=function(ops){
      var wxbaseurl='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.APP_ID+'&redirect_uri=';
      var wxendurl='&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect';
      var _url=ops.url;
      return   wxbaseurl+_url+wxendurl;
    }
    this.redirectAuthorizeURL=function(){
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.APP_ID+'&redirect_uri='+this.WXAUTHORIZEURL+'&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect';
    }
    this.getWXUserInfo=function(openId,fn){
        var _this=this;
        var requestURL=this.AUTH_HOST+'/base/get_wx_userinfo?openid='+openId;
        get(requestURL,function(res){
             if(res.error_no===-1){
               _this.redirectAuthorizeURL();
               return false;
             }else{
                fn(res);
             }
             
        });
    }

  }
  return new SDK();

})();

export default sdk;