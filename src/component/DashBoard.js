import React from 'react';


var createResult=(props)=>{
	var name=props.name;
	//console.log('get current component name : '+name);
	var componentName=name;
	//1.默认jsx
	var componentJSX=(<div className="dash-result">
                         <div>总社员数量: <span>{props.daliyActive}</span></div>
                         <div>日活: <span>{props.currentActive}</span></div>
       	         </div>);
    //2.判断是否获取名称
	if(!componentName||componentName==="undefined"||componentName===null||typeof componentName==="undefined"){
              componentName='BASIC';
	}
    //3.根据名称动态加载组件
	switch(componentName){
		 case "BASIC":
          componentJSX=(<div className="dash-result">
                         <div>总社员数量: <span>{props.daliyActive}</span></div>
                         <div>日活: <span>{props.currentActive}</span></div>
       	         </div>);
		 break;
		 case "PAYS":
		  componentJSX=(<div className="dash-report">
		                       <div className="research">
		                           <div>研习社</div>
		                           <div>总人数:{props.daliyActive}</div>
		                           <div>新入社:{props.newUser}</div>
		                       </div>
		                       {/**<div className="inaugurate">
		                       		                           <div>创新院</div>
		                       		                           <div>累计人数</div>
		                       		                           <div>新购买人数</div>
		                       		                       </div>**/}
		         	       </div>);
		 break;
		 default:
		  componentJSX=(<div className="dash-result">
                         <div>总社员数量: <span>{props.daliyActive}</span></div>
                         <div>日活: <span>{props.currentActive}</span></div>
       	         </div>);
		 break;

	}
    return componentJSX;
}

const DashBorad =(props)=>{
	//console.log(props.style);
	var isSlide=props.scale;
	var styles=Object.assign({},props.style);
	if(isSlide){
        styles.height='0.8rem';
        styles.overflow ='hidden';
	}
    return (<div className="nav" style={{height:styles.height}}>	
    	    <div className="dashboard" style={styles}>
    	         {/**icon**/}
    	         <div>
	    	         <div className="icons">
	    	            <i onClick={props.slide} className="iconfont icon-liebiao"></i>
	    	         </div>
	    	     </div>    
    
    	         {/**数据概况展示区域**/}
    	         {
    	         	createResult(props)
    	         }
    
    	         {/**点击区域**/}
    	         <div style={{display:props.show?'block':'none'}}>
	    	         <div className="dash-botton">
	                     <div className="btns">
	                         <div id="BASIC" onClick={props.action}><i className="iconfont icon-shuju"></i>基础数据</div>
	                         <div id="PAYS"  onClick={props.action}><i className="iconfont icon-zhifufangshi"></i>支付相关</div>
	                     </div>
	                
	                     <div className="drag">
	                        <div>
	                            <div className="dragger" style={{opacity:props.name==="BASIC"?"1":"0",display:props.show?'block':'none'}}></div>
	                        </div> 
	    
	                        <div>
	                           <div className="dragger" style={{opacity:props.name==="PAYS"?"1":"0",display:props.show?'block':'none'}}></div>
	                        </div>

	                     </div>
	    	         </div>
    	         </div>
    
    	    </div>
    	    
    	</div>  )
	}  

export default DashBorad;