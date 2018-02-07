import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

var createPaysItems=(props)=>{
    var res=props.source.data;
    var flag=props.source.slide;
    if(res||res!==null){
       res=res[0].join_member_detail;
       console.log(res);
       if(res){
        
           if(flag){
              return (<div></div>);
           }else{
              var jsx=[];
              for(var i=0;i<res.length;i++){
                jsx.push(<div key={i} className="droplistItem">
                         <div className="droplist-title">{res[i].channel}</div>
                         <div className="droplist-value">{res[i].count}</div>
                        </div>);
              }

              return jsx;
              
           }
      }else{
        return (<div></div>);
      } 


    }else{
        return (<div></div>)
    }
}
const Pays=(props)=>{
	  var tcount='';
	  var nuser='';

	  var extime='';
	  var upays='';
	  var oadds='';

	  var acount='';
	  var exits='';

	  var euser='';
	  var cuser='';
	  //console.log(props);
	  var _data=props.source.data;
	  // console.log('data');
	  // console.log(_data);
	  if(_data!==null){
	  	  _data=_data[0];
          tcount=_data.total_member_num;
		  nuser=_data.join_member_num;
		  extime=_data.rejoin_member_num;
          upays=_data.renew_member_num;

		  //oadds=0;


		  acount=_data.total_buy_number;

		  exits=_data.exit_member_num;

		  euser=_data.expire_member_num;
		  cuser=_data.net_inflow;
	  }

	  return (
          <div>
            <div className="pays">
		             <div className="pay-header">
		                 <MuiThemeProvider>
                           <DatePicker
                               hintText="请选择具体时间进行查询"
				               onChange={(event, date)=>{
				                   props.payTimeAction(date);
				               }}
				               value={props.payTime}
				               okLabel="确定"
				               cancelLabel="取消"
                            >
                           </DatePicker>  
		                 </MuiThemeProvider>
		             </div>
		             <div className="res-cxt">
                         <div className="res-header">研习社</div>
                         <div className="res-body">
                             <div className="res-item">
                                <div className="res-title">总社员</div>
                                <div className="res-value">{tcount}</div>
                             </div>
                             
                             <div className="res-item">
                                <div className="res-title">新入社</div>
                                <div className="res-values"
                                     onClick={props.slideAction}
                                >{nuser}<i className="iconfont icon-tubiao-"></i></div>
                             </div>
                             <div className="droplist" style={{height:props.source.slide?'0rem':'6rem'}}>
                                   {
                                      createPaysItems(props)
                                   }
                             </div>
                             <div className="res-item">
                                <div className="res-title">过期续费</div>
                                <div className="res-value">{extime}</div>
                             </div>
                             <div className="res-item">
                                <div className="res-title">有效期内续费</div>
                                <div className="res-value">{upays}</div>
                             </div>
                             {/**<div className="res-item">
                                                             <div className="res-title">其他新增</div>
                                                             <div className="res-value">{oadds}</div>
                                                          </div>**/}


                             <div className="res-item">
                                <div className="res-title">总购买(次)</div>
                                <div className="res-value">{acount}</div>
                             </div>
                             <div className="res-item">
                                <div className="res-title">退社</div>
                                <div className="res-value">{exits}</div>
                             </div>
                             <div className="res-item">
                                <div className="res-title">过期</div>
                                <div className="res-value">{euser}</div>
                             </div>

                             <div className="res-item">
                                <div className="res-title">净入流</div>
                                <div className="res-value">{cuser}</div>
                             </div>
 
                             
                         </div>
                        {/** <div className="res-desc">
                              <span>研习社截止上午:9时</span>
                              <span>，新入社:</span>
                              <span>，总人数:</span>
                         </div>**/}
		             </div>
		             {/** <div className="int-cxt">
                         <div className="int-header">创新院</div>
                         <div className="int-body">
                             <div className="res-item">
                                <div className="res-title">新购买</div>
                                <div className="res-value">90000</div>
                             </div>
                             <div className="res-item">
                                <div className="res-title">累积</div>
                                <div className="res-value">90000</div>
                             </div>
                         </div>
                        <div className="int-desc">
                                                      <span>创新院社截止上午:9时</span>
                                                      <span>，新入社:</span>
                                                      <span>，总人数:</span>
                                                 </div>
		             </div>**/}
            </div>
          </div>
	  	);
}

export default Pays;