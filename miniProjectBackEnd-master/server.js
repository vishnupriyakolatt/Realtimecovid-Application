require('dotenv').config()

//importing packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


//importing routes
const usersRouter = require('./routes/users')
const newsRouter = require('./routes/news')
const countryRouter = require('./routes/countries')
const tokenRouter = require('./routes/token')
const locationRouter = require('./routes/location')
const institutionsRouter = require('./routes/institutions')
const contactsRouter = require('./routes/contacts')








//cronTask
// const cronTask = require('./functions/newsScrapping/cronTask.js');

// connecting using mongoose
mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        const app = express()
        app.use(express.json()) // new

        //cors
        app.use(cors());

        //routes
        app.use('/token', tokenRouter)
        app.use('/users', usersRouter)
        app.use('/news', newsRouter)
        app.use('/country', countryRouter)
        app.use('/location', locationRouter)
        app.use('/institutions', institutionsRouter)
        app.use('/contacts', contactsRouter)


        app.listen(5000, () => {
            console.log("Server has started!")

            // cronTask.start();


        })
    }).catch((error) => { console.error(error); })
