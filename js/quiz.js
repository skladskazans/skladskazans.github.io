"use strict";

var Sender = function () {
  return {
    email: function email(quize, phone) {
      var answers = "";

      quize.quizes.forEach(function (i) {
        i.answers.forEach(function (i) {
          if (i.checked === 'checked') {
            answers += " " + i.answer + ",";
          }
        });
      });

      var str = window.atob("aHR0cHM6Ly9vb2NjbWFpbC5ydS9zZW5kP3Rva2VuPUo0MzRLQk5DNDQzNURZZHljZ3kzNGZkZzU=");

      fetch("" + str, {
        credentials: 'same-origin',
        mode: 'no-cors',
        method: 'POST',

        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },

        body: "phone=" + phone + "&quize=" + answers.slice(0, -1)
      }).catch(function (error) {
        return console.log(error);
      });
    },

    sms: function sms(phone) {
      var str = window.atob("aHR0cHM6Ly9zbXMucnUvc21zL3NlbmQ/YXBpX2lkPUIxNTY2OUQzLTUyNjYtQjVDOC0zODhFLUEwNjRDQTZCQzJDNQ==");
      var number = window.atob("NzkyNzAwOTY2MTY=");

      fetch("" + str, {
        credentials: 'same-origin',
        mode: 'no-cors',
        method: 'POST',

        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },

        body: "to=" + number + "&msg=\u0417\u0430\u044F\u0432\u043A\u0430 \u0438\u0437 \u043A\u0432\u0438\u0437\u0430: " + phone + "&json=1"
      }).catch(function (error) {
        return console.log(error);
      });
    }
  };
}();

var Quize = function () {
  var data = {
    quizes: [{ id: 0,
      question: "Какую площадь для хранения вы рассматриваете?",
      answers: [{ id: 1, answer: "1 - 10 паллет мест кв/м2", checked: '' }, { id: 2, answer: "10 - 30 паллет мест кв/м2", checked: '' }, { id: 3, answer: "30 и более паллет мест кв/м2", checked: '' }],
      progress: 33
    }, { id: 1,
      question: "Какой срок хранения вам необходим?",
      answers: [{ id: 1, answer: "от 1 до 30 дней", checked: '' }, { id: 2, answer: "от 30 и более дней", checked: '' }],
      progress: 66
    }],

    quizeIndex: 0
  };

  return {
    show: function show() {
      return data;
    },

    updateQuizeIndex: function updateQuizeIndex(index) {
      data.quizeIndex += index;
    },

    clearAnswersQuize: function clearAnswersQuize(quizeId) {
      data.quizes[quizeId].answers.forEach(function (i) {
        i.checked = "";
      });
    },

    checkedQuize: function checkedQuize(quizeId, answerId) {
      Quize.clearAnswersQuize(quizeId);
      data.quizes[quizeId].answers[answerId - 1].checked = "checked";
    },

    clearAllData: function clearAllData() {
      data.quizeIndex = 0;

      data.quizes.forEach(function (v, i) {
        Quize.clearAnswersQuize(i);
      });
    }
  };
}();

