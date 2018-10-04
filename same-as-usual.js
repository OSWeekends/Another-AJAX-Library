function $http (baseUrl){

	let headers = {}
	function wrapperAjax ({url, method, data}){
		const setup = {}
			setup.method = method;
			setup.headers = headers;
			if(data){
				setup.body = typeof(data) !== "string" ? JSON.stringify(data): data;
			}
		return fetch(`${baseUrl+ url}`, setup)
	}

	function fallbackStrategy (prom, cb) {
		if(cb && typeof(cb) === "function") {
			prom
				.then(response => response.json())
				.then(data => cb(false, data))
				.catch(cb)
		} else {
			return prom.then(response => response.json())
		}
	}

	return {
		headers(obj){
			const _self = this;
			this.headers = obj;
			return _self;
		},
		method(verb, url, data, cb){
			return fallbackStrategy(wrapperAjax({
				url, method:verb, data
			}), cb)
		},
		get(url, cb){
			return fallbackStrategy(wrapperAjax({
				url, method:"GET"
			}), cb)
		},
		post(url, data, cb){
			return fallbackStrategy(wrapperAjax({
				url, method:"POST", data
			}), cb)
		},
		put(url, data, cb){
			return fallbackStrategy(wrapperAjax({
				url, method:"PUT", data
			}), cb)
		},
		delete(url, cb){
			return fallbackStrategy(wrapperAjax({
				url, method:"DELETE"
			}), cb)
		}
	}
}
