import API from './API';
import moment from 'moment';
window.moment=moment;
class Service{
        createQueryTimeByType(type){
          var _type=Object.assign({},this.state.resultType);
          var _basic=Object.assign({},this.state.basic);
          var _endDate=this.state.endDate;
          var _beginDate=this.state.beginDate
          var today=API.getBeforeDate(0);
          var _weeks=this.state.currentWeek;
          var currentWeekBegin=API.getBeforeWeek(7);
          var currentWeekEnd=API.getBeforeWeek(1);

          var thisM=API.getBeforeMonth(0);
         

         
         
          
          var params={}
          var se;




          switch(type){
              case "NEXTWEEK":
                   _type='WEEKS';
                   _weeks=_weeks+1;
                   

                   var bt=this.state.beginDate;
                   var et=this.state.endDate;
                   bt=moment(bt).subtract(7,'days').format('YYYY-MM-DD');
                   et=moment(bt).add(6,'days').format('YYYY-MM-DD');
                   _beginDate=bt;
                   _endDate=et;
                   params.start_date=bt
                   
                   params.end_date=et
                   
                   params.stat_type='week'
                   _basic.basicTableTitle=bt+'至'+et+'(周平均)'


 
                   break;
                
              

              case "BACKWEEK":
                   _type='WEEKS';
                   

                   params.start_date=currentWeekBegin
                   
                   params.end_date=currentWeekEnd
                   
                   params.stat_type='week'
                   _basic.basicTableTitle=currentWeekBegin+'至'+currentWeekEnd+'(周平均)'
                   _beginDate=currentWeekBegin;
                   _endDate=currentWeekEnd;
                   _weeks=0;
                   
                   break;

              case "PREVWEEK":
                   _type='WEEKS';
                  
                   params.stat_type='week';
                   _weeks=_weeks-1;
                   if(_weeks<=0){
                      _weeks=1;
                      params.start_date=currentWeekBegin
                      params.end_date=currentWeekEnd
                      _basic.basicTableTitle=currentWeekBegin+'至'+currentWeekEnd+'(周平均)'
                   }else{
                      console.log(today);
                      console.log(currentWeekBegin);
                      if((moment(today).isAfter(moment(currentWeekBegin)))){
                       
                      
                          var b=this.state.beginDate;
                          var e=this.state.endDate;

                          b=moment(e).add(1,'days').format('YYYY-MM-DD');
                          e=moment(b).add(6,'days').format('YYYY-MM-DD');
                          _endDate=e;
                          _beginDate=b;
                          
                          params.start_date=b
                          params.end_date=e
                          _basic.basicTableTitle=b+'至'+e+'(周平均)'
                      }else{
                          console.log('获取的时间不能大于当前');
                          _endDate=currentWeekEnd;
                          _beginDate=currentWeekBegin;
                          params.start_date=currentWeekBegin;
                          params.end_date=currentWeekEnd;
                          _basic.basicTableTitle=currentWeekBegin+'至'+currentWeekEnd+'(周平均)'
                      }
                   }
                   
                   break;

              case "NEXTMONTH":
                   _type='MONTHS';

                   se=moment(this.state.beginDate).subtract(1,'month').format('YYYY-MM-DD');
                   _beginDate=moment(se).startOf('month').format('YYYY-MM-DD');
                   console.log(_beginDate);
                   _endDate=moment(se).endOf('month').format('YYYY-MM-DD');
                   console.log(_endDate);
                   params.start_date=_beginDate
                   params.end_date=_endDate
                   params.stat_type='month'
                   _basic.basicTableTitle=_beginDate+'至'+_endDate+'(月平均)'
                   break;
                

             

              case "PREVMONTH":
                   _type='MONTHS';
                   var MB=thisM.beginTime;
                   var ME=thisM.endTime;
                   console.log('MB'+MB);
                   se=moment(this.state.beginDate).add(1,'month').format('YYYY-MM-DD');
                   _beginDate=moment(se).startOf('month').format('YYYY-MM-DD');
                   console.log(_beginDate);
                   _endDate=moment(se).endOf('month').format('YYYY-MM-DD');
                   console.log(_endDate);
                   if(moment(se).isAfter(moment(MB))){
                     _beginDate=MB;
                     _endDate=ME;
                   }
                   params.start_date=_beginDate
                   params.end_date=_endDate
                   params.stat_type='month'
                   _basic.basicTableTitle=_beginDate+'至'+_endDate+'(月平均)'
                   break;
               
                


              case "BACKMONTH": 
                   _type='MONTHS';
                   params.start_date=thisM.beginTime
                   params.end_date=thisM.endTime
                   params.stat_type='month'
                   _basic.basicTableTitle=thisM.beginTime+'至'+thisM.endTime+'(月平均)'
                   _beginDate=thisM.beginTime;
                   _endDate=thisM.endTime;
                   break;
                
              default:
              break;

          }

          this.setState({
            resultType:_type,
            currentWeek:_weeks,
            basic:_basic,
            beginDate:_beginDate,
            endDate:_endDate,
           
          });
          return params;

       }




