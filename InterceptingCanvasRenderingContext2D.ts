type MethodKeys<T> = Extract<keyof T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>;

type ContextProperties = Exclude<keyof CanvasRenderingContext2D, MethodKeys<CanvasRenderingContext2D>>;

type PropertyValues = {
    [K in ContextProperties]: CanvasRenderingContext2D[K]
}[ContextProperties];

type AnyFunction = (...args: Array<any>) => any;

type OverloadProps<Overload> = Pick<Overload, keyof Overload>;

type OverloadUnionRecursive<Overload, PartialOverload = unknown> = Overload extends (
    ...args: infer Args
) => infer Return
    ? // Prevent infinite recursion by stopping recursion when TPartialOverload
    // has accumulated all of the TOverload signatures
    PartialOverload extends Overload ? never :
    | OverloadUnionRecursive<
        PartialOverload & Overload,
        PartialOverload & ((...args: Args) => Return) & OverloadProps<Overload>
    >
    | ((...args: Args) => Return)
    : never;

type OverloadUnion<Overload extends AnyFunction> = Exclude<
    OverloadUnionRecursive<
        // The "() => never" signature must be hoisted to the "front" of the
        // intersection, for two reasons: a) because recursion stops when it is
        // encountered, and b) it seems to prevent the collapse of subsequent
        // "compatible" signatures (eg. "() => void" into "(a?: 1) => void"),
        // which gives a direct conversion to a union
        (() => never) & Overload
    >,
    Overload extends () => never ? never : () => never
>;

// Inferring a union of parameter tuples or return types is now possible
type OverloadParameters<T extends AnyFunction> = Parameters<OverloadUnion<T>>;
type OverloadReturnType<T extends AnyFunction> = ReturnType<OverloadUnion<T>>;

type CallableOverloadMethod<T extends AnyFunction> = (...args: OverloadParameters<T>) => OverloadReturnType<T>;

type GetContextMethodParameters<T extends MethodKeys<CanvasRenderingContext2D>> = OverloadParameters<CanvasRenderingContext2D[T]>;

export default class InterceptingCanvasRenderingContext2D implements CanvasRenderingContext2D {
    private pseudoCode: Array<string> = new Array();

    constructor(private context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) { }

    private toCallableContextOverloadMethod<T extends AnyFunction>(method: T): CallableOverloadMethod<T> {
        return method.bind(this.context);
    }

    private toProcessedArguments<
        T extends MethodKeys<CanvasRenderingContext2D>,
        U extends GetContextMethodParameters<T> = GetContextMethodParameters<T>,
    >(methodName: T, args: U): U {
        const formattedArgs = args.map((arg: any) => {
            if (window.pathReferences.has(arg)) {
                return `(function(){
                            const path = new Path2D();

                            ${window.pathReferences.get(arg).pseudoCode.join("\n")}

                            return path;
                        })()`;
            }

            return JSON.stringify(arg);
        }).join(", ");

        this.pseudoCode.push(`ctx.${methodName}(${formattedArgs});`);

        return args.map((arg: any) => {
            // Arg is proxied path2d, proceed to get original instance
            if (window.pathReferences.has(arg))
                return window.pathReferences.get(arg).originalPath;

            return arg;
        }) as U;
    }

    private pushSetProperty(property: string, value: PropertyValues) {
        this.pseudoCode.push(`ctx.${property} = ${JSON.stringify(value)};`);
    }

    public generatePseudoCode(): string {
        return this.pseudoCode.join("\n");
    }

    public set fontKerning(value) {
        this.pushSetProperty("fontKerning", value);

        this.context.fontKerning = value;
    }

    get fontKerning() {
        return this.context.fontKerning;
    }

    public set fontStretch(value) {
        this.pushSetProperty("fontStretch", value);

        this.context.fontStretch = value;
    }

    public get fontStretch() {
        return this.context.fontStretch;
    }

    public set fontVariantCaps(value) {
        this.pushSetProperty("fontVariantCaps", value);

        this.context.fontVariantCaps = value;
    }

    public get fontVariantCaps() {
        return this.context.fontVariantCaps;
    }

    public set letterSpacing(value) {
        this.pushSetProperty("letterSpacing", value);

        this.context.letterSpacing = value;
    }

