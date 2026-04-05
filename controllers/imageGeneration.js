import * as canvas from 'canvas';
import * as path from 'path';
import * as fs from 'fs';
import getDate from '../utils/getDate.js';

async function fetchVillager() {
    //Get current month and date
    const currentDate = new Date;
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    //Fetch from API by date
    try {
        const response = await fetch(`https://api.nookipedia.com/villagers?birthmonth=${month}&birthday=${day}&game=nh&nhdetails=true`, {
            headers: {
                'X-API-KEY': process.env.API_KEY,
                'Accept-Version': '1.7.0'
            }
        })

        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function renderImage(height, width) {
    //Check if a villager has a birthday
    const villager = await fetchVillager();

    //Prepare portrait and text
    const dateText = `It's ${getDate()}.`;
    const messageText = villager ? `Happy Birthday, ${villager.name}!` : `Have a nice day everyone!`;
    const portraitUrl = villager ? villager.nh_details.image_url : './resources/default.png';
    const backgroundImage = './resources/background.png';

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
    const portraitHeight = height / 1.2;
    const portraitWidth = portraitHeight * 0.49;
    const portraitX = width / 10;
    const portraitY = height / 9.6;

    ctx.drawImage(portrait, portraitX, portraitY, portraitWidth, portraitHeight);

    //Prepare and write text
    ctx.fillStyle = "#000000";
    ctx.font = "50pt AppFont";
    ctx.fillText(dateText, width / 3.5 + 40, height / 2 - 30);
    ctx.fillText(messageText, width / 3.5 + 40, height / 2 + 50);

    return img.createPNGStream();
};


async function sendImage(req, res) {
    const options = {
        root: path.join('./'),
        headers: {
            'Content-type': 'image/png'
        }
    };

    //Check if image height and width are specified. Defaults to Braiins Deck full screen resolution
    const width = req.query.width ? parseInt(req.query.width) : 1280;
    const height = req.query.height ? parseInt(req.query.height) : 480;

    const fileName = `${height}x${width}.png`;

    const out = fs.createWriteStream(fileName);
    const stream = await renderImage(height, width);
    stream.pipe(out);

    out.on('finish', () => {
        console.log("Image created!");
        out.end();
        stream.destroy();

        res.status(200).sendFile(fileName, options)
    })

    out.on('error', (e) => {
        out.end();
        stream.destroy();
        
        console.log(e);
        res.status(500).send('Failed to create image!');
    })
}

export { sendImage };