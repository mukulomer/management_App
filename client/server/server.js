import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

const app = express();
const PORT = 3000;

app.use('^/&', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return res.status(500).send('Internal Server Error');
        }

        const appHtml = renderToString(<App />);
        const updatedHtml = data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

        return res.send(updatedHtml);
    });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
    console.log(`App Launched on ${PORT}`);
});
