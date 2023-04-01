import React,{useContext,useEffect} from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';

import { fetchCurrent } from '../../../adapters/fetchStatistics.js';
import { StatiContext } from '../../../context/statiContext'
import image from '../../../images/image.png';

import { BeatLoader } from "react-spinners";
const ldstyles = {
    ldcontainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "60px",
    },
    centerit: {
        marginTop: "230px"
    }
}



export const Cards = () => {

  const statiContext = useContext(StatiContext);

  let { globalSummary,
        setglobalSummary,
        countrySummary,
        setcountrySummary} = statiContext
  
  
  useEffect(()=>{
    async function fetchData() 
    {
      
      let data=await fetchCurrent() 
      if(data)
      {
        setglobalSummary(data.globalSummary);
        setcountrySummary(data.countrySummary);
      } 
      else
      {
        console.log("Current summary not loaded")
      }  
      
    
    }
    console.log("inside Cards useEffect")

    fetchData()
  },[]);


  if(globalSummary&&countrySummary){

            let {TotalConfirmed,
                TotalDeaths,
                TotalRecovered,
                ActiveCases,
                Date}=globalSummary


        return (
        
          <div className={styles.container}>
          <img className={styles.image} src={image} alt="COVID-19" />

            <Typography gutterBottom variant="h5" component="h1">Global</Typography>
            
            <Grid container spacing={3} justify="center">
              
              <CardComponent
                  className={styles.infected}
                  cardTitle="Infected"
                  value={TotalConfirmed}
                  lastUpdate={Date}
                  cardSubtitle="Infected cases from COVID19."

                />
              
              <CardComponent
                className={styles.recovered}
                cardTitle="Recovered"
                value={TotalRecovered}
                lastUpdate={Date}
                cardSubtitle="Recoveries from COVID19."

              />
              
              <CardComponent
                className={styles.deaths}
                cardTitle="Deaths"
                value={TotalDeaths}
                lastUpdate={Date}
                cardSubtitle="Deaths from COVID19."

              />
              
              <CardComponent
                className={styles.active}
                cardTitle="Active cases"
                value={ActiveCases}
                lastUpdate={Date}
                cardSubtitle="Active cases from COVID19."

              />
            </Grid>
          </div>
        );
  }
  else {
    return <div style={ldstyles.ldcontainer}><BeatLoader loading css={ldstyles.centerit} /></div>

  }

};

