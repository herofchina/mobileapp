import React from 'react';

import Basic from './Basic';
import Pays from './Pays';
var renderComponent=(props)=>{
    var _name=props.name;
    var _source=null;
    var _action=null;
    var _toolAction=null;
    var jsx=(<div></div>);
    if(_name==="BASIC"){
       _source=props.basicSource;
       _action=props.basicAction;
       _toolAction=props.toolAction;
       var _times=props.times;
       var _timesAction=props.timesAction;
       jsx=(
         <Basic 
         source={_source}
         action={_action}
         tool={_toolAction}
         times={_times}
         timesAction={_timesAction}
         
         />
       );
    }else{
       _source=props.paySource;
       jsx=(
         <Pays 
          source={_source} 
          action={props.paySourceAction}
          slideAction={props.slideAction}
          payTime={props.payTime}
          payTimeAction={props.payTimeAction}

          />
       );
    }
    return jsx;
}

const DataResult=(props)=>{
	  return (
          <div>
              {renderComponent(props)}
          </div>
	  	);
}

export default DataResult;