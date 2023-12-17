import fs from 'fs';

export class File {
    constructor(name) {
        this.dir = 'temp';
        this.name = name.endsWith('.txt') ? name : name + '.txt';
        this.filePath = `${this.dir}/${this.name}`;
    }

    create() {
        try {
            fs.accessSync(this.dir, fs.constants.R_OK);
        } catch (err) {
            fs.mkdirSync(this.dir);
        }

        try {
            fs.writeFileSync(this.filePath, '');
        } catch (err) {
            console.error(err);
        }
    }

    write(content) {
        try {
            fs.accessSync(this.filePath, fs.constants.R_OK);
        } catch (err) {
            this.create();
        }

        try {
            fs.appendFileSync(this.filePath, content);
        } catch (err) {
            console.error(err);
        }
    }

    read() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return data ? data : 'File is Empty';
        } catch (err) {
            console.error(err);
            return 'No file information';
        }
    }

    delete() {
        try {
            fs.accessSync(this.filePath, fs.constants.R_OK);
            fs.rmSync(this.filePath);
        } catch (err) {
            console.error(err);
        }
    }
}
