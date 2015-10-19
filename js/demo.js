$(function(){

  gumshoe.init();

  $('#splash').find('h1').animate('vanishIn', function(){
    $('#splash').find('h2').animate('boingInUp', function(){
      $('#download-now').animate('lightSpeedIn');
    });
  });

  $('#download-now').click(function(){
    window.location.href = "http://github.com/dysfunc/animat.io/zipball/master/"
  });

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
    var code = $('#notification-code').val();

    return (1, eval)(code);
  });

  $('#animate_box').on('click',  function(){
    var code = $('#transform-code').val();

    return (1, eval)(code);
  });
});