var QuizeUI = function () {
  var selectors = {
    quizeQuestion: ".quize-question",
    progressBarTitle: ".quize-progress-bar-title span",
    progress: "progress",
    quizeAnswers: ".quize-answers",
    sliderButtons: ".slider button",
    quizeModal: ".quizmodal",
    closeModalQuiz: ".quize-close",
    nextButtonQuiz: ".quize-next",
    backButtonQuiz: ".quize-back",
    quizeAnswer: ".quize-answer",
    quizeRadio: ".quize-radio",
    quizeLeft: ".quize-left",
    quizeId: "#quize-left",
    quizeForm: ".quize-form",
    quizePhone: ".quize-form-phone",
    quizeInfo: ".quizeModalInfo.modal span.close",
    quizeModalInfo: ".quizeModalInfo"
  };

  return {
    getSelectors: function getSelectors() {
      return selectors;
    },

    showTitleQuize: function showTitleQuize(quize, index) {
      document.querySelector(selectors.quizeQuestion).textContent = quize[index].question;
      document.querySelector(selectors.quizeQuestion).setAttribute("id", quize[index].id);
    },

    showProgressQuize: function showProgressQuize(quize, index) {
      document.querySelector(selectors.progress).value = quize[index].progress;
      document.querySelector(selectors.progressBarTitle).textContent = quize[index].progress + "%";
    },

    showRadioButtons: function showRadioButtons(quize, index) {
      var html = '';

      quize[index].answers.forEach(function (i) {
        html += "\n          <label class=\"quize-answer\">\n            <input class=\"quize-radio\" type=\"radio\" value=\"" + i.id + "\" name=\"radio\" " + i.checked + "/>\n            <span class=\"quize-check\"> </span>\n            <span class=\"quize-answer-text\"> " + i.answer + " </span>\n          </label>\n        ";
      });

      document.querySelector(selectors.quizeAnswers).innerHTML = html;
    },

    openModalQuize: function openModalQuize() {
      document.querySelector(selectors.quizeModal).style.display = "block";
    },

    closeModalQuize: function closeModalQuize() {
      document.querySelector(selectors.quizeModal).style.display = "none";
    },

    enableButtonNext: function enableButtonNext() {
      document.querySelector(selectors.nextButtonQuiz).disabled = false;
    },

    disableButtonNext: function disableButtonNext() {
      document.querySelector(selectors.nextButtonQuiz).disabled = true;
    },

    showButtonBack: function showButtonBack() {
      document.querySelector(selectors.backButtonQuiz).style.visibility = "visible";
    },

    hideButtonBack: function hideButtonBack() {
      document.querySelector(selectors.backButtonQuiz).style.visibility = "hidden";
    },

    EmptyRadioButton: function EmptyRadioButton() {
      QuizeUI.disableButtonNext();
      var quizeRadios = document.querySelectorAll(selectors.quizeRadio);

      for (var i = 0; i < quizeRadios.length; i++) {
        if (quizeRadios[i].checked) {
          QuizeUI.enableButtonNext();
        }
      }
    },

    clearStyleAnswer: function clearStyleAnswer() {
      var allQuiz = document.querySelectorAll(selectors.quizeAnswer);

      for (var i = 0; i < allQuiz.length; i++) {
        allQuiz[i].style.border = "1px solid #d9d8e6";
      }
    },

    borderColorRadioButton: function borderColorRadioButton(e) {
      var tar = e.target;
      var quizeId = document.querySelector(selectors.quizeQuestion).getAttribute('id');

      if (tar.classList.contains("quize-answer")) {
        QuizeUI.clearStyleAnswer();
        tar.style.border = "1px solid #e8522f";

        var quizeAnswer = tar.querySelector(".quize-radio").value;
        Quize.checkedQuize(quizeId, quizeAnswer);
      };

      if (tar.classList.contains("quize-answer-text") || tar.classList.contains("quize-check")) {
        QuizeUI.clearStyleAnswer();
        tar.parentNode.style.border = "1px solid #e8522f";

        var _quizeAnswer = tar.parentNode.querySelector(".quize-radio").value;
        Quize.checkedQuize(quizeId, _quizeAnswer);
      };

      QuizeUI.EmptyRadioButton();
    },

    show: function show(quize, index) {
      QuizeUI.showTitleQuize(quize, index);
      QuizeUI.showProgressQuize(quize, index);
      QuizeUI.showRadioButtons(quize, index);
      QuizeUI.EmptyRadioButton();
    },

    showForm: function showForm() {
      var html = '';

      html += "\n        <div class=\"quize-form-container\">\n          <div class=\"quize-form-icon\">\n            <svg class=\"icon icon-done \">\n              <use xlink:href=\"svg/symbol/sprite.svg#done\"></use>\n            </svg>\n          </div>\n\n          <div class=\"quize-form-title\">\n            <h3>\u041E\u0442\u043B\u0438\u0447\u043D\u043E! \u041E\u0441\u0442\u0430\u043B\u0441\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0448\u0430\u0433.</h3>\n          </div>\n\n          <div class=\"quize-progress-bar\">\n            <div class=\"quize-progress-bar-title\">\n              <p>\u0413\u043E\u0442\u043E\u0432\u043E: <span>95%</span></p>\n            </div>\n            <div class=\"quize-progress-bar-line\">\n              <div class=\"progress\">\n                <progress max=\"100\" value=\"95\"></progress>\n                <div class=\"progress-bg\">\n                  <div class=\"progress-bar\"></div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"quize-form-wrap\">\n            <div class=\"quize-form-left\">\n              <p>\n                \u0427\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u043C \u043E\u043F\u0440\u043E\u0441\u0430 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u043A\u0438\u0434\u043A\u0443 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430:\n              </p>\n            </div>\n\n            <div class=\"quize-form-right\">\n              <form class=\"quize-form\">\n                <label>\u0412\u0412\u0415\u0414\u0418\u0422\u0415 \u0422\u0415\u041B\u0415\u0424\u041E\u041D</label>\n                <input class=\"quize-form-phone\" type=\"phone\" placeholder=\"+7 (900) 000-00-00\" required=''>\n                <button type=\"submit\" class=\"quize-form-button\" onclick=\"yaCounter55811959.reachGoal('1'); return true;\">\n                  <span>\n                    <svg class=\"icon icon-qcheck\">\n                      <use xlink:href=\"svg/symbol/sprite.svg#qcheck\"></use>\n                    </svg>\n                  </span>\n\n                  <span>\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043A\u0438\u0434\u043A\u0443</span>\n                </button>\n                <div class=\"quize-form-policy\">\n                  <p>\n                    \u041D\u0430\u0436\u0438\u043C\u0430\u044F \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0443 \"\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043A\u0438\u0434\u043A\u0443\", \u044F \u0434\u0430\u044E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 <a href=\"/policy.html\" target=\"_blank\">\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445</a>\n                  </p>\n                </div>\n              </form>\n            </div>\n          </div>\n        </div>\n      ";

      document.querySelector(selectors.quizeLeft).innerHTML = html;
    },

    clearAnswers: function clearAnswers() {
      var html = '';

      html += "\n        <div class=\"quize-title\">\n          <svg class=\"icon icon-qcheck-form \">\n            <use xlink:href=\"svg/symbol/sprite.svg#qcheck-form\"></use>\n          </svg>\n          <h5>\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u043A\u0430\u043A\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u043E\u0434\u043E\u0439\u0434\u0435\u0442 \u0438\u043C\u0435\u043D\u043D\u043E \u0412\u0430\u043C!</h5>\n        </div>\n        <hr>\n        <div class=\"quize-question\"></div>\n        <div class=\"quize-progress-bar\">\n          <div class=\"quize-progress-bar-title\">\n            <p>\u0413\u043E\u0442\u043E\u0432\u043E: <span></span></p>\n          </div>\n          <div class=\"quize-progress-bar-line\">\n            <div class=\"progress\">\n              <progress max=\"100\" value=\"0\"></progress>\n              <div class=\"progress-bg\">\n                <div class=\"progress-bar\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"quize-answers-container\">\n          <div class=\"quize-answers\"></div>\n        </div>\n        <div class=\"quize-buttons\">\n          <button class=\"quize-back\">\n            <svg class=\"icon icon-qleft-arrow \">\n              <use xlink:href=\"svg/symbol/sprite.svg#qleft-arrow\"></use>\n            </svg> \u041D\u0430\u0437\u0430\u0434\n          </button>\n          <button class=\"quize-next\">\n            <svg class=\"icon icon-qcheck \">\n              <use xlink:href=\"svg/symbol/sprite.svg#qcheck\"></use>\n            </svg> \u0414\u0430\u043B\u0435\u0435\n          </button>\n        </div>\n      ";
      document.querySelector(selectors.quizeLeft).innerHTML = html;
    },

    closeQuizeInfo: function closeQuizeInfo() {
      document.querySelector(selectors.quizeModalInfo).style.display = "none";
    },

    openQuizeInfo: function openQuizeInfo() {
      document.querySelector(selectors.quizeModalInfo).style.display = "block";
    }
  };
}();

