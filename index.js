'use strict';
const readDir = require('read-lib');

module.exports = function(routeDirPath,dirPath,ignore){
  const routers = readDir(routeDirPath,dirPath);
  const getter = getQueryRoute(routers);
  return function(req,res,next){
    const url = req.baseUrl || req.originalUrl || req.url;
    const paths = url.split("?")[0].split('/').filter(v=>{
		  if(v == ""){
			  return false;
		  }else{
			  return true;
		  }
	  });
 	  const method = req.method.toLowerCase();
    let handler;
    let params;
    if(paths.length == 0){
      handler =  routers['index'];
    }else{
      let handlerAndParams = getter(paths);
      handler = handlerAndParams.pointer;
      params = handlerAndParams.params;
    }

	  if(handler && handler[method]){
		  return handler[method].call(params,req,res,next);
	  }else{
		  return next();
	  }
  };
};

function getQueryRoute(routers){
  return paths=>{
    let pointer = {};
	  pointer = routers;
    const params = {};
	  for(let x = 0;x < paths.length;x ++){
      if(pointer.params){
        pointer.params.forEach((v)=>{
          params[v] = paths[x ++];
        });
        if(x >= paths.length){
          break;
        }
      }
		  pointer = pointer[paths[x]];
		  if(!pointer){
			  return false;
		  }
	  }
	  return {
      pointer:pointer,
      params:params
    };
  };
}


