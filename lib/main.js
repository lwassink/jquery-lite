const DOMNodeCollection = require("./dom_node_collection.js");

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

const ajaxFunction = function(options){
  let defaults = {
    type: "GET",
    dataType: "json",
    data: {},
    error: function(response){
      console.log(JSON.parse(response));
    }
  };
  options = extendFunction(defaults, options);

  const xhr = new XMLHttpRequest();

  xhr.open(options.type, options.url);

  xhr.onload = function () {
    if (xhr.status > 299){
      options.error(xhr.response);
    } else {
      options.success(xhr.response);
    }
  };
  xhr.send(options.data);

};

window.$l = windowFunction;
window.$l.extend = extendFunction;
window.$l.ajax = ajaxFunction;
