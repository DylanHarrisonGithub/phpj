module.exports = {
  post: (route, params, headers) => {  // create
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => res.json());
  },
  get: (route, params, headers) => {  // read
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route + '/' + queryString, {
        method: "GET",
        headers: { 'Content-Type': 'application/json', ...headers},
      }
    ).then(res => res.json());
  },
  put: (route, params, headers) => { // update
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => res.json());
  },
  patch: (route, params, headers) => { // partial update
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => res.json());
  },
  delete: (route, params, headers) => { // delete
    return fetch(
      phpj.config.URI[phpj.config.ENVIRONMENT] + 'api.php/' + route, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json', ...headers},
        body: JSON.stringify(params)
      }
    ).then(res => res.json());
  },
}