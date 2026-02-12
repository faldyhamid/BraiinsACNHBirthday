import * as canvas from 'canvas';
import * as jsonfile from "jsonfile";
import * as path from 'path';
import * as fs from 'fs';
import getDate from '../utils/getDate.js';

//Prepare villagers data
const file = './resources/Villagers.json'
const villagers = await jsonfile.readFile(file);

async function renderImage(req) {
    //Check if a villager has a birthday
    const villager = villagers.find(({ birthday }) => birthday === getDate());

    //Check if image height and width are specified
    const width = req.query.deck_image_width ? parseInt(req.query.deck_image_width) : 1280;
    const height = req.query.deck_image_height ? parseInt(req.query.deck_image_height) : 480;

    //Prepare portrait and text
    const dateText = `It is currently ${getDate()}.`
    const messageText = villager ? `Happy Birthday, ${villager.name}!` : `Have a nice day everyone!`;
    const portraitUrl = villager ? villager.photoImage : './resources/default.png';
    const backgroundImage = './resources/background.png'

    //Create canvas and context
    const img = canvas.createCanvas(width, height);
    const ctx = img.getContext("2d");

    canvas.registerFont(
        "./resources/font.ttf",
        { family: "AppFont" },
    );

    //Draw background
    const background = await canvas.loadImage(backgroundImage)
    ctx.drawImage(background, 0, 0);

    // Draw portrait
    const portrait = await canvas.loadImage(portraitUrl);
    const portraitWidth = width / 3.5;
    const portraitHeight = height / 1.5;
    const portraitX = 20;
    const portraitY = height / 5;

    ctx.drawImage(portrait, portraitX, portraitY, portraitWidth, portraitHeight);

    ctx.fillStyle = "#000000";
    ctx.font = "50pt AppFont";
    ctx.fillText(dateText, width / 3.5 + 40, height / 2 - 30);
    ctx.fillText(messageText, width / 3.5 + 40, height / 2 + 50);

    const out = fs.createWriteStream('./out.png')
    const stream = img.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => {
        console.log("Image created!")
        out.end();
        stream.destroy()
    });
};


async function sendImage(req, res) {
    const options = {
        root: path.join('./'),
        headers: {
            'Content-type': 'image/png'
        }
    };

    const fileName = 'out.png';

    renderImage(req).then(
        res.status(200).sendFile(fileName, options))
        .catch((e) => {
            console.error(e);
            res.status(500).send('ERROR: Image not found!');
        })
}

export { sendImage };