(() => {
  window.phpj = { 
    state: [],
    components: {
      'login': require('../../components/login/login.component'),
      'register': require('../../components/register/register.component'),
      'home': require('../../components/home/home.component'),
      'navbar': require('../../components/navbar/navbar.component'),
      'app-main': require('../../components/app-main/app-main.component'),
      'phpjdemo': require('../../components/phpjdemo/phpjdemo.component'),
    },
    services: require('./services/services'),
    engine: require('./engine'),
    config: require('./config'),
    log: [],
  }
  phpj.engine.mutationObserver.observe(document, { 
    childList: true,
    subtree: true
  });
  phpj.engine.log('phpj initialized.');
})();