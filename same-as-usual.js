function $http(baseUrl) {

    let headers = {}
    function wrapperAjax({ url, method, data }) {
        const setup = {}
        setup.method = method;
        setup.headers = headers;
        if (data) {
            setup.body = typeof (data) !== "string" ? JSON.stringify(data) : data;
        }
        return ajaxFallback(`${baseUrl + url}`, setup);
    }

    function fallbackStrategy(prom, cb) {
        if (cb && typeof (cb) === "function") {
          debugger;
            prom
                .then(response => response.json())
                .then(data => cb(false, data))
                .catch(cb);
        } else {
            return prom.then(response => {
              return response.json();
            });
        }
    }

    function XMLHttpRequestAsFetch(url, setup) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(ev) {

                if (xhr.readyState == 4) {
                    if (xhr.status < 300) {
                        resolve({
                            json: ()=> promisifiedJson(xhr.responseText),
                        })
                    } else {
                        reject(ev.responseText)
                    }

                }
            }
            xhr.open(setup.method, url, false);


            for (let header in headers) {
                xhr.setRequestHeader(header, headers[header])
            }

            if (setup.body) {
                xhr.send(setup.body)
            } else {
                xhr.send();
            }
        })
    }

    function promisifiedJson(data) {
      return new Promise((res, rej) => {
          try {
              let obj = JSON.parse(data)
              res(obj)
          } catch (error) {
              rej(error)
          }
      })
  }

    function ajaxFallback(url, setup) {
        if (fetch && typeof (fetch) === "function") {
            return fetch(url, setup)
        } else {
            return XMLHttpRequestAsFetch(url, setup)
        }

    }

    return {
        headers(obj) {
            const _self = this;
            this.headers = obj;
            return _self;
        },
        method(verb, url, data, cb) {
            return fallbackStrategy(wrapperAjax({
                url, method: verb, data
            }), cb)
        },
        get(url, cb) {
            return fallbackStrategy(wrapperAjax({
                url, method: "GET"
            }), cb)
        },
        post(url, data, cb) {
            return fallbackStrategy(wrapperAjax({
                url, method: "POST", data
            }), cb)
        },
        put(url, data, cb) {
            return fallbackStrategy(wrapperAjax({
                url, method: "PUT", data
            }), cb)
        },
        delete(url, cb) {
            return fallbackStrategy(wrapperAjax({
                url, method: "DELETE"
            }), cb)
        }
    }
}

$http("http://airemad.com/api/v1/")
    .get("station/S001")
    .then(console.log)
    .catch(console.warn)