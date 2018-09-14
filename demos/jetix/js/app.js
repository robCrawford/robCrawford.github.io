(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isValidString = function isValidString(param) {
  return typeof param === 'string' && param.length > 0;
};

var startsWith = function startsWith(string, start) {
  return string[0] === start;
};

var isSelector = function isSelector(param) {
  return isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));
};

var node = function node(h) {
  return function (tagName) {
    return function (first) {
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      if (isSelector(first)) {
        return h.apply(undefined, [tagName + first].concat(rest));
      } else if (typeof first === 'undefined') {
        return h(tagName);
      } else {
        return h.apply(undefined, [tagName, first].concat(rest));
      }
    };
  };
};

var TAG_NAMES = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'math', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nextid', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rb', 'rbc', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];

exports['default'] = function (h) {
  var createTag = node(h);
  var exported = { TAG_NAMES: TAG_NAMES, isSelector: isSelector, createTag: createTag };
  TAG_NAMES.forEach(function (n) {
    exported[n] = createTag(n);
  });
  return exported;
};

module.exports = exports['default'];
},{}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Navigo=t()}(this,function(){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function t(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function n(e,n,o){this.root=null,this._routes=[],this._useHash=n,this._hash=void 0===o?"#":o,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!n&&t(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",e?this.root=n?e.replace(/\/$/,"/"+this._hash):e.replace(/\/$/,""):n&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks()}function o(e){return e instanceof RegExp?e:e.replace(/\/+$/,"").replace(/^\/+/,"^/")}function i(e){return e.replace(/\/$/,"").split("/").length}function s(e,t){return i(t)-i(e)}function r(e,t){return function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).map(function(t){var i=function(e){var t=[];return{regexp:e instanceof RegExp?e:new RegExp(e.replace(n.PARAMETER_REGEXP,function(e,o,i){return t.push(i),n.REPLACE_VARIABLE_REGEXP}).replace(n.WILDCARD_REGEXP,n.REPLACE_WILDCARD)+n.FOLLOWED_BY_SLASH_REGEXP,n.MATCH_REGEXP_FLAGS),paramNames:t}}(o(t.route)),s=i.regexp,r=i.paramNames,a=e.replace(/^\/+/,"/").match(s),h=function(e,t){return 0===t.length?null:e?e.slice(1,e.length).reduce(function(e,n,o){return null===e&&(e={}),e[t[o]]=decodeURIComponent(n),e},null):null}(a,r);return!!a&&{match:a,route:t,params:h}}).filter(function(e){return e})}(e,t)[0]||!1}function a(e,t){var n=t.map(function(t){return""===t.route||"*"===t.route?e:e.split(new RegExp(t.route+"($|/)"))[0]}),i=o(e);return n.length>1?n.reduce(function(e,t){return e.length>t.length&&(e=t),e},n[0]):1===n.length?n[0]:i}function h(e,n,o){var i,s=function(e){return e.split(/\?(.*)?$/)[0]};return void 0===o&&(o="#"),t()&&!n?s(e).split(o)[0]:(i=e.split(o)).length>1?s(i[1]):s(i[0])}function u(t,n,o){if(n&&"object"===(void 0===n?"undefined":e(n))){if(n.before)return void n.before(function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(t(),n.after&&n.after(o))},o);if(n.after)return t(),void(n.after&&n.after(o))}t()}return n.prototype={helpers:{match:r,root:a,clean:o,getOnlyURL:h},navigate:function(e,t){var n;return e=e||"",this._usePushState?(n=(n=(t?"":this._getRoot()+"/")+e.replace(/^\/+/,"/")).replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(e=e.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+e),this},on:function(){for(var t=this,n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];if("function"==typeof o[0])this._defaultHandler={handler:o[0],hooks:o[1]};else if(o.length>=2)if("/"===o[0]){var r=o[1];"object"===e(o[1])&&(r=o[1].uses),this._defaultHandler={handler:r,hooks:o[2]}}else this._add(o[0],o[1],o[2]);else"object"===e(o[0])&&Object.keys(o[0]).sort(s).forEach(function(e){t.on(e,o[0][e])});return this},off:function(e){return null!==this._defaultHandler&&e===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&e===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce(function(t,n){return n.handler!==e&&t.push(n),t},[]),this},notFound:function(e,t){return this._notFoundHandler={handler:e,hooks:t},this},resolve:function(e){var n,o,i=this,s=(e||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(s=s.replace(new RegExp("^/"+this._hash),"/"));var a=function(e){return e.split(/\?(.*)?$/).slice(1).join("")}(e||this._cLoc()),l=h(s,this._useHash,this._hash);return!this._paused&&(this._lastRouteResolved&&l===this._lastRouteResolved.url&&a===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(o=r(l,this._routes))?(this._callLeave(),this._lastRouteResolved={url:l,query:a,hooks:o.route.hooks,params:o.params,name:o.route.name},n=o.route.handler,u(function(){u(function(){o.route.route instanceof RegExp?n.apply(void 0,o.match.slice(1,o.match.length)):n(o.params,a)},o.route.hooks,o.params,i._genericHooks)},this._genericHooks,o.params),o):this._defaultHandler&&(""===l||"/"===l||l===this._hash||function(e,n,o){if(t()&&!n)return!1;if(!e.match(o))return!1;var i=e.split(o);return i.length<2||""===i[1]}(l,this._useHash,this._hash))?(u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._defaultHandler.hooks},i._defaultHandler.handler(a)},i._defaultHandler.hooks)},this._genericHooks),!0):(this._notFoundHandler&&u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._notFoundHandler.hooks},i._notFoundHandler.handler(a)},i._notFoundHandler.hooks)},this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange))},updatePageLinks:function(){var e=this;"undefined"!=typeof document&&this._findLinks().forEach(function(t){t.hasListenerAttached||(t.addEventListener("click",function(n){if((n.ctrlKey||n.metaKey)&&"a"==n.target.tagName.toLowerCase())return!1;var o=e.getLinkPath(t);e._destroyed||(n.preventDefault(),e.navigate(o.replace(/\/+$/,"").replace(/^\/+/,"/")))}),t.hasListenerAttached=!0)})},generate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce(function(n,o){var i;if(o.name===e)for(i in n=o.route,t)n=n.toString().replace(":"+i,t[i]);return n},"");return this._useHash?this._hash+n:n},link:function(e){return this._getRoot()+e},pause:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=e,this._historyAPIUpdateMethod=e?"replaceState":"pushState"},resume:function(){this.pause(!1)},historyAPIUpdateMethod:function(e){return void 0===e?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=e,e)},disableIfAPINotAvailable:function(){t()||this.destroy()},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(e){return e.getAttribute("href")},hooks:function(e){this._genericHooks=e},_add:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"string"==typeof t&&(t=encodeURI(t)),this._routes.push("object"===(void 0===n?"undefined":e(n))?{route:t,handler:n.uses,name:n.as,hooks:o||n.hooks}:{route:t,handler:n,hooks:o}),this._add},_getRoot:function(){return null!==this.root?this.root:(this.root=a(this._cLoc().split("?")[0],this._routes),this.root)},_listen:function(){var e=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if("undefined"!=typeof window&&"onhashchange"in window)window.addEventListener("hashchange",this._onLocationChange);else{var t=this._cLoc(),n=void 0,o=void 0;(o=function(){n=e._cLoc(),t!==n&&(t=n,e.resolve()),e._listeningInterval=setTimeout(o,200)})()}},_cLoc:function(){return"undefined"!=typeof window?void 0!==window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:o(window.location.href):""},_findLinks:function(){return[].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve()},_callLeave:function(){var e=this._lastRouteResolved;e&&e.hooks&&e.hooks.leave&&e.hooks.leave(e.params)}},n.PARAMETER_REGEXP=/([:*])(\w+)/g,n.WILDCARD_REGEXP=/\*/g,n.REPLACE_VARIABLE_REGEXP="([^/]+)",n.REPLACE_WILDCARD="(?:.*)",n.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",n.MATCH_REGEXP_FLAGS="",n});


},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var is = require("./is");
function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (children !== undefined) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
exports.default = h;

},{"./is":5,"./vnode":12}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
exports.default = exports.htmlDomApi;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var colonChar = 58;
var xChar = 120;
function updateAttrs(oldVnode, vnode) {
    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs)
        return;
    if (oldAttrs === attrs)
        return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, "");
            }
            else if (cur === false) {
                elm.removeAttribute(key);
            }
            else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                }
                else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                }
                else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                }
                else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
exports.attributesModule = { create: updateAttrs, update: updateAttrs };
exports.default = exports.attributesModule;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
exports.default = exports.classModule;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    }
    else if (typeof handler === "object") {
        // call handler with arguments
        if (typeof handler[0] === "function") {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            }
            else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        }
        else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i], vnode, event);
            }
        }
    }
}
function handleEvent(event, vnode) {
    var name = event.type, on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        }
        else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        var listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        }
        else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
exports.eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};
exports.default = exports.eventListenersModule;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
exports.default = exports.propsModule;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var is = require("./is");
var htmldomapi_1 = require("./htmldomapi");
function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
var h_1 = require("./h");
exports.h = h_1.h;
var thunk_1 = require("./thunk");
exports.thunk = thunk_1.thunk;
function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode_1.default(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
            }
            else {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
            }
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
exports.init = init;

},{"./h":3,"./htmldomapi":4,"./is":5,"./thunk":11,"./vnode":12}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var h_1 = require("./h");
function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
        return;
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return h_1.h(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
exports.default = exports.thunk;

},{"./h":3}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("./lib/jetix");

var _router = require("./router");

var router = _interopRequireWildcard(_router);

var _vdom = require("./lib/vdom");

var _counterDemo = require("./pages/counterDemo");

var _counterDemo2 = _interopRequireDefault(_counterDemo);

var _aboutPage = require("./pages/aboutPage");

var _aboutPage2 = _interopRequireDefault(_aboutPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var div = _vdom.html.div;
exports.default = (0, _jetix.component)(function (action) {
    return {

        state: function state(props) {
            return {
                theme: "default",
                page: null
            };
        },

        actions: {
            SetPage: function SetPage(_ref, state) {
                var page = _ref.page;

                state.page = page;
                return { state: state };
            },
            SetTheme: function SetTheme(_ref2, state) {
                var theme = _ref2.theme;

                state.theme = theme;
                return { state: state };
            }
        },

        view: function view(id, state, props) {
            return div(".page." + state.theme, function () {
                switch (state.page) {

                    case "aboutPage":
                        return (0, _aboutPage2.default)("#about-page", { onSetTheme: action("SetTheme") });

                    case "counterDemo":
                        return (0, _counterDemo2.default)("#counter-demo", { onSetTheme: action("SetTheme") });
                }
            }());
        }
    };
});

},{"./lib/jetix":17,"./lib/vdom":19,"./pages/aboutPage":20,"./pages/counterDemo":21,"./router":22}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("../lib/jetix");

var _notification = require("./notification");

var _notification2 = _interopRequireDefault(_notification);

var _validation = require("../services/validation");

var _vdom = require("../lib/vdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var div = _vdom.html.div,
    button = _vdom.html.button;
exports.default = (0, _jetix.component)(function (action, task) {
    return {

        // Initial state
        state: function state(props) {
            return {
                counter: props.start,
                feedback: ""
            };
        },

        // Initial action
        init: action("Validate"),

        // Action handlers return new state, and any next actions/tasks
        actions: {
            // Inputs: action data, state, props, rootState
            Increment: function Increment(_ref, state) {
                var step = _ref.step;

                state.counter += step;
                return {
                    state: state,
                    next: action("Validate")
                };
            },
            Decrement: function Decrement(_ref2, state) {
                var step = _ref2.step;

                state.counter -= step;
                return {
                    state: state,
                    next: action("Validate")
                };
            },
            Validate: function Validate(_, state) {
                return {
                    state: state,
                    next: [action("SetFeedback", { text: "Validating..." }),
                    // Async task
                    task("ValidateCount", { count: state.counter })] };
            },
            SetFeedback: function SetFeedback(_ref3, state) {
                var text = _ref3.text;

                state.feedback = text;
                return { state: state };
            }
        },

        // Task handlers provide callbacks for async operations that may fail
        tasks: {
            ValidateCount: function ValidateCount(_ref4) {
                var count = _ref4.count;

                return {
                    perform: function perform() {
                        return (0, _validation.validateCount)(count);
                    },
                    success: function success(text) {
                        return action("SetFeedback", { text: text });
                    },
                    failure: function failure() {
                        return action("SetFeedback", { text: "Unavailable" });
                    }
                };
            }
        },

        // View renders from props & state
        // Inputs: component instance id, state, props, rootState
        view: function view(id, state, props) {
            return div(".counter", [button({ on: { click: action("Increment", { step: 1 }) } }, "+"), div(String(state.counter)), button({ on: { click: action("Decrement", { step: 1 }) } }, "-"),
            // Child component - `notification` module
            (0, _notification2.default)("#" + id + "-feedback", {
                text: state.feedback,
                onDismiss: action("SetFeedback", { text: "" })
            })]);
        }
    };
});

},{"../lib/jetix":17,"../lib/vdom":19,"../services/validation":23,"./notification":15}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("../lib/jetix");

var _vdom = require("../lib/vdom");

var div = _vdom.html.div,
    button = _vdom.html.button;
exports.default = (0, _jetix.component)(function (action) {
    return {

        state: function state(props) {
            return {
                show: true
            };
        },

        actions: {
            Dismiss: function Dismiss(_, state, props) {
                state.show = false;
                return {
                    state: state,
                    next: props.onDismiss
                };
            }
        },

        view: function view(id, state, props) {
            return div(".notification", {
                class: {
                    show: state.show && props.text.length
                }
            }, [props.text, button({ on: { click: action("Dismiss") } }, "Dismiss")]);
        }
    };
});

},{"../lib/jetix":17,"../lib/vdom":19}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("../lib/jetix");

var _vdom = require("../lib/vdom");

var div = _vdom.html.div,
    button = _vdom.html.button;
exports.default = (0, _jetix.component)(function () {
    return {
        view: function view() {
            return div(".theme-menu", [button({ on: { click: (0, _jetix.rootAction)("SetTheme", { theme: "light" }) } }, "Light theme"), button({ on: { click: (0, _jetix.rootAction)("SetTheme", { theme: "dark" }) } }, "Dark theme")]);
        }
    };
});

},{"../lib/jetix":17,"../lib/vdom":19}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rootAction = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                NOTE: Production build removes lines marked `@devBuild`
                                                                                                                                                                                                                                                                              */


exports.component = component;
exports.renderComponent = renderComponent;
exports.mount = mount;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.publish = publish;

var _vdom = require("./vdom");

var _jetixDev = require("./jetixDev");

// @devBuild


// Argument when currying

var appId = "app";
var renderRefs = {};
var internalKey = { k: Math.random() };
var rootState = void 0;

var rootAction = exports.rootAction = function rootAction(actionName, data) {
    return function () {
        throw Error('Root not initialised!');
    };
};

function component(getConfig) {
    // Pass in callback that returns component config
    // Returns render function that is called by parent e.g. `counter("counter-0", { start: 0 })`
    var renderFn = function renderFn(idStr) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var id = idStr.replace(/^#/, "");
        if (!id.length) {
            throw Error("Component requires an id");
        }
        return renderComponent(id, props, getConfig);
    };
    // Add a handle to `getConfig` for tests
    renderFn.getConfig = getConfig;
    return renderFn;
}

