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
  _getResponseContent: (res) => {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return res.json();
    } else {
      return res.text();
    }
  }
}