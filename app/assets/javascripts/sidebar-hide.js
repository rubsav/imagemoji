$(document).ready(function(){
  $("#questions-sidebar").css({"display":"none"});
  $("#questions-sidebar").removeClass('expanded');
  $('body').css('background-color', '#fff');

  $("#questions-sidebar").css({
    "margin-left": "-100%",
  });

  $('.site-content').css({
    "left": 0,
    "margin-left": 0
  });

});
