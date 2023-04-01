import React, { useRef, useEffect } from 'react'
import { Marker } from 'react-leaflet'

const MyMarker = (props) => {
    const leafletRef = useRef();
    useEffect(() => {
        leafletRef.current.openPopup();
    }, [])
    return <Marker ref={leafletRef} {...props} />
}
export default MyMarker
