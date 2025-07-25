# intercepting-canvas
Records and generates replayable pseudo-code for all Canvas 2D API operations

## Installation Guide

1. Install the Tampermonkey browser extension.

2. Add the Script.js to your Tampermonkey script. If needed, you can build from the TypeScript source code and combine it with the same Tampermonkey headers.

3. Navigate to the website where you want to record Canvas 2D API operations.

4. To generate the pseudo code for your canvas operations, call:
```javascript
console.log(ctx.generatePseudoCode());
```
where `ctx` is your CanvasRenderingContext2D object (An object can obtained by setting breakpoint on operation code). 

5. The pseudo code will be displayed in your console.

**Of course, turn this script off when you're not using the script. It'll slow down games that use the Canvas 2D API a lot (since it records all operations).**

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
