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
