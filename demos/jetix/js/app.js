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
    if (is.array(children)) {
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

},{"./is":4,"./vnode":10}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
                invokeHandler(handler[i]);
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./h":2,"./htmldomapi":3,"./is":4,"./thunk":9,"./vnode":10}],9:[function(require,module,exports){
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

},{"./h":2}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("./lib/jetix");

var _counter = require("./components/counter");

var _counter2 = _interopRequireDefault(_counter);

var _vdom = require("./lib/vdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  
  Root component
*/
var div = _vdom.html.div,
    button = _vdom.html.button,
    i = _vdom.html.i;
exports.default = (0, _jetix.component)(function (action, props) {
    return {

        initialModel: {
            theme: "default"
        },

        initialAction: undefined,

        update: {
            SetTheme: function SetTheme(model, _ref) {
                var theme = _ref.theme;

                model.theme = theme;
            }
        },

        view: function view(id, props, model) {
            return div(".page." + model.theme, [div(".intro", [div("Please open the developer console, where all component actions, state and renders are logged."), i("Note that `render()` doesn't update the DOM unless the VDOM has changed.")]), (0, _counter2.default)("#counter-0", { start: 0 }), (0, _counter2.default)("#counter-1", { start: -1 }), button({ on: { click: action("SetTheme", { theme: "default" }) } }, "Light theme"), button({ on: { click: action("SetTheme", { theme: "dark" }) } }, "Dark theme")]);
        }
    };
});

},{"./components/counter":12,"./lib/jetix":15,"./lib/vdom":16}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNegative = isNegative;

var _jetix = require("../lib/jetix");

var _notification = require("./notification");

var _notification2 = _interopRequireDefault(_notification);

var _vdom = require("../lib/vdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  
  Counter component
*/
var div = _vdom.html.div,
    button = _vdom.html.button;
exports.default = (0, _jetix.component)(function (action, props) {
    return {

        initialModel: {
            counter: props.start,
            feedback: ""
        },

        initialAction: action("Validate"),

        // Handlers update `model`, then return the next action
        // (or a `Promise` that resolves with an action, see `validateCount` below.)
        update: {
            Increment: function Increment(model, _ref) {
                var step = _ref.step;

                model.counter += step;
                return action("Validate");
            },
            Decrement: function Decrement(model, _ref2) {
                var step = _ref2.step;

                model.counter -= step;
                return action("Validate");
            },
            ShowValidating: function ShowValidating(model) {
                model.feedback = "Validating...";
            },
            Validate: function Validate(model) {
                return [action("ShowValidating"),
                // Async example
                validateCount(model.counter).then(function (text) {
                    return action("ShowFeedback", { text: text });
                })];
            },
            ShowFeedback: function ShowFeedback(model, _ref3) {
                var text = _ref3.text;

                model.feedback = text;
            }
        },

        view: function view(id, props, model) {
            return div(".counter", [button({ on: { click: action("Increment", { step: 1 }) } }, "+"), div(String(model.counter)), button({ on: { click: action("Decrement", { step: 1 }) } }, "-"),

            // Child component - `notification` module
            (0, _notification2.default)("#" + id + "-feedback", {
                text: model.feedback,
                dismissAction: action("ShowValidating")
            })]);
        }
    };
});

// Export for tests

function isNegative(n) {
    return n < 0;
}

function validateCount(n) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            return resolve(isNegative(n) ? "x Invalid" : "✓ Vaild");
        }, 500);
    });
}

},{"../lib/jetix":15,"../lib/vdom":16,"./notification":13}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("../lib/jetix");

var _vdom = require("../lib/vdom");

var div = _vdom.html.div,
    button = _vdom.html.button; /*
                                  
                                  Notification component
                                */

exports.default = (0, _jetix.component)(function (action, props) {
    return {

        initialModel: {
            show: true,
            isWarning: false
        },

        initialAction: undefined,

        update: {
            Dismiss: function Dismiss(model) {
                model.show = false;
                return props.dismissAction;
            }
        },

        view: function view(id, props, model) {
            return div(".notification", {
                class: {
                    show: model.show && props.text.length,
                    warn: model.isWarning
                }
            }, [props.text, button({ on: { click: action("Dismiss") } }, "Dismiss")]);
        }
    };
});

},{"../lib/jetix":15,"../lib/vdom":16}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.clone = clone;
exports.deepFreeze = deepFreeze;
/*
  
  These utils are imported for dev only
*/
var groupId = '';

