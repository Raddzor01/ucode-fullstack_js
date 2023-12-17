import express from 'express';
import fs from 'fs';
import request from 'request';
import sharp from 'sharp';
import path from 'path';

const port = process.env.PORT || 8080;
const app = express();

app.use("/", express.static(path.resolve()));

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.get('/upload', async (req, res) => {

    const path = './image.png';
    let url = req.query.url;

    request.head(url, async (err, response, body) => {
        request(url).pipe(fs.createWriteStream(path)).on('close', async () => {
            let arr = [
                [
                    [1, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
                [
                    [0, 0, 0],
                    [1, 0, 0],
                    [0, 0, 0],
                ],
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [1, 0, 0],
                ],
            ];
            for (let i = 1; i <= 4; i++) {
                let img = sharp("image.png");
                if (i > 1) {
                    img = img.recomb(arr[i - 2]);
                }
                img.resize(250, 250).toFile(`image${i}.png`, (err, info) => {
                    if (i === 4) {
                        res.json({
                            img: [`image1.png`, `image2.png`, `image3.png`, `image4.png`],
                        });
                    }
                });
            }


        });
    });
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});
