const covidnews = require('./genCovidNwsScrp.js');
const bulkNewsToDb = require('./bulkNewsToDb.js');
let fetchedNews = []

// const NewsSource = [
//     {
//         sourceName: "24 news",
//         sourceLink: "https://www.twentyfournews.com/tag/coronavirus",
//         selectr: "class",
//         specific: "main-content"

//     },
//     {
//         sourceName: "BBC news",
//         sourceLink: "https://www.bbc.com/news/coronavirus",
//         selectr: "id",
//         specific: "topos-component"

//     }
// ]

const bulkNewsFetched = async (NewsSource) => NewsSource.map(async (source, i) => {

    let { _id, sourceName, sourceLink, selectr, specific, scrappable } = source

    if (scrappable) {
        let response = await covidnews(sourceLink, _id, selectr, specific)
        fetchedNews = [...fetchedNews, ...response]
        console.log(`${sourceName} completed`)

        if (i === 0) {
            bulkNewsToDb(fetchedNews)
        }
    }
}
)
module.exports = bulkNewsFetched;
// if (i == 0) {
//     console.log(fetchedNews)
//     let len = fetchedNews.length
//     for (j = 0; j < len; j++) {

//         let { title, link, imglink, date } = fetchedNews
//         let newsItem = new News({
//             title: title,
//             link: link,
//             imglink: imglink,
//             date: date

//         })
//         try {
//             await newsItem.save()
//             console.log("news item " + i + " inserted")
//         }
//         catch (err) {
//             console.log("news item " + i + " not inserted")

//         }

//     }
// }