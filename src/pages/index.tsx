import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTracking } from '../hooks/useContextLocation';

import styles from '../styles/Home.module.css';

export default function Home() {
    const [statusMessage, setStatusMessage] = useState('');
    const { state, addLocation } = useTracking();

    const onClickGetLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                addLocation({ latitude, longitude });
                setStatusMessage('La ubicacion a sido registrada 😁!!');
                setTimeout(() => {
                    setStatusMessage('');
                }, 2000);
            },
            null,
            { enableHighAccuracy: true }
        );
    };

    return (
        <>
            <Head>
                <title>Inicio | TrackingApp</title>
            </Head>
            <div className={styles.container}>
                <p className={styles.locationCounter}>Ubicaciones registradas: {state.locations.length}</p>
                {statusMessage.length > 0 && <p className={styles.statusMessage}>{statusMessage}</p>}
                <button className={`${styles.getLocationButton} button`} onClick={onClickGetLocation}>
                    LOCATION NOW
                </button>
                <Link href={'/locations'}>
                    <span className={'link'}>Ver Ubicaciones</span>
                </Link>
            </div>
        </>
    );
}
