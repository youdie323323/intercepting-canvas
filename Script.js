// ==UserScript==
// @name         intercepting-canvas
// @namespace    http://tampermonkey.net/
// @version      0
// @description  Records and generates replayable pseudo-code for all Canvas 2D API operations
// @author       Youdi
// @match        *://*/*
// @grant        none
// ==/UserScript==

"use strict";
(() => {
    var i = class {
        constructor(t) {
            this.context = t;
            this.pseudoCode = new Array
        }
        toCallableContextOverloadMethod(t) {
            return t.bind(this.context)
        }
        toProcessedArguments(t, n) {
            let h = n.map(e => window.pathReferences.has(e) ? `(function(){
                            const path = new Path2D();

                            ${window.pathReferences.get(e).pseudoCode.join(`
`)}

                            return path;
                        })()` : JSON.stringify(e)).join(", ");
            return this.pseudoCode.push(`ctx.${t}(${h});`), n.map(e => window.pathReferences.has(e) ? window.pathReferences.get(e).originalPath : e)
        }
        pushSetProperty(t, n) {
            this.pseudoCode.push(`ctx.${t} = ${JSON.stringify(n)};`)
        }
        generatePseudoCode() {
            return this.pseudoCode.join(`
`)
        }
        set fontKerning(t) {
            this.pushSetProperty("fontKerning", t), this.context.fontKerning = t
        }
        get fontKerning() {
            return this.context.fontKerning
        }
        set fontStretch(t) {
            this.pushSetProperty("fontStretch", t), this.context.fontStretch = t
        }
        get fontStretch() {
            return this.context.fontStretch
        }
        set fontVariantCaps(t) {
            this.pushSetProperty("fontVariantCaps", t), this.context.fontVariantCaps = t
        }
        get fontVariantCaps() {
            return this.context.fontVariantCaps
        }
        set letterSpacing(t) {
            this.pushSetProperty("letterSpacing", t), this.context.letterSpacing = t
        }
        get letterSpacing() {
            return this.context.letterSpacing
        }
        set textRendering(t) {
            this.pushSetProperty("textRendering", t), this.context.textRendering = t
        }
        get textRendering() {
            return this.context.textRendering
        }
        set wordSpacing(t) {
            this.pushSetProperty("wordSpacing", t), this.context.wordSpacing = t
        }
        get wordSpacing() {
            return this.context.wordSpacing
        }
        get canvas() {
            return this.context.canvas
        }
        set direction(t) {
            this.pushSetProperty("direction", t), this.context.direction = t
        }
        get direction() {
            return this.context.direction
        }
        set fillStyle(t) {
            this.pushSetProperty("fillStyle", t), this.context.fillStyle = t
        }
        get fillStyle() {
            return this.context.fillStyle
        }
        set filter(t) {
            this.pushSetProperty("filter", t), this.context.filter = t
        }
        get filter() {
            return this.context.filter
        }
        set font(t) {
            this.pushSetProperty("font", t), this.context.font = t
        }
        get font() {
            return this.context.font
        }
        set globalAlpha(t) {
            this.pushSetProperty("globalAlpha", t), this.context.globalAlpha = t
        }
        get globalAlpha() {
            return this.context.globalAlpha
        }
        set globalCompositeOperation(t) {
            this.pushSetProperty("globalCompositeOperation", t), this.context.globalCompositeOperation = t
        }
        get globalCompositeOperation() {
            return this.context.globalCompositeOperation
        }
        set imageSmoothingEnabled(t) {
            this.pushSetProperty("imageSmoothingEnabled", t), this.context.imageSmoothingEnabled = t
        }
        get imageSmoothingEnabled() {
            return this.context.imageSmoothingEnabled
        }
        set imageSmoothingQuality(t) {
            this.pushSetProperty("imageSmoothingQuality", t), this.context.imageSmoothingQuality = t
        }
        get imageSmoothingQuality() {
            return this.context.imageSmoothingQuality
        }
        set lineCap(t) {
            this.pushSetProperty("lineCap", t), this.context.lineCap = t
        }
        get lineCap() {
            return this.context.lineCap
        }
        set lineDashOffset(t) {
            this.pushSetProperty("lineDashOffset", t), this.context.lineDashOffset = t
        }
        get lineDashOffset() {
            return this.context.lineDashOffset
        }
        set lineJoin(t) {
            this.pushSetProperty("lineJoin", t), this.context.lineJoin = t
        }
        get lineJoin() {
            return this.context.lineJoin
        }
        set lineWidth(t) {
            this.pushSetProperty("lineWidth", t), this.context.lineWidth = t
        }
        get lineWidth() {
            return this.context.lineWidth
        }
        set miterLimit(t) {
            this.pushSetProperty("miterLimit", t), this.context.miterLimit = t
        }
        get miterLimit() {
            return this.context.miterLimit
        }
        set shadowBlur(t) {
            this.pushSetProperty("shadowBlur", t), this.context.shadowBlur = t
        }
        get shadowBlur() {
            return this.context.shadowBlur
        }
        set shadowColor(t) {
            this.pushSetProperty("shadowColor", t), this.context.shadowColor = t
        }
        get shadowColor() {
            return this.context.shadowColor
        }
        set shadowOffsetX(t) {
            this.pushSetProperty("shadowOffsetX", t), this.context.shadowOffsetX = t
        }
        get shadowOffsetX() {
            return this.context.shadowOffsetX
        }
        set shadowOffsetY(t) {
            this.pushSetProperty("shadowOffsetY", t), this.context.shadowOffsetY = t
        }
        get shadowOffsetY() {
            return this.context.shadowOffsetY
        }
        set strokeStyle(t) {
            this.pushSetProperty("strokeStyle", t), this.context.strokeStyle = t
        }
        get strokeStyle() {
            return this.context.strokeStyle
        }
        set textAlign(t) {
            this.pushSetProperty("textAlign", t), this.context.textAlign = t
        }
        get textAlign() {
            return this.context.textAlign
        }
        set textBaseline(t) {
            this.pushSetProperty("textBaseline", t), this.context.textBaseline = t
        }
        get textBaseline() {
            return this.context.textBaseline
        }
        getContextAttributes(...t) {
            return this.context.getContextAttributes(...this.toProcessedArguments("getContextAttributes", t))
        }
        createConicGradient(...t) {
            return this.context.createConicGradient(...this.toProcessedArguments("createConicGradient", t))
        }
        roundRect(...t) {
            this.toCallableContextOverloadMethod(this.context.roundRect)(...this.toProcessedArguments("roundRect", t))
        }
        isContextLost(...t) {
            return this.context.isContextLost(...this.toProcessedArguments("isContextLost", t))
        }
        reset(...t) {
            this.context.reset(...this.toProcessedArguments("reset", t))
        }
        getTransform(...t) {
            return this.context.getTransform(...this.toProcessedArguments("getTransform", t))
        }
        arc(...t) {
            this.context.arc(...this.toProcessedArguments("arc", t))
        }
        arcTo(...t) {
            this.context.arcTo(...this.toProcessedArguments("arcTo", t))
        }
        beginPath(...t) {
            this.context.beginPath(...this.toProcessedArguments("beginPath", t))
        }
        bezierCurveTo(...t) {
            this.context.bezierCurveTo(...this.toProcessedArguments("bezierCurveTo", t))
        }
        clearRect(...t) {
            this.context.clearRect(...this.toProcessedArguments("clearRect", t))
        }
        clip(...t) {
            this.toCallableContextOverloadMethod(this.context.clip)(...this.toProcessedArguments("clip", t))
        }
        closePath(...t) {
            this.context.closePath(...this.toProcessedArguments("closePath", t))
        }
        createImageData(...t) {
            return this.toCallableContextOverloadMethod(this.context.createImageData)(...this.toProcessedArguments("createImageData", t))
        }
        createLinearGradient(...t) {
            return this.context.createLinearGradient(...this.toProcessedArguments("createLinearGradient", t))
        }
        createPattern(...t) {
            return this.context.createPattern(...this.toProcessedArguments("createPattern", t))
        }
        createRadialGradient(...t) {
            return this.context.createRadialGradient(...this.toProcessedArguments("createRadialGradient", t))
        }
        drawFocusIfNeeded(...t) {
            this.toCallableContextOverloadMethod(this.context.drawFocusIfNeeded)(...this.toProcessedArguments("drawFocusIfNeeded", t))
        }
        drawImage(...t) {
            this.toCallableContextOverloadMethod(this.context.drawImage)(...this.toProcessedArguments("drawImage", t))
        }
        ellipse(...t) {
            this.context.ellipse(...this.toProcessedArguments("ellipse", t))
        }
        fill(...t) {
            this.toCallableContextOverloadMethod(this.context.fill)(...this.toProcessedArguments("fill", t))
        }
        fillRect(...t) {
            this.context.fillRect(...this.toProcessedArguments("fillRect", t))
        }
        fillText(...t) {
            this.context.fillText(...this.toProcessedArguments("fillText", t))
        }
        getImageData(...t) {
            return this.context.getImageData(...this.toProcessedArguments("getImageData", t))
        }
        getLineDash(...t) {
            return this.context.getLineDash(...this.toProcessedArguments("getLineDash", t))
        }
        isPointInPath(...t) {
            return this.toCallableContextOverloadMethod(this.context.isPointInPath)(...this.toProcessedArguments("isPointInPath", t))
        }
        isPointInStroke(...t) {
            return this.toCallableContextOverloadMethod(this.context.isPointInStroke)(...this.toProcessedArguments("isPointInStroke", t))
        }
        lineTo(...t) {
            this.context.lineTo(...this.toProcessedArguments("lineTo", t))
        }
        measureText(...t) {
            return this.context.measureText(...this.toProcessedArguments("measureText", t))
        }
        moveTo(...t) {
            this.context.moveTo(...this.toProcessedArguments("moveTo", t))
        }
        putImageData(...t) {
            this.toCallableContextOverloadMethod(this.context.putImageData)(...this.toProcessedArguments("putImageData", t))
        }
        quadraticCurveTo(...t) {
            this.context.quadraticCurveTo(...this.toProcessedArguments("quadraticCurveTo", t))
        }
        rect(...t) {
            this.context.rect(...this.toProcessedArguments("rect", t))
        }
        resetTransform(...t) {
            this.context.resetTransform(...this.toProcessedArguments("resetTransform", t))
        }
        restore(...t) {
            this.context.restore(...this.toProcessedArguments("restore", t))
        }
        rotate(...t) {
            this.context.rotate(...this.toProcessedArguments("rotate", t))
        }
        save(...t) {
            this.context.save(...this.toProcessedArguments("save", t))
        }
        scale(...t) {
            this.context.scale(...this.toProcessedArguments("scale", t))
        }
        setLineDash(...t) {
            this.toCallableContextOverloadMethod(this.context.setLineDash)(...this.toProcessedArguments("setLineDash", t))
        }
        setTransform(...t) {
            this.toCallableContextOverloadMethod(this.context.setTransform)(...this.toProcessedArguments("setTransform", t))
        }
        stroke(...t) {
            this.toCallableContextOverloadMethod(this.context.stroke)(...this.toProcessedArguments("stroke", t))
        }
        strokeRect(...t) {
            this.context.strokeRect(...this.toProcessedArguments("strokeRect", t))
        }
        strokeText(...t) {
            this.context.strokeText(...this.toProcessedArguments("strokeText", t))
        }
        transform(...t) {
            this.context.transform(...this.toProcessedArguments("transform", t))
        }
        translate(...t) {
            this.context.translate(...this.toProcessedArguments("translate", t))
        }
    };
    (function() {
        window.pathReferences = new WeakMap;
        let d = window.Path2D,
            t = window.OffscreenCanvas;
        Object.defineProperty(window, "Path2D", {
            value: function(...e) {
                let o = new d(...e),
                    r = new Proxy(o, {
                        get(c, a, l) {
                            let s = Reflect.get(c, a, l);
                            return typeof s == "function" ? function(...u) {
                                let {
                                    pseudoCode: p
                                } = window.pathReferences.get(r), x = u.map(g => JSON.stringify(g)).join(", ");
                                return p.push(`path.${String(a)}(${x});`), s.apply(c, u)
                            } : s
                        }
                    });
                return window.pathReferences.set(r, {
                    pseudoCode: [],
                    originalPath: o
                }), r
            }
        });

        function n(e) {
            return new Proxy(e, {
                get(o, r, c) {
                    return r === "getContext" ? function(a, l) {
                        let s = o.getContext(a, l);
                        return a === "2d" ? new i(s) : s
                    } : Reflect.get(o, r, c)
                }
            })
        }
        Object.defineProperty(window, "OffscreenCanvas", {
            value: function(e, o) {
                let r = new t(e, o);
                return n(r)
            }
        });
        let h = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function(e, ...o) {
            let r = h.call(this, e, ...o);
            return e === "2d" ? new i(r) : r
        }
    })();
})();
