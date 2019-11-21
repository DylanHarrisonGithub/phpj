module.exports = {
  post: (route, params, headers) => {  // create
    phpj.engine.log(`Post request issued to route ${route} at timestamp ${Date.now()}.`);
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => phpj.services.http._getResponseContent(res)).then(res => {
      phpj.engine.log(`Response from post request to route ${route} at timestamp ${Date.now()}. Success: ${res.success}; Message: ${res.message}`);
      return res;
    });
  },
  get: (route, params, headers) => {  // read
    phpj.engine.log(`Get request issued to route ${route} at timestamp ${Date.now()}.`);
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    queryString.length ? queryString = "?" + queryString : "";
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route + '/' + queryString, {
        method: "GET",
        headers: { 'Content-Type': 'application/json', ...headers},
      }
    ).then(res => phpj.services.http._getResponseContent(res)).then(res => {
      phpj.engine.log(`Response from get request to route ${route} at timestamp ${Date.now()}. Success: ${res.success}; Message: ${res.message}`);
      return res;
    });
  },
  put: (route, params, headers) => { // update
    phpj.engine.log(`Pup request issued to route ${route} at timestamp ${Date.now()}.`);
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => phpj.services.http._getResponseContent(res)).then(res => {
      phpj.engine.log(`Response from put request to route ${route} at timestamp ${Date.now()}. Success: ${res.success}; Message: ${res.message}`);
      return res;
    });
  },
  patch: (route, params, headers) => { // partial update
    phpj.engine.log(`Patch request issued to route ${route} at timestamp ${Date.now()}.`);
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => phpj.services.http._getResponseContent(res)).then(res => {
      phpj.engine.log(`Response from patch request to route ${route} at timestamp ${Date.now()}. Success: ${res.success}; Message: ${res.message}`);
      return res;
    });
  },
  delete: (route, params, headers) => { // delete
    phpj.engine.log(`Delete request issued to route ${route} at timestamp ${Date.now()}.`);
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => phpj.services.http._getResponseContent(res)).then(res => {
      phpj.engine.log(`Response from delete request to route ${route} at timestamp ${Date.now()}. Success: ${res.success}; Message: ${res.message}`);
      return res;
    });
  },
  upload: (route, file, params, headers, onProgress) => {
    phpj.engine.log(`Upload request issued to route ${route} at timestamp ${Date.now()}.`);
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      // set content type?? 
      // "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
      if (headers) Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
      xhr.onload = e => resolve(xhr.response);
      xhr.onerror = err => reject(err);
      xhr.upload.onprogress = e => {
        phpj.engine.log(`File ${file.name} upload progress to route ${route}: ${e.loaded} / ${e.total}`);
        if (onProgress) onProgress(e);
      }
      let formData = new FormData();
      formData.append('file', file, file.name);
      if (params) formData.append('params', JSON.stringify(params));
      xhr.open('POST', phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route);
      xhr.send(formData);
    }).then(res => phpj.services.http._getResponseContent(res)).then(res => {
      phpj.engine.log(`Response from upload request to route ${route} at timestamp ${Date.now()}. Success: ${res.success}; Message: ${res.message}`);
      return res;
    });
  },
  _getResponseContent: (res) => {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return res.json();
    } else {
      return res.text();
    }
  }
}