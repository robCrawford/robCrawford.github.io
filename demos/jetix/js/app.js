(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./is":3,"./vnode":9}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./h":1,"./htmldomapi":2,"./is":3,"./thunk":8,"./vnode":9}],8:[function(require,module,exports){
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

},{"./h":1}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("./lib/jetix");

var _vdom = require("./lib/vdom");

var _counter = require("./components/counter");

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  
  Root component
*/
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
            return (0, _vdom.h)("div.page." + model.theme, [(0, _vdom.h)("div.intro", "All component actions, state and renders are logged to the developer tools console."), (0, _counter2.default)("counter-0", { start: 0 }), (0, _counter2.default)("counter-1", { start: -1 }), (0, _vdom.h)("button", { on: { click: action("SetTheme", { theme: "default" }) } }, "Light theme"), (0, _vdom.h)("button", { on: { click: action("SetTheme", { theme: "dark" }) } }, "Dark theme")]);
        }
    };
});

},{"./components/counter":11,"./lib/jetix":13,"./lib/vdom":14}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNegative = isNegative;

var _jetix = require("../lib/jetix");

var _vdom = require("../lib/vdom");

var _notification = require("./notification");

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  
  Counter component
*/
exports.default = (0, _jetix.component)(function (action, props) {
    return {

        initialModel: {
            counter: props.start,
            warning: ""
        },

        initialAction: action("Validate"),

        update: {
            // A handler updates `model` and returns any next action(s),
            // or a `Promise` that resolves with next action(s)
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
            Validate: function Validate(model) {
                return [action("ClearWarning"),
                // Async
                validateCount(model.counter).then(function (text) {
                    return action("SetWarning", { text: text });
                })];
            },
            SetWarning: function SetWarning(model, _ref3) {
                var text = _ref3.text;

                model.warning = text;
            },
            ClearWarning: function ClearWarning(model) {
                model.warning = "";
            }
        },

        view: function view(id, props, model) {
            return (0, _vdom.h)("div.counter", [(0, _vdom.h)("button", { on: { click: action("Increment", { step: 1 }) } }, "+"), (0, _vdom.h)("div", String(model.counter)), (0, _vdom.h)("button", { on: { click: action("Decrement", { step: 1 }) } }, "-"),

            // Child component - `notification` module
            (0, _notification2.default)(id + "-warning", {
                text: model.warning,
                dismissAction: action("ClearWarning")
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
            return resolve(isNegative(n) ? "Negative!" : "");
        }, 500);
    });
}

},{"../lib/jetix":13,"../lib/vdom":14,"./notification":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jetix = require("../lib/jetix");

var _vdom = require("../lib/vdom");

exports.default = (0, _jetix.component)(function (action, props) {
    return {

        initialModel: {
            show: true
        },

        initialAction: undefined,

        update: {
            Dismiss: function Dismiss(model) {
                model.show = false;
                return props.dismissAction;
            }
        },

        view: function view(id, props, model) {
            return (0, _vdom.h)("div.notification", { class: { show: model.show && props.text.length } }, [props.text, (0, _vdom.h)('button', { on: { click: action("Dismiss") } }, "Dismiss")]);
        }
    };
}); /*
      
      Notification component
    */

},{"../lib/jetix":13,"../lib/vdom":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                `Model, Update, View` wiring
                                                                                                                                                                                                                                                                              */


exports.component = component;

var _vdom = require("./vdom");

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootId = "app";

function component(
// Pass in callback that returns component config
getConfig) {
    // Returns function that is called by parent component e.g. `counter("counter-0", { start: 0 })`
    return function (id, props) {
        return init(id, props, getConfig);
    };
}

function init(id, props, getConfig) {
    deepFreeze(props); // @Dev-only

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
        // Lines marked `@Dev-only` are removed by `prod` build
        log.updateStart(id, model, tag, data); // @Dev-only
        model = clone(model); // @Dev-only
        var next = config.update[tag].apply(null, [model, data]);
        deepFreeze(model); // @Dev-only
        log.updateEnd(model); // @Dev-only
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
            setRefs(componentRoot, id, render);
            log.render(id); // @Dev-only
        }
        return componentRoot;
    }

    if (config.initialAction) {
        noRender++;
        run(config.initialAction);
        noRender--;
    }

    componentRoot = config.view(id, props, model);
    setRefs(componentRoot, id, render);
    return componentRoot;
}

document.addEventListener("DOMContentLoaded", function () {
    (0, _vdom.patch)(document.getElementById(rootId), (0, _app2.default)(rootId, {/* Props */}));
});

function renderById(id, props) {
    var domNode = document.getElementById(id);
    if (domNode && domNode.render) {
        return domNode.render(props);
    }
}

function setRefs(componentRoot, id, render) {
    // Run after all sync patches
    setTimeout(function () {
        if (componentRoot) {
            // Set `id` and a handle to the `render()` closure on DOM element
            // This creates a simple state/id pairing, and the VDOM lib takes care of clearing memory
            componentRoot.elm.id = id;
            componentRoot.elm.render = render;
        }
    });
}

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

var log = {
    currentId: "",
    logStyle: "background: #222; padding: 4px 10px; border-radius: 5px;",
    updateStart: function updateStart(id, model, tag, data) {
        if (this.currentId !== id) {
            console.groupEnd();
            console.group("%c#" + id, "color: #69f");
            console.log("%cModel  : " + JSON.stringify(model), this.logStyle + "color: #fff");
            this.currentId = id;
        }
        console.log("%cAction : " + String(tag), this.logStyle + "color: #ee5");
        if (Object.keys(data).length) {
            console.log("%cData   : " + JSON.stringify(data), this.logStyle + "color: #ee5"); // @Dev-only
        }
    },
    updateEnd: function updateEnd(model) {
        console.log("%cModel  : " + JSON.stringify(model), this.logStyle + "color: #fff"); // @Dev-only
    },
    render: function render(id) {
        console.log("%c\u27F3 Render #" + id, "color: #888");
    }
};

},{"../app":10,"./vdom":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
  A wrapper around `https://github.com/snabbdom/snabbdom`
*/
var snabbdom = require("snabbdom");
var patch = snabbdom.init([require("snabbdom/modules/class").default, require("snabbdom/modules/props").default, require("snabbdom/modules/eventlisteners").default]);
var h = require("snabbdom/h").default;

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
    vnode.data = vnode.data || {};
    vnode.data.hook = vnode.data.hook || {};
    vnode.data.hook[hookName] = callback;
}

