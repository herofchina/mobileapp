import React from 'react';


const renderTableTitle=(props)=>{
       var title=props.name;
       //console.log(title);
       var jsx=[];
       for(var i=0;i<title.length;i++){
           jsx.push(<div key={i}>{title[i]}</div>);
       }
       return jsx;


}

const renderTableValue=(props)=>{
       var title=props.source;
       var jsx=[];
       for(var i=0;i<title.length;i++){
           jsx.push(<div  key={i}>{title[i]}</div>);
       }
       return jsx;
}

const BasicTables =(props)=>(
    <div className="tables">
        <div className="table-header">
             {props.title}
        </div>
        <div className="table-body">
            <div className="table-body-im">
                <div className="titles">
                   {renderTableTitle(props)}
                </div>
                <div className="values">
                      {renderTableValue(props)}
                </div>
            </div>
        </div>
    </div>
);
export default BasicTables;