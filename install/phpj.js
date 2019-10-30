(() => {
  window.phpj = { 
    state: [],
    components: {
    },
    engine: require('./engine'),
    log: [],
    config: {
      developmentMode: true
    }
  }
  phpj.engine.mutationObserver.observe(document, { 
    childList: true,
    subtree: true
  });
  phpj.engine.log('phpj initialized.');
})();