var QuizeApp = function (Sender, Quize, QuizeUI) {
  var selectors = QuizeUI.getSelectors();

  var loadEventsListeners = function loadEventsListeners() {
    var sliderButtons = document.querySelectorAll(selectors.sliderButtons);

    for (var i = 0; i < sliderButtons.length; i++) {
      sliderButtons[i].addEventListener('click', QuizeUI.openModalQuize);
    }

    document.querySelector(selectors.closeModalQuiz).addEventListener("click", QuizeUI.closeModalQuize);
    document.querySelector(selectors.closeModalQuiz).addEventListener("click", QuizeUI.closeModalQuize);

    document.querySelector(selectors.quizeInfo).addEventListener("click", QuizeUI.closeQuizeInfo);

    eventsRadioButtons();
    evetnButtonNextQuize();
    evetnButtonBackQuize();
  };

  var showQuize = function showQuize(number) {
    var quize = Quize.show();
    var index = quize.quizeIndex + number;

    if (index === 0) {
      Quize.updateQuizeIndex(number);
      QuizeUI.show(quize.quizes, index);

      QuizeUI.hideButtonBack();
    }

    if (index >= 1 && index < quize.quizes.length) {
      Quize.updateQuizeIndex(number);
      QuizeUI.show(quize.quizes, index);

      QuizeUI.showButtonBack();
    }

    if (index === quize.quizes.length) {
      QuizeUI.showForm();
      eventSendQuize();
    }

    eventsRadioButtons();
  };

  var sendQuize = function sendQuize(e) {
    e.preventDefault();
    var quize = Quize.show();
    var selectors = QuizeUI.getSelectors();
    var phone = document.querySelector(selectors.quizePhone).value;

    QuizeUI.closeModalQuize();

    QuizeUI.openQuizeInfo();
    setTimeout(function () {
      QuizeUI.closeQuizeInfo();
    }, 5000);

    Sender.email(quize, phone);
    //Sender.sms(phone);

    Quize.clearAllData();
    QuizeUI.clearAnswers();
    showQuize(0);

    eventsRadioButtons();
    evetnButtonNextQuize();
    evetnButtonBackQuize();
  };

  var eventSendQuize = function eventSendQuize() {
    document.querySelector(selectors.quizeForm).addEventListener("submit", function (e) {
      return sendQuize(e);
    });
  };

  var evetnButtonNextQuize = function evetnButtonNextQuize() {
    document.querySelector(selectors.nextButtonQuiz).addEventListener("click", function () {
      return showQuize(1);
    });
  };

  var evetnButtonBackQuize = function evetnButtonBackQuize() {
    document.querySelector(selectors.backButtonQuiz).addEventListener("click", function () {
      return showQuize(-1);
    });
  };

  var eventsRadioButtons = function eventsRadioButtons() {
    var allQuize = document.querySelectorAll(selectors.quizeAnswer);

    for (var i = 0; i < allQuize.length; i++) {
      allQuize[i].addEventListener('click', QuizeUI.borderColorRadioButton);
    }
  };

  return {
    init: function init() {
      var quize = Quize.show();
      var index = quize.quizeIndex;
      QuizeUI.show(quize.quizes, index);

      loadEventsListeners();
    }
  };
}(Sender, Quize, QuizeUI);

QuizeApp.init();