function clone(o) {
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

var log = exports.log = {
    noInitialAction: function noInitialAction(id, model) {
        console.group("%c#" + id, "color: #69f");
        console.log("Model  : " + JSON.stringify(model));
        groupId = id;
    },
    updateStart: function updateStart(id, model, tag, data) {
        if (!groupId || groupId !== id) {
            console.group("%c#" + id, "color: #69f");
            console.log("Model  : " + JSON.stringify(model));
            groupId = id;
        }
        console.log("%cAction : " + String(tag), "color: #f6b");
        if (Object.keys(data).length) {
            console.log("%cData   : " + JSON.stringify(data), "color: #f6b");
        }
    },
    updateEnd: function updateEnd(model) {
        console.log("Model  : " + JSON.stringify(model));
    },
    render: function render(id, props, model) {
        console.groupEnd();
        console.log("%c\u27F3 Render #" + id + ", props: " + JSON.stringify(props), "color: #888");
        groupId = '';
    }
};

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.component = component;
exports.init = init;

var _vdom = require("./vdom");

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

var _devUtil = require("./devUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @Dev-only


var rootId = "app"; /*
                      
                      `Model, Update, View` wiring
                      NOTE: Lines marked `@Dev-only` are removed by `prod` build
                    */

var renderRefs = {};

function component(
// Pass in callback that returns component config
getConfig) {
    // Returns function that is called by parent component e.g. `counter("counter-0", { start: 0 })`
    return function (idStr, props) {
        var id = idStr.replace(/^#/, "");
        if (!id.length) {
            throw Error("Component requires an id");
        }
        return init(id, props, getConfig);
    };
}

function init(id, props, getConfig) {
    (0, _devUtil.deepFreeze)(props); // @Dev-only

    // If component already exists, just run render() again
    var componentRoot = renderById(id, props);
    if (componentRoot) {
        return componentRoot;
    }

    var config = getConfig(action, props);
    var model = config.initialModel;
    var noRender = 0;

    function action(tag) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return function () {
            return update(tag, data);
        };
    }

    function update(tag, data) {
        _devUtil.log.updateStart(id, model, tag, data); // @Dev-only
        model = (0, _devUtil.clone)(model); // @Dev-only
        var next = config.update[tag].apply(null, [model, data]);
        (0, _devUtil.deepFreeze)(model); // @Dev-only
        _devUtil.log.updateEnd(model); // @Dev-only
        run(next);
    }

    function run(next) {
        if (!next) {
            render(props);
        } else if (typeof next === "function") {
            next();
        } else if (Array.isArray(next)) {
            noRender++;
            next.forEach(run);
            noRender--;
            render(props);
        } else if (typeof next.then === "function") {
            next.then(run);
            render(props); // End of sync chain
        }
    }

    function render(props) {
        if (!noRender) {
            (0, _vdom.patch)(componentRoot, componentRoot = config.view(id, props, model));
            setRenderRef(componentRoot, id, render);
            _devUtil.log.render(id, props, model); // @Dev-only
        }
        return componentRoot;
    }

    if (config.initialAction) {
        noRender++;
        run(config.initialAction);
        noRender--;
    } else {
        // @Dev-only
        _devUtil.log.noInitialAction(id, model); // @Dev-only
    } // @Dev-only

    componentRoot = config.view(id, props, model);
    setRenderRef(componentRoot, id, render);
    _devUtil.log.render(id, props, model); // @Dev-only
    return componentRoot;
}

document.addEventListener("DOMContentLoaded", function () {
    (0, _vdom.patch)(document.getElementById(rootId), (0, _app2.default)(rootId, {/* Props */}));
});

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

},{"../app":11,"./devUtil":14,"./vdom":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
  A wrapper around `https://github.com/snabbdom/snabbdom`
  with html functions from `https://github.com/ohanhi/hyperscript-helpers`
*/
var snabbdom = require("snabbdom");
var patch = snabbdom.init([require("snabbdom/modules/class").default, require("snabbdom/modules/props").default, require("snabbdom/modules/eventlisteners").default]);
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

},{"hyperscript-helpers":1,"snabbdom":8,"snabbdom/h":2,"snabbdom/modules/class":5,"snabbdom/modules/eventlisteners":6,"snabbdom/modules/props":7}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaHlwZXJzY3JpcHQtaGVscGVycy9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL2guanMiLCJub2RlX21vZHVsZXMvc25hYmJkb20vaHRtbGRvbWFwaS5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS9pcy5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL2NsYXNzLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvZXZlbnRsaXN0ZW5lcnMuanMiLCJub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9wcm9wcy5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS9zbmFiYmRvbS5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS90aHVuay5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS92bm9kZS5qcyIsInNyYy9qcy9hcHAuanMiLCJzcmMvanMvY29tcG9uZW50cy9jb3VudGVyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uLmpzIiwic3JjL2pzL2xpYi9kZXZVdGlsLmpzIiwic3JjL2pzL2xpYi9qZXRpeC5qcyIsInNyYy9qcy9saWIvdmRvbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LE1BQWhELEVBQXdFO0FBQ3BFO0FBQ0EsZUFBVyxZQUFNO0FBQ2IsbUJBQVcsRUFBWCxJQUFpQixNQUFqQjtBQUNBLDJCQUFRLEtBQVIsRUFBZSxTQUFmLEVBQTBCLFlBQU07QUFDNUIsbUJBQU8sV0FBVyxFQUFYLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1IOzs7Ozs7OztBQ2xKRDs7OztBQUlBLElBQU0sV0FBVyxRQUFRLFVBQVIsQ0FBakI7QUFDQSxJQUFNLFFBQVEsU0FBUyxJQUFULENBQWMsQ0FDeEIsUUFBUSx3QkFBUixFQUFrQyxPQURWLEVBRXhCLFFBQVEsd0JBQVIsRUFBa0MsT0FGVixFQUd4QixRQUFRLGlDQUFSLEVBQTJDLE9BSG5CLENBQWQsQ0FBZDtBQUtBLElBQU0sSUFBSSxRQUFRLFlBQVIsRUFBc0IsT0FBaEM7QUFDQSxJQUFNLE9BQU8sUUFBUSxxQkFBUixFQUErQixDQUEvQixDQUFiOztBQUVBLFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QixRQUF4QixFQUFrQyxRQUFsQyxFQUE0QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFJLEtBQUosRUFBVztBQUNQLGNBQU0sSUFBTixHQUFhLE1BQU0sSUFBTixJQUFjLEVBQTNCO0FBQ0EsY0FBTSxJQUFOLENBQVcsSUFBWCxHQUFrQixNQUFNLElBQU4sQ0FBVyxJQUFYLElBQW1CLEVBQXJDO0FBQ0EsY0FBTSxJQUFOLENBQVcsSUFBWCxDQUFnQixRQUFoQixJQUE0QixRQUE1QjtBQUNIO0FBQ0o7O1FBRVEsSyxHQUFBLEs7UUFBTyxPLEdBQUEsTztRQUFTLEksR0FBQSxJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBpc1ZhbGlkU3RyaW5nID0gZnVuY3Rpb24gaXNWYWxpZFN0cmluZyhwYXJhbSkge1xuICByZXR1cm4gdHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJyAmJiBwYXJhbS5sZW5ndGggPiAwO1xufTtcblxudmFyIHN0YXJ0c1dpdGggPSBmdW5jdGlvbiBzdGFydHNXaXRoKHN0cmluZywgc3RhcnQpIHtcbiAgcmV0dXJuIHN0cmluZ1swXSA9PT0gc3RhcnQ7XG59O1xuXG52YXIgaXNTZWxlY3RvciA9IGZ1bmN0aW9uIGlzU2VsZWN0b3IocGFyYW0pIHtcbiAgcmV0dXJuIGlzVmFsaWRTdHJpbmcocGFyYW0pICYmIChzdGFydHNXaXRoKHBhcmFtLCAnLicpIHx8IHN0YXJ0c1dpdGgocGFyYW0sICcjJykpO1xufTtcblxudmFyIG5vZGUgPSBmdW5jdGlvbiBub2RlKGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmaXJzdCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHJlc3QgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHJlc3RbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTZWxlY3RvcihmaXJzdCkpIHtcbiAgICAgICAgcmV0dXJuIGguYXBwbHkodW5kZWZpbmVkLCBbdGFnTmFtZSArIGZpcnN0XS5jb25jYXQocmVzdCkpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBoKHRhZ05hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGguYXBwbHkodW5kZWZpbmVkLCBbdGFnTmFtZSwgZmlyc3RdLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn07XG5cbnZhciBUQUdfTkFNRVMgPSBbJ2EnLCAnYWJicicsICdhY3JvbnltJywgJ2FkZHJlc3MnLCAnYXBwbGV0JywgJ2FyZWEnLCAnYXJ0aWNsZScsICdhc2lkZScsICdhdWRpbycsICdiJywgJ2Jhc2UnLCAnYmFzZWZvbnQnLCAnYmRpJywgJ2JkbycsICdiZ3NvdW5kJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbW1hbmQnLCAnY29udGVudCcsICdkYXRhJywgJ2RhdGFsaXN0JywgJ2RkJywgJ2RlbCcsICdkZXRhaWxzJywgJ2RmbicsICdkaWFsb2cnLCAnZGlyJywgJ2RpdicsICdkbCcsICdkdCcsICdlbGVtZW50JywgJ2VtJywgJ2VtYmVkJywgJ2ZpZWxkc2V0JywgJ2ZpZ2NhcHRpb24nLCAnZmlndXJlJywgJ2ZvbnQnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnZnJhbWUnLCAnZnJhbWVzZXQnLCAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLCAnaScsICdpZnJhbWUnLCAnaW1hZ2UnLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdpc2luZGV4JywgJ2tiZCcsICdrZXlnZW4nLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ2xpbmsnLCAnbGlzdGluZycsICdtYWluJywgJ21hcCcsICdtYXJrJywgJ21hcnF1ZWUnLCAnbWF0aCcsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGEnLCAnbWV0ZXInLCAnbXVsdGljb2wnLCAnbmF2JywgJ25leHRpZCcsICdub2JyJywgJ25vZW1iZWQnLCAnbm9mcmFtZXMnLCAnbm9zY3JpcHQnLCAnb2JqZWN0JywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwYXJhbScsICdwaWN0dXJlJywgJ3BsYWludGV4dCcsICdwcmUnLCAncHJvZ3Jlc3MnLCAncScsICdyYicsICdyYmMnLCAncnAnLCAncnQnLCAncnRjJywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NjcmlwdCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzaGFkb3cnLCAnc2xvdCcsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhY2VyJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLCAnc3ZnJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RlbXBsYXRlJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndGl0bGUnLCAndHInLCAndHJhY2snLCAndHQnLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJywgJ3htcCddO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaCkge1xuICB2YXIgY3JlYXRlVGFnID0gbm9kZShoKTtcbiAgdmFyIGV4cG9ydGVkID0geyBUQUdfTkFNRVM6IFRBR19OQU1FUywgaXNTZWxlY3RvcjogaXNTZWxlY3RvciwgY3JlYXRlVGFnOiBjcmVhdGVUYWcgfTtcbiAgVEFHX05BTUVTLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICBleHBvcnRlZFtuXSA9IGNyZWF0ZVRhZyhuKTtcbiAgfSk7XG4gIHJldHVybiBleHBvcnRlZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwiLi92bm9kZVwiKTtcbnZhciBpcyA9IHJlcXVpcmUoXCIuL2lzXCIpO1xuZnVuY3Rpb24gYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCkge1xuICAgIGRhdGEubnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGlmIChzZWwgIT09ICdmb3JlaWduT2JqZWN0JyAmJiBjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZERhdGEgPSBjaGlsZHJlbltpXS5kYXRhO1xuICAgICAgICAgICAgaWYgKGNoaWxkRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWRkTlMoY2hpbGREYXRhLCBjaGlsZHJlbltpXS5jaGlsZHJlbiwgY2hpbGRyZW5baV0uc2VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpcy5hcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaXMucHJpbWl0aXZlKGNoaWxkcmVuW2ldKSlcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXSA9IHZub2RlXzEudm5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGRyZW5baV0sIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbFswXSA9PT0gJ3MnICYmIHNlbFsxXSA9PT0gJ3YnICYmIHNlbFsyXSA9PT0gJ2cnICYmXG4gICAgICAgIChzZWwubGVuZ3RoID09PSAzIHx8IHNlbFszXSA9PT0gJy4nIHx8IHNlbFszXSA9PT0gJyMnKSkge1xuICAgICAgICBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZub2RlXzEudm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgdW5kZWZpbmVkKTtcbn1cbmV4cG9ydHMuaCA9IGg7XG47XG5leHBvcnRzLmRlZmF1bHQgPSBoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG59XG5mdW5jdGlvbiByZW1vdmVDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG59XG5mdW5jdGlvbiBuZXh0U2libGluZyhub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG59XG5mdW5jdGlvbiB0YWdOYW1lKGVsbSkge1xuICAgIHJldHVybiBlbG0udGFnTmFtZTtcbn1cbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KG5vZGUsIHRleHQpIHtcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cbmZ1bmN0aW9uIGdldFRleHRDb250ZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudDtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XG59XG5mdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xufVxuZnVuY3Rpb24gaXNDb21tZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gODtcbn1cbmV4cG9ydHMuaHRtbERvbUFwaSA9IHtcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnROUzogY3JlYXRlRWxlbWVudE5TLFxuICAgIGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcbiAgICBjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuICAgIGluc2VydEJlZm9yZTogaW5zZXJ0QmVmb3JlLFxuICAgIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gICAgcGFyZW50Tm9kZTogcGFyZW50Tm9kZSxcbiAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBzZXRUZXh0Q29udGVudDogc2V0VGV4dENvbnRlbnQsXG4gICAgZ2V0VGV4dENvbnRlbnQ6IGdldFRleHRDb250ZW50LFxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgIGlzVGV4dDogaXNUZXh0LFxuICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuaHRtbERvbUFwaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxkb21hcGkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFycmF5ID0gQXJyYXkuaXNBcnJheTtcbmZ1bmN0aW9uIHByaW1pdGl2ZShzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLnByaW1pdGl2ZSA9IHByaW1pdGl2ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdXBkYXRlQ2xhc3Mob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGN1ciwgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBvbGRDbGFzcyA9IG9sZFZub2RlLmRhdGEuY2xhc3MsIGtsYXNzID0gdm5vZGUuZGF0YS5jbGFzcztcbiAgICBpZiAoIW9sZENsYXNzICYmICFrbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRDbGFzcyA9PT0ga2xhc3MpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRDbGFzcyA9IG9sZENsYXNzIHx8IHt9O1xuICAgIGtsYXNzID0ga2xhc3MgfHwge307XG4gICAgZm9yIChuYW1lIGluIG9sZENsYXNzKSB7XG4gICAgICAgIGlmICgha2xhc3NbbmFtZV0pIHtcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobmFtZSBpbiBrbGFzcykge1xuICAgICAgICBjdXIgPSBrbGFzc1tuYW1lXTtcbiAgICAgICAgaWYgKGN1ciAhPT0gb2xkQ2xhc3NbbmFtZV0pIHtcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3RbY3VyID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmNsYXNzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZUNsYXNzLCB1cGRhdGU6IHVwZGF0ZUNsYXNzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmNsYXNzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xhc3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpbnZva2VIYW5kbGVyKGhhbmRsZXIsIHZub2RlLCBldmVudCkge1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIC8vIGNhbGwgZnVuY3Rpb24gaGFuZGxlclxuICAgICAgICBoYW5kbGVyLmNhbGwodm5vZGUsIGV2ZW50LCB2bm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIC8vIGNhbGwgaGFuZGxlciB3aXRoIGFyZ3VtZW50c1xuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXJbMF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciBzaW5nbGUgYXJndW1lbnQgZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICBpZiAoaGFuZGxlci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyWzBdLmNhbGwodm5vZGUsIGhhbmRsZXJbMV0sIGV2ZW50LCB2bm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGhhbmRsZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2godm5vZGUpO1xuICAgICAgICAgICAgICAgIGhhbmRsZXJbMF0uYXBwbHkodm5vZGUsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY2FsbCBtdWx0aXBsZSBoYW5kbGVyc1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW52b2tlSGFuZGxlcihoYW5kbGVyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50LCB2bm9kZSkge1xuICAgIHZhciBuYW1lID0gZXZlbnQudHlwZSwgb24gPSB2bm9kZS5kYXRhLm9uO1xuICAgIC8vIGNhbGwgZXZlbnQgaGFuZGxlcihzKSBpZiBleGlzdHNcbiAgICBpZiAob24gJiYgb25bbmFtZV0pIHtcbiAgICAgICAgaW52b2tlSGFuZGxlcihvbltuYW1lXSwgdm5vZGUsIGV2ZW50KTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVMaXN0ZW5lcigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICBoYW5kbGVFdmVudChldmVudCwgaGFuZGxlci52bm9kZSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUV2ZW50TGlzdGVuZXJzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBvbGRPbiA9IG9sZFZub2RlLmRhdGEub24sIG9sZExpc3RlbmVyID0gb2xkVm5vZGUubGlzdGVuZXIsIG9sZEVsbSA9IG9sZFZub2RlLmVsbSwgb24gPSB2bm9kZSAmJiB2bm9kZS5kYXRhLm9uLCBlbG0gPSAodm5vZGUgJiYgdm5vZGUuZWxtKSwgbmFtZTtcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIHJldXNlZCBpbW11dGFibGUgaGFuZGxlcnNcbiAgICBpZiAob2xkT24gPT09IG9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGxpc3RlbmVycyB3aGljaCBubyBsb25nZXIgdXNlZFxuICAgIGlmIChvbGRPbiAmJiBvbGRMaXN0ZW5lcikge1xuICAgICAgICAvLyBpZiBlbGVtZW50IGNoYW5nZWQgb3IgZGVsZXRlZCB3ZSByZW1vdmUgYWxsIGV4aXN0aW5nIGxpc3RlbmVycyB1bmNvbmRpdGlvbmFsbHlcbiAgICAgICAgaWYgKCFvbikge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGlmIGVsZW1lbnQgd2FzIGNoYW5nZWQgb3IgZXhpc3RpbmcgbGlzdGVuZXJzIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBvbGRFbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBvbGRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGlmIGV4aXN0aW5nIGxpc3RlbmVyIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBpZiAoIW9uW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEVsbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIG9sZExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGFkZCBuZXcgbGlzdGVuZXJzIHdoaWNoIGhhcyBub3QgYWxyZWFkeSBhdHRhY2hlZFxuICAgIGlmIChvbikge1xuICAgICAgICAvLyByZXVzZSBleGlzdGluZyBsaXN0ZW5lciBvciBjcmVhdGUgbmV3XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHZub2RlLmxpc3RlbmVyID0gb2xkVm5vZGUubGlzdGVuZXIgfHwgY3JlYXRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gdXBkYXRlIHZub2RlIGZvciBsaXN0ZW5lclxuICAgICAgICBsaXN0ZW5lci52bm9kZSA9IHZub2RlO1xuICAgICAgICAvLyBpZiBlbGVtZW50IGNoYW5nZWQgb3IgYWRkZWQgd2UgYWRkIGFsbCBuZWVkZWQgbGlzdGVuZXJzIHVuY29uZGl0aW9uYWxseVxuICAgICAgICBpZiAoIW9sZE9uKSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgaWYgZWxlbWVudCB3YXMgY2hhbmdlZCBvciBuZXcgbGlzdGVuZXJzIGFkZGVkXG4gICAgICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbikge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBsaXN0ZW5lciBpZiBuZXcgbGlzdGVuZXIgYWRkZWRcbiAgICAgICAgICAgICAgICBpZiAoIW9sZE9uW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5ldmVudExpc3RlbmVyc01vZHVsZSA9IHtcbiAgICBjcmVhdGU6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzLFxuICAgIHVwZGF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZGVzdHJveTogdXBkYXRlRXZlbnRMaXN0ZW5lcnNcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmV2ZW50TGlzdGVuZXJzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRsaXN0ZW5lcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVQcm9wcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBjdXIsIG9sZCwgZWxtID0gdm5vZGUuZWxtLCBvbGRQcm9wcyA9IG9sZFZub2RlLmRhdGEucHJvcHMsIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcztcbiAgICBpZiAoIW9sZFByb3BzICYmICFwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRQcm9wcyA9PT0gcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRQcm9wcyA9IG9sZFByb3BzIHx8IHt9O1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgZm9yIChrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgaWYgKCFwcm9wc1trZXldKSB7XG4gICAgICAgICAgICBkZWxldGUgZWxtW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgY3VyID0gcHJvcHNba2V5XTtcbiAgICAgICAgb2xkID0gb2xkUHJvcHNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyICYmIChrZXkgIT09ICd2YWx1ZScgfHwgZWxtW2tleV0gIT09IGN1cikpIHtcbiAgICAgICAgICAgIGVsbVtrZXldID0gY3VyO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5wcm9wc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVQcm9wcywgdXBkYXRlOiB1cGRhdGVQcm9wcyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5wcm9wc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwiLi92bm9kZVwiKTtcbnZhciBpcyA9IHJlcXVpcmUoXCIuL2lzXCIpO1xudmFyIGh0bWxkb21hcGlfMSA9IHJlcXVpcmUoXCIuL2h0bWxkb21hcGlcIik7XG5mdW5jdGlvbiBpc1VuZGVmKHMpIHsgcmV0dXJuIHMgPT09IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gaXNEZWYocykgeyByZXR1cm4gcyAhPT0gdW5kZWZpbmVkOyB9XG52YXIgZW1wdHlOb2RlID0gdm5vZGVfMS5kZWZhdWx0KCcnLCB7fSwgW10sIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbmZ1bmN0aW9uIHNhbWVWbm9kZSh2bm9kZTEsIHZub2RlMikge1xuICAgIHJldHVybiB2bm9kZTEua2V5ID09PSB2bm9kZTIua2V5ICYmIHZub2RlMS5zZWwgPT09IHZub2RlMi5zZWw7XG59XG5mdW5jdGlvbiBpc1Zub2RlKHZub2RlKSB7XG4gICAgcmV0dXJuIHZub2RlLnNlbCAhPT0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gY3JlYXRlS2V5VG9PbGRJZHgoY2hpbGRyZW4sIGJlZ2luSWR4LCBlbmRJZHgpIHtcbiAgICB2YXIgaSwgbWFwID0ge30sIGtleSwgY2g7XG4gICAgZm9yIChpID0gYmVnaW5JZHg7IGkgPD0gZW5kSWR4OyArK2kpIHtcbiAgICAgICAgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGtleSA9IGNoLmtleTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBtYXBba2V5XSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbn1cbnZhciBob29rcyA9IFsnY3JlYXRlJywgJ3VwZGF0ZScsICdyZW1vdmUnLCAnZGVzdHJveScsICdwcmUnLCAncG9zdCddO1xudmFyIGhfMSA9IHJlcXVpcmUoXCIuL2hcIik7XG5leHBvcnRzLmggPSBoXzEuaDtcbnZhciB0aHVua18xID0gcmVxdWlyZShcIi4vdGh1bmtcIik7XG5leHBvcnRzLnRodW5rID0gdGh1bmtfMS50aHVuaztcbmZ1bmN0aW9uIGluaXQobW9kdWxlcywgZG9tQXBpKSB7XG4gICAgdmFyIGksIGosIGNicyA9IHt9O1xuICAgIHZhciBhcGkgPSBkb21BcGkgIT09IHVuZGVmaW5lZCA/IGRvbUFwaSA6IGh0bWxkb21hcGlfMS5kZWZhdWx0O1xuICAgIGZvciAoaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaG9vayA9IG1vZHVsZXNbal1baG9va3NbaV1dO1xuICAgICAgICAgICAgaWYgKGhvb2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNic1tob29rc1tpXV0ucHVzaChob29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbXB0eU5vZGVBdChlbG0pIHtcbiAgICAgICAgdmFyIGlkID0gZWxtLmlkID8gJyMnICsgZWxtLmlkIDogJyc7XG4gICAgICAgIHZhciBjID0gZWxtLmNsYXNzTmFtZSA/ICcuJyArIGVsbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdChhcGkudGFnTmFtZShlbG0pLnRvTG93ZXJDYXNlKCkgKyBpZCArIGMsIHt9LCBbXSwgdW5kZWZpbmVkLCBlbG0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVSbUNiKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJtQ2IoKSB7XG4gICAgICAgICAgICBpZiAoLS1saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBhcGkucGFyZW50Tm9kZShjaGlsZEVsbSk7XG4gICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudF8xLCBjaGlsZEVsbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmluaXQpKSB7XG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW4sIHNlbCA9IHZub2RlLnNlbDtcbiAgICAgICAgaWYgKHNlbCA9PT0gJyEnKSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIHZub2RlLnRleHQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVDb21tZW50KHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBQYXJzZSBzZWxlY3RvclxuICAgICAgICAgICAgdmFyIGhhc2hJZHggPSBzZWwuaW5kZXhPZignIycpO1xuICAgICAgICAgICAgdmFyIGRvdElkeCA9IHNlbC5pbmRleE9mKCcuJywgaGFzaElkeCk7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IGhhc2hJZHggPiAwID8gaGFzaElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgZG90ID0gZG90SWR4ID4gMCA/IGRvdElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdGFnID0gaGFzaElkeCAhPT0gLTEgfHwgZG90SWR4ICE9PSAtMSA/IHNlbC5zbGljZSgwLCBNYXRoLm1pbihoYXNoLCBkb3QpKSA6IHNlbDtcbiAgICAgICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBpc0RlZihkYXRhKSAmJiBpc0RlZihpID0gZGF0YS5ucykgPyBhcGkuY3JlYXRlRWxlbWVudE5TKGksIHRhZylcbiAgICAgICAgICAgICAgICA6IGFwaS5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgICAgICBpZiAoaGFzaCA8IGRvdClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdpZCcsIHNlbC5zbGljZShoYXNoICsgMSwgZG90KSk7XG4gICAgICAgICAgICBpZiAoZG90SWR4ID4gMClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdjbGFzcycsIHNlbC5zbGljZShkb3QgKyAxKS5yZXBsYWNlKC9cXC4vZywgJyAnKSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmNyZWF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuY3JlYXRlW2ldKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgICAgICAgICAgIGlmIChpLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkuaW5zZXJ0KVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlLmVsbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpLCBiZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludm9rZURlc3Ryb3lIb29rKHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBqLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5kZXN0cm95W2ldKHZub2RlKTtcbiAgICAgICAgICAgIGlmICh2bm9kZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB2bm9kZS5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gbnVsbCAmJiB0eXBlb2YgaSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBpXzEgPSB2b2lkIDAsIGxpc3RlbmVycyA9IHZvaWQgMCwgcm0gPSB2b2lkIDAsIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKGNoLnNlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBjYnMucmVtb3ZlLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJtID0gY3JlYXRlUm1DYihjaC5lbG0sIGxpc3RlbmVycyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaV8xID0gMDsgaV8xIDwgY2JzLnJlbW92ZS5sZW5ndGg7ICsraV8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2JzLnJlbW92ZVtpXzFdKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZihpXzEgPSBjaC5kYXRhKSAmJiBpc0RlZihpXzEgPSBpXzEuaG9vaykgJiYgaXNEZWYoaV8xID0gaV8xLnJlbW92ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfMShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudEVsbSwgY2guZWxtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ocGFyZW50RWxtLCBvbGRDaCwgbmV3Q2gsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgb2xkU3RhcnRJZHggPSAwLCBuZXdTdGFydElkeCA9IDA7XG4gICAgICAgIHZhciBvbGRFbmRJZHggPSBvbGRDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgICAgICB2YXIgb2xkRW5kVm5vZGUgPSBvbGRDaFtvbGRFbmRJZHhdO1xuICAgICAgICB2YXIgbmV3RW5kSWR4ID0gbmV3Q2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICAgICAgdmFyIG5ld0VuZFZub2RlID0gbmV3Q2hbbmV3RW5kSWR4XTtcbiAgICAgICAgdmFyIG9sZEtleVRvSWR4O1xuICAgICAgICB2YXIgaWR4SW5PbGQ7XG4gICAgICAgIHZhciBlbG1Ub01vdmU7XG4gICAgICAgIHZhciBiZWZvcmU7XG4gICAgICAgIHdoaWxlIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggJiYgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdOyAvLyBWbm9kZSBtaWdodCBoYXZlIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2xkRW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3U3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3RW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcob2xkRW5kVm5vZGUuZWxtKSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGRLZXlUb0lkeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHhJbk9sZCA9IG9sZEtleVRvSWR4W25ld1N0YXJ0Vm5vZGUua2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZihpZHhJbk9sZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbVRvTW92ZS5zZWwgIT09IG5ld1N0YXJ0Vm5vZGUuc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUoZWxtVG9Nb3ZlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGVsbVRvTW92ZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggfHwgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRJZHggPiBvbGRFbmRJZHgpIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXdDaFtuZXdFbmRJZHggKyAxXSA9PSBudWxsID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGhvb2s7XG4gICAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YSkgJiYgaXNEZWYoaG9vayA9IGkuaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucHJlcGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHZhciBjaCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAob2xkVm5vZGUgPT09IHZub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodm5vZGUuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rO1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkpICYmIGlzRGVmKGkgPSBpLnVwZGF0ZSkpXG4gICAgICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpICYmIGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRDaCAhPT0gY2gpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkcmVuKGVsbSwgb2xkQ2gsIGNoLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKVxuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCB2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEZWYoaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucG9zdHBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwYXRjaChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGVsbSwgcGFyZW50O1xuICAgICAgICB2YXIgaW5zZXJ0ZWRWbm9kZVF1ZXVlID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucHJlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnByZVtpXSgpO1xuICAgICAgICBpZiAoIWlzVm5vZGUob2xkVm5vZGUpKSB7XG4gICAgICAgICAgICBvbGRWbm9kZSA9IGVtcHR5Tm9kZUF0KG9sZFZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2FtZVZub2RlKG9sZFZub2RlLCB2bm9kZSkpIHtcbiAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICAgICAgcGFyZW50ID0gYXBpLnBhcmVudE5vZGUoZWxtKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudCwgdm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcoZWxtKSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudCwgW29sZFZub2RlXSwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGluc2VydGVkVm5vZGVRdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldLmRhdGEuaG9vay5pbnNlcnQoaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnBvc3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucG9zdFtpXSgpO1xuICAgICAgICByZXR1cm4gdm5vZGU7XG4gICAgfTtcbn1cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zbmFiYmRvbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBoXzEgPSByZXF1aXJlKFwiLi9oXCIpO1xuZnVuY3Rpb24gY29weVRvVGh1bmsodm5vZGUsIHRodW5rKSB7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xuICAgIHZub2RlLmRhdGEuZm4gPSB0aHVuay5kYXRhLmZuO1xuICAgIHZub2RlLmRhdGEuYXJncyA9IHRodW5rLmRhdGEuYXJncztcbiAgICB0aHVuay5kYXRhID0gdm5vZGUuZGF0YTtcbiAgICB0aHVuay5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHRodW5rLnRleHQgPSB2bm9kZS50ZXh0O1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbn1cbmZ1bmN0aW9uIGluaXQodGh1bmspIHtcbiAgICB2YXIgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgdm5vZGUgPSBjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBjdXIuYXJncyk7XG4gICAgY29weVRvVGh1bmsodm5vZGUsIHRodW5rKTtcbn1cbmZ1bmN0aW9uIHByZXBhdGNoKG9sZFZub2RlLCB0aHVuaykge1xuICAgIHZhciBpLCBvbGQgPSBvbGRWbm9kZS5kYXRhLCBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciBvbGRBcmdzID0gb2xkLmFyZ3MsIGFyZ3MgPSBjdXIuYXJncztcbiAgICBpZiAob2xkLmZuICE9PSBjdXIuZm4gfHwgb2xkQXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG9sZEFyZ3NbaV0gIT09IGFyZ3NbaV0pIHtcbiAgICAgICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weVRvVGh1bmsob2xkVm5vZGUsIHRodW5rKTtcbn1cbmV4cG9ydHMudGh1bmsgPSBmdW5jdGlvbiB0aHVuayhzZWwsIGtleSwgZm4sIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3MgPSBmbjtcbiAgICAgICAgZm4gPSBrZXk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGhfMS5oKHNlbCwge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgaG9vazogeyBpbml0OiBpbml0LCBwcmVwYXRjaDogcHJlcGF0Y2ggfSxcbiAgICAgICAgZm46IGZuLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgfSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy50aHVuaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRodW5rLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICAgIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0cy52bm9kZSA9IHZub2RlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXAiLCIvKlxyXG4gIEBmbG93XHJcbiAgUm9vdCBjb21wb25lbnRcclxuKi9cclxuaW1wb3J0IHR5cGUgeyBDb25maWcsIEFjdGlvbiB9IGZyb20gXCIuL2xpYi9qZXRpeFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnQgfSBmcm9tIFwiLi9saWIvamV0aXhcIjtcclxuaW1wb3J0IGNvdW50ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jb3VudGVyXCI7XHJcbmltcG9ydCB7IGh0bWwgfSBmcm9tIFwiLi9saWIvdmRvbVwiO1xyXG5jb25zdCB7IGRpdiwgYnV0dG9uLCBpIH0gPSBodG1sO1xyXG5cclxudHlwZSBQcm9wcyA9IHt8XHJcbnx9O1xyXG5cclxudHlwZSBNb2RlbCA9IHt8XHJcbiAgICB0aGVtZTogVGhlbWU7XHJcbnx9O1xyXG5cclxudHlwZSBNc2cgPSBcIlNldFRoZW1lXCI7XHJcblxyXG50eXBlIFRoZW1lID0gXCJkZWZhdWx0XCIgfCBcImRhcmtcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQoKGFjdGlvbjogQWN0aW9uPE1zZz4sIHByb3BzOiBQcm9wcykgPT4gKHtcclxuXHJcbiAgICBpbml0aWFsTW9kZWw6IHtcclxuICAgICAgICB0aGVtZTogXCJkZWZhdWx0XCJcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdGlhbEFjdGlvbjogdW5kZWZpbmVkLFxyXG5cclxuICAgIHVwZGF0ZToge1xyXG4gICAgICAgIFNldFRoZW1lOiAobW9kZWwsIHsgdGhlbWUgfTogeyB0aGVtZTogVGhlbWUgfSkgPT4ge1xyXG4gICAgICAgICAgICBtb2RlbC50aGVtZSA9IHRoZW1lO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdmlldyhpZDogc3RyaW5nLCBwcm9wczogUHJvcHMsIG1vZGVsOiBNb2RlbCkge1xyXG4gICAgICAgIHJldHVybiBkaXYoYC5wYWdlLiR7bW9kZWwudGhlbWV9YCwgW1xyXG4gICAgICAgICAgICBkaXYoXCIuaW50cm9cIiwgW1xyXG4gICAgICAgICAgICAgICAgZGl2KFwiUGxlYXNlIG9wZW4gdGhlIGRldmVsb3BlciBjb25zb2xlLCB3aGVyZSBhbGwgY29tcG9uZW50IGFjdGlvbnMsIHN0YXRlIGFuZCByZW5kZXJzIGFyZSBsb2dnZWQuXCIpLFxyXG4gICAgICAgICAgICAgICAgaShcIk5vdGUgdGhhdCBgcmVuZGVyKClgIGRvZXNuJ3QgdXBkYXRlIHRoZSBET00gdW5sZXNzIHRoZSBWRE9NIGhhcyBjaGFuZ2VkLlwiKVxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgY291bnRlcihcIiNjb3VudGVyLTBcIiwgeyBzdGFydDogMCB9KSxcclxuICAgICAgICAgICAgY291bnRlcihcIiNjb3VudGVyLTFcIiwgeyBzdGFydDogLTEgfSksXHJcbiAgICAgICAgICAgIGJ1dHRvbihcclxuICAgICAgICAgICAgICAgIHsgb246IHsgY2xpY2s6IGFjdGlvbihcIlNldFRoZW1lXCIsIHsgdGhlbWU6IFwiZGVmYXVsdFwiIH0pIH0gfSxcclxuICAgICAgICAgICAgICAgIFwiTGlnaHQgdGhlbWVcIiksXHJcbiAgICAgICAgICAgIGJ1dHRvbihcclxuICAgICAgICAgICAgICAgIHsgb246IHsgY2xpY2s6IGFjdGlvbihcIlNldFRoZW1lXCIsIHsgdGhlbWU6IFwiZGFya1wiIH0pIH0gfSxcclxuICAgICAgICAgICAgICAgIFwiRGFyayB0aGVtZVwiKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxufTogQ29uZmlnPE1vZGVsLCBNc2c+KSk7XHJcbiIsIi8qXHJcbiAgQGZsb3dcclxuICBDb3VudGVyIGNvbXBvbmVudFxyXG4qL1xyXG5pbXBvcnQgdHlwZSB7IENvbmZpZywgQWN0aW9uIH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnQgfSBmcm9tIFwiLi4vbGliL2pldGl4XCI7XHJcbmltcG9ydCBub3RpZmljYXRpb24gZnJvbSBcIi4vbm90aWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IGh0bWwgfSBmcm9tIFwiLi4vbGliL3Zkb21cIjtcclxuY29uc3QgeyBkaXYsIGJ1dHRvbiB9ID0gaHRtbDtcclxuXHJcbnR5cGUgUHJvcHMgPSB7fFxyXG4gICAgK3N0YXJ0OiBudW1iZXI7XHJcbnx9O1xyXG5cclxudHlwZSBNb2RlbCA9IHt8XHJcbiAgICBjb3VudGVyOiBudW1iZXI7XHJcbiAgICBmZWVkYmFjazogc3RyaW5nO1xyXG58fTtcclxuXHJcbnR5cGUgTXNnID1cclxuICAgIFwiSW5jcmVtZW50XCIgfFxyXG4gICAgXCJEZWNyZW1lbnRcIiB8XHJcbiAgICBcIlNob3dWYWxpZGF0aW5nXCIgfFxyXG4gICAgXCJWYWxpZGF0ZVwiIHxcclxuICAgIFwiU2hvd0ZlZWRiYWNrXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50KChhY3Rpb246IEFjdGlvbjxNc2c+LCBwcm9wczogUHJvcHMpID0+ICh7XHJcblxyXG4gICAgaW5pdGlhbE1vZGVsOiB7XHJcbiAgICAgICAgY291bnRlcjogcHJvcHMuc3RhcnQsXHJcbiAgICAgICAgZmVlZGJhY2s6IFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdGlhbEFjdGlvbjogYWN0aW9uKFwiVmFsaWRhdGVcIiksXHJcblxyXG4gICAgLy8gSGFuZGxlcnMgdXBkYXRlIGBtb2RlbGAsIHRoZW4gcmV0dXJuIHRoZSBuZXh0IGFjdGlvblxyXG4gICAgLy8gKG9yIGEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgd2l0aCBhbiBhY3Rpb24sIHNlZSBgdmFsaWRhdGVDb3VudGAgYmVsb3cuKVxyXG4gICAgdXBkYXRlOiB7XHJcbiAgICAgICAgSW5jcmVtZW50OiAobW9kZWwsIHsgc3RlcCB9OiB7IHN0ZXA6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgIG1vZGVsLmNvdW50ZXIgKz0gc3RlcDtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbihcIlZhbGlkYXRlXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRGVjcmVtZW50OiAobW9kZWwsIHsgc3RlcCB9OiB7IHN0ZXA6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgIG1vZGVsLmNvdW50ZXIgLT0gc3RlcDtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbihcIlZhbGlkYXRlXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU2hvd1ZhbGlkYXRpbmc6IG1vZGVsID0+IHtcclxuICAgICAgICAgICAgbW9kZWwuZmVlZGJhY2sgPSBcIlZhbGlkYXRpbmcuLi5cIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFZhbGlkYXRlOiBtb2RlbCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oXCJTaG93VmFsaWRhdGluZ1wiKSxcclxuICAgICAgICAgICAgICAgIC8vIEFzeW5jIGV4YW1wbGVcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlQ291bnQobW9kZWwuY291bnRlcilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbih0ZXh0ID0+IGFjdGlvbihcIlNob3dGZWVkYmFja1wiLCB7IHRleHQgfSkpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBTaG93RmVlZGJhY2s6IChtb2RlbCwgeyB0ZXh0IH06IHsgdGV4dDogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICAgICAgbW9kZWwuZmVlZGJhY2sgPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdmlldyhpZDogc3RyaW5nLCBwcm9wczogUHJvcHMsIG1vZGVsOiBNb2RlbCkge1xyXG4gICAgICAgIHJldHVybiBkaXYoXCIuY291bnRlclwiLCBbXHJcbiAgICAgICAgICAgIGJ1dHRvbihcclxuICAgICAgICAgICAgICAgIHsgb246IHsgY2xpY2s6IGFjdGlvbihcIkluY3JlbWVudFwiLCB7IHN0ZXA6IDEgfSkgfSB9LFxyXG4gICAgICAgICAgICAgICAgXCIrXCIpLFxyXG4gICAgICAgICAgICBkaXYoU3RyaW5nKG1vZGVsLmNvdW50ZXIpKSxcclxuICAgICAgICAgICAgYnV0dG9uKFxyXG4gICAgICAgICAgICAgICAgeyBvbjogeyBjbGljazogYWN0aW9uKFwiRGVjcmVtZW50XCIsIHsgc3RlcDogMSB9KSB9IH0sXHJcbiAgICAgICAgICAgICAgICBcIi1cIiksXHJcblxyXG4gICAgICAgICAgICAvLyBDaGlsZCBjb21wb25lbnQgLSBgbm90aWZpY2F0aW9uYCBtb2R1bGVcclxuICAgICAgICAgICAgbm90aWZpY2F0aW9uKGAjJHtpZH0tZmVlZGJhY2tgLCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtb2RlbC5mZWVkYmFjayxcclxuICAgICAgICAgICAgICAgIGRpc21pc3NBY3Rpb246IGFjdGlvbihcIlNob3dWYWxpZGF0aW5nXCIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59OiBDb25maWc8TW9kZWwsIE1zZz4pKTtcclxuXHJcblxyXG4vLyBFeHBvcnQgZm9yIHRlc3RzXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05lZ2F0aXZlKG46IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG4gPCAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUNvdW50KG46IG51bWJlcik6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKGlzTmVnYXRpdmUobikgPyBcInggSW52YWxpZFwiIDogXCLinJMgVmFpbGRcIiksIDUwMCk7XHJcbiAgICB9KTtcclxufVxyXG4iLCIvKlxuICBAZmxvd1xuICBOb3RpZmljYXRpb24gY29tcG9uZW50XG4qL1xuaW1wb3J0IHR5cGUgeyBDb25maWcsIEFjdGlvbiB9IGZyb20gXCIuLi9saWIvamV0aXhcIjtcbmltcG9ydCB7IGNvbXBvbmVudCB9IGZyb20gXCIuLi9saWIvamV0aXhcIjtcbmltcG9ydCB7IGh0bWwgfSBmcm9tIFwiLi4vbGliL3Zkb21cIjtcbmNvbnN0IHsgZGl2LCBidXR0b24gfSA9IGh0bWw7XG5cbnR5cGUgUHJvcHMgPSB7fFxuICAgICt0ZXh0OiBzdHJpbmc7XG4gICAgK2Rpc21pc3NBY3Rpb246ICgpID0+IHZvaWQ7XG58fTtcblxudHlwZSBNb2RlbCA9IHt8XG4gICAgc2hvdzogYm9vbGVhbjtcbiAgICBpc1dhcm5pbmc6IGJvb2xlYW47XG58fTtcblxudHlwZSBNc2cgPVxuICAgIFwiRGlzbWlzc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudCgoYWN0aW9uOiBBY3Rpb248TXNnPiwgcHJvcHM6IFByb3BzKSA9PiAoe1xuXG4gICAgaW5pdGlhbE1vZGVsOiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGlzV2FybmluZzogZmFsc2VcbiAgICB9LFxuXG4gICAgaW5pdGlhbEFjdGlvbjogdW5kZWZpbmVkLFxuXG4gICAgdXBkYXRlOiB7XG4gICAgICAgIERpc21pc3M6IG1vZGVsID0+IHtcbiAgICAgICAgICAgIG1vZGVsLnNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5kaXNtaXNzQWN0aW9uO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHZpZXcoaWQ6IHN0cmluZywgcHJvcHM6IFByb3BzLCBtb2RlbDogTW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIGRpdihcIi5ub3RpZmljYXRpb25cIiwge1xuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBzaG93OiBtb2RlbC5zaG93ICYmIHByb3BzLnRleHQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHdhcm46IG1vZGVsLmlzV2FybmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbXG4gICAgICAgICAgICBwcm9wcy50ZXh0LFxuICAgICAgICAgICAgYnV0dG9uKHsgb246IHsgY2xpY2s6IGFjdGlvbihcIkRpc21pc3NcIikgfSB9LCBcIkRpc21pc3NcIilcbiAgICAgICAgXSk7XG4gICAgfVxuXG59OiBDb25maWc8TW9kZWwsIE1zZz4pKTtcbiIsIi8qXG4gIEBmbG93XG4gIFRoZXNlIHV0aWxzIGFyZSBpbXBvcnRlZCBmb3IgZGV2IG9ubHlcbiovXG5sZXQgZ3JvdXBJZDogc3RyaW5nID0gJyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZTxhOiB7fT4obzogYSk6IGEge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG8pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBGcmVlemU8YToge30+KG86IGEpOiBhIHtcbiAgICBPYmplY3QuZnJlZXplKG8pO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLmZvckVhY2goXG4gICAgICAgIChwOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KHApICYmXG4gICAgICAgICAgICAgICAgb1twXSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICh0eXBlb2Ygb1twXSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2Ygb1twXSA9PT0gXCJmdW5jdGlvblwiKSAmJlxuICAgICAgICAgICAgICAgICFPYmplY3QuaXNGcm96ZW4ob1twXSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGRlZXBGcmVlemUob1twXSk7XG4gICAgICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG87XG59XG5cbmV4cG9ydCBjb25zdCBsb2cgPSAoe1xuICAgIG5vSW5pdGlhbEFjdGlvbihpZCwgbW9kZWw6IHt9KSB7XG4gICAgICAgIGNvbnNvbGUuZ3JvdXAoYCVjIyR7aWR9YCwgXCJjb2xvcjogIzY5ZlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coYE1vZGVsICA6ICR7SlNPTi5zdHJpbmdpZnkobW9kZWwpfWApO1xuICAgICAgICBncm91cElkID0gaWQ7XG4gICAgfSxcbiAgICB1cGRhdGVTdGFydChpZCwgbW9kZWw6IHt9LCB0YWcsIGRhdGEpIHtcbiAgICAgICAgaWYgKCFncm91cElkIHx8IGdyb3VwSWQgIT09IGlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwKGAlYyMke2lkfWAsIFwiY29sb3I6ICM2OWZcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTW9kZWwgIDogJHtKU09OLnN0cmluZ2lmeShtb2RlbCl9YCk7XG4gICAgICAgICAgICBncm91cElkID0gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYCVjQWN0aW9uIDogJHtTdHJpbmcodGFnKX1gLCBcImNvbG9yOiAjZjZiXCIpO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNEYXRhICAgOiAke0pTT04uc3RyaW5naWZ5KGRhdGEpfWAsIFwiY29sb3I6ICNmNmJcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZUVuZChtb2RlbCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgTW9kZWwgIDogJHtKU09OLnN0cmluZ2lmeShtb2RlbCl9YCk7XG4gICAgfSxcbiAgICByZW5kZXIoaWQsIHByb3BzLCBtb2RlbCkge1xuICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlY+KfsyBSZW5kZXIgIyR7aWR9LCBwcm9wczogJHtKU09OLnN0cmluZ2lmeShwcm9wcyl9YCwgXCJjb2xvcjogIzg4OFwiKTtcbiAgICAgICAgZ3JvdXBJZCA9ICcnO1xuICAgIH1cbn06IHtcbiAgICBub0luaXRpYWxBY3Rpb246IChzdHJpbmcsIHt9KSA9PiB2b2lkLFxuICAgIHVwZGF0ZVN0YXJ0OiAoc3RyaW5nLCB7fSwgKiwge30pID0+IHZvaWQsXG4gICAgdXBkYXRlRW5kOiAoe30pID0+IHZvaWQsXG4gICAgcmVuZGVyOiAoc3RyaW5nLCB7fSwge30pID0+IHZvaWRcbn0pO1xuIiwiLypcbiAgQGZsb3dcbiAgYE1vZGVsLCBVcGRhdGUsIFZpZXdgIHdpcmluZ1xuICBOT1RFOiBMaW5lcyBtYXJrZWQgYEBEZXYtb25seWAgYXJlIHJlbW92ZWQgYnkgYHByb2RgIGJ1aWxkXG4qL1xuaW1wb3J0IHsgcGF0Y2gsIHNldEhvb2sgfSBmcm9tIFwiLi92ZG9tXCI7XG5pbXBvcnQgYXBwIGZyb20gXCIuLi9hcHBcIjtcbmltcG9ydCB7IGNsb25lLCBkZWVwRnJlZXplLCBsb2cgfSBmcm9tIFwiLi9kZXZVdGlsXCI7IC8vIEBEZXYtb25seVxuXG5cbnR5cGUgVGh1bmsgPSAoKSA9PiB2b2lkO1xuXG50eXBlIE5leHQgPVxuICAgIFRodW5rIHwgUHJvbWlzZTwqPiB8IEFycmF5PFRodW5rIHwgUHJvbWlzZTwqPj4gfCB2b2lkO1xuXG50eXBlIFZub2RlID0ge307XG5cbmV4cG9ydCB0eXBlIEFjdGlvbjxtc2c+ID1cbiAgICAodGFnOiBtc2csIGRhdGE/OiB7fSkgPT4gVGh1bms7XG5cbmV4cG9ydCB0eXBlIENvbmZpZzxtLCBtc2c+ID0ge3xcbiAgICAraW5pdGlhbE1vZGVsOiBtLFxuICAgICtpbml0aWFsQWN0aW9uPzogTmV4dCxcbiAgICArdXBkYXRlOiB7ICtbdGFnOiBtc2ddOiAobSwgZGF0YTogKikgPT4gTmV4dCB9LFxuICAgICt2aWV3OiAoaWQ6IHN0cmluZywgcHJvcHM6ICosIG1vZGVsOiBtKSA9PiBWbm9kZVxufH1cblxudHlwZSBHZXRDb25maWdGbjxtLCBwLCBtc2c+ID1cbiAgICAoQWN0aW9uPG1zZz4sIHByb3BzOiBwKSA9PiBDb25maWc8bSwgbXNnPjtcblxuXG5jb25zdCByb290SWQgPSBcImFwcFwiO1xuY29uc3QgcmVuZGVyUmVmczogeyBbc3RyaW5nXTogRnVuY3Rpb24gfSA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50PG06IHt9LCBwOiB7fSwgbXNnPihcbiAgICAvLyBQYXNzIGluIGNhbGxiYWNrIHRoYXQgcmV0dXJucyBjb21wb25lbnQgY29uZmlnXG4gICAgZ2V0Q29uZmlnOiBHZXRDb25maWdGbjxtLCBwLCBtc2c+XG4pOiAoc3RyaW5nLCBwKSA9PiBWbm9kZSB7XG4gICAgLy8gUmV0dXJucyBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBieSBwYXJlbnQgY29tcG9uZW50IGUuZy4gYGNvdW50ZXIoXCJjb3VudGVyLTBcIiwgeyBzdGFydDogMCB9KWBcbiAgICByZXR1cm4gKGlkU3RyLCBwcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGlkU3RyLnJlcGxhY2UoL14jLywgXCJcIik7XG4gICAgICAgIGlmICghaWQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIkNvbXBvbmVudCByZXF1aXJlcyBhbiBpZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdChpZCwgcHJvcHMsIGdldENvbmZpZyk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQ8bToge30sIHA6IHt9LCBtc2c+KFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcHJvcHM6IHAsXG4gICAgZ2V0Q29uZmlnOiBHZXRDb25maWdGbjxtLCBwLCBtc2c+XG4pOiBWbm9kZSB7XG4gICAgZGVlcEZyZWV6ZShwcm9wcyk7IC8vIEBEZXYtb25seVxuXG4gICAgLy8gSWYgY29tcG9uZW50IGFscmVhZHkgZXhpc3RzLCBqdXN0IHJ1biByZW5kZXIoKSBhZ2FpblxuICAgIGxldCBjb21wb25lbnRSb290ID0gcmVuZGVyQnlJZChpZCwgcHJvcHMpO1xuICAgIGlmIChjb21wb25lbnRSb290KSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRSb290O1xuICAgIH1cblxuICAgIGNvbnN0IGNvbmZpZzogQ29uZmlnPG0sIG1zZz4gPSBnZXRDb25maWcoYWN0aW9uLCBwcm9wcyk7XG4gICAgbGV0IG1vZGVsOiBtID0gY29uZmlnLmluaXRpYWxNb2RlbDtcbiAgICBsZXQgbm9SZW5kZXI6IG51bWJlciA9IDA7XG5cbiAgICBmdW5jdGlvbiBhY3Rpb24odGFnOiBtc2csIGRhdGEgPSB7fSk6IFRodW5rIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHVwZGF0ZSh0YWcsIGRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0YWc6IG1zZywgZGF0YToge30pOiB2b2lkIHtcbiAgICAgICAgbG9nLnVwZGF0ZVN0YXJ0KGlkLCBtb2RlbCwgdGFnLCBkYXRhKTsgLy8gQERldi1vbmx5XG4gICAgICAgIG1vZGVsID0gY2xvbmUobW9kZWwpOyAgICAgICAgICAgICAgICAgIC8vIEBEZXYtb25seVxuICAgICAgICBjb25zdCBuZXh0ID0gY29uZmlnLnVwZGF0ZVt0YWddLmFwcGx5KG51bGwsIFttb2RlbCwgZGF0YV0pO1xuICAgICAgICBkZWVwRnJlZXplKG1vZGVsKTsgICAgICAgICAgICAgICAgICAgICAvLyBARGV2LW9ubHlcbiAgICAgICAgbG9nLnVwZGF0ZUVuZChtb2RlbCk7ICAgICAgICAgICAgICAgICAgLy8gQERldi1vbmx5XG4gICAgICAgIHJ1bihuZXh0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4obmV4dDogTmV4dCk6IHZvaWQge1xuICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgIHJlbmRlcihwcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobmV4dCkpIHtcbiAgICAgICAgICAgIG5vUmVuZGVyKys7XG4gICAgICAgICAgICBuZXh0LmZvckVhY2gocnVuKTtcbiAgICAgICAgICAgIG5vUmVuZGVyLS07XG4gICAgICAgICAgICByZW5kZXIocHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXh0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbmV4dC50aGVuKHJ1bik7XG4gICAgICAgICAgICByZW5kZXIocHJvcHMpOyAvLyBFbmQgb2Ygc3luYyBjaGFpblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyKHByb3BzOiBwKTogP1Zub2RlIHtcbiAgICAgICAgaWYgKCFub1JlbmRlcikge1xuICAgICAgICAgICAgcGF0Y2goXG4gICAgICAgICAgICAgICAgY29tcG9uZW50Um9vdCxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRSb290ID0gY29uZmlnLnZpZXcoaWQsIHByb3BzLCBtb2RlbClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRSZW5kZXJSZWYoY29tcG9uZW50Um9vdCwgaWQsIHJlbmRlcik7XG4gICAgICAgICAgICBsb2cucmVuZGVyKGlkLCBwcm9wcywgbW9kZWwpOyAgICAgIC8vIEBEZXYtb25seVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRSb290O1xuICAgIH1cblxuICAgIGlmIChjb25maWcuaW5pdGlhbEFjdGlvbikge1xuICAgICAgICBub1JlbmRlcisrO1xuICAgICAgICBydW4oY29uZmlnLmluaXRpYWxBY3Rpb24pO1xuICAgICAgICBub1JlbmRlci0tO1xuICAgIH1cbiAgICBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQERldi1vbmx5XG4gICAgICAgIGxvZy5ub0luaXRpYWxBY3Rpb24oaWQsIG1vZGVsKTsgICAgICAgIC8vIEBEZXYtb25seVxuICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBARGV2LW9ubHlcblxuICAgIGNvbXBvbmVudFJvb3QgPSBjb25maWcudmlldyhpZCwgcHJvcHMsIG1vZGVsKTtcbiAgICBzZXRSZW5kZXJSZWYoY29tcG9uZW50Um9vdCwgaWQsIHJlbmRlcik7XG4gICAgbG9nLnJlbmRlcihpZCwgcHJvcHMsIG1vZGVsKTsgICAgICAgICAgICAgIC8vIEBEZXYtb25seVxuICAgIHJldHVybiBjb21wb25lbnRSb290O1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgcGF0Y2goXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvb3RJZCksXG4gICAgICAgIGFwcChyb290SWQsIHsgLyogUHJvcHMgKi8gfSlcbiAgICApO1xufSk7XG5cbmZ1bmN0aW9uIHJlbmRlckJ5SWQ8cDoge30+KGlkOiBzdHJpbmcsIHByb3BzOiBwKTogP1Zub2RlIHtcbiAgICBjb25zdCByZW5kZXIgPSByZW5kZXJSZWZzW2lkXTtcbiAgICBpZiAocmVuZGVyKSB7XG4gICAgICAgIHJldHVybiByZW5kZXIocHJvcHMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0UmVuZGVyUmVmKHZub2RlOiBWbm9kZSwgaWQ6IHN0cmluZywgcmVuZGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIC8vIFJ1biBhZnRlciBhbGwgc3luY2hyb25vdXMgcGF0Y2hlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZW5kZXJSZWZzW2lkXSA9IHJlbmRlcjtcbiAgICAgICAgc2V0SG9vayh2bm9kZSwgJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgcmVuZGVyUmVmc1tpZF07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiLypcbiAgQSB3cmFwcGVyIGFyb3VuZCBgaHR0cHM6Ly9naXRodWIuY29tL3NuYWJiZG9tL3NuYWJiZG9tYFxuICB3aXRoIGh0bWwgZnVuY3Rpb25zIGZyb20gYGh0dHBzOi8vZ2l0aHViLmNvbS9vaGFuaGkvaHlwZXJzY3JpcHQtaGVscGVyc2BcbiovXG5jb25zdCBzbmFiYmRvbSA9IHJlcXVpcmUoXCJzbmFiYmRvbVwiKTtcbmNvbnN0IHBhdGNoID0gc25hYmJkb20uaW5pdChbXG4gICAgcmVxdWlyZShcInNuYWJiZG9tL21vZHVsZXMvY2xhc3NcIikuZGVmYXVsdCxcbiAgICByZXF1aXJlKFwic25hYmJkb20vbW9kdWxlcy9wcm9wc1wiKS5kZWZhdWx0LFxuICAgIHJlcXVpcmUoXCJzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzXCIpLmRlZmF1bHRcbl0pO1xuY29uc3QgaCA9IHJlcXVpcmUoXCJzbmFiYmRvbS9oXCIpLmRlZmF1bHQ7XG5jb25zdCBodG1sID0gcmVxdWlyZSgnaHlwZXJzY3JpcHQtaGVscGVycycpKGgpO1xuXG5mdW5jdGlvbiBzZXRIb29rKHZub2RlLCBob29rTmFtZSwgY2FsbGJhY2spIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc25hYmJkb20vc25hYmJkb20jaG9va3NcbiAgICAvLyBpbml0ICAgICAgICBhIHZub2RlIGhhcyBiZWVuIGFkZGVkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bm9kZVxuICAgIC8vIGNyZWF0ZSAgICAgIGEgRE9NIGVsZW1lbnQgaGFzIGJlZW4gY3JlYXRlZCBiYXNlZCBvbiBhIHZub2RlICAgICAgIGVtcHR5Vm5vZGUsIHZub2RlXG4gICAgLy8gaW5zZXJ0ICAgICAgYW4gZWxlbWVudCBoYXMgYmVlbiBpbnNlcnRlZCBpbnRvIHRoZSBET00gICAgICAgICAgICAgdm5vZGVcbiAgICAvLyBwcmVwYXRjaCAgICBhbiBlbGVtZW50IGlzIGFib3V0IHRvIGJlIHBhdGNoZWQgICAgICAgICAgICAgICAgICAgICBvbGRWbm9kZSwgdm5vZGVcbiAgICAvLyB1cGRhdGUgICAgICBhbiBlbGVtZW50IGlzIGJlaW5nIHVwZGF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWbm9kZSwgdm5vZGVcbiAgICAvLyBwb3N0cGF0Y2ggICBhbiBlbGVtZW50IGhhcyBiZWVuIHBhdGNoZWQgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWbm9kZSwgdm5vZGVcbiAgICAvLyBkZXN0cm95ICAgICBhbiBlbGVtZW50IGlzIGRpcmVjdGx5IG9yIGluZGlyZWN0bHkgYmVpbmcgcmVtb3ZlZCAgICB2bm9kZVxuICAgIC8vIHJlbW92ZSAgICAgIGFuIGVsZW1lbnQgaXMgZGlyZWN0bHkgYmVpbmcgcmVtb3ZlZCBmcm9tIHRoZSBET00gICAgIHZub2RlLCByZW1vdmVDYWxsYmFja1xuICAgIGlmICh2bm9kZSkge1xuICAgICAgICB2bm9kZS5kYXRhID0gdm5vZGUuZGF0YSB8fCB7fTtcbiAgICAgICAgdm5vZGUuZGF0YS5ob29rID0gdm5vZGUuZGF0YS5ob29rIHx8IHt9O1xuICAgICAgICB2bm9kZS5kYXRhLmhvb2tbaG9va05hbWVdID0gY2FsbGJhY2s7XG4gICAgfVxufVxuXG5leHBvcnQgeyBwYXRjaCwgc2V0SG9vaywgaHRtbCB9O1xuIl19
