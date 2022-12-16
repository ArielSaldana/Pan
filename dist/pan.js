/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Pan"] = factory();
	else
		root["Pan"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Pan.ts":
/*!********************!*\
  !*** ./src/Pan.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Screen = exports.Mouse = exports.EventEmitter = void 0;\nconst Mouse_1 = __importDefault(__webpack_require__(/*! ./tools/Mouse */ \"./src/tools/Mouse.ts\"));\nexports.Mouse = Mouse_1.default;\nconst EventEmitter_1 = __webpack_require__(/*! ./event-emitter/EventEmitter */ \"./src/event-emitter/EventEmitter.ts\");\nObject.defineProperty(exports, \"EventEmitter\", ({ enumerable: true, get: function () { return EventEmitter_1.EventEmitter; } }));\nconst Screen_1 = __importDefault(__webpack_require__(/*! ./tools/Screen */ \"./src/tools/Screen.ts\"));\nexports.Screen = Screen_1.default;\n\n\n//# sourceURL=webpack://Pan/./src/Pan.ts?");

/***/ }),

/***/ "./src/animation-queue/AnimationQueue.ts":
/*!***********************************************!*\
  !*** ./src/animation-queue/AnimationQueue.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AnimationQueue = void 0;\nconst AnimationQueueState_1 = __importDefault(__webpack_require__(/*! ./AnimationQueueState */ \"./src/animation-queue/AnimationQueueState.ts\"));\nclass AnimationQueue {\n    queue = [];\n    static instance;\n    state = new AnimationQueueState_1.default();\n    constructor() { }\n    static getInstance() {\n        if (AnimationQueue.instance === undefined) {\n            AnimationQueue.instance = new AnimationQueue();\n        }\n        return AnimationQueue.instance;\n    }\n    addEvent(key, func) {\n        let found = false;\n        for (const item of this.queue) {\n            if (item.key === key) {\n                item.callstack.push(func);\n                found = true;\n            }\n        }\n        if (!found) {\n            this.queue.push({\n                key,\n                callstack: [func]\n            });\n        }\n        if (!this.state.requestAnimationFrame.active) {\n            this.startRequestAnimationFrame();\n        }\n    }\n    processEvents() {\n        if (this.checkAnimationFrameStatus(this.queue)) {\n            const lengthSnapShot = this.queue.length;\n            for (let i = 0; i < lengthSnapShot; i++) {\n                const animation = this.queue[i];\n                animation.callstack[animation.callstack.length - 1]();\n            }\n            if (lengthSnapShot !== 0) {\n                this.queue.splice(0, lengthSnapShot);\n            }\n            this.queue.splice(0, lengthSnapShot);\n            requestAnimationFrame(this.processEvents.bind(this));\n        }\n    }\n    checkAnimationFrameStatus(animationQueue) {\n        if (animationQueue.length === 0) {\n            this.state.requestAnimationFrame.consecutiveEmptyCalls += 1;\n        }\n        else {\n            this.state.requestAnimationFrame.consecutiveEmptyCalls = 0;\n        }\n        if (this.state.requestAnimationFrame.consecutiveEmptyCalls >= 600) {\n            this.endRequestAnimationFrame();\n            return false;\n        }\n        return true;\n    }\n    startRequestAnimationFrame() {\n        this.state.requestAnimationFrame.consecutiveEmptyCalls = 0;\n        this.state.requestAnimationFrame.active = true;\n        this.state.requestAnimationFrame.reference = requestAnimationFrame(this.processEvents.bind(this));\n        console.log('starting frame callstack');\n    }\n    endRequestAnimationFrame() {\n        cancelAnimationFrame(this.state.requestAnimationFrame.reference);\n        this.state.requestAnimationFrame.active = false;\n        console.log('ending frame callstack');\n    }\n}\nexports.AnimationQueue = AnimationQueue;\n\n\n//# sourceURL=webpack://Pan/./src/animation-queue/AnimationQueue.ts?");

/***/ }),

