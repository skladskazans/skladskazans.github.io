"use strict";

//1
var imgs = document.querySelector(".otvet-all");
var otvetFull = document.querySelector(".otvet-full");

imgs.addEventListener('click', function (event) {
  return imgClick(event);
});

function imgClick(event) {
  var element = event.target;
  var img = element.getAttribute('src');

  if (img) {
    otvetFull.setAttribute('src', img);
  }
}

//2
var imgs2 = document.querySelector(".paletirovanie-all");
var otvetFull2 = document.querySelector(".paletirovanie-full");

imgs2.addEventListener('click', function (event) {
  return imgClick2(event);
});

function imgClick2(event) {
  var element = event.target;
  var img = element.getAttribute('src');

  if (img) {
    otvetFull2.setAttribute('src', img);
  }
}

//3
var imgs3 = document.querySelector(".melk-all");
var otvetFull3 = document.querySelector(".melk-full");

imgs3.addEventListener('click', function (event) {
  return imgClick3(event);
});

function imgClick3(event) {
  var element = event.target;
  var img = element.getAttribute('src');

  if (img) {
    otvetFull3.setAttribute('src', img);
  }
}

//4
var imgs4 = document.querySelector(".mebel-all");
var otvetFull4 = document.querySelector(".mebel-full");

imgs4.addEventListener('click', function (event) {
  return imgClick4(event);
});

function imgClick4(event) {
  var element = event.target;
  var img = element.getAttribute('src');

  if (img) {
    otvetFull4.setAttribute('src', img);
  }
}

//5
var imgs5 = document.querySelector(".arhiv-all");
var otvetFull5 = document.querySelector(".arhiv-full");

imgs5.addEventListener('click', function (event) {
  return imgClick5(event);
});

function imgClick5(event) {
  var element = event.target;
  var img = element.getAttribute('src');

  if (img) {
    otvetFull5.setAttribute('src', img);
  }
}