(() => {
  window.phpj = { 
    state: [],
    components: {
      phpjdemo: require('../../components/phpjdemo/phpjdemo.component'),
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