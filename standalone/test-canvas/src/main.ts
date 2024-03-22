main();

function main() {
    const { canvas, ctx, error } = getCanvasAnd2DContext()
    if (error) {
        console.error(error);
        return;
    }

    // Not that this does not resize automatically
    updateCanvasResolution(canvas);

    ctx.fillStyle = "#0000ff";
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
}

function getCanvasAnd2DContext() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
        return { error: "No canvas found!" } as const;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return { error: "No canvas found!" } as const;
    }

    return { canvas, ctx } as const;
}

function updateCanvasResolution(canvas: HTMLCanvasElement) {

    // Ref: https://stackoverflow.com/questions/21325343/how-to-get-width-and-height-of-canvas-after-resizing-the-browser

    const cs = getComputedStyle(canvas);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);

    canvas.width = width;
    canvas.height = height;
}