exports.patch = patch;
exports.h = h;
exports.setHook = setHook;

},{"snabbdom":7,"snabbdom/h":1,"snabbdom/modules/class":4,"snabbdom/modules/eventlisteners":5,"snabbdom/modules/props":6}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc25hYmJkb20vaC5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS9odG1sZG9tYXBpLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL2lzLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvY2xhc3MuanMiLCJub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9ldmVudGxpc3RlbmVycy5qcyIsIm5vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL3Byb3BzLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL3NuYWJiZG9tLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL3RodW5rLmpzIiwibm9kZV9tb2R1bGVzL3NuYWJiZG9tL3Zub2RlLmpzIiwic3JjL2pzL2FwcC5qcyIsInNyYy9qcy9jb21wb25lbnRzL2NvdW50ZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9ub3RpZmljYXRpb24uanMiLCJzcmMvanMvbGliL2pldGl4LmpzIiwic3JjL2pzL2xpYi92ZG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FDdUU7QUFDdkYsS0FqQk87QUFrQlIsVUFsQlEsa0JBa0JELEVBbEJDLEVBa0JHO0FBQ1AsZ0JBQVEsR0FBUix1QkFBMkIsRUFBM0IsRUFBaUMsYUFBakM7QUFDSDtBQXBCTyxDQUFaOzs7Ozs7OztBQy9KQTs7O0FBR0EsSUFBTSxXQUFXLFFBQVEsVUFBUixDQUFqQjtBQUNBLElBQU0sUUFBUSxTQUFTLElBQVQsQ0FBYyxDQUN4QixRQUFRLHdCQUFSLEVBQWtDLE9BRFYsRUFFeEIsUUFBUSx3QkFBUixFQUFrQyxPQUZWLEVBR3hCLFFBQVEsaUNBQVIsRUFBMkMsT0FIbkIsQ0FBZCxDQUFkO0FBS0EsSUFBTSxJQUFJLFFBQVEsWUFBUixFQUFzQixPQUFoQzs7QUFFQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsUUFBeEIsRUFBa0MsUUFBbEMsRUFBNEM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBTSxJQUFOLEdBQWEsTUFBTSxJQUFOLElBQWMsRUFBM0I7QUFDQSxVQUFNLElBQU4sQ0FBVyxJQUFYLEdBQWtCLE1BQU0sSUFBTixDQUFXLElBQVgsSUFBbUIsRUFBckM7QUFDQSxVQUFNLElBQU4sQ0FBVyxJQUFYLENBQWdCLFFBQWhCLElBQTRCLFFBQTVCO0FBQ0g7O1FBRVEsSyxHQUFBLEs7UUFBTyxDLEdBQUEsQztRQUFHLE8sR0FBQSxPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdm5vZGVfMSA9IHJlcXVpcmUoXCIuL3Zub2RlXCIpO1xudmFyIGlzID0gcmVxdWlyZShcIi4vaXNcIik7XG5mdW5jdGlvbiBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKSB7XG4gICAgZGF0YS5ucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgaWYgKHNlbCAhPT0gJ2ZvcmVpZ25PYmplY3QnICYmIGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkRGF0YSA9IGNoaWxkcmVuW2ldLmRhdGE7XG4gICAgICAgICAgICBpZiAoY2hpbGREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhZGROUyhjaGlsZERhdGEsIGNoaWxkcmVuW2ldLmNoaWxkcmVuLCBjaGlsZHJlbltpXS5zZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaChzZWwsIGIsIGMpIHtcbiAgICB2YXIgZGF0YSA9IHt9LCBjaGlsZHJlbiwgdGV4dCwgaTtcbiAgICBpZiAoYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRhdGEgPSBiO1xuICAgICAgICBpZiAoaXMuYXJyYXkoYykpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYykpIHtcbiAgICAgICAgICAgIHRleHQgPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgJiYgYy5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2NdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXMuYXJyYXkoYikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYikpIHtcbiAgICAgICAgICAgIHRleHQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIgJiYgYi5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2JdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChpcy5wcmltaXRpdmUoY2hpbGRyZW5baV0pKVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldID0gdm5vZGVfMS52bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGVfMS52bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5oID0gaDtcbjtcbmV4cG9ydHMuZGVmYXVsdCA9IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0cy5odG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5odG1sRG9tQXBpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHRtbGRvbWFwaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMucHJpbWl0aXZlID0gcHJpbWl0aXZlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVDbGFzcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgY3VyLCBuYW1lLCBlbG0gPSB2bm9kZS5lbG0sIG9sZENsYXNzID0gb2xkVm5vZGUuZGF0YS5jbGFzcywga2xhc3MgPSB2bm9kZS5kYXRhLmNsYXNzO1xuICAgIGlmICghb2xkQ2xhc3MgJiYgIWtsYXNzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZENsYXNzID09PSBrbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZENsYXNzID0gb2xkQ2xhc3MgfHwge307XG4gICAga2xhc3MgPSBrbGFzcyB8fCB7fTtcbiAgICBmb3IgKG5hbWUgaW4gb2xkQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFrbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluIGtsYXNzKSB7XG4gICAgICAgIGN1ciA9IGtsYXNzW25hbWVdO1xuICAgICAgICBpZiAoY3VyICE9PSBvbGRDbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdFtjdXIgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuY2xhc3NNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQ2xhc3MsIHVwZGF0ZTogdXBkYXRlQ2xhc3MgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuY2xhc3NNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGFzcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGludm9rZUhhbmRsZXIoaGFuZGxlciwgdm5vZGUsIGV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gY2FsbCBmdW5jdGlvbiBoYW5kbGVyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh2bm9kZSwgZXZlbnQsIHZub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIHdpdGggYXJndW1lbnRzXG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlclswXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBhcmd1bWVudCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJbMF0uY2FsbCh2bm9kZSwgaGFuZGxlclsxXSwgZXZlbnQsIHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gaGFuZGxlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICAgICAgaGFuZGxlclswXS5hcHBseSh2bm9kZSwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjYWxsIG11bHRpcGxlIGhhbmRsZXJzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnZva2VIYW5kbGVyKGhhbmRsZXJbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQsIHZub2RlKSB7XG4gICAgdmFyIG5hbWUgPSBldmVudC50eXBlLCBvbiA9IHZub2RlLmRhdGEub247XG4gICAgLy8gY2FsbCBldmVudCBoYW5kbGVyKHMpIGlmIGV4aXN0c1xuICAgIGlmIChvbiAmJiBvbltuYW1lXSkge1xuICAgICAgICBpbnZva2VIYW5kbGVyKG9uW25hbWVdLCB2bm9kZSwgZXZlbnQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RlbmVyKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGhhbmRsZUV2ZW50KGV2ZW50LCBoYW5kbGVyLnZub2RlKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdXBkYXRlRXZlbnRMaXN0ZW5lcnMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIG9sZE9uID0gb2xkVm5vZGUuZGF0YS5vbiwgb2xkTGlzdGVuZXIgPSBvbGRWbm9kZS5saXN0ZW5lciwgb2xkRWxtID0gb2xkVm5vZGUuZWxtLCBvbiA9IHZub2RlICYmIHZub2RlLmRhdGEub24sIGVsbSA9ICh2bm9kZSAmJiB2bm9kZS5lbG0pLCBuYW1lO1xuICAgIC8vIG9wdGltaXphdGlvbiBmb3IgcmV1c2VkIGltbXV0YWJsZSBoYW5kbGVyc1xuICAgIGlmIChvbGRPbiA9PT0gb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyByZW1vdmUgZXhpc3RpbmcgbGlzdGVuZXJzIHdoaWNoIG5vIGxvbmdlciB1c2VkXG4gICAgaWYgKG9sZE9uICYmIG9sZExpc3RlbmVyKSB7XG4gICAgICAgIC8vIGlmIGVsZW1lbnQgY2hhbmdlZCBvciBkZWxldGVkIHdlIHJlbW92ZSBhbGwgZXhpc3RpbmcgbGlzdGVuZXJzIHVuY29uZGl0aW9uYWxseVxuICAgICAgICBpZiAoIW9uKSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb2xkT24pIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbGlzdGVuZXIgaWYgZWxlbWVudCB3YXMgY2hhbmdlZCBvciBleGlzdGluZyBsaXN0ZW5lcnMgcmVtb3ZlZFxuICAgICAgICAgICAgICAgIG9sZEVsbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIG9sZExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb2xkT24pIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbGlzdGVuZXIgaWYgZXhpc3RpbmcgbGlzdGVuZXIgcmVtb3ZlZFxuICAgICAgICAgICAgICAgIGlmICghb25bbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkRWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgb2xkTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIG5ldyBsaXN0ZW5lcnMgd2hpY2ggaGFzIG5vdCBhbHJlYWR5IGF0dGFjaGVkXG4gICAgaWYgKG9uKSB7XG4gICAgICAgIC8vIHJldXNlIGV4aXN0aW5nIGxpc3RlbmVyIG9yIGNyZWF0ZSBuZXdcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gdm5vZGUubGlzdGVuZXIgPSBvbGRWbm9kZS5saXN0ZW5lciB8fCBjcmVhdGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyB1cGRhdGUgdm5vZGUgZm9yIGxpc3RlbmVyXG4gICAgICAgIGxpc3RlbmVyLnZub2RlID0gdm5vZGU7XG4gICAgICAgIC8vIGlmIGVsZW1lbnQgY2hhbmdlZCBvciBhZGRlZCB3ZSBhZGQgYWxsIG5lZWRlZCBsaXN0ZW5lcnMgdW5jb25kaXRpb25hbGx5XG4gICAgICAgIGlmICghb2xkT24pIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbikge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBsaXN0ZW5lciBpZiBlbGVtZW50IHdhcyBjaGFuZ2VkIG9yIG5ldyBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVyIGlmIG5ldyBsaXN0ZW5lciBhZGRlZFxuICAgICAgICAgICAgICAgIGlmICghb2xkT25bbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmV2ZW50TGlzdGVuZXJzTW9kdWxlID0ge1xuICAgIGNyZWF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnMsXG4gICAgdXBkYXRlOiB1cGRhdGVFdmVudExpc3RlbmVycyxcbiAgICBkZXN0cm95OiB1cGRhdGVFdmVudExpc3RlbmVyc1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZXZlbnRMaXN0ZW5lcnNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudGxpc3RlbmVycy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZVByb3BzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBrZXksIGN1ciwgb2xkLCBlbG0gPSB2bm9kZS5lbG0sIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5wcm9wcywgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzO1xuICAgIGlmICghb2xkUHJvcHMgJiYgIXByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZFByb3BzID09PSBwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZFByb3BzID0gb2xkUHJvcHMgfHwge307XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgICAgICBpZiAoIXByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbG1ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICBjdXIgPSBwcm9wc1trZXldO1xuICAgICAgICBvbGQgPSBvbGRQcm9wc1trZXldO1xuICAgICAgICBpZiAob2xkICE9PSBjdXIgJiYgKGtleSAhPT0gJ3ZhbHVlJyB8fCBlbG1ba2V5XSAhPT0gY3VyKSkge1xuICAgICAgICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnByb3BzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZVByb3BzLCB1cGRhdGU6IHVwZGF0ZVByb3BzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnByb3BzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdm5vZGVfMSA9IHJlcXVpcmUoXCIuL3Zub2RlXCIpO1xudmFyIGlzID0gcmVxdWlyZShcIi4vaXNcIik7XG52YXIgaHRtbGRvbWFwaV8xID0gcmVxdWlyZShcIi4vaHRtbGRvbWFwaVwiKTtcbmZ1bmN0aW9uIGlzVW5kZWYocykgeyByZXR1cm4gcyA9PT0gdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc0RlZihzKSB7IHJldHVybiBzICE9PSB1bmRlZmluZWQ7IH1cbnZhciBlbXB0eU5vZGUgPSB2bm9kZV8xLmRlZmF1bHQoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuZnVuY3Rpb24gc2FtZVZub2RlKHZub2RlMSwgdm5vZGUyKSB7XG4gICAgcmV0dXJuIHZub2RlMS5rZXkgPT09IHZub2RlMi5rZXkgJiYgdm5vZGUxLnNlbCA9PT0gdm5vZGUyLnNlbDtcbn1cbmZ1bmN0aW9uIGlzVm5vZGUodm5vZGUpIHtcbiAgICByZXR1cm4gdm5vZGUuc2VsICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeChjaGlsZHJlbiwgYmVnaW5JZHgsIGVuZElkeCkge1xuICAgIHZhciBpLCBtYXAgPSB7fSwga2V5LCBjaDtcbiAgICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgICAgICBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAga2V5ID0gY2gua2V5O1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG1hcFtrZXldID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufVxudmFyIGhvb2tzID0gWydjcmVhdGUnLCAndXBkYXRlJywgJ3JlbW92ZScsICdkZXN0cm95JywgJ3ByZScsICdwb3N0J107XG52YXIgaF8xID0gcmVxdWlyZShcIi4vaFwiKTtcbmV4cG9ydHMuaCA9IGhfMS5oO1xudmFyIHRodW5rXzEgPSByZXF1aXJlKFwiLi90aHVua1wiKTtcbmV4cG9ydHMudGh1bmsgPSB0aHVua18xLnRodW5rO1xuZnVuY3Rpb24gaW5pdChtb2R1bGVzLCBkb21BcGkpIHtcbiAgICB2YXIgaSwgaiwgY2JzID0ge307XG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbGRvbWFwaV8xLmRlZmF1bHQ7XG4gICAgZm9yIChpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNic1tob29rc1tpXV0gPSBbXTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG1vZHVsZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBob29rID0gbW9kdWxlc1tqXVtob29rc1tpXV07XG4gICAgICAgICAgICBpZiAoaG9vayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2JzW2hvb2tzW2ldXS5wdXNoKGhvb2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVtcHR5Tm9kZUF0KGVsbSkge1xuICAgICAgICB2YXIgaWQgPSBlbG0uaWQgPyAnIycgKyBlbG0uaWQgOiAnJztcbiAgICAgICAgdmFyIGMgPSBlbG0uY2xhc3NOYW1lID8gJy4nICsgZWxtLmNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJy4nKSA6ICcnO1xuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KGFwaS50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSArIGlkICsgYywge30sIFtdLCB1bmRlZmluZWQsIGVsbSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IoY2hpbGRFbG0sIGxpc3RlbmVycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcm1DYigpIHtcbiAgICAgICAgICAgIGlmICgtLWxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IGFwaS5wYXJlbnROb2RlKGNoaWxkRWxtKTtcbiAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50XzEsIGNoaWxkRWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbiwgc2VsID0gdm5vZGUuc2VsO1xuICAgICAgICBpZiAoc2VsID09PSAnIScpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgdm5vZGUudGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFBhcnNlIHNlbGVjdG9yXG4gICAgICAgICAgICB2YXIgaGFzaElkeCA9IHNlbC5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICB2YXIgZG90SWR4ID0gc2VsLmluZGV4T2YoJy4nLCBoYXNoSWR4KTtcbiAgICAgICAgICAgIHZhciBoYXNoID0gaGFzaElkeCA+IDAgPyBoYXNoSWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkb3QgPSBkb3RJZHggPiAwID8gZG90SWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0YWcgPSBoYXNoSWR4ICE9PSAtMSB8fCBkb3RJZHggIT09IC0xID8gc2VsLnNsaWNlKDAsIE1hdGgubWluKGhhc2gsIGRvdCkpIDogc2VsO1xuICAgICAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IGlzRGVmKGRhdGEpICYmIGlzRGVmKGkgPSBkYXRhLm5zKSA/IGFwaS5jcmVhdGVFbGVtZW50TlMoaSwgdGFnKVxuICAgICAgICAgICAgICAgIDogYXBpLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgICAgIGlmIChoYXNoIDwgZG90KVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2VsLnNsaWNlKGhhc2ggKyAxLCBkb3QpKTtcbiAgICAgICAgICAgIGlmIChkb3RJZHggPiAwKVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgc2VsLnNsaWNlKGRvdCArIDEpLnJlcGxhY2UoL1xcLi9nLCAnICcpKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaS5pbnNlcnQpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGUuZWxtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGosIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpXG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0odm5vZGUpO1xuICAgICAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHZub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBudWxsICYmIHR5cGVvZiBpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGlfMSA9IHZvaWQgMCwgbGlzdGVuZXJzID0gdm9pZCAwLCBybSA9IHZvaWQgMCwgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYoY2guc2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKGNoLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpXzEgPSAwOyBpXzEgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYnMucmVtb3ZlW2lfMV0oY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmKGlfMSA9IGNoLmRhdGEpICYmIGlzRGVmKGlfMSA9IGlfMS5ob29rKSAmJiBpc0RlZihpXzEgPSBpXzEucmVtb3ZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaV8xKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50RWxtLCBjaC5lbG0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBvbGRTdGFydElkeCA9IDAsIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICAgICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRTdGFydFZub2RlID0gb2xkQ2hbMF07XG4gICAgICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWzBdO1xuICAgICAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgICAgICB2YXIgb2xkS2V5VG9JZHg7XG4gICAgICAgIHZhciBpZHhJbk9sZDtcbiAgICAgICAgdmFyIGVsbVRvTW92ZTtcbiAgICAgICAgdmFyIGJlZm9yZTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07IC8vIFZub2RlIG1pZ2h0IGhhdmUgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvbGRFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhvbGRFbmRWbm9kZS5lbG0pKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleVRvSWR4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeEluT2xkID0gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkge1xuICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtVG9Nb3ZlLnNlbCAhPT0gbmV3U3RhcnRWbm9kZS5zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgZWxtVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCB8fCBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ld0NoW25ld0VuZElkeCArIDFdID09IG51bGwgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4ICsgMV0uZWxtO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgaG9vaztcbiAgICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5kYXRhKSAmJiBpc0RlZihob29rID0gaS5ob29rKSAmJiBpc0RlZihpID0gaG9vay5wcmVwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2bm9kZS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy51cGRhdGVbaV0ob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSlcbiAgICAgICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZENoICE9PSBjaClcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMoZWxtLCBudWxsLCBjaCwgMCwgY2gubGVuZ3RoIC0gMSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9sZFZub2RlLnRleHQgIT09IHZub2RlLnRleHQpIHtcbiAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sIHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0RlZihob29rKSAmJiBpc0RlZihpID0gaG9vay5wb3N0cGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBhdGNoKG9sZFZub2RlLCB2bm9kZSkge1xuICAgICAgICB2YXIgaSwgZWxtLCBwYXJlbnQ7XG4gICAgICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wcmUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucHJlW2ldKCk7XG4gICAgICAgIGlmICghaXNWbm9kZShvbGRWbm9kZSkpIHtcbiAgICAgICAgICAgIG9sZFZub2RlID0gZW1wdHlOb2RlQXQob2xkVm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYW1lVm5vZGUob2xkVm5vZGUsIHZub2RlKSkge1xuICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgICAgICBwYXJlbnQgPSBhcGkucGFyZW50Tm9kZShlbG0pO1xuICAgICAgICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50LCB2bm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhlbG0pKTtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50LCBbb2xkVm5vZGVdLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWVbaV0uZGF0YS5ob29rLmluc2VydChpbnNlcnRlZFZub2RlUXVldWVbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucG9zdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wb3N0W2ldKCk7XG4gICAgICAgIHJldHVybiB2bm9kZTtcbiAgICB9O1xufVxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNuYWJiZG9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGhfMSA9IHJlcXVpcmUoXCIuL2hcIik7XG5mdW5jdGlvbiBjb3B5VG9UaHVuayh2bm9kZSwgdGh1bmspIHtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG4gICAgdm5vZGUuZGF0YS5mbiA9IHRodW5rLmRhdGEuZm47XG4gICAgdm5vZGUuZGF0YS5hcmdzID0gdGh1bmsuZGF0YS5hcmdzO1xuICAgIHRodW5rLmRhdGEgPSB2bm9kZS5kYXRhO1xuICAgIHRodW5rLmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgdGh1bmsudGV4dCA9IHZub2RlLnRleHQ7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xufVxuZnVuY3Rpb24gaW5pdCh0aHVuaykge1xuICAgIHZhciBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciB2bm9kZSA9IGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGN1ci5hcmdzKTtcbiAgICBjb3B5VG9UaHVuayh2bm9kZSwgdGh1bmspO1xufVxuZnVuY3Rpb24gcHJlcGF0Y2gob2xkVm5vZGUsIHRodW5rKSB7XG4gICAgdmFyIGksIG9sZCA9IG9sZFZub2RlLmRhdGEsIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIG9sZEFyZ3MgPSBvbGQuYXJncywgYXJncyA9IGN1ci5hcmdzO1xuICAgIGlmIChvbGQuZm4gIT09IGN1ci5mbiB8fCBvbGRBcmdzLmxlbmd0aCAhPT0gYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY29weVRvVGh1bmsoY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyksIHRodW5rKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAob2xkQXJnc1tpXSAhPT0gYXJnc1tpXSkge1xuICAgICAgICAgICAgY29weVRvVGh1bmsoY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyksIHRodW5rKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb3B5VG9UaHVuayhvbGRWbm9kZSwgdGh1bmspO1xufVxuZXhwb3J0cy50aHVuayA9IGZ1bmN0aW9uIHRodW5rKHNlbCwga2V5LCBmbiwgYXJncykge1xuICAgIGlmIChhcmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXJncyA9IGZuO1xuICAgICAgICBmbiA9IGtleTtcbiAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gaF8xLmgoc2VsLCB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBob29rOiB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCB9LFxuICAgICAgICBmbjogZm4sXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnRodW5rO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGh1bmsuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnRzLnZub2RlID0gdm5vZGU7XG5leHBvcnRzLmRlZmF1bHQgPSB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcCIsIi8qXHJcbiAgQGZsb3dcclxuICBSb290IGNvbXBvbmVudFxyXG4qL1xyXG5pbXBvcnQgdHlwZSB7IENvbmZpZywgQWN0aW9uIH0gZnJvbSBcIi4vbGliL2pldGl4XCI7XHJcbmltcG9ydCB7IGNvbXBvbmVudCB9IGZyb20gXCIuL2xpYi9qZXRpeFwiO1xyXG5pbXBvcnQgeyBoIH0gZnJvbSBcIi4vbGliL3Zkb21cIjtcclxuaW1wb3J0IGNvdW50ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jb3VudGVyXCI7XHJcblxyXG5cclxudHlwZSBQcm9wcyA9IHt8XHJcbnx9O1xyXG5cclxudHlwZSBNb2RlbCA9IHt8XHJcbiAgICB0aGVtZTogVGhlbWU7XHJcbnx9O1xyXG5cclxudHlwZSBNc2cgPSBcIlNldFRoZW1lXCI7XHJcblxyXG50eXBlIFRoZW1lID0gXCJkZWZhdWx0XCIgfCBcImRhcmtcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQoKGFjdGlvbjogQWN0aW9uPE1zZz4sIHByb3BzOiBQcm9wcykgPT4gKHtcclxuXHJcbiAgICBpbml0aWFsTW9kZWw6IHtcclxuICAgICAgICB0aGVtZTogXCJkZWZhdWx0XCJcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdGlhbEFjdGlvbjogdW5kZWZpbmVkLFxyXG5cclxuICAgIHVwZGF0ZToge1xyXG4gICAgICAgIFNldFRoZW1lOiAobW9kZWwsIHsgdGhlbWUgfTogeyB0aGVtZTogVGhlbWUgfSkgPT4ge1xyXG4gICAgICAgICAgICBtb2RlbC50aGVtZSA9IHRoZW1lO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdmlldyhpZDogc3RyaW5nLCBwcm9wczogUHJvcHMsIG1vZGVsOiBNb2RlbCkge1xyXG4gICAgICAgIHJldHVybiBoKFwiZGl2LnBhZ2UuXCIgKyBtb2RlbC50aGVtZSwgW1xyXG4gICAgICAgICAgICBoKFwiZGl2LmludHJvXCIsIFwiQWxsIGNvbXBvbmVudCBhY3Rpb25zLCBzdGF0ZSBhbmQgcmVuZGVycyBhcmUgbG9nZ2VkIHRvIHRoZSBkZXZlbG9wZXIgdG9vbHMgY29uc29sZS5cIiksXHJcbiAgICAgICAgICAgIGNvdW50ZXIoXCJjb3VudGVyLTBcIiwgeyBzdGFydDogMCB9KSxcclxuICAgICAgICAgICAgY291bnRlcihcImNvdW50ZXItMVwiLCB7IHN0YXJ0OiAtMSB9KSxcclxuICAgICAgICAgICAgaChcImJ1dHRvblwiLFxyXG4gICAgICAgICAgICAgICAgeyBvbjogeyBjbGljazogYWN0aW9uKFwiU2V0VGhlbWVcIiwgeyB0aGVtZTogXCJkZWZhdWx0XCIgfSkgfSB9LFxyXG4gICAgICAgICAgICAgICAgXCJMaWdodCB0aGVtZVwiKSxcclxuICAgICAgICAgICAgaChcImJ1dHRvblwiLFxyXG4gICAgICAgICAgICAgICAgeyBvbjogeyBjbGljazogYWN0aW9uKFwiU2V0VGhlbWVcIiwgeyB0aGVtZTogXCJkYXJrXCIgfSkgfSB9LFxyXG4gICAgICAgICAgICAgICAgXCJEYXJrIHRoZW1lXCIpXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59OiBDb25maWc8TW9kZWwsIE1zZz4pKTtcclxuIiwiLypcclxuICBAZmxvd1xyXG4gIENvdW50ZXIgY29tcG9uZW50XHJcbiovXHJcbmltcG9ydCB0eXBlIHsgQ29uZmlnLCBBY3Rpb24gfSBmcm9tIFwiLi4vbGliL2pldGl4XCI7XHJcbmltcG9ydCB7IGNvbXBvbmVudCB9IGZyb20gXCIuLi9saWIvamV0aXhcIjtcclxuaW1wb3J0IHsgaCB9IGZyb20gXCIuLi9saWIvdmRvbVwiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9uIGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xyXG5cclxuXHJcbnR5cGUgUHJvcHMgPSB7fFxyXG4gICAgK3N0YXJ0OiBudW1iZXI7XHJcbnx9O1xyXG5cclxudHlwZSBNb2RlbCA9IHt8XHJcbiAgICBjb3VudGVyOiBudW1iZXI7XHJcbiAgICB3YXJuaW5nOiBzdHJpbmc7XHJcbnx9O1xyXG5cclxudHlwZSBNc2cgPVxyXG4gICAgXCJJbmNyZW1lbnRcIiB8XHJcbiAgICBcIkRlY3JlbWVudFwiIHxcclxuICAgIFwiVmFsaWRhdGVcIiB8XHJcbiAgICBcIlNldFdhcm5pbmdcIiB8XHJcbiAgICBcIkNsZWFyV2FybmluZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudCgoYWN0aW9uOiBBY3Rpb248TXNnPiwgcHJvcHM6IFByb3BzKSA9PiAoe1xyXG5cclxuICAgIGluaXRpYWxNb2RlbDoge1xyXG4gICAgICAgIGNvdW50ZXI6IHByb3BzLnN0YXJ0LFxyXG4gICAgICAgIHdhcm5pbmc6IFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdGlhbEFjdGlvbjogYWN0aW9uKFwiVmFsaWRhdGVcIiksXHJcblxyXG4gICAgdXBkYXRlOiB7XHJcbiAgICAgICAgLy8gQSBoYW5kbGVyIHVwZGF0ZXMgYG1vZGVsYCBhbmQgcmV0dXJucyBhbnkgbmV4dCBhY3Rpb24ocyksXHJcbiAgICAgICAgLy8gb3IgYSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB3aXRoIG5leHQgYWN0aW9uKHMpXHJcbiAgICAgICAgSW5jcmVtZW50OiAobW9kZWwsIHsgc3RlcCB9OiB7IHN0ZXA6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgIG1vZGVsLmNvdW50ZXIgKz0gc3RlcDtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbihcIlZhbGlkYXRlXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRGVjcmVtZW50OiAobW9kZWwsIHsgc3RlcCB9OiB7IHN0ZXA6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgIG1vZGVsLmNvdW50ZXIgLT0gc3RlcDtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbihcIlZhbGlkYXRlXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVmFsaWRhdGU6IG1vZGVsID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihcIkNsZWFyV2FybmluZ1wiKSxcclxuICAgICAgICAgICAgICAgIC8vIEFzeW5jXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZUNvdW50KG1vZGVsLmNvdW50ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odGV4dCA9PiBhY3Rpb24oXCJTZXRXYXJuaW5nXCIsIHsgdGV4dCB9KSlcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNldFdhcm5pbmc6IChtb2RlbCwgeyB0ZXh0IH06IHsgdGV4dDogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICAgICAgbW9kZWwud2FybmluZyA9IHRleHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBDbGVhcldhcm5pbmc6IG1vZGVsID0+IHtcclxuICAgICAgICAgICAgbW9kZWwud2FybmluZyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB2aWV3KGlkOiBzdHJpbmcsIHByb3BzOiBQcm9wcywgbW9kZWw6IE1vZGVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGgoXCJkaXYuY291bnRlclwiLCBbXHJcbiAgICAgICAgICAgIGgoXCJidXR0b25cIixcclxuICAgICAgICAgICAgICAgIHsgb246IHsgY2xpY2s6IGFjdGlvbihcIkluY3JlbWVudFwiLCB7IHN0ZXA6IDEgfSkgfSB9LFxyXG4gICAgICAgICAgICAgICAgXCIrXCIpLFxyXG4gICAgICAgICAgICBoKFwiZGl2XCIsIFN0cmluZyhtb2RlbC5jb3VudGVyKSksXHJcbiAgICAgICAgICAgIGgoXCJidXR0b25cIixcclxuICAgICAgICAgICAgICAgIHsgb246IHsgY2xpY2s6IGFjdGlvbihcIkRlY3JlbWVudFwiLCB7IHN0ZXA6IDEgfSkgfSB9LFxyXG4gICAgICAgICAgICAgICAgXCItXCIpLFxyXG5cclxuICAgICAgICAgICAgLy8gQ2hpbGQgY29tcG9uZW50IC0gYG5vdGlmaWNhdGlvbmAgbW9kdWxlXHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbihgJHtpZH0td2FybmluZ2AsIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IG1vZGVsLndhcm5pbmcsXHJcbiAgICAgICAgICAgICAgICBkaXNtaXNzQWN0aW9uOiBhY3Rpb24oXCJDbGVhcldhcm5pbmdcIilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbn06IENvbmZpZzxNb2RlbCwgTXNnPikpO1xyXG5cclxuXHJcbi8vIEV4cG9ydCBmb3IgdGVzdHNcclxuZXhwb3J0IGZ1bmN0aW9uIGlzTmVnYXRpdmUobjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gbiA8IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlQ291bnQobjogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoaXNOZWdhdGl2ZShuKSA/IFwiTmVnYXRpdmUhXCIgOiBcIlwiKSwgNTAwKTtcclxuICAgIH0pO1xyXG59XHJcbiIsIi8qXG4gIEBmbG93XG4gIE5vdGlmaWNhdGlvbiBjb21wb25lbnRcbiovXG5pbXBvcnQgdHlwZSB7IENvbmZpZywgQWN0aW9uIH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xuaW1wb3J0IHsgY29tcG9uZW50IH0gZnJvbSBcIi4uL2xpYi9qZXRpeFwiO1xuaW1wb3J0IHsgaCB9IGZyb20gXCIuLi9saWIvdmRvbVwiO1xuXG5cbnR5cGUgUHJvcHMgPSB7fFxuICAgICt0ZXh0OiBzdHJpbmc7XG4gICAgK2Rpc21pc3NBY3Rpb246ICgpID0+IHZvaWQ7XG58fTtcblxudHlwZSBNb2RlbCA9IHt8XG4gICAgc2hvdzogYm9vbGVhbjtcbnx9O1xuXG50eXBlIE1zZyA9XG4gICAgXCJEaXNtaXNzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50KChhY3Rpb246IEFjdGlvbjxNc2c+LCBwcm9wczogUHJvcHMpID0+ICh7XG5cbiAgICBpbml0aWFsTW9kZWw6IHtcbiAgICAgICAgc2hvdzogdHJ1ZVxuICAgIH0sXG5cbiAgICBpbml0aWFsQWN0aW9uOiB1bmRlZmluZWQsXG5cbiAgICB1cGRhdGU6IHtcbiAgICAgICAgRGlzbWlzczogbW9kZWwgPT4ge1xuICAgICAgICAgICAgbW9kZWwuc2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzLmRpc21pc3NBY3Rpb247XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdmlldyhpZDogc3RyaW5nLCBwcm9wczogUHJvcHMsIG1vZGVsOiBNb2RlbCkge1xuICAgICAgICByZXR1cm4gaChcImRpdi5ub3RpZmljYXRpb25cIixcbiAgICAgICAgICAgIHsgY2xhc3M6IHsgc2hvdzogbW9kZWwuc2hvdyAmJiBwcm9wcy50ZXh0Lmxlbmd0aCB9IH0sXG4gICAgICAgICAgICBbIHByb3BzLnRleHQsXG4gICAgICAgICAgICAgICAgaCgnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgeyBvbjogeyBjbGljazogYWN0aW9uKFwiRGlzbWlzc1wiKSB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFwiRGlzbWlzc1wiKVxuICAgICAgICAgICAgXSk7XG4gICAgfVxuXG59OiBDb25maWc8TW9kZWwsIE1zZz4pKTtcbiIsIi8qXG4gIEBmbG93XG4gIGBNb2RlbCwgVXBkYXRlLCBWaWV3YCB3aXJpbmdcbiovXG5pbXBvcnQgeyBwYXRjaCwgaCB9IGZyb20gXCIuL3Zkb21cIjtcbmltcG9ydCBhcHAgZnJvbSBcIi4uL2FwcFwiO1xuXG5cbnR5cGUgVGh1bmsgPSAoKSA9PiB2b2lkO1xuXG50eXBlIE5leHQgPVxuICAgIFRodW5rIHwgUHJvbWlzZTwqPiB8IEFycmF5PFRodW5rIHwgUHJvbWlzZTwqPj4gfCB2b2lkO1xuXG5leHBvcnQgdHlwZSBBY3Rpb248bXNnPiA9XG4gICAgKHRhZzogbXNnLCBkYXRhPzoge30pID0+IFRodW5rO1xuXG5leHBvcnQgdHlwZSBDb25maWc8bSwgbXNnPiA9IHt8XG4gICAgK2luaXRpYWxNb2RlbDogbSxcbiAgICAraW5pdGlhbEFjdGlvbj86IE5leHQsXG4gICAgK3VwZGF0ZTogeyArW3RhZzogbXNnXTogKG0sIGRhdGE6ICopID0+IE5leHQgfSxcbiAgICArdmlldzogKGlkOiBzdHJpbmcsIHByb3BzOiAqLCBtb2RlbDogbSkgPT4gVm5vZGVcbnx9XG5cbnR5cGUgR2V0Q29uZmlnRm48bSwgcCwgbXNnPiA9XG4gICAgKEFjdGlvbjxtc2c+LCBwcm9wczogcCkgPT4gQ29uZmlnPG0sIG1zZz47XG5cbmV4cG9ydCB0eXBlIFZub2RlID0ge1xuICAgIGVsbTogSFRNTEVsZW1lbnQgJiB7IHJlbmRlcjogKiA9PiBWbm9kZSB9XG59O1xuXG5cbmNvbnN0IHJvb3RJZCA9IFwiYXBwXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnQ8bToge30sIHA6IHt9LCBtc2c+KFxuICAgIC8vIFBhc3MgaW4gY2FsbGJhY2sgdGhhdCByZXR1cm5zIGNvbXBvbmVudCBjb25maWdcbiAgICBnZXRDb25maWc6IEdldENvbmZpZ0ZuPG0sIHAsIG1zZz5cbik6IChpZDogc3RyaW5nLCBwcm9wczogcCkgPT4gVm5vZGUge1xuICAgIC8vIFJldHVybnMgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYnkgcGFyZW50IGNvbXBvbmVudCBlLmcuIGBjb3VudGVyKFwiY291bnRlci0wXCIsIHsgc3RhcnQ6IDAgfSlgXG4gICAgcmV0dXJuIChpZCwgcHJvcHMpID0+IGluaXQoaWQsIHByb3BzLCBnZXRDb25maWcpO1xufVxuXG5mdW5jdGlvbiBpbml0PG06IHt9LCBwOiB7fSwgbXNnPihcbiAgICBpZDogc3RyaW5nLFxuICAgIHByb3BzOiBwLFxuICAgIGdldENvbmZpZzogR2V0Q29uZmlnRm48bSwgcCwgbXNnPlxuKTogVm5vZGUge1xuICAgIGRlZXBGcmVlemUocHJvcHMpOyAvLyBARGV2LW9ubHlcblxuICAgIC8vIElmIGNvbXBvbmVudCBhbHJlYWR5IGV4aXN0cywganVzdCBydW4gcmVuZGVyKCkgYWdhaW5cbiAgICBsZXQgY29tcG9uZW50Um9vdCA9IHJlbmRlckJ5SWQoaWQsIHByb3BzKTtcbiAgICBpZiAoY29tcG9uZW50Um9vdCkge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50Um9vdDtcbiAgICB9XG5cbiAgICBjb25zdCBjb25maWc6IENvbmZpZzxtLCBtc2c+ID0gZ2V0Q29uZmlnKGFjdGlvbiwgcHJvcHMpO1xuICAgIGxldCBtb2RlbDogbSA9IGNvbmZpZy5pbml0aWFsTW9kZWw7XG4gICAgbGV0IG5vUmVuZGVyOiBudW1iZXIgPSAwO1xuXG4gICAgZnVuY3Rpb24gYWN0aW9uKHRhZzogbXNnLCBkYXRhID0ge30pOiBUaHVuayB7XG4gICAgICAgIHJldHVybiAoKSA9PiB1cGRhdGUodGFnLCBkYXRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUodGFnOiBtc2csIGRhdGE6IHt9KTogdm9pZCB7XG4gICAgICAgIC8vIExpbmVzIG1hcmtlZCBgQERldi1vbmx5YCBhcmUgcmVtb3ZlZCBieSBgcHJvZGAgYnVpbGRcbiAgICAgICAgbG9nLnVwZGF0ZVN0YXJ0KGlkLCBtb2RlbCwgdGFnLCBkYXRhKTsgLy8gQERldi1vbmx5XG4gICAgICAgIG1vZGVsID0gY2xvbmUobW9kZWwpOyAgICAgICAgICAgICAgICAgIC8vIEBEZXYtb25seVxuICAgICAgICBjb25zdCBuZXh0ID0gY29uZmlnLnVwZGF0ZVt0YWddLmFwcGx5KG51bGwsIFttb2RlbCwgZGF0YV0pO1xuICAgICAgICBkZWVwRnJlZXplKG1vZGVsKTsgICAgICAgICAgICAgICAgICAgICAvLyBARGV2LW9ubHlcbiAgICAgICAgbG9nLnVwZGF0ZUVuZChtb2RlbCk7ICAgICAgICAgICAgICAgICAgLy8gQERldi1vbmx5XG4gICAgICAgIHJ1bihuZXh0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4obmV4dDogTmV4dCk6IHZvaWQge1xuICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgIHJlbmRlcihwcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobmV4dCkpIHtcbiAgICAgICAgICAgIG5vUmVuZGVyKys7XG4gICAgICAgICAgICBuZXh0LmZvckVhY2gocnVuKTtcbiAgICAgICAgICAgIG5vUmVuZGVyLS07XG4gICAgICAgICAgICByZW5kZXIocHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXh0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbmV4dC50aGVuKHJ1bik7XG4gICAgICAgICAgICByZW5kZXIocHJvcHMpOyAvLyBFbmQgb2Ygc3luYyBjaGFpblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyKHByb3BzOiBwKTogP1Zub2RlIHtcbiAgICAgICAgaWYgKCFub1JlbmRlcikge1xuICAgICAgICAgICAgcGF0Y2goXG4gICAgICAgICAgICAgICAgY29tcG9uZW50Um9vdCxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRSb290ID0gY29uZmlnLnZpZXcoaWQsIHByb3BzLCBtb2RlbClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRSZWZzKGNvbXBvbmVudFJvb3QsIGlkLCByZW5kZXIpO1xuICAgICAgICAgICAgbG9nLnJlbmRlcihpZCk7IC8vIEBEZXYtb25seVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRSb290O1xuICAgIH1cblxuICAgIGlmIChjb25maWcuaW5pdGlhbEFjdGlvbikge1xuICAgICAgICBub1JlbmRlcisrO1xuICAgICAgICBydW4oY29uZmlnLmluaXRpYWxBY3Rpb24pO1xuICAgICAgICBub1JlbmRlci0tO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFJvb3QgPSBjb25maWcudmlldyhpZCwgcHJvcHMsIG1vZGVsKTtcbiAgICBzZXRSZWZzKGNvbXBvbmVudFJvb3QsIGlkLCByZW5kZXIpO1xuICAgIHJldHVybiBjb21wb25lbnRSb290O1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgcGF0Y2goXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvb3RJZCksXG4gICAgICAgIGFwcChyb290SWQsIHsgLyogUHJvcHMgKi8gfSlcbiAgICApO1xufSk7XG5cbmZ1bmN0aW9uIHJlbmRlckJ5SWQ8cDoge30+KGlkOiBzdHJpbmcsIHByb3BzOiBwKTogP1Zub2RlIHtcbiAgICBjb25zdCBkb21Ob2RlOiA/eyByZW5kZXI/OiBwID0+IFZub2RlIH0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKGRvbU5vZGUgJiYgZG9tTm9kZS5yZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIGRvbU5vZGUucmVuZGVyKHByb3BzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFJlZnMoY29tcG9uZW50Um9vdDogVm5vZGUsIGlkOiBzdHJpbmcsIHJlbmRlcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAvLyBSdW4gYWZ0ZXIgYWxsIHN5bmMgcGF0Y2hlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoY29tcG9uZW50Um9vdCkge1xuICAgICAgICAvLyBTZXQgYGlkYCBhbmQgYSBoYW5kbGUgdG8gdGhlIGByZW5kZXIoKWAgY2xvc3VyZSBvbiBET00gZWxlbWVudFxuICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYSBzaW1wbGUgc3RhdGUvaWQgcGFpcmluZywgYW5kIHRoZSBWRE9NIGxpYiB0YWtlcyBjYXJlIG9mIGNsZWFyaW5nIG1lbW9yeVxuICAgICAgICAgICAgY29tcG9uZW50Um9vdC5lbG0uaWQgPSBpZDtcbiAgICAgICAgICAgIGNvbXBvbmVudFJvb3QuZWxtLnJlbmRlciA9IHJlbmRlcjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjbG9uZTxhOiB7fT4obzogYSk6IGEge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG8pKTtcbn1cblxuZnVuY3Rpb24gZGVlcEZyZWV6ZTxhOiB7fT4obzogYSk6IGEge1xuICAgIE9iamVjdC5mcmVlemUobyk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykuZm9yRWFjaChcbiAgICAgICAgKHA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkocCkgJiZcbiAgICAgICAgICAgICAgICBvW3BdICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgKHR5cGVvZiBvW3BdID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvW3BdID09PSBcImZ1bmN0aW9uXCIpICYmXG4gICAgICAgICAgICAgICAgIU9iamVjdC5pc0Zyb3plbihvW3BdKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZGVlcEZyZWV6ZShvW3BdKTtcbiAgICAgICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbztcbn1cblxuY29uc3QgbG9nID0ge1xuICAgIGN1cnJlbnRJZDogXCJcIixcbiAgICBsb2dTdHlsZTogXCJiYWNrZ3JvdW5kOiAjMjIyOyBwYWRkaW5nOiA0cHggMTBweDsgYm9yZGVyLXJhZGl1czogNXB4O1wiLFxuICAgIHVwZGF0ZVN0YXJ0KGlkLCBtb2RlbCwgdGFnLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRJZCAhPT0gaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXAoYCVjIyR7aWR9YCwgXCJjb2xvcjogIzY5ZlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY01vZGVsICA6ICR7SlNPTi5zdHJpbmdpZnkobW9kZWwpfWAsIHRoaXMubG9nU3R5bGUgKyBcImNvbG9yOiAjZmZmXCIpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SWQgPSBpZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgJWNBY3Rpb24gOiAke1N0cmluZyh0YWcpfWAsIHRoaXMubG9nU3R5bGUgKyBcImNvbG9yOiAjZWU1XCIpO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNEYXRhICAgOiAke0pTT04uc3RyaW5naWZ5KGRhdGEpfWAsIHRoaXMubG9nU3R5bGUgKyBcImNvbG9yOiAjZWU1XCIpOyAgIC8vIEBEZXYtb25seVxuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGVFbmQobW9kZWwpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjTW9kZWwgIDogJHtKU09OLnN0cmluZ2lmeShtb2RlbCl9YCwgdGhpcy5sb2dTdHlsZSArIFwiY29sb3I6ICNmZmZcIik7ICAvLyBARGV2LW9ubHlcbiAgICB9LFxuICAgIHJlbmRlcihpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWPin7MgUmVuZGVyICMke2lkfWAsIFwiY29sb3I6ICM4ODhcIik7XG4gICAgfVxufTtcbiIsIi8qXG4gIEEgd3JhcHBlciBhcm91bmQgYGh0dHBzOi8vZ2l0aHViLmNvbS9zbmFiYmRvbS9zbmFiYmRvbWBcbiovXG5jb25zdCBzbmFiYmRvbSA9IHJlcXVpcmUoXCJzbmFiYmRvbVwiKTtcbmNvbnN0IHBhdGNoID0gc25hYmJkb20uaW5pdChbXG4gICAgcmVxdWlyZShcInNuYWJiZG9tL21vZHVsZXMvY2xhc3NcIikuZGVmYXVsdCxcbiAgICByZXF1aXJlKFwic25hYmJkb20vbW9kdWxlcy9wcm9wc1wiKS5kZWZhdWx0LFxuICAgIHJlcXVpcmUoXCJzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzXCIpLmRlZmF1bHRcbl0pO1xuY29uc3QgaCA9IHJlcXVpcmUoXCJzbmFiYmRvbS9oXCIpLmRlZmF1bHQ7XG5cbmZ1bmN0aW9uIHNldEhvb2sodm5vZGUsIGhvb2tOYW1lLCBjYWxsYmFjaykge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zbmFiYmRvbS9zbmFiYmRvbSNob29rc1xuICAgIC8vIGluaXQgICAgICAgIGEgdm5vZGUgaGFzIGJlZW4gYWRkZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZub2RlXG4gICAgLy8gY3JlYXRlICAgICAgYSBET00gZWxlbWVudCBoYXMgYmVlbiBjcmVhdGVkIGJhc2VkIG9uIGEgdm5vZGUgICAgICAgZW1wdHlWbm9kZSwgdm5vZGVcbiAgICAvLyBpbnNlcnQgICAgICBhbiBlbGVtZW50IGhhcyBiZWVuIGluc2VydGVkIGludG8gdGhlIERPTSAgICAgICAgICAgICB2bm9kZVxuICAgIC8vIHByZXBhdGNoICAgIGFuIGVsZW1lbnQgaXMgYWJvdXQgdG8gYmUgcGF0Y2hlZCAgICAgICAgICAgICAgICAgICAgIG9sZFZub2RlLCB2bm9kZVxuICAgIC8vIHVwZGF0ZSAgICAgIGFuIGVsZW1lbnQgaXMgYmVpbmcgdXBkYXRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZub2RlLCB2bm9kZVxuICAgIC8vIHBvc3RwYXRjaCAgIGFuIGVsZW1lbnQgaGFzIGJlZW4gcGF0Y2hlZCAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZub2RlLCB2bm9kZVxuICAgIC8vIGRlc3Ryb3kgICAgIGFuIGVsZW1lbnQgaXMgZGlyZWN0bHkgb3IgaW5kaXJlY3RseSBiZWluZyByZW1vdmVkICAgIHZub2RlXG4gICAgLy8gcmVtb3ZlICAgICAgYW4gZWxlbWVudCBpcyBkaXJlY3RseSBiZWluZyByZW1vdmVkIGZyb20gdGhlIERPTSAgICAgdm5vZGUsIHJlbW92ZUNhbGxiYWNrXG4gICAgdm5vZGUuZGF0YSA9IHZub2RlLmRhdGEgfHwge307XG4gICAgdm5vZGUuZGF0YS5ob29rID0gdm5vZGUuZGF0YS5ob29rIHx8IHt9O1xuICAgIHZub2RlLmRhdGEuaG9va1tob29rTmFtZV0gPSBjYWxsYmFjaztcbn1cblxuZXhwb3J0IHsgcGF0Y2gsIGgsIHNldEhvb2sgfTtcbiJdfQ==
