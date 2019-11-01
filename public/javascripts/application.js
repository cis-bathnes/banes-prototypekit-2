/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}





$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  function showHideMenu(){
    var element = document.getElementById("navigation-primary");
  
    if (element.classList) {
        element.classList.toggle("navigation-primary--active");
    } else {
        // For IE9
        var classes = element.className.split(" ");
        var i = classes.indexOf("navigation-primary--active");
  
        if (i >= 0)
            classes.splice(i, 1);
        else
            classes.push("navigation-primary--active");
            element.className = classes.join(" ");
    }
  }

})

$('#sign-in-2').click(function() {
  if($('#sign-in-2').is(':checked')) { 
    $('.govuk-inset-text').removeClass('govuk-visually-hidden'); }

  });

  $('#sign-in').click(function() {
    if($('#sign-in').is(':checked')) { 
      $('.govuk-inset-text').addClass('govuk-visually-hidden'); }
  
    });


