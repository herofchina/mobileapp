var logger=(function(){

    
    var Logger=function(){
        
        this.debug=true;           //是否开启调试模式的开关值
        this.openDialog=true;
        this.notifyLogServer=true; //是否通知服务端的开关值

        this.csl=window.console;

        this.logOptions={
                         logname:'', // 日志名称
                         uri:'', // 后台接口地址
                         params:'', // 请求参数
                         logproj:'',  // 项目名称
                         loglevel:'debug', // 日志等级：'debug', 'info', 'warn', 'error', 'fatal'
                         logres:''
        };

        //设置日志参数
        this.setOptions=function(ops){
             this.log('设置的参数是:'); 
             this.log(ops);
             for(var key in ops){
                  this.logOptions[key]=ops[key];
                
             }
             this.log('修改后的参数是:');
             this.log(this.logOptions);
        }

        
         
        //前端日志查询打印

        //重写console.log方法
        this.log=function(msg){
            var _this=this;
           
            if(_this.debug){
            	 _this.csl.log(msg);
            }
            
        }
        //重写console.dir方法
        this.dir=function(msg){
            var _this=this;
            if(_this.debug){
                   (function(_csl){
		            	_csl.call(console,msg)
		            })(console.dir);
            }
           
        }

        this.alert=function(msg){
             var _this=this;
             if(_this.openDialog){
                window.alert(msg);
             }
        }

       


        
        //往后端日志服务器发送
        this.send=function(logName,data){
        	if(this.notifyLogServer){
                  this.log(this.logOptions);
                  var _logName='sevendaysV2'+logName;
                  this.logOptions.logname=_logName;
                  this.logOptions.params=JSON.stringify(data);
                  this.log('最后发送到服务端的数据是:');
                  this.log(this.logOptions);
                  this.http('http://web.hundun.cn/weblog/member_logger',this.logOptions);
          }

        }
        this.transfer=function(datas){
            if(JSON.stringify(datas)==="{}"){
              return "{}"
            }
            var str='';
            for(var key in datas){
               str=key+'='+datas[key]+'&'+str;
            }
            str=str.substring(0,str.length-1);
            return str;
        }
        this.http=function(url,params){
            var xhr=new XMLHttpRequest();
            url=url+'?'+this.transfer(params);
            xhr.open('GET',url,true);
            xhr.send('');
        }


    }
   
    return new Logger();
})();
export default logger;