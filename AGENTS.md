# AGENTS.md

## Project Overview

This is a **Nepali Input** project — a vanilla JavaScript plugin that converts Romanized Nepali input into Devanagari script on `<input>` and `<textarea>` elements. Think of it as a character-level Romanized Nepali keyboard, not a word-level transliterator.

## Setup

- No build tools required for now. Pure JS, no dependencies.
- Open `TestDoc.html` in a browser to test the plugin.
- The plugin is initialized by calling `NepaliInput.init(selector)` where selector can be a CSS selector string, an HTMLElement, or nothing (auto-detects `.nepali-input` elements).

## Code Style

- Vanilla JavaScript only (ES5-compatible, no modern syntax unless necessary)
- No framework dependencies
- IIFE pattern for encapsulation (`(function () { ... })()`)
- Explicit `window.X = { ... }` for public API exposure (not accidental globals)
- No comments unless explicitly asked — the user prefers clean code
- Keep responses concise — 4 lines max, unless user asks for detail

## Testing

- Manual browser testing via `TestDoc.html`
- Test inputs are tagged with `class="nepali-input"`
- Run init with `NepaliInput.init()` (no args) for auto-detection of `.nepali-input` elements

## Mapping Table (`spec.txt`)

- `spec.txt` defines the Romanized → Devanagari character mappings
- Format: `english_char -> devanagari_char`
- The JS plugin embeds mappings from this file — populate `spec.txt` with the full mapping table
- User populates `spec.txt`; the plugin loads from it

## Security Notes

- This plugin intercepts `keydown` events on target elements
- Never prevent default for navigation keys (Arrow keys, Tab, Escape, Enter, etc.)
- Always whitelist pass-through keys before checking the mapping table
- Mapped keys: prevent default and insert Devanagari char
- Unmapped keys: allow default (numbers, punctuation, etc. pass through)

## Ground Rules for Local LLM Work

- Be concise — the user prefers short, direct answers
- Don't add comments to code unless explicitly requested
- Don't commit unless explicitly asked
- Don't add summaries unless asked
- When the user says "no need to", take it literally
- User will provide spec data (mapping table) — wait for it before adding mappings
- Research is allowed — but confirm before making changes based on research
- Whenever user asks you to research a feature, assume contents of your memory may be outdated.
    - Start by web search of the relevant or close search terms and looking at top 5 results.
    - Ask follow up questions before choosing an approach on how to proceed.
- File access rules:
    - Don't delete anything on your own. If user asks you to delete something, always verify with a confirmation question/dialog.
    - You can read any file on the PC, except the ones explicitly forbidden.
    - You can only edit files in current working directory.
    - You can only create new files in current working directory.
    - You have permission to execute programs, but always ask first. You can ask to execute something this session, so that you get session wide permission for executing a tool.
