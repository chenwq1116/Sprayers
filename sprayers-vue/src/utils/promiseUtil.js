export function getPromiseAction(api,context,mutationsType){
	return new Promise((resolve,reject)=>{
		api
		.then(res=>{
			if(res.status){
				context.commit(mutationsType,res);
				resolve(true);
			}else{
				context.commit(mutationsType,res);
				reject(false);
			}
		},error=>{
			reject(error);
		})
	});
}

export function getPromiseActionNoMutations(api){
	return new Promise((resolve,reject)=>{
		api.then(res=>{
			if(res.status){
				resolve(res);
			}else{
				reject(res);
			}
		},error=>{
			reject(error);
		})
	})
}