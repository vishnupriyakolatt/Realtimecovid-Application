const NewsSource = require('../../models/NewsSource.js');
const bulkNewsToGen = require('./bulkNewsGen.js');

// const newssource1 = new NewsSource({
//     sourceName: "24 news",
//     sourceLink: "https://www.twentyfournews.com/tag/coronavirus",
//     selectr: "class",
//     specific: "main-content"

// })
// const newssource2 = new NewsSource({
//     sourceName: "BBC news",
//     sourceLink: "https://www.bbc.com/news/coronavirus",
//     selectr: "id",
//     specific: "topos-component"

// })
async function fetchNewsSources() {
    // try {
    //     console.log("inside fetchNewsSources")
    //     await newssource1.save()
    //     console.log("news source " + newssource1.sourceName + " inserted")
    //     await newssource2.save()
    //     console.log("news source " + newssource2.sourceName + " inserted")
    // }

    // catch (err) {
    //     console.log("news source " + newssource1.sourceName + " not inserted")
    //     console.log("news source " + newssource2.sourceName + " not inserted")

    // }

    const newssrcs = await NewsSource.find({})
    console.log(newssrcs)
    bulkNewsToGen(newssrcs)
}

module.exports = fetchNewsSources



