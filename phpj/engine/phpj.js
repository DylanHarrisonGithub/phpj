!function(e){var t={};function s(o){if(t[o])return t[o].exports;var p=t[o]={i:o,l:!1,exports:{}};return e[o].call(p.exports,p,p.exports,s),p.l=!0,p.exports}s.m=e,s.c=t,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var p in e)s.d(o,p,function(t){return e[t]}.bind(null,p));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){window.phpj={state:[],components:{phpjdemo:s(1)},services:s(2),engine:s(7),config:s(8),log:[]},phpj.engine.mutationObserver.observe(document,{childList:!0,subtree:!0}),phpj.engine.log("phpj initialized.")},function(e,t){e.exports=class{constructor(e,t){phpj.services.http.get("test1",{val:"testval"},{bearer:"test token"}).then(e=>{var t=document.createElement("template");e=e.trim(),t.innerHTML=e,document.body.appendChild(t.content.firstChild)}).catch(e=>console.log(e)),phpj.services.http.post("login",{username:"myusername",password:"abcDEF123!@#"}).then(e=>{console.log(e)}).catch(e=>console.log(e)),console.log(phpj.services.storage.setItem("token",{id:0,username:"testuser",email:"myemail@mail.com",signature:"asdfjklfheioawhiovnaiose234@#$@#$"})),console.log(phpj.services.storage.getItem("token"))}}},function(e,t,s){e.exports={storage:s(3),authentication:s(4),http:s(5),validation:s(6)}},function(e,t){e.exports={getItem:e=>{let t=phpj.services.storage._getAppStorage();if(t.success)try{return(t=JSON.parse(t.item)).hasOwnProperty(e)?{success:!0,message:"Item retrieved successfully.",item:t[e]}:{success:!1,message:"Item does not exist.",item:null}}catch(e){return phpj.engine.log("Error: phpj.service.storage could not retrieve app storage data because it could not be parsed into a valid JSON object."),{success:!1,message:"Could not retrieve app storage data because it could not be parsed.",item:null}}return{success:!1,message:t.message,item:null}},setItem:(e,t)=>{let s=phpj.services.storage._getAppStorage();if(s.success){try{s=JSON.parse(s.item)}catch(e){s={}}s[e]=t;let o=phpj.services.storage._setAppStorage(s);return o.success?{success:!0,message:`App storage key ${e} successfully set.`}:{success:!1,message:`App storage key ${e} could not be set.`,error:o.message}}{let s={};s[e]=t;let o=phpj.services.storage._setAppStorage(s);return o.success?{success:!0,message:`App storage key ${e} successfully set.`}:{success:!1,message:`App storage key ${e} could not be set.`,error:o.message}}},_setAppStorage:e=>{if(phpj.config.APP_NAME&&"string"==typeof phpj.config.APP_NAME)switch(phpj.config.STORAGE){case"LOCAL":return localStorage.setItem(phpj.config.APP_NAME,JSON.stringify(e)),{success:!0,message:"App Storage successfully stored to Local Storage."};case"SESSION":return sessionStorage.setItem(phpj.config.APP_NAME,JSON.stringify(e)),{success:!0,message:"App Storage successfully stored to Local Storage."};case"COOKIE":return phpj.services.storage._setAppCookie(JSON.stringify(e));default:return{success:!1,message:'App Storage could not be set because phpj.config.STORAGE must be one of "LOCAL", "SESSION", or "COOKIE"..'}}return phpj.engine.log("Error: phpj.service.storage could not set app storage data because phpj.config.APP_NAME is not valid."),{success:!1,message:"App Storage could not be set because because phpj.config.APP_NAME is not valid.",item:null}},_getAppStorage:()=>{if(phpj.config.APP_NAME&&"string"==typeof phpj.config.APP_NAME){let e=null;switch(phpj.config.STORAGE){case"LOCAL":e=localStorage.getItem(phpj.config.APP_NAME);break;case"SESSION":e=sessionStorage.getItem(phpj.config.APP_NAME);break;case"COOKIE":e=phpj.services.storage._getAppCookie().item;break;default:return{success:!1,message:'App Storage could not be retrieved because phpj.config.STORAGE must be one of "LOCAL", "SESSION", or "COOKIE"..',item:null}}return e?{success:!0,message:`App Storage retrieved from ${phpj.config.STORAGE}`,item:e}:{success:!1,message:`Failed to retrieve App Storage from ${phpj.config.STORAGE}`,item:null}}return phpj.engine.log("Error: phpj.service.storage could not retrieve app storage data because phpj.config.APP_NAME is not valid."),{success:!1,message:"App Storage could not be retrieved because because phpj.config.APP_NAME is not valid.",item:null}},_getAppCookie:()=>{if(phpj.config.APP_NAME&&"string"==typeof phpj.config.APP_NAME){var e,t,s,o=document.cookie.split(";");for(e=0;e<o.length;e++)if(t=o[e].substr(0,o[e].indexOf("=")),s=o[e].substr(o[e].indexOf("=")+1),(t=t.replace(/^\s+|\s+$/g,""))==phpj.config.APP_NAME)return{success:!0,message:"Successfully retrieved App Storage from cookie.",item:unescape(s)};return{success:!1,message:"App Storage cookie does not exist.",item:null}}return{success:!1,message:"Could not get App Storage cookie because phpj.config.APP_NAME is not valid."}},_setAppCookie:e=>{if(phpj.config.APP_NAME&&"string"==typeof phpj.config.APP_NAME){let t=new Date,s=null;t.setDate(t.getDate()+s);let o=escape(e)+(null==s?"":"; expires="+t.toUTCString());return document.cookie=phpj.config.APP_NAME+"="+o,{success:!0,message:"App Storage cookie successfuly set."}}return{success:!1,message:"Could not set App Storage cookie because phpj.config.APP_NAME is not valid."}}}},function(e,t){e.exports={setToken:e=>{let t=phpj.services.storage.setItem("token",e);return t.success?{success:!0,message:"User authentication token successfully set."}:{success:!1,message:"User authentication token could not be set.",error:t.message}},getToken:()=>{let e=phpj.services.storage.getItem("token");return e.success?{success:!0,message:"User authentication token successfully retrieved.",token:e.item}:{success:!1,message:"User authentication token could not be retrieved.",error:e.message}},requestIntercept:()=>{}}},function(e,t){e.exports={post:(e,t,s)=>(phpj.engine.log(`Post request issued to route ${e} at timestamp ${Date.now()}.`),fetch(phpj.config.URI[phpj.config.ENVIRONMENT]+"api.php/"+e,{method:"POST",headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(e=>phpj.services.http._getResponseContent(e)).then(t=>(phpj.engine.log(`Response from post request to route ${e} at timestamp ${Date.now()}. Success: ${t.success}; Message: ${t.message}`),t))),get:(e,t,s)=>{phpj.engine.log(`Get request issued to route ${e} at timestamp ${Date.now()}.`);let o=Object.keys(t).map(e=>e+"="+t[e]).join("&");return o.length&&(o="?"+o),fetch(phpj.config.URI[phpj.config.ENVIRONMENT]+"api.php/"+e+"/"+o,{method:"GET",headers:{"Content-Type":"application/json",...s}}).then(e=>phpj.services.http._getResponseContent(e)).then(t=>(phpj.engine.log(`Response from get request to route ${e} at timestamp ${Date.now()}. Success: ${t.success}; Message: ${t.message}`),t))},put:(e,t,s)=>(phpj.engine.log(`Pup request issued to route ${e} at timestamp ${Date.now()}.`),fetch(phpj.config.URI[phpj.config.ENVIRONMENT]+"api.php/"+e,{method:"PUT",headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(e=>phpj.services.http._getResponseContent(e)).then(t=>(phpj.engine.log(`Response from put request to route ${e} at timestamp ${Date.now()}. Success: ${t.success}; Message: ${t.message}`),t))),patch:(e,t,s)=>(phpj.engine.log(`Patch request issued to route ${e} at timestamp ${Date.now()}.`),fetch(phpj.config.URI[phpj.config.ENVIRONMENT]+"api.php/"+e,{method:"PATCH",headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(e=>phpj.services.http._getResponseContent(e)).then(t=>(phpj.engine.log(`Response from patch request to route ${e} at timestamp ${Date.now()}. Success: ${t.success}; Message: ${t.message}`),t))),delete:(e,t,s)=>(phpj.engine.log(`Delete request issued to route ${e} at timestamp ${Date.now()}.`),fetch(phpj.config.URI[phpj.config.ENVIRONMENT]+"api.php/"+e,{method:"PATCH",headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(e=>phpj.services.http._getResponseContent(e)).then(t=>(phpj.engine.log(`Response from delete request to route ${e} at timestamp ${Date.now()}. Success: ${t.success}; Message: ${t.message}`),t))),upload:(e,t,s,o,p)=>(phpj.engine.log(`Upload request issued to route ${e} at timestamp ${Date.now()}.`),new Promise((n,a)=>{let r=new XMLHttpRequest;o&&Object.keys(o).forEach(e=>r.setRequestHeader(e,o[e])),r.onload=e=>n(r.response),r.onerror=e=>a(e),r.upload.onprogress=s=>{phpj.engine.log(`File ${t.name} upload progress to route ${e}: ${s.loaded} / ${s.total}`),p&&p(s)};let i=new FormData;i.append("file",t,t.name),s&&i.append("params",JSON.stringify(s)),r.open("POST",phpj.config.URI[phpj.config.ENVIRONMENT]+"api.php/"+e),r.send(i)}).then(e=>phpj.services.http._getResponseContent(e)).then(t=>(phpj.engine.log(`Response from upload request to route ${e} at timestamp ${Date.now()}. Success: ${t.success}; Message: ${t.message}`),t))),_getResponseContent:e=>{const t=e.headers.get("content-type");return t&&-1!==t.indexOf("application/json")?e.json():e.text()}}},function(e,t){e.exports={validate:(e,t)=>{let s=[];for(let o in t)if(e.hasOwnProperty(o)&&e[o]){if(t[o].hasOwnProperty("type"))if("object"==typeof t[o].type)if(Array.isArray(e[o]))for(let p of e[o])s=s.concat(phpj.services.validation.validate(p,t[o].type));else s=s.concat(phpj.services.validation.validate(e[o],t[o].type));else if(t[o].type===typeof e[o])["number","string","boolean"].indexOf(typeof e[o])>-1?s=s.concat(phpj.services.validation._validateLeafNode(o,e[o],t[o])):s.push({key:o,message:o+" is not of a supported type"});else if(Array.isArray(e[o]))for(let p of e[o])s=s.concat(phpj.services.validation._validateLeafNode(o,p,t[o]));else s.push({key:o,message:o+" does not match specified type."})}else t[o].hasOwnProperty("required")&&t[o].required&&s.push({key:o,message:o+" is required."});return s},_validateLeafNode:(e,t,s)=>{let o=[];return s.hasOwnProperty("minLength")&&t.length<s.minLength&&o.push({key:e,message:e+" must be at least "+s.minLength+" characters long."}),s.hasOwnProperty("maxLength")&&t.length>s.maxLength&&o.push({key:e,message:e+" cannot exceed "+s.maxLength+" characters."}),s.hasOwnProperty("isAlpha")&&s.isAlpha&&(phpj.services.validation.regex.alpha.test(t)||o.push({key:e,message:e+" can only contain letters."})),s.hasOwnProperty("isAlphaNumeric")&&s.isAlphaNumeric&&(phpj.services.validation.regex.alphaNumeric.test(t)||o.push({key:e,message:e+" can only contain letters and numbers."})),s.hasOwnProperty("isAlphaNumericSpaces")&&s.isAlphaNumericSpaces&&(phpj.services.validation.regex.alphaNumericSpaces.test(t)||o.push({key:e,message:e+" can only contain letters, numbers and spaces."})),s.hasOwnProperty("isCommonWriting")&&s.isCommonWriting&&(phpj.services.validation.regex.commonWriting.test(t)||o.push({key:e,message:e+" can only contain letters, numbers, spaces and punctuation."})),s.hasOwnProperty("isEmail")&&s.isEmail&&(phpj.services.validation.regex.email.test(t)||o.push({key:e,message:e+" must be a valid email."})),s.hasOwnProperty("isPassword")&&s.isPassword&&(phpj.services.validation.regex.password.test(t)||o.push({key:e,message:e+" must contain at least one lowercase and uppercase letter, number, and special character."})),s.hasOwnProperty("regex")&&(s.regex.test(t)||o.push({key:e,message:e+" does not match format."})),s.hasOwnProperty("min")&&t<s.min&&o.push({key:e,message:e+" must be at least "+s.min+"."}),s.hasOwnProperty("max")&&t>s.max&&o.push({key:e,message:e+" cannot exceed "+s.max+"."}),o},_regex:{email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,alpha:/^[a-zA-Z]*$/,numeric:/^[0-9]*$/,alphaNumeric:/^[a-zA-Z0-9]*$/,alphaNumericSpaces:/^[a-zA-Z0-9 ]*$/,commonWriting:/^[A-Za-z0-9 \-_.,?!()"'/$&]*$/,password:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/}}},function(e,t){e.exports={mutationObserver:new MutationObserver((e,t)=>{for(let t of e)if("childList"===t.type)for(let e of t.addedNodes)if(e.attributes&&e.hasAttribute("phpjcomponent")){let t=e.getAttribute("phpjcomponent");if(phpj.components.hasOwnProperty(t)){let s=null;e.setAttribute("phpjcomponent",phpj.state.length),phpj.state.push({node:e,taggedNodes:phpj.engine.taggedNodeFinder(e),childComponents:null,component:null}),phpj.state[phpj.state.length-1].component=new phpj.components[t](e.getAttribute("phpjcomponent"),s),phpj.engine.log(`phpj component ${t} added to dom. id: ${e.getAttribute("phpjcomponent")}`)}else phpj.engine.log("phpj component -"+t+"- not defined.")}}),taggedNodeFinder:e=>{let t=document.createNodeIterator(e),s={};for(;t.nextNode();)if(t.referenceNode.attributes)for(attr of t.referenceNode.attributes)attr.name.startsWith("#")&&(s[attr.name.substr(1)]=t.referenceNode);return s},msgBubbleUP:(e,t,s)=>{let o=t,p=!0;for(;o.parentNode&&p&&o.parentNode!=document.body;)if(o.parentNode.hasAttribute("phpjcomponent")&&(p=!1,phpj.state[o.parentNode.getAttribute("phpjcomponent")])){let t=phpj.state[o.parentNode.getAttribute("phpjcomponent")].component;phpj.components[t].onMSG(o.parentNode.getAttribute("phpjcomponent"),e,s)}},log:e=>{"DEVELOPMENT"===phpj.config.ENVIRONMENT&&phpj.log.push(e)}}},function(e,t){e.exports={APP_NAME:"myPhpjApp",STORAGE:"COOKIE",ENVIRONMENT:"DEVELOPMENT",URI:{DEVELOPMENT:"http://localhost:80/phpj/",LAN:"http://192.168.1.68:80/phpj/",DEPLOY:"phpj/"},ASSETS:{DEVELOPMENT:"http://localhost:80/phpj/assets/",LAN:"http://localhost:80/phpj/assets/",DEPLOY:"phpj/assets/"}}}]);