        //点击底部toolbar进行查询数据
       clickToolBar(e){
            
            var _nodeName=e.target.nodeName;
            if(_nodeName==="FONT"){
                 if(e.target.innerText!==""){
                   e=e.target.parentNode.parentNode;
                 }else{
                   e=e.target.parentNode;
                 }
            }else{
                   e=e.target;
            }
            
            var id=e.id;
            console.log(id);
            var params=this.createQueryTimeByType(id);
            //return false;
            this.getResultByParams(params,(data)=>{
                if(data.error_no===0){
                   // console.log('获取当前选中的类型');
                   // console.log(this.state.resultType);
                   var _basic=Object.assign({},this.state.basic);
                   var _table=data.data.table_data;
                   var _avg=data.data.avg_data;
                   if(_table!==null||typeof _table!=='undefined'||_table.length!==0){
                      _table=_table[0];   
                   }
                   // console.log(_table);
                   // console.log(_avg);
                   _basic.data[0]=_table.dau;
                   _basic.data[1]=_table.avg_use_time;
                   _basic.data[2]=_table.total_use_time;
                   _basic.data[3]=_table.total_member_num;
                   _basic.data[4]=_avg.avg_member_use_time;

                   this.setState({
                     basic:_basic,
                     daliyActive:_table.total_member_num,
                     currentActive:_table.dau
                   })

                }else{

                }
            });
            
       }
       //导航中点击跳转方法
       navigateAction(e){
            
            var _nodeName=e.target.nodeName;
            if(_nodeName==="FONT"){
                 if(e.target.innerText!==""){
                   e=e.target.parentNode.parentNode;
                 }else{
                   e=e.target.parentNode;
                 }
            }else{
                   e=e.target;
            }
            
            var id=e.id;
            var _componentName=Object.assign({},this.state.componentName);
            var _pays=Object.assign({},this.state.pays);
            switch(id){
                case "BASIC":
                 _componentName='BASIC';
                 
                 this.fetchMain();

                break;
                case "PAYS":
                  _componentName='PAYS';
                  _pays.payTableTitle=API.getTimeText(0).text;
                  var times=this.state.payTime||API.getBeforeDate(1);
                  this.commonQuery(times);
                break;
                default:
                  _componentName='PAYS';
                break;
            }
            this.setState({
               componentName:_componentName,
               pays:_pays,
               payTime:null,
               basicTime:null
            })
           
       }
       //伸缩dashboard
       slideBoard(){
           //console.log('slide');//ff7a83
           var flag=this.state.scale;
           if(flag){
             this.setState({
               scale:false,
               isShowDragger:true
             });
           }else{
              this.setState({
               scale:true,
               isShowDragger:false
             });
           }
           //console.log(this.state.scale);
       }
       //点击basic进行切换按钮状态 
       clickBasicTab(e){
            var _nodeName=e.target.nodeName;
            if(_nodeName==="I"){
                   e=e.target.parentNode; 
            }else if(_nodeName==="FONT"){    
                      if(e.target.innerText!==""){
                         e=e.target.parentNode.parentNode;
                     }else{
                         e=e.target.parentNode;
                     }
            }else{
                   e=e.target;
            }
            //console.log(_nodeName);
            //console.log(e);

            var id=e.id;

            var _basic=Object.assign({},this.state.basic);

            var _basicBar=_basic.basicBar;
            

            var _type=Object.assign({},this.state.resultType);

            
            for(var i=0;i<_basicBar.length;i++){
                if(_basicBar[i].type===id){
                    _basic.basicBar[i].color='#ff7a83';
                    _basic.basicBar[i].fontColor='#ffffff';
                }else{
                    _basic.basicBar[i].color='#ffffff';
                    _basic.basicBar[i].fontColor='#000';
                }
            }

            var params={
                start_date: "",
                end_date: "",
                stat_type: ""
            }

            if(id==="DAYS"){
              _basic.basicToolBar=[

              ];
              params.start_date=API.getBeforeDate(1);
              params.end_date=API.getBeforeDate(1);
              params.stat_type='day';
              _type='DAYS';
              _basic.basicTableTitle=API.getBeforeDate(1);

               
            }else if(id==="WEEKS"){
               _basic.basicToolBar=[
                      {type:'NEXTWEEK',text:'前一周'},
                      {type:'BACKWEEK',text:'最近一周'},
                      {type:'PREVWEEK',text:'后一周'}
               ];
                params.start_date=API.getBeforeWeek(7);
                params.end_date=API.getBeforeWeek(1);
                params.stat_type='week';
                _type='WEEKS';
                _basic.basicTableTitle=params.start_date+'至'+params.end_date+'(周平均)';
            }else{
               _basic.basicToolBar=[
                      {type:'NEXTMONTH',text:'前一月'},
                      {type:'BACKMONTH',text:'最近一月'},
                      {type:'PREVMONTH',text:'后一月'}
               ];
                params.start_date=API.getBeforeMonth(0).beginTime;
                params.end_date=API.getBeforeMonth(0).endTime;
                params.stat_type='month';
                _type='MONTHS';
                _basic.basicTableTitle=params.start_date+'至'+params.end_date+'(月平均)';
            }
            this.setState({
              basic:_basic,
              resultType:_type,
              beginDate:params.start_date,
              endTime:params.end_date
            });
            // console.log('点击获取默认的查询信息');
            // console.log(params);
            // console.log('请求fetch 进行获取服务端数据');
            this.getResultByParams(params,(data)=>{
                //console.log(data);
                if(data.error_no===0){
                   var _basic=Object.assign({},this.state.basic);
                   var _table=data.data.table_data;
                   var _avg=data.data.avg_data;
                   if(_table!==null||typeof _table!=='undefined'||_table.length!==0){
                      _table=_table[0];   
                   }
                   // console.log(_table);
                   // console.log(_avg);
                   _basic.data[0]=_table.dau;
                   _basic.data[1]=_table.avg_use_time;
                   _basic.data[2]=_table.total_use_time;
                   _basic.data[3]=_table.total_member_num;
                   _basic.data[4]=_avg.avg_member_use_time;

                   this.setState({
                     basic:_basic,
                     daliyActive:_table.total_member_num,
                     currentActive:_table.dau
                   })
              }



            });


       }
      
