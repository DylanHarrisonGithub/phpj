module.exports = {
  post: (route, params, headers) => {  // create
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => phpj.services.http._getResponseContent(res));
  },
  get: (route, params, headers) => {  // read
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    queryString.length ? queryString = "?" + queryString : "";
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route + '/' + queryString, {
        method: "GET",
        headers: { 'Content-Type': 'application/json', ...headers},
      }
    ).then(res => phpj.services.http._getResponseContent(res));
  },
  put: (route, params, headers) => { // update
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => phpj.services.http._getResponseContent(res));
  },
  patch: (route, params, headers) => { // partial update
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => phpj.services.http._getResponseContent(res));
  },
  delete: (route, params, headers) => { // delete
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => phpj.services.http._getResponseContent(res));
  },
  upload: (route, file, params, headers, onProgress) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      // set content type?? 
      // "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
      if (headers) Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
      xhr.onload = e => resolve(xhr.response);
      xhr.onerror = err => reject(err);
      if (onProgress) {
        xhr.upload.onprogress = e => onProgress(e); 
      } else {
        xhr.upload.onprogress = e => console.log(`${e.loaded} / ${e.total}`);
      }
      let formData = new FormData();
      formData.append('file', file, file.name);
      if (params) formData.append('params', JSON.stringify(params));
      xhr.open('POST', phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route);
      xhr.send(formData);
    }).then(res => {return JSON.parse(res);});
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