/***/ "./src/animation-queue/AnimationQueueState.ts":
/*!****************************************************!*\
  !*** ./src/animation-queue/AnimationQueueState.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst RequestAnimationFrameState_1 = __importDefault(__webpack_require__(/*! ./RequestAnimationFrameState */ \"./src/animation-queue/RequestAnimationFrameState.ts\"));\nclass State {\n    requestAnimationFrame = new RequestAnimationFrameState_1.default();\n}\nexports[\"default\"] = State;\n\n\n//# sourceURL=webpack://Pan/./src/animation-queue/AnimationQueueState.ts?");

/***/ }),

/***/ "./src/animation-queue/RequestAnimationFrameState.ts":
/*!***********************************************************!*\
  !*** ./src/animation-queue/RequestAnimationFrameState.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass RequestAnimationFrameState {\n    reference;\n    active;\n    consecutiveEmptyCalls;\n    constructor() {\n        this.reference = null;\n        this.active = false;\n        this.consecutiveEmptyCalls = 0;\n    }\n}\nexports[\"default\"] = RequestAnimationFrameState;\n\n\n//# sourceURL=webpack://Pan/./src/animation-queue/RequestAnimationFrameState.ts?");

/***/ }),

/***/ "./src/event-emitter/EventEmitter.ts":
/*!*******************************************!*\
  !*** ./src/event-emitter/EventEmitter.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EventEmitter = void 0;\nconst AnimationQueue_1 = __webpack_require__(/*! ../animation-queue/AnimationQueue */ \"./src/animation-queue/AnimationQueue.ts\");\nclass EventEmitter {\n    animationQueue = AnimationQueue_1.AnimationQueue.getInstance();\n    eventMap = new Map();\n    functionsMap = new Map();\n    beforeOnEventListenerSetup(eventKey) { }\n    setupEvents(eventKey) {\n        console.log(this.events, eventKey);\n        if (this.events.has(eventKey)) {\n            this.registerEventListenerFunction(eventKey, {\n                initFunction: this.events.get(eventKey)?.initFunction.bind(this),\n                destroyFunction: this.events.get(eventKey)?.destroyFunction.bind(this)\n            });\n        }\n        else {\n            console.warn('This is not a supported Event');\n        }\n    }\n    internalEmit(eventKey, eventInformation) {\n        if (this.eventMap.has(eventKey)) {\n            this.eventMap.get(eventKey).forEach((value) => {\n                value(eventInformation);\n            });\n        }\n    }\n    internalOn(eventKey, eventCallback) {\n        this.beforeOnEventListenerSetup(eventKey);\n        this.setupEvents(eventKey);\n        let arr;\n        if (this.eventMap.get(eventKey) !== undefined) {\n            arr = this.eventMap.get(eventKey);\n        }\n        else {\n            arr = [];\n            this.eventMap.set(eventKey, arr);\n        }\n        arr.push(eventCallback);\n    }\n    emit(eventKey, eventInformation) {\n        this.internalEmit(eventKey, eventInformation);\n    }\n    on(eventKey, eventCallback) {\n        this.internalOn(eventKey, eventCallback);\n    }\n    registerEventListenerFunction(eventKey, eventFunction) {\n        if (!this.functionsMap.has(eventKey)) {\n            eventFunction.initFunction();\n            this.functionsMap.set(eventKey, eventFunction);\n        }\n        else {\n            console.warn('Function key already exists, calling register failed');\n        }\n    }\n    destroyEventEmitterFunction(eventKey) {\n        if (this.functionsMap.has(eventKey)) {\n            const registeredFunctions = this.functionsMap.get(eventKey);\n            if (registeredFunctions !== null && registeredFunctions !== undefined) {\n                registeredFunctions.destroyFunction();\n            }\n            this.functionsMap.delete(eventKey);\n        }\n        else {\n            console.warn('Function key does not exist, calling destroy failed');\n        }\n    }\n}\nexports.EventEmitter = EventEmitter;\n\n\n//# sourceURL=webpack://Pan/./src/event-emitter/EventEmitter.ts?");

