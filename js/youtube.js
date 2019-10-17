'use strict';

if (window.screen.availWidth >= 992) {
  var s = 3;
  var p = 3;
}

if (window.screen.availWidth < 991) {
  var s = 2;
  var p = 2;
}

if (window.screen.availWidth < 768) {
  var s = 1;
  var p = 1;
}

var swiper = new Swiper('.swiper-container', {
  slidesPerView: s,
  spaceBetween: 30,
  slidesPerGroup: p,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});