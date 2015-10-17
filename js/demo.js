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
    var code = $('#notification-code').val();

    return eval(code)(1);
  });

  $('#animate_box').on('click',  function(){
    var code = $('#transform-code').val();

    return eval(code)(1);
  });
});
