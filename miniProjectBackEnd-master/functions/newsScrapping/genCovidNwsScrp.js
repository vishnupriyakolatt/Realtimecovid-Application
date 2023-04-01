let restrictedRes = require('./restrictedresources.js');
let genPreview = require('./preview.js');

let gencovidnews = async function (urll, srcId, selectr = null, specific = null) {

    const puppeteer = require('puppeteer');
    return (async () => {

        //launching browser and creating page
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setRequestInterception(true);

        //to restrict requests
        page.on('request', request => {
            //restrictedRes is imported
            restrictedRes(request) ? request.continue() : request.abort();
        });

        await page.goto(urll, { waitUntil: 'load', timeout: 0 });

        //evaluate js 
        data = await page.evaluate((srcId, selectr, specific) => {
            var linksnodelist;
            //finds the links inside a html element specified by id/class or none
            switch (selectr) {
                case null:
                    linksnodelist = document.querySelectorAll("a");
                    break;
                case "id":
                    linksnodelist = document.getElementById(specific).querySelectorAll("a");
                    break;
                case "class":
                    // linksnodelist = document.getElementsByClassName(specific + "> a");
                    linksnodelist = document.querySelectorAll(`.${specific} a`);

                    break;
            }
            var links = [];

            for (var i = 0, count = 0; i < linksnodelist.length; i++) {

                //extracting innerText and href
                var txtinlink = linksnodelist.item(i).innerText;
                var weblink = linksnodelist.item(i).href

                //converting innerText to lowercase
                var target = txtinlink.toLowerCase();

                //covid related keywords
                var pattern = ['covid', 'covid19', 'covid-19', 'coronavirus', 'coronavirus', 'pandemic', 'quarantine', 'vaccine', 'vaccination', 'കോവിഡ്', 'വാക്‌സീന്', 'വാക്സീൻ', 'കൊറോണ', 'കോവാക്‌സിന്‍', 'കൊവിഡ്'];
                var patternfound = false;
                pattern.forEach(function (word) {
                    if (target.includes(word)) {
                        patternfound = true;

                    }
                });

                //if anything related to covid is pushed into links
                //by checking the state(true/false) of patternfound
                if (patternfound && count < 10) {
                    // var today = new Date()
                    // links.push({ title: txtinlink, link: weblink, source: srcId, date: today });
                    links.push({ title: txtinlink, link: weblink, source: srcId });

                    count++;
                }
            }

            //to remove duplicates in links
            jsonObject = links.map(JSON.stringify);
            uniqueSet = new Set(jsonObject);
            uniqueArray = Array.from(uniqueSet).map(JSON.parse);
            return uniqueArray;
        }, srcId, selectr, specific);

        //calling genPreview to attach image links
        let preview = await genPreview(data, page);
        await browser.close();
        return preview;

    })();
}
module.exports = gencovidnews;
