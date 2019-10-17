'use strict';

var menuLi = document.querySelectorAll(".menu-item");

for (var i = 0; i < menuLi.length; i++) {
  menuLi[i].addEventListener('mouseenter', function (event) {
    return hoverRed(event);
  });
}

for (var i = 0; i < menuLi.length; i++) {
  menuLi[i].addEventListener('mouseleave', function (event) {
    return hoverWhite(event);
  });
}

function hoverRed(event) {
  var element = event.target;

  element.style.background = "#e8522f";
  element.style.color = "#ffffff";
  element.children[0].style.color = "#ffffff";
  element.children[1].style.color = "#ffffff";
}

function hoverWhite(event) {
  var element = event.target;

  element.style.background = "#ffffff";
  element.style.color = "#e8522f";
  element.children[0].style.color = "#b8b8b8";
  element.children[1].style.color = "#e8522f";
}