    public get letterSpacing() {
        return this.context.letterSpacing;
    }

    public set textRendering(value) {
        this.pushSetProperty("textRendering", value);

        this.context.textRendering = value;
    }

    public get textRendering() {
        return this.context.textRendering;
    }

    public set wordSpacing(value) {
        this.pushSetProperty("wordSpacing", value);

        this.context.wordSpacing = value;
    }

    public get wordSpacing() {
        return this.context.wordSpacing;
    }

    public get canvas() {
        return <HTMLCanvasElement>(this.context.canvas);
    }

    public set direction(value) {
        this.pushSetProperty("direction", value);

        this.context.direction = value;
    }

    public get direction() {
        return this.context.direction;
    }

    public set fillStyle(value) {
        this.pushSetProperty("fillStyle", value);

        this.context.fillStyle = value;
    }

    public get fillStyle() {
        return this.context.fillStyle;
    }

    public set filter(value) {
        this.pushSetProperty("filter", value);

        this.context.filter = value;
    }

    public get filter() {
        return this.context.filter;
    }

    public set font(value) {
        this.pushSetProperty("font", value);

        this.context.font = value;
    }

    public get font() {
        return this.context.font;
    }

    public set globalAlpha(value) {
        this.pushSetProperty("globalAlpha", value);

        this.context.globalAlpha = value;
    }

    public get globalAlpha() {
        return this.context.globalAlpha;
    }

    public set globalCompositeOperation(value) {
        this.pushSetProperty("globalCompositeOperation", value);

        this.context.globalCompositeOperation = value;
    }

    public get globalCompositeOperation() {
        return this.context.globalCompositeOperation;
    }

    public set imageSmoothingEnabled(value) {
        this.pushSetProperty("imageSmoothingEnabled", value);

        this.context.imageSmoothingEnabled = value;
    }

    public get imageSmoothingEnabled() {
        return this.context.imageSmoothingEnabled;
    }

    public set imageSmoothingQuality(value) {
        this.pushSetProperty("imageSmoothingQuality", value);

        this.context.imageSmoothingQuality = value;
    }

    public get imageSmoothingQuality() {
        return this.context.imageSmoothingQuality;
    }

    public set lineCap(value) {
        this.pushSetProperty("lineCap", value);

        this.context.lineCap = value;
    }

    public get lineCap() {
        return this.context.lineCap;
    }

    public set lineDashOffset(value) {
        this.pushSetProperty("lineDashOffset", value);

        this.context.lineDashOffset = value;
    }

    public get lineDashOffset() {
        return this.context.lineDashOffset;
    }

    public set lineJoin(value) {
        this.pushSetProperty("lineJoin", value);

        this.context.lineJoin = value;
    }

    public get lineJoin() {
        return this.context.lineJoin;
    }

    public set lineWidth(value) {
        this.pushSetProperty("lineWidth", value);

        this.context.lineWidth = value;
    }

    public get lineWidth() {
        return this.context.lineWidth;
    }

    public set miterLimit(value) {
        this.pushSetProperty("miterLimit", value);

        this.context.miterLimit = value;
    }

    public get miterLimit() {
        return this.context.miterLimit;
    }

    public set shadowBlur(value) {
        this.pushSetProperty("shadowBlur", value);

        this.context.shadowBlur = value;
    }

    public get shadowBlur() {
        return this.context.shadowBlur;
    }

    public set shadowColor(value) {
        this.pushSetProperty("shadowColor", value);

        this.context.shadowColor = value;
    }

    public get shadowColor() {
        return this.context.shadowColor;
    }

    public set shadowOffsetX(value) {
        this.pushSetProperty("shadowOffsetX", value);

        this.context.shadowOffsetX = value;
    }

    public get shadowOffsetX() {
        return this.context.shadowOffsetX;
    }

    public set shadowOffsetY(value) {
        this.pushSetProperty("shadowOffsetY", value);

        this.context.shadowOffsetY = value;
    }

    public get shadowOffsetY() {
        return this.context.shadowOffsetY;
    }

    public set strokeStyle(value) {
        this.pushSetProperty("strokeStyle", value);

        this.context.strokeStyle = value;
    }

