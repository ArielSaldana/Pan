!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Pan=t():e.Pan=t()}(this,(()=>(()=>{"use strict";var e={222:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Ticker=t.Viewport=t.Mouse=t.EventEmitter=void 0;const n=s(i(366));t.Mouse=n.default;const o=i(265);Object.defineProperty(t,"EventEmitter",{enumerable:!0,get:function(){return o.EventEmitter}});const r=s(i(959));t.Viewport=r.default;const a=s(i(825));t.Ticker=a.default},45:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AnimationQueue=void 0;const n=s(i(965));class o{queue=[];static instance;state=new n.default;constructor(){}static getInstance(){return void 0===o.instance&&(o.instance=new o),o.instance}addEvent(e,t){let i=!1;for(const s of this.queue)s.key===e&&(s.callstack.push(t),i=!0);i||this.queue.push({key:e,callstack:[t]}),this.state.requestAnimationFrame.active||this.startRequestAnimationFrame()}processEvents(){if(this.checkAnimationFrameStatus(this.queue)){const e=this.queue.length;for(let t=0;t<e;t++){const e=this.queue[t];e.callstack[e.callstack.length-1]()}0!==e&&this.queue.splice(0,e),this.queue.splice(0,e),requestAnimationFrame(this.processEvents.bind(this))}}checkAnimationFrameStatus(e){return 0===e.length?this.state.requestAnimationFrame.consecutiveEmptyCalls+=1:this.state.requestAnimationFrame.consecutiveEmptyCalls=0,!(this.state.requestAnimationFrame.consecutiveEmptyCalls>=600&&(this.endRequestAnimationFrame(),1))}startRequestAnimationFrame(){this.state.requestAnimationFrame.consecutiveEmptyCalls=0,this.state.requestAnimationFrame.active=!0,this.state.requestAnimationFrame.reference=requestAnimationFrame(this.processEvents.bind(this)),console.log("starting frame callstack")}endRequestAnimationFrame(){cancelAnimationFrame(this.state.requestAnimationFrame.reference),this.state.requestAnimationFrame.active=!1,console.log("ending frame callstack")}}t.AnimationQueue=o},965:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(i(627));t.default=class{requestAnimationFrame=new n.default}},627:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{reference;active;consecutiveEmptyCalls;constructor(){this.reference=null,this.active=!1,this.consecutiveEmptyCalls=0}}},265:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0;const s=i(45);t.EventEmitter=class{animationQueue=s.AnimationQueue.getInstance();isEventKeyIsValid(e){return this.events.has(e)}isEventInitialized(e){const t=this.events.get(e);return void 0!==t&&t.callbacks.length>0}getEvent(e){const t=this.events.get(e);if(void 0!==t)return t;throw Error("Event was not found")}on(e,t){if(!this.isEventKeyIsValid(e))throw new Error("this is not a supported event");const i=this.getEvent(e);this.isEventInitialized(e)||i.initFunction&&i.initFunction(),i.callbacks.push(t),this.afterListenerConfigured(t)}off(e){if(!this.isEventKeyIsValid(e))throw new Error("this is not a supported event");const t=this.getEvent(e);if(this.isEventInitialized(e)){for(;t.callbacks.length>0;)t.callbacks.pop();t.destroyFunction&&t.destroyFunction()}}emit(e,t){this.isEventKeyIsValid(e)&&this.getEvent(e).callbacks.forEach((e=>{e(t)}))}afterListenerConfigured(e){}}},366:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=i(265);class n extends s.EventEmitter{settings={isMouseOnMoveEnabled:!1,isMouseClickEnabled:!1};static instance;static getInstance(){return void 0===n.instance&&(n.instance=new n),n.instance}events=new Map(Object.entries({move:{initFunction:()=>{this.registerMouseMoveEventListener()},destroyFunction:()=>{this.destroyMouseMoveEventListener()},callbacks:[]},click:{initFunction:()=>{this.registerMouseClickEventListener()},destroyFunction:()=>{this.destroyMouseClickEventListener()},callbacks:[]}}));mouseMove(e){const t={x:e.offsetX,y:e.offsetY};this.emit("move",t)}mouseClick(e){let t=0;1===e.which||0===e.button?t=0:3!==e.which&&2!==e.button||(t=1);const i={x:e.offsetX,y:e.offsetY,button:t};this.emit("click",i)}registerMouseMoveEventListener(){this.settings.isMouseOnMoveEnabled||(window.addEventListener("mousemove",(e=>{this.mouseMove(e)})),this.settings.isMouseOnMoveEnabled=!0)}destroyMouseMoveEventListener(){window.removeEventListener("mousemove",this.mouseMove),this.settings.isMouseOnMoveEnabled=!1}registerMouseClickEventListener(){this.settings.isMouseClickEnabled||(window.addEventListener("click",(e=>{this.mouseClick(e)})),this.settings.isMouseClickEnabled=!0)}destroyMouseClickEventListener(){window.removeEventListener("click",this.mouseMove),this.settings.isMouseClickEnabled=!1}}t.default=n},825:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=i(265);class n extends s.EventEmitter{state={hasTickerStarted:!1};events=new Map(Object.entries({tick:{initFunction:()=>{this.tick()},destroyFunction:void 0,callbacks:[]}}));constructor(){super()}tick(){if(this.state.hasTickerStarted||(this.state.previousTick=new Date,this.state.startTime=this.state.previousTick,this.state.hasTickerStarted=!0),this.state.previousTick){const e=new Date,t=e.getTime()-this.state.previousTick.getTime();this.emit("tick",{delta:t}),this.state.previousTick=e}requestAnimationFrame(this.tick.bind(this))}after(e,t){}}t.default=n},959:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=i(265);class n extends s.EventEmitter{state={isViewportResizeEnabled:!1};settings={fireViewportInformationOnListen:!1};constructor(e){super(),void 0!==e&&(this.settings={...this.settings,...e})}static instance;static getInstance(e){return void 0===n.instance&&(n.instance=new n(e)),n.instance}events=new Map(Object.entries({resize:{initFunction:()=>{this.registerViewportResizeListener()},destroyFunction:()=>{this.destroyViewportResizeListener()},callbacks:[]}}));viewportResize(){const e={width:window.innerWidth,height:window.innerHeight};this.emit("resize",e)}registerViewportResizeListener(){this.state.isViewportResizeEnabled||(window.addEventListener("resize",(()=>{this.viewportResize()})),this.state.isViewportResizeEnabled=!0)}destroyViewportResizeListener(){window.removeEventListener("resize",this.viewportResize),this.state.isViewportResizeEnabled=!1}afterListenerConfigured(e){this.settings.fireViewportInformationOnListen&&e({width:window.innerWidth,height:window.innerHeight})}}t.default=n}},t={};return function i(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s].call(o.exports,o,o.exports,i),o.exports}(222)})()));