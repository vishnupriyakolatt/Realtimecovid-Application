const cron = require('node-cron');
const fetchNewsSources = require('./fetchNewsSources.js');

// Schedule tasks to be run on the server.
let task = cron.schedule('*/3 * * * *',
    async function () {

        console.log("cron started")
        /*logic
        call sequence
        1.fetchNewsSources
        2.bulkNewsGen
        3.bulkNewsToDb */


        fetchNewsSources();


    }

);

module.exports = task;
