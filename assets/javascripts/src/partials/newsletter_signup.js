// Newsletter signup

import { gsap } from 'gsap';

App.$document.on('click', '#newsletter-signup-button', function() {
  var $overlay = $('#newsletter-overlay');
  var $inner = $('#newsletter-overlay__inner');

  $overlay.css({ opacity: 0 }).show();
  $inner.css({ opacity: 0 });

  gsap.to($overlay, {
    opacity: 1,
    duration: 1,
    ease: 'linear'
  });

  gsap.to($inner, {
    opacity: 1,
    duration: 0.5,
    delay: 0.75,
    ease: 'linear'
  });
});

(function() {
  var closeNewsletterOverlay = function() {
    var $overlay = $('#newsletter-overlay');

    if ( !$overlay.is(':visible') ) {
      return;
    }

    var $inner = $('#newsletter-overlay__inner');

    gsap.to($inner, {
      opacity: 0,
      duration: 0.75,
      ease: 'linear',
      onComplete: function() {
        gsap.to($overlay, {
          opacity: 0,
          duration: 1,
          ease: 'linear',
          onComplete: function() {
            $overlay.hide();
          }
        });
      }
    });
  };

  App.$document.on('click', '#newsletter-overlay__close', closeNewsletterOverlay);

  App.$document.on('keyup', function(e) {
    // Escape key
    if ( e.keyCode === 27 ) {
      closeNewsletterOverlay();
    }
  });
})();

App.setEmailSignupSuccess = function() {
  var $wrapper = $('#mc-embed-signup-form-wrapper');
  var successMessage = $wrapper.attr('data-success-message');

  $wrapper.html( '<div class="signup-form__success-message medium-text text-center color-blue">' + successMessage + '</div>' );
};

$(document).on('submit', '#mc-embed-signup-form', function() {
  var $form = $(this);
  var $wrapper = $form.closest('#mc-embed-signup-form-wrapper');
  var $errors = $wrapper.find('#mc-embed-signup-errors');

  $.ajax({
    type: 'GET',
    url: $form.attr('action'),
    data: $form.serialize(),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function(data) {
      $errors.addClass('active').html('Could not connect to the registration server.');
    },
    success: function(data) {
      if ( data.result != 'success' ) {
        $errors.addClass('active').html( data.msg.replace(/^\d* - /, '') );
      } else {
        App.setEmailSignupSuccess();
      }
    }
  });

  return false;
});
