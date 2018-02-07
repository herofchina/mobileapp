var API ={
	       getBeforeDate:function(n){  
              var s;
              var d = new Date();  
              var year = d.getFullYear();  
              var mon=d.getMonth()+1;  
              var day=d.getDate();  
              if(day <= n){  
                      if(mon>1) {  
                         mon=mon-1;  
                      }  
                     else {  
                       year = year-1;  
                       mon = 12;  
                       }  
                     }  
                    d.setDate(d.getDate()-n);  
                    year = d.getFullYear();  
                    mon=d.getMonth()+1;  
                    day=d.getDate();  
               s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);  
               return s;  
             },
             getTimeText:function(n){
              var s;
              var straps;
              var d = new Date();  
              var year = d.getFullYear();  
              var mon=d.getMonth()+1;  
              var day=d.getDate();  
              if(day <= n){  
                      if(mon>1) {  
                         mon=mon-1;  
                      }  
                     else {  
                       year = year-1;  
                       mon = 12;  
                       }  
                     }  
                    d.setDate(d.getDate()-n);  
                    year = d.getFullYear();  
                    mon=d.getMonth()+1;  
                    day=d.getDate();  
               s = year+"年"+(mon<10?('0'+mon):mon)+"月"+(day<10?('0'+day):day)+'日';
               straps=year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
               var times={
               	   text:s,
               	   time:straps
               }  
               return times;
             },
             getBeforeWeek:function(n){
             	    var now=new Date();
					var year=now.getFullYear();
					//因为月份是从0开始的,所以获取这个月的月份数要加1才行
					var month=now.getMonth()+1;	
					var date=now.getDate();
					var day=now.getDay();
					//console.log(date);
					//判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
					if(day!==0){
					n=n+(day-1);
					}
					else{
					n=n+day;
					}
					if(day){
					//这个判断是为了解决跨年的问题
					if(month>1){
					 //month=month;
					}
					//这个判断是为了解决跨年的问题,月份是从0开始的
					else{
					year=year-1;
					month=12;
					}
					}
					now.setDate(now.getDate()-n);	
					year=now.getFullYear();
					month=now.getMonth()+1;
					date=now.getDate();
					//console.log(n);
					var s=year+"-"+(month<10?('0'+month):month)+"-"+(date<10?('0'+date):date);
					return s;
             },
             getDaysInOneMonth:function(year, month){  
					  month = parseInt(month, 10);  
					  var d= new Date(year, month, 0);  
					  return d.getDate();  
             },
             getBeforeMonth:function(n){
                    var now=new Date();
					var year=now.getFullYear();
					//console.log(year);
					//因为月份是从0开始的,所以获取这个月的月份数要加1才行
					var month=now.getMonth()+1;	
					//console.log(month);
					var date=now.getDate();
					//console.log('date');
					//console.log(date);

					


					if(n===0){
                      date=this.getDaysInOneMonth(year,month);
                      
					}else if(n===-1){
                     
                      if(month===1){
                      	 date=this.getDaysInOneMonth(2017,month);
                      	 month=12;
                      	 year=year-1;
                         
                      }
                      
					}else{
                      
                      if(month===12){
                      	      year=year+1;
                      	      month=1;       
                      }else{
                             month=month+1; 
                      } 
                      date=this.getDaysInOneMonth(year,month);
                      
					}
					   return {
                         	 beginTime:year+"-"+(month<10?('0'+month):month)+"-01",
                         	 endTime:year+"-"+(month<10?('0'+month):month)+"-"+(date<10?('0'+date):date) 
                      }

             },
             HOST_SERVER:'http://182.92.104.190:9000',//'http://182.92.104.190:9007',
             QUERY_BASIC_SERVICE:'/data_platform/app_kpi',
             QUERY_PAY_SERVICE:'http://182.92.104.190:9007/product_data_platform/base_data/member_date_data',
             dataFormat:function(params){
                var str='';
                for(var key in params){
                 str+=key+'='+params[key]+'&';
                }
                str=str.substring(0,str.length-1);
                return '?'+str;
             }

}

export default API;