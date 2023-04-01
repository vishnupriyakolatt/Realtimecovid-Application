const News = require('../../models/News.js');

const bulkNewsToDb = (bulkNews) => {

    console.log("bulk news is ")
    console.log(bulkNews)
    bulkNews.map(async (eachNews) => {

        let { title,
            link,
            imglink,
            source,
            date } = eachNews

        let newsItem = new News({
            title: title,
            link: link,
            imglink: imglink,
            source: source,
            date: date

        })

        try {
            await newsItem.save()
            console.log("news item " + title + " inserted")
        }

        catch (err) {
            console.log("news item " + title + " not inserted")

        }

    })
}
module.exports = bulkNewsToDb