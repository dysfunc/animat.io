/**!
 *                                          __
 *                 __                      /\ \__  __
 *    __      ___ /\_\    ___ ___      __  \ \ ,_\/\_\    ___
 *  /'__`\  /' _ `\/\ \ /' __` __`\  /'__`\ \ \ \/\/\ \  / __`\
 * /\ \_\.\_/\ \/\ \ \ \/\ \/\ \/\ \/\ \_\.\_\ \ \_\ \ \/\ \_\ \
 * \ \__/.\_\ \_\ \_\ \_\ \_\ \_\ \_\ \__/.\_\\ \__\\ \_\ \____/
 *  \/__/\/_/\/_/\/_/\/_/\/_/\/_/\/_/\/__/\/_/ \/__/ \/_/\/___/
 *
 *
 * @package      animatio.js
 * @version      2.0
 * @description  Micro-library for CSS3 animations and transitions
 *
 * @author       Kieran Boyle (github.com/dysfunc)
 * @author       Sergio Almecija (github.com/sheniff)
 *
 * @copyright    2012-2015 Kieran Boyle and Sergio Almecija
 * @license      raw.github.com/dysfunc/animat.io/master/license.txt
 * @link         github.com/dysfunc/animat.io
 */

(function(window, undefined){
  'use strict';

  if(window.animatio){
    return animatio;
  }

  var global = window,
      document = global.document,
      defaultView = document.defaultView,
      documentElement = document.documentElement,
      navigator = global.navigator,
      agent = navigator.userAgent,
      arrayPrototype = Array.prototype,
      objectPrototype = Object.prototype,
      stringPrototype = String.prototype,
      toString = objectPrototype.toString,
      concat = arrayPrototype.concat,
      filter = arrayPrototype.filter,
      hasOwn = objectPrototype.hasOwnProperty,
      slice = arrayPrototype.slice,
      indexOf = arrayPrototype.indexOf,
      trim = stringPrototype.trim,
      uid = 1,
      handlers = {},
      getComputedStyle = defaultView && defaultView.getComputedStyle,
      formatValue = function(prop, value){
        return typeof(value) === 'number' && !animatio.pattern.noUnit.test(prop) && (parseFloat(value) + 'px') || value;
      },
      each = function(collection, fn){
        var k = collection.length,
            i = 0;

        for(; i < k; i++){
          var result = fn.call(collection[i], i, collection[i]);

          if(result === false){
            break;
          }
        }
      },
      types = {};
      types.global = types.htmlcollection = types.htmldocument = types.htmlbodyelement = types.text = 'object';

  var animatio = (function(){
    /**
     * Define a local copy of animatio
     * @param {Mixed} selector String containing a CSS selector or DOM Element
     * @param {Mixed} context  Context in which to perform the search (can be a CSS Selector or DOM Element)
     */
    var a = function(selector, context){
      return new a.fn.init(selector, context);
    };

    a.fn = a.prototype = {
      constructor: a,
      version: '2.0.0',
      init: function(selector, context){

        if(!selector){
          return a([]);
        }

        if(typeof(selector) === 'function'){
          return a(document).ready(selector);
        }

        if(selector.constructor === a){
          return selector;
        }

        this.length = 0;
        this.selector = selector;
        this.context = context;

        if(selector === 'body' || selector === document.body){
          this[this.length++] = this.context = document.body;

          return this;
        }

        if(selector === global || a.pattern.nodes.test(selector.nodeType)){
          if(selector.nodeType === 9){
            this.selector = '';
            this.context = selector;
          }

          this[this.length++] = selector;

          return this;
        }

        if(typeof(selector) === 'string'){
          selector = a.trim(selector);
        }

        if(selector.length !== undefined && toString.call(selector) === '[object Array]'){
          for(var i = 0, k = selector.length; i < k; i++){
            this[this.length++] = selector[i];
          }

          return this;
        }

        if(!context){
          this.context = document;
        }else{
          this.context = a(context)[0];
        }

        return a.merge(this, a.query(selector, this.context));
      }
    };

    /**
     * Traverses the DOM and returns matched elements
     * @param  {Mixed} selector String containing CSS selector(s), HTML tags to create, or DOM Element
     * @param  {Mixed} context  Context in which to perform the search (can be a CSS Selector or DOM Element)
     * @return {Array}          NodeList of matched selectors
     */
    a.query = function(selector, context){
      var query = [],
          noSpace = selector.length && selector.indexOf(' ') < 0,
          zero = selector.charAt(0);

      if(zero === '#' && context === document && noSpace){
        var element = context.getElementById(selector.slice(1));

        if(element){
          query = [element];
        }
      }else{
        if(context.nodeType === 1 || context.nodeType === 9){
          if(zero === '.' && noSpace){
            query = context.getElementsByClassName(selector.slice(1));
          }
          else if((a.pattern.tags).test(selector)){
            query = context.getElementsByTagName(selector);
          }
          else{
            query = context.querySelectorAll(selector);
          }
        }
      }

      return slice.call(query);
    };

    /**
     * Shallow copies all properties from the config object to the target object
     * @param  {Object} target   Object receiving the properties
     * @param  {Object} config   The source object containing the new or updated default properties
     * @param  {Object} defaults The default values object (optional)
     * @return {Object}          The target object
     */
    a.apply = function(object, config, defaults){

      defaults && a.apply(object, defaults);

      if(object && config && typeof(config) === 'object'){
        for(var i in config){
          object[i] = config[i];
        }
      }

      return object;
    };

    a.apply(a, {
      /**
       * Converts a dasherized string to camelCase
       * @param  {String} str String to convert
       * @return {String}     The modified string
       */
      camelCase: function(str){
        return str.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, chr){
          return chr ? chr.toUpperCase() : '';
        });
      },
      /**
       * Returns the passed string with its first letter in uppercase
       * @param  {String} str String to convert
       * @return {String}     The modified string
       */
      capitalize: function(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      /**
       * Converts a camelCase string to a dasherized one
       * @param  {String} str String to convert
       * @return {String}     The modified string
       */
      dasherize: function(str){
        return a.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
      },
      /**
       * Sets arbitrary data associated to an element or retrieve value from the dataset
       * @param  {Object} element
       * @param  {String} key     The key in the dataset
       * @param  {Mixed}  value   The value to assign to the property
       * @return {Mixed}          The key value or the set of match elements
       */
      data: function(element, key, value){
        var data = {},
            convert = function(property){
              var stored = element.dataset[property];

              return (a.pattern.jsonString).test(stored) ? JSON.parse(stored) : stored;
            };

        if(element === undefined){
          return undefined;
        }

        if(typeof(key) === 'object' && value === undefined){
          for(var i in key){
            element.dataset[i] = key[i];
          }

          return element;
        }

        if(typeof(key) === 'string' && value !== undefined){
          if(typeof(value) !== 'string'){
            value = JSON.stringify(value);
          }

          element.dataset[key] = value;
          return element;
        }

        if(!key && !value){
          for(var property in element.dataset){
            data[property] = convert(property);
          }

          return data;
        }

        return convert(key);
      },
      /**
       * Iterates over a collection of objects
       * @param {Mixed}    collection The collection to iterate over
       * @param {Function} fn         The callback function
       */
      each: function(collection, fn){
        if(typeof(collection) === 'function'){
          fn = collection;
          collection = this;
        }

        if(typeof(collection.length) === 'number'){
          each(collection, function(index, item){
            return fn.call(item, index, item);
          });
        }
        else if(typeof(collection) === 'object'){
          for(var key in collection){
            var result = fn.call(collection[key], key, collection[key]);

            if(result === false){
              break;
            }
          }
        }

        return this;
      },
      /**
       * Merge the contents of two or more objects into the target object
       * @param  {Boolean} deep      If true, the merge becomes recursive (optional)
       * @param  {Boolean} dedup     If true, arrays will be deduped after merge
       * @param  {Object}  target    The object receiving the new properties
       * @param  {Object}  arguments One or more additional objects to merge with the first
       * @return {Object}            The target object with the new contents
       *
       * extend(object, object2)             // shallow copy
       * extend(true, object, object2)       // deep copy
       * extend(true, true, object, object2) // deep copy + dedup arrays
       */
      extend: function(target){
        var i = 1,
            deep = false,
            dedup = false;

        if(typeof(target) === 'boolean'){
          deep = target;
          target = arguments[1] || {};
          i++;

          if(typeof(target) === 'boolean'){
            dedup = target;
            target = arguments[2] || {};
            i++;
          }
        }

        slice.call(arguments, i).forEach(function(obj){
          var src, copy, isArray, clone;

          if(obj === target){
            return;
          }

          if(deep && obj instanceof Array){
            target = dedup ? a.unique(target.concat(obj)) : target.concat(obj);
          }
          else{
            for(var key in obj){
              src = target[key];
              copy = obj[key];

              if(target === copy || src === copy){
                continue;
              }

              if((isArray = copy instanceof Array) || deep && copy && (a.isPlainObject(copy))){
                if(isArray){
                  clone = (src && src instanceof Array) ? src : [];
                }else{
                  clone = (src && a.isPlainObject(src)) ? src : {};
                }

                isArray = false;

                if(dedup){
                  target[key] = a.extend(deep, dedup, clone, copy);
                }else{
                  target[key] = a.extend(deep, clone, copy);
                }
              }
              else if(copy !== undefined){
                target[key] = copy;
              }
            }
          }
        });

        return target;
      },
      /**
       * Returns a formatted string template from the values of the passed argument
       * @param  {String} template The string template containing the place-holders
       * @param  {Mixed}  values   The argument containing the indexed values or property keys
       * @return {String}          The formatted string
       */
      format: function(template, values){
        var isObject = typeof(values) === 'object';

        if(!template || !values || !(isObject || values instanceof Array))
          return undefined;

        var pattern = isObject ? 'keys' : 'indexed';

        return template.replace(a.pattern.templates[pattern], function(match, key){
          return values[key] || '';
        });
      },
      /**
       * Determines if the passed obj is an array or array-like object (NodeList, Arguments, String, etc...)
       * @param  {Object}  obj Object to type check
       * @return {Boolean}     The true/false result
       */
      isArrayLike: function(obj){
        var type = a.type(obj),
            length = obj.length;

        if(type === 'function' || a.isWindow(obj)){
          return false;
        }

        if(obj.nodeType === 1 && length){
          return true;
        }

        return type === 'array' || length === 0 || typeof(length) === 'number' && length > 0 && (length - 1) in obj;
      },
      /**
       * Determines whether the passed object is a number
       * @param  {Object}  obj Object to type check
       * @return {Boolean}     The true/false result
       */
      isNumber: function(obj){
        return !isNaN(parseFloat(obj)) && isFinite(obj);
      },
      /**
       * Determines whether the passed object is numeric
       * @param  {Object}  obj Object to type check
       * @return {Boolean}     The true/false result
       */
      isNumeric: function(obj){
        return !a.isArray(obj) && obj - parseFloat(obj) >= 0;
      },
      /**
       * Determine whether an Object is a plain object or not (created using "{}" or "new Object")
       * @param  {Object}  obj Object to type check
       * @return {Boolean}     The true/false result
       */
      isPlainObject: function(obj){
        return !(typeof(obj) !== 'object' || obj.nodeType || a.isWindow(obj) || obj.constructor && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf'));
      },
      /**
       * Determines whether the passed object is window object
       * @param  {Object}  obj Object to type check
       * @return {Boolean}     The true/false result
       */
      isWindow: function(obj){
        return obj !== null && obj === obj.window;
      },
      /**
       * Returns a new array from the results of each element in the collection
       * @param  {Array}    elements Collection to map
       * @param  {Function} fn       The function to execute on each item in the collection
       * @return {Array}             Returns the new mapped array
       */
      map: function(elements, fn){
        var k = elements.length,
            key,
            value,
            values = [],
            i = 0;

        if(a.isArrayLike(elements)){
          for(; i < k; i++){
            value = fn(elements[i], i);

            if(value == null){
              values.push(value);
            }
          }
        }else{
          for(key in elements){
            value = fn(elements[key], key);

            if(value == null){
              values.push(value);
            }
          }
        }

        return concat.apply([], values);
      },
      /**
       * Determine whether or not a DOM element matches a given selector
       * @param  {DOM Element} element  The DOM element to perform the test on
       * @param  {String}      selector The selector to test
       * @return {Boolean}              The value true or false
       */
      match: function(element, selector){

        if(!element || element.nodeType !== 1)
          return;

        var matches = function(element, selector){
          var nativeSelector = element[a.browser.nativeSelector];
          return element && nativeSelector && nativeSelector.call(element, selector);
        };

        return matches(element, selector || '*');
      },
      /**
       * Merge arrays - second into the first
       * @param  {Array} first   Array that will receive the new values
       * @param  {Array} second  Array that will be merged into the first - unaltered
       * @return {Array}         The modified first array
       */
      merge: function(first, second){
        var total = second.length,
            length = first.length,
            i = 0;

        if(typeof(total) === 'number'){
          for(; i < total; i++){
            first[length++] = second[i];
          }
        }else{
          while(second[i] !== undefined){
            first[length++] = second[i++];
          }
        }

        first.length = length;

        return first;
      },
      /**
       * Executes a function within a specific scope
       * @param  {Function} fn    Function whose scope will change
       * @param  {Object}   scope Scope in which the function should be called
       * @return {Function}       Function with the modified scope
       */
      proxy: function(fn, scope){
        var args = slice.call(arguments, 2);

        return typeof(fn) === 'function' ? function proxy(){
          return fn.apply(scope || this, args.concat(slice.call(arguments)));
        } : undefined;
      },
      /**
       * Get the siblings of each element in a collection
       * @param  {Object}      nodes   The collection of DOM nodes
       * @param  {DOM Element} element Sibling to exclude from the collection (optional)
       * @return {Array}               Collection of sibling elements
       */
      siblings: function(nodes, element){
        var collection = [];

        if(nodes == undefined){
          return collection;
        }

        for(; nodes; nodes = nodes.nextSibling){
          if(nodes.nodeType == 1 && nodes !== element){
            collection.push(nodes);
          }
        }

        return collection;
      },
      /**
       * Removes newlines, spaces (including non-breaking), and tabs from a text string
       * @param  {String} text The text string to trim
       * @return {String}      The modified string
       */
      trim: function(text){
        return text == null ? '' : trim && trim.call(text) || String('' + text).replace(a.pattern.trim, '');
      },
      /**
       * Returns the internal JavaScript ES5 spec [[Class]] of an object
       * @param  {Object} object Object to check the class property of
       * @return {String}        String containing the class property of the object
       */
      type: function(object){
        if((/undefined|null/).test(object)){
          return undefined;
        }

        var type = toString.call(object).replace(/(^\[Object |]$)/gi, '').toLowerCase();

        return types[type] || type;
      },
      /**
       * Removes duplicates from an Array
       * @param  {Array}  Array Array to dedup
       * @return {Array}        Array containing only unique values
       */
      unique: function(array){
        var a = array.concat();

        for(var i = 0; i < a.length; ++i){
          for(var j = i + 1; j < a.length; ++j){
            if(a[i] === a[j]){
              a.splice(j--, 1);
            }
          }
        }

        return a;
      }
    });

    /**
     * Creates type class check methods a.isArray(), a.isBoolean(), ...
     * @param  {Object}  obj Object to type check
     * @return {Boolean}     The true/false result of the check
     */
    each(['Array', 'Boolean', 'Date', 'Function', 'NodeList', 'Object', 'RegExp', 'String'], function(index, method){
      a['is' + method] = function(obj){
        return a.type(obj) === method.toLowerCase();
      }
    });

    a.fn.init.prototype = a.fn;

    a.apply(a.fn, {
      each: a.each,
      /**
       * Creates a reference to the original matched collection for chain breaking (e.g. using .end())
       * @param  {Object} collection The collection to add the prev reference to
       * @return {Object}            The modified collection
       */
      chain: function(collection){
        return !!collection && (collection.prevObject = this) && a(collection) || a();
      },
      /**
       * Return the child elements of each element in the set of matched elements
       * @param  {String} selector Filter by a selector (optional)
       * @return {Object}          The collection of child elements
       */
      children: function(selector){
        var collection = [];

        if(this[0] === undefined){
          return undefined;
        }

        for(var i = 0, k = this.length; i < k; i++){
          collection = collection.concat(
            a.siblings(this[i].firstChild)
          );
        }

        return this.chain(a(collection).filter(selector));
      },
      /**
       * Get the value of a style property for the first element in the set of matched
       * elements or set the style property value for one or more elements
       * @param  {Mixed} property The style property to set or get
       * @param  {Mixed} value    The value to set for the given property
       * @return {Mixed}          The style property value or this
       */
      css: function(property, value){
        var element = this[0],
            isString = typeof(property) === 'string',
            returnZero = { width: 1, height: 1 },
            process = function(element, prop, value, get){

              if(value == null || value !== value && get)
                return;

              var camelCase = a.camelCase(prop);

              if(get){
                value = element.style[camelCase] || getComputedStyle(element, null)[camelCase];
              }

              if(parseFloat(value) < 0 && returnZero[camelCase]){
                value = 0;
              }

              if(value === ''){
                if(camelCase === 'opacity'){
                  value = 1;
                }

                if(returnZero[camelCase]){
                  return '0px';
                }
              }

              if(get){
                return value;
              }

              element.style[camelCase] = formatValue(camelCase, value);
            };

        if(!element || element.nodeType === 3 || element.nodeType === 8 || !element.style)
          return;

        if(isString && value === undefined){
          return process(element, property, '1', true);
        }

        for(var i = 0, k = this.length; i < k; i++){
          element = this[i];

          if(!element || element.nodeType === 3 || element.nodeType === 8 || !element.style){
            return;
          }

          if(isString){
            process(element, property, value);
          }else{
            for(var key in property){
              process(element, key, property[key]);
            }
          }
        }

        return this;
      },
      /**
       * Store arbitrary data associated with an element
       * @param  {String} key   The key in the dataset
       * @param  {Mixed}  value The value to assign to the property
       * @return {Mixed}        The key value or the set of match elements
       */
      data: function(key, value){
        return a.data(this[0], key, value);
      },
      /**
       * Reduce the set of matched elements to the one at a specified index
       * @param  {Number} index Zero-based index of the element to match
       * @return {Object}       The matched element in specified index of the collection
       */
      eq: function(index){
        return a(index < 0 ? this.slice(index) : this.slice(index, + index + 1));
      },
      /**
       * Reduce the collection of matched elements to that of the passed selector
       * @param  {String} selector String containing a selector to match the current set of elements against
       * @return {Object}          The collection of matched elements
       */
      filter: function(selector){
        if(!selector){
          return this;
        }

        return a(filter.call(this, function(element){
            return a.match(element, selector);
          })
        );
      },
      /**
       * Search descendants of an element and returns the matched ones
       * @param  {String} selector The CSS selector to filter on
       * @return {Object}          The matched set of elements
       */
      find: function(selector){
        var search;

        if(this.length === 1){
          search = a(selector, this[0]);
        }else{
          search = a.map(this, function(node){
            return a(selector, node);
          });
        }

        return this.chain(search);
      },
      /**
       * Retrieve the DOM element at the specified index
       * @param  {Number} index  A zero-based index indicating which element to retrieve
       * @return {Mixed}         DOM element at the specified index or the entire collection
       */
      get: function(index){
        return index !== undefined ? (index < 0 ? this[this.length + index] : this[index]) : slice.call(this);
      },
      /**
       * Determines whether an element has a specific CSS class
       * @param  {String}  cls String containgin the CSS class name to check for
       * @return {Boolean}     The true/false result of the check
       */
      hasClass: function(cls){
        return this[0].classList.contains(cls);
      },
      /**
       * Returns the HTML contents of the first element in a matched set or updates the contents of one or more elements
       * @param  {String} html The HTML string to replace the contents with
       * @return {Mixed}       The contents of an individual element, or sets the contents for each element in the matched set
       */
      html: function(html){
        if(!this.length || this[0] === undefined){
          return undefined;
        }

        if(!html){
          return this[0].innerHTML;
        }

        for(var i = 0, k = this.length; i < k; i++){
          var element = this[i];

          element.innerHTML = '' + html;
        }

        return this;
      },
      /**
       * Returns a new animatio object containing the matched elements
       * @param  {Function} fn A function executed for each element in the current set
       * @return {Object}      The wrapped collection of matched elements
       */
      map: function(fn){
        return a(a.map(this, function(element, index){
          return fn.call(element, index, element);
        }));
      },
      /**
       * Returns the elements offset properties
       * @return {Object} Object containing the offset definition
       */
      offset: function(){

        if(!this.length || this[0] === undefined){
          return undefined;
        }

        var element = this[0].getBoundingClientRect();

        return {
          bottom: Math.round(element.top + element.height + global.pageYOffset),
          height: element.height,
          left: Math.round(element.left + global.pageXOffset),
          right: Math.round(element.left + element.width + global.pageXOffset),
          top: Math.round(element.top + global.pageYOffset),
          width: element.width
        };
      },
      /**
       * Return the parent element of the first matched element
       * @param  {String} selector The selector to filter by (optional)
       * @return {Object}          The parent element object
       */
      parent: function(selector){
        return this[0] && this[0].parentNode && this.chain(!!selector ? a(this[0].parentNode).filter(selector) : a(this[0].parentNode)) || a();
      },
      /**
       * Executes a function when the DOM is ready
       * @param {Function} fn The function to execute
       */
      ready: function(fn){
        if((a.pattern.ready).test(document.readyState)){
          fn.call();
        }else{
          document.addEventListener('DOMContentLoaded', fn, false);
        }

        return this;
      },
      /**
       * Get the siblings of each element in the set of matched elements
       * @param  {String} selector Selector to filter by (optional)
       * @return {Object}          The siblings of the matched elements in the set
       */
      siblings: function(selector){
        var collection = [];

        if(!this.length){
          return undefined;
        }

        for(var i = 0, k = this.length; i < k; i++){
          if(this[i].parentNode){
            collection = collection.concat(
              a.siblings(this[i].parentNode.firstChild, this[i])
            );
          }
        }

        return this.chain(a(collection).filter(selector));
      },
      /**
       * Returns a copy of elements from the original object collection
       * @return {Object} The animatio object collection
       */
      slice: function(){
        return a(slice.apply(this, arguments));
      },
      /**
       * Returns the text from the first element in the matched set, or sets the
       * text value for one or more elements
       * @param  {String} text The text content to set
       * @return {Mixed}       Gets or sets the text content of the element(s)
       */
      text: function(text){
        if(!this.length){
          return undefined;
        }

        if(!text){
          return this[0].textContent;
        }

        for(var i = 0, k = this.length; i < k; i++){
          this[i].textContent = text;
        }

        return this;
      },
      /**
       * Toggles a specific class on one or more elements
       * @param {Mixed} cls The CSS class to toggle or the function to execute
       */
      toggleClass: function(cls, fn){
        if(!this.length){
          return undefined;
        }

        return this[(this.hasClass(cls) ? 'removeClass' : 'addClass')](fn && fn(cls) || cls);
      },
      /**
       * Gets the value for the first element in the matched set or sets the value for one or more elements
       * @param  {Mixed} value The value to set
       * @return {Mixed}       The property value
       */
      val: function(value){

        if(this[0] === undefined){
          return;
        }

        if(value === undefined){
          return this[0].value;
        }

        for(var i = 0, k = this.length; i < k; i++){
          this[i].value = value;
        }

        return this;
      }
    });

    /**
     * Add/Remove one or more CSS class names from one or more DOM elements
     * @param  {Mixed}  cls String containing the CSS class to add/remove, or the callback function to execute
     * @return {Object}     The animatio object
     */
    each(['addClass', 'removeClass'], function(index, method){
      a.fn[method] = function(cls){

        if(this[0] === undefined){
          return;
        }

        for(var i = 0, k = this.length; i < k; i++){
          var element = this[i],
              add = method === 'addClass';

          if(!add && (cls === undefined || cls.length === 0)){
            return element.className = '';
          }

          if(typeof(cls) === 'function'){
            a(element)[method](cls.call(element, index, element.className));
          }else{
            each(cls.split(' '), function(i, name){
              element.classList[add ? 'add' : 'remove'](name);
            });
          }

          element = null;
        }

        return this;
      }
    });

    /**
     * Returns current width/height of an element or sets the height/width of one or more elements
     * @param  {Mixed} value String or number to set as width/height
     * @return {Mixed}       The current value or this
     */
    each(['width', 'height'], function(i, method){
      a.fn[method] = function(value){
        var element = this[0],
            capitalize = a.capitalize(method);

        if(!element){
          return undefined;
        }

        if(a.isWindow(element)){
          return element['inner' + capitalize];
        }

        if(element.nodeType === 9){
          var doc = documentElement;

          return Math.max(
            element.body['scroll' + capitalize],
            element.body['offset' + capitalize],
            doc['scroll' + capitalize],
            doc['offset' + capitalize],
            doc['client' + capitalize]
          );
        }
        // return the current value
        if(value === undefined){
          return parseFloat(this.css(method));
        }
        // set the value
        return this.css(method, value);
      }
    });

    /*------------------------------------
     * RegExp patterns
     ------------------------------------*/

    a.pattern = {
      browser       : /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
      device        : /\b((ip)(hone|ad|od)|playbook|hp-tablet)\b/i,
      duration      : /[\d\.]*m?s/,
      ios           : /\b((ip)(hone|ad|od))\b/i,
      jsonString    : /^(\{|\[)/i,
      nodes         : /^(?:1|3|8|9|11)$/,
      noUnit        : /^(columns|columnCount|fillOpacity|flex|flexGrow|flexShrink|fontWeight|lineHeight|opacity|order|orphans|widows|zIndex|zoom)$/i,
      numbers       : /^(0|[1-9][0-9]*)$/i,
      parseCSS      : /[{:;}]/,
      prefixes      : /^-webkit-|-moz-|-o-|ms-/gi,
      properties    : /^(property|delay|duration)$/i,
      relative      : /^(?:(-|\+)(?:=))/,
      ready         : /^(?:complete|loaded|interactive)$/i,
      root          : /^(?:body|html)$/i,
      space         : /\s+/g,
      tags          : /^[\w-]+$/,
      time          : /(\d+)(ms|s)/,
      templates: {
        keys        : /\{(\w+)\}/g,
        indexed     : /\{(\d+)\}/g
      },
      transforms    : /^((perspective|rotate|scale|skew|translate)(X|Y|Z|3d)?|matrix(3d)?)$/i,
      trim          : /^\s+|\s+$/g,
      whitespaces   : /^\s*$/g,
      willChange    : /^((background|margin|padding|border)(color|size|position|top|right|bottom|left)(width|height)?|opacity|color|height|transform|width?)$/i
    };

    /*------------------------------------
     * Browser detection
     ------------------------------------*/

    a.browser = (function(){
      var match = agent.match(a.pattern.browser) || agent.match(a.pattern.ios) || [],
          name = RegExp.$1.toLowerCase() || 'chrome',
          types = {
            'chrome'    : 'webkit',
            'firefox'   : 'moz',
            'mozilla'   : 'moz',
            'msie'      : 'ms',
            'opera'     : 'o',
            'safari'    : 'webkit',
            'iphone'    : 'webkit',
            'ipod'      : 'webkit',
            'ipad'      : 'webkit',
            'trident'   : 'ms'
          },
          prefix = types[name] || '',
          nativeSelector = prefix + 'MatchesSelector';

      return {
        chrome    : name === 'chrome',
        cssPrefix : '-' + prefix + '-',
        firefox   : name === 'firefox',
        msie      : (/\b(msie|trident)\b/i).test(name),
        opera     : name === 'opera',
        ios       : (a.pattern.ios).test(name),
        nativeSelector : prefix.length ? nativeSelector : nativeSelector[0].toLowerCase(),
        prefix    : prefix,
        safari    : name === 'safari' && ('doNotTrack' in window),
        version   : parseFloat(agent.match(/version\/([\d]+)/i) || match[2]),
        webkit    : prefix === 'webkit'
      }
    }());

    /*------------------------------------
     * Events
     ------------------------------------*/

    var animationEnd = { webkit: 'webkitAnimationEnd', moz: 'animationend', o: 'oAnimationEnd',  ms: 'animationend' },
        transitionEnd = { webkit: 'webkitTransitionEnd', moz: 'transitionend', o: 'oTransitionEnd',  ms: 'transitionend' },
        alias = {
          animationend  : animationEnd[a.browser.prefix || 'webkit'],
          blur          : a.browser.webkit ? 'focusout' : 'blur',
          enter         : 'focus',
          focus         : a.browser.webkit ? 'focusin' : 'focus',
          leave         : 'blur',
          mouseenter    : 'mouseover',
          mouseleave    : 'mouseout',
          transitionend : transitionEnd[a.browser.prefix || 'webkit'],
          turn          : 'orientationchange'
        };

    each([
     'blur', 'change', 'click', 'dblclick', 'enter', 'error', 'focus', 'focusin', 'focusout', 'hashchange',
     'keydown', 'keypress', 'keyup', 'leave', 'load', 'mousedown', 'mousemove', 'mouseout', 'mouseover',
     'mouseenter', 'mouseleave', 'mouseup', 'resize', 'scroll', 'select', 'submit', 'unload'
    ], function(i, name){
      a.fn[name] = function(data, fn){

        if(typeof(data) === 'function'){
          fn = data;
          data = null;
        }

        return fn && this.on(alias[name] || name, data, fn) || this[0] && this[0][name] && this[0][name]() || undefined;
      }
    });

    /**
     * Add or remove one or more event handlers
     * @param  {String}   event    String containing the event type(s) i.e. `click` `change`
     * @param  {Anything} data     Data to be passed to the handler in event.data (optional)
     * @param  {Function} fn       The function to execute when the event is triggered
     */
    each(['on', 'off'], function(index, method){
      a.fn[method] = function(type, data, fn){
        if(this[0] === undefined){
          return;
        }

        if(fn == null){
          fn = data;
          data = null;
        }

        return this.each(function(){
          a.events[index === 0 ? 'on' : 'off'](this, type, data, fn);
        });
      }
    });

    a.events = {
      /**
       * Iterates over a collection of events, executing a function for each item
       * @param  {String}   events   The string or object containing the events
       * @param  {Function} fn       The function to execute on each event type
       * @param  {Function} iterator The function to execute on each item
       */
      each: function(events, fn, iterator){
        if(typeof(events) === 'object'){
          a.each(events, iterator);
        }else{
          each(('' + events).split(/\s/), function(i, event){
            iterator(event, fn);
          });
        }
      },
      /**
       * Returns an event handler for a specific element from the handlers cache
       * @param  {DOM Element} element The DOM element
       * @param  {Object}      event   The event object
       * @param  {Function}    fn      The passed event handler
       * @return {Object}              The matched event handler from the cache
       */
      remove: function(element, event, fn){
        if(!handlers[element.uid]){
          return [];
        }

        return (handlers[element.uid]).filter(function(handler){
          return handler && (!event || handler.type === event) && (!fn || handler.fn === fn);
        });
      },
      /**
       * Bind one or more events to an element
       * @param {DOM Element} element     DOM element
       * @param {String}      events      String containing the event type(s)
       * @param {Function}    fn          The function to execute when the event happens
       * @param {Anything}    data        Use defined data passed to along with the event (optional)
       * @param {Boolean}     capture     If true, the event will be captured (optional)
       */
      on: function(element, events, data, fn, capture){
        var unique = element.uid || (element.uid = uid++),
            eventHandlers = handlers[unique] || (handlers[unique] = []),
            capture = (/focusin|focusout/i).test(events) || !!capture;

        a.events.each(events, fn, function(type, fn){
          var proxy = a.events.proxy(element, type, data, fn),
              handler = { fn: fn, index: eventHandlers.length, proxy: proxy, type: type };

          eventHandlers.push(handler)

          element.addEventListener(handler.type, handler.proxy, capture);
        });
      },
      /**
       * Unbind one or more events from an element
       * @param {DOM Element} element DOM element
       * @param {String}      events  String containing the event type(s)
       * @param {Function}    fn      The function that maps to the event
       */
      off: function(element, events, data, fn){
        a.events.each(events, fn, function(event, fn){
          each(a.events.remove(element, event, fn), function(i, handler){
            delete handlers[element.uid][handler.index];
            element.removeEventListener(handler.type, handler.proxy);
          });
        });
      },
      /**
       * Helper function for event callback
       * @param  {Element}  element The DOM element
       * @param  {Object}   event   The event object
       * @param  {Function} fn      The event handler function
       * @return {Function}         The proxy function
       */
      proxy: function(element, event, data, fn){
        return function(e){
          var result = fn && fn.call(element, a.extend(true, e, { data: data }));

          if(result === false){
            e.preventDefault();
          }

          return result;
        }
      }
    };

    /*------------------------------------
     * Feature support detection
     ------------------------------------*/

    var supports = function(name){
      return a.capitalize(a.browser.prefix).replace(/^Ms/, 'ms') + name;
    };

    a.supports = {
      cssAnimationEvents : supports('AnimationName') in documentElement.style,
      cssAnimationEnd    : !!animationEnd[a.browser.prefix],
      cssTransform       : supports('Transform') in documentElement.style,
      cssTransitionEnd   : !!transitionEnd[a.browser.prefix],
      cssTransition      : supports('Transition') in documentElement.style,
      cssTransform3d     : ('WebKitCSSMatrix' in global) && ('m11' in new WebKitCSSMatrix()),
      touch              : ('ontouchstart' in global)
    };

    a.emptyFn = function(){};

    return a;

  })();

  global.animatio = animatio;

  !global.$ && (global.$ = animatio);

})(window);
