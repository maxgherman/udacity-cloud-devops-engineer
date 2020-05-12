import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

import React, { useState, useRef, useContext } from 'react';
import MapGL, { Source, Layer, Popup } from 'react-map-gl';
import { DataContext } from '.'
import { severities, bagKeys } from '../data-services'

const getSeverityColorSchema = () => ([
    0, '#ffe6e6',
    severities[0].key, '#ffb3b3',
    severities[1].key, '#ff8080',
    severities[2].key, '#ff4d4d',
    severities[3].key, '#e60000',
    severities[4].key, '#b30000',
    severities[5].key, '#660000'
]);

export const Map = () => {
    const { postCodes, selectedDate } = useContext(DataContext);

    const [viewport, setViewport] = useState({
        zoom: 5,
        latitude: -32.8688,
        longitude: 149.0093
    });

    const [popup, setPopup] = useState({
        show: false,
        latitude: undefined,
        longitude: undefined,
        suburb: undefined,
        total: undefined,
        tested: undefined,
        active: undefined,
        recovered: undefined,
        dead: undefined
    });

    const mapRef = useRef(null);

    const handleClick = (e) => {
        if(!e || !e.features ||
            e.features.length <=0 || !e.features[0].properties.POA_NAME16) {
            setPopup({...popup, show: false});
            return;
        }

        const properties =  e.features[0].properties;
        const suburbs = properties.suburbName.split(',');
        const suburb = suburbs.slice(0, Math.min(3, suburbs.length)).join(', ');
        const propertyKeys = bagKeys(selectedDate);
        const total = properties[propertyKeys.totalKey];
        const tested = properties[propertyKeys.testsKey];
        const active = properties[propertyKeys.activeKey];
        const recovered = properties[propertyKeys.recoveredKey];
        const dead = properties[propertyKeys.deadKey];


        setPopup({
            ...popup,
            show: true,
            latitude: e.lngLat[1],
            longitude: e.lngLat[0],
            suburb,
            total,
            tested,
            active,
            recovered,
            dead
        });
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token')

    return (
        <MapGL
            ref={mapRef}
            {...viewport}
            width="100vw"
            height="500px"
            mapStyle="mapbox://styles/mapbox/streets-v10"
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={token}
            onClick={handleClick}
        >
            {postCodes && <Source type="geojson" data={postCodes}>
                <Layer
                    id="Postcode"
                    source="Postcode"
                    type="line"
                    paint={{
                        "line-color": "black",
                        "line-width": 1
                    }}
                />
                <Layer
                    id="PostcodeCases"
                    source="Postcode"
                    type="fill"
                    paint={{
                        'fill-color': [
                            'interpolate',
                            ['linear'],
                            ['get', selectedDate],
                            ...getSeverityColorSchema()
                        ],
                        'fill-opacity': 0.8
                    }}
                    >
                </Layer>
            </Source>}
            {popup.show && <Popup
                latitude={popup.latitude}
                longitude={popup.longitude}
                closeButton={false}
                closeOnClick={false}
                >
                <div>
                    <strong>{popup.suburb}</strong>
                    <br/>
                    <span>Total: {popup.total}</span>
                    <br />
                    <span>Active: {popup.active}</span>
                    <br />
                    <span>Recovered: {popup.recovered}</span>
                </div>
            </Popup>}
        </MapGL>
    );
}
