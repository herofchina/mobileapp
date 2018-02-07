<Navigate 
                       style={this.state.themeStyle}
                       item={this.state.navigateItem}
                       action={this.navigateAction}
                       line={this.state.navigateLine}
                       />



                        //根据类型产生不同的查询条件
      


<div className="pay-last" onClick={props.action}>
                       <i className="iconfont icon-xiangqian"></i>前一天
                    </div>
                    <div className="pay-time">{props.source.payTableTitle}</div>
                    <div className="pay-picker">
                      <i className="iconfont icon-rili1"></i>
                    </div>



    <div className="res-item" style={{height:props.source.slide?'0.8rem':'4rem'}}>
                               <div className="droplist">
                                   <div className="res-drop">
                                      <div className="res-title">新入社</div>
                                      <div onClick={props.slideAction} className="res-value">400
                                          <i className="iconfont icon-tubiao-"></i>
                                      </div>
                                   </div> 
                                   {/**droplist childs**/}
                                   <div className="res-list" style={{display:props.source.slide?'none':'block',height:props.source.slide?'0rem':'4rem'}}>
                                        <div className="res-item">
                                        <div className="res-title">APP</div>
                                        <div className="res-value">90000</div>
                                     </div>
                                     <div className="res-item">
                                        <div className="res-title">推广大使</div>
                                        <div className="res-value">90000</div>
                                     </div>
                                     
                                     <div className="res-item">
                                        <div className="res-title">推广大使</div>
                                        <div className="res-value">90000</div>
                                     </div>

                                     <div className="res-item">
                                        <div className="res-title">兑换码</div>
                                        <div className="res-value">90000</div>
                                     </div>
                                     <div className="res-item">
                                        <div className="res-title">订阅号</div>
                                        <div className="res-value">90000</div>
                                     </div>
                                     <div className="res-item">
                                        <div className="res-title">礼品卡</div>
                                        <div className="res-value">90000</div>
                                     </div>
                                    </div>
                           </div>         
                             </div>    




                                  var params={};
                                   params.start_date=times;
                                   params.end_date=times;
                                   params.stat_type='day';
                                   this.getPaysByParams(params,(data)=>{
                                        if(data.error_no===0){
                                           _source.data=data.data.table_data;
                                           this.setState({
                                               pays:_source
                                           });
                                        }

                                   });  



 var _type=Object.assign({},this.state.resultType);
          var _basic=Object.assign({},this.state.basic);
          var _endDate=this.state.endDate;
          var _beginDate=this.state.beginDate;

          var today=API.getBeforeDate(0);
          
         

          var _weeks=this.state.currentWeek;
          

          //var lastWeekBegin=API.getBeforeWeek(7);
          //var lastWeekEnd=API.getBeforeWeek(1);
          
          var currentWeekBegin=API.getBeforeWeek(0);
          var currentWeekEnd=API.getBeforeWeek(-6);

          // var nextWeekBegin=API.getBeforeWeek(-7);
          // var nextWeekEnd=API.getBeforeWeek(-13);
          //console.log(nextWeekBegin +"   "+nextWeekEnd);

          //var lastM=API.getBeforeMonth(-1);
          var thisM=API.getBeforeMonth(0);
          //var nextM=API.getBeforeMonth(1);





                                             