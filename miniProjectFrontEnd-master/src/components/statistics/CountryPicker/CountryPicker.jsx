import React, { useEffect,useContext } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../../adapters/fetchStatistics.js';
import { StatiContext } from '../../../context/statiContext'

import styles from './CountryPicker.module.css';

const Countries = () => {

  const statiContext = useContext(StatiContext);

  let { globalSummary,
        countries, 
        setCountries,
        selectCountry,
        setselectCountry } = statiContext
 
  const handleChange=(event)=>{
    
    setselectCountry(event.target.value)
  }

  useEffect(async() => {
    async function fetchData() 
    {
        
      let {data}=await fetchCountries()
      setCountries(data);
      
    }
    console.log("inside Country picker useEffect")

    fetchData()
      

  },[]);

  if(globalSummary&&countries){
  return (
    <FormControl className={styles.formControl}>
      {countries?
    <NativeSelect className={styles.formSelect} defaultValue=" " onChange={(event) => handleChange(event)}>
        
    <option>Select place</option>

        {countries.map((country, i) => 
          <option 
            key={i} 
            value={country.Slug}>
            {country.Country}
          </option>)}

      </NativeSelect>:"loading"}
    </FormControl>
  );
        }
        else{
          return null
        }
};

export default Countries;
  