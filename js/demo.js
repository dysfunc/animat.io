animatio(function(){

  gumshoe.init();

  var buttons = animatio('.btn').each(function(){
    this.addEventListener('click', function(){

      var img = animatio(this).parent().parent().parent().find('.html-badge'),
          animation = animatio(this).data('effect');

      img.animate(animation, function(){
        animatio(this).animate('reset');
      });
    });
  });

  animatio('#growl').on('click', function(){
    animatio('#notification').animate('fadeInUpBig', { duration: 750 }, function(){
      this.style.opacity = 1;

      animatio(this).animate('fadeOutUpBig', {
        delay: 750,
        duration: 750
      });
    });
  });

  animatio('#animate_box').on('click',  function(){
    animatio('#animate_me').animate('lightSpeedIn', function(){
      animatio(this).animate('lightSpeedOut', function(){
        animatio(this).animate('flipInX', function(){
          //not relative
          animatio(this)
            .animate('swing')
            .transform({ left: '20%', top: 60, opacity: 1, width: 500, height: 200 }, 1000, function(){
            //relative string
            animatio(this).animate('flipInX').transform({ left: '-=100', top: '+=60', opacity: 1, width: '+=500', height: 200 }, 1000, function(){
              //relative stringify
              animatio(this).animate('swing').transform({ left: '-=' + 100, top: '+=' + 60, opacity: 1, width: '+=' + 500, height: 200 }, 1000, function(){
                animatio(this).transform({ left: '50%', top: '+=' + 60, borderRadius: '4px', width: '-=' + 800, height: 80}, 1000, function(){
                  animatio(this).animate('flipOutX', function(){
                    animatio(this).animate('flipInY', function(){
                      animatio(this).transform({ left: '-=100', top: '+=' + 60, opacity: 1, width: '+=' + 500, height: 500 }, 1000, function(){
                        animatio(this).transform({ left: '50', borderRadius: '2px', top: 40, width: '50%', height: 100}, 1500, function(){
                          animatio(this).transform({ left: '50%', top: '50%', width: 50, height: 50, borderRadius: 0, opacity: 1 }, 1500);
                        });
                      });
                    });
                  });

                  animatio(this).transform({ borderRadius: 0, width: 50, height: 50 }, 1000);
                });
              });
            });
          });
        });
      });
    });
  });
});