    public get strokeStyle() {
        return this.context.strokeStyle;
    }

    public set textAlign(value) {
        this.pushSetProperty("textAlign", value);

        this.context.textAlign = value;
    }

    public get textAlign() {
        return this.context.textAlign;
    }

    public set textBaseline(value) {
        this.pushSetProperty("textBaseline", value);

        this.context.textBaseline = value;
    }

    public get textBaseline() {
        return this.context.textBaseline;
    }

    public getContextAttributes(...args: GetContextMethodParameters<"getContextAttributes">) {
        return (
            this.context as CanvasRenderingContext2D
        ).getContextAttributes(...this.toProcessedArguments("getContextAttributes", args));
    }

    public createConicGradient(...args: GetContextMethodParameters<"createConicGradient">) {
        return this.context.createConicGradient(...this.toProcessedArguments("createConicGradient", args));
    }

    public roundRect(...args: GetContextMethodParameters<"roundRect">) {
        this.toCallableContextOverloadMethod(this.context.roundRect)(...this.toProcessedArguments("roundRect", args));
    }

    public isContextLost(...args: GetContextMethodParameters<"isContextLost">) {
        return this.context.isContextLost(...this.toProcessedArguments("isContextLost", args));
    }

    public reset(...args: GetContextMethodParameters<"reset">) {
        this.context.reset(...this.toProcessedArguments("reset", args));
    }

    public getTransform(...args: GetContextMethodParameters<"getTransform">) {
        return this.context.getTransform(...this.toProcessedArguments("getTransform", args));
    }

    public arc(...args: GetContextMethodParameters<"arc">) {
        this.context.arc(...this.toProcessedArguments("arc", args));
    }

    public arcTo(...args: GetContextMethodParameters<"arcTo">) {
        this.context.arcTo(...this.toProcessedArguments("arcTo", args));
    }

    public beginPath(...args: GetContextMethodParameters<"beginPath">) {
        this.context.beginPath(...this.toProcessedArguments("beginPath", args));
    }

    public bezierCurveTo(...args: GetContextMethodParameters<"bezierCurveTo">) {
        this.context.bezierCurveTo(...this.toProcessedArguments("bezierCurveTo", args));
    }

    public clearRect(...args: GetContextMethodParameters<"clearRect">) {
        this.context.clearRect(...this.toProcessedArguments("clearRect", args));
    }

    public clip(...args: GetContextMethodParameters<"clip">) {
        this.toCallableContextOverloadMethod(this.context.clip)(...this.toProcessedArguments("clip", args));
    }

    public closePath(...args: GetContextMethodParameters<"closePath">) {
        this.context.closePath(...this.toProcessedArguments("closePath", args));
    }

    public createImageData(...args: GetContextMethodParameters<"createImageData">) {
        return this.toCallableContextOverloadMethod(this.context.createImageData)(...this.toProcessedArguments("createImageData", args));
    }

    public createLinearGradient(...args: GetContextMethodParameters<"createLinearGradient">) {
        return this.context.createLinearGradient(...this.toProcessedArguments("createLinearGradient", args));
    }

    public createPattern(...args: GetContextMethodParameters<"createPattern">) {
        return this.context.createPattern(...this.toProcessedArguments("createPattern", args));
    }

    public createRadialGradient(...args: GetContextMethodParameters<"createRadialGradient">) {
        return this.context.createRadialGradient(...this.toProcessedArguments("createRadialGradient", args));
    }

    public drawFocusIfNeeded(...args: GetContextMethodParameters<"drawFocusIfNeeded">) {
        this.toCallableContextOverloadMethod(
            (this.context as CanvasRenderingContext2D).drawFocusIfNeeded,
        )(...this.toProcessedArguments("drawFocusIfNeeded", args));
    }

    public drawImage(...args: GetContextMethodParameters<"drawImage">) {
        this.toCallableContextOverloadMethod(this.context.drawImage)(...this.toProcessedArguments("drawImage", args));
    }

    public ellipse(...args: GetContextMethodParameters<"ellipse">) {
        this.context.ellipse(...this.toProcessedArguments("ellipse", args));
    }

