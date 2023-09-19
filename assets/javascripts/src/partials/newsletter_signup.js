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

App.$document.on('click', '#newsletter-overlay__close', function() {
  var $overlay = $('#newsletter-overlay');
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
});
