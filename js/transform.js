(function(window, a){
  // map of CSS properties during transform for reset
  var reset = {};
  /**
   * Perform a custom animation of a set of CSS properties
   * @param  {Object}   config   The key + value pairs of properties to animate
   * @param  {Mixed}    duration The string or number in milliseconds or seconds
   * @param  {Function} fn       The callback method to execute on animation end (optional)
   */
  a.fn.transform = function(config, duration, fn){
    config = a.extend(true, {
      duration: '500ms'
    }, config, a(this).data());

    if(a.isFunction(duration)){
      fn = duration;
      duration = config.duration;
    }

    return this.each(function(){
      return new transform(this, config, duration, fn);
    });
  };

  var transform = function(element, config, duration, fn){
    var easing = config.easing || 'linear',
        duration = this.runtime(duration, '500ms'),
        delay = this.runtime(config.delay, '0s');

    this.run(a(element), config, duration, delay, easing, fn);
  };

  a.extend(transform.prototype, {
    /**
     * Returns the duration for the animation effect
     * @param  {Mixed}  duration The number or string containing the duration of the animation
     * @return {String} returns  The duration in string format
     */
    runtime: function(duration, defaut){
      if(duration){
        if(typeof(duration) === 'number')
          return duration + 'ms';

        if(typeof(duration) === 'string')
          return (duration.match(/[\d\.]*m?s/)[0] || defaut);
      }

      return defaut;
    },
    wait: function(duration, delay){
      var map = { ms: 1, s: 1000 },
          calc;

      calc = function(time){
        var match = time.match(/(\d+)(ms|s)/);
        return parseFloat(RegExp.$1) * map[RegExp.$2 || 's'];
      };

      return calc(duration) + calc(delay);
    },
    /**
     * Resets CSS transition properties
     * @return {Object} The object containing the reset transition properties
     */
    reset: function(){
      var css = {},
          prefix = a.browser.cssPrefix;

      ['delay', 'duration', 'property'].forEach(function(name, index){
        var property = reset[prefix + 'transition-' + name];

        if(property){
          css[property] = reset[prefix + 'transition-' + name] = '';
        }
      });

      return css;
    },
    /**
     * Apply animation to one or more elements in a matched set
     * @param  {Object}   element  The jQuery object
     * @param  {[type]}   config   The key + value pairs of properties to animate
     * @param  {[type]}   duration The duration of the animation (optional)
     * @param  {[type]}   delay    The time to wait before executing the animation (optional)
     * @param  {[type]}   easing   The animation timing function type (optional)
     * @param  {Function} fn       The callback method to execute on animation end (optional)
     */
    run: function(element, config, duration, delay, easing, fn){

      var $t = this,
          css = {},
          cssTransforms = [],
          cssTransitions = [],
          timeout = this.wait(duration, delay),
          property, sleep, value,
          prefix = a.browser.cssPrefix,
          map = { bottom: 'height', left: 'width', right: 'width', top: 'height' },
          transitionEnd = function(e){
            // unbind event
            if(typeof(e) !== 'undefined' && e.target !== e.originalTarget){
              element.off('transitionend', transitionEnd);
            }
          };


      for(property in config){
        // check for valid property
        if(!a.pattern.properties.test(property)){

          // if property is a transform property
          if(a.pattern.transforms.test(property)){
            cssTransforms.push(property + '(' + config[property] + ')');
          }
          else{
            // check for relative values
            if((a.pattern.relative).test(config[property])){
              var direction = RegExp.$1,
                  number = parseFloat(String(config[property]).replace(/\+|-|=/g, '')),
                  current = parseFloat(element.css(property)) || 0,
                  positionProperty = (/\b(top|left|right|bottom)\b/gi).test(property);
                  widthHeight = (/\b(width|height)\b/gi).test(property);

              if(positionProperty && element.css(property).indexOf('%') !== -1){
                var parentOffset = element.parent().offset(),
                    parentValue = Math.round(parentOffset[map[property]]),
                    currentValue = Math.round(parseFloat(element.css(map[property]))),
                    newPercentageValue = parseFloat('.' + element.css(property).replace('%', ''));

                current = (parentValue - currentValue) * newPercentageValue;
              }

              // convert existing percentage width to pixels
              if(widthHeight && element.css(property).indexOf('%') !== -1){
                current = Math.round(element.offset()[property]);
              }

              if(direction.indexOf('+') !== -1){
                value = current + number;
              }else{
                value = current - number;
              }
            }else{
              value = config[property];
            }
            // set property value
            css[property] = value;
            // push property to transition properties collection
            cssTransitions.push(property);
          }
        }
      }

      css[prefix + 'transition-delay']           = delay;
      css[prefix + 'transition-duration']        = duration;
      css[prefix + 'transition-property']        = cssTransitions.join(' ');
      css[prefix + 'transition-timing-function'] = easing;
      css[prefix + 'transform']                  = 'translateZ(0) ' + cssTransforms.join(' ');

      // apply CSS and empty references
      element.css(css) && (css = null) && (cssTransforms = cssTransitions = []);
      // setup callback method after animationEnd
      element.on('transitionend', transitionEnd);
      // setup callback method after animationEnd
      sleep = setTimeout(function(){
        // reset CSS transitions
        element.css($t.reset());
        // trigger callback function
        if(typeof(fn) === 'function'){
          fn.call(element[0]);
        }

        sleep && clearTimeout(sleep) && (sleep = null);
      }, timeout);
    }
  });

})(window, animatio);
