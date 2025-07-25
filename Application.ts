import InterceptingCanvasRenderingContext2D from "./InterceptingCanvasRenderingContext2D";

declare global {
    interface Window {
        pathReferences: WeakMap<Path2D, {
            pseudoCode: Array<string>;
            originalPath: Path2D;
        }>;
    }
}

(function () {
    window.pathReferences = new WeakMap();

    const OriginalPath2D = window.Path2D;
    const OriginalOffscreenCanvas = window.OffscreenCanvas;

    Object.defineProperty(window, "Path2D", {
        value: function (...args: Array<any>) {
            const path = new OriginalPath2D(...args);

            const proxied = new Proxy(path, {
                get(target, propertyKey, receiver) {
                    const value = Reflect.get(target, propertyKey, receiver);

                    if (typeof value === "function") {
                        return function (...args: Array<any>) {
                            const { pseudoCode } = window.pathReferences.get(proxied);

                            const formattedArgs = args.map((arg: any) => JSON.stringify(arg)).join(", ");
                            pseudoCode.push(`path.${String(propertyKey)}(${formattedArgs});`);

                            return value.apply(target, args);
                        };
                    }

                    return value;
                },
            });

            window.pathReferences.set(proxied, {
                pseudoCode: [],
                // The reason store of original instances, canvas methods with path2d arguments only accept 
                // native-objects (means cant be proxied object)
                originalPath: path,
            });

            return proxied;
        },
    });

    function createInterceptingOffscreenCanvas(original: OffscreenCanvas): OffscreenCanvas {
        return new Proxy(original, {
            get(target: OffscreenCanvas, propertyKey: string | symbol, receiver: any) {
                if (propertyKey === "getContext") {
                    return function (contextType: "2d", options?: any) {
                        const ctx = target.getContext(contextType, options);
                        if (contextType === "2d") {
                            return new InterceptingCanvasRenderingContext2D(ctx);
                        }

                        return ctx;
                    };
                }

                return Reflect.get(target, propertyKey, receiver);
            },
        });
    }

    Object.defineProperty(window, "OffscreenCanvas", {
        value: function (width: number, height: number) {
            const canvas = new OriginalOffscreenCanvas(width, height);

            return createInterceptingOffscreenCanvas(canvas);
        },
    });

    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (contextType: string, ...args: Array<any>): any {
        const ctx = originalGetContext.call(this, contextType, ...args);
        if (contextType === "2d") {
            return new InterceptingCanvasRenderingContext2D(ctx as CanvasRenderingContext2D);
        }

        return ctx;
    };
})();
