/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(2);

	const windowFunction = function(arg) {
	  let callbacks = [];

	  if (typeof(arg) === "string") {
	    let elements = document.querySelectorAll(arg);
	    elements = [].slice.call(elements);
	    return new DOMNodeCollection(elements);
	  } else if (arg instanceof HTMLElement) {
	    return new DOMNodeCollection([arg]);
	  } else if (arg instanceof Function) {
	    callbacks.push(arg);
	  }

	  document.addEventListener("DOMContentLoaded",() => {
	    callbacks.forEach(callback => {
	      callback();
	    });
	  });
	};

	const extendFunction = function(...args) {
	  let object = {};
	  args.forEach(arg => {
	    Object.keys(arg).forEach((key)=> {
	      object[key] = arg[key];
	    });
	  });
	  return object;
	};

	window.$l = windowFunction;
	window.$l.extend = extendFunction;


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor (elements) {
	    this.elements = elements;
	  }

	  html(string){
	    if (string === undefined){
	      return this.elements[0].innerHTML;
	    } else {
	      this.all(el => {
	        el.innerHTML = string;
	      });
	    }
	  }

	  empty() {
	    this.all(el => {el.innerHTML = "";});
	  }

	  append(arg) {
	    let html = "";

	    if (typeof(arg) === "string") {
	      html = arg;
	    } else if (arg instanceof HTMLElement) {
	      html = arg.outerHTML;
	    } else if (arg instanceof DOMNodeCollection) {
	      arg.all(el => {
	        html += el.outerHTML;
	      });
	    }

	    this.all(el => {
	      el.innerHTML += html;
	    });
	  }

	  addClass(className){
	    this.all((el) => {
	      el.className += className;
	    });
	  }

	  removeClass(className){
	    this.all((el) => {
	      el.className = el.className.replace(className, "");
	    });
	  }

	  all(callback){
	    this.elements.forEach((el)=> {
	      callback(el);
	    });
	    return this.elements;
	  }

	  attr(attribute, value) {
	    if (value === undefined) {
	      return this.first().getAttribute(attribute);
	    } else {
	      this.all(el => { el.setAttribute(attribute, value); });
	    }
	  }

	  first() {
	    return this.elements[0];
	  }

	  children() {
	    let children = [];
	    this.all(el => {
	      children = children.concat([].slice.call(el.children));
	    });
	    return new DOMNodeCollection(children);
	  }

	  parent() {
	    let parents = [];
	    this.all(el => {
	      if (!parents.includes(el.parentElement)){
	        parents.push(el.parentElement);
	      }
	    });
	    return parents;
	  }

	  find(selector) {
	    let elements = [];
	    this.all(el => {
	      let newElements = el.querySelectorAll(selector);
	      elements = elements.concat([].slice.call(newElements));
	    });
	    return new DOMNodeCollection(elements);
	  }

	  remove() {
	    this.all (el => {
	      el.remove(el.selectedIndex);
	    });
	  }

	  on(eventName, callback) {
	    this.all(el => {
	      el.addEventListener(eventName, callback);
	    });
	  }

	  off(eventName) {
	    this.all(el => {
	      el.removeEventListener(eventName);
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);