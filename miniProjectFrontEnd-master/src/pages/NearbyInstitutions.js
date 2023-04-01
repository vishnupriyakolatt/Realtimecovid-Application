import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../context/maincontext'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import { fetchInstitutionsNearby } from '../adapters/manageinstitution'
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

function NearbyInstitutions() {
    let { tokenVerified, isLogin } = useContext(MainContext)

    //state
    const [userposition, setuserposition] = useState(null)
    const [institutions, setinstitutions] = useState(null)

    console.log(userposition)
    // console.log(institutions)

    //effects
    useEffect(async () => {


        const success = async (position) => {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            setuserposition({ latitude, longitude })
            // console.log(userposition)

            let data = await fetchInstitutionsNearby()
            if (data) {
                setinstitutions(data)
                console.log(institutions)
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
                <h2 style={styles.heading}>Nearby medical centres</h2>

                <MapContainer center={[userposition.latitude, userposition.longitude]}
                    zoom={11}
                    scrollWheelZoom={false}>

                    <TileLayer
                        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                        id="mapbox/streets-v11"
                        accessToken="pk.eyJ1IjoiYmlqaXNob2IiLCJhIjoiY2tqNnJzcGYwNmFjeTJybGI5NnJ0bjVmdCJ9.YgiOSIS_Kd3sb0vjT0Q6vg"
                    />

                    {institutions ? institutions.map((institution, id) => {

                        return (< Marker position={[institution.latitude, institution.longitude]}
                            key={id} >

                            <Popup>
                                <b>{`${institution.instituteName}`}</b>
                                <br />
                                {`${institution.contactInfo}`}

                            </Popup>

                        </Marker>)
                    }) : null


                    }


                </MapContainer >
            </div>

        ) : <div style={styles.container} ><BeatLoader loading css={styles.centerit} /></div>

    }
    else {
        return (<div>Invalid entry</div>)
    }
}
export default NearbyInstitutions;
