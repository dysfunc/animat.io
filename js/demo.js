$(function(){

  gumshoe.init();

  var buttons = $('.btn').each(function(){
    $(this).on('click', function(){

      var img = $(this).parent().parent().parent().find('.html-badge'),
          animation = $(this).data('effect');

      img.animate(animation, function(){
        $(this).animate('reset');
      });
    });
  });

  $('#growl').on('click', function(){
    $('#notification').animate('fadeInUpBig', { duration: 750 }, function(){
      this.style.opacity = 1;

      $(this).animate('fadeOutUpBig', {
        delay: 750,
        duration: 750
      });
    });
  });

  $('#animate_box').on('click',  function(){
    $('#animate_me').animate('lightSpeedIn', function(){
      $(this).animate('lightSpeedOut', function(){
        $(this).animate('flipInX', function(){
          //not relative
          $(this)
            .animate('swing')
            .transform({ left: '20%', top: 60, opacity: 1, width: 500, height: 200 }, 1000, function(){
            //relative string
            $(this).animate('flipInX').transform({ left: '-=100', top: '+=60', opacity: 1, width: '+=500', height: 200 }, 1000, function(){
              //relative stringify
              $(this).animate('swing').transform({ left: '-=' + 100, top: '+=' + 60, opacity: 1, width: '+=' + 500, height: 200 }, 1000, function(){
                $(this).transform({ left: '50%', top: '+=' + 60, borderRadius: '4px', width: '-=' + 800, height: 80}, 1000, function(){
                  $(this).animate('flipOutX', function(){
                    $(this).animate('flipInY', function(){
                      $(this).transform({ left: '-=100', top: '+=' + 60, opacity: 1, width: '+=' + 500, height: 500 }, 1000, function(){
                        $(this).transform({ left: '50', borderRadius: '2px', top: 40, width: '50%', height: 100}, 1500, function(){
                          $(this).transform({ left: '50%', top: '50%', width: 50, height: 50, borderRadius: 0, opacity: 1 }, 1500);
                        });
                      });
                    });
                  });

                  $(this).transform({ borderRadius: 0, width: 50, height: 50 }, 1000);
                });
              });
            });
          });
        });
      });
    });
  });
});
