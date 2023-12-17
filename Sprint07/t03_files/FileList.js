import fs from 'fs';

export class FileList {
    constructor() {
        this.dir = 'temp';
        this.list = this.getList();
    }

    getList() {
        try {
            fs.accessSync(this.dir, fs.constants.R_OK);
            const data = fs.readdirSync(this.dir, { encoding: 'utf-8', withFileTypes: true });
            return data.map(file => file.name);
        } catch (err) {
            return [];
        }
    }

    hasFiles() {
        return this.list.length > 0;
    }

    getHTMLList() {
        if (!this.hasFiles())
            return '';

        const fileListItems = this.list.map(item => `<li data-file="${item}" class="btn-file">${item}</li>`);
        return `<ul>${fileListItems.join('')}</ul>`;
    }
}
