import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import openSocket from 'socket.io-client';
/* import { send } from 'emailjs-com'; */

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
/* import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'; */
/* import Airport from '../components/Airport'; */

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook'; // custom HOOK!!!!
import { useHttpClient } from '../../shared/hooks/http-hook';

import Button2 from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import serbia from './serbia.jpg';

import './NewFlight.css';

const NewFlight = () => {
  const auth = useContext(AuthContext);
  const [values, setValues] = useState({});
  const [inputList, setInputList] = useState([{ departureTime: "", originIcao: "", arrivalTime: "", destinationIcao: "" }]);
  const [loadedAirport, setLoadedAirport] = useState([]);
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      flightType1: {
        value: '',
        isValid: false
      },
      flightType2: {
        value: '',
        isValid: true
      },
      flightType3: {
        value: '',
        isValid: true
      },
      flightType4: {
        value: '',
        isValid: true
      },
      date1: {
        value: '',
        isValid: false
      },
      date2: {
        value: '',
        isValid: true
      },
      date3: {
        value: '',
        isValid: true
      },
      date4: {
        value: '',
        isValid: true
      },
      registration: {
        value: '',
        isValid: false
      },
      originIcao1: {
        value: '',
        isValid: false
      },
      destinationIcao1: {
        value: '',
        isValid: false
      },
      departureTime1: {
        value: '',
        isValid: false
      },
      arrivalTime1: {
        value: '',
        isValid: false
      },
      originIcao2: {
        value: '',
        isValid: true
      },
      destinationIcao2: {
        value: '',
        isValid: true
      },
      departureTime2: {
        value: '',
        isValid: true
      },
      arrivalTime2: {
        value: '',
        isValid: true
      },
      originIcao3: {
        value: '',
        isValid: true
      },
      destinationIcao3: {
        value: '',
        isValid: true
      },
      departureTime3: {
        value: '',
        isValid: true
      },
      arrivalTime3: {
        value: '',
        isValid: true
      },
      originIcao4: {
        value: '',
        isValid: true
      },
      destinationIcao4: {
        value: '',
        isValid: true
      },
      departureTime4: {
        value: '',
        isValid: true
      },
      arrivalTime4: {
        value: '',
        isValid: true
      },
      paxnbr1: {
        value: '',
        isValid: true
      },
      paxnbr2: {
        value: '',
        isValid: true
      },
      paxnbr3: {
        value: '',
        isValid: true
      },
      paxnbr4: {
        value: '',
        isValid: true
      },
      hendlerOrigin: {
        value: '',
        isValid: true
      },
      hendlerOrigin1: {
        value: '',
        isValid: true
      },
      hendlerOrigin2: {
        value: '',
        isValid: true
      },
      hendlerOrigin3: {
        value: '',
        isValid: true
      },
      hendlerDestination1: {
        value: '',
        isValid: true
      },
      hendlerDestination2: {
        value: '',
        isValid: true
      },
      hendlerDestination3: {
        value: '',
        isValid: true
      },
      hendlerDestination4: {
        value: '',
        isValid: true
      }

    },
    false
  );

  const history = useHistory();

  const handleOnChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputChange = (e, index) => {
    const { id, value } = e.target;
    const list = [...inputList];
    list[index][id] = value;
    setInputList(list);
  };


  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { departureTime: "", originIcao: "", arrivalTime: "", destinationIcao: "", paxnbr: "" }]);
  };


  const value_start = [formState.inputs.departureTime1.value.split(':'), formState.inputs.departureTime2.value.split(':'), formState.inputs.departureTime3.value.split(':'), formState.inputs.departureTime4.value.split(':')];
  const value_end = [formState.inputs.arrivalTime1.value.split(':'), formState.inputs.arrivalTime2.value.split(':'), formState.inputs.arrivalTime3.value.split(':'), formState.inputs.arrivalTime4.value.split(':')];
  let hoursEnd = [];
  let hoursStart = [];
  let msp = [];

  for (let i = 0; i < 4; i++) {

    let end = value_end[i][0];
    if (value_start[i][0] > value_end[i][0]) {
      end = +value_end[i][0] + 24;
    }

    hoursEnd[i] = (end - value_start[i][0]) * 60;
    hoursStart[i] = value_end[i][1] - value_start[i][1];
    msp[i] = ((hoursEnd[i] + hoursStart[i]) / 60).toFixed(1);
  }


  const flightSubmitHandler = async event => {


    event.preventDefault();
    let noteEmpty;
    if (values.note === undefined) {
      noteEmpty = 'No notes';
    } else {
      noteEmpty = values.note;
    }
    try {
      await sendRequest(`http://localhost:5000/api/flights`,
        'POST',
        JSON.stringify({
          note: noteEmpty,
          hendlerOrigin: formState.inputs.hendlerOrigin.value,
          hendlerOrigin1: formState.inputs.hendlerOrigin1.value,
          hendlerOrigin2: formState.inputs.hendlerOrigin2.value,
          hendlerOrigin3: formState.inputs.hendlerOrigin3.value,
          hendlerDestination1: formState.inputs.hendlerDestination1.value,
          hendlerDestination2: formState.inputs.hendlerDestination2.value,
          hendlerDestination3: formState.inputs.hendlerDestination3.value,
          hendlerDestination4: formState.inputs.hendlerDestination4.value,
          date1: formState.inputs.date1.value,
          date2: formState.inputs.date2.value,
          date3: formState.inputs.date3.value,
          date4: formState.inputs.date4.value,
          paxnbr1: formState.inputs.paxnbr1.value,
          paxnbr2: formState.inputs.paxnbr2.value,
          paxnbr3: formState.inputs.paxnbr3.value,
          paxnbr4: formState.inputs.paxnbr4.value,
          registration: formState.inputs.registration.value,
          departureTime1: formState.inputs.departureTime1.value,
          departureTime2: formState.inputs.departureTime2.value,
          departureTime3: formState.inputs.departureTime3.value,
          departureTime4: formState.inputs.departureTime4.value,
          originIcao1: formState.inputs.originIcao1.value,
          originIcao2: formState.inputs.originIcao2.value,
          originIcao3: formState.inputs.originIcao3.value,
          originIcao4: formState.inputs.originIcao4.value,
          destinationIcao1: formState.inputs.destinationIcao1.value,
          destinationIcao2: formState.inputs.destinationIcao2.value,
          destinationIcao3: formState.inputs.destinationIcao3.value,
          destinationIcao4: formState.inputs.destinationIcao4.value,
          arrivalTime1: formState.inputs.arrivalTime1.value,
          arrivalTime2: formState.inputs.arrivalTime2.value,
          arrivalTime3: formState.inputs.arrivalTime3.value,
          arrivalTime4: formState.inputs.arrivalTime4.value,
          flightType1: formState.inputs.flightType1.value,
          flightType2: formState.inputs.flightType2.value,
          flightType3: formState.inputs.flightType3.value,
          flightType4: formState.inputs.flightType4.value,
          msp1: msp[0],
          msp2: msp[1],
          msp3: msp[2],
          msp4: msp[3],
          airportsData: airportsData
        }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      openSocket(`http://localhost:5000`);

      history.push('/5fe46d14371ffc10f04ffec5/flights');
    } catch (err) {

    }
  };

  let inputAirports = [formState.inputs.originIcao1.value, formState.inputs.destinationIcao1.value,
  formState.inputs.originIcao2.value, formState.inputs.destinationIcao2.value,
  formState.inputs.originIcao3.value, formState.inputs.destinationIcao3.value,
  formState.inputs.originIcao4.value, formState.inputs.destinationIcao4.value,
  ];

  useEffect(() => {

    const fetchAirport = async (apt) => {
      if (apt !== '' && apt.length === 4) {
        try {
          const responseData = await sendRequest(`http://localhost:5000/api/flights/airport/${apt}`, 'GET', null,
            {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token
            });
          if (responseData.airport[1] === undefined) {
            loadedAirport.push(responseData.airport[0]);
          } else {
            loadedAirport.push(responseData.airport[1]);
          }

          let loadedAirportCorr = loadedAirport.reduce((acc, current) => {
            const x = acc.find(item => item._id === current._id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          setLoadedAirport(loadedAirportCorr);
        } catch (err) {

        }
      }
    };

    inputAirports.forEach(apt => {
      fetchAirport(apt);
    });


  }, [sendRequest, auth.token, formState.inputs.originIcao1.value, formState.inputs.destinationIcao1.value,
    formState.inputs.originIcao2.value, formState.inputs.destinationIcao2.value,
    formState.inputs.originIcao3.value, formState.inputs.destinationIcao3.value,
    formState.inputs.originIcao4.value, formState.inputs.destinationIcao4.value]);

  let currentOriginApt;
  let currentDestinationApt;

  if (loadedAirport) {
    // eslint-disable-next-line 
    currentOriginApt = loadedAirport.filter(airport => {

      if (airport.icao === formState.inputs.originIcao1.value) {
        return airport;
      }
    });
  }


  if (loadedAirport) {
    // eslint-disable-next-line 
    currentDestinationApt = loadedAirport.filter(airport => {
      if (airport.icao === formState.inputs.destinationIcao1.value) {
        return airport;
      }
    });
  }


  let currentOriginApt1;
  let currentDestinationApt1;

  if (loadedAirport) {
    // eslint-disable-next-line 
    currentOriginApt1 = loadedAirport.filter(airport => {
      if (airport.icao === formState.inputs.originIcao2.value) {
        return airport;
      }
    });
  }


  if (loadedAirport) {
    // eslint-disable-next-line 
    currentDestinationApt1 = loadedAirport.filter(airport => {
      if (airport.icao === formState.inputs.destinationIcao2.value) {
        return airport;
      }
    });
  }


  let currentOriginApt2;
  let currentDestinationApt2;

  if (loadedAirport) {
    // eslint-disable-next-line 
    currentOriginApt2 = loadedAirport.filter(airport => {
      if (airport.icao === formState.inputs.originIcao3.value) {
        return airport;
      }
    });
  }

  if (loadedAirport) {
    // eslint-disable-next-line 
    currentDestinationApt2 = loadedAirport.filter(airport => {
      if (airport.icao === formState.inputs.destinationIcao3.value) {
        return airport;
      }
    });
  }

  let currentOriginApt3;
  let currentDestinationApt3;


  if (loadedAirport) {
    // eslint-disable-next-line 
    currentOriginApt3 = loadedAirport.filter(airport => {

      if (airport.icao === formState.inputs.originIcao4.value) {
        return airport;
      }
    });
  }
  if (loadedAirport) {
    // eslint-disable-next-line 
    currentDestinationApt3 = loadedAirport.filter(airport => {
      if (airport.icao === formState.inputs.destinationIcao4.value) {
        return airport;
      }
    });
  }
  let airportsData = [currentOriginApt[0], currentDestinationApt[0], currentOriginApt1[0], currentDestinationApt1[0], currentOriginApt2[0],
  currentDestinationApt2[0], currentOriginApt3[0], currentDestinationApt3[0]];

  for (let i = 0; i < airportsData.length; i++) {
    if (typeof (airportsData[i]) === "undefined") {
      airportsData[i] = {};
    }
  }


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={flightSubmitHandler}>
        <div className="flight-header">
          <Input
            id='registration'
            element='select'
            label='Registration'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />

        </div>
        {inputList.map((x, i) => {
          return (
            <div key={i + 20} >
              <div className="flight-info" key={i + 25}  >
                <div>
                  {i === 0 && <label>Flight Date</label>}
                  <Input
                    id={`date${i + 1}`}
                    key={`date${i + 1}`}
                    type="date"
                    data-date-format="DD MMMM YYYY"
                    element='input'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid date.'
                    onInput={inputHandler}
                    initialValid={true}
                  />
                </div>
                <div>
                  {i === 0 && <label>Departure time</label>}
                  <Input
                    id={`departureTime${i + 1}`}
                    key={`departureTime${i + 1}`}
                    type="text"
                    element='input'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid time"
                    onInput={inputHandler}
                    value={x.firstName}
                    onChange={e => handleInputChange(e, i)}
                    initialValid={true}
                  />
                </div>
                <div>
                  {i === 0 && <label>Origin Icao</label>}
                  <Input
                    id={`originIcao${i + 1}`}
                    key={`originIcao${i + 1}`}
                    type="text"
                    element='input'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid ICAO code"
                    onInput={inputHandler}
                    value={x.lastName}
                    onChange={e => handleInputChange(e, i)}
                    initialValid={true}
                  />
                </div>
                <div>
                  {i === 0 && <label>Destination Icao</label>}
                  <Input
                    id={`destinationIcao${i + 1}`}
                    key={`destinationIcao${i + 1}`}
                    element='input'
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid ICAO code"
                    onInput={inputHandler}
                    value={x.firstName}
                    onChange={e => handleInputChange(e, i)}
                    initialValid={true}
                  />
                </div>
                <div>
                  {i === 0 && <label>Arrival time</label>}
                  <Input
                    id={`arrivalTime${i + 1}`}
                    key={`arrivalTime${i + 1}`}
                    element='input'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid time"
                    onInput={inputHandler}
                    value={x.lastName}
                    onChange={e => handleInputChange(e, i)}
                    initialValid={true}
                  />
                </div>
                <div className="holder-6">
                  {i === 0 && <label>Pax Nbr</label>}
                  <Input
                    id={`paxnbr${i + 1}`}
                    key={`paxnbr${i + 1}`}
                    element='select'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid paxnbr"
                    onInput={inputHandler}
                    initialValid={true}
                  /* value={x.lastName}
                  onChange={e => handleInputChange(e, i)} */
                  />
                </div>
                <div>
                  {i === 0 && <label>Flt type</label>}
                  <Input
                    id={`flightType${i + 1}`}
                    key={`flightType${i + 1}`}
                    /*  value={x.lastName} */
                    element='select'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid flightType"
                    onInput={inputHandler}
                    initialValid={true}
                  /* onChange={e => handleInputChange(e, i)}  */
                  />
                </div>
                <div className="btn-leg" key={i + 1}>
                  {inputList.length !== 1 && <Button2 onClick={() => handleRemoveClick(i)}>-</Button2>}
                  {(inputList.length - 1 === i && inputList.length !== 4) && <Button2 onClick={handleAddClick}>+</Button2>}
                </div>
              </div>
            </div>
          )
        })
        }

        <label>Note</label>
        <textarea
          className="form-control2"
          id='note'
          name='note'
          rows={2}
          value={values.note}
          onChange={handleOnChange}
        />
        <div className="handling-info">
          <div className="handling-origin" >
            {loadedAirport && currentOriginApt.map(airport =>

              <div key={airport._id}>
                <p style={{ textTransform: "capitalize" }} >{airport.icao}:</p>
                <Input
                  name='hendlerOrigin'
                  element='select'
                  /*  value={values.airport}  */
                  key={airport._id}
                  id='hendlerOrigin'
                  city={airport.city}
                  iata={airport.iata}
                  icao={airport.icao}
                  note={airport.note}
                  country={airport.country}
                  hendler1={airport.hendler1}
                  hendler2={airport.hendler2}
                  hendler3={airport.hendler3}
                  hendler4={airport.hendler4}
                  hendler5={airport.hendler5}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                />
                <p style={{ textTransform: "capitalize" }}>INFO:</p>
                <p style={{ width: "300px", textTransform: "inherit" }}>{airport.note}</p>
              </div>
            )}
            <p>{values.hendlerOrigin}</p>
          </div>
          <div className="handling-destination" >
            {loadedAirport && currentDestinationApt.map(airport =>
              <div key={airport._id} >
                <p style={{ textTransform: "capitalize" }} >{airport.icao}:</p>
                <Input
                  name='hendlerDestination1'
                  element='select'
                  /*  value={values.airport}  */
                  key={airport._id}
                  id='hendlerDestination1'
                  city={airport.city}
                  iata={airport.iata}
                  icao={airport.icao}
                  note={airport.note}
                  country={airport.country}
                  hendler1={airport.hendler1}
                  hendler2={airport.hendler2}
                  hendler3={airport.hendler3}
                  hendler4={airport.hendler4}
                  hendler5={airport.hendler5}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                />
                <p style={{ textTransform: "capitalize" }}>INFO:</p>
                <p style={{ width: "300px", textTransform: "inherit" }}>{airport.note}</p>
              </div>

            )}
            <p>{values.hendlerDestination1}</p>
          </div>
          <div className="handling-destination" >
            {loadedAirport && formState.inputs.destinationIcao1.value !== formState.inputs.originIcao2.value && currentOriginApt1.map(airport =>
              <div key={airport._id} >
                <p style={{ textTransform: "capitalize" }}  >{airport.icao}:</p>
                <Input
                  name='hendlerOrigin1'
                  element='select'
                  /* value={values.airport}  */
                  key={airport._id}
                  id='hendlerOrigin1'
                  city={airport.city}
                  iata={airport.iata}
                  icao={airport.icao}
                  note={airport.note}
                  country={airport.country}
                  hendler1={airport.hendler1}
                  hendler2={airport.hendler2}
                  hendler3={airport.hendler3}
                  hendler4={airport.hendler4}
                  hendler5={airport.hendler5}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                />
              </div>
            )}
            <p>{values.hendlerOrigin1}</p>
          </div>
          <div className="handling-origin" >
            {loadedAirport && currentDestinationApt1.map(airport =>

              <div key={airport._id}>
                <p style={{ textTransform: "capitalize" }}  >{airport.icao}:</p>
                <Input
                  name='hendlerDestination2'
                  element='select'
                  /*    value={values.airport}  */
                  key={airport._id}
                  id='hendlerDestination2'
                  city={airport.city}
                  iata={airport.iata}
                  icao={airport.icao}
                  note={airport.note}
                  country={airport.country}
                  hendler1={airport.hendler1}
                  hendler2={airport.hendler2}
                  hendler3={airport.hendler3}
                  hendler4={airport.hendler4}
                  hendler5={airport.hendler5}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                />
              </div>
            )}
            <p>{values.hendlerDestination2}</p>
          </div>

          <div className="handling-destination" >
            {loadedAirport && formState.inputs.destinationIcao2.value !== formState.inputs.originIcao3.value && currentOriginApt2.map(airport =>
              <div key={airport._id}>
                <p style={{ textTransform: "capitalize" }}  >{airport.icao}:</p>
                <Input
                  name='hendlerOrigin2'
                  element='select'
                  /*  value={values.airport}  */
                  key={airport._id}
                  id='hendlerOrigin2'
                  city={airport.city}
                  iata={airport.iata}
                  icao={airport.icao}
                  note={airport.note}
                  country={airport.country}
                  hendler1={airport.hendler1}
                  hendler2={airport.hendler2}
                  hendler3={airport.hendler3}
                  hendler4={airport.hendler4}
                  hendler5={airport.hendler5}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}

                />
              </div>
            )}
            <p>{values.hendlerOrigin2}</p>
          </div>
          <div className="handling-origin" >
            {loadedAirport && currentDestinationApt2.map(airport =>

              <div key={airport._id}>
                <p style={{ textTransform: "capitalize" }}  >{airport.icao}:</p>
                <Input
                  name='hendlerDestination3'
                  element='select'
                  /*  value={values.airport}  */
                  key={airport._id}
                  id='hendlerDestination3'
                  city={airport.city}
                  iata={airport.iata}
                  icao={airport.icao}
                  note={airport.note}
                  country={airport.country}
                  hendler1={airport.hendler1}
                  hendler2={airport.hendler2}
                  hendler3={airport.hendler3}
                  hendler4={airport.hendler4}
                  hendler5={airport.hendler5}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                />
              </div>
            )}
            <p>{values.hendlerDestination3}</p>
          </div>

          <div className="handling-destination" >
            {loadedAirport && formState.inputs.destinationIcao3.value !== formState.inputs.originIcao4.value && currentOriginApt3.map(airport =>
              <div key={airport._id}>
                <p style={{ textTransform: "capitalize" }}  >{airport.icao}:</p>
                <Input
                  name='hendlerOrigin3'
                  element='select'
                  /*   value={values.airport}  */
                  key={airport._id}
                  id='hendlerOrigin3'
                  city={airport.city}
                  iata={airport.iata}
                  icao={airport.icao}
                  note={airport.note}
                  country={airport.country}
                  hendler1={airport.hendler1}
                  hendler2={airport.hendler2}
                  hendler3={airport.hendler3}
                  hendler4={airport.hendler4}
                  hendler5={airport.hendler5}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}


                />
              </div>
            )}
            <p>{values.hendlerOrigin3}</p>
          </div>
          <div className="handling-origin" >
            {loadedAirport && currentDestinationApt3.map(airport =>

              <div key={airport._id}>
                <p style={{ textTransform: "capitalize" }}  >{airport.icao}:</p>
                <Input
                  name='hendlerDestination4'
                  element='select'
                  /*   value={values.airport}  */
                  key={airport._id}
                  id='hendlerDestination4'
                  city={airport.city}
                  iata={airport.iata}
                  icao={airport.icao}
                  note={airport.note}
                  country={airport.country}
                  hendler1={airport.hendler1}
                  hendler2={airport.hendler2}
                  hendler3={airport.hendler3}
                  hendler4={airport.hendler4}
                  hendler5={airport.hendler5}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}

                />
              </div>
            )}
            <p>{values.hendlerDestination4}</p>
          </div>

        </div>
        <div className='btn-holder-flt'>
          <Button type="submit"  /* disabled={!formState.isValid} */  >ADD FLIGHT</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewFlight;
