import * as canvas from 'canvas';

async function valentineDay(ctx, width, height) {
    console.log("We are here!");
    const toText = "To our bestest, loveliest";
    const midText = "resident representative:"
    const happyValentine = "Happy Love Day! I love you ♡"

    const portrait = await canvas.loadImage("./resources/valentine.png");
    const portraitWidth = width / 3.5;
    const portraitHeight = height / 1.5;
    const portraitX = 20;
    const portraitY = height / 5;

    const flowers = await canvas.loadImage("./resources/spiderlilly.png");
    const flowerWidth = 360
    const flowerHeight = 360;
    const flowerX = width - 300;
    const flowerY = height - 300;

    ctx.drawImage(portrait, portraitX, portraitY, portraitWidth, portraitHeight);
    ctx.drawImage(flowers, flowerX, flowerY, flowerWidth, flowerHeight);
    ctx.drawImage(flowers, flowerX - 300, flowerY + 50, flowerWidth, flowerHeight);
    ctx.drawImage(flowers, flowerX - 600, flowerY - 20, flowerWidth, flowerHeight);

    ctx.fillStyle = "#000000";
    ctx.font = "40pt AppFont";
    ctx.fillText(toText, width / 3.5 + 40, height / 2 - 30);
    ctx.fillText(midText, width / 3.5 + 40, height / 2 + 20);

    ctx.font = "45pt AppFont";
    ctx.fillText(happyValentine, width / 3.5 + 40, height / 2 + 100);
}

export { valentineDay };