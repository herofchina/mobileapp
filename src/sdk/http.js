var get=function(url,fn){
        var xhr=new XMLHttpRequest();
        //console.log(xhr);
        xhr.open('GET',url,true);
        xhr.send('');
        xhr.onreadystatechange=function(){
            if(xhr.status===200&&xhr.readyState===4){
               var result=xhr.responseText;
               if(typeof result==="string"){
                  result=JSON.parse(result);
               }
               fn(result);
            }
        }

    }

//将对象转换成form格式
// var transfer=function(datas){
//     if(JSON.stringify(datas)==="{}"){
//       return "{}"
//     }
//     var str='';
//     for(var key in datas){
//        str=key+'='+datas[key]+'&'+str;
//     }
//     str=str.substring(0,str.length-1);
//     return str;
// }

//post接口
var  post=function(url,datas,fn){
            var xhr=new XMLHttpRequest();
            xhr.open('POST',url,true);
            datas=JSON.stringify(datas);
            xhr.send(datas);
            xhr.onreadystatechange=function(){
                if(xhr.status===200&&xhr.readyState===4){
                   var result=xhr.responseText;
                   if(typeof result==="string"){
                      result=JSON.parse(result);
                   }
                   fn(result);
                }
            }
           
}

var httpWX=function(theUrl,params,fn){
    var xhr = new XMLHttpRequest();
    if (!params||params===null||params==="undefined"){
       
    }
    else {
        theUrl += '?'
        for (var key in params) theUrl += key + '=' + params[key] + '&';
        theUrl += 'v=' + Math.random();
    }
    xhr.open("GET", theUrl, true); // true for asynchronous 
    xhr.send(null);
    xhr.onreadystatechange=function(){
                if(xhr.status===200&&xhr.readyState===4){
                   var result=xhr.responseText;
                   fn(result);
                }
   }
}

export {post,get,httpWX}