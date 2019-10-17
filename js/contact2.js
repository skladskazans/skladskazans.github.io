'use strict';

// Заказать звонок
function submitEmail2(type, params) {
  var str = window.atob("aHR0cHM6Ly9vb2NjbWFpbC5ydS9zZW5kP3Rva2VuPUo0MzRLQk5DNDQzNURZZHljZ3kzNGZkZzU=");
  var arr = {
    submitEmail: 'name=' + params.name + '&phone=' + params.phone
  };

  fetch('' + str, {
    credentials: 'same-origin',
    mode: 'no-cors',
    method: 'POST',

    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },

    body: arr[type]
  }).catch(function (error) {
    return console.log(error);
  });
}

var modalFormReviews2 = document.querySelector('#perezvon');

modalFormReviews2.addEventListener('submit', function (event) {
  return submitFormReviews2(event);
});

function submitFormReviews2(event) {
  event.preventDefault();

  var name = modalFormReviews2[0].value;
  var phone = modalFormReviews2[1].value;

  submitEmail2('submitEmail', { name: name, phone: phone });

  modalFormReviews2[0].value = "";
  modalFormReviews2[1].value = "";

  var modal = document.querySelector("#modal-close");
  modal.click();

  alert("Успешно отправлено!");
}