import React, { useState, useEffect } from 'react'
import { MediaCard } from './NewsCard'
import { Grid } from '@material-ui/core';
import { fetchNews } from '../../adapters/news'
import { Loader } from '../loader/Loader'



const styles = {
    NewsItem: {
        float: "left",
        backgroundColor: "red",
        margin: "10px auto",
    },
    NewsContainer: {
        margin: "10px auto",
    }
}

const NewsGrid = () => {

    const [newses, setnewses] = useState(null)



    useEffect(() => {
        async function fetchData() {
            console.log("inside useeffect->fetchData")
            let data = await fetchNews()
            console.log(data)
            setnewses(data)
        }
        fetchData()
    }, [])

    return (
        <div className={styles.NewsContainer}>

            <Grid justify="center" container spacing={1}
                direction="row"
            >{!newses ? <Loader centerit={true} /> : newses.map((newsItem, i) =>


                <MediaCard imglink={newsItem.imglink}
                    link={newsItem.link}
                    title={newsItem.title}
                    date={newsItem.date}
                    key={i} />

            )}</Grid>


        </div>

    )
}

export { NewsGrid }