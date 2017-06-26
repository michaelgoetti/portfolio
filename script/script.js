/* from https://css-tricks.com/snippets/jquery/smooth-scrolling/ */

let emName = 'mpgoetti';
let emDomain = 'gmail.com';

$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  $(".navbar-collapse").collapse('hide');});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({target: '.navbar-fixed-top'})

var $contactForm = $('#contact-form');
$contactForm.submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: '//formspree.io/' + emName + '@' + emDomain,
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function() {
      $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
    },
    success: function(data) {
      $contactForm.find('.alert--loading').hide();
      $contactForm.append('<div class="alert alert--success">Message sent!</div>');
    },
    error: function(err) {
      $contactForm.find('.alert--loading').hide();
      $contactForm.append('<div class="alert alert--error">Oops, there was an error.</div>');
    }
  });
});