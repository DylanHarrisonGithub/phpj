(() => {
  window.phpj = { 
    state: [],
    components: {
      'App-Main': require('../../components/App-Main/App-Main.script'),
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