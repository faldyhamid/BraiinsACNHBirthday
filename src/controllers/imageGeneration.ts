import * as canvas from 'canvas';
import * as path from 'path';
import * as fs from 'fs';
import { getDate } from '../utils/getDate.js';
import type { Villager } from "../types/villager.js";
import type { Request, Response } from 'express';

async function fetchVillager(): Promise<Villager | null> {
    //Get current month and date
    const currentDate = new Date;
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    //Fetch from API by date
    try {
        const url: string = `https://api.nookipedia.com/villagers?birthmonth=${month}&birthday=${day}&game=nh&nhdetails=true`;

        const httpOptions: Object = {
            headers: {
                'X-API-KEY': process.env.API_KEY,
                'Accept-Version': '1.7.0'
            }
        }

        const response = await fetch(url, httpOptions)

        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function renderImage(height: number, width: number): Promise<canvas.PNGStream> {
    //Check if a villager has a birthday
    const villager: Villager | null = await fetchVillager();

    //Prepare portrait and text
    const dateText: string = `It's ${getDate()}.`;
    const messageText: string = villager ? `Happy Birthday, ${villager.name}!` : `Have a nice day everyone!`;
    const portraitUrl: string = villager && villager.nh_details?.image_url ? villager.nh_details.image_url : './resources/default.png';
    const backgroundImage: string = './resources/background.png';

    //Create canvas and context
    const img = canvas.createCanvas(width, height);
    const ctx = img.getContext("2d");

    canvas.registerFont(
        "./resources/font.ttf",
        { family: "AppFont" },
    );

    //Draw background
    const background: canvas.Image = await canvas.loadImage(backgroundImage)
    ctx.drawImage(background, 0, 0);

    // Fetch portrait
    const portrait: canvas.Image = await canvas.loadImage(portraitUrl);

    //Max Width for Portrait to calculate scaling
    const maxWidth = width * 0.2857;
    const maxHeight = height - height * 0.1;
    const widthRatio = maxWidth / portrait.width;
    const heightRatio = maxHeight / portrait.height;
    const bestRatio = Math.min(widthRatio, heightRatio);

    // Calculate image size and placement
    const portraitHeight = portrait.height * bestRatio;
    const portraitWidth = portrait.width * bestRatio;
    const portraitX = Math.max((width * 0.2857 - portraitWidth) * 0.5, 20);
    const portraitY = height * 0.06667;

    ctx.drawImage(portrait, portraitX, portraitY, portraitWidth, portraitHeight);

    //Prepare and write text
    ctx.fillStyle = "#000000";
    ctx.font = "50pt AppFont";
    ctx.fillText(dateText, width / 3.5 + 40, height * 0.5 - 30);
    ctx.fillText(messageText, width / 3.5 + 40, height * 0.5 + 50);

    return img.createPNGStream();
};


async function sendImage(req: Request, res: Response) {
    const options = {
        root: path.join('./'),
        headers: {
            'Content-type': 'image/png'
        }
    };

    //Check if image height and width are specified. Defaults to Braiins Deck full screen resolution
    const width: number = req.query.width ? parseInt(req.query.width as string) : 1280;
    const height: number = req.query.height ? parseInt(req.query.height as string) : 480;

    const fileName: string = `${height}x${width}.png`;

    const out: fs.WriteStream = fs.createWriteStream(fileName);
    const stream: canvas.PNGStream = await renderImage(height, width);
    stream.pipe(out);

    out.on('finish', () => {
        console.log(`Image created!`);
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