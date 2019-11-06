(() => {
  window.phpj = { 
    state: [],
    components: {
      phpjdemo: require('../../components/phpjdemo/phpjdemo.component'),
    },
    engine: require('./engine'),
    log: [],
    config: require('./config')
  }
  phpj.engine.mutationObserver.observe(document, { 
    childList: true,
    subtree: true
  });
  phpj.engine.log('phpj initialized.');
})();