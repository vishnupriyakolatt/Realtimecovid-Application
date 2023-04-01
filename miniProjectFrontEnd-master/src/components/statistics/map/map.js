import React, { useEffect, useContext } from 'react'
import { StatiContext } from '../../../context/statiContext'
import { MapContainer, TileLayer, Popup } from 'react-leaflet'
import MyMarker from './ExtendedMarker'




export const Worldmap = () => {
    const statiContext = useContext(StatiContext);
    let position = null
    let { countries, selectCountry, countrySummary, currentPosition, setcurrentPosition, popupdata,
        setpopupdata } = statiContext
    useEffect(() => {
        if (countries) {
            for (let i = 0; i < countries.length; i++) {
                if (selectCountry === countries[i].Slug) {
                    position = [countries[i].latitude, countries[i].longitude]
                    setcurrentPosition(position)
                    console.log(position)

                }
            }
            if (countrySummary) {
                for (let i = 0; i < countrySummary.length; i++) {
                    if (selectCountry === countrySummary[i].Slug) {
                        let { Country,
                            TotalConfirmed,
                            TotalDeaths,
                            TotalRecovered,
                            ActiveCases,
                            Date } = countrySummary[i]

                        setpopupdata(
                            {
                                Country,
                                TotalConfirmed,
                                TotalDeaths,
                                TotalRecovered,
                                ActiveCases,
                                Date
                            })
                    }
                }
            }
        }

    }, [selectCountry])
    const Centerposition = [15.4542, 18.7322]
    if (countrySummary && countries) {
        return (

            <MapContainer center={Centerposition} zoom={2} scrollWheelZoom={false}>
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                    id="mapbox/streets-v11"
                    accessToken="pk.eyJ1IjoiYmlqaXNob2IiLCJhIjoiY2tqNnJzcGYwNmFjeTJybGI5NnJ0bjVmdCJ9.YgiOSIS_Kd3sb0vjT0Q6vg"
                />
                {currentPosition ? <MyMarker position={currentPosition}>
                    <Popup>
                        <b>{popupdata.Country}</b>
                        <br />
                        {`Total Confirmed : ${popupdata.TotalConfirmed}`}
                        <br />

                        {`Total Deaths : ${popupdata.TotalDeaths}`}
                        <br />

                        {`Total Recovered : ${popupdata.TotalRecovered}`}
                        <br />

                        {`Active Cases : ${popupdata.ActiveCases}`}
                        <br />

                        {/*`Date : ${popupdata.Date}`*/}


                    </Popup>
                </MyMarker> : null}

            </MapContainer>

        )
    }
    else {
        return null
    }

}
// <TileLayer
//                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
// attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
