import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import CrewList from '../components/CrewList';


const UserCrew = () => {
    const auth = useContext(AuthContext);
    const [loadedCrew, setLoadedCrew] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    const userId = useParams().userId;

    useEffect(() => {
        const fetchCrew = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/crew/`, 'GET', null,
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token
                    });

                    setLoadedCrew(responseData.crews);

            } catch (err) {

            }
        };
        fetchCrew();

    }, [sendRequest, userId, auth.token]);


    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        )}
    {!isLoading && loadedCrew && <CrewList items={loadedCrew} />}  
    </React.Fragment>
    );
};

export default UserCrew;
