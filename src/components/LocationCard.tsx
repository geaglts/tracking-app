import { useState } from 'react';
import { ILocation } from '../hooks/useInitialState';

import styles from '../styles/LocationCard.module.css';

export interface LocationCardProps {
    location: ILocation;
}

export interface INearbyPostalCodes {
    postalCode: string;
    placeName: string;
}

function LocationCard({ location }: LocationCardProps) {
    const [nearbyPostalCodes, setNearbyPostalCodes] = useState<INearbyPostalCodes[]>([]);

    const loadNearbyPostalCodes = async (location: ILocation) => {
        const path = `${process.env.NEXT_PUBLIC_API_URL}/findNearbyPostalCodesJSON`;
        const username = `username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`;
        const API_URL = `${path}?lat=${location.latitude}&lng=${location.longitude}&${username}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data.postalCodes);
        const postalCodes = data.postalCodes.map((item: INearbyPostalCodes) => ({
            postalCode: item.postalCode,
            placeName: item.placeName,
        }));
        setNearbyPostalCodes(postalCodes);
    };

    return (
        <div className={styles.container}>
            <div className={styles.coordinates}>
                <p>lat: {location.latitude}</p>
                <p>long: {location.longitude}</p>
            </div>
            {nearbyPostalCodes.length > 0 && (
                <div className={styles.nearbyPostalCodes}>
                    {nearbyPostalCodes.map(({ placeName, postalCode }, index: number) => {
                        return (
                            <p key={`PostalCode-${index}`}>
                                {postalCode} - {placeName}
                            </p>
                        );
                    })}
                </div>
            )}
            {nearbyPostalCodes.length === 0 && (
                <button className={`${styles.details} button`} onClick={() => loadNearbyPostalCodes(location)}>
                    Códigos postales cercanos
                </button>
            )}
            <button className={`${styles.close} button`} onClick={() => setNearbyPostalCodes([])}>
                Cerrar
            </button>
        </div>
    );
}

export default LocationCard;
