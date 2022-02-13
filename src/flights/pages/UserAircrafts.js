import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import AircraftList from '../components/AircraftList';


const UserAircrafts = () => {
    const auth = useContext(AuthContext);
    const [loadedAircrafts, setLoadedAircrafts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    const userId = useParams().userId;

    useEffect(() => {
        const fetchAircrafts = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/aircraft/`, 'GET', null,
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token
                    });

                setLoadedAircrafts(responseData.aircrafts);

            } catch (err) {

            }
        };
        fetchAircrafts();

    }, [sendRequest, userId]);

    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        )}
        {!isLoading && loadedAircrafts && <AircraftList items={loadedAircrafts} />}
    </React.Fragment>
    );
};

export default UserAircrafts;
