import React, { useState, createContext } from 'react'

const StatiContext = createContext()

const StatiContextWrap = ({ children }) => {

    const [countries, setCountries] = useState(null);
    const [selectCountry, setselectCountry] = useState(null);
    const [globalSummary, setglobalSummary] = useState(null);
    const [countrySummary, setcountrySummary] = useState(null);
    const [countryHistoric, setcountryHistoric] = useState(null);

    const [currentPosition, setcurrentPosition] = useState(null);
    const [popupdata, setpopupdata] = useState(null);




    return (
        <StatiContext.Provider value={

            {
                countries,
                setCountries,
                selectCountry,
                setselectCountry,
                globalSummary,
                setglobalSummary,
                countrySummary,
                setcountrySummary,
                countryHistoric,
                setcountryHistoric,
                currentPosition,
                setcurrentPosition,
                popupdata,
                setpopupdata,


            }}>

            {children}

        </StatiContext.Provider>
    )
}

export { StatiContext, StatiContextWrap };