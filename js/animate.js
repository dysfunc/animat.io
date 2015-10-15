(function(window, animatio){
  'use strict';

  // CSS cache object
  var cache = {},
      // CSS transition reset object
      reset = {},
      // reference to inline style block
      style = null,
      /**
       * Determines if we've already created our inline style block to store our animation rules in
       * @return {Boolean} Always returns the value of true
       */
      createStyle = function(){
        if(!style){
          style = document.createElement('style');
          style.setAttribute('type', 'text/css');
          document.getElementsByTagName('head')[0].appendChild(style);
        }

        return true;
      },
      /**
       * Returns the duration for the animation effect
       * @param  {Mixed}  duration The number or string containing the duration of the animation
       * @return {String} returns  The duration in string format
       */
      runtime = function(duration, defaut){
        if(duration){
          if(typeof(duration) === 'number'){
            return duration + 'ms';
          }

          if(typeof(duration) === 'string'){
            return (duration.match(/[\d\.]*m?s/)[0] || defaut);
          }
        }

        return defaut;
      },
      wait = function(duration, delay){
        var map = { ms: 1, s: 1000 },
            calc;

        calc = function(time){
          var match = time.match(/(\d+)(ms|s)/);
          return parseFloat(RegExp.$1) * map[RegExp.$2 || 's'];
        };

        return calc(duration) + calc(delay);
      };

  /**
   * Animates an object (or a group of them) using CSS3
   * @param {String}   name   The name of animation to apply
   * @param {Mixed}    config The animation configuration
   * @param {Function} fn     The animation completion callback (optional)
   */
  animatio.fn.animate = function(name, config, fn){

    if(animatio.isFunction(config)){
      fn = config;
      config = {};
    }

    config = animatio.extend(true, {
      bubbles: false,
      delay: '0s',
      direction: 'normal',
      duration: '1s',
      fillMode: 'forwards',
      iterationCount: '1',
      rule: null,
      timingFunction: 'ease'
    }, config || {});

    return this.each(function(){
      return new animate(name, config, this, fn);
    });
  };

  var animate = function(type, config, target, fn){
    return this.run(type, config, target, fn);
  };

  animatio.extend(animate.prototype, {
    /**
     * Generates a new animation rule in case it hadn't been cached previously
     * Developers can generate new rules just by using a name that doesn't match with
     * any of the default names and adding a new rule in "config.rule".
     *
     * @param  {String} name    The name of animation to use
     * @param  {Mixed}  config  The animation configuration
     * @return {String} returns The name of the rule to apply to the object(s) to be animated
     */
    rule: function(name){
      var prefix = animatio.browser.cssPrefix;
      // check if rule exists
      if(!animatio.animations[name]){
        throw new Error(
          animatio.format('The rule "{name}" does not exist. You need to add the rule to animatio.animations in order to use it.', { name: name })
        );
      }
      // check if rule already exists in our cache
      if(!cache[name]){
        // create browser specific keyframe animation and insert into cache
        cache[name] = '@' + prefix + 'keyframes ' + name;
        cache[name] += ' { ' + (
          animatio.format(animatio.animations[name] || this.config.name, { browser: prefix })
        ) + '}';

        // add animation name to our inline style block so we only load it once
        style.textContent += ('\n' + cache[name]);
      }

      return {
        name: name,
        rule: cache[name]
      }
    },
    /**
     *
     * Apply a given animation to one or more elements in a matched set
     * @param  {String}       type   The type of animation
     * @param  {Object}       config The animation configuration
     * @param  {HTML Element} target The HTML element to animate
     * @param  {Function}     fn     The animation completion callback (optional)
     * @return {HTML Element}
     */
    run: function(type, config, target, fn){
      var prefix = animatio.browser.cssPrefix,
          element = animatio(target),
          animation = null,
          prev = element.css(prefix + 'animation-name'),
          css = {},
          willChange = [],
          animationEnd = function(e){
            if(!config.bubbles){
              e.stopPropagation();
            }
            // pause animation
            element.css(prefix + 'animation-play-state', 'paused');
            // strip will change properties
            element[0].style.willChange = '';
            // trigger callback if defined
            if(typeof(fn) === 'function'){
              // fire callback
              fn.call(this);
            };

            // unbind event
            element.off('animationend', animationEnd);
          };

      // reference config
      this.config = config;
      // make sure we have our style block ready
      createStyle();
      // setup callback method after animationEnd
      element.on('animationend', animationEnd);
      // reset element
      if(type === 'reset'){
        element.css(prefix + 'animation', 'none');
      }else{
        config = config || {};
        animation = this.rule(type, config);
        // parse the css rule for properties
        var parse = animation.rule.split(animatio.pattern.parseCSS).filter(String).map(function(str){
          return str.trim().replace(animatio.pattern.prefixes, '')
        });

        animatio.each(parse, function(index, property){
          // check if property is a valid will-change property
          if(animatio.pattern.willChange.test(property)){
            // add property to will-change
            if(willChange.indexOf(RegExp.$1) === -1){
              willChange.push(RegExp.$1);
            }
          }
        });
        // set will-change properties on element
        element.css('will-change', willChange.join(', '));
        // reset animation state for reuse
        if(type === prev){
          element.css(prefix + 'animation', 'none');
        }
        // trigger a redraw
        setTimeout(function(){
          css[prefix + 'animation-name']            = animation.name;
          css[prefix + 'animation-delay']           = runtime(config.delay, '0s');
          css[prefix + 'animation-direction']       = config.direction;
          css[prefix + 'animation-duration']        = runtime(config.duration, '1s');
          css[prefix + 'animation-fill-mode']       = config.fillMode;
          css[prefix + 'animation-iteration-count'] = config.iterationCount;
          css[prefix + 'animation-play-state']      = config.playState || 'running';
          css[prefix + 'animation-timing-function'] = config.timingFunction;
          // apply styling to element
          element.css(css) && (css = null);
        }, 0);
      }

      return target;
    }
  });

})(window, animatio);
