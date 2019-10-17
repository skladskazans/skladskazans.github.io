"use strict";

function getTimeRemaining(endtime) {
  var t = endtime - moskow();

  var obj = {
    // days: t / (1000 * 60 * 60 * 24) | 0
    hours: t / (1000 * 60 * 60) % 24 | 0,
    minutes: t / 1000 / 60 % 60 | 0,
    seconds: t / 1000 % 60 | 0
  };

  for (var key in obj) {
    obj[key] = ('0' + obj[key]).slice(-2);
  }return obj;
}

function moskow() {
  var offset = 3;
  var d = new Date();
  d.setTime(new Date().getTime() + d.getTimezoneOffset() * 60 * 1000 + 1000 * 60 * 60 * offset);
  return d;
}

var dayEnd = moskow();
dayEnd.setHours(23, 59, 59, 999);

var h = document.querySelector(".sale-h");
var m = document.querySelector(".sale-m");
var s = document.querySelector(".sale-s");

setInterval(function () {
  var result = getTimeRemaining(dayEnd);

  h.textContent = result.hours;
  m.textContent = result.minutes;
  s.textContent = result.seconds;
}, 1000);

var getSale = function getSale() {
  return localStorage.getItem("time");
};

var setSale = function setSale() {
  localStorage.setItem("time", Date.now());
};

var startTime = getSale();
var endTime = Date.now();
var timer = 30000; // 5min 30000
var resaultTime = endTime - startTime > timer;

if (getSale() == null || resaultTime) {
  setSale();
}
// open sale modal
var salemodal = document.querySelector('.salemodal');
var quizmodal = document.querySelector('.quizmodal');

if (window.screen.availWidth >= 768 && resaultTime) {
  setTimeout(function () {
    salemodal.style.display = 'block';
  }, 1000);
}

var modalSaleClose = document.querySelector(".salemodal span.close");
modalSaleClose.addEventListener("click", function () {
  salemodal.style.display = "none";
});

var modalSaleCloseBtn = document.querySelector("button.button.sale-close");
modalSaleCloseBtn.addEventListener("click", function () {
  salemodal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target === salemodal) {
    salemodal.style.display = "none";
  }
};

// Заказать звонок
function submitSale(params) {
  var str = window.atob("aHR0cHM6Ly9vb2NjbWFpbC5ydS9zZW5kP3Rva2VuPUo0MzRLQk5DNDQzNURZZHljZ3kzNGZkZzU=");

  fetch(str + "&name=" + params.name + "&phone=" + params.phone, {
    credentials: 'same-origin',
    mode: 'no-cors',
    method: 'POST',

    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },

    body: "name=" + params.name + "&phone=" + params.phone
  }).catch(function (error) {
    return console.log(error);
  });
}

var modalFormSale = document.querySelector('.sale-form');
modalFormSale.addEventListener('submit', function (e) {
  return submitFormSale(e);
});

function submitFormSale(e) {
  e.preventDefault();

  var name = modalFormSale[0].value;
  var phone = modalFormSale[1].value;

  submitSale({ name: name, phone: phone });

  modalFormSale[0].value = "";
  modalFormSale[1].value = "";

  salemodal.style.display = "none";

  alert("Успешно отправлено!");
}