/***/ }),

/***/ "./src/tools/Mouse.ts":
/*!****************************!*\
  !*** ./src/tools/Mouse.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst EventEmitter_1 = __webpack_require__(/*! ../event-emitter/EventEmitter */ \"./src/event-emitter/EventEmitter.ts\");\nclass Mouse extends EventEmitter_1.EventEmitter {\n    settings = {\n        isMouseOnMoveEnabled: false,\n        isMouseClickEnabled: false\n    };\n    events = new Map(Object.entries({\n        move: {\n            initFunction: () => { this.registerMouseMoveEventListener(); },\n            destroyFunction: () => { this.destroyMouseMoveEventListener(); }\n        },\n        click: {\n            initFunction: () => { this.registerMouseClickEventListener(); },\n            destroyFunction: () => { this.destroyMouseClickEventListener(); }\n        }\n    }));\n    mouseMove(eventInformation) {\n        const location = {\n            x: eventInformation.offsetX,\n            y: eventInformation.offsetY\n        };\n        this.emit('move', location);\n    }\n    mouseClick(eventInformation) {\n        let val = 0;\n        if (eventInformation.which === 1 || eventInformation.button === 0) {\n            val = 0; // left click\n        }\n        else if (eventInformation.which === 3 || eventInformation.button === 2) {\n            val = 1; // right click\n        }\n        const location = {\n            x: eventInformation.offsetX,\n            y: eventInformation.offsetY,\n            button: val\n        };\n        this.emit('click', location);\n    }\n    registerMouseMoveEventListener() {\n        if (!this.settings.isMouseOnMoveEnabled) {\n            window.addEventListener('mousemove', (ev) => {\n                this.mouseMove(ev);\n            });\n            this.settings.isMouseOnMoveEnabled = true;\n        }\n    }\n    destroyMouseMoveEventListener() {\n        window.removeEventListener('mousemove', this.mouseMove);\n        this.settings.isMouseOnMoveEnabled = false;\n    }\n    registerMouseClickEventListener() {\n        if (!this.settings.isMouseClickEnabled) {\n            window.addEventListener('click', (ev) => {\n                this.mouseClick(ev);\n            });\n            this.settings.isMouseClickEnabled = true;\n        }\n    }\n    destroyMouseClickEventListener() {\n        window.removeEventListener('click', this.mouseMove);\n        this.settings.isMouseClickEnabled = false;\n    }\n}\nexports[\"default\"] = Mouse;\n\n\n//# sourceURL=webpack://Pan/./src/tools/Mouse.ts?");

/***/ }),

/***/ "./src/tools/Screen.ts":
/*!*****************************!*\
  !*** ./src/tools/Screen.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst EventEmitter_1 = __webpack_require__(/*! ../event-emitter/EventEmitter */ \"./src/event-emitter/EventEmitter.ts\");\nclass Screen extends EventEmitter_1.EventEmitter {\n    settings = {\n        isScreenResizeEnabled: false\n    };\n    events = new Map(Object.entries({\n        resize: {\n            initFunction: () => { this.registerScreenResizeListener(); },\n            destroyFunction: () => { this.destroyScreenResizeListener(); }\n        }\n    }));\n    screenResize() {\n        const location = {\n            width: window.innerWidth,\n            height: window.innerHeight\n        };\n        this.emit('resize', location);\n    }\n    registerScreenResizeListener() {\n        if (!this.settings.isScreenResizeEnabled) {\n            window.addEventListener('resize', () => {\n                this.screenResize();\n            });\n            this.settings.isScreenResizeEnabled = true;\n        }\n    }\n    destroyScreenResizeListener() {\n        window.removeEventListener('resize', this.screenResize);\n        this.settings.isScreenResizeEnabled = false;\n    }\n}\nexports[\"default\"] = Screen;\n\n\n//# sourceURL=webpack://Pan/./src/tools/Screen.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Pan.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});