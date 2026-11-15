# Contributing to Nepali Input

## How to Contribute

### 1. Update the Mapping Table

Edit `Src/spec.csv` with new or corrected mappings. Each row should follow this format:

```
keycode,withShift,output
KeyA,false,ा
KeyA,true,आ
```

### 2. Update the Plugin

The mappings in `spec.csv` should be reflected in `Src/NepaliInput.js`. Update the `MAPPINGS` object to match.

### 3. Test

Open `Sample/Sample.html` in a browser and verify each mapped key produces the correct Devanagari character.

### 4. Submit

Create a pull request with your changes. Include a brief description of what you changed.

## Code Contributions

Bug fixes and improvements are welcome. Before submitting:

- Test your changes in `Sample/Sample.html`
- Keep the plugin minimal — no dependencies, no build tools
- Follow the existing code style (IIFE, ES5-compatible)

For new features, open an issue first to discuss whether it fits the project's scope.

## Guidelines

- Keep the plugin minimal — no dependencies, no build tools
- Follow the existing code style (IIFE, ES5-compatible)
- Test your changes in `Sample/Sample.html` before submitting
