$(function(){

  gumshoe.init();

  $('#splash').find('h1').animate('vanishIn', function(){
    $('#splash').find('h2').animate('flipInY', function(){
      $('#download-now').transform({ opacity: 1 }).animate('tada');
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

    return eval(code)(1);
  });

  $('#animate_box').on('click',  function(){
    var code = $('#transform-code').val();

    return eval(code)(1);
  });
});
