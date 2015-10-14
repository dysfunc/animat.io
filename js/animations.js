(function(window, a){
  'use strict';

  /*------------------------------------
   * Dan Eden - animate.css
   ------------------------------------*/

  a.animations = {
    bounce:"0%, 20%, 50%, 80%, 100% {{browser}transform: translateY(0);}40% {{browser}transform: translateY(-30px);}60% {{browser}transform: translateY(-15px);}",
    bounceIn:"0% {opacity: 0;{browser}transform: scale(.3);}50% {opacity: 1;{browser}transform: scale(1.05);}70% {{browser}transform: scale(.9);}100% {{browser}transform: scale(1);}",
    bounceInUp:"0% {opacity: 0;{browser}transform: translateY(100%);}60% {opacity: 1;{browser}transform: translateY(-30px);}80% {{browser}transform: translateY(10px);}100% {{browser}transform: translateY(0);}",
    bounceInDown:"0% {opacity: 0;{browser}transform: translateY(-100%);}60% {opacity: 1;{browser}transform: translateY(30px);}80% {{browser}transform: translateY(-10px);}100% {{browser}transform: translateY(0);}",
    bounceInLeft:"0% {opacity: 0;{browser}transform: translateX(-100%);}60% {opacity: 1;{browser}transform: translateX(30px);}80% {{browser}transform: translateX(-10px);}100% {{browser}transform: translateX(0);}",
    bounceInRight:"0% {opacity: 0;{browser}transform: translateX(100%);}60% {opacity: 1;{browser}transform: translateX(-30px);}80% {{browser}transform: translateX(10px);}100% {{browser}transform: translateX(0);}",
    bounceOut:"0% {opacity: 1;{browser}transform: scale(1);}25% {{browser}transform: scale(.95);}50% {opacity: 1;{browser}transform: scale(1.1);}100% {opacity: 0;{browser}transform: scale(.3);}",
    bounceOutUp:"0% {opacity: 1;{browser}transform: translateY(0);}20% {opacity: 1;{browser}transform: translateY(20px);}100% {opacity: 0;{browser}transform: translateY(-100%);}",
    bounceOutDown:"0% {opacity: 1; {browser}transform: translateY(0);}20% {opacity: 1;{browser}transform: translateY(-20px);}100% {opacity: 0;{browser}transform: translateY(100%);}",
    bounceOutLeft:"0% {opacity: 1; {browser}transform: translateX(0);}20% {opacity: 1;{browser}transform: translateX(20px);}100% {opacity: 0;{browser}transform: translateX(-100%);}",
    bounceOutRight:"0% {opacity: 1; {browser}transform: translateX(0);}20% {opacity: 1;{browser}transform: translateX(-20px);}100% {opacity: 0;{browser}transform: translateX(100%);}",
    fadeIn:"0% {opacity: 0;}100% {opacity: 1;}",
    fadeInUp:"0% {opacity: 0;{browser}transform: translateY(50px);}100% {opacity: 1;{browser}transform: translateY(0);}",
    fadeInDown:"0% {opacity: 0;{browser}transform: translateY(-50px);}100% {opacity: 1;{browser}transform: translateY(0);}",
    fadeInLeft:"0% {opacity: 0;{browser}transform: translateX(-20px);}100% {opacity: 1;{browser}transform: translateX(0);}",
    fadeInRight:"0% {opacity: 0;{browser}transform: translateX(20px);}100% {opacity: 1;{browser}transform: translateX(0);}",
    fadeInUpBig:"0% {opacity: 0;{browser}transform: translateY(100%);}100% {opacity: 1;{browser}transform: translateY(0);}",
    fadeInDownBig:"0% {opacity: 0;{browser}transform: translateY(-100%);}100% {opacity: 1;{browser}transform: translateY(0);}",
    fadeInLeftBig:"0% {opacity: 0;{browser}transform: translateX(-100%);}100% {opacity: 1;{browser}transform: translateX(0);}",
    fadeInRightBig:"0% {opacity: 0;{browser}transform: translateX(100%);}100% {opacity: 1;{browser}transform: translateX(0);}",
    fadeOut:"0% {opacity: 1;}100% {opacity: 0;}",
    fadeOutUp:"0% {opacity: 1;{browser}transform: translateY(0);}100% {opacity: 0;{browser}transform: translateY(-50px);}",
    fadeOutDown:"0% {opacity: 1;{browser}transform: translateY(0);}100% {opacity: 0;{browser}transform: translateY(50px);}",
    fadeOutLeft:"0% {opacity: 1;{browser}transform: translateX(0);}100% {opacity: 0;{browser}transform: translateX(-20px);}",
    fadeOutRight:"0% {opacity: 1;{browser}transform: translateX(0);}100% {opacity: 0;{browser}transform: translateX(20px);}",
    fadeOutUpBig:"0% {opacity: 1;{browser}transform: translateY(0);}100% {opacity: 0;{browser}transform: translateY(-100%);}",
    fadeOutDownBig:"0% {opacity: 1;{browser}transform: translateY(0);}100% {opacity: 0;{browser}transform: translateY(100%);}",
    fadeOutLeftBig:"0% {opacity: 1;{browser}transform: translateX(0);}100% {opacity: 0;{browser}transform: translateX(-100%);}",
    fadeOutRightBig:"0% {opacity: 1;{browser}transform: translateX(0);}100% {opacity: 0;{browser}transform: translateX(100%);}",
    flash:"0%, 50%, 100% {opacity: 1;}25%, 75% {opacity: 0;}",
    flipIn: '0% { {browser}transform: perspective(400px) rotateY(90deg); opacity: 0; } 100% { {browser}transform: rotateY(0);}',
    flipInY:"0% {{browser}transform: perspective(400px) rotateX(90deg);opacity: 0;}40% {{browser}transform: perspective(400px) rotateX(-10deg);}70% {{browser}transform: perspective(400px) rotateX(10deg);}100% {{browser}transform: perspective(400px) rotateX(0deg);opacity: 1;}",
    flipInX:"0% {{browser}transform: perspective(400px) rotateY(90deg);opacity: 0;}40% {{browser}transform: perspective(400px) rotateY(-10deg);}70% {{browser}transform: perspective(400px) rotateY(10deg);}100% {{browser}transform: perspective(400px) rotateY(0deg);opacity: 1;}",
    flipOut: '0% { {browser}transform: perspective(400px) rotateY(0) } 100% { {browser}transform: rotateY(-90deg); opacity: 0; }',
    flipOutY:"0% {{browser}transform: perspective(400px) rotateX(0deg);opacity: 1;}100% {{browser}transform: perspective(400px) rotateX(90deg);opacity: 0;}",
    flipOutX:"0% {{browser}transform: perspective(400px) rotateY(0deg);opacity: 1;}100% {{browser}transform: perspective(400px) rotateY(90deg);opacity: 0;}",
    hinge:"0% { {browser}transform: rotate(0); {browser}transform-origin: top left; {browser}animation-timing-function: ease-in-out; }20%, 60% { {browser}transform: rotate(80deg); {browser}transform-origin: top left; {browser}animation-timing-function: ease-in-out; }40% { {browser}transform: rotate(60deg); {browser}transform-origin: top left; {browser}animation-timing-function: ease-in-out; }80% { {browser}transform: rotate(60deg) translateY(0); opacity: 1; {browser}transform-origin: top left; {browser}animation-timing-function: ease-in-out; }100% { {browser}transform: translateY(700px); opacity: 0; }",
    lightSpeedIn:"0% { {browser}transform: translateX(100%) skewX(-30deg); opacity: 0; }60% { {browser}transform: translateX(-20%) skewX(30deg); opacity: 1; }80% { {browser}transform: translateX(0%) skewX(-15deg); opacity: 1; }100% { {browser}transform: translateX(0%) skewX(0deg); opacity: 1; }",
    lightSpeedOut:"0% { {browser}transform: translateX(0%) skewX(0deg); opacity: 1; }100% { {browser}transform: translateX(100%) skewX(-30deg); opacity: 0; }",
    pulse:"0% { {browser}transform: scale(1); }50% { {browser}transform: scale(1.1); }100% { {browser}transform: scale(1); }",
    rollIn:"0% { opacity: 0; {browser}transform: translateX(-100%) rotate(-120deg); }100% { opacity: 1; {browser}transform: translateX(0px) rotate(0deg); }",
    rollOut:"0% {opacity: 1;{browser}transform: translateX(0px) rotate(0deg);}100% {opacity: 0;{browser}transform: translateX(100%) rotate(120deg);}",
    rotateIn:"0% {{browser}transform-origin: center center;{browser}transform: rotate(-200deg);opacity: 0;}100% {{browser}transform-origin: center center;{browser}transform: rotate(0);opacity: 1;}",
    rotateInUpLeft:"0% {{browser}transform-origin: left bottom;{browser}transform: rotate(90deg);opacity: 0;}100% {{browser}transform-origin: left bottom;{browser}transform: rotate(0);opacity: 1;}",
    rotateInDownLeft:"0% {{browser}transform-origin: left bottom;{browser}transform: rotate(-90deg);opacity: 0;}100% {{browser}transform-origin: left bottom;{browser}transform: rotate(0);opacity: 1;}",
    rotateInUpRight:"0% {{browser}transform-origin: right bottom;{browser}transform: rotate(-90deg);opacity: 0;}100% {{browser}transform-origin: right bottom;{browser}transform: rotate(0);opacity: 1;}",
    rotateInDownRight:"0% {{browser}transform-origin: right bottom;{browser}transform: rotate(90deg);opacity: 0;}100% {{browser}transform-origin: right bottom;{browser}transform: rotate(0);opacity: 1;}",
    rotateOut:"0% {{browser}transform-origin: center center;{browser}transform: rotate(0);opacity: 1;}100% {{browser}transform-origin: center center;{browser}transform: rotate(200deg);opacity: 0;}",
    rotateOutUpLeft:"0% {{browser}transform-origin: left bottom;{browser}transform: rotate(0);opacity: 1;}100% {{browser}transform-origin: left bottom;{browser}transform: rotate(-90deg);opacity: 0;}",
    rotateOutDownLeft:"0% {{browser}transform-origin: left bottom;{browser}transform: rotate(0);opacity: 1;}100% {{browser}transform-origin: left bottom;{browser}transform: rotate(90deg);opacity: 0;}",
    rotateOutUpRight:"0% {{browser}transform-origin: right bottom;{browser}transform: rotate(0);opacity: 1;}100% {{browser}transform-origin: right bottom;{browser}transform: rotate(90deg);opacity: 0;}",
    rotateOutDownRight:"0% {{browser}transform-origin: right bottom;{browser}transform: rotate(0);opacity: 1;}100% {{browser}transform-origin: right bottom;{browser}transform: rotate(-90deg);opacity: 0;}",
    slideInLeft:"0% {opacity: 0;{browser}transform: translateX(-100%);}100% { opacity: 1; {browser}transform: translateX(0);}",
    slideInRight:"0% {opacity: 0;{browser}transform: translateX(100%);}100% {{browser}transform: translateX(0); opacity: 1;}",
    slideOutLeft:"0% {{browser}transform: translateX(0);}100% {{browser}transform: translateX(-100%);opacity: 0;}",
    slideOutRight:"0% {{browser}transform: translateX(0%);}100% {{browser}transform: translateX(100%);opacity: 0;}",
    shake:"0%, 100% {{browser}transform: translateX(0);}10%, 30%, 50%, 70%, 90% {{browser}transform: translateX(-10px);}20%, 40%, 60%, 80% {{browser}transform: translateX(10px);}",
    swing:"20%, 40%, 60%, 80%, 100% { {browser}transform-origin: top center; }20% { {browser}transform: rotate(15deg); }40% { {browser}transform: rotate(-10deg); }60% { {browser}transform: rotate(5deg); }80% { {browser}transform: rotate(-5deg); }100% { {browser}transform: rotate(0deg); }",
    tada:"0% {{browser}transform: scale(1);}10%, 20% {{browser}transform: scale(0.9) rotate(-3deg);}30%, 50%, 70%, 90% {{browser}transform: scale(1.1) rotate(3deg);}40%, 60%, 80% {{browser}transform: scale(1.1) rotate(-3deg);}100% {{browser}transform: scale(1) rotate(0);}",
    wiggle:"0% { {browser}transform: skewX(9deg); }10% { {browser}transform: skewX(-8deg); }20% { {browser}transform: skewX(7deg); }30% { {browser}transform: skewX(-6deg); }40% { {browser}transform: skewX(5deg); }50% { {browser}transform: skewX(-4deg); }60% { {browser}transform: skewX(3deg); }70% { {browser}transform: skewX(-2deg); }80% { {browser}transform: skewX(1deg); }90% { {browser}transform: skewX(0deg); }100% { {browser}transform: skewX(0deg); }",
    wobble:"0% { {browser}transform: translateX(0%); }15% { {browser}transform: translateX(-25%) rotate(-5deg); }30% { {browser}transform: translateX(20%) rotate(3deg); }45% { {browser}transform: translateX(-15%) rotate(-3deg); }60% { {browser}transform: translateX(10%) rotate(2deg); }75% { {browser}transform: translateX(-5%) rotate(-1deg); }100% { {browser}transform: translateX(0%); }",
    zoomIn: "0% {opacity: 0;{browser}transform: scale(.1);} 100% {{browser}transform: scale(1);}",
    zoomInCurved: '0% { {browser}transform: scale(0) translateX(-100%) translateY(-100%) } 100% { {browser}transform: scale(1) translateX(0) translateY(0) }',
    zoomInFlip: '0% { {browser}transform: scale(0) translateX(-100%) translateY(-100%) rotate(45deg) rotateX(-180deg) rotateY(-180deg) } 100% { {browser}transform: scale(1) translateX(0) translateY(0) rotate(0deg) rotateX(0deg) rotateY(0deg) }',
    zoomOut: "0% {{browser}transform: scale(1);} 100% { opacity: 0; {browser}transform: scale(.1);}",
    zoomOutCurved: '0% { {browser}transform: scale(1) translateX(0) translateY(0) } 100% { {browser}transform: scale(0) translateX(-100%)  translateY(-100%) }',
    zoomOutFlip: '0% { {browser}transform: scale(1) translateX(0) translateY(0) rotate(0deg) rotateX(0deg) rotateY(0deg) } 100% { {browser}transform: scale(0) translateX(-100%) translateY(-100%) rotate(45deg) rotateX(-180deg) rotateY(-180deg) }'
  };

  /*------------------------------------
   * miniMAC - magic
   ------------------------------------*/

  a.extend(a.animations, {
    magic: "0% { opacity: 1; {browser}transform-origin: 100% 200%; {browser}transform: scale(1, 1) rotate(0deg); } 100% { opacity: 0; {browser}transform-origin: 200% 500%; {browser}transform: scale(0, 0) rotate(270deg); }",
    openDownLeft: "0% { {browser}transform-origin: bottom left; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; } 100% { {browser}transform-origin: bottom left; {browser}transform: rotate(-110deg); {browser}animation-timing-function: ease-in-out;}",
    openDownRight: "0% { {browser}transform-origin: bottom right; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; } 100% { {browser}transform-origin: bottom right; {browser}transform: rotate(110deg); {browser}animation-timing-function: ease-in-out; }",
    openUpLeft: "0% { {browser}transform-origin: top left; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; } 100% { {browser}transform-origin: top left; {browser}transform: rotate(110deg); {browser}animation-timing-function: ease-in-out; }",
    openUpRight: "0% { {browser}transform-origin: top right; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out;} 100% { {browser}transform-origin: top right; {browser}transform: rotate(-110deg); {browser}animation-timing-function: ease-in-out;}",
    openDownLeftRetourn: "0% { {browser}transform-origin: bottom left; {browser}transform: rotate(-110deg); {browser}animation-timing-function: ease-in-out; } 100% { {browser}transform-origin: bottom left; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; }",
    openDownRightRetourn: "0% { {browser}transform-origin: bottom right; {browser}transform: rotate(110deg); {browser}animation-timing-function: ease-in-out; } 100% { {browser}transform-origin: bottom right; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; }",
    openUpLeftRetourn: "0% { {browser}transform-origin: top left; {browser}transform: rotate(110deg); {browser}animation-timing-function: ease-in-out; } 100% { {browser}transform-origin: top left; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; }",
    openUpRightRetourn: "0% { {browser}transform-origin: top right; {browser}transform: rotate(-110deg); {browser}animation-timing-function: ease-in-out; } 100% { {browser}transform-origin: top right; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; }",
    openDownLeftOut: "0% { opacity: 1; {browser}transform-origin: bottom left; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; } 100% { opacity: 0; {browser}transform-origin: bottom left; {browser}transform: rotate(-110deg); {browser}animation-timing-function: ease-in-out; }",
    openDownRightOut: "0% { opacity: 1; {browser}transform-origin: bottom right; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; } 100% { opacity: 0; {browser}transform-origin: bottom right; {browser}transform: rotate(110deg); {browser}animation-timing-function: ease-in-out; }",
    openUpLeftOut: "0% { opacity: 1; {browser}transform-origin: top left; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; } 100% { opacity: 0; {browser}transform-origin: top left; {browser}transform: rotate(110deg); {browser}animation-timing-function: ease-in-out; }",
    openUpRightOut: "0% { opacity: 1; {browser}transform-origin: top right; {browser}transform: rotate(0deg); {browser}animation-timing-function: ease-out; } 100% { opacity: 0; {browser}transform-origin: top right; {browser}transform: rotate(-110deg); {browser}animation-timing-function: ease-in-out; }",
    perspectiveDown: "0% { {browser}transform-origin: 0 100%; {browser}transform: perspective(800px) rotateX(0deg); } 100% { {browser}transform-origin: 0 100%; {browser}transform: perspective(800px) rotateX(-180deg); }",
    perspectiveLeft: "0% { {browser}transform-origin: 0 0; {browser}transform: perspective(800px) rotateY(0deg); } 100% { {browser}transform-origin: 0 0; {browser}transform: perspective(800px) rotateY(-180deg); }",
    perspectiveRight: "0% { {browser}transform-origin: 100% 0; {browser}transform: perspective(800px) rotateY(0deg); } 100% { {browser}transform-origin: 100% 0; {browser}transform: perspective(800px) rotateY(180deg); }",
    perspectiveUp: "0% { {browser}transform-origin: 0 0; {browser}transform: perspective(800px) rotateX(0deg); } 100% { {browser}transform-origin: 0 0; {browser}transform: perspective(800px) rotateX(180deg); }"
  });

})(window, animatio);
