import express from 'express';
import path from "path";
import { FileList } from "./FileList.js";
import { File } from "./File.js";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve()));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/', (req, res) => {
    const { filename, content } = req.body;
    const file = new File(filename);

    try {
        file.write(content);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/list', (req, res) => {
    let fileList = new FileList();
    res.json({html: fileList.getHTMLList()});

    console.log(fileList.getList());
    console.log(fileList.hasFiles());
    console.log(fileList.getHTMLList())
});

app.get('/show', (req, res) => {
    const { file } = req.query;
    console.log(file);
    const selectedFile = new File(file);

    try {
        const content = selectedFile.read();
        res.json({ content });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'File Not Found' });
    }
});

app.get('/delete', (req, res) => {
    const { file } = req.query;
    console.log(file);
    const selectedFile = new File(file);

    try {
        selectedFile.delete();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});