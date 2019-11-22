# phpj
Minimalistic component based php and javascript framework

## Instructions
- Install webpack and webpack-cli dependencies
    > npm install
- Watch phpj dev envirionment to recompile on changes
    >node phpj-cli watch
- Generate a new phpj component
    >node phpj-cli generate component \<MyComponentName\>
- Generate a new phpj route
    >node phpj-cli generate route \<MyRouteName\> \<?method\> \<?privelege1\> \<?privelege2\> ...
- Generate a new phpj service
    >node phpj-cli generate service \<MyServiceName\>
- Generate a new javascript phpj service
    >node phpj-cli generate jservice \<MyServiceName\>