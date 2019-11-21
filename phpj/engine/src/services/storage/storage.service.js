module.exports = {
  getItem: (key) => {
    let appStorage = phpj.services.storage._getAppStorage();
    if (appStorage.success) {
      try {
        appStorage = JSON.parse(appStorage.item);
        if (appStorage.hasOwnProperty(key)) {
          return {
            success: true,
            message: 'Item retrieved successfully.',
            item: appStorage[key]
          }
        } else {
          return {
            success: false,
            message: 'Item does not exist.',
            item: null
          }
        }
      } catch (e) {
        phpj.engine.log(`Error: phpj.service.storage could not retrieve app storage data because it could not be parsed into a valid JSON object.`);
        return {
          success: false,
          message: 'Could not retrieve app storage data because it could not be parsed.',
          item: null
        }
      }
    }
    return {
      success: false,
      message: appStorage.message,
      item: null
    }
  },
  setItem: (key, value) => {
    let appStorage = phpj.services.storage._getAppStorage();
    if (appStorage.success) {
      try {
        appStorage = JSON.parse(appStorage.item);
      } catch (e) {
        appStorage = {} 
      }
      appStorage[key] = value;
      let res = phpj.services.storage._setAppStorage(appStorage);
      if (res.success) {
        return {
          success: true,
          message: `App storage key ${key} successfully set.`
        }
      } else {
        return {
          success: false,
          message: `App storage key ${key} could not be set.`,
          error: res.message
        }
      }
    } else {
      let newAppStorage = {};
      newAppStorage[key] = value
      let res = phpj.services.storage._setAppStorage(newAppStorage);
      if (res.success) {
        return {
          success: true,
          message: `App storage key ${key} successfully set.`
        }
      } else {
        return {
          success: false,
          message: `App storage key ${key} could not be set.`,
          error: res.message
        }
      }
    }
  },
  _setAppStorage: (appStorage) => {
    if (phpj.config['APP_NAME'] && (typeof phpj.config['APP_NAME'] === 'string')) {
      switch(phpj.config['STORAGE']) {
        case 'LOCAL':
          localStorage.setItem(phpj.config['APP_NAME'], JSON.stringify(appStorage));
          return {
            success: true,
            message: 'App Storage successfully stored to Local Storage.'
          }
        case 'SESSION':
          sessionStorage.setItem(phpj.config['APP_NAME'], JSON.stringify(appStorage));
          return {
            success: true,
            message: 'App Storage successfully stored to Local Storage.'
          }
        case 'COOKIE':          
          return phpj.services.storage._setAppCookie(JSON.stringify(appStorage));
        default:
          return {
            success: false,
            message: 'App Storage could not be set because phpj.config.STORAGE must be one of "LOCAL", "SESSION", or "COOKIE"..',
          }
      }
    }
    phpj.engine.log(`Error: phpj.service.storage could not set app storage data because phpj.config.APP_NAME is not valid.`);
    return {
      success: false,
      message: 'App Storage could not be set because because phpj.config.APP_NAME is not valid.',
      item: null
    }
  },
  _getAppStorage: () => {
    if (phpj.config['APP_NAME'] && (typeof phpj.config['APP_NAME'] === 'string')) {
      let appStorage = null;
      switch(phpj.config['STORAGE']) {
        case 'LOCAL':
          appStorage = localStorage.getItem(phpj.config['APP_NAME']);
          break;
        case 'SESSION':
          appStorage = sessionStorage.getItem(phpj.config['APP_NAME']);
          break;
        case 'COOKIE':          
          appStorage = phpj.services.storage._getAppCookie().item;
          break;
        default:
          return {
            success: false,
            message: 'App Storage could not be retrieved because phpj.config.STORAGE must be one of "LOCAL", "SESSION", or "COOKIE"..',
            item: null
          }
      }
      if (appStorage) {
        return {
          success: true,
          message: `App Storage retrieved from ${phpj.config['STORAGE']}`,
          item: appStorage
        }
      } else {
        return {
          success: false,
          message: `Failed to retrieve App Storage from ${phpj.config['STORAGE']}`,
          item: null
        }
      }
    }
    phpj.engine.log(`Error: phpj.service.storage could not retrieve app storage data because phpj.config.APP_NAME is not valid.`);
    return {
      success: false,
      message: 'App Storage could not be retrieved because because phpj.config.APP_NAME is not valid.',
      item: null
    }
  },
  _getAppCookie: () => {
    if (phpj.config['APP_NAME'] && (typeof phpj.config['APP_NAME'] === 'string')) {
      var i, x, y, ARRcookies = document.cookie.split(";");
      for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == phpj.config['APP_NAME']) {
          return {
            success: true,
            message: 'Successfully retrieved App Storage from cookie.',
            item: unescape(y)
          }
        }
      }
      return {
        success: false,
        message: 'App Storage cookie does not exist.',
        item: null
      }
    }
    return {
      success: false,
      message: 'Could not get App Storage cookie because phpj.config.APP_NAME is not valid.'
    }
  },
  _setAppCookie: (appStorage) => {
    if (phpj.config['APP_NAME'] && (typeof phpj.config['APP_NAME'] === 'string')) {
      let exdate = new Date();
      let exdays = null;
      exdate.setDate(exdate.getDate() + exdays);
      let c_value = escape(appStorage) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
      document.cookie = phpj.config['APP_NAME'] + "=" + c_value;
      return {
        success: true,
        message: 'App Storage cookie successfuly set.'
      }
    } else {
      return {
        success: false,
        message: 'Could not set App Storage cookie because phpj.config.APP_NAME is not valid.'
      }
    }
  }
}