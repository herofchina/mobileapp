import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
const  TimerPicker=(props)=>{
	   return (
           <div className="time-pickers"> 
             <MuiThemeProvider>
		             <DatePicker 
		               hintText="请选择具体时间进行查询"
		               onChange={(event, date)=>{
		                   props.action(date);
		               }}
		               value={props.times}
		               okLabel="确定"
		               cancelLabel="取消"
		               />
             </MuiThemeProvider>  
           </div>
	   	);
}

export default TimerPicker;