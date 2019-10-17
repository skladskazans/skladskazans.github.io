'use strict';

// ЗАКАЖИТЕ БЕСПЛАТНУЮ КОНСУЛЬТАЦИЮ
function submitEmail(params) {
  var str = window.atob("aHR0cHM6Ly9vb2NjbWFpbC5ydS9zZW5kP3Rva2VuPUo0MzRLQk5DNDQzNURZZHljZ3kzNGZkZzU=");

  fetch('' + str, {
    credentials: 'same-origin',
    mode: 'no-cors',
    method: 'POST',

    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },

    body: 'name=' + params.name + '&phone=' + params.phone
  }).catch(function (error) {
    return console.log(error);
  });
}

function validaionForm(e, form) {
  e.preventDefault();

  var name = form[0].value;
  var phone = form[1].value;

  submitEmail({ name: name, phone: phone });

  form[0].value = "";
  form[1].value = "";

  var modal = document.querySelector("#modal-close");
  modal.click();

  alert("Успешно отправлено!");
}

// modal form
var modalForm = document.querySelector('#perezvon');
modalForm.addEventListener('submit', function (e) {
  return validaionForm(e, modalForm);
});

// konsul form
var konsulForm = document.querySelector('#konsul');
konsulForm.addEventListener('submit', function (e) {
  return validaionForm(e, konsulForm);
});

// Кросс-докинг
var krossForm = document.querySelector('#kross');
krossForm.addEventListener('submit', function (e) {
  return validaionForm(e, krossForm);
});

// services otvet
var otvetForm = document.querySelector('#otvet');
otvetForm.addEventListener('submit', function (e) {
  return validaionForm(e, otvetForm);
});

// services palet
var paletForm = document.querySelector('#paletirovanie');
paletForm.addEventListener('submit', function (e) {
  return validaionForm(e, paletForm);
});

// services melk
var melkForm = document.querySelector('#melk');
melkForm.addEventListener('submit', function (e) {
  return validaionForm(e, melkForm);
});

// services mebel
var mebelForm = document.querySelector('#mebel');
mebelForm.addEventListener('submit', function (e) {
  return validaionForm(e, mebelForm);
});

// services arhiv
var arhivForm = document.querySelector('#arhiv');
arhivForm.addEventListener('submit', function (e) {
  return validaionForm(e, arhivForm);
});