function renderComponent(id, props, getConfig) {
    deepFreeze(props); // @devBuild
    var isRoot = id === appId;

    // If component already exists, just run render() again
    var componentRoot = renderById(id, props);
    if (componentRoot) {
        return componentRoot;
    }

    var action = function action(actionName, data) {
        return function (thunkInput) {
            if (thunkInput && "srcElement" in thunkInput) {
                // Invoked from the DOM, `thunkInput` is the (unused) event
                update(actionName, data);
            } else if (thunkInput === internalKey) {
                // Called by internal methods `run()` or `runRootAction()`
                // `internalKey` prevents an action from being invoked externally
                update(actionName, data);
            } else if (thunkInput) {
                // If a data argument is supplied, return a new thunk instead of invoking the current one
                // This enables currying e.g. when passing an action from parent to child via props
                action(actionName, thunkInput);
            } else {
                // @devBuild
                _jetixDev.log.manualActionError(id, String(actionName)); // @devBuild
            } // @devBuild
        };
    };

    var task = function task(taskName, data) {
        if (!config.tasks) {
            throw Error("tasks " + String(config.tasks));
        }

        var _config$tasks$taskNam = config.tasks[taskName](data),
            perform = _config$tasks$taskNam.perform,
            success = _config$tasks$taskNam.success,
            failure = _config$tasks$taskNam.failure;

        var promise = perform();
        promise.then.taskName = taskName;
        return promise.then(success).catch(failure);
    };

    // Invoke the function passed into `component()` with props and these functions
    var config = getConfig(action, task);
    var state = (config.state || function () {
        return {};
    })(props);
    var noRender = 0;

    function update(actionName, data) {
        var next = void 0;
        _jetixDev.log.updateStart(id, state, actionName, data); // @devBuild
        var newState = clone( // @devBuild
        state) // @devBuild
        ;
        if (isRoot) {
            rootState = newState;
        }

        // Freeze in dev to error on any mutation outside of action handlers
        var _config$actions$actio = config.actions[actionName](data, newState, props, rootState);

        state = _config$actions$actio.state;
        next = _config$actions$actio.next;
        deepFreeze(state); // @devBuild
        _jetixDev.log.updateEnd(state); // @devBuild
        run(next, actionName, props);
    }

    function run(next, prevTag, props) {
        if (!next) {
            render(props);
        } else if (typeof next === "function") {
            // `internalKey` is required to invoke an action
            next(internalKey);
        } else if (Array.isArray(next)) {
            noRender++;
            next.forEach(function (n) {
                return run(n, prevTag, props);
            });
            noRender--;
            render(props);
        } else if (typeof next.then === "function") {
            var _taskName = next.then.taskName || 'unknown';
            next.then(function (n) {
                _jetixDev.log.taskSuccess(id, _taskName); // @devBuild
                run(n, prevTag, props);
            }).catch(function (e) {
                return _jetixDev.log.taskFailure(id, _taskName, e);
            });
            _jetixDev.log.taskPerform(_taskName); // @devBuild
            render(props); // End of sync chain
        }
    }

    function render(props) {
        if (!noRender) {
            (0, _vdom.patch)(componentRoot, componentRoot = config.view(id, state, props, rootState));
            setRenderRef(componentRoot, id, render);
            _jetixDev.log.render(id, props, state); // @devBuild
            publish("patch");
        }
        return componentRoot;
    }

    if (config.init) {
        noRender++;
        run(config.init, undefined, props);
        noRender--;
    } else {
        // @devBuild
        _jetixDev.log.noInitialAction(id, state); // @devBuild
    } // @devBuild

    if (isRoot) {
        exports.rootAction = rootAction = action;
        rootState = state;
    }

    componentRoot = config.view(id, state, props, rootState);
    setRenderRef(componentRoot, id, render);
    _jetixDev.log.render(id, props, state); // @devBuild
    return componentRoot;
}

function mount(appComponent, initFn) {
    // Mount the top-level app component
    (0, _vdom.patch)(document.getElementById(appId), appComponent(appId, {/* Props */}));
    // An optional callback provides `runRootAction` for binding events to root actions
    // (`internalKey` is required to invoke an action)
    if (initFn) {
        var runRootAction = function runRootAction() {
            rootAction.apply(undefined, arguments)(internalKey);
        };
        initFn(runRootAction);
    }
}

function renderById(id, props) {
    var render = renderRefs[id];
    if (render) {
        return render(props);
    }
}

function setRenderRef(vnode, id, render) {
    // Run after all synchronous patches
    setTimeout(function () {
        renderRefs[id] = render;
        (0, _vdom.setHook)(vnode, 'destroy', function () {
            delete renderRefs[id];
        });
    });
}

function clone(o) {
    // Should only be cloning simple state models
    return JSON.parse(JSON.stringify(o));
}

function deepFreeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (p) {
        if (o.hasOwnProperty(p) && o[p] !== null && (_typeof(o[p]) === "object" || typeof o[p] === "function") && !Object.isFrozen(o[p])) {
            deepFreeze(o[p]);
        }
    });
    return o;
}

// Pub/sub
function subscribe(type, listener) {
    document.addEventListener(type, listener, 0);
}
function unsubscribe(type, listener) {
    document.removeEventListener(type, listener, 0);
}
function publish(type, data) {
    document.dispatchEvent(new CustomEvent(type, { data: data }));
}

},{"./jetixDev":18,"./vdom":19}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
  
  These utils are imported for dev only
*/
var groupId = '';

var debugEnabled = /[&?]debug/.test(window.location.search);

var log = exports.log = {
    noInitialAction: function noInitialAction(id, state) {
        if (debugEnabled) {
            console.group("%c#" + id, "color: #69f");
            if (state) {
                console.log("" + JSON.stringify(state));
            }
            groupId = id;
        }
    },
    updateStart: function updateStart(id, state, tag, data) {
        if (debugEnabled) {
            if (!groupId || groupId !== id) {
                console.group("%c#" + id, "color: #69f");
                if (state) {
                    console.log("%c" + JSON.stringify(state), "text-decoration: line-through;");
                }
                groupId = id;
            }
            var msg = "" + String(tag);
            if (data) {
                msg += " " + JSON.stringify(data);
            }
            console.log("%c" + msg, "color: #f6b");
        }
    },
    updateEnd: function updateEnd(state) {
        if (debugEnabled && state) {
            console.log("" + JSON.stringify(state));
        }
    },
    taskPerform: function taskPerform(label) {
        if (debugEnabled) {
            console.log("%cTask \"" + label + "\" perform...", "color: #dd8");
        }
    },
    taskSuccess: function taskSuccess(id, label) {
        if (debugEnabled) {
            console.log("%c\n...#" + id + " task \"" + label + "\" success", "color: #dd8");
        }
    },
    taskFailure: function taskFailure(id, label, e) {
        if (debugEnabled) {
            console.log("%c\n...#" + id + " task \"" + label + "\" failure", "color: #dd8");
            console.error(JSON.stringify(e));
        }
    },
    render: function render(id, props, state) {
        if (debugEnabled) {
            console.groupEnd();
            var msg = "\u27F3 Render #" + id;
            if (props && Object.keys(props).length) {
                msg += ", props: " + JSON.stringify(props);
            }
            console.log("%c" + msg, "color: #888");
            groupId = '';
        }
    },
    manualActionError: function manualActionError(id, actionName) {
        console.error("Error: #" + id + " \"" + actionName + "\" cannot be invoked manually");
    }
};

window.addEventListener('error', function () {
    setTimeout(function () {
        console.groupEnd();
        groupId = '';
    });
});

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
  A wrapper around `https://github.com/snabbdom/snabbdom`
  with html functions from `https://github.com/ohanhi/hyperscript-helpers`
*/
var snabbdom = require("snabbdom");
var patch = snabbdom.init([require("snabbdom/modules/class").default, require("snabbdom/modules/attributes").default, require("snabbdom/modules/props").default, require("snabbdom/modules/eventlisteners").default]);
var h = require("snabbdom/h").default;
var html = require('hyperscript-helpers')(h);

function setHook(vnode, hookName, callback) {
    // https://github.com/snabbdom/snabbdom#hooks
    // init        a vnode has been added                                vnode
    // create      a DOM element has been created based on a vnode       emptyVnode, vnode
    // insert      an element has been inserted into the DOM             vnode
    // prepatch    an element is about to be patched                     oldVnode, vnode
    // update      an element is being updated                           oldVnode, vnode
    // postpatch   an element has been patched                           oldVnode, vnode
    // destroy     an element is directly or indirectly being removed    vnode
    // remove      an element is directly being removed from the DOM     vnode, removeCallback
    if (vnode) {
        vnode.data = vnode.data || {};
        vnode.data.hook = vnode.data.hook || {};
        vnode.data.hook[hookName] = callback;
    }
}

exports.patch = patch;
exports.setHook = setHook;
exports.html = html;

},{"hyperscript-helpers":1,"snabbdom":10,"snabbdom/h":3,"snabbdom/modules/attributes":6,"snabbdom/modules/class":7,"snabbdom/modules/eventlisteners":8,"snabbdom/modules/props":9}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("../lib/jetix");

var _vdom = require("../lib/vdom");

var _themeMenu = require("../components/themeMenu");

var _themeMenu2 = _interopRequireDefault(_themeMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var div = _vdom.html.div,
    h1 = _vdom.html.h1,
    button = _vdom.html.button,
    a = _vdom.html.a;
exports.default = (0, _jetix.component)(function () {
    return {
        view: function view() {
            return div([div(".intro", [(0, _themeMenu2.default)("#theme-menu"), a({ attrs: { href: "/" + location.search, "data-navigo": true } }, "Counter demo"), h1("About"), div("Lorem ipsum dolor sit amet.")])]);
        }
    };
});

},{"../components/themeMenu":16,"../lib/jetix":17,"../lib/vdom":19}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("../lib/jetix");

var _counter = require("../components/counter");

var _counter2 = _interopRequireDefault(_counter);

var _themeMenu = require("../components/themeMenu");

var _themeMenu2 = _interopRequireDefault(_themeMenu);

