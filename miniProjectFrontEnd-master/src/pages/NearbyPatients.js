import React, { useContext, useState, useEffect, useRef } from 'react';
import { MainContext } from '../context/maincontext'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import { fetchPatientsNearby } from '../adapters/managepatients'
import { BeatLoader } from "react-spinners";

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "60px",
    },
    centerit: {
        marginTop: "230px"
    },
    heading: {
        backgroundColor: "lightblue",
        width: "1080px",
        textAlign: "center",
        padding: "10px"
    }
}
function NearbyPatients() {
    let { tokenVerified, isLogin } = useContext(MainContext)

    //state
    const [userposition, setuserposition] = useState(null)
    const [patients, setpatients] = useState(null)

    console.log(userposition)

    //effects
    useEffect(async () => {


        const success = async (position) => {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            setuserposition({ latitude, longitude })

            let data = await fetchPatientsNearby()
            if (data) {
                setpatients(data)
                console.log(patients)
            }



        }

        const error = () => {
            console.log('Unable to retrieve your location')
        }

        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser')
        } else {
            console.log('Locating…')
            navigator.geolocation.getCurrentPosition(success, error)
        }

    }, [])
    if (tokenVerified === true || isLogin === true) {

        return userposition ? (
            <div style={styles.container}>
                <h2 style={styles.heading}>Nearby COVID-19 patients</h2>
                <MapContainer center={[userposition.latitude, userposition.longitude]}
                    zoom={11}
                    scrollWheelZoom={false}>

                    <TileLayer
                        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                        id="mapbox/streets-v11"
                        accessToken="pk.eyJ1IjoiYmlqaXNob2IiLCJhIjoiY2tqNnJzcGYwNmFjeTJybGI5NnJ0bjVmdCJ9.YgiOSIS_Kd3sb0vjT0Q6vg"
                    />

                    {patients ? patients.map((patient, id) => {

                        return (< Marker position={[patient.latitude, patient.longitude]}
                            key={id} >

                            <Popup>
                                COVID-19 patient
                            </Popup>

                        </Marker>)
                    }) : null


                    }


                </MapContainer >
            </div>

        ) : <div style={styles.container}><BeatLoader loading css={styles.centerit} /></div>


    }
    else {
        return (<div>Invalid entry</div>)
    }
}
export default NearbyPatients;