    public fill(...args: GetContextMethodParameters<"fill">) {
        this.toCallableContextOverloadMethod(this.context.fill)(...this.toProcessedArguments("fill", args));
    }

    public fillRect(...args: GetContextMethodParameters<"fillRect">) {
        this.context.fillRect(...this.toProcessedArguments("fillRect", args));
    }

    public fillText(...args: GetContextMethodParameters<"fillText">) {
        this.context.fillText(...this.toProcessedArguments("fillText", args));
    }

    public getImageData(...args: GetContextMethodParameters<"getImageData">) {
        return this.context.getImageData(...this.toProcessedArguments("getImageData", args));
    }

    public getLineDash(...args: GetContextMethodParameters<"getLineDash">) {
        return this.context.getLineDash(...this.toProcessedArguments("getLineDash", args));
    }

    public isPointInPath(...args: GetContextMethodParameters<"isPointInPath">) {
        return this.toCallableContextOverloadMethod(this.context.isPointInPath)(...this.toProcessedArguments("isPointInPath", args));
    }

    public isPointInStroke(...args: GetContextMethodParameters<"isPointInStroke">) {
        return this.toCallableContextOverloadMethod(this.context.isPointInStroke)(...this.toProcessedArguments("isPointInStroke", args));
    }

    public lineTo(...args: GetContextMethodParameters<"lineTo">) {
        this.context.lineTo(...this.toProcessedArguments("lineTo", args));
    }

    public measureText(...args: GetContextMethodParameters<"measureText">) {
        return this.context.measureText(...this.toProcessedArguments("measureText", args));
    }

    public moveTo(...args: GetContextMethodParameters<"moveTo">) {
        this.context.moveTo(...this.toProcessedArguments("moveTo", args));
    }

    public putImageData(...args: GetContextMethodParameters<"putImageData">) {
        this.toCallableContextOverloadMethod(this.context.putImageData)(...this.toProcessedArguments("putImageData", args));
    }

    public quadraticCurveTo(...args: GetContextMethodParameters<"quadraticCurveTo">) {
        this.context.quadraticCurveTo(...this.toProcessedArguments("quadraticCurveTo", args));
    }

    public rect(...args: GetContextMethodParameters<"quadraticCurveTo">) {
        this.context.rect(...this.toProcessedArguments("rect", args));
    }

    public resetTransform(...args: GetContextMethodParameters<"resetTransform">) {
        this.context.resetTransform(...this.toProcessedArguments("resetTransform", args));
    }

    public restore(...args: GetContextMethodParameters<"restore">) {
        this.context.restore(...this.toProcessedArguments("restore", args));
    }

    public rotate(...args: GetContextMethodParameters<"rotate">) {
        this.context.rotate(...this.toProcessedArguments("rotate", args));
    }

    public save(...args: GetContextMethodParameters<"save">) {
        this.context.save(...this.toProcessedArguments("save", args));
    }

    public scale(...args: GetContextMethodParameters<"scale">) {
        this.context.scale(...this.toProcessedArguments("scale", args));
    }

    public setLineDash(...args: GetContextMethodParameters<"setLineDash">) {
        this.toCallableContextOverloadMethod(this.context.setLineDash)(...this.toProcessedArguments("setLineDash", args));
    }

    public setTransform(...args: GetContextMethodParameters<"setTransform">) {
        this.toCallableContextOverloadMethod(this.context.setTransform)(...this.toProcessedArguments("setTransform", args));
    }

    public stroke(...args: GetContextMethodParameters<"stroke">) {
        this.toCallableContextOverloadMethod(this.context.stroke)(...this.toProcessedArguments("stroke", args));
    }

    public strokeRect(...args: GetContextMethodParameters<"strokeRect">) {
        this.context.strokeRect(...this.toProcessedArguments("strokeRect", args));
    }

    public strokeText(...args: GetContextMethodParameters<"strokeText">) {
        this.context.strokeText(...this.toProcessedArguments("strokeText", args));
    }

    public transform(...args: GetContextMethodParameters<"transform">) {
        this.context.transform(...this.toProcessedArguments("transform", args));
    }

    public translate(...args: GetContextMethodParameters<"translate">) {
        this.context.translate(...this.toProcessedArguments("translate", args));
    }
}