(function () {
  var NEPALI_INPUT_CLASS = "nepali-input";
  var VERSION = "1.0.0";

  var MAPPINGS = {
    Digit1: { withShift: "!", withoutShift: "१" },
    Digit2: { withShift: "@", withoutShift: "२" },
    Digit3: { withShift: "#", withoutShift: "३" },
    Digit4: { withShift: "$", withoutShift: "४" },
    Digit5: { withShift: "%", withoutShift: "५" },
    Digit6: { withShift: "^", withoutShift: "६" },
    Digit7: { withShift: "&", withoutShift: "७" },
    Digit8: { withShift: "*", withoutShift: "८" },
    Digit9: { withShift: "(", withoutShift: "९" },
    Digit0: { withShift: ")", withoutShift: "०" },
    Minus: { withShift: "_", withoutShift: "-" },
    Equal: { withShift: "\u200C", withoutShift: "\u200D" },
    BracketLeft: { withShift: "ई", withoutShift: "इ" },
    BracketRight: { withShift: "ऐ", withoutShift: "ए" },
    Backslash: { withShift: "ः", withoutShift: "ॐ" },
    Semicolon: { withShift: ":", withoutShift: ";" },
    Quote: { withShift: '"', withoutShift: "'" },
    Comma: { withShift: "ङ", withoutShift: "," },
    Period: { withShift: "॥", withoutShift: "।" },
    Slash: { withShift: "?", withoutShift: "्" },
    KeyQ: { withShift: "ठ", withoutShift: "ट" },
    KeyW: { withShift: "औ", withoutShift: "ौ" },
    KeyE: { withShift: "ै", withoutShift: "े" },
    KeyR: { withShift: "ृ", withoutShift: "र" },
    KeyT: { withShift: "थ", withoutShift: "त" },
    KeyY: { withShift: "ञ", withoutShift: "य" },
    KeyU: { withShift: "ू", withoutShift: "ु" },
    KeyI: { withShift: "ी", withoutShift: "ि" },
    KeyO: { withShift: "ओ", withoutShift: "ो" },
    KeyP: { withShift: "फ", withoutShift: "प" },
    KeyA: { withShift: "आ", withoutShift: "ा" },
    KeyS: { withShift: "श", withoutShift: "स" },
    KeyD: { withShift: "ध", withoutShift: "द" },
    KeyF: { withShift: "ऊ", withoutShift: "उ" },
    KeyG: { withShift: "घ", withoutShift: "ग" },
    KeyH: { withShift: "अ", withoutShift: "ह" },
    KeyJ: { withShift: "झ", withoutShift: "ज" },
    KeyK: { withShift: "ख", withoutShift: "क" },
    KeyL: { withShift: "ळ", withoutShift: "ल" },
    KeyZ: { withShift: "ऋ", withoutShift: "ष" },
    KeyX: { withShift: "ढ", withoutShift: "ड" },
    KeyC: { withShift: "छ", withoutShift: "च" },
    KeyV: { withShift: "ँ", withoutShift: "व" },
    KeyB: { withShift: "भ", withoutShift: "ब" },
    KeyN: { withShift: "ण", withoutShift: "न" },
    KeyM: { withShift: "ं", withoutShift: "म" },
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

  function resolveKey(code, shiftKey) {
    var mapping = _currentMappings[code];
    if (!mapping) return null;
    return shiftKey ? mapping.withShift : mapping.withoutShift;
  }

  var _currentMappings = MAPPINGS;

  // Inserts a string at a specific position within another string,
  // simulating text insertion at the cursor point in a form field.
  // Finally returns modified string and new cursor position.
  function insertAtCursor(text, start, output) {
    var before = text.substring(0, start);
    return { text: before + output, position: start + output.length };
  }

  function _onKeydown(e) {
    var el = e.target;
    var code = e.code;
    var hasShift = e.shiftKey;

    for (var i = 0; i < PASS_THROUGH.length; i++) {
      if (code === PASS_THROUGH[i]) return;
    }

    if (MAPPINGS[code]) {
      var output = resolveKey(code, hasShift);
      if (!output) return;

      e.preventDefault();

      var result = insertAtCursor(el.value, el.selectionStart, output);
      el.value = result.text;
      el.setSelectionRange(result.position, result.position);
    }
  }

  function _init(selector) {
    var options = arguments[1];
    var mappings = options && options.mappings ? options.mappings : MAPPINGS;
    _currentMappings = mappings;
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
    VERSION: VERSION,
  };
})();