       getResultByParams(params,fn){
            //console.log('输入打印参数生成请求地址');
            params=API.dataFormat(params);
            var url=API.HOST_SERVER+API.QUERY_BASIC_SERVICE+params;
            //console.log(url);
            fetch(url,{},params).then((res)=>res.json()).then((response)=>{
               fn(response);
            })
       }
      
       queryPaysByLastDays(){
            var _pays=Object.assign({},this.state.pays);
            _pays.payTableTitle=API.getTimeText(1).text;
            //console.log(_pays.payTableTitle);
            this.setState({
               pays:_pays
            });
       }

       changePaySlide(){
             //console.log('slides');
             var _slide=Object.assign({},this.state.pays)
             //console.log(_slide);
             var fg=_slide.slide;
             //console.log(fg);
             if(fg){
                _slide.slide=false;
             }else{
                _slide.slide=true;
             }
             //console.log(fg);
             this.setState({
               pays:_slide
             })
             //console.log(this.state.pays);

       }
       queryBasicByTime(date){
                       console.dir(date);
                       var times=moment(date).format('YYYY-MM-DD');
                       var params={};
                       
                       this.setState({
                         basicTime:date
                       });
                      

                       params.start_date=times;
                       params.end_date=times;
                       params.stat_type='day';
                       var _basic=Object.assign({},this.state.basic);

                       _basic.basicTableTitle=times;
                       this.getResultByParams(params,(data)=>{
                            
                            if(data.error_no===0){
                               
                               var _table=data.data.table_data;
                               var _avg=data.data.avg_data;
                               if(_table!==null||typeof _table!=='undefined'||_table.length!==0){
                                  _table=_table[0];   
                                  _basic.data[0]=_table.dau;
                                   _basic.data[1]=_table.avg_use_time;
                                   _basic.data[2]=_table.total_use_time;
                                   _basic.data[3]=_table.total_member_num;
                                   _basic.data[4]=_avg.avg_member_use_time;

                                   this.setState({
                                     basic:_basic,
                                     daliyActive:_table.total_member_num,
                                     currentActive:_table.dau
                                   })
                               }else{
                                 return false;
                               }
                               
                               
                          }
                        });



       }
       
       getPaysByParams(params,fn){
            console.log('输入打印参数生成PAYS请求地址');
            params=API.dataFormat(params);
            var url=API.QUERY_PAY_SERVICE+params;
            //console.log(url);
            fetch(url,{},params).then((res)=>res.json()).then((response)=>{
               fn(response);
            })
       }

       queryPayByTime(date){
                       console.dir(date);
                       this.setState({
                         payTime:date
                       });
                       var times=moment(date).format('YYYY-MM-DD');
                       this.commonQuery(times);
                       

       }
       commonQuery(times){
                       var _source=Object.assign({},this.state.pays)
                       
                       var params={};
                       params.start_date=times;
                       params.end_date=times;
                       params.stat_type='day';

                       this.getPaysByParams(params,(data)=>{
                            if(data.error_no===0){
                               if(data.data.table_data.length!==0){
                                   _source.data=data.data.table_data;

                                   console.log(data.data);
                                   this.setState({
                                       pays:_source,
                                       daliyActive:data.data.table_data[0].total_member_num,
                                       newUser:data.data.table_data[0].join_member_num
                                   });
                             }
                            }

                       });
       }
       

}       
export default new Service();