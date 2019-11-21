module.exports = {
  setToken: (token) => {
    let res = phpj.services.storage.setItem('token', token);
    if (res.success) {
      return {
        success: true,
        message: 'User authentication token successfully set.'
      }
    } else {
      return {
        success: false,
        message: 'User authentication token could not be set.',
        error: res.message
      }
    }
  },
  getToken: () => {
    let res = phpj.services.storage.getItem('token');
    if (res.success) {
      return {
        success: true,
        message: 'User authentication token successfully retrieved.',
        token: res.item
      }
    } else {
      return {
        success: false,
        message: 'User authentication token could not be retrieved.',
        error: res.message
      }
    }
  },
  requestIntercept: () => {
    // cant be done?
  }
}