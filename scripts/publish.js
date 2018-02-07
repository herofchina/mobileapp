var TEST_SERVER= 'web@web.hundun.cn:/home/web/testRepo/htmlBin/mobile-app';
var TOOLS_SERVER='web@tweb.hundun.cn:/home/web/testRepo/htmlBin/mobile-app';
var exec=require('child_process');
var colors =require('colors');
var paths=require('../config/paths');

	
console.log('.'.blue);
console.log('...'.blue);
console.log('.....'.blue);
var buildMsg='执行构建项目过程';
var buildPath=paths.appBuild+'/*';
console.log(buildMsg.blue);
exec.exec('node  ./scripts/build.js',function(res){
	
	console.log('********************'.green);
	console.log('文件打包成功'.green);
	console.log('********************'.green);
	console.log("");
	console.log("");
	console.log('========输出的文件夹路径========'.green);
	console.log(">        "+paths.appBuild.blue);
	console.log("");
	console.log("");
	console.log("拷贝本地资源路径:  "+buildPath.blue);
    console.log("");
	console.log("");

	var uploadServerCommands='scp -r '+buildPath+'  '+TEST_SERVER;
	console.log('上传到服务器');
	console.log(">        "+uploadServerCommands.blue);
	exec.exec(uploadServerCommands,function(){
		    console.log('上传到服务器:   '+TEST_SERVER+' 成功'.green);
			console.log("");
		    console.log("");
		uploadServerCommands='scp -r '+buildPath+'  '+TOOLS_SERVER;

		exec.exec(uploadServerCommands,function(){
			console.log('上传到服务器:   '+TOOLS_SERVER+' 成功'.green);
			console.log("");
		    console.log("");
		    console.log('自动构建上传到服务器完毕'.blue);
		    console.log('.....'.blue);
		    console.log('...'.blue);
		    console.log('.'.blue);
		      
	       });
	});

});	


