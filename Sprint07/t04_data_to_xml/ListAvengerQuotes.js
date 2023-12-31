import fs from 'fs';
import path from 'path';
import xml2js from "xml2js";
import { AvengerQuote } from "./AvengerQuote.js";
import { Comment } from "./Comment";

export class ListAvengerQuotes {
    constructor(data) {
        this.data = this.init(data);
    }

    init(data) {
        return data.map((value) => {
            new Comment(new AvengerQuote(value))
        });
    }

    toXML() {
        const pathFile = path.resolve() + '/' + 'avenger_quote.xml';
        if (fs.existsSync(pathFile))
            return fs.readFileSync(pathFile, 'utf-8');

        const builder = new xml2js.Builder();
        const toXML = builder.buildObject(this.data);
        fs.writeFileSync(pathFile, toXML);
        return toXML;
    }

    fromXML() {
        const pathFile = path.resolve() + '/' + 'avenger_quote.xml';
        let res = '';

        xml2js.parseString(fs.readFileSync(pathFile, 'utf-8'), (err, result) => {
            if (err)
                return err;
            res = result;
        });

        return JSON.stringify(res);
    }
}