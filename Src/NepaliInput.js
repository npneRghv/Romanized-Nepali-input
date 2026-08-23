(function () {
  var NEPALI_INPUT_CLASS = "nepali-input";


  var MAPPINGS = {
    KeyA: { withShift: "आ", withoutShift: "ा" },
    KeyH: { withShift: "अ", withoutShift: "" },
    KeyK: { withShift: "ख", withoutShift: "क" },
    KeyS: { withShift: "श", withoutShift: "स" },
  };

  var PASS_THROUGH = [
    "Backspace",
    "Delete",
    "Enter",
    "Tab",
    "Escape",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "Insert",
  ];

  function _onKeydown(e) {
    var el = e.target;
    var code = e.code;
    var hasShift = e.shiftKey;

    for (var i = 0; i < PASS_THROUGH.length; i++) {
      if (code === PASS_THROUGH[i]) return;
    }

    if (MAPPINGS[code]) {
      var output = MAPPINGS[code][hasShift ? "withShift" : "withoutShift"];
      if (!output) return;

      e.preventDefault();

      var start = el.selectionStart;
      var end = el.selectionEnd;

      var before = el.value.substring(0, start);
      var after = el.value.substring(end);

      el.value = before + output + after;

      var newPos = start + output.length;
      el.setSelectionRange(newPos, newPos);
    }
  }

  function _init(selector) {
    var elements;

    if (!selector) {
      elements = document.querySelectorAll("." + NEPALI_INPUT_CLASS);
    } else if (typeof selector === "string") {
      elements = document.querySelectorAll(selector);
    } else if (selector instanceof HTMLElement) {
      elements = [selector];
    } else {
      return;
    }

    for (var i = 0; i < elements.length; i++) {

      elements[i].addEventListener("keydown", _onKeydown);
    }
  }

  window.NepaliInput = {
    init: _init,
  };
})();
