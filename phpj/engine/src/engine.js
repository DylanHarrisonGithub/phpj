module.exports = {
  mutationObserver: new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (let node of mutation.addedNodes) {
          if (node.attributes) {
            if (node.hasAttribute('phpjcomponent')) {
              let component = node.getAttribute('phpjcomponent');
              if (phpj.components.hasOwnProperty(component)) {
                let params = null; //todo: get params
                node.setAttribute('phpjcomponent', phpj.state.length);
                phpj.state.push({
                  node: node,
                  taggedNodes: phpj.engine.taggedNodeFinder(node),
                  childComponents: null, //todo: get child components
                  component: null
                });
                phpj.state[phpj.state.length -1].component = new phpj.components[component](node.getAttribute('phpjcomponent'), params);
                phpj.engine.log(`phpj component ${component} added to dom. id: ${node.getAttribute('phpjcomponent')}`)
              } else {
                phpj.engine.log('phpj component -' + component + '- not defined.');
              }
            }
          }
        }
      }
    }
  }),
  taggedNodeFinder: (node) => {
    let nodeIterator = document.createNodeIterator(node);
    let tags = {};
    while (nodeIterator.nextNode()) {
      if (nodeIterator.referenceNode.attributes) {
        for (attr of nodeIterator.referenceNode.attributes) {
          if (attr.name.startsWith('#')) {
            tags[attr.name.substr(1)] = nodeIterator.referenceNode;
          }
        }
      }
    }
    return tags;
  },
  msgBubbleUP: (senderID, node, msg) => {
    let n = node;
    let trip = true;
    while (n.parentNode && trip && n.parentNode != document.body) {
      if (n.parentNode.hasAttribute('phpjcomponent')) {
        trip = false;
        if (phpj.state[n.parentNode.getAttribute('phpjcomponent')]) {
          let componentType = phpj.state[n.parentNode.getAttribute('phpjcomponent')].component;
          phpj.components[componentType].onMSG(n.parentNode.getAttribute('phpjcomponent'), senderID, msg);
        }
      }
    }
  },
  log: (msg) => {
    if (phpj.config.developmentMode) {
      phpj.log.push(msg);
    }
  }
}