import React from 'react';

import {
    Typography, makeStyles, Card, CardActionArea,
    CardActions, CardContent, CardMedia, Button
}
    from '@material-ui/core';



const useStyles = makeStyles({
    root: {
        maxWidth: 345, margin: "6px",
    },
    media: {
        height: 165,
    },
    dateClass: {
        float: "right",
    }
});

function MediaCard(props) {
    let { title, imglink, link, date } = props

    if (title.length > 70) {
        title = title.slice(0, 69) + "..."
    }
    const classes = useStyles();
    let handleShareClick = (extlink) => {
        window.location.assign(extlink);
    }
    return (
        <Card className={classes.root}>

            <CardActionArea onClick={() => handleShareClick(link)}>

                <CardMedia
                    className={classes.media}
                    image={imglink}

                />

                <CardContent>

                    <Typography gutterBottom variant="h6" component="h5">
                        {title}
                    </Typography>

                    <Typography variant="body2"
                        color="textSecondary"
                        component="p" className={classes.dateClass}>
                        {new Date(date).toLocaleDateString('en-GB')}
                    </Typography>

                </CardContent>
            </CardActionArea>

            <CardActions>


                <Button size="small" color="primary" onClick={() => handleShareClick(props.link)}>
                </Button>

            </CardActions>
        </Card >
    );
}

export { MediaCard }