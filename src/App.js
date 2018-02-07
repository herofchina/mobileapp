import React, { Component } from 'react';
import DashBoard from './component/DashBoard';
import DataResult from './component/DataResult';
import Service from './common/Service';
import API from './common/API';
import SDK from './sdk/sdk';
export default class App extends Component{
       constructor(){
          super();
          this.state={
              //默认主题
              themeStyle:{
                 backgroundColor: '#ff7a83',
                 fontSize:'0.22rem',
                 color:'#ffffff',
              },
              //组件名称
              componentName:'BASIC',
              //是否收缩dashboard
              scale:false,
              //是否显示三角区
              isShowDragger:true,
              basic:{    //基本数据的属性
                 basicBar:[ 
                    {type:'DAYS',text:'日', color:'#ff7a83',fontColor:'#ffffff'},
                    {type:'WEEKS',text:'周',color:'#ffffff',fontColor:'#000'},
                    {type:'MONTHS',text:'月',color:'#ffffff',fontColor:'#000'},
                 ],
                 data:[200,500,200,400,100],
                 basicTableTitle:API.getBeforeDate(1),
                 basicTableName:['日活','人均使用时长(分钟)',' 日总使用时长(小时)','总社员数','(日活*人均时长)/总社员'],
                 basicToolBar:[
                      
                 ]
              },
              pays:{     //支付数据的属性
                payTableTitle:'',
                data:null,
                droplist:null,
                isOpenPicker:false,
                slide:true
              },
              //查看的类型
              resultType:'DAYS',
              basicTime:null,
              payTime:null,
              daliyActive:200,
              currentActive:100,
              newUser:200,
              currentWeek:0,
              endDate:API.getBeforeDate(2),
              beginDate:API.getBeforeDate(-6),
              role:true,
              errorMsg:'当前没有权限，请联系管理员'
          }
          this.navigateAction=Service.navigateAction.bind(this)
          this.slideBoard=Service.slideBoard.bind(this)
          this.clickBasicTab=Service.clickBasicTab.bind(this)
          this.getResultByParams=Service.getResultByParams.bind(this)
          this.queryPaysByLastDays=Service.queryPaysByLastDays.bind(this)
          this.changePaySlide=Service.changePaySlide.bind(this)
          this.queryBasicByTime=Service.queryBasicByTime.bind(this)
          this.queryPayByTime=Service.queryPayByTime.bind(this)
          this.clickToolBar=Service.clickToolBar.bind(this)
          this.createQueryTimeByType=Service.createQueryTimeByType.bind(this)
          this.getPaysByParams=Service.getPaysByParams.bind(this)
          this.commonQuery=Service.commonQuery.bind(this)
       }
       
       render(){
          var role=this.state.role;
          if(role){
            return (
                <div className="box" style={{display:this.state.role?'block':'none'}}>
                   {/**DashBoard Component**/}
                   <DashBoard 
                     style={this.state.themeStyle}
                     action={this.navigateAction}
                     name={this.state.componentName}
                     slide={this.slideBoard}
                     scale={this.state.scale}
                     show={this.state.isShowDragger}
                     daliyActive={this.state.daliyActive}
                     currentActive={this.state.currentActive}
                     newUser={this.state.newUser}
                     />
                   {/**DataResult Component**/}
                   <DataResult
                     name={this.state.componentName}
                     basicSource={this.state.basic}
                     paySource={this.state.pays}
                     basicAction={this.clickBasicTab}
                     basicToolBar={this.state.basicToolBar}

                     toolAction={this.clickToolBar}
                     paySourceAction={this.queryPaysByLastDays}
                     slideAction={this.changePaySlide}
                     times={this.state.basicTime}
                     timesAction={this.queryBasicByTime}
                     payTime={this.state.payTime}
                     payTimeAction={this.queryPayByTime}


                   />

                   
                   
                </div>
            );
          }else{
            return (<div className="error">{this.state.errorMsg}</div>);
          }
          
       }
       
       fetchMain=()=>{
                 var params={
                     start_date:API.getBeforeDate(1),
                     end_date:API.getBeforeDate(1),
                     stat_type:'day'
                 }
                 //初始化进行查询的数据结果昨天
                 this.getResultByParams(params,(data)=>{
                    console.log('初始化进行查询的数据结果昨天');
                    console.log(data);

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

                    }else{
                       
                    }

                 });
       }

       componentDidMount(){
             // var role=this.state.role;
             // var _this=this;
             // var msg=this.state.errorMsg;
             // SDK.getUserRole(function(data){
             //   var code=data.errcode;
             //   if(code===0){
             //      var list=data.data.tagid_list;
             //      if(list.length!==0){
             //         role=true;
             //      }else{
             //         role=false;
             //      }
             //   }else{
             //      msg='请求有误请重试';
             //      role=false;

             //   }
             //   if(_this.state.role){
             //       _this.fetchMain();
             //   }else{

             //   }
             //   _this.setState({
             //      role:role,
             //      errorMsg:msg
             //   });
             //   //判断是否合法权限 否则不进行处理数据
               

             // });
              
              this.fetchMain();

              console.log('end date'+this.state.endDate);
              

       }
       componentDidUpdate(){
         //console.log('render child again');
       }
}
