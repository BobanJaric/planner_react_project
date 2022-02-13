import React, { useEffect, useState, useContext } from 'react';
/* import { useParams } from 'react-router-dom'; */

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import AirportList from '../components/AirportList';


const UserAirports = () => {
  const auth = useContext(AuthContext);
  const [loadedAirports, setLoadedAirports] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // const userId = useParams().userId;

  useEffect(() => {
    const fetchAirports = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:5000/api/flights/airports/all`, 'GET', null,
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token
          });

        setLoadedAirports(responseData.airports);

      } catch (err) {

      }
    };
    fetchAirports();

  }, [sendRequest, auth.token]);


  return (<React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    )}
    {!isLoading && loadedAirports && <AirportList items={loadedAirports} />}
  </React.Fragment>
  );
};

export default UserAirports;
