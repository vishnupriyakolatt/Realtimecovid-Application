import React, {  useEffect,useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { StatiContext } from '../../../context/statiContext'
import { fetchHistoric } from '../../../adapters/fetchStatistics.js';
import styles from './Chart.module.css';

const Chart = () => {
  
  const statiContext = useContext(StatiContext);
  
  let { selectCountry,
      countryHistoric,
      setcountryHistoric } = statiContext
  
  // const scrapChartData=async()=>{
  //   if(countryHistoric){ 
  //     console.log(countryHistoric)
  //     let labels= await [...countryHistoric].map((data ) => new Date(data.Date).toLocaleDateString("en-IN"))
  //     let confirmed=await [...countryHistoric].map((data) => data.Confirmed)
  //     let deaths=await [...countryHistoric].map((data) => data.Deaths)
  //     let recovered=await [...countryHistoric].map((data) => data.Recovered)

  //     setcurrentChartData({labels,confirmed,deaths,recovered})

  //   }
  // }
  
  

  useEffect( ()=>{
    async function fetchData() {
    
      let data=selectCountry?await fetchHistoric(selectCountry):null
        setcountryHistoric(data)
      
    }
    console.log("inside Chart useEffect")

    fetchData()
  },[selectCountry]);

  

  const lineChart = (
      countryHistoric? (
      <Line data={{
          labels:[...countryHistoric].map((data ) => new Date(data.Date).toLocaleDateString("en-IN")) ,
          datasets: [{
            data: [...countryHistoric].map((data) => data.Confirmed),
            label: 'Confirmed',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: [...countryHistoric].map((data) => data.Deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },  {
            data: [...countryHistoric].map((data) => data.Recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },{
            data: [...countryHistoric].map((data) => data.Confirmed-data.Recovered-data.Deaths),
            label: 'yellow',
            borderColor: 'yellow',
            backgroundColor: 'rgba(240, 255, 0, 1)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );
// const data = 
  return (
    <div className={styles.container}>
    {lineChart}
    </div>
  );
};

export default Chart;
// currChartData.map(({ date }) => new Date(date).toLocaleDateString())