import React from 'react';




const createNavigate=(props)=>{
	var jsx=[];
	var items=props.item;
	var action=props.action;
	for(var i=0;i<items.length;i++){
       jsx.push(
           <div onClick={action} key={i} className="nav-text" id={items[i].type}>
                 {items[i].text}
	       </div>
       	);
	}
	return jsx;

}

const Navigate =(props)=>(
	 <div className="nav">
	      <div className="navigate" style={props.style}>
	           {createNavigate(props)}
	      </div>
	      <div className="line" style={props.line}></div>
     </div> 
);

export default Navigate;