import Head from 'next/head';
import Link from 'next/link';

import LocationCard from '../components/LocationCard';

import { useTracking } from '../hooks/useContextLocation';

import styles from '../styles/Location.module.css';

function Locations() {
    const { state } = useTracking();

    return (
        <>
            <Head>
                <title>Ubicaciones | TrackingApp</title>
            </Head>
            <div className={styles.container}>
                <Link href={'/'}>
                    <span className={'link'}>Volver al inicio</span>
                </Link>
                {state.locations.map((location, index: number) => {
                    return <LocationCard key={`Location-${index}`} location={location} />;
                })}
            </div>
        </>
    );
}

export default Locations;
