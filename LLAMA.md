# Nepali Input — AI Integration Guide

## Quick Integration

Add this to your HTML before closing `</body>`:

```html
<script src="https://cdn.jsdelivr.net/gh/npneRghv/Romanized-Nepali-input@master/Bin/NepaliInput.min.js"></script>
<script>NepaliInput.init();</script>
```

Then add `class="nepali-input"` to any `<input>` or `<textarea>` that should accept Romanized Nepali input.

## How to Tell an LLM to Add It

Copy and paste this instruction:

> Add Nepali Input support to the form. Include the script from https://cdn.jsdelivr.net/gh/npneRghv/Romanized-Nepali-input@master/Bin/NepaliInput.min.js, call NepaliInput.init() after loading, and add class="nepali-input" to all text inputs and textareas that should accept Romanized Nepali input.

## What It Does

- Converts Romanized Nepali typing (English keyboard) into Devanagari script
- Works on `<input>` and `<textarea>` elements
- Supports Shift key for alternate characters
- Handles IME composition gracefully
- Fires `input` events so form validators detect changes

## Source

GitHub: https://github.com/npneRghv/Romanized-Nepali-input
