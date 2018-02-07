import React from 'react';

import BasicTables from './BasicTables';
import TimerPicker from './TimerPicker';
var createBasicBar=(props)=>{
	var source=props.source;
	var basicBar=source.basicBar;

    var jsx=[];
    for(var i=0;i<basicBar.length;i++){
     if(basicBar[i].type==='DAYS'){
       jsx.push(
       	<div key={i} 
       	   onClick={props.action}
       	  id={basicBar[i].type} style={{backgroundColor:basicBar[i].color,color:basicBar[i].fontColor}}>
       	  <i className="iconfont icon-rili1"></i>{basicBar[i].text}
       	</div>
       	);
     }else if(basicBar[i].type==='WEEKS'){
       jsx.push(
       	<div 
       	    onClick={props.action}
       	    key={i} id={basicBar[i].type} style={{backgroundColor:basicBar[i].color,color:basicBar[i].fontColor}}>
       	    <i className="iconfont icon-benzhou"></i>{basicBar[i].text}
       	</div>
       	);
     }else{
       jsx.push(<div key={i} 
       	    onClick={props.action}
            id={basicBar[i].type} style={{backgroundColor:basicBar[i].color,color:basicBar[i].fontColor}}>
       	    <i className="iconfont icon-chuxingyueshu"></i>{basicBar[i].text}
       </div>
       );
     } 
 
    }
    return jsx;
}

var createToolBar=(props)=>{
    var result=props.source.basicToolBar;
    var jsx=[];
    if(result===null||result.length===0){
       return (<span></span>);
    }else{
       for(var i=0;i<result.length;i++){
           jsx.push(<div key={i} onClick={props.tool} id={result[i].type}>{result[i].text}</div>);
       }
       return jsx;
    }
}

const Basic=(props)=>{
	  //console.log(props);
	  return (
          <div>
              <div className="basic">
                 <div className="basic-header">
                      {createBasicBar(props)}
                 </div>
                 <div className="basic-times">
                      <TimerPicker 
                        times={props.times}
                        action={props.timesAction}
                        />
                 </div>
                 <div className="basic-tables">
                      <BasicTables 
                         title={props.source.basicTableTitle}
                         name={props.source.basicTableName}
                         source={props.source.data}
                         />
                 </div>
                 <div className="basic-tools">
                     {createToolBar(props)}
                 </div>
                 
              </div>
          </div>
	  	);
}

export default Basic;