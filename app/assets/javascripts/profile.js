$(document).ready(function() {
  $(".profile-questions-answered").click(function() {
    $(".profile-questions-toggle-answered").addClass("profile-questions-toggle-active");
    $(".profile-questions-toggle-asked").removeClass("profile-questions-toggle-active");
    $(".profile-questions-toggle-trophy").removeClass("profile-questions-toggle-active");

    $(".questions-asked").addClass("questions-hidden");
    $(".questions-trophy").addClass("questions-hidden");
    $(".questions-answered").removeClass("questions-hidden");
  });

  $(".profile-questions-asked").click(function() {
    $(".profile-questions-toggle-asked").addClass("profile-questions-toggle-active");
    $(".profile-questions-toggle-answered").removeClass("profile-questions-toggle-active");
    $(".profile-questions-toggle-trophy").removeClass("profile-questions-toggle-active");


    $(".questions-answered").addClass("questions-hidden");
    $(".questions-trophy").addClass("questions-hidden");
    $(".questions-asked").removeClass("questions-hidden");
  });

  $(".profile-questions-trophy").click(function() {
    $(".profile-questions-toggle-trophy").addClass("profile-questions-toggle-active");
    $(".profile-questions-toggle-answered").removeClass("profile-questions-toggle-active");
    $(".profile-questions-toggle-asked").removeClass("profile-questions-toggle-active");

    $(".questions-asked").addClass("questions-hidden");
    $(".questions-answered").addClass("questions-hidden");
    $(".questions-trophy").removeClass("questions-hidden");
  });
});
