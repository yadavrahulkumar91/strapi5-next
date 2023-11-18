// pages/page1.js
import { readHtmlFile } from './readHtml';

 async function Page1 () {
    const content = await readHtmlFile('page1', 'content1.html');
    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default Page1;
