parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"q/W5":[function(require,module,exports) {
"use strict";function e(e,t,o,r,d){return{sel:e,data:t,children:o,text:r,elm:d,key:void 0===t?void 0:t.key}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.vnode=e,exports.default=void 0;var t=e;exports.default=t;
},{}],"eb7c":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.primitive=e,exports.array=void 0;var r=Array.isArray;function e(r){return"string"==typeof r||"number"==typeof r}exports.array=r;
},{}],"H/UI":[function(require,module,exports) {
"use strict";function e(e){return document.createElement(e)}function t(e,t){return document.createElementNS(e,t)}function n(e){return document.createTextNode(e)}function r(e){return document.createComment(e)}function o(e,t,n){e.insertBefore(t,n)}function u(e,t){e.removeChild(t)}function i(e,t){e.appendChild(t)}function c(e){return e.parentNode}function m(e){return e.nextSibling}function d(e){return e.tagName}function a(e,t){e.textContent=t}function f(e){return e.textContent}function l(e){return 1===e.nodeType}function p(e){return 3===e.nodeType}function s(e){return 8===e.nodeType}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.htmlDomApi=void 0;var x={createElement:e,createElementNS:t,createTextNode:n,createComment:r,insertBefore:o,removeChild:u,appendChild:i,parentNode:c,nextSibling:m,tagName:d,setTextContent:a,getTextContent:f,isElement:l,isText:p,isComment:s};exports.htmlDomApi=x;var C=x;exports.default=C;
},{}],"/gbe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.h=o,exports.default=void 0;var e=require("./vnode"),r=t(require("./is"));function t(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var i=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,t):{};i.get||i.set?Object.defineProperty(r,t,i):r[t]=e[t]}return r.default=e,r}function i(e,r,t){if(e.ns="http://www.w3.org/2000/svg","foreignObject"!==t&&void 0!==r)for(var o=0;o<r.length;++o){var v=r[o].data;void 0!==v&&i(v,r[o].children,r[o].sel)}}function o(t,o,v){var n,d,a,s={};if(void 0!==v?(s=o,r.array(v)?n=v:r.primitive(v)?d=v:v&&v.sel&&(n=[v])):void 0!==o&&(r.array(o)?n=o:r.primitive(o)?d=o:o&&o.sel?n=[o]:s=o),void 0!==n)for(a=0;a<n.length;++a)r.primitive(n[a])&&(n[a]=(0,e.vnode)(void 0,void 0,void 0,n[a],void 0));return"s"!==t[0]||"v"!==t[1]||"g"!==t[2]||3!==t.length&&"."!==t[3]&&"#"!==t[3]||i(s,n,t),(0,e.vnode)(t,s,n,d,void 0)}var v=o;exports.default=v;
},{"./vnode":"q/W5","./is":"eb7c"}],"YrEB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.thunk=void 0;var t=require("./h");function a(t,a){a.elm=t.elm,t.data.fn=a.data.fn,t.data.args=a.data.args,a.data=t.data,a.children=t.children,a.text=t.text,a.elm=t.elm}function e(t){var e=t.data;a(e.fn.apply(void 0,e.args),t)}function r(t,e){var r,n=t.data,d=e.data,o=n.args,i=d.args;if(n.fn===d.fn&&o.length===i.length){for(r=0;r<i.length;++r)if(o[r]!==i[r])return void a(d.fn.apply(void 0,i),e);a(t,e)}else a(d.fn.apply(void 0,i),e)}var n=function(a,n,d,o){return void 0===o&&(o=d,d=n,n=void 0),(0,t.h)(a,{key:n,hook:{init:e,prepatch:r},fn:d,args:o})};exports.thunk=n;var d=n;exports.default=d;
},{"./h":"/gbe"}],"+cdq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.init=h,Object.defineProperty(exports,"h",{enumerable:!0,get:function(){return n.h}}),Object.defineProperty(exports,"thunk",{enumerable:!0,get:function(){return o.thunk}});var e=i(require("./vnode")),t=l(require("./is")),r=i(require("./htmldomapi")),n=require("./h"),o=require("./thunk");function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return void 0===e}function u(e){return void 0!==e}var d=(0,e.default)("",{},[],void 0,void 0);function f(e,t){return e.key===t.key&&e.sel===t.sel}function s(e){return void 0!==e.sel}function c(e,t,r){var n,o,l,i={};for(n=t;n<=r;++n)null!=(l=e[n])&&void 0!==(o=l.key)&&(i[o]=n);return i}var v=["create","update","remove","destroy","pre","post"];function h(n,o){var l,i,h={},p=void 0!==o?o:r.default;for(l=0;l<v.length;++l)for(h[v[l]]=[],i=0;i<n.length;++i){var m=n[i][v[l]];void 0!==m&&h[v[l]].push(m)}function g(e,t){return function(){if(0==--t){var r=p.parentNode(e);p.removeChild(r,e)}}}function x(e,r){var n,o=e.data;void 0!==o&&u(n=o.hook)&&u(n=n.init)&&(n(e),o=e.data);var l=e.children,i=e.sel;if("!"===i)a(e.text)&&(e.text=""),e.elm=p.createComment(e.text);else if(void 0!==i){var f=i.indexOf("#"),s=i.indexOf(".",f),c=f>0?f:i.length,v=s>0?s:i.length,m=-1!==f||-1!==s?i.slice(0,Math.min(c,v)):i,g=e.elm=u(o)&&u(n=o.ns)?p.createElementNS(n,m):p.createElement(m);for(c<v&&g.setAttribute("id",i.slice(c+1,v)),s>0&&g.setAttribute("class",i.slice(v+1).replace(/\./g," ")),n=0;n<h.create.length;++n)h.create[n](d,e);if(t.array(l))for(n=0;n<l.length;++n){var y=l[n];null!=y&&p.appendChild(g,x(y,r))}else t.primitive(e.text)&&p.appendChild(g,p.createTextNode(e.text));u(n=e.data.hook)&&(n.create&&n.create(d,e),n.insert&&r.push(e))}else e.elm=p.createTextNode(e.text);return e.elm}function y(e,t,r,n,o,l){for(;n<=o;++n){var i=r[n];null!=i&&p.insertBefore(e,x(i,l),t)}}function b(e){var t,r,n=e.data;if(void 0!==n){for(u(t=n.hook)&&u(t=t.destroy)&&t(e),t=0;t<h.destroy.length;++t)h.destroy[t](e);if(void 0!==e.children)for(r=0;r<e.children.length;++r)null!=(t=e.children[r])&&"string"!=typeof t&&b(t)}}function k(e,t,r,n){for(;r<=n;++r){var o=void 0,l=void 0,i=void 0,a=t[r];if(null!=a)if(u(a.sel)){for(b(a),l=h.remove.length+1,i=g(a.elm,l),o=0;o<h.remove.length;++o)h.remove[o](a,i);u(o=a.data)&&u(o=o.hook)&&u(o=o.remove)?o(a,i):i()}else p.removeChild(e,a.elm)}}function O(e,t,r){var n,o;u(n=t.data)&&u(o=n.hook)&&u(n=o.prepatch)&&n(e,t);var l=t.elm=e.elm,i=e.children,d=t.children;if(e!==t){if(void 0!==t.data){for(n=0;n<h.update.length;++n)h.update[n](e,t);u(n=t.data.hook)&&u(n=n.update)&&n(e,t)}a(t.text)?u(i)&&u(d)?i!==d&&function(e,t,r,n){for(var o,l,i,u=0,d=0,s=t.length-1,v=t[0],h=t[s],m=r.length-1,g=r[0],b=r[m];u<=s&&d<=m;)null==v?v=t[++u]:null==h?h=t[--s]:null==g?g=r[++d]:null==b?b=r[--m]:f(v,g)?(O(v,g,n),v=t[++u],g=r[++d]):f(h,b)?(O(h,b,n),h=t[--s],b=r[--m]):f(v,b)?(O(v,b,n),p.insertBefore(e,v.elm,p.nextSibling(h.elm)),v=t[++u],b=r[--m]):f(h,g)?(O(h,g,n),p.insertBefore(e,h.elm,v.elm),h=t[--s],g=r[++d]):(void 0===o&&(o=c(t,u,s)),a(l=o[g.key])?(p.insertBefore(e,x(g,n),v.elm),g=r[++d]):((i=t[l]).sel!==g.sel?p.insertBefore(e,x(g,n),v.elm):(O(i,g,n),t[l]=void 0,p.insertBefore(e,i.elm,v.elm)),g=r[++d]));(u<=s||d<=m)&&(u>s?y(e,null==r[m+1]?null:r[m+1].elm,r,d,m,n):k(e,t,u,s))}(l,i,d,r):u(d)?(u(e.text)&&p.setTextContent(l,""),y(l,null,d,0,d.length-1,r)):u(i)?k(l,i,0,i.length-1):u(e.text)&&p.setTextContent(l,""):e.text!==t.text&&(u(i)&&k(l,i,0,i.length-1),p.setTextContent(l,t.text)),u(o)&&u(n=o.postpatch)&&n(e,t)}}return function(t,r){var n,o,l,i=[];for(n=0;n<h.pre.length;++n)h.pre[n]();for(s(t)||(t=function(t){var r=t.id?"#"+t.id:"",n=t.className?"."+t.className.split(" ").join("."):"";return(0,e.default)(p.tagName(t).toLowerCase()+r+n,{},[],void 0,t)}(t)),f(t,r)?O(t,r,i):(o=t.elm,l=p.parentNode(o),x(r,i),null!==l&&(p.insertBefore(l,r.elm,p.nextSibling(o)),k(l,[t],0,0))),n=0;n<i.length;++n)i[n].data.hook.insert(i[n]);for(n=0;n<h.post.length;++n)h.post[n]();return r}}
},{"./vnode":"q/W5","./is":"eb7c","./htmldomapi":"H/UI","./h":"/gbe","./thunk":"YrEB"}],"W3WL":[function(require,module,exports) {
"use strict";function e(e,s){var a,t,o=s.elm,r=e.data.class,l=s.data.class;if((r||l)&&r!==l){for(t in l=l||{},r=r||{})l[t]||o.classList.remove(t);for(t in l)(a=l[t])!==r[t]&&o.classList[a?"add":"remove"](t)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.classModule={create:e,update:e},exports.default=exports.classModule;
},{}],"F8cu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t="http://www.w3.org/1999/xlink",e="http://www.w3.org/XML/1998/namespace",r=58,a=120;function o(o,i){var s,u=i.elm,d=o.data.attrs,b=i.data.attrs;if((d||b)&&d!==b){for(s in d=d||{},b=b||{}){var A=b[s];d[s]!==A&&(!0===A?u.setAttribute(s,""):!1===A?u.removeAttribute(s):s.charCodeAt(0)!==a?u.setAttribute(s,A):s.charCodeAt(3)===r?u.setAttributeNS(e,s,A):s.charCodeAt(5)===r?u.setAttributeNS(t,s,A):u.setAttribute(s,A))}for(s in d)s in b||u.removeAttribute(s)}}exports.attributesModule={create:o,update:o},exports.default=exports.attributesModule;
},{}],"cgcq":[function(require,module,exports) {
"use strict";function e(e,o){var r,t,p=o.elm,s=e.data.props,a=o.data.props;if((s||a)&&s!==a){for(r in a=a||{},s=s||{})a[r]||delete p[r];for(r in a)t=a[r],s[r]===t||"value"===r&&p[r]===t||(p[r]=t)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.propsModule={create:e,update:e},exports.default=exports.propsModule;
},{}],"5lwS":[function(require,module,exports) {
"use strict";function e(t,n,i){if("function"==typeof t)t.call(n,i,n);else if("object"==typeof t)if("function"==typeof t[0])if(2===t.length)t[0].call(n,t[1],i,n);else{var o=t.slice(1);o.push(i),o.push(n),t[0].apply(n,o)}else for(var r=0;r<t.length;r++)e(t[r],n,i)}function t(t,n){var i=t.type,o=n.data.on;o&&o[i]&&e(o[i],n,t)}function n(){return function e(n){t(n,e.vnode)}}function i(e,t){var i,o=e.data.on,r=e.listener,s=e.elm,f=t&&t.data.on,l=t&&t.elm;if(o!==f){if(o&&r)if(f)for(i in o)f[i]||s.removeEventListener(i,r,!1);else for(i in o)s.removeEventListener(i,r,!1);if(f){var a=t.listener=e.listener||n();if(a.vnode=t,o)for(i in f)o[i]||l.addEventListener(i,a,!1);else for(i in f)l.addEventListener(i,a,!1)}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.eventListenersModule={create:i,update:i,destroy:i},exports.default=exports.eventListenersModule;
},{}],"8W6r":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(e){return"string"==typeof e&&e.length>0},t=function(e,t){return e[0]===t},r=function(r){return e(r)&&(t(r,".")||t(r,"#"))},o=function(e){return function(t){return function(o){for(var a=arguments.length,n=Array(a>1?a-1:0),i=1;i<a;i++)n[i-1]=arguments[i];return r(o)?e.apply(void 0,[t+o].concat(n)):void 0===o?e(t):e.apply(void 0,[t,o].concat(n))}}},a=["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","bgsound","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","command","content","data","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","element","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","image","img","input","ins","isindex","kbd","keygen","label","legend","li","link","listing","main","map","mark","marquee","math","menu","menuitem","meta","meter","multicol","nav","nextid","nobr","noembed","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","plaintext","pre","progress","q","rb","rbc","rp","rt","rtc","ruby","s","samp","script","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr","xmp"];exports.default=function(e){var t=o(e),n={TAG_NAMES:a,isSelector:r,createTag:t};return a.forEach(function(e){n[e]=t(e)}),n},module.exports=exports.default;
},{}],"l/1b":[function(require,module,exports) {
"use strict";function e(e,t,o,r,d){return{sel:e,data:t,children:o,text:r,elm:d,key:void 0===t?void 0:t.key}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.vnode=e,exports.default=e;
},{}],"XNOe":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("snabbdom"),o=e(require("snabbdom/modules/class")),r=e(require("snabbdom/modules/attributes")),s=e(require("snabbdom/modules/props")),a=e(require("snabbdom/modules/eventlisteners")),d=e(require("hyperscript-helpers")),u=require("snabbdom/vnode");function i(e,t,o){e&&(e.data=e.data||{},e.data.hook=e.data.hook||{},e.data.hook[t]=o)}exports.VNode=u.VNode,exports.patch=t.init([o.default,r.default,s.default,a.default]),exports.html=d.default(t.h),exports.setHook=i;
},{"snabbdom":"+cdq","snabbdom/modules/class":"W3WL","snabbdom/modules/attributes":"F8cu","snabbdom/modules/props":"cgcq","snabbdom/modules/eventlisteners":"5lwS","hyperscript-helpers":"8W6r","snabbdom/vnode":"l/1b"}],"oy+O":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var o="",n=/[&?]debug/.test(window.location.search);exports.log={noInitialAction:function(e,r){n&&(console.group("%c#"+e,"color: #69f"),r&&console.log(""+JSON.stringify(r)),o=e)},updateStart:function(e,r,c,t){if(n){o&&o===e||(console.group("%c#"+e,"color: #69f"),r&&console.log("%c"+JSON.stringify(r),"text-decoration: line-through;"),o=e);var s=""+String(c);t&&(s+=" "+JSON.stringify(t)),console.log("%c"+s,"color: #f6b")}},updateEnd:function(o){n&&o&&console.log(""+JSON.stringify(o))},taskPerform:function(o,e){n&&console.log('%cTask "'+o+'" perform'+(e?"...":"ed"),"color: #dd8")},taskSuccess:function(o,e){n&&console.log("%c\n...#"+o+' task "'+e+'" success',"color: #dd8")},taskFailure:function(o,e,r){n&&(console.log("%c\n...#"+o+' task "'+e+'" failure',"color: #dd8"),console.error(JSON.stringify(r)))},render:function(e,r){if(n){console.groupEnd();var c="⟳ Render #"+e;r&&Object.keys(r).length&&(c+=", props: "+JSON.stringify(r)),console.log("%c"+c,"color: #888"),o=""}},noRender:function(e){if(n){console.groupEnd();var r="! No render - #"+e+" has no changes";console.log("%c"+r,"color: #888"),o=""}},manualError:function(o,n){console.error("Error: #"+o+' "'+n+'" cannot be invoked manually')}},window.addEventListener("error",function(){setTimeout(function(){console.groupEnd(),o=""})});
},{}],"jIGR":[function(require,module,exports) {
"use strict";var r=Array.isArray,t=Object.keys,e=Object.prototype.hasOwnProperty;module.exports=function n(i,f){if(i===f)return!0;if(i&&f&&"object"==typeof i&&"object"==typeof f){var o,u,a,c=r(i),g=r(f);if(c&&g){if((u=i.length)!=f.length)return!1;for(o=u;0!=o--;)if(!n(i[o],f[o]))return!1;return!0}if(c!=g)return!1;var s=i instanceof Date,p=f instanceof Date;if(s!=p)return!1;if(s&&p)return i.getTime()==f.getTime();var l=i instanceof RegExp,y=f instanceof RegExp;if(l!=y)return!1;if(l&&y)return i.toString()==f.toString();var h=t(i);if((u=h.length)!==t(f).length)return!1;for(o=u;0!=o--;)if(!e.call(f,h[o]))return!1;for(o=u;0!=o--;)if(!n(i[a=h[o]],f[a]))return!1;return!0}return i!=i&&f!=f};
},{}],"0482":[function(require,module,exports) {
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./vdom"),r=require("./vdom");exports.html=r.html;var o,i=require("./jetixLog"),u=e(require("fast-deep-equal"));!function(t){t[t.Action=0]="Action",t[t.Task=1]="Task"}(o||(o={}));var s,a="app",c={},f={},l={},p=!1;function m(t){var e=function(e,n){var r=e.replace(/^#/,"");if(!r.length)throw Error("Component requires an id");return d(r,n,t)};return e.getConfig=t,e}function d(t,e,r){b(e);var c=t===a,m=y(t,e);if(m)return m;var d=function e(n,r){var u=function(o){g(o)?w(n,r):o===l?w(n,r):o?e(n,o):i.log.manualError(t,String(n))};return u.type=o.Action,u},v=function(e,n){if(!S.tasks)throw Error("tasks "+String(S.tasks));var r=function(){var t=S.tasks[e](n),r=t.perform,o=t.success,i=t.failure,u=r();if(u&&u.then)return u.then(o).catch(i)},u=function(n){if(g(n))r();else{if(n===l)return r();i.log.manualError(t,String(e))}};return u.type=o.Task,u.taskName=String(e),u},S=r(d,v),k=S.state&&S.state(e),E=0,A=!1;function w(n,r){var o,u,a=b(k);f[t]=e,i.log.updateStart(t,a,String(n),r),o=S.actions[n](r,e,a,s),k=o.state,u=o.next,A=a!==k,c&&(s=k,p=A),i.log.updateEnd(k),T(u,e,String(n))}function T(e,n,r){if(e){if(e.type===o.Action)e(l);else if(Array.isArray(e))E++,e.forEach(function(t){return T(t,n,r)}),E--,_(n);else if(e.type===o.Task){var u=e(l),s=e.taskName,a=Boolean(u&&u.then);a&&u.then(function(e){i.log.taskSuccess(t,String(s)),T(e,n,r)}).catch(function(e){return i.log.taskFailure(t,String(s),e)}),i.log.taskPerform(String(s),a),_(n)}}else _(n)}var _=function e(r){E||(A||p||!u.default(f[t],r)?(n.patch(m,m=S.view(t,r,k,s)),h(m,t,e),i.log.render(t,r),x("patch"),c&&(p=!1)):i.log.noRender(t));return m};return S.init?(E++,T(S.init,e),E--):i.log.noInitialAction(t,k),c&&(exports.rootAction=d,exports.rootTask=v,s=k),h(m=S.view(t,e,k,s),t,_),i.log.render(t,e),m}function v(t){var e=t.app,r=t.props,o=t.init;if(n.patch(document.getElementById(a),e(a,r)),o){o(function(t,e){exports.rootAction(t,e)(l)})}}function g(t){return t&&"eventPhase"in t}function y(t,e){var n=c[t];if(n)return n(e)}function h(t,e,r){setTimeout(function(){c[e]=r,n.setHook(t,"destroy",function(){delete c[e],delete f[e]})})}function b(e){return e&&(Object.freeze(e),Object.getOwnPropertyNames(e).forEach(function(n){!e.hasOwnProperty(n)||null===e[n]||"object"!==t(e[n])&&"function"!=typeof e[n]||Object.isFrozen(e[n])||b(e[n])})),e}function S(t,e){document.addEventListener(t,e)}function k(t,e){document.removeEventListener(t,e)}function x(t,e){document.dispatchEvent(new CustomEvent(t,e?{detail:e}:null))}exports._setTestKey=function(t){return l=t},exports.component=m,exports.renderComponent=d,exports.mount=v,exports.subscribe=S,exports.unsubscribe=k,exports.publish=x;
},{"./vdom":"XNOe","./jetixLog":"oy+O","fast-deep-equal":"jIGR"}],"kJwU":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var s,n=1,e=arguments.length;n<e;n++)for(var i in s=arguments[n])Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var s=require("../../../src/jetix"),n=s.html.div,e=s.html.button;exports.default=s.component(function(s){return{state:function(){return{show:!0}},actions:{Dismiss:function(s,n,e){return{state:t({},e,{show:!1}),next:n.onDismiss}}},view:function(t,i,r){return n("#"+t+".notification",{class:{show:r.show&&i.text.length}},[i.text,e({on:{click:s("Dismiss")}},"Dismiss")])}}});
},{"../../../src/jetix":"0482"}],"87DE":[function(require,module,exports) {
"use strict";function e(e){return new Promise(function(n){setTimeout(function(){return n(t(e)?"x Invalid":"✓ Vaild")},500)})}function t(e){return e<0}Object.defineProperty(exports,"__esModule",{value:!0}),exports.validateCount=e,exports.isNegative=t;
},{}],"+XiJ":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("../../../src/jetix"),r=e(require("./notification")),a=require("../services/validation"),i=n.html.div,u=n.html.button;exports.default=n.component(function(e,n){return{state:function(t){return{counter:t.start,feedback:""}},init:e("Validate"),actions:{Increment:function(n,r,a,i){var u=n.step;return{state:t({},a,{counter:a.counter+u}),next:e("Validate")}},Decrement:function(n,r,a,i){var u=n.step;return{state:t({},a,{counter:a.counter-u}),next:e("Validate")}},Validate:function(t,r,a,i){return{state:a,next:[e("SetFeedback",{text:"Validating..."}),n("ValidateCount",{count:a.counter})]}},SetFeedback:function(e,n,r,a){var i=e.text;return{state:t({},r,{feedback:i})}}},tasks:{ValidateCount:function(t){var n=t.count;return{perform:function(){return a.validateCount(n)},success:function(t){return e("SetFeedback",{text:t})},failure:function(){return e("SetFeedback",{text:"Unavailable"})}}}},view:function(t,n,a,c){return i("#"+t+".counter",[u({on:{click:e("Increment",{step:1})}},"+"),i(String(a.counter)),u({on:{click:e("Decrement",{step:1})}},"-"),r.default("#"+t+"-feedback",{text:a.feedback,onDismiss:e("SetFeedback",{text:""})})])}}});
},{"../../../src/jetix":"0482","./notification":"kJwU","../services/validation":"87DE"}],"4HkJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../../src/jetix"),t=e.html.div,r=e.html.button;exports.default=e.component(function(){return{view:function(o){return t("#"+o,[r({on:{click:e.rootAction("SetTheme",{theme:"light"})}},"Light theme"),r({on:{click:e.rootAction("SetTheme",{theme:"dark"})}},"Dark theme"),t(".note","NOTE: Adding `debug` to the query string logs all state activity and renders.")])}}});
},{"../../../src/jetix":"0482"}],"o2E8":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../../src/jetix"),r=t(require("../components/counter")),o=t(require("../components/themeMenu")),u=e.html.div,n=e.html.h1,i=e.html.i,a=e.html.a;exports.default=e.component(function(){return{init:e.rootTask("SetDocTitle",{title:"Counter"}),view:function(t){return u("#"+t,[u(".intro",[o.default("#theme-menu"),a({attrs:{href:"/about"+location.search,"data-navigo":!0}},"About page"),n("Counter")]),r.default("#counter-0",{start:0}),r.default("#counter-1",{start:-1})])}}});
},{"../../../src/jetix":"0482","../components/counter":"+XiJ","../components/themeMenu":"4HkJ"}],"nQKQ":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../../src/jetix"),r=t(require("../components/themeMenu")),o=e.html.div,u=e.html.h1,i=e.html.a;exports.default=e.component(function(){return{init:e.rootTask("SetDocTitle",{title:"About"}),view:function(t){return o("#"+t,o(".intro",[r.default("#theme-menu"),i({attrs:{href:"/counter"+location.search,"data-navigo":!0}},"Counter page"),u("About"),o("Lorem ipsum dolor sit amet.")]))}}});
},{"../../../src/jetix":"0482","../components/themeMenu":"4HkJ"}],"Jwl3":[function(require,module,exports) {
var define;
var t;!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof t&&t.amd?t(n):e.Navigo=n()}(this,function(){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function e(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function n(t,n,o){this.root=null,this._routes=[],this._useHash=n,this._hash=void 0===o?"#":o,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!n&&e(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",t?this.root=n?t.replace(/\/$/,"/"+this._hash):t.replace(/\/$/,""):n&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks()}function o(t){return t instanceof RegExp?t:t.replace(/\/+$/,"").replace(/^\/+/,"^/")}function i(t){return t.replace(/\/$/,"").split("/").length}function s(t,e){return i(e)-i(t)}function r(t,e){return function(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).map(function(e){var i=function(t){var e=[];return{regexp:t instanceof RegExp?t:new RegExp(t.replace(n.PARAMETER_REGEXP,function(t,o,i){return e.push(i),n.REPLACE_VARIABLE_REGEXP}).replace(n.WILDCARD_REGEXP,n.REPLACE_WILDCARD)+n.FOLLOWED_BY_SLASH_REGEXP,n.MATCH_REGEXP_FLAGS),paramNames:e}}(o(e.route)),s=i.regexp,r=i.paramNames,a=t.replace(/^\/+/,"/").match(s),h=function(t,e){return 0===e.length?null:t?t.slice(1,t.length).reduce(function(t,n,o){return null===t&&(t={}),t[e[o]]=decodeURIComponent(n),t},null):null}(a,r);return!!a&&{match:a,route:e,params:h}}).filter(function(t){return t})}(t,e)[0]||!1}function a(t,e){var n=e.map(function(e){return""===e.route||"*"===e.route?t:t.split(new RegExp(e.route+"($|/)"))[0]}),i=o(t);return n.length>1?n.reduce(function(t,e){return t.length>e.length&&(t=e),t},n[0]):1===n.length?n[0]:i}function h(t,n,o){var i,s=function(t){return t.split(/\?(.*)?$/)[0]};return void 0===o&&(o="#"),e()&&!n?s(t).split(o)[0]:(i=t.split(o)).length>1?s(i[1]):s(i[0])}function u(e,n,o){if(n&&"object"===(void 0===n?"undefined":t(n))){if(n.before)return void n.before(function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(e(),n.after&&n.after(o))},o);if(n.after)return e(),void(n.after&&n.after(o))}e()}return n.prototype={helpers:{match:r,root:a,clean:o,getOnlyURL:h},navigate:function(t,e){var n;return t=t||"",this._usePushState?(n=(n=(e?"":this._getRoot()+"/")+t.replace(/^\/+/,"/")).replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(t=t.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+t),this},on:function(){for(var e=this,n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];if("function"==typeof o[0])this._defaultHandler={handler:o[0],hooks:o[1]};else if(o.length>=2)if("/"===o[0]){var r=o[1];"object"===t(o[1])&&(r=o[1].uses),this._defaultHandler={handler:r,hooks:o[2]}}else this._add(o[0],o[1],o[2]);else"object"===t(o[0])&&Object.keys(o[0]).sort(s).forEach(function(t){e.on(t,o[0][t])});return this},off:function(t){return null!==this._defaultHandler&&t===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&t===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce(function(e,n){return n.handler!==t&&e.push(n),e},[]),this},notFound:function(t,e){return this._notFoundHandler={handler:t,hooks:e},this},resolve:function(t){var n,o,i=this,s=(t||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(s=s.replace(new RegExp("^/"+this._hash),"/"));var a=function(t){return t.split(/\?(.*)?$/).slice(1).join("")}(t||this._cLoc()),l=h(s,this._useHash,this._hash);return!this._paused&&(this._lastRouteResolved&&l===this._lastRouteResolved.url&&a===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(o=r(l,this._routes))?(this._callLeave(),this._lastRouteResolved={url:l,query:a,hooks:o.route.hooks,params:o.params,name:o.route.name},n=o.route.handler,u(function(){u(function(){o.route.route instanceof RegExp?n.apply(void 0,o.match.slice(1,o.match.length)):n(o.params,a)},o.route.hooks,o.params,i._genericHooks)},this._genericHooks,o.params),o):this._defaultHandler&&(""===l||"/"===l||l===this._hash||function(t,n,o){if(e()&&!n)return!1;if(!t.match(o))return!1;var i=t.split(o);return i.length<2||""===i[1]}(l,this._useHash,this._hash))?(u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._defaultHandler.hooks},i._defaultHandler.handler(a)},i._defaultHandler.hooks)},this._genericHooks),!0):(this._notFoundHandler&&u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._notFoundHandler.hooks},i._notFoundHandler.handler(a)},i._notFoundHandler.hooks)},this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange))},updatePageLinks:function(){var t=this;"undefined"!=typeof document&&this._findLinks().forEach(function(e){e.hasListenerAttached||(e.addEventListener("click",function(n){if((n.ctrlKey||n.metaKey)&&"a"==n.target.tagName.toLowerCase())return!1;var o=t.getLinkPath(e);t._destroyed||(n.preventDefault(),t.navigate(o.replace(/\/+$/,"").replace(/^\/+/,"/")))}),e.hasListenerAttached=!0)})},generate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce(function(n,o){var i;if(o.name===t)for(i in n=o.route,e)n=n.toString().replace(":"+i,e[i]);return n},"");return this._useHash?this._hash+n:n},link:function(t){return this._getRoot()+t},pause:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=t,this._historyAPIUpdateMethod=t?"replaceState":"pushState"},resume:function(){this.pause(!1)},historyAPIUpdateMethod:function(t){return void 0===t?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=t,t)},disableIfAPINotAvailable:function(){e()||this.destroy()},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(t){return t.getAttribute("href")},hooks:function(t){this._genericHooks=t},_add:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"string"==typeof e&&(e=encodeURI(e)),this._routes.push("object"===(void 0===n?"undefined":t(n))?{route:e,handler:n.uses,name:n.as,hooks:o||n.hooks}:{route:e,handler:n,hooks:o}),this._add},_getRoot:function(){return null!==this.root?this.root:(this.root=a(this._cLoc().split("?")[0],this._routes),this.root)},_listen:function(){var t=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if("undefined"!=typeof window&&"onhashchange"in window)window.addEventListener("hashchange",this._onLocationChange);else{var e=this._cLoc(),n=void 0,o=void 0;(o=function(){n=t._cLoc(),e!==n&&(e=n,t.resolve()),t._listeningInterval=setTimeout(o,200)})()}},_cLoc:function(){return"undefined"!=typeof window?void 0!==window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:o(window.location.href):""},_findLinks:function(){return[].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve()},_callLeave:function(){var t=this._lastRouteResolved;t&&t.hooks&&t.hooks.leave&&t.hooks.leave(t.params)}},n.PARAMETER_REGEXP=/([:*])(\w+)/g,n.WILDCARD_REGEXP=/\*/g,n.REPLACE_VARIABLE_REGEXP="([^/]+)",n.REPLACE_WILDCARD="(?:.*)",n.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",n.MATCH_REGEXP_FLAGS="",n});
},{}],"nDdX":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../../src/jetix"),n=e(require("navigo")),r=e(require("./app")),u=new n.default;document.addEventListener("DOMContentLoaded",function(){return t.mount({app:r.default,props:{},init:function(e){var n=function(){return e("SetPage",{page:"counterPage"})};u.on({about:function(){return e("SetPage",{page:"aboutPage"})},counter:n,"*":n}).resolve(),t.subscribe("patch",function(){return u.updatePageLinks()})}})});
},{"../../src/jetix":"0482","navigo":"Jwl3","./app":"93ha"}],"93ha":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var u in t=arguments[r])Object.prototype.hasOwnProperty.call(t,u)&&(e[u]=t[u]);return e}).apply(this,arguments)},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("../../src/jetix"),n=t(require("./pages/counterPage")),u=t(require("./pages/aboutPage"));require("./router");var a=r.html.div;exports.default=r.component(function(t,r){return{state:function(){return{theme:"default",page:null}},actions:{SetPage:function(t,r,n){var u=t.page;return{state:e({},n,{page:u})}},SetTheme:function(t,r,n){var u=t.theme;return{state:e({},n,{theme:u})}}},tasks:{SetDocTitle:function(e){var t=e.title;return{perform:function(){document.title=t}}}},view:function(e,r,o){return a("#"+e+".page."+o.theme,[function(){switch(o.page){case"aboutPage":return u.default("#about-page",{onSetTheme:t("SetTheme")});case"counterPage":return n.default("#counter-page",{onSetTheme:t("SetTheme")})}}()])}}});
},{"../../src/jetix":"0482","./pages/counterPage":"o2E8","./pages/aboutPage":"nQKQ","./router":"nDdX"}]},{},["93ha"], null)
//# sourceMappingURL=app.c92fbdab.js.map