var _vdom = require("../lib/vdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var div = _vdom.html.div,
    h1 = _vdom.html.h1,
    button = _vdom.html.button,
    i = _vdom.html.i,
    a = _vdom.html.a;
exports.default = (0, _jetix.component)(function () {
    return {
        view: function view() {
            return div([div(".intro", [(0, _themeMenu2.default)("#theme-menu"), a({ attrs: { href: "/about" + location.search, "data-navigo": true } }, "About page"), h1("Counter demo"), div("Please open the developer console, where all component actions, state and renders are logged (when `debug` is in the query string)."), i("Note that `render()` doesn't update the DOM unless the VDOM has changed.")]), (0, _counter2.default)("#counter-0", { start: 0 }), (0, _counter2.default)("#counter-1", { start: -1 })]);
        }
    };
});

},{"../components/counter":14,"../components/themeMenu":16,"../lib/jetix":17,"../lib/vdom":19}],22:[function(require,module,exports){
"use strict";

var _navigo = require("navigo");

var _navigo2 = _interopRequireDefault(_navigo);

var _jetix = require("./lib/jetix");

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _navigo2.default(); /*
                                       `https://github.com/krasimir/navigo`
                                     */


document.addEventListener("DOMContentLoaded", function () {
    (0, _jetix.mount)(_app2.default, function (runRootAction) {
        // The `mount` callback provides `runRootAction` for binding events to root actions
        // (manually invoking an action is disallowed everywhere else)
        var pageSetter = function pageSetter(page) {
            return function () {
                runRootAction("SetPage", { page: page });
            };
        };

        router.on({
            "about": pageSetter("aboutPage"),
            "*": pageSetter("counterDemo")
        }).resolve();

        (0, _jetix.subscribe)("patch", function () {
            router.updatePageLinks();
        });
    });
});

},{"./app":13,"./lib/jetix":17,"navigo":2}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateCount = validateCount;
exports.isNegative = isNegative;
function validateCount(n) {
    // Mock async
    return new Promise(function (resolve) {
        setTimeout(function () {
            return resolve(isNegative(n) ? "x Invalid" : "✓ Vaild");
        }, 500);
    });
}

function isNegative(n) {
    return n < 0;
}

},{}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaHlwZXJzY3JpcHQtaGVscGVycy9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25hdmlnby9saWIvbmF2aWdvLm1pbi5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS9oLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL2h0bWxkb21hcGkuanMiLCJub2RlX21vZHVsZXMvc25hYmJkb20vaXMuanMiLCJub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvY2xhc3MuanMiLCJub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9ldmVudGxpc3RlbmVycy5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL3Byb3BzLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL3NuYWJiZG9tLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL3RodW5rLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL3Zub2RlLmpzIiwic3JjL2pzL2FwcC5qcyIsInNyYy9qcy9jb21wb25lbnRzL2NvdW50ZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9ub3RpZmljYXRpb24uanMiLCJzcmMvanMvY29tcG9uZW50cy90aGVtZU1lbnUuanMiLCJzcmMvanMvbGliL2pldGl4LmpzIiwic3JjL2pzL2xpYi9qZXRpeERldi5qcyIsInNyYy9qcy9saWIvdmRvbS5qcyIsInNyYy9qcy9wYWdlcy9hYm91dFBhZ2UuanMiLCJzcmMvanMvcGFnZXMvY291bnRlckRlbW8uanMiLCJzcmMvanMvcm91dGVyLmpzIiwic3JjL2pzL3NlcnZpY2VzL3ZhbGlkYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LEdBQUEsYTtRQU9BLFUsR0FBQSxVO0FBUFQsU0FBUyxhQUFULENBQXVCLENBQXZCLEVBQW1EO0FBQ3REO0FBQ0EsV0FBTyxJQUFJLE9BQUosQ0FBWSxtQkFBVztBQUMxQixtQkFBVztBQUFBLG1CQUFNLFFBQVEsV0FBVyxDQUFYLElBQWdCLFdBQWhCLEdBQThCLFNBQXRDLENBQU47QUFBQSxTQUFYLEVBQW1FLEdBQW5FO0FBQ0gsS0FGTSxDQUFQO0FBR0g7O0FBRU0sU0FBUyxVQUFULENBQW9CLENBQXBCLEVBQXdDO0FBQzNDLFdBQU8sSUFBSSxDQUFYO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGlzVmFsaWRTdHJpbmcgPSBmdW5jdGlvbiBpc1ZhbGlkU3RyaW5nKHBhcmFtKSB7XG4gIHJldHVybiB0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnICYmIHBhcmFtLmxlbmd0aCA+IDA7XG59O1xuXG52YXIgc3RhcnRzV2l0aCA9IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyaW5nLCBzdGFydCkge1xuICByZXR1cm4gc3RyaW5nWzBdID09PSBzdGFydDtcbn07XG5cbnZhciBpc1NlbGVjdG9yID0gZnVuY3Rpb24gaXNTZWxlY3RvcihwYXJhbSkge1xuICByZXR1cm4gaXNWYWxpZFN0cmluZyhwYXJhbSkgJiYgKHN0YXJ0c1dpdGgocGFyYW0sICcuJykgfHwgc3RhcnRzV2l0aChwYXJhbSwgJyMnKSk7XG59O1xuXG52YXIgbm9kZSA9IGZ1bmN0aW9uIG5vZGUoaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGZpcnN0KSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcmVzdCA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgcmVzdFtfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NlbGVjdG9yKGZpcnN0KSkge1xuICAgICAgICByZXR1cm4gaC5hcHBseSh1bmRlZmluZWQsIFt0YWdOYW1lICsgZmlyc3RdLmNvbmNhdChyZXN0KSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGgodGFnTmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaC5hcHBseSh1bmRlZmluZWQsIFt0YWdOYW1lLCBmaXJzdF0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufTtcblxudmFyIFRBR19OQU1FUyA9IFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcHBsZXQnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJywgJ2InLCAnYmFzZScsICdiYXNlZm9udCcsICdiZGknLCAnYmRvJywgJ2Jnc291bmQnLCAnYmlnJywgJ2JsaW5rJywgJ2Jsb2NrcXVvdGUnLCAnYm9keScsICdicicsICdidXR0b24nLCAnY2FudmFzJywgJ2NhcHRpb24nLCAnY2VudGVyJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnY29tbWFuZCcsICdjb250ZW50JywgJ2RhdGEnLCAnZGF0YWxpc3QnLCAnZGQnLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpYWxvZycsICdkaXInLCAnZGl2JywgJ2RsJywgJ2R0JywgJ2VsZW1lbnQnLCAnZW0nLCAnZW1iZWQnLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9udCcsICdmb290ZXInLCAnZm9ybScsICdmcmFtZScsICdmcmFtZXNldCcsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2lmcmFtZScsICdpbWFnZScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2lzaW5kZXgnLCAna2JkJywgJ2tleWdlbicsICdsYWJlbCcsICdsZWdlbmQnLCAnbGknLCAnbGluaycsICdsaXN0aW5nJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtYXRoJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0YScsICdtZXRlcicsICdtdWx0aWNvbCcsICduYXYnLCAnbmV4dGlkJywgJ25vYnInLCAnbm9lbWJlZCcsICdub2ZyYW1lcycsICdub3NjcmlwdCcsICdvYmplY3QnLCAnb2wnLCAnb3B0Z3JvdXAnLCAnb3B0aW9uJywgJ291dHB1dCcsICdwJywgJ3BhcmFtJywgJ3BpY3R1cmUnLCAncGxhaW50ZXh0JywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JiJywgJ3JiYycsICdycCcsICdydCcsICdydGMnLCAncnVieScsICdzJywgJ3NhbXAnLCAnc2NyaXB0JywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbG90JywgJ3NtYWxsJywgJ3NvdXJjZScsICdzcGFjZXInLCAnc3BhbicsICdzdHJpa2UnLCAnc3Ryb25nJywgJ3N0eWxlJywgJ3N1YicsICdzdW1tYXJ5JywgJ3N1cCcsICdzdmcnLCAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0aXRsZScsICd0cicsICd0cmFjaycsICd0dCcsICd1JywgJ3VsJywgJ3ZhcicsICd2aWRlbycsICd3YnInLCAneG1wJ107XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChoKSB7XG4gIHZhciBjcmVhdGVUYWcgPSBub2RlKGgpO1xuICB2YXIgZXhwb3J0ZWQgPSB7IFRBR19OQU1FUzogVEFHX05BTUVTLCBpc1NlbGVjdG9yOiBpc1NlbGVjdG9yLCBjcmVhdGVUYWc6IGNyZWF0ZVRhZyB9O1xuICBUQUdfTkFNRVMuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgIGV4cG9ydGVkW25dID0gY3JlYXRlVGFnKG4pO1xuICB9KTtcbiAgcmV0dXJuIGV4cG9ydGVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6ZS5OYXZpZ289dCgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZnVuY3Rpb24gdCgpe3JldHVybiEoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHdpbmRvd3x8IXdpbmRvdy5oaXN0b3J5fHwhd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKX1mdW5jdGlvbiBuKGUsbixvKXt0aGlzLnJvb3Q9bnVsbCx0aGlzLl9yb3V0ZXM9W10sdGhpcy5fdXNlSGFzaD1uLHRoaXMuX2hhc2g9dm9pZCAwPT09bz9cIiNcIjpvLHRoaXMuX3BhdXNlZD0hMSx0aGlzLl9kZXN0cm95ZWQ9ITEsdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ9bnVsbCx0aGlzLl9ub3RGb3VuZEhhbmRsZXI9bnVsbCx0aGlzLl9kZWZhdWx0SGFuZGxlcj1udWxsLHRoaXMuX3VzZVB1c2hTdGF0ZT0hbiYmdCgpLHRoaXMuX29uTG9jYXRpb25DaGFuZ2U9dGhpcy5fb25Mb2NhdGlvbkNoYW5nZS5iaW5kKHRoaXMpLHRoaXMuX2dlbmVyaWNIb29rcz1udWxsLHRoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q9XCJwdXNoU3RhdGVcIixlP3RoaXMucm9vdD1uP2UucmVwbGFjZSgvXFwvJC8sXCIvXCIrdGhpcy5faGFzaCk6ZS5yZXBsYWNlKC9cXC8kLyxcIlwiKTpuJiYodGhpcy5yb290PXRoaXMuX2NMb2MoKS5zcGxpdCh0aGlzLl9oYXNoKVswXS5yZXBsYWNlKC9cXC8kLyxcIi9cIit0aGlzLl9oYXNoKSksdGhpcy5fbGlzdGVuKCksdGhpcy51cGRhdGVQYWdlTGlua3MoKX1mdW5jdGlvbiBvKGUpe3JldHVybiBlIGluc3RhbmNlb2YgUmVnRXhwP2U6ZS5yZXBsYWNlKC9cXC8rJC8sXCJcIikucmVwbGFjZSgvXlxcLysvLFwiXi9cIil9ZnVuY3Rpb24gaShlKXtyZXR1cm4gZS5yZXBsYWNlKC9cXC8kLyxcIlwiKS5zcGxpdChcIi9cIikubGVuZ3RofWZ1bmN0aW9uIHMoZSx0KXtyZXR1cm4gaSh0KS1pKGUpfWZ1bmN0aW9uIHIoZSx0KXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuKGFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpbXSkubWFwKGZ1bmN0aW9uKHQpe3ZhciBpPWZ1bmN0aW9uKGUpe3ZhciB0PVtdO3JldHVybntyZWdleHA6ZSBpbnN0YW5jZW9mIFJlZ0V4cD9lOm5ldyBSZWdFeHAoZS5yZXBsYWNlKG4uUEFSQU1FVEVSX1JFR0VYUCxmdW5jdGlvbihlLG8saSl7cmV0dXJuIHQucHVzaChpKSxuLlJFUExBQ0VfVkFSSUFCTEVfUkVHRVhQfSkucmVwbGFjZShuLldJTERDQVJEX1JFR0VYUCxuLlJFUExBQ0VfV0lMRENBUkQpK24uRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQLG4uTUFUQ0hfUkVHRVhQX0ZMQUdTKSxwYXJhbU5hbWVzOnR9fShvKHQucm91dGUpKSxzPWkucmVnZXhwLHI9aS5wYXJhbU5hbWVzLGE9ZS5yZXBsYWNlKC9eXFwvKy8sXCIvXCIpLm1hdGNoKHMpLGg9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gMD09PXQubGVuZ3RoP251bGw6ZT9lLnNsaWNlKDEsZS5sZW5ndGgpLnJlZHVjZShmdW5jdGlvbihlLG4sbyl7cmV0dXJuIG51bGw9PT1lJiYoZT17fSksZVt0W29dXT1kZWNvZGVVUklDb21wb25lbnQobiksZX0sbnVsbCk6bnVsbH0oYSxyKTtyZXR1cm4hIWEmJnttYXRjaDphLHJvdXRlOnQscGFyYW1zOmh9fSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlfSl9KGUsdClbMF18fCExfWZ1bmN0aW9uIGEoZSx0KXt2YXIgbj10Lm1hcChmdW5jdGlvbih0KXtyZXR1cm5cIlwiPT09dC5yb3V0ZXx8XCIqXCI9PT10LnJvdXRlP2U6ZS5zcGxpdChuZXcgUmVnRXhwKHQucm91dGUrXCIoJHwvKVwiKSlbMF19KSxpPW8oZSk7cmV0dXJuIG4ubGVuZ3RoPjE/bi5yZWR1Y2UoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5sZW5ndGg+dC5sZW5ndGgmJihlPXQpLGV9LG5bMF0pOjE9PT1uLmxlbmd0aD9uWzBdOml9ZnVuY3Rpb24gaChlLG4sbyl7dmFyIGkscz1mdW5jdGlvbihlKXtyZXR1cm4gZS5zcGxpdCgvXFw/KC4qKT8kLylbMF19O3JldHVybiB2b2lkIDA9PT1vJiYobz1cIiNcIiksdCgpJiYhbj9zKGUpLnNwbGl0KG8pWzBdOihpPWUuc3BsaXQobykpLmxlbmd0aD4xP3MoaVsxXSk6cyhpWzBdKX1mdW5jdGlvbiB1KHQsbixvKXtpZihuJiZcIm9iamVjdFwiPT09KHZvaWQgMD09PW4/XCJ1bmRlZmluZWRcIjplKG4pKSl7aWYobi5iZWZvcmUpcmV0dXJuIHZvaWQgbi5iZWZvcmUoZnVuY3Rpb24oKXsoIShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSl8fGFyZ3VtZW50c1swXSkmJih0KCksbi5hZnRlciYmbi5hZnRlcihvKSl9LG8pO2lmKG4uYWZ0ZXIpcmV0dXJuIHQoKSx2b2lkKG4uYWZ0ZXImJm4uYWZ0ZXIobykpfXQoKX1yZXR1cm4gbi5wcm90b3R5cGU9e2hlbHBlcnM6e21hdGNoOnIscm9vdDphLGNsZWFuOm8sZ2V0T25seVVSTDpofSxuYXZpZ2F0ZTpmdW5jdGlvbihlLHQpe3ZhciBuO3JldHVybiBlPWV8fFwiXCIsdGhpcy5fdXNlUHVzaFN0YXRlPyhuPShuPSh0P1wiXCI6dGhpcy5fZ2V0Um9vdCgpK1wiL1wiKStlLnJlcGxhY2UoL15cXC8rLyxcIi9cIikpLnJlcGxhY2UoLyhbXjpdKShcXC97Mix9KS9nLFwiJDEvXCIpLGhpc3RvcnlbdGhpcy5faGlzdG9yeUFQSVVwZGF0ZU1ldGhvZF0oe30sXCJcIixuKSx0aGlzLnJlc29sdmUoKSk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKGU9ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIrdGhpcy5faGFzaCksXCJcIiksd2luZG93LmxvY2F0aW9uLmhyZWY9d2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyQvLFwiXCIpLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLl9oYXNoK1wiLiokXCIpLFwiXCIpK3RoaXMuX2hhc2grZSksdGhpc30sb246ZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcyxuPWFyZ3VtZW50cy5sZW5ndGgsbz1BcnJheShuKSxpPTA7aTxuO2krKylvW2ldPWFyZ3VtZW50c1tpXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBvWzBdKXRoaXMuX2RlZmF1bHRIYW5kbGVyPXtoYW5kbGVyOm9bMF0saG9va3M6b1sxXX07ZWxzZSBpZihvLmxlbmd0aD49MilpZihcIi9cIj09PW9bMF0pe3ZhciByPW9bMV07XCJvYmplY3RcIj09PWUob1sxXSkmJihyPW9bMV0udXNlcyksdGhpcy5fZGVmYXVsdEhhbmRsZXI9e2hhbmRsZXI6cixob29rczpvWzJdfX1lbHNlIHRoaXMuX2FkZChvWzBdLG9bMV0sb1syXSk7ZWxzZVwib2JqZWN0XCI9PT1lKG9bMF0pJiZPYmplY3Qua2V5cyhvWzBdKS5zb3J0KHMpLmZvckVhY2goZnVuY3Rpb24oZSl7dC5vbihlLG9bMF1bZV0pfSk7cmV0dXJuIHRoaXN9LG9mZjpmdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9PXRoaXMuX2RlZmF1bHRIYW5kbGVyJiZlPT09dGhpcy5fZGVmYXVsdEhhbmRsZXIuaGFuZGxlcj90aGlzLl9kZWZhdWx0SGFuZGxlcj1udWxsOm51bGwhPT10aGlzLl9ub3RGb3VuZEhhbmRsZXImJmU9PT10aGlzLl9ub3RGb3VuZEhhbmRsZXIuaGFuZGxlciYmKHRoaXMuX25vdEZvdW5kSGFuZGxlcj1udWxsKSx0aGlzLl9yb3V0ZXM9dGhpcy5fcm91dGVzLnJlZHVjZShmdW5jdGlvbih0LG4pe3JldHVybiBuLmhhbmRsZXIhPT1lJiZ0LnB1c2gobiksdH0sW10pLHRoaXN9LG5vdEZvdW5kOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuX25vdEZvdW5kSGFuZGxlcj17aGFuZGxlcjplLGhvb2tzOnR9LHRoaXN9LHJlc29sdmU6ZnVuY3Rpb24oZSl7dmFyIG4sbyxpPXRoaXMscz0oZXx8dGhpcy5fY0xvYygpKS5yZXBsYWNlKHRoaXMuX2dldFJvb3QoKSxcIlwiKTt0aGlzLl91c2VIYXNoJiYocz1zLnJlcGxhY2UobmV3IFJlZ0V4cChcIl4vXCIrdGhpcy5faGFzaCksXCIvXCIpKTt2YXIgYT1mdW5jdGlvbihlKXtyZXR1cm4gZS5zcGxpdCgvXFw/KC4qKT8kLykuc2xpY2UoMSkuam9pbihcIlwiKX0oZXx8dGhpcy5fY0xvYygpKSxsPWgocyx0aGlzLl91c2VIYXNoLHRoaXMuX2hhc2gpO3JldHVybiF0aGlzLl9wYXVzZWQmJih0aGlzLl9sYXN0Um91dGVSZXNvbHZlZCYmbD09PXRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLnVybCYmYT09PXRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLnF1ZXJ5Pyh0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5ob29rcyYmdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQuaG9va3MuYWxyZWFkeSYmdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQuaG9va3MuYWxyZWFkeSh0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5wYXJhbXMpLCExKToobz1yKGwsdGhpcy5fcm91dGVzKSk/KHRoaXMuX2NhbGxMZWF2ZSgpLHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkPXt1cmw6bCxxdWVyeTphLGhvb2tzOm8ucm91dGUuaG9va3MscGFyYW1zOm8ucGFyYW1zLG5hbWU6by5yb3V0ZS5uYW1lfSxuPW8ucm91dGUuaGFuZGxlcix1KGZ1bmN0aW9uKCl7dShmdW5jdGlvbigpe28ucm91dGUucm91dGUgaW5zdGFuY2VvZiBSZWdFeHA/bi5hcHBseSh2b2lkIDAsby5tYXRjaC5zbGljZSgxLG8ubWF0Y2gubGVuZ3RoKSk6bihvLnBhcmFtcyxhKX0sby5yb3V0ZS5ob29rcyxvLnBhcmFtcyxpLl9nZW5lcmljSG9va3MpfSx0aGlzLl9nZW5lcmljSG9va3Msby5wYXJhbXMpLG8pOnRoaXMuX2RlZmF1bHRIYW5kbGVyJiYoXCJcIj09PWx8fFwiL1wiPT09bHx8bD09PXRoaXMuX2hhc2h8fGZ1bmN0aW9uKGUsbixvKXtpZih0KCkmJiFuKXJldHVybiExO2lmKCFlLm1hdGNoKG8pKXJldHVybiExO3ZhciBpPWUuc3BsaXQobyk7cmV0dXJuIGkubGVuZ3RoPDJ8fFwiXCI9PT1pWzFdfShsLHRoaXMuX3VzZUhhc2gsdGhpcy5faGFzaCkpPyh1KGZ1bmN0aW9uKCl7dShmdW5jdGlvbigpe2kuX2NhbGxMZWF2ZSgpLGkuX2xhc3RSb3V0ZVJlc29sdmVkPXt1cmw6bCxxdWVyeTphLGhvb2tzOmkuX2RlZmF1bHRIYW5kbGVyLmhvb2tzfSxpLl9kZWZhdWx0SGFuZGxlci5oYW5kbGVyKGEpfSxpLl9kZWZhdWx0SGFuZGxlci5ob29rcyl9LHRoaXMuX2dlbmVyaWNIb29rcyksITApOih0aGlzLl9ub3RGb3VuZEhhbmRsZXImJnUoZnVuY3Rpb24oKXt1KGZ1bmN0aW9uKCl7aS5fY2FsbExlYXZlKCksaS5fbGFzdFJvdXRlUmVzb2x2ZWQ9e3VybDpsLHF1ZXJ5OmEsaG9va3M6aS5fbm90Rm91bmRIYW5kbGVyLmhvb2tzfSxpLl9ub3RGb3VuZEhhbmRsZXIuaGFuZGxlcihhKX0saS5fbm90Rm91bmRIYW5kbGVyLmhvb2tzKX0sdGhpcy5fZ2VuZXJpY0hvb2tzKSwhMSkpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5fcm91dGVzPVtdLHRoaXMuX2Rlc3Ryb3llZD0hMCx0aGlzLl9sYXN0Um91dGVSZXNvbHZlZD1udWxsLHRoaXMuX2dlbmVyaWNIb29rcz1udWxsLGNsZWFyVGltZW91dCh0aGlzLl9saXN0ZW5pbmdJbnRlcnZhbCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKSl9LHVwZGF0ZVBhZ2VMaW5rczpmdW5jdGlvbigpe3ZhciBlPXRoaXM7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50JiZ0aGlzLl9maW5kTGlua3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3QuaGFzTGlzdGVuZXJBdHRhY2hlZHx8KHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24obil7aWYoKG4uY3RybEtleXx8bi5tZXRhS2V5KSYmXCJhXCI9PW4udGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSlyZXR1cm4hMTt2YXIgbz1lLmdldExpbmtQYXRoKHQpO2UuX2Rlc3Ryb3llZHx8KG4ucHJldmVudERlZmF1bHQoKSxlLm5hdmlnYXRlKG8ucmVwbGFjZSgvXFwvKyQvLFwiXCIpLnJlcGxhY2UoL15cXC8rLyxcIi9cIikpKX0pLHQuaGFzTGlzdGVuZXJBdHRhY2hlZD0hMCl9KX0sZ2VuZXJhdGU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LG49dGhpcy5fcm91dGVzLnJlZHVjZShmdW5jdGlvbihuLG8pe3ZhciBpO2lmKG8ubmFtZT09PWUpZm9yKGkgaW4gbj1vLnJvdXRlLHQpbj1uLnRvU3RyaW5nKCkucmVwbGFjZShcIjpcIitpLHRbaV0pO3JldHVybiBufSxcIlwiKTtyZXR1cm4gdGhpcy5fdXNlSGFzaD90aGlzLl9oYXNoK246bn0sbGluazpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fZ2V0Um9vdCgpK2V9LHBhdXNlOmZ1bmN0aW9uKCl7dmFyIGU9IShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSl8fGFyZ3VtZW50c1swXTt0aGlzLl9wYXVzZWQ9ZSx0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kPWU/XCJyZXBsYWNlU3RhdGVcIjpcInB1c2hTdGF0ZVwifSxyZXN1bWU6ZnVuY3Rpb24oKXt0aGlzLnBhdXNlKCExKX0saGlzdG9yeUFQSVVwZGF0ZU1ldGhvZDpmdW5jdGlvbihlKXtyZXR1cm4gdm9pZCAwPT09ZT90aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kOih0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kPWUsZSl9LGRpc2FibGVJZkFQSU5vdEF2YWlsYWJsZTpmdW5jdGlvbigpe3QoKXx8dGhpcy5kZXN0cm95KCl9LGxhc3RSb3V0ZVJlc29sdmVkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkfSxnZXRMaW5rUGF0aDpmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpfSxob29rczpmdW5jdGlvbihlKXt0aGlzLl9nZW5lcmljSG9va3M9ZX0sX2FkZDpmdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06bnVsbCxvPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpudWxsO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0JiYodD1lbmNvZGVVUkkodCkpLHRoaXMuX3JvdXRlcy5wdXNoKFwib2JqZWN0XCI9PT0odm9pZCAwPT09bj9cInVuZGVmaW5lZFwiOmUobikpP3tyb3V0ZTp0LGhhbmRsZXI6bi51c2VzLG5hbWU6bi5hcyxob29rczpvfHxuLmhvb2tzfTp7cm91dGU6dCxoYW5kbGVyOm4saG9va3M6b30pLHRoaXMuX2FkZH0sX2dldFJvb3Q6ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbCE9PXRoaXMucm9vdD90aGlzLnJvb3Q6KHRoaXMucm9vdD1hKHRoaXMuX2NMb2MoKS5zcGxpdChcIj9cIilbMF0sdGhpcy5fcm91dGVzKSx0aGlzLnJvb3QpfSxfbGlzdGVuOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZih0aGlzLl91c2VQdXNoU3RhdGUpd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmXCJvbmhhc2hjaGFuZ2VcImluIHdpbmRvdyl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKTtlbHNle3ZhciB0PXRoaXMuX2NMb2MoKSxuPXZvaWQgMCxvPXZvaWQgMDsobz1mdW5jdGlvbigpe249ZS5fY0xvYygpLHQhPT1uJiYodD1uLGUucmVzb2x2ZSgpKSxlLl9saXN0ZW5pbmdJbnRlcnZhbD1zZXRUaW1lb3V0KG8sMjAwKX0pKCl9fSxfY0xvYzpmdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/dm9pZCAwIT09d2luZG93Ll9fTkFWSUdPX1dJTkRPV19MT0NBVElPTl9NT0NLX18/d2luZG93Ll9fTkFWSUdPX1dJTkRPV19MT0NBVElPTl9NT0NLX186byh3aW5kb3cubG9jYXRpb24uaHJlZik6XCJcIn0sX2ZpbmRMaW5rczpmdW5jdGlvbigpe3JldHVybltdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW5hdmlnb11cIikpfSxfb25Mb2NhdGlvbkNoYW5nZTpmdW5jdGlvbigpe3RoaXMucmVzb2x2ZSgpfSxfY2FsbExlYXZlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ7ZSYmZS5ob29rcyYmZS5ob29rcy5sZWF2ZSYmZS5ob29rcy5sZWF2ZShlLnBhcmFtcyl9fSxuLlBBUkFNRVRFUl9SRUdFWFA9LyhbOipdKShcXHcrKS9nLG4uV0lMRENBUkRfUkVHRVhQPS9cXCovZyxuLlJFUExBQ0VfVkFSSUFCTEVfUkVHRVhQPVwiKFteL10rKVwiLG4uUkVQTEFDRV9XSUxEQ0FSRD1cIig/Oi4qKVwiLG4uRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQPVwiKD86LyR8JClcIixuLk1BVENIX1JFR0VYUF9GTEFHUz1cIlwiLG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdmlnby5taW4uanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XG52YXIgaXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoKHNlbCwgYiwgYykge1xuICAgIHZhciBkYXRhID0ge30sIGNoaWxkcmVuLCB0ZXh0LCBpO1xuICAgIGlmIChjICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIGlmIChpcy5hcnJheShjKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShjKSkge1xuICAgICAgICAgICAgdGV4dCA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyAmJiBjLnNlbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbY107XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpcy5hcnJheShiKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShiKSkge1xuICAgICAgICAgICAgdGV4dCA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYiAmJiBiLnNlbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbYl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChpcy5wcmltaXRpdmUoY2hpbGRyZW5baV0pKVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldID0gdm5vZGVfMS52bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGVfMS52bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5oID0gaDtcbjtcbmV4cG9ydHMuZGVmYXVsdCA9IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0cy5odG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5odG1sRG9tQXBpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHRtbGRvbWFwaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMucHJpbWl0aXZlID0gcHJpbWl0aXZlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcbnZhciB4bWxOUyA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnO1xudmFyIGNvbG9uQ2hhciA9IDU4O1xudmFyIHhDaGFyID0gMTIwO1xuZnVuY3Rpb24gdXBkYXRlQXR0cnMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgZWxtID0gdm5vZGUuZWxtLCBvbGRBdHRycyA9IG9sZFZub2RlLmRhdGEuYXR0cnMsIGF0dHJzID0gdm5vZGUuZGF0YS5hdHRycztcbiAgICBpZiAoIW9sZEF0dHJzICYmICFhdHRycylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRBdHRycyA9PT0gYXR0cnMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRBdHRycyA9IG9sZEF0dHJzIHx8IHt9O1xuICAgIGF0dHJzID0gYXR0cnMgfHwge307XG4gICAgLy8gdXBkYXRlIG1vZGlmaWVkIGF0dHJpYnV0ZXMsIGFkZCBuZXcgYXR0cmlidXRlc1xuICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgIHZhciBjdXIgPSBhdHRyc1trZXldO1xuICAgICAgICB2YXIgb2xkID0gb2xkQXR0cnNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyKSB7XG4gICAgICAgICAgICBpZiAoY3VyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3VyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChrZXkuY2hhckNvZGVBdCgwKSAhPT0geENoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDMpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHhtbCBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZU5TKHhtbE5TLCBrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDUpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHhsaW5rIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlTlMoeGxpbmtOUywga2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZW1vdmVkIGF0dHJpYnV0ZXNcbiAgICAvLyB1c2UgYGluYCBvcGVyYXRvciBzaW5jZSB0aGUgcHJldmlvdXMgYGZvcmAgaXRlcmF0aW9uIHVzZXMgaXQgKC5pLmUuIGFkZCBldmVuIGF0dHJpYnV0ZXMgd2l0aCB1bmRlZmluZWQgdmFsdWUpXG4gICAgLy8gdGhlIG90aGVyIG9wdGlvbiBpcyB0byByZW1vdmUgYWxsIGF0dHJpYnV0ZXMgd2l0aCB2YWx1ZSA9PSB1bmRlZmluZWRcbiAgICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgICAgICBpZiAoIShrZXkgaW4gYXR0cnMpKSB7XG4gICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmF0dHJpYnV0ZXNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQXR0cnMsIHVwZGF0ZTogdXBkYXRlQXR0cnMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuYXR0cmlidXRlc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF0dHJpYnV0ZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVDbGFzcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgY3VyLCBuYW1lLCBlbG0gPSB2bm9kZS5lbG0sIG9sZENsYXNzID0gb2xkVm5vZGUuZGF0YS5jbGFzcywga2xhc3MgPSB2bm9kZS5kYXRhLmNsYXNzO1xuICAgIGlmICghb2xkQ2xhc3MgJiYgIWtsYXNzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZENsYXNzID09PSBrbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZENsYXNzID0gb2xkQ2xhc3MgfHwge307XG4gICAga2xhc3MgPSBrbGFzcyB8fCB7fTtcbiAgICBmb3IgKG5hbWUgaW4gb2xkQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFrbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluIGtsYXNzKSB7XG4gICAgICAgIGN1ciA9IGtsYXNzW25hbWVdO1xuICAgICAgICBpZiAoY3VyICE9PSBvbGRDbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdFtjdXIgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuY2xhc3NNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQ2xhc3MsIHVwZGF0ZTogdXBkYXRlQ2xhc3MgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuY2xhc3NNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGFzcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGludm9rZUhhbmRsZXIoaGFuZGxlciwgdm5vZGUsIGV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gY2FsbCBmdW5jdGlvbiBoYW5kbGVyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh2bm9kZSwgZXZlbnQsIHZub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIHdpdGggYXJndW1lbnRzXG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlclswXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBhcmd1bWVudCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJbMF0uY2FsbCh2bm9kZSwgaGFuZGxlclsxXSwgZXZlbnQsIHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gaGFuZGxlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICAgICAgaGFuZGxlclswXS5hcHBseSh2bm9kZSwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjYWxsIG11bHRpcGxlIGhhbmRsZXJzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnZva2VIYW5kbGVyKGhhbmRsZXJbaV0sIHZub2RlLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCwgdm5vZGUpIHtcbiAgICB2YXIgbmFtZSA9IGV2ZW50LnR5cGUsIG9uID0gdm5vZGUuZGF0YS5vbjtcbiAgICAvLyBjYWxsIGV2ZW50IGhhbmRsZXIocykgaWYgZXhpc3RzXG4gICAgaWYgKG9uICYmIG9uW25hbWVdKSB7XG4gICAgICAgIGludm9rZUhhbmRsZXIob25bbmFtZV0sIHZub2RlLCBldmVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlRXZlbnQoZXZlbnQsIGhhbmRsZXIudm5vZGUpO1xuICAgIH07XG59XG5mdW5jdGlvbiB1cGRhdGVFdmVudExpc3RlbmVycyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgb2xkT24gPSBvbGRWbm9kZS5kYXRhLm9uLCBvbGRMaXN0ZW5lciA9IG9sZFZub2RlLmxpc3RlbmVyLCBvbGRFbG0gPSBvbGRWbm9kZS5lbG0sIG9uID0gdm5vZGUgJiYgdm5vZGUuZGF0YS5vbiwgZWxtID0gKHZub2RlICYmIHZub2RlLmVsbSksIG5hbWU7XG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciByZXVzZWQgaW1tdXRhYmxlIGhhbmRsZXJzXG4gICAgaWYgKG9sZE9uID09PSBvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHJlbW92ZSBleGlzdGluZyBsaXN0ZW5lcnMgd2hpY2ggbm8gbG9uZ2VyIHVzZWRcbiAgICBpZiAob2xkT24gJiYgb2xkTGlzdGVuZXIpIHtcbiAgICAgICAgLy8gaWYgZWxlbWVudCBjaGFuZ2VkIG9yIGRlbGV0ZWQgd2UgcmVtb3ZlIGFsbCBleGlzdGluZyBsaXN0ZW5lcnMgdW5jb25kaXRpb25hbGx5XG4gICAgICAgIGlmICghb24pIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBpZiBlbGVtZW50IHdhcyBjaGFuZ2VkIG9yIGV4aXN0aW5nIGxpc3RlbmVycyByZW1vdmVkXG4gICAgICAgICAgICAgICAgb2xkRWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgb2xkTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBpZiBleGlzdGluZyBsaXN0ZW5lciByZW1vdmVkXG4gICAgICAgICAgICAgICAgaWYgKCFvbltuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBvbGRFbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBvbGRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgbmV3IGxpc3RlbmVycyB3aGljaCBoYXMgbm90IGFscmVhZHkgYXR0YWNoZWRcbiAgICBpZiAob24pIHtcbiAgICAgICAgLy8gcmV1c2UgZXhpc3RpbmcgbGlzdGVuZXIgb3IgY3JlYXRlIG5ld1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSB2bm9kZS5saXN0ZW5lciA9IG9sZFZub2RlLmxpc3RlbmVyIHx8IGNyZWF0ZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIHVwZGF0ZSB2bm9kZSBmb3IgbGlzdGVuZXJcbiAgICAgICAgbGlzdGVuZXIudm5vZGUgPSB2bm9kZTtcbiAgICAgICAgLy8gaWYgZWxlbWVudCBjaGFuZ2VkIG9yIGFkZGVkIHdlIGFkZCBhbGwgbmVlZGVkIGxpc3RlbmVycyB1bmNvbmRpdGlvbmFsbHlcbiAgICAgICAgaWYgKCFvbGRPbikge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVyIGlmIGVsZW1lbnQgd2FzIGNoYW5nZWQgb3IgbmV3IGxpc3RlbmVycyBhZGRlZFxuICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgaWYgbmV3IGxpc3RlbmVyIGFkZGVkXG4gICAgICAgICAgICAgICAgaWYgKCFvbGRPbltuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZXZlbnRMaXN0ZW5lcnNNb2R1bGUgPSB7XG4gICAgY3JlYXRlOiB1cGRhdGVFdmVudExpc3RlbmVycyxcbiAgICB1cGRhdGU6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzLFxuICAgIGRlc3Ryb3k6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5ldmVudExpc3RlbmVyc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50bGlzdGVuZXJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdXBkYXRlUHJvcHMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgY3VyLCBvbGQsIGVsbSA9IHZub2RlLmVsbSwgb2xkUHJvcHMgPSBvbGRWbm9kZS5kYXRhLnByb3BzLCBwcm9wcyA9IHZub2RlLmRhdGEucHJvcHM7XG4gICAgaWYgKCFvbGRQcm9wcyAmJiAhcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkUHJvcHMgPT09IHByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkUHJvcHMgPSBvbGRQcm9wcyB8fCB7fTtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIGZvciAoa2V5IGluIG9sZFByb3BzKSB7XG4gICAgICAgIGlmICghcHJvcHNba2V5XSkge1xuICAgICAgICAgICAgZGVsZXRlIGVsbVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgICAgIG9sZCA9IG9sZFByb3BzW2tleV07XG4gICAgICAgIGlmIChvbGQgIT09IGN1ciAmJiAoa2V5ICE9PSAndmFsdWUnIHx8IGVsbVtrZXldICE9PSBjdXIpKSB7XG4gICAgICAgICAgICBlbG1ba2V5XSA9IGN1cjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMucHJvcHNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlUHJvcHMsIHVwZGF0ZTogdXBkYXRlUHJvcHMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMucHJvcHNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XG52YXIgaXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbnZhciBodG1sZG9tYXBpXzEgPSByZXF1aXJlKFwiLi9odG1sZG9tYXBpXCIpO1xuZnVuY3Rpb24gaXNVbmRlZihzKSB7IHJldHVybiBzID09PSB1bmRlZmluZWQ7IH1cbmZ1bmN0aW9uIGlzRGVmKHMpIHsgcmV0dXJuIHMgIT09IHVuZGVmaW5lZDsgfVxudmFyIGVtcHR5Tm9kZSA9IHZub2RlXzEuZGVmYXVsdCgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5mdW5jdGlvbiBzYW1lVm5vZGUodm5vZGUxLCB2bm9kZTIpIHtcbiAgICByZXR1cm4gdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJiB2bm9kZTEuc2VsID09PSB2bm9kZTIuc2VsO1xufVxuZnVuY3Rpb24gaXNWbm9kZSh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5zZWwgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gICAgdmFyIGksIG1hcCA9IHt9LCBrZXksIGNoO1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICAgIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICBrZXkgPSBjaC5rZXk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbWFwW2tleV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59XG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knLCAncHJlJywgJ3Bvc3QnXTtcbnZhciBoXzEgPSByZXF1aXJlKFwiLi9oXCIpO1xuZXhwb3J0cy5oID0gaF8xLmg7XG52YXIgdGh1bmtfMSA9IHJlcXVpcmUoXCIuL3RodW5rXCIpO1xuZXhwb3J0cy50aHVuayA9IHRodW5rXzEudGh1bms7XG5mdW5jdGlvbiBpbml0KG1vZHVsZXMsIGRvbUFwaSkge1xuICAgIHZhciBpLCBqLCBjYnMgPSB7fTtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sZG9tYXBpXzEuZGVmYXVsdDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGhvb2sgPSBtb2R1bGVzW2pdW2hvb2tzW2ldXTtcbiAgICAgICAgICAgIGlmIChob29rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjYnNbaG9va3NbaV1dLnB1c2goaG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlOb2RlQXQoZWxtKSB7XG4gICAgICAgIHZhciBpZCA9IGVsbS5pZCA/ICcjJyArIGVsbS5pZCA6ICcnO1xuICAgICAgICB2YXIgYyA9IGVsbS5jbGFzc05hbWUgPyAnLicgKyBlbG0uY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQoYXBpLnRhZ05hbWUoZWxtKS50b0xvd2VyQ2FzZSgpICsgaWQgKyBjLCB7fSwgW10sIHVuZGVmaW5lZCwgZWxtKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlUm1DYihjaGlsZEVsbSwgbGlzdGVuZXJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBybUNiKCkge1xuICAgICAgICAgICAgaWYgKC0tbGlzdGVuZXJzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gYXBpLnBhcmVudE5vZGUoY2hpbGRFbG0pO1xuICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRfMSwgY2hpbGRFbG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5pbml0KSkge1xuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuLCBzZWwgPSB2bm9kZS5zZWw7XG4gICAgICAgIGlmIChzZWwgPT09ICchJykge1xuICAgICAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICB2bm9kZS50ZXh0ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlQ29tbWVudCh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gUGFyc2Ugc2VsZWN0b3JcbiAgICAgICAgICAgIHZhciBoYXNoSWR4ID0gc2VsLmluZGV4T2YoJyMnKTtcbiAgICAgICAgICAgIHZhciBkb3RJZHggPSBzZWwuaW5kZXhPZignLicsIGhhc2hJZHgpO1xuICAgICAgICAgICAgdmFyIGhhc2ggPSBoYXNoSWR4ID4gMCA/IGhhc2hJZHggOiBzZWwubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGRvdCA9IGRvdElkeCA+IDAgPyBkb3RJZHggOiBzZWwubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHRhZyA9IGhhc2hJZHggIT09IC0xIHx8IGRvdElkeCAhPT0gLTEgPyBzZWwuc2xpY2UoMCwgTWF0aC5taW4oaGFzaCwgZG90KSkgOiBzZWw7XG4gICAgICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gaXNEZWYoZGF0YSkgJiYgaXNEZWYoaSA9IGRhdGEubnMpID8gYXBpLmNyZWF0ZUVsZW1lbnROUyhpLCB0YWcpXG4gICAgICAgICAgICAgICAgOiBhcGkuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICAgICAgaWYgKGhhc2ggPCBkb3QpXG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnaWQnLCBzZWwuc2xpY2UoaGFzaCArIDEsIGRvdCkpO1xuICAgICAgICAgICAgaWYgKGRvdElkeCA+IDApXG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBzZWwuc2xpY2UoZG90ICsgMSkucmVwbGFjZSgvXFwuL2csICcgJykpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmNyZWF0ZVtpXShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGlmIChpcy5hcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgYXBpLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7IC8vIFJldXNlIHZhcmlhYmxlXG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaS5jcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIGkuY3JlYXRlKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChpLmluc2VydClcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2godm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bm9kZS5lbG07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgYmVmb3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpbnZva2VEZXN0cm95SG9vayh2bm9kZSkge1xuICAgICAgICB2YXIgaSwgaiwgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5kZXN0cm95KSlcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuZGVzdHJveS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuZGVzdHJveVtpXSh2bm9kZSk7XG4gICAgICAgICAgICBpZiAodm5vZGUuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBpID0gdm5vZGUuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9IG51bGwgJiYgdHlwZW9mIGkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZURlc3Ryb3lIb29rKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgaV8xID0gdm9pZCAwLCBsaXN0ZW5lcnMgPSB2b2lkIDAsIHJtID0gdm9pZCAwLCBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RlZihjaC5zZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGludm9rZURlc3Ryb3lIb29rKGNoKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gY2JzLnJlbW92ZS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgICAgICBybSA9IGNyZWF0ZVJtQ2IoY2guZWxtLCBsaXN0ZW5lcnMpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGlfMSA9IDA7IGlfMSA8IGNicy5yZW1vdmUubGVuZ3RoOyArK2lfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNicy5yZW1vdmVbaV8xXShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWYoaV8xID0gY2guZGF0YSkgJiYgaXNEZWYoaV8xID0gaV8xLmhvb2spICYmIGlzRGVmKGlfMSA9IGlfMS5yZW1vdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpXzEoY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRFbG0sIGNoLmVsbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKHBhcmVudEVsbSwgb2xkQ2gsIG5ld0NoLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIG9sZFN0YXJ0SWR4ID0gMCwgbmV3U3RhcnRJZHggPSAwO1xuICAgICAgICB2YXIgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFswXTtcbiAgICAgICAgdmFyIG9sZEVuZFZub2RlID0gb2xkQ2hbb2xkRW5kSWR4XTtcbiAgICAgICAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBuZXdTdGFydFZub2RlID0gbmV3Q2hbMF07XG4gICAgICAgIHZhciBuZXdFbmRWbm9kZSA9IG5ld0NoW25ld0VuZElkeF07XG4gICAgICAgIHZhciBvbGRLZXlUb0lkeDtcbiAgICAgICAgdmFyIGlkeEluT2xkO1xuICAgICAgICB2YXIgZWxtVG9Nb3ZlO1xuICAgICAgICB2YXIgYmVmb3JlO1xuICAgICAgICB3aGlsZSAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4ICYmIG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgbWlnaHQgaGF2ZSBiZWVuIG1vdmVkIGxlZnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZEVuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld1N0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld0VuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBvbGRTdGFydFZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBvbGRFbmRWbm9kZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkS2V5VG9JZHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRLZXlUb0lkeCA9IGNyZWF0ZUtleVRvT2xkSWR4KG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4SW5PbGQgPSBvbGRLZXlUb0lkeFtuZXdTdGFydFZub2RlLmtleV07XG4gICAgICAgICAgICAgICAgaWYgKGlzVW5kZWYoaWR4SW5PbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbG1Ub01vdmUgPSBvbGRDaFtpZHhJbk9sZF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG1Ub01vdmUuc2VsICE9PSBuZXdTdGFydFZub2RlLnNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRjaFZub2RlKGVsbVRvTW92ZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZENoW2lkeEluT2xkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBlbG1Ub01vdmUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4IHx8IG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlID0gbmV3Q2hbbmV3RW5kSWR4ICsgMV0gPT0gbnVsbCA/IG51bGwgOiBuZXdDaFtuZXdFbmRJZHggKyAxXS5lbG07XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCBuZXdDaCwgbmV3U3RhcnRJZHgsIG5ld0VuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBob29rO1xuICAgICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmRhdGEpICYmIGlzRGVmKGhvb2sgPSBpLmhvb2spICYmIGlzRGVmKGkgPSBob29rLnByZXBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgIHZhciBvbGRDaCA9IG9sZFZub2RlLmNoaWxkcmVuO1xuICAgICAgICB2YXIgY2ggPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKG9sZFZub2RlID09PSB2bm9kZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHZub2RlLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy51cGRhdGUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLnVwZGF0ZVtpXShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vaztcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSAmJiBpc0RlZihpID0gaS51cGRhdGUpKVxuICAgICAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKG9sZENoKSAmJiBpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkQ2ggIT09IGNoKVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDaGlsZHJlbihlbG0sIG9sZENoLCBjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSlcbiAgICAgICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhlbG0sIG51bGwsIGNoLCAwLCBjaC5sZW5ndGggLSAxLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2xkVm5vZGUudGV4dCAhPT0gdm5vZGUudGV4dCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sIHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0RlZihob29rKSAmJiBpc0RlZihpID0gaG9vay5wb3N0cGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBhdGNoKG9sZFZub2RlLCB2bm9kZSkge1xuICAgICAgICB2YXIgaSwgZWxtLCBwYXJlbnQ7XG4gICAgICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wcmUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucHJlW2ldKCk7XG4gICAgICAgIGlmICghaXNWbm9kZShvbGRWbm9kZSkpIHtcbiAgICAgICAgICAgIG9sZFZub2RlID0gZW1wdHlOb2RlQXQob2xkVm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYW1lVm5vZGUob2xkVm5vZGUsIHZub2RlKSkge1xuICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgICAgICBwYXJlbnQgPSBhcGkucGFyZW50Tm9kZShlbG0pO1xuICAgICAgICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50LCB2bm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhlbG0pKTtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50LCBbb2xkVm5vZGVdLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWVbaV0uZGF0YS5ob29rLmluc2VydChpbnNlcnRlZFZub2RlUXVldWVbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucG9zdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wb3N0W2ldKCk7XG4gICAgICAgIHJldHVybiB2bm9kZTtcbiAgICB9O1xufVxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNuYWJiZG9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGhfMSA9IHJlcXVpcmUoXCIuL2hcIik7XG5mdW5jdGlvbiBjb3B5VG9UaHVuayh2bm9kZSwgdGh1bmspIHtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG4gICAgdm5vZGUuZGF0YS5mbiA9IHRodW5rLmRhdGEuZm47XG4gICAgdm5vZGUuZGF0YS5hcmdzID0gdGh1bmsuZGF0YS5hcmdzO1xuICAgIHRodW5rLmRhdGEgPSB2bm9kZS5kYXRhO1xuICAgIHRodW5rLmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgdGh1bmsudGV4dCA9IHZub2RlLnRleHQ7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xufVxuZnVuY3Rpb24gaW5pdCh0aHVuaykge1xuICAgIHZhciBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciB2bm9kZSA9IGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGN1ci5hcmdzKTtcbiAgICBjb3B5VG9UaHVuayh2bm9kZSwgdGh1bmspO1xufVxuZnVuY3Rpb24gcHJlcGF0Y2gob2xkVm5vZGUsIHRodW5rKSB7XG4gICAgdmFyIGksIG9sZCA9IG9sZFZub2RlLmRhdGEsIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIG9sZEFyZ3MgPSBvbGQuYXJncywgYXJncyA9IGN1ci5hcmdzO1xuICAgIGlmIChvbGQuZm4gIT09IGN1ci5mbiB8fCBvbGRBcmdzLmxlbmd0aCAhPT0gYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY29weVRvVGh1bmsoY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyksIHRodW5rKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAob2xkQXJnc1tpXSAhPT0gYXJnc1tpXSkge1xuICAgICAgICAgICAgY29weVRvVGh1bmsoY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyksIHRodW5rKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb3B5VG9UaHVuayhvbGRWbm9kZSwgdGh1bmspO1xufVxuZXhwb3J0cy50aHVuayA9IGZ1bmN0aW9uIHRodW5rKHNlbCwga2V5LCBmbiwgYXJncykge1xuICAgIGlmIChhcmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXJncyA9IGZuO1xuICAgICAgICBmbiA9IGtleTtcbiAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gaF8xLmgoc2VsLCB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBob29rOiB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCB9LFxuICAgICAgICBmbjogZm4sXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnRodW5rO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGh1bmsuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnRzLnZub2RlID0gdm5vZGU7XG5leHBvcnRzLmRlZmF1bHQgPSB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcCIsIi8vIEBmbG93XHJcbmltcG9ydCB0eXBlIHsgQ29uZmlnLCBBY3Rpb24gfSBmcm9tIFwiLi9saWIvamV0aXhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50IH0gZnJvbSBcIi4vbGliL2pldGl4XCI7XHJcbmltcG9ydCAqIGFzIHJvdXRlciBmcm9tIFwiLi9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCIuL2xpYi92ZG9tXCI7XHJcbmltcG9ydCBjb3VudGVyRGVtbyBmcm9tIFwiLi9wYWdlcy9jb3VudGVyRGVtb1wiO1xyXG5pbXBvcnQgYWJvdXRQYWdlIGZyb20gXCIuL3BhZ2VzL2Fib3V0UGFnZVwiO1xyXG5jb25zdCB7IGRpdiB9ID0gaHRtbDtcclxuXHJcbnR5cGUgUHJvcHMgPSB7fFxyXG58fTtcclxuXHJcbmV4cG9ydCB0eXBlIFN0YXRlID0ge3xcclxuICAgIHRoZW1lOiBUaGVtZTtcclxuICAgIHBhZ2U6ID9QYWdlO1xyXG58fTtcclxuXHJcbnR5cGUgQWN0aW9uTmFtZSA9IFwiU2V0UGFnZVwiIHwgXCJTZXRUaGVtZVwiO1xyXG5cclxudHlwZSBQYWdlID0gXCJjb3VudGVyRGVtb1wiIHwgXCJhYm91dFBhZ2VcIjtcclxuXHJcbnR5cGUgVGhlbWUgPSBcImRlZmF1bHRcIiB8IFwiZGFya1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudCgoYWN0aW9uOiBBY3Rpb248QWN0aW9uTmFtZT4pID0+ICh7XHJcblxyXG4gICAgc3RhdGU6IHByb3BzID0+ICh7XHJcbiAgICAgICAgdGhlbWU6IFwiZGVmYXVsdFwiLFxyXG4gICAgICAgIHBhZ2U6IG51bGxcclxuICAgIH0pLFxyXG5cclxuICAgIGFjdGlvbnM6IHtcclxuICAgICAgICBTZXRQYWdlOiAoeyBwYWdlIH06IHsgcGFnZTogUGFnZSB9LCBzdGF0ZTogU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgc3RhdGUucGFnZSA9IHBhZ2U7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXRlIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBTZXRUaGVtZTogKHsgdGhlbWUgfTogeyB0aGVtZTogVGhlbWUgfSwgc3RhdGU6IFN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLnRoZW1lID0gdGhlbWU7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXRlIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB2aWV3KGlkOiBzdHJpbmcsIHN0YXRlOiBTdGF0ZSwgcHJvcHM6IFByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIGRpdihgLnBhZ2UuJHtzdGF0ZS50aGVtZX1gLFxyXG4gICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdGF0ZS5wYWdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhYm91dFBhZ2VcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFib3V0UGFnZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiI2Fib3V0LXBhZ2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb25TZXRUaGVtZTogYWN0aW9uKFwiU2V0VGhlbWVcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY291bnRlckRlbW9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ZXJEZW1vKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIjY291bnRlci1kZW1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG9uU2V0VGhlbWU6IGFjdGlvbihcIlNldFRoZW1lXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59OiBDb25maWc8U3RhdGUsIEFjdGlvbk5hbWUsIFwiXCIsIFByb3BzPikpO1xyXG4iLCIvLyBAZmxvd1xyXG5pbXBvcnQgdHlwZSB7IENvbmZpZywgQWN0aW9uLCBUYXNrIH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN0YXRlIGFzIFJvb3RTdGF0ZSB9IGZyb20gXCIuLi9hcHBcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50IH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9uIGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUNvdW50LCBpc05lZ2F0aXZlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3ZhbGlkYXRpb25cIjtcclxuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCIuLi9saWIvdmRvbVwiO1xyXG5jb25zdCB7IGRpdiwgYnV0dG9uIH0gPSBodG1sO1xyXG5cclxudHlwZSBQcm9wcyA9IHt8XHJcbiAgICArc3RhcnQ6IG51bWJlcjtcclxufH07XHJcblxyXG50eXBlIFN0YXRlID0ge3xcclxuICAgIGNvdW50ZXI6IG51bWJlcjtcclxuICAgIGZlZWRiYWNrOiBzdHJpbmc7XHJcbnx9O1xyXG5cclxudHlwZSBBY3Rpb25OYW1lID1cclxuICAgIFwiSW5jcmVtZW50XCIgfFxyXG4gICAgXCJEZWNyZW1lbnRcIiB8XHJcbiAgICBcIlZhbGlkYXRlXCIgfFxyXG4gICAgXCJTZXRGZWVkYmFja1wiO1xyXG5cclxudHlwZSBUYXNrTmFtZSA9XHJcbiAgICBcIlZhbGlkYXRlQ291bnRcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudCgoYWN0aW9uOiBBY3Rpb248QWN0aW9uTmFtZT4sIHRhc2s6IFRhc2s8VGFza05hbWU+KSA9PiAoe1xyXG5cclxuICAgIC8vIEluaXRpYWwgc3RhdGVcclxuICAgIHN0YXRlOiAocHJvcHM6IFByb3BzKSA9PiAoe1xyXG4gICAgICAgIGNvdW50ZXI6IHByb3BzLnN0YXJ0LFxyXG4gICAgICAgIGZlZWRiYWNrOiBcIlwiXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBJbml0aWFsIGFjdGlvblxyXG4gICAgaW5pdDogYWN0aW9uKFwiVmFsaWRhdGVcIiksXHJcblxyXG4gICAgLy8gQWN0aW9uIGhhbmRsZXJzIHJldHVybiBuZXcgc3RhdGUsIGFuZCBhbnkgbmV4dCBhY3Rpb25zL3Rhc2tzXHJcbiAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgLy8gSW5wdXRzOiBhY3Rpb24gZGF0YSwgc3RhdGUsIHByb3BzLCByb290U3RhdGVcclxuICAgICAgICBJbmNyZW1lbnQ6ICh7IHN0ZXAgfTogeyBzdGVwOiBudW1iZXIgfSwgc3RhdGU6IFN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLmNvdW50ZXIgKz0gc3RlcDtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV4dDogYWN0aW9uKFwiVmFsaWRhdGVcIilcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIERlY3JlbWVudDogKHsgc3RlcCB9OiB7IHN0ZXA6IG51bWJlciB9LCBzdGF0ZTogU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgc3RhdGUuY291bnRlciAtPSBzdGVwO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBuZXh0OiBhY3Rpb24oXCJWYWxpZGF0ZVwiKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVmFsaWRhdGU6IChfLCBzdGF0ZTogU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV4dDogW1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbihcIlNldEZlZWRiYWNrXCIsIHsgdGV4dDogXCJWYWxpZGF0aW5nLi4uXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQXN5bmMgdGFza1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2soXCJWYWxpZGF0ZUNvdW50XCIsIHsgY291bnQ6IHN0YXRlLmNvdW50ZXIgfSlcclxuICAgICAgICAgICAgICAgIF19O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU2V0RmVlZGJhY2s6ICh7IHRleHQgfTogeyB0ZXh0OiBzdHJpbmcgfSwgc3RhdGU6IFN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLmZlZWRiYWNrID0gdGV4dDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdGUgfTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFRhc2sgaGFuZGxlcnMgcHJvdmlkZSBjYWxsYmFja3MgZm9yIGFzeW5jIG9wZXJhdGlvbnMgdGhhdCBtYXkgZmFpbFxyXG4gICAgdGFza3M6IHtcclxuICAgICAgICBWYWxpZGF0ZUNvdW50OiAoeyBjb3VudCB9OiB7IGNvdW50OiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGVyZm9ybTogKCkgPT4gdmFsaWRhdGVDb3VudChjb3VudCksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAodGV4dDogc3RyaW5nKSA9PiBhY3Rpb24oXCJTZXRGZWVkYmFja1wiLCB7IHRleHQgfSksXHJcbiAgICAgICAgICAgICAgICBmYWlsdXJlOiAoKSA9PiBhY3Rpb24oXCJTZXRGZWVkYmFja1wiLCB7IHRleHQ6IFwiVW5hdmFpbGFibGVcIiB9KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gVmlldyByZW5kZXJzIGZyb20gcHJvcHMgJiBzdGF0ZVxyXG4gICAgLy8gSW5wdXRzOiBjb21wb25lbnQgaW5zdGFuY2UgaWQsIHN0YXRlLCBwcm9wcywgcm9vdFN0YXRlXHJcbiAgICB2aWV3KGlkOiBzdHJpbmcsIHN0YXRlOiBTdGF0ZSwgcHJvcHM6IFByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIGRpdihcIi5jb3VudGVyXCIsIFtcclxuICAgICAgICAgICAgYnV0dG9uKFxyXG4gICAgICAgICAgICAgICAgeyBvbjogeyBjbGljazogYWN0aW9uKFwiSW5jcmVtZW50XCIsIHsgc3RlcDogMSB9KSB9IH0sXHJcbiAgICAgICAgICAgICAgICBcIitcIlxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBkaXYoU3RyaW5nKHN0YXRlLmNvdW50ZXIpKSxcclxuICAgICAgICAgICAgYnV0dG9uKFxyXG4gICAgICAgICAgICAgICAgeyBvbjogeyBjbGljazogYWN0aW9uKFwiRGVjcmVtZW50XCIsIHsgc3RlcDogMSB9KSB9IH0sXHJcbiAgICAgICAgICAgICAgICBcIi1cIlxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAvLyBDaGlsZCBjb21wb25lbnQgLSBgbm90aWZpY2F0aW9uYCBtb2R1bGVcclxuICAgICAgICAgICAgbm90aWZpY2F0aW9uKGAjJHtpZH0tZmVlZGJhY2tgLCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdGF0ZS5mZWVkYmFjayxcclxuICAgICAgICAgICAgICAgIG9uRGlzbWlzczogYWN0aW9uKFwiU2V0RmVlZGJhY2tcIiwgeyB0ZXh0OiBcIlwiIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59OiBDb25maWc8U3RhdGUsIEFjdGlvbk5hbWUsIFRhc2tOYW1lLCBQcm9wcz4pKTtcclxuIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgQ29uZmlnLCBBY3Rpb24sIFRhc2ssIFVwZGF0ZVRodW5rIH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xuaW1wb3J0IHsgY29tcG9uZW50IH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCIuLi9saWIvdmRvbVwiO1xuY29uc3QgeyBkaXYsIGJ1dHRvbiB9ID0gaHRtbDtcblxudHlwZSBQcm9wcyA9IHt8XG4gICAgK3RleHQ6IHN0cmluZztcbiAgICArb25EaXNtaXNzOiBVcGRhdGVUaHVuaztcbnx9O1xuXG50eXBlIFN0YXRlID0ge3xcbiAgICBzaG93OiBib29sZWFuO1xufH07XG5cbnR5cGUgQWN0aW9uTmFtZSA9XG4gICAgXCJEaXNtaXNzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50KChhY3Rpb246IEFjdGlvbjxBY3Rpb25OYW1lPikgPT4gKHtcblxuICAgIHN0YXRlOiBwcm9wcyA9PiAoe1xuICAgICAgICBzaG93OiB0cnVlXG4gICAgfSksXG5cbiAgICBhY3Rpb25zOiB7XG4gICAgICAgIERpc21pc3M6ICggXywgc3RhdGU6IFN0YXRlLCBwcm9wczogUHJvcHMpID0+IHtcbiAgICAgICAgICAgIHN0YXRlLnNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICAgICAgbmV4dDogcHJvcHMub25EaXNtaXNzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHZpZXcoaWQ6IHN0cmluZywgc3RhdGU6IFN0YXRlLCBwcm9wczogUHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIGRpdihcIi5ub3RpZmljYXRpb25cIiwge1xuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBzaG93OiBzdGF0ZS5zaG93ICYmIHByb3BzLnRleHQubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIFtcbiAgICAgICAgICAgIHByb3BzLnRleHQsXG4gICAgICAgICAgICBidXR0b24oeyBvbjogeyBjbGljazogYWN0aW9uKFwiRGlzbWlzc1wiKSB9IH0sIFwiRGlzbWlzc1wiKVxuICAgICAgICBdKTtcbiAgICB9XG5cbn06IENvbmZpZzxTdGF0ZSwgQWN0aW9uTmFtZSwgXCJcIiwgUHJvcHM+KSk7XG4iLCIvLyBAZmxvd1xuaW1wb3J0IHsgY29tcG9uZW50LCByb290QWN0aW9uIH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCIuLi9saWIvdmRvbVwiO1xuY29uc3QgeyBkaXYsIGJ1dHRvbiB9ID0gaHRtbDtcblxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQoKCkgPT4gKHtcblxuICAgIHZpZXcoKSB7XG4gICAgICAgIHJldHVybiBkaXYoXCIudGhlbWUtbWVudVwiLCBbXG4gICAgICAgICAgICBidXR0b24oXG4gICAgICAgICAgICAgICAgeyBvbjogeyBjbGljazogcm9vdEFjdGlvbihcIlNldFRoZW1lXCIsIHsgdGhlbWU6IFwibGlnaHRcIiB9KSB9IH0sXG4gICAgICAgICAgICAgICAgXCJMaWdodCB0aGVtZVwiKSxcbiAgICAgICAgICAgIGJ1dHRvbihcbiAgICAgICAgICAgICAgICB7IG9uOiB7IGNsaWNrOiByb290QWN0aW9uKFwiU2V0VGhlbWVcIiwgeyB0aGVtZTogXCJkYXJrXCIgfSkgfSB9LFxuICAgICAgICAgICAgICAgIFwiRGFyayB0aGVtZVwiKVxuICAgICAgICBdKTtcbiAgICB9XG5cbn0pKTtcbiIsIi8qXG4gIEBmbG93XG4gIE5PVEU6IFByb2R1Y3Rpb24gYnVpbGQgcmVtb3ZlcyBsaW5lcyBtYXJrZWQgYEBkZXZCdWlsZGBcbiovXG5pbXBvcnQgeyBwYXRjaCwgc2V0SG9vayB9IGZyb20gXCIuL3Zkb21cIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2pldGl4RGV2XCI7IC8vIEBkZXZCdWlsZFxuXG5cbmV4cG9ydCB0eXBlIFVwZGF0ZVRodW5rID0gKGRhdGE/OiB7fSkgPT4gdm9pZCB8IFVwZGF0ZVRodW5rOyAvLyBBcmd1bWVudCB3aGVuIGN1cnJ5aW5nXG5cbmV4cG9ydCB0eXBlIEFjdGlvbjxBPiA9XG4gICAgKGFjdGlvbk5hbWU6IEEsIGRhdGE/OiB7fSkgPT4gVXBkYXRlVGh1bms7XG5cbmV4cG9ydCB0eXBlIFRhc2s8VD4gPVxuICAgICh0YXNrTmFtZTogVCwgZGF0YTogKikgPT4gUHJvbWlzZTwqPjtcblxudHlwZSBUYXNrU3BlYyA9IHtcbiAgICArcGVyZm9ybTogKCkgPT4gUHJvbWlzZTwqPixcbiAgICArc3VjY2VzczogKCopID0+IFVwZGF0ZVRodW5rLFxuICAgICtmYWlsdXJlOiAoKikgPT4gP1VwZGF0ZVRodW5rXG59O1xuXG50eXBlIE5leHQgPVxuICAgIFVwZGF0ZVRodW5rIHwgUHJvbWlzZTwqPiB8IEFycmF5PFVwZGF0ZVRodW5rIHwgUHJvbWlzZTwqPj47XG5cbnR5cGUgQWN0aW9uSGFuZGxlcjxTLCBQPiA9IChkYXRhOiAqLCBzdGF0ZTogUywgcHJvcHM6IFAsIHJvb3RTdGF0ZTogKikgPT4geyBzdGF0ZTogUywgbmV4dD86IE5leHQgfTtcblxudHlwZSBUYXNrSGFuZGxlciA9IChkYXRhOiAqKSA9PiBUYXNrU3BlYztcblxudHlwZSBWbm9kZSA9IHt9O1xuXG5leHBvcnQgdHlwZSBDb25maWc8UywgQSwgVCwgUD4gPSB7fFxuICAgICtzdGF0ZTogUCA9PiBTLFxuICAgICtpbml0PzogTmV4dCxcbiAgICArYWN0aW9uczogeyArW2FjdGlvbk5hbWU6IEFdOiBBY3Rpb25IYW5kbGVyPFMsIFA+IH0sXG4gICAgK3Rhc2tzPzogeyArW3Rhc2tOYW1lOiBUXTogVGFza0hhbmRsZXIgfSxcbiAgICArdmlldzogKGlkOiBzdHJpbmcsIHN0YXRlOiBTLCBwcm9wczogKiwgcm9vdFN0YXRlOiAqKSA9PiBWbm9kZVxufH1cblxuXG5jb25zdCBhcHBJZCA9IFwiYXBwXCI7XG5jb25zdCByZW5kZXJSZWZzOiB7IFtzdHJpbmddOiBGdW5jdGlvbiB9ID0ge307XG5jb25zdCBpbnRlcm5hbEtleSA9IHsgazogTWF0aC5yYW5kb20oKSB9O1xubGV0IHJvb3RTdGF0ZTtcblxuZXhwb3J0IGxldCByb290QWN0aW9uID0gPEE+KGFjdGlvbk5hbWU6IEEsIGRhdGE/OiB7fSk6IFVwZGF0ZVRodW5rID0+IHtcbiAgICByZXR1cm4gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignUm9vdCBub3QgaW5pdGlhbGlzZWQhJyk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnQoZ2V0Q29uZmlnOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAvLyBQYXNzIGluIGNhbGxiYWNrIHRoYXQgcmV0dXJucyBjb21wb25lbnQgY29uZmlnXG4gICAgLy8gUmV0dXJucyByZW5kZXIgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYnkgcGFyZW50IGUuZy4gYGNvdW50ZXIoXCJjb3VudGVyLTBcIiwgeyBzdGFydDogMCB9KWBcbiAgICBjb25zdCByZW5kZXJGbiA9IChpZFN0cjogc3RyaW5nLCBwcm9wczoge30gPSB7fSk6IFZub2RlID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBpZFN0ci5yZXBsYWNlKC9eIy8sIFwiXCIpO1xuICAgICAgICBpZiAoIWlkLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJDb21wb25lbnQgcmVxdWlyZXMgYW4gaWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbmRlckNvbXBvbmVudChpZCwgcHJvcHMsIGdldENvbmZpZyk7XG4gICAgfTtcbiAgICAvLyBBZGQgYSBoYW5kbGUgdG8gYGdldENvbmZpZ2AgZm9yIHRlc3RzXG4gICAgcmVuZGVyRm4uZ2V0Q29uZmlnID0gZ2V0Q29uZmlnO1xuICAgIHJldHVybiByZW5kZXJGbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudDxTOiB7fSwgUDoge30sIEEsIFQ+KFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcHJvcHM6IFAsXG4gICAgZ2V0Q29uZmlnOiAoQWN0aW9uPEE+LCBUYXNrPFQ+KSA9PiBDb25maWc8UywgQSwgVCwgUD5cbik6IFZub2RlIHtcbiAgICBkZWVwRnJlZXplKHByb3BzKTsgLy8gQGRldkJ1aWxkXG4gICAgY29uc3QgaXNSb290ID0gaWQgPT09IGFwcElkO1xuXG4gICAgLy8gSWYgY29tcG9uZW50IGFscmVhZHkgZXhpc3RzLCBqdXN0IHJ1biByZW5kZXIoKSBhZ2FpblxuICAgIGxldCBjb21wb25lbnRSb290ID0gcmVuZGVyQnlJZChpZCwgcHJvcHMpO1xuICAgIGlmIChjb21wb25lbnRSb290KSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRSb290O1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvbjogQWN0aW9uPEE+ID0gKGFjdGlvbk5hbWUsIGRhdGEpOiBVcGRhdGVUaHVuayA9PiB7XG4gICAgICAgIHJldHVybiAodGh1bmtJbnB1dD86IHt9KTogdm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAodGh1bmtJbnB1dCAmJiBcInNyY0VsZW1lbnRcIiBpbiB0aHVua0lucHV0KSB7XG4gICAgICAgICAgICAgICAgLy8gSW52b2tlZCBmcm9tIHRoZSBET00sIGB0aHVua0lucHV0YCBpcyB0aGUgKHVudXNlZCkgZXZlbnRcbiAgICAgICAgICAgICAgICB1cGRhdGUoYWN0aW9uTmFtZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aHVua0lucHV0ID09PSBpbnRlcm5hbEtleSkge1xuICAgICAgICAgICAgICAgIC8vIENhbGxlZCBieSBpbnRlcm5hbCBtZXRob2RzIGBydW4oKWAgb3IgYHJ1blJvb3RBY3Rpb24oKWBcbiAgICAgICAgICAgICAgICAvLyBgaW50ZXJuYWxLZXlgIHByZXZlbnRzIGFuIGFjdGlvbiBmcm9tIGJlaW5nIGludm9rZWQgZXh0ZXJuYWxseVxuICAgICAgICAgICAgICAgIHVwZGF0ZShhY3Rpb25OYW1lLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRodW5rSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBhIGRhdGEgYXJndW1lbnQgaXMgc3VwcGxpZWQsIHJldHVybiBhIG5ldyB0aHVuayBpbnN0ZWFkIG9mIGludm9raW5nIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICAgICAgICAgIC8vIFRoaXMgZW5hYmxlcyBjdXJyeWluZyBlLmcuIHdoZW4gcGFzc2luZyBhbiBhY3Rpb24gZnJvbSBwYXJlbnQgdG8gY2hpbGQgdmlhIHByb3BzXG4gICAgICAgICAgICAgICAgYWN0aW9uKGFjdGlvbk5hbWUsIHRodW5rSW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIEBkZXZCdWlsZFxuICAgICAgICAgICAgICAgIGxvZy5tYW51YWxBY3Rpb25FcnJvcihpZCwgU3RyaW5nKGFjdGlvbk5hbWUpKTsgLy8gQGRldkJ1aWxkXG4gICAgICAgICAgICB9IC8vIEBkZXZCdWlsZFxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCB0YXNrOiBUYXNrPFQ+ID0gKHRhc2tOYW1lLCBkYXRhKSA9PiB7XG4gICAgICAgIGlmICghY29uZmlnLnRhc2tzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgdGFza3MgJHtTdHJpbmcoY29uZmlnLnRhc2tzKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHBlcmZvcm0sIHN1Y2Nlc3MsIGZhaWx1cmUgfTogVGFza1NwZWMgPSBjb25maWcudGFza3NbdGFza05hbWVdKGRhdGEpO1xuICAgICAgICBjb25zdCBwcm9taXNlID0gcGVyZm9ybSgpO1xuICAgICAgICBwcm9taXNlLnRoZW4udGFza05hbWUgPSB0YXNrTmFtZTtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihzdWNjZXNzKS5jYXRjaChmYWlsdXJlKTtcbiAgICB9O1xuXG4gICAgLy8gSW52b2tlIHRoZSBmdW5jdGlvbiBwYXNzZWQgaW50byBgY29tcG9uZW50KClgIHdpdGggcHJvcHMgYW5kIHRoZXNlIGZ1bmN0aW9uc1xuICAgIGNvbnN0IGNvbmZpZzogQ29uZmlnPFMsIEEsIFQsIFA+ID0gZ2V0Q29uZmlnKGFjdGlvbiwgdGFzayk7XG4gICAgbGV0IHN0YXRlOiBTID0gKGNvbmZpZy5zdGF0ZSB8fCAoKCkgPT4gKHt9KSkpKHByb3BzKTtcbiAgICBsZXQgbm9SZW5kZXI6IG51bWJlciA9IDA7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoYWN0aW9uTmFtZTogQSwgZGF0YT86IHt9KTogdm9pZCB7XG4gICAgICAgIGxldCBuZXh0O1xuICAgICAgICBsb2cudXBkYXRlU3RhcnQoaWQsIHN0YXRlLCBhY3Rpb25OYW1lLCBkYXRhKTsgLy8gQGRldkJ1aWxkXG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID1cbiAgICAgICAgICAgIGNsb25lKCAvLyBAZGV2QnVpbGRcbiAgICAgICAgICAgICAgICBzdGF0ZVxuICAgICAgICAgICAgKSAvLyBAZGV2QnVpbGRcbiAgICAgICAgO1xuICAgICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgICAgICByb290U3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICAoeyBzdGF0ZSwgbmV4dCB9ID0gY29uZmlnLmFjdGlvbnNbYWN0aW9uTmFtZV0oZGF0YSwgbmV3U3RhdGUsIHByb3BzLCByb290U3RhdGUpKTtcbiAgICAgICAgLy8gRnJlZXplIGluIGRldiB0byBlcnJvciBvbiBhbnkgbXV0YXRpb24gb3V0c2lkZSBvZiBhY3Rpb24gaGFuZGxlcnNcbiAgICAgICAgZGVlcEZyZWV6ZShzdGF0ZSk7IC8vIEBkZXZCdWlsZFxuICAgICAgICBsb2cudXBkYXRlRW5kKHN0YXRlKTsgLy8gQGRldkJ1aWxkXG4gICAgICAgIHJ1bihuZXh0LCBhY3Rpb25OYW1lLCBwcm9wcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKG5leHQ6ID9OZXh0LCBwcmV2VGFnPzogKiwgcHJvcHM6IFApOiB2b2lkIHtcbiAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgICByZW5kZXIocHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIGBpbnRlcm5hbEtleWAgaXMgcmVxdWlyZWQgdG8gaW52b2tlIGFuIGFjdGlvblxuICAgICAgICAgICAgbmV4dChpbnRlcm5hbEtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShuZXh0KSkge1xuICAgICAgICAgICAgbm9SZW5kZXIrKztcbiAgICAgICAgICAgIG5leHQuZm9yRWFjaChuID0+IHJ1bihuLCBwcmV2VGFnLCBwcm9wcykpO1xuICAgICAgICAgICAgbm9SZW5kZXItLTtcbiAgICAgICAgICAgIHJlbmRlcihwcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG5leHQudGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrTmFtZSA9IG5leHQudGhlbi50YXNrTmFtZSB8fCAndW5rbm93bic7XG4gICAgICAgICAgICBuZXh0LnRoZW4obiA9PiB7XG4gICAgICAgICAgICAgICAgbG9nLnRhc2tTdWNjZXNzKGlkLCB0YXNrTmFtZSk7IC8vIEBkZXZCdWlsZFxuICAgICAgICAgICAgICAgIHJ1bihuLCBwcmV2VGFnLCBwcm9wcyk7XG4gICAgICAgICAgICB9KS5jYXRjaChlID0+IGxvZy50YXNrRmFpbHVyZShpZCwgdGFza05hbWUsIGUpKTtcbiAgICAgICAgICAgIGxvZy50YXNrUGVyZm9ybSh0YXNrTmFtZSk7IC8vIEBkZXZCdWlsZFxuICAgICAgICAgICAgcmVuZGVyKHByb3BzKTsgLy8gRW5kIG9mIHN5bmMgY2hhaW5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcihwcm9wczogUCk6ID9Wbm9kZSB7XG4gICAgICAgIGlmICghbm9SZW5kZXIpIHtcbiAgICAgICAgICAgIHBhdGNoKFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFJvb3QsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50Um9vdCA9IGNvbmZpZy52aWV3KGlkLCBzdGF0ZSwgcHJvcHMsIHJvb3RTdGF0ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRSZW5kZXJSZWYoY29tcG9uZW50Um9vdCwgaWQsIHJlbmRlcik7XG4gICAgICAgICAgICBsb2cucmVuZGVyKGlkLCBwcm9wcywgc3RhdGUpOyAvLyBAZGV2QnVpbGRcbiAgICAgICAgICAgIHB1Ymxpc2goXCJwYXRjaFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50Um9vdDtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmluaXQpIHtcbiAgICAgICAgbm9SZW5kZXIrKztcbiAgICAgICAgcnVuKGNvbmZpZy5pbml0LCB1bmRlZmluZWQsIHByb3BzKTtcbiAgICAgICAgbm9SZW5kZXItLTtcbiAgICB9XG4gICAgZWxzZSB7IC8vIEBkZXZCdWlsZFxuICAgICAgICBsb2cubm9Jbml0aWFsQWN0aW9uKGlkLCBzdGF0ZSk7IC8vIEBkZXZCdWlsZFxuICAgIH0gLy8gQGRldkJ1aWxkXG5cbiAgICBpZiAoaXNSb290KSB7XG4gICAgICAgIHJvb3RBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHJvb3RTdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFJvb3QgPSBjb25maWcudmlldyhpZCwgc3RhdGUsIHByb3BzLCByb290U3RhdGUpO1xuICAgIHNldFJlbmRlclJlZihjb21wb25lbnRSb290LCBpZCwgcmVuZGVyKTtcbiAgICBsb2cucmVuZGVyKGlkLCBwcm9wcywgc3RhdGUpOyAvLyBAZGV2QnVpbGRcbiAgICByZXR1cm4gY29tcG9uZW50Um9vdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50KGFwcENvbXBvbmVudDogKHN0cmluZywgKikgPT4gVm5vZGUsIGluaXRGbj86IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgLy8gTW91bnQgdGhlIHRvcC1sZXZlbCBhcHAgY29tcG9uZW50XG4gICAgcGF0Y2goXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFwcElkKSxcbiAgICAgICAgYXBwQ29tcG9uZW50KGFwcElkLCB7IC8qIFByb3BzICovIH0pXG4gICAgKTtcbiAgICAvLyBBbiBvcHRpb25hbCBjYWxsYmFjayBwcm92aWRlcyBgcnVuUm9vdEFjdGlvbmAgZm9yIGJpbmRpbmcgZXZlbnRzIHRvIHJvb3QgYWN0aW9uc1xuICAgIC8vIChgaW50ZXJuYWxLZXlgIGlzIHJlcXVpcmVkIHRvIGludm9rZSBhbiBhY3Rpb24pXG4gICAgaWYgKGluaXRGbikge1xuICAgICAgICBjb25zdCBydW5Sb290QWN0aW9uID0gKC4uLmEpID0+IHtcbiAgICAgICAgICAgIHJvb3RBY3Rpb24oLi4uYSkoaW50ZXJuYWxLZXkpO1xuICAgICAgICB9O1xuICAgICAgICBpbml0Rm4ocnVuUm9vdEFjdGlvbik7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIHJlbmRlckJ5SWQoaWQ6IHN0cmluZywgcHJvcHM6IHt9KTogP1Zub2RlIHtcbiAgICBjb25zdCByZW5kZXIgPSByZW5kZXJSZWZzW2lkXTtcbiAgICBpZiAocmVuZGVyKSB7XG4gICAgICAgIHJldHVybiByZW5kZXIocHJvcHMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0UmVuZGVyUmVmKHZub2RlOiBWbm9kZSwgaWQ6IHN0cmluZywgcmVuZGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIC8vIFJ1biBhZnRlciBhbGwgc3luY2hyb25vdXMgcGF0Y2hlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZW5kZXJSZWZzW2lkXSA9IHJlbmRlcjtcbiAgICAgICAgc2V0SG9vayh2bm9kZSwgJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgcmVuZGVyUmVmc1tpZF07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjbG9uZTxBOiB7fT4obzogQSk6IEEge1xuICAgIC8vIFNob3VsZCBvbmx5IGJlIGNsb25pbmcgc2ltcGxlIHN0YXRlIG1vZGVsc1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG8pKTtcbn1cblxuZnVuY3Rpb24gZGVlcEZyZWV6ZTxBOiB7fT4obzogQSk6IEEge1xuICAgIE9iamVjdC5mcmVlemUobyk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykuZm9yRWFjaChcbiAgICAgICAgKHA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkocCkgJiZcbiAgICAgICAgICAgICAgICBvW3BdICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgKHR5cGVvZiBvW3BdID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvW3BdID09PSBcImZ1bmN0aW9uXCIpICYmXG4gICAgICAgICAgICAgICAgIU9iamVjdC5pc0Zyb3plbihvW3BdKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZGVlcEZyZWV6ZShvW3BdKTtcbiAgICAgICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbztcbn1cblxuLy8gUHViL3N1YlxuZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZSh0eXBlOiAqLCBsaXN0ZW5lcjogRnVuY3Rpb24pIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBsaXN0ZW5lciwgMCApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKHR5cGU6ICosIGxpc3RlbmVyOiBGdW5jdGlvbikge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGxpc3RlbmVyLCAwICk7XG59XG5leHBvcnQgZnVuY3Rpb24gcHVibGlzaCh0eXBlOiAqLCBkYXRhOiAqKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCggbmV3IEN1c3RvbUV2ZW50KHR5cGUsIHsgZGF0YSB9KSApO1xufVxuIiwiLypcbiAgQGZsb3dcbiAgVGhlc2UgdXRpbHMgYXJlIGltcG9ydGVkIGZvciBkZXYgb25seVxuKi9cbmxldCBncm91cElkOiBzdHJpbmcgPSAnJztcblxuY29uc3QgZGVidWdFbmFibGVkID0gL1smP11kZWJ1Zy8udGVzdCh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblxuZXhwb3J0IGNvbnN0IGxvZyA9ICh7XG4gICAgbm9Jbml0aWFsQWN0aW9uKGlkLCBzdGF0ZToge30pIHtcbiAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cChgJWMjJHtpZH1gLCBcImNvbG9yOiAjNjlmXCIpO1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7SlNPTi5zdHJpbmdpZnkoc3RhdGUpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXBJZCA9IGlkO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGVTdGFydChpZCwgc3RhdGU6IHt9LCB0YWcsIGRhdGEpIHtcbiAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKCFncm91cElkIHx8IGdyb3VwSWQgIT09IGlkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cChgJWMjJHtpZH1gLCBcImNvbG9yOiAjNjlmXCIpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMke0pTT04uc3RyaW5naWZ5KHN0YXRlKX1gLCBcInRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ3JvdXBJZCA9IGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1zZyA9IGAke1N0cmluZyh0YWcpfWA7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIG1zZyArPSBgICR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bXNnfWAsIFwiY29sb3I6ICNmNmJcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZUVuZChzdGF0ZSkge1xuICAgICAgICBpZiAoZGVidWdFbmFibGVkICYmIHN0YXRlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtKU09OLnN0cmluZ2lmeShzdGF0ZSl9YCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRhc2tQZXJmb3JtKGxhYmVsKSB7XG4gICAgICAgIGlmIChkZWJ1Z0VuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY1Rhc2sgXCIke2xhYmVsfVwiIHBlcmZvcm0uLi5gLCBcImNvbG9yOiAjZGQ4XCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0YXNrU3VjY2VzcyhpZCwgbGFiZWwpIHtcbiAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjXFxuLi4uIyR7aWR9IHRhc2sgXCIke2xhYmVsfVwiIHN1Y2Nlc3NgLCBcImNvbG9yOiAjZGQ4XCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0YXNrRmFpbHVyZShpZCwgbGFiZWwsIGUpIHtcbiAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjXFxuLi4uIyR7aWR9IHRhc2sgXCIke2xhYmVsfVwiIGZhaWx1cmVgLCBcImNvbG9yOiAjZGQ4XCIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcihpZCwgcHJvcHMsIHN0YXRlKSB7XG4gICAgICAgIGlmIChkZWJ1Z0VuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgIGxldCBtc2cgPSBg4p+zIFJlbmRlciAjJHtpZH1gO1xuICAgICAgICAgICAgaWYgKHByb3BzICYmIE9iamVjdC5rZXlzKHByb3BzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtc2cgKz0gYCwgcHJvcHM6ICR7SlNPTi5zdHJpbmdpZnkocHJvcHMpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZ31gLCBcImNvbG9yOiAjODg4XCIpO1xuICAgICAgICAgICAgZ3JvdXBJZCA9ICcnO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtYW51YWxBY3Rpb25FcnJvcihpZCwgYWN0aW9uTmFtZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvcjogIyR7aWR9IFwiJHthY3Rpb25OYW1lfVwiIGNhbm5vdCBiZSBpbnZva2VkIG1hbnVhbGx5YCk7XG4gICAgfVxufToge1xuICAgIG5vSW5pdGlhbEFjdGlvbjogKHN0cmluZywge30pID0+IHZvaWQsXG4gICAgdXBkYXRlU3RhcnQ6IChzdHJpbmcsIHt9LCAqLCA/e30pID0+IHZvaWQsXG4gICAgdXBkYXRlRW5kOiAoe30pID0+IHZvaWQsXG4gICAgdGFza1BlcmZvcm06IChzdHJpbmcpID0+IHZvaWQsXG4gICAgdGFza1N1Y2Nlc3M6IChzdHJpbmcsIHN0cmluZykgPT4gdm9pZCxcbiAgICB0YXNrRmFpbHVyZTogKHN0cmluZywgc3RyaW5nLCAqKSA9PiB2b2lkLFxuICAgIHJlbmRlcjogKHN0cmluZywge30sIHt9KSA9PiB2b2lkLFxuICAgIG1hbnVhbEFjdGlvbkVycm9yOiAoc3RyaW5nLCBzdHJpbmcpID0+IHZvaWRcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgZ3JvdXBJZCA9ICcnO1xuICAgIH0pO1xufSk7XG4iLCIvKlxuICBBIHdyYXBwZXIgYXJvdW5kIGBodHRwczovL2dpdGh1Yi5jb20vc25hYmJkb20vc25hYmJkb21gXG4gIHdpdGggaHRtbCBmdW5jdGlvbnMgZnJvbSBgaHR0cHM6Ly9naXRodWIuY29tL29oYW5oaS9oeXBlcnNjcmlwdC1oZWxwZXJzYFxuKi9cbmNvbnN0IHNuYWJiZG9tID0gcmVxdWlyZShcInNuYWJiZG9tXCIpO1xuY29uc3QgcGF0Y2ggPSBzbmFiYmRvbS5pbml0KFtcbiAgICByZXF1aXJlKFwic25hYmJkb20vbW9kdWxlcy9jbGFzc1wiKS5kZWZhdWx0LFxuICAgIHJlcXVpcmUoXCJzbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXNcIikuZGVmYXVsdCxcbiAgICByZXF1aXJlKFwic25hYmJkb20vbW9kdWxlcy9wcm9wc1wiKS5kZWZhdWx0LFxuICAgIHJlcXVpcmUoXCJzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzXCIpLmRlZmF1bHRcbl0pO1xuY29uc3QgaCA9IHJlcXVpcmUoXCJzbmFiYmRvbS9oXCIpLmRlZmF1bHQ7XG5jb25zdCBodG1sID0gcmVxdWlyZSgnaHlwZXJzY3JpcHQtaGVscGVycycpKGgpO1xuXG5mdW5jdGlvbiBzZXRIb29rKHZub2RlLCBob29rTmFtZSwgY2FsbGJhY2spIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc25hYmJkb20vc25hYmJkb20jaG9va3NcbiAgICAvLyBpbml0ICAgICAgICBhIHZub2RlIGhhcyBiZWVuIGFkZGVkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bm9kZVxuICAgIC8vIGNyZWF0ZSAgICAgIGEgRE9NIGVsZW1lbnQgaGFzIGJlZW4gY3JlYXRlZCBiYXNlZCBvbiBhIHZub2RlICAgICAgIGVtcHR5Vm5vZGUsIHZub2RlXG4gICAgLy8gaW5zZXJ0ICAgICAgYW4gZWxlbWVudCBoYXMgYmVlbiBpbnNlcnRlZCBpbnRvIHRoZSBET00gICAgICAgICAgICAgdm5vZGVcbiAgICAvLyBwcmVwYXRjaCAgICBhbiBlbGVtZW50IGlzIGFib3V0IHRvIGJlIHBhdGNoZWQgICAgICAgICAgICAgICAgICAgICBvbGRWbm9kZSwgdm5vZGVcbiAgICAvLyB1cGRhdGUgICAgICBhbiBlbGVtZW50IGlzIGJlaW5nIHVwZGF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWbm9kZSwgdm5vZGVcbiAgICAvLyBwb3N0cGF0Y2ggICBhbiBlbGVtZW50IGhhcyBiZWVuIHBhdGNoZWQgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWbm9kZSwgdm5vZGVcbiAgICAvLyBkZXN0cm95ICAgICBhbiBlbGVtZW50IGlzIGRpcmVjdGx5IG9yIGluZGlyZWN0bHkgYmVpbmcgcmVtb3ZlZCAgICB2bm9kZVxuICAgIC8vIHJlbW92ZSAgICAgIGFuIGVsZW1lbnQgaXMgZGlyZWN0bHkgYmVpbmcgcmVtb3ZlZCBmcm9tIHRoZSBET00gICAgIHZub2RlLCByZW1vdmVDYWxsYmFja1xuICAgIGlmICh2bm9kZSkge1xuICAgICAgICB2bm9kZS5kYXRhID0gdm5vZGUuZGF0YSB8fCB7fTtcbiAgICAgICAgdm5vZGUuZGF0YS5ob29rID0gdm5vZGUuZGF0YS5ob29rIHx8IHt9O1xuICAgICAgICB2bm9kZS5kYXRhLmhvb2tbaG9va05hbWVdID0gY2FsbGJhY2s7XG4gICAgfVxufVxuXG5leHBvcnQgeyBwYXRjaCwgc2V0SG9vaywgaHRtbCB9O1xuIiwiLy8gQGZsb3dcclxuaW1wb3J0IHR5cGUgeyBDb25maWcsIEFjdGlvbiwgVGFzaywgVXBkYXRlVGh1bmsgfSBmcm9tIFwiLi4vbGliL2pldGl4XCI7XHJcbmltcG9ydCB7IGNvbXBvbmVudCB9IGZyb20gXCIuLi9saWIvamV0aXhcIjtcclxuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCIuLi9saWIvdmRvbVwiO1xyXG5pbXBvcnQgdGhlbWVNZW51IGZyb20gXCIuLi9jb21wb25lbnRzL3RoZW1lTWVudVwiO1xyXG5jb25zdCB7IGRpdiwgaDEsIGJ1dHRvbiwgYSB9ID0gaHRtbDtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQoKCkgPT4gKHtcclxuXHJcbiAgICB2aWV3KCkge1xyXG4gICAgICAgIHJldHVybiBkaXYoW1xyXG4gICAgICAgICAgICBkaXYoXCIuaW50cm9cIiwgW1xyXG4gICAgICAgICAgICAgICAgdGhlbWVNZW51KFwiI3RoZW1lLW1lbnVcIiksXHJcbiAgICAgICAgICAgICAgICBhKHthdHRyczoge2hyZWY6IFwiL1wiICsgbG9jYXRpb24uc2VhcmNoLCBcImRhdGEtbmF2aWdvXCI6IHRydWV9fSwgXCJDb3VudGVyIGRlbW9cIiksXHJcbiAgICAgICAgICAgICAgICBoMShcIkFib3V0XCIpLFxyXG4gICAgICAgICAgICAgICAgZGl2KFwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQuXCIpXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxufSkpO1xyXG4iLCIvLyBAZmxvd1xyXG5pbXBvcnQgdHlwZSB7IENvbmZpZywgQWN0aW9uLCBUYXNrLCBVcGRhdGVUaHVuayB9IGZyb20gXCIuLi9saWIvamV0aXhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50IH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xyXG5pbXBvcnQgY291bnRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9jb3VudGVyXCI7XHJcbmltcG9ydCB0aGVtZU1lbnUgZnJvbSBcIi4uL2NvbXBvbmVudHMvdGhlbWVNZW51XCI7XHJcbmltcG9ydCB7IGh0bWwgfSBmcm9tIFwiLi4vbGliL3Zkb21cIjtcclxuY29uc3QgeyBkaXYsIGgxLCBidXR0b24sIGksIGEgfSA9IGh0bWw7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50KCgpID0+ICh7XHJcblxyXG4gICAgdmlldygpIHtcclxuICAgICAgICByZXR1cm4gZGl2KFtcclxuICAgICAgICAgICAgZGl2KFwiLmludHJvXCIsIFtcclxuICAgICAgICAgICAgICAgIHRoZW1lTWVudShcIiN0aGVtZS1tZW51XCIpLFxyXG4gICAgICAgICAgICAgICAgYSh7YXR0cnM6IHtocmVmOiBcIi9hYm91dFwiICsgbG9jYXRpb24uc2VhcmNoLCBcImRhdGEtbmF2aWdvXCI6IHRydWV9fSwgXCJBYm91dCBwYWdlXCIpLFxyXG4gICAgICAgICAgICAgICAgaDEoXCJDb3VudGVyIGRlbW9cIiksXHJcbiAgICAgICAgICAgICAgICBkaXYoXCJQbGVhc2Ugb3BlbiB0aGUgZGV2ZWxvcGVyIGNvbnNvbGUsIHdoZXJlIGFsbCBjb21wb25lbnQgYWN0aW9ucywgc3RhdGUgYW5kIHJlbmRlcnMgYXJlIGxvZ2dlZCAod2hlbiBgZGVidWdgIGlzIGluIHRoZSBxdWVyeSBzdHJpbmcpLlwiKSxcclxuICAgICAgICAgICAgICAgIGkoXCJOb3RlIHRoYXQgYHJlbmRlcigpYCBkb2Vzbid0IHVwZGF0ZSB0aGUgRE9NIHVubGVzcyB0aGUgVkRPTSBoYXMgY2hhbmdlZC5cIilcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIGNvdW50ZXIoXCIjY291bnRlci0wXCIsIHsgc3RhcnQ6IDAgfSksXHJcbiAgICAgICAgICAgIGNvdW50ZXIoXCIjY291bnRlci0xXCIsIHsgc3RhcnQ6IC0xIH0pXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59KSk7XHJcbiIsIi8qXG4gIGBodHRwczovL2dpdGh1Yi5jb20va3Jhc2ltaXIvbmF2aWdvYFxuKi9cbmltcG9ydCBOYXZpZ28gZnJvbSBcIm5hdmlnb1wiO1xuaW1wb3J0IHsgbW91bnQsIHN1YnNjcmliZSB9IGZyb20gXCIuL2xpYi9qZXRpeFwiO1xuaW1wb3J0IGFwcCBmcm9tIFwiLi9hcHBcIjtcblxuY29uc3Qgcm91dGVyID0gbmV3IE5hdmlnbygpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiRE9NQ29udGVudExvYWRlZFwiLFxuICAgICgpID0+IHtcbiAgICAgICAgbW91bnQoYXBwLCBydW5Sb290QWN0aW9uID0+IHtcbiAgICAgICAgICAgIC8vIFRoZSBgbW91bnRgIGNhbGxiYWNrIHByb3ZpZGVzIGBydW5Sb290QWN0aW9uYCBmb3IgYmluZGluZyBldmVudHMgdG8gcm9vdCBhY3Rpb25zXG4gICAgICAgICAgICAvLyAobWFudWFsbHkgaW52b2tpbmcgYW4gYWN0aW9uIGlzIGRpc2FsbG93ZWQgZXZlcnl3aGVyZSBlbHNlKVxuICAgICAgICAgICAgY29uc3QgcGFnZVNldHRlciA9IChwYWdlOiBzdHJpbmcpOiAoKSA9PiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBydW5Sb290QWN0aW9uKFwiU2V0UGFnZVwiLCB7IHBhZ2UgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJvdXRlclxuICAgICAgICAgICAgICAgIC5vbih7XG4gICAgICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogcGFnZVNldHRlcihcImFib3V0UGFnZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCIqXCI6IHBhZ2VTZXR0ZXIoXCJjb3VudGVyRGVtb1wiKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgc3Vic2NyaWJlKFwicGF0Y2hcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJvdXRlci51cGRhdGVQYWdlTGlua3MoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4pO1xuIiwiLyogQGZsb3cgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQ291bnQobjogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBNb2NrIGFzeW5jXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoaXNOZWdhdGl2ZShuKSA/IFwieCBJbnZhbGlkXCIgOiBcIuKckyBWYWlsZFwiKSwgNTAwKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTmVnYXRpdmUobjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG4gPCAwO1xufVxuIl19
