import React, { useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import warehousesData from "../../../../assets/data/warehouses.json";

// helper function
const FlyToLocation = ({ lat, lng, zoom }) => {
    const map = useMap();
    map.flyTo([lat, lng], zoom || 13, { duration: 1.5 });
    return null;
};

const Coverage = () => {
    const [locationError, setLocationError] = useState('');
    const [searhQuery, setSearchQuery] = useState('');
    const [goToDefault, setGoToDefault] = useState(false);
    const [flyToCity, setFlyToCity] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const cityName = searhQuery;

        const matchedLoc = warehousesData.find(loc => loc.city.toLocaleLowerCase() === cityName.trim().toLocaleLowerCase());


        if (matchedLoc) {
            setFlyToCity(matchedLoc);
            setGoToDefault(false);
            setLocationError("");
        }
        else {
            setLocationError("Please Enter a valid city name");
        }
    }

    const handleClearSearch = () => {
        setSearchQuery("");
        setGoToDefault(true);
        // 
    }
    return (
        <section className='w-11/12 md:w-10/12 mx-auto shadow-md rounded-4xl my-8 bg-neutral p-6 md:p-14'>
            <div className='space-y-4'>
                <h1 className='text-xl md:text-3xl lg:text-5xl font-extrabold text-secondary'>We are available in 64 districts</h1>
                <form onSubmit={handleSearch}>
                    <div className="join w-full md:w-2/3 lg:w-1/3">
                        <div className='w-full'>
                            <label className="input join-item w-full">
                                <input type="text" placeholder="Enter City Name" onChange={(e) => setSearchQuery(e.target.value)} value={searhQuery} required />
                                <button type='button' className={`${searhQuery ? '' : 'hidden'}  btn btn-xs btn-circle`} onClick={handleClearSearch}>X</button>
                            </label>
                        </div>
                        <button className="btn btn-primary text-secondary join-item">Searh</button>
                    </div>
                </form>
                {
                    locationError && <p className='text-error'>{locationError}</p>
                }
            </div>
            <div className="rounded-xl overflow-hidden mt-8">
                <MapContainer center={[23.8103, 90.4125]} zoom={10} scrollWheelZoom={false} style={{ height: '60vh', width: '100%', zIndex: 0 }}>
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        flyToCity && <FlyToLocation lat={flyToCity.latitude} lng={flyToCity.longitude} />
                    }
                    {
                        goToDefault && <FlyToLocation lat={23.8103} lng={90.4125} zoom={10} />
                    }
                    {
                        warehousesData.map((location, index) =>
                            <Marker key={index} position={[location.latitude, location.longitude]}>
                                <Popup>
                                    <strong>{location.city}</strong><br />
                                    Areas: {location.covered_area.join(', ')}<br />
                                </Popup>
                            </Marker>
                        )
                    }
                </MapContainer>
            </div>
        </section>
    );
};

export default Coverage;