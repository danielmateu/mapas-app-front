// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react';


const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN

mapboxgl.accessToken = mapBoxToken;

const puntoInicial = {
    lng: 5,
    lat: 34,
    zoom: 2
}

const MapaPage = () => {

    const mapaDiv = useRef();

    const [mapa, setMapa] = useState(null)

    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom

        })

        setMapa(map)
    }, [])

    return (
        <>
            <div
                ref={mapaDiv}
                className="mapContainer absolute bottom-0 left-0 right-0 top-0"
            >

            </div>
        </>
    )
}

export default MapaPage