import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';


import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import FlightList from '../components/FlightList';

import dates from '../components/dates';

const UserFlights = ({ loadedCrew, aircraft }) => {


  const auth = useContext(AuthContext);
  const userId = useParams().userId;

  const [loadedFlights, setLoadedFlights] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedNotes, setLoadedNotes] = useState([]);
  const [didMount, setDidMount] = useState(false);
  const [startDate, setStartDate] = useState(new Date());


  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, [])


  let currentDate = new Date(startDate).toISOString().slice(0, 10);
  let currentDateCorr = new Date(startDate);
  let currentDateFetch;

  let curentDateIndex = dates.indexOf(new Date().toISOString().slice(0, 10));


  if (new Date(startDate) >= new Date(dates[curentDateIndex - 30])) {
    currentDateFetch = new Date();
  } else {
    currentDateFetch = currentDateCorr;
  }
  currentDateFetch.setDate(currentDateFetch.getDate() - 30);
  let currentDateFetchCorr = currentDateFetch.toISOString().slice(0, 10);

  let dateIndex = dates.indexOf(currentDate);


  const nextDate = () => {
    const nextDate = dates[dateIndex + 1];
    setStartDate(new Date(nextDate));
  };

  const prevDate = () => {
    const prevDate = dates[dateIndex - 1];
    setStartDate(new Date(prevDate));
  };

  const validDate = () => {
    setStartDate(new Date());
  };

  const forteenDays = () => {
    const nextDate = dates[dateIndex - 7];
    setStartDate(new Date(nextDate));
  };

  const sevenDay = () => {
    const nextDate = dates[dateIndex + 7];
    setStartDate(new Date(nextDate));
  };



  useEffect(() => {
    const fetchFlights = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:5000/api/flights/dates/${currentDateFetchCorr}`, 'GET', null,
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token
          });

        setLoadedFlights([...responseData.flights]);
      } catch (err) {

      }
    };

    fetchFlights();

  }, [sendRequest, userId, currentDateFetchCorr, auth.token]);




  useEffect(() => {
    const fetchFlights = async () => {

      try {
        const socket = openSocket(`http://localhost:5000/`);
        socket.on('createFlight', data => {
          if (data.action === 'create') {

            setLoadedFlights(data.flights);
          } else if (data.action === 'createFlt' && loadedFlights !== undefined) {
            const flts = [...loadedFlights, data.flight];
            console.log(flts);
            setLoadedFlights(flts);
          } else if (data.action === 'deleteFlt' && loadedFlights !== undefined) {
            console.log('delete');
            const flts = [...loadedFlights];
            flts.filter(flt => flt._id === data.flight._id);
            console.log(flts);
            setLoadedFlights(flts);
          }
        });
      } catch (err) {

      }
    };
    fetchFlights();

  }, [loadedFlights]);

  useEffect(() => {
    const fetchNotes = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:5000/api/getnotes`, 'GET', null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token

          });

          setLoadedNotes(responseData.notes);

      } catch (err) {
      }
    };
    fetchNotes();

  }, [sendRequest, auth.token, userId]);


  const flightDeletedHendler = deletedFlightId => {
    setLoadedFlights(prevFlight => prevFlight.filter(flt => flt.id !== deletedFlightId));
  };

  const onDeleteNote = deletedNoteId => {
    setLoadedNotes(prevNotes => prevNotes.filter(note => note.id !== deletedNoteId));

  };


  if (!didMount) {
    return null;
  }

  return (<React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    )}
    {!isLoading && loadedFlights && loadedNotes && <FlightList
      items={loadedFlights}
      loadedNotes={loadedNotes}
      aircraft={aircraft}
      onDeletePlace={flightDeletedHendler}
      onDeleteNote={onDeleteNote}
      currentDate={currentDate}
      nextDate={nextDate}
      prevDate={prevDate}
      validDate={validDate}
      forteenDays={forteenDays}
      sevenDay={sevenDay}
      setStartDate={setStartDate}
      loadedCrew={loadedCrew}
    />}
  </React.Fragment>
  );
};

export default UserFlights;
