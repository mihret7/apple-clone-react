
import $ from "jquery";
$(function () {
  const wrapperClass = ".footer-links-wrapper";
  const someClass = "someClass";
  const expandedClass = "expanded";

  function toggleFooter() {
    if ($(window).width() <= 768) {
      $(".footer-links-wrapper").addClass("someClass");
    } else {
      $(".footer-links-wrapper").removeClass("someClass");
      $(".footer-links-wrapper ul").show();
    }
  }

  toggleFooter();

  $(window).on("resize", toggleFooter);

  // Footer collapse functionality
  $(document).on("click", ".footer-links-wrapper h3", function () {
    $(this).next("ul").slideToggle();
    $(this).toggleClass("expanded");
  });
});
