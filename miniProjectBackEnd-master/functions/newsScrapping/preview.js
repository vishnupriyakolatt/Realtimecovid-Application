//this function accepts a batch of title:links and 
// attach image links to them and return a new array of objects

let restrictedRes = require('./restrictedresources.js');

genPreview = async (fromobj, page) => {

    const puppeteer = require('puppeteer');

    return (async () => {


        let previewObj = [];

        for (var i = 0; i < fromobj.length; i++) {

            await page.goto(fromobj[i].link, { waitUntil: 'networkidle2', timeout: 0 });
            await page.waitForSelector('meta');

            const img = await page.evaluate(async () => {
                const ogImg = document.querySelector('meta[property="og:image"]');
                return ogImg != null ? ogImg.content : null;
            });
            if (img)
                previewObj.push({
                    title: fromobj[i].title,
                    link: fromobj[i].link,
                    imglink: img,
                    source: fromobj[i].source,
                    // date: fromobj[i].date
                });
        }
        return previewObj;
    })();
}
module.exports = genPreview;
