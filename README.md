# intercepting-canvas
Records and generates replayable pseudo-code for all Canvas 2D API operations

## Installation Guide

1. First, install the Tampermonkey browser extension.

2. Add the Output.js to your Tampermonkey script. If needed, you can build from the TypeScript source code and combine it with the same Tampermonkey headers.

3. Navigate to the website where you want to record Canvas 2D API operations.

4. To generate the pseudo code for your canvas operations, call:
```javascript
console.log(ctx.generatePseudoCode());
```
where `ctx` is your CanvasRenderingContext2D object.

5. The pseudo code will be displayed in your console.

## How It Works

This script intercepts Canvas 2D API calls and records them as readable JavaScript code. It works by:
- Proxying the native Canvas API methods
- Recording all operations performed on the canvas
- Generating equivalent JavaScript code that can reproduce the canvas operations

## Example Usage

When you perform canvas operations like:
```javascript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 100);

console.log(ctx.generatePseudoCode());
```

You'll get output like:
```javascript
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 100, 100);
```

This generated code can be used to recreate the same canvas operations elsewhere.
