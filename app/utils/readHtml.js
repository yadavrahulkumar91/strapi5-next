// utils/readHtml.js
import fs from 'fs/promises';
import path from 'path';

export async function readHtmlFile(folder, fileName) {
    const filePath = path.join(process.cwd(), 'public', 'html', folder, fileName);
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
}
