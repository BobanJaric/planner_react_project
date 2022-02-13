import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';
import './GenDec.css';

const UpdateAirport = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [values, setValues] = useState();
  const [checkedVip, setCheckedVip] = useState(false);
  const [checkedDoz, setCheckedDoz] = useState(false);
  const [checkedSlot, setCheckedSlot] = useState(false);

  const airportId = useParams().airportId;
  const history = useHistory();


  useEffect(() => {
    const fetchAirport = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:5000/api/flights/airports/${airportId}`, 'GET', null,
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token
          });

        setValues(responseData.airport);
        if (responseData.airport.vip === 'yes') { setCheckedVip(true); }
        if (responseData.airport.doz === 'yes') { setCheckedDoz(true); }
        if (responseData.airport.slot === 'yes') { setCheckedSlot(true); }

      } catch (err) {

      }
    };
    fetchAirport();
  }, [sendRequest, airportId, auth.token]);

  let vipChecked = '';
  let dozChecked = '';
  let slotChecked = '';
  if (checkedVip === true) { vipChecked = 'yes'; }
  if (checkedDoz === true) { dozChecked = 'yes'; }
  if (checkedSlot === true) { slotChecked = 'yes'; }


   const airportUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/flights/airports/${airportId}`, 'PATCH',
        JSON.stringify({
          icao: values.icao,
          iata: values.iata,
          country: values.country,
          city: values.city,
          utc: values.utc,
          hendler1: values.hendler1,
          hendler2: values.hendler2,
          hendler3: values.hendler3,
          hendler4: values.hendler4,
          hendler5: values.hendler5,
          note: values.note,
          vip: vipChecked,
          doz: dozChecked,
          slot: slotChecked,
          meetingpoint: values.meetingpoint,
          latitude:values.latitude,
          longitude:values.longitude,
          creator: auth.userId
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token

        }
      );
      history.push('/' + auth.userId + '/airports');
    } catch (err) {

    }

  };

  const handleOnChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!values && !error) {
    return (
      <div>
        <Card>
          <h2>Could not find Airport</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form1 " style={{ marginBottom: '50px' }} onSubmit={airportUpdateSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h5>ADD AIRPORT</h5>
        <div className="form-control5">
          <label>ICAO</label>
          <input
            id='icao'
            name='icao'
            value={values.icao}
            onChange={handleOnChange}
          />
          <label>IATA</label>
          <input
            id='iata'
            name='iata'
            value={values.iata}
            onChange={handleOnChange}
          />
          <label>COUNTRY</label>
          <input
            id='country'
            name='country'
            value={values.country}
            onChange={handleOnChange}
          />
          <label>CITY</label>
          <input
            id='city'
            name='city'
            value={values.city}
            onChange={handleOnChange}
          />
          <label>UTC</label>
          <input
            id='utc'
            name='utc'
            value={values.utc}
            onChange={handleOnChange}
          />
          <label>Longitude</label>
          <input
            id='latitude'
            name='latitude'
            value={values.latitude}
            onChange={handleOnChange}
          />
          <label>Latitude</label>
          <input
            id='longitude'
            name='longitude'
            value={values.longitude}
            onChange={handleOnChange}
          />
          <label>Meeting Point</label>
            <input
              id='meetingpoint'
              name='meetingpoint'
              value={values.meetingpoint}
              onChange={handleOnChange}
            />
          <div className="checkbox-holder">
            <label>Dozvola</label>
            <input
              type="checkbox"
              checked={checkedDoz}
              id='doz'
              name='doz'
              onChange={e => setCheckedDoz(e.target.checked)}
            /><br />
            <label>Slot</label>
            <input
              type="checkbox"
              checked={checkedSlot}
              id='slot'
              name='slot'
              onChange={e => setCheckedSlot(e.target.checked)}
            /><br />
            <label>VIP</label>
            <input
              type="checkbox"
              checked={checkedVip}
              id='vip'
              name='vip'
              onChange={e => setCheckedVip(e.target.checked)}
            />
          </div>
        </div>
        <label>ADD HANDLER</label>
        <div className="form-control5">
          <label>Handler 1</label>
          <input
            id='hendler1'
            name='hendler1'
            value={values.hendler1}
            onChange={handleOnChange}
          />
          <label>Handler 2</label>
          <input
            id='hendler2'
            name='hendler2'
            rows={2}
            value={values.hendler2}
            onChange={handleOnChange}
          />
          <label>Handler 3</label>
          <input
            id='hendler3'
            name='hendler3'
            rows={2}
            value={values.hendler3}
            onChange={handleOnChange}
          />
          <label>Handler 4</label>
          <input
            id='hendler4'
            name='hendler4'
            rows={2}
            value={values.hendler4}
            onChange={handleOnChange}
          />
          <label>Handler 5</label>
          <input
            id='hendler5'
            name='hendler5'
            rows={2}
            value={values.hendler5}
            onChange={handleOnChange}
          />
        </div>
        <h5>NOTE</h5>
        <textarea
          className="form-control2"
          id='note'
          name='note'
          rows={2}
          value={values.note}
          onChange={handleOnChange}
        />

        <Button type="submit" >EDIT AIRPORT</Button>
      </form>
    </React.Fragment>
  );

};

export default UpdateAirport;