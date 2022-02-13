import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Button2 from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import './NewFlight.css';

const UpdateFlight = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFlight, setLoadedFlight] = useState();
  const [inputList, setInputList] = useState([]);
  const [values, setValues] = useState({});
  const [loadedAirports, setLoadedAirports] = useState();
  const [ops, setOps] = useState();

  const flightId = useParams().flightId;

  const [formState, inputHandler, setFormData] = useForm(
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
      note: {
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

  useEffect(() => {
    const fetchFlight = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:5000/api/flights/${flightId}`, 'GET', null,
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token
          });

        setLoadedFlight(responseData.flight);
        let date = [];
        if (responseData.flight.date1 && !responseData.flight.date2 && !responseData.flight.date3 && !responseData.flight.date4) {
          date.push([responseData.flight.date1, responseData.flight.departureTime1, responseData.flight.destinationIcao1, responseData.flight.originIcao1]);
        } else if (responseData.flight.date1 && responseData.flight.date2 && !responseData.flight.date3 && !responseData.flight.date4) {
          date.push([responseData.flight.date1, responseData.flight.departureTime1, responseData.flight.destinationIcao1, responseData.flight.originIcao1], [responseData.flight.date2, responseData.flight.departureTime2, responseData.flight.destinationIcao2, responseData.flight.originIcao2]);
        } else if (responseData.flight.date1 && responseData.flight.date2 && responseData.flight.date3 && !responseData.flight.date4) {
          date.push(responseData.flight.date1, responseData.flight.date2, responseData.flight.date3);
        } else {
          date.push(responseData.flight.date1, responseData.flight.date2, responseData.flight.date3, responseData.flight.date4);
        }
        let hendlerOrigin1 = responseData.flight.hendlerOrigin;
        let hendlerOrigin2 = responseData.flight.hendlerOrigin1;
        let hendlerOrigin3 = responseData.flight.hendlerOrigin2;
        let hendlerOrigin4 = responseData.flight.hendlerOrigin3;
        let hendlerDest1 = responseData.flight.hendlerDestination1;
        let hendlerDest2 = responseData.flight.hendlerDestination2;
        let hendlerDest3 = responseData.flight.hendlerDestination3;
        let hendlerDest4 = responseData.flight.hendlerDestination4;

        setOps([responseData.flight.handling, responseData.flight.slot, responseData.flight.doz, responseData.flight.ovf,
        responseData.flight.vip
        ]);

        setValues({ hendlerOrigin1, hendlerOrigin2, hendlerOrigin3, hendlerOrigin4, hendlerDest1, hendlerDest2, hendlerDest3, hendlerDest4 });
        setInputList(
          [[responseData.flight.date1, responseData.flight.departureTime1, responseData.flight.originIcao1, responseData.flight.destinationIcao1,
          responseData.flight.arrivalTime1, responseData.flight.paxnbr1, responseData.flight.flightType1],
          [responseData.flight.date2, responseData.flight.departureTime2, responseData.flight.originIcao2,
          responseData.flight.destinationIcao2, responseData.flight.arrivalTime2, responseData.flight.paxnbr2, responseData.flight.flightType2],
          [responseData.flight.date3, responseData.flight.departureTime3, responseData.flight.originIcao3,
          responseData.flight.destinationIcao3, responseData.flight.arrivalTime3, responseData.flight.paxnbr3, responseData.flight.flightType3],
          [responseData.flight.date4, responseData.flight.departureTime4, responseData.flight.originIcao4,
          responseData.flight.destinationIcao4, responseData.flight.arrivalTime4, responseData.flight.paxnbr4, responseData.flight.flightType4]
          ]
        );
        setFormData(
          {
            flightType1: {
              value: responseData.flight.flightType1,
              isValid: true
            },
            flightType2: {
              value: responseData.flight.flightType2,
              isValid: true
            },
            flightType3: {
              value: responseData.flight.flightType3,
              isValid: true
            },
            flightType4: {
              value: responseData.flight.flightType4,
              isValid: true
            },
            date1: {
              value: responseData.flight.date1,
              isValid: true
            },
            date2: {
              value: responseData.flight.date2,
              isValid: true
            },
            date3: {
              value: responseData.flight.date3,
              isValid: true
            },
            date4: {
              value: responseData.flight.date4,
              isValid: true
            },
            hendlerOrigin: {
              value: responseData.flight.hendlerOrigin,
              isValid: true
            },
            hendlerOrigin1: {
              value: responseData.flight.hendlerOrigin1,
              isValid: true
            },
            hendlerOrigin2: {
              value: responseData.flight.hendlerOrigin2,
              isValid: true
            },
            hendlerOrigin3: {
              value: responseData.flight.hendlerOrigin3,
              isValid: true
            },
            hendlerDestination1: {
              value: responseData.flight.hendlerDestination1,
              isValid: true
            },
            hendlerDestination2: {
              value: responseData.flight.hendlerDestination2,
              isValid: true
            },
            hendlerDestination3: {
              value: responseData.flight.hendlerDestination3,
              isValid: true
            },
            hendlerDestination4: {
              value: responseData.flight.hendlerDestination4,
              isValid: true
            },
            registration: {
              value: responseData.flight.registration,
              isValid: true
            },
            originIcao1: {
              value: responseData.flight.originIcao1,
              isValid: true
            },
            destinationIcao1: {
              value: responseData.flight.destinationIcao1,
              isValid: true
            },
            departureTime1: {
              value: responseData.flight.departureTime1,
              isValid: true
            },
            arrivalTime1: {
              value: responseData.flight.arrivalTime1,
              isValid: true
            },
            originIcao2: {
              value: responseData.flight.originIcao2,
              isValid: true
            },
            destinationIcao2: {
              value: responseData.flight.destinationIcao2,
              isValid: true
            },
            departureTime2: {
              value: responseData.flight.departureTime2,
              isValid: true
            },
            arrivalTime2: {
              value: responseData.flight.arrivalTime2,
              isValid: true
            },
            originIcao3: {
              value: responseData.flight.originIcao3,
              isValid: true
            },
            destinationIcao3: {
              value: responseData.flight.destinationIcao3,
              isValid: true
            },
            departureTime3: {
              value: responseData.flight.departureTime3,
              isValid: true
            },
            arrivalTime3: {
              value: responseData.flight.arrivalTime3,
              isValid: true
            },
            originIcao4: {
              value: responseData.flight.originIcao4,
              isValid: true
            },
            destinationIcao4: {
              value: responseData.flight.destinationIcao4,
              isValid: true
            },
            departureTime4: {
              value: responseData.flight.departureTime4,
              isValid: true
            },
            arrivalTime4: {
              value: responseData.flight.arrivalTime4,
              isValid: true
            },
            paxnbr1: {
              value: responseData.flight.paxnbr1,
              isValid: true
            },
            paxnbr2: {
              value: responseData.flight.paxnbr2,
              isValid: true
            },
            paxnbr3: {
              value: responseData.flight.paxnbr3,
              isValid: true
            },
            paxnbr4: {
              value: responseData.flight.paxnbr4,
              isValid: true
            },
            note: {
              value: responseData.flight.note,
              isValid: true
            }

          },

          true
        );
      } catch (err) {

      }
    };
    fetchFlight();

  }, [sendRequest, flightId, setFormData]);

  const value_start = [formState.inputs.departureTime1.value.split(':'), formState.inputs.departureTime2.value.split(':'), formState.inputs.departureTime3.value.split(':'), formState.inputs.departureTime4.value.split(':')];
  let value_end = [formState.inputs.arrivalTime1.value.split(':'), formState.inputs.arrivalTime2.value.split(':'), formState.inputs.arrivalTime3.value.split(':'), formState.inputs.arrivalTime4.value.split(':')];
  let hoursEnd = [];
  let hoursStart = [];
  let msp = [];

  for (let i = 0; i < 4; i++) {
    if (value_end[i][0] < value_start[i][0]) {
      hoursEnd[i] = (value_end[i][0] - value_start[i][0] + Number(24)) * 60;
      hoursStart[i] = value_end[i][1] - value_start[i][1];
      msp[i] = ((hoursEnd[i] + hoursStart[i]) / 60).toFixed(1);
    } else {
      hoursEnd[i] = (value_end[i][0] - value_start[i][0]) * 60;
      hoursStart[i] = value_end[i][1] - value_start[i][1];
      msp[i] = ((hoursEnd[i] + hoursStart[i]) / 60).toFixed(1);
    }
  }



  const flightUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/flights/${flightId}`, 'PATCH',
        JSON.stringify({
          note: formState.inputs.note.value,
          hendlerOrigin: formState.inputs.hendlerOrigin.value,
          hendlerOrigin1: formState.inputs.hendlerOrigin1.value,
          hendlerOrigin3: formState.inputs.hendlerOrigin3.value,
          hendlerOrigin2: formState.inputs.hendlerOrigin2.value,
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
          handling: ops[0],
          slot: ops[1],
          doz: ops[2],
          ovf: ops[3],
          vip: ops[4],


          airportsData: airportsData
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token

        }
      );
      history.push('/' + auth.userId + '/flights');
    } catch (err) {

    }


  };




  useEffect(() => {
    const fetchAirports = async () => {

      try {
        const responseData = await sendRequest('http://localhost:5000/api/flights/airports/all', 'GET', null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token

          });
        setLoadedAirports(responseData.airports);
      } catch (err) {

      }
    };
    fetchAirports();

  }, [sendRequest, auth.token]);

  let currentOriginApt;
  let currentDestinationApt;

  if (loadedAirports) {
    // eslint-disable-next-line 
    currentOriginApt = loadedAirports.filter(airport => {
      if (airport.icao === formState.inputs.originIcao1.value) {
        return airport;
      }
    });
  }

  if (loadedAirports) {
    // eslint-disable-next-line 
    currentDestinationApt = loadedAirports.filter(airport => {
      if (airport.icao === formState.inputs.destinationIcao1.value) {
        return airport;
      }
    });
  }


  let currentOriginApt1;
  let currentDestinationApt1;

  if (loadedAirports) {
    // eslint-disable-next-line 
    currentOriginApt1 = loadedAirports.filter(airport => {
      if (airport.icao === formState.inputs.originIcao2.value) {
        return airport;
      }
    });
  }


  if (loadedAirports) {
    // eslint-disable-next-line 
    currentDestinationApt1 = loadedAirports.filter(airport => {
      if (airport.icao === formState.inputs.destinationIcao2.value) {
        return airport;
      }
    });
  }


  let currentOriginApt2;
  let currentDestinationApt2;

  if (loadedAirports) {
    // eslint-disable-next-line 
    currentOriginApt2 = loadedAirports.filter(airport => {
      if (airport.icao === formState.inputs.originIcao3.value) {
        return airport;
      }
    });
  }

  if (loadedAirports) {
    // eslint-disable-next-line 
    currentDestinationApt2 = loadedAirports.filter(airport => {
      if (airport.icao === formState.inputs.destinationIcao3.value) {
        return airport;
      }
    });
  }

  let currentOriginApt3;
  let currentDestinationApt3;


  if (loadedAirports) {
    // eslint-disable-next-line 
    currentOriginApt3 = loadedAirports.filter(airport => {
      if (airport.icao === formState.inputs.originIcao4.value) {
        return airport;
      }
    });
  }
  if (loadedAirports) {
    // eslint-disable-next-line 
    currentDestinationApt3 = loadedAirports.filter(airport => {
      if (airport.icao === formState.inputs.destinationIcao4.value) {
        return airport;
      }
    });
  };

  let airportsData = [];
  if (currentOriginApt !== undefined && currentOriginApt1 !== undefined && currentOriginApt2 !== undefined && currentOriginApt3 !== undefined &&
    currentDestinationApt !== undefined && currentDestinationApt1 !== undefined && currentDestinationApt2 !== undefined && currentDestinationApt3 !== undefined) {
    airportsData = [currentOriginApt[0], currentDestinationApt[0], currentOriginApt1[0], currentDestinationApt1[0], currentOriginApt2[0],
    currentDestinationApt2[0], currentOriginApt3[0], currentDestinationApt3[0]];
  }

  for (let i = 0; i < airportsData.length; i++) {
    if (typeof (airportsData[i]) === "undefined") {
      airportsData[i] = {};
    }
  }

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedFlight && !error) {
    return (
      <div>
        <Card>
          <h2>Could not find flight</h2>
        </Card>

      </div>
    );
  }


  const handleInputChange = (e, index) => {
    const { id, value } = e.target;
    const list = [...inputList];
    list[index][id] = value;
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (index) => {
    const list = [...inputList];
    list[index + 1] = ["Enter", "", "", "", "", "", ""];
    setInputList(list);
  };


  const handleAddFirstLeg = () => {
    const list = [...inputList];
    list[3] = inputList[2];
    list[2] = inputList[1];
    list[1] = inputList[0];
    list[0] = [list[1][0], "", "", "", "", "", ""];
    setInputList(list);


    formState.inputs.date4.value = formState.inputs.date3.value;
    formState.inputs.departureTime4.value = formState.inputs.departureTime3.value;
    formState.inputs.originIcao4.value = formState.inputs.originIcao3.value;
    formState.inputs.destinationIcao4.value = formState.inputs.destinationIcao3.value;
    formState.inputs.arrivalTime4.value = formState.inputs.arrivalTime3.value;
    formState.inputs.paxnbr4.value = formState.inputs.paxnbr3.value;
    formState.inputs.flightType4.value = formState.inputs.flightType3.value;
    formState.inputs.hendlerDestination4.value = formState.inputs.hendlerDestination3.value;


    formState.inputs.date3.value = formState.inputs.date2.value;
    formState.inputs.departureTime3.value = formState.inputs.departureTime2.value;
    formState.inputs.originIcao3.value = formState.inputs.originIcao2.value;
    formState.inputs.destinationIcao3.value = formState.inputs.destinationIcao2.value;
    formState.inputs.arrivalTime3.value = formState.inputs.arrivalTime2.value;
    formState.inputs.paxnbr3.value = formState.inputs.paxnbr2.value;
    formState.inputs.flightType3.value = formState.inputs.flightType2.value;
    formState.inputs.hendlerDestination3.value = formState.inputs.hendlerDestination2.value;


    formState.inputs.date2.value = formState.inputs.date1.value;
    formState.inputs.departureTime2.value = formState.inputs.departureTime1.value;
    formState.inputs.originIcao2.value = formState.inputs.originIcao1.value;
    formState.inputs.destinationIcao2.value = formState.inputs.destinationIcao1.value;
    formState.inputs.arrivalTime2.value = formState.inputs.arrivalTime1.value;
    formState.inputs.paxnbr2.value = formState.inputs.paxnbr1.value;
    formState.inputs.flightType2.value = formState.inputs.flightType1.value;
    formState.inputs.hendlerDestination2.value = formState.inputs.hendlerDestination1.value;
    formState.inputs.hendlerOrigin1.value = formState.inputs.hendlerOrigin.value;



    formState.inputs.departureTime1.value = '';
    formState.inputs.originIcao1.value = '';
    formState.inputs.destinationIcao1.value = '';
    formState.inputs.arrivalTime1.value = '';
    formState.inputs.paxnbr1.value = '';
    formState.inputs.flightType1.value = '';
    formState.inputs.hendlerDestination1.value = formState.inputs.hendlerOrigin.value;
    formState.inputs.hendlerOrigin.value = '';


    let ops1 = [...ops];
    ops1[0].unshift('');
    ops1[0].unshift('');
    ops1[1].unshift('');
    ops1[1].unshift('');
    ops1[2].unshift('');
    ops1[2].unshift('');
    ops1[3].unshift('');
    ops1[3].unshift('');
    ops1[4].unshift('');
    ops1[4].unshift('');
    ops1[0].pop();
    ops1[0].pop();
    ops1[1].pop();
    ops1[1].pop();
    ops1[2].pop();
    ops1[2].pop();
    ops1[3].pop();
    ops1[3].pop();
    ops1[4].pop();
    ops1[4].pop();

  };


  // handle click event of the Remove button

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    /*  list[index]=["","","","","","","","select"];   */
    list[index].push('select');

    /* list.splice(index, 1);  */

    /* const list2=[...list,["","","","","","",""]];  */
    setInputList(list);
    if (index === 0) {

      formState.inputs.date1.value = formState.inputs.date2.value;
      formState.inputs.departureTime1.value = formState.inputs.departureTime2.value;
      formState.inputs.originIcao1.value = formState.inputs.originIcao2.value;
      formState.inputs.destinationIcao1.value = formState.inputs.destinationIcao2.value;
      formState.inputs.arrivalTime1.value = formState.inputs.arrivalTime2.value;
      formState.inputs.paxnbr1.value = formState.inputs.paxnbr2.value;
      formState.inputs.flightType1.value = formState.inputs.flightType2.value;
      formState.inputs.hendlerOrigin.value = formState.inputs.hendlerDestination1.value;
      formState.inputs.hendlerDestination1.value = formState.inputs.hendlerDestination2.value;


      let ops4 = ops.map(el => {
        return el.splice(0, 2);
      });

      setOps(ops4);


      formState.inputs.date2.value = formState.inputs.date3.value;
      formState.inputs.departureTime2.value = formState.inputs.departureTime3.value;
      formState.inputs.originIcao2.value = formState.inputs.originIcao3.value;
      formState.inputs.destinationIcao2.value = formState.inputs.destinationIcao3.value;
      formState.inputs.arrivalTime2.value = formState.inputs.arrivalTime3.value;
      formState.inputs.paxnbr2.value = formState.inputs.paxnbr3.value;
      formState.inputs.flightType2.value = formState.inputs.flightType3.value;
      formState.inputs.hendlerDestination2.value = formState.inputs.hendlerDestination3.value;

      let ops3 = ops.map(el => {
        return el.splice(2, 2);
      });

      setOps(ops3);

      formState.inputs.date3.value = formState.inputs.date4.value;
      formState.inputs.departureTime3.value = formState.inputs.departureTime4.value;
      formState.inputs.originIcao3.value = formState.inputs.originIcao4.value;
      formState.inputs.destinationIcao3.value = formState.inputs.destinationIcao4.value;
      formState.inputs.arrivalTime3.value = formState.inputs.arrivalTime4.value;
      formState.inputs.paxnbr3.value = formState.inputs.paxnbr4.value;
      formState.inputs.flightType3.value = formState.inputs.flightType4.value;
      formState.inputs.hendlerDestination3.value = formState.inputs.hendlerDestination4.value;

      let ops1 = ops.map(el => {
        return el.splice(4, 2);
      });

      setOps(ops1);

      formState.inputs.date4.value = '';
      formState.inputs.departureTime4.value = '';
      formState.inputs.originIcao4.value = '';
      formState.inputs.destinationIcao4.value = '';
      formState.inputs.arrivalTime4.value = '';
      formState.inputs.paxnbr4.value = '';
      formState.inputs.flightType4.value = '';
      formState.inputs.hendlerDestination4.value = '';

      let ops2 = ops.map(el => {
        return el.slice(0, 6);
      })
      setOps(ops2);


    } else if (index === 1) {


      formState.inputs.date2.value = formState.inputs.date3.value;
      formState.inputs.departureTime2.value = formState.inputs.departureTime3.value;
      formState.inputs.originIcao2.value = formState.inputs.originIcao3.value;
      formState.inputs.destinationIcao2.value = formState.inputs.destinationIcao3.value;
      formState.inputs.arrivalTime2.value = formState.inputs.arrivalTime3.value;
      formState.inputs.paxnbr2.value = formState.inputs.paxnbr3.value;
      formState.inputs.flightType2.value = formState.inputs.flightType3.value;
      formState.inputs.hendlerDestination2.value = formState.inputs.hendlerDestination3.value;

      let ops3 = ops.map(el => {
        return el.splice(2, 2);
      });

      setOps(ops3);


      formState.inputs.date3.value = formState.inputs.date4.value;
      formState.inputs.departureTime3.value = formState.inputs.departureTime4.value;
      formState.inputs.originIcao3.value = formState.inputs.originIcao4.value;
      formState.inputs.destinationIcao3.value = formState.inputs.destinationIcao4.value;
      formState.inputs.arrivalTime3.value = formState.inputs.arrivalTime4.value;
      formState.inputs.paxnbr3.value = formState.inputs.paxnbr4.value;
      formState.inputs.flightType3.value = formState.inputs.flightType4.value;
      formState.inputs.hendlerDestination3.value = formState.inputs.hendlerDestination4.value;

      let ops1 = ops.map(el => {
        return el.splice(4, 2);
      });

      setOps(ops1);


      formState.inputs.date4.value = '';
      formState.inputs.departureTime4.value = '';
      formState.inputs.originIcao4.value = '';
      formState.inputs.destinationIcao4.value = '';
      formState.inputs.arrivalTime4.value = '';
      formState.inputs.paxnbr4.value = '';
      formState.inputs.flightType4.value = '';
      formState.inputs.hendlerDestination4.value = "";

      let ops2 = ops.map(el => {
        return el.slice(0, 6);
      })
      setOps(ops2);


    } else if (index === 2) {

      formState.inputs.date3.value = formState.inputs.date4.value;
      formState.inputs.departureTime3.value = formState.inputs.departureTime4.value;
      formState.inputs.originIcao3.value = formState.inputs.originIcao4.value;
      formState.inputs.destinationIcao3.value = formState.inputs.destinationIcao4.value;
      formState.inputs.arrivalTime3.value = formState.inputs.arrivalTime4.value;
      formState.inputs.paxnbr3.value = formState.inputs.paxnbr4.value;
      formState.inputs.flightType3.value = formState.inputs.flightType4.value;
      formState.inputs.hendlerDestination3.value = formState.inputs.hendlerDestination4.value;


      let ops1 = ops.map(el => {
        return el.splice(4, 2);
      });

      setOps(ops1);

      formState.inputs.date4.value = '';
      formState.inputs.departureTime4.value = '';
      formState.inputs.originIcao4.value = '';
      formState.inputs.destinationIcao4.value = '';
      formState.inputs.arrivalTime4.value = '';
      formState.inputs.paxnbr4.value = '';
      formState.inputs.flightType4.value = '';
      formState.inputs.hendlerDestination4.value = "";

      let ops2 = ops.map(el => {
        return el.slice(0, 6);
      })
      setOps(ops2);


    } else if (index === 3) {

      formState.inputs.date4.value = "";
      formState.inputs.departureTime4.value = "";
      formState.inputs.originIcao4.value = "";
      formState.inputs.destinationIcao4.value = "";
      formState.inputs.arrivalTime4.value = "";
      formState.inputs.paxnbr4.value = "";
      formState.inputs.flightType4.value = "";
      formState.inputs.hendlerDestination4.value = "";


      let ops2 = ops.map(el => {
        return el.slice(0, 6);
      })
      setOps(ops2);

    }




  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedFlight &&
        <form className='place-form' onSubmit={flightUpdateSubmitHandler} >
          <div className="flight-header">
            <Input
              id='registration'
              element='select'
              label='Reg'
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              initialValue={loadedFlight.registration}
              initialValid={true}
            />
          </div>
          <div className="flight-info1">
            <label>Flight Date</label>
            <label>Departure time</label>
            <label>Origin Airport</label>
            <label>Arrival Airport</label>
            <label>Arrival Time</label>
            <label>Pax nbr</label>
            <label>Flight type</label>
          </div>
          {inputList.map((x, i) => {
            return (
              <div key={i} id={i} className={x[7] === 'select' ? "select" : "selectNot"} >
                {x[0] !== '' &&
                  <div id={`div${i + 1}`} className="flight-info" key={i + 25}>
                    <Input
                      id={`date${i + 1}`}
                      type="date"
                      data-date-format="DD MMMM YYYY"
                      element='input'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText='Please enter a valid date.'
                      onInput={inputHandler}
                      onChange={e => handleInputChange(e, i)}
                      initialValue={x[0]}
                      value={x[0]}
                      initialValid={true}
                    />
                    <Input
                      id={`departureTime${i + 1}`}
                      element='input'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter valid time"
                      onInput={inputHandler}
                      onChange={e => handleInputChange(e, i)}
                      initialValue={x[1]}
                      value={x[1]}
                      initialValid={true}
                    />
                    <Input
                      id={`originIcao${i + 1}`}
                      element='input'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter valid ICAO code"
                      onInput={inputHandler}
                      onChange={e => handleInputChange(e, i)}
                      initialValue={x[2]}
                      value={x[2]}
                      initialValid={true}
                    />
                    <Input
                      id={`destinationIcao${i + 1}`}
                      element='input'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter valid ICAO code"
                      onInput={inputHandler}
                      onChange={e => handleInputChange(e, i)}
                      initialValue={x[3]}
                      value={x[3]}
                      initialValid={true}
                    />
                    <Input
                      id={`arrivalTime${i + 1}`}
                      element='input'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter valid time"
                      onInput={inputHandler}
                      onChange={e => handleInputChange(e, i)}
                      initialValue={x[4]}
                      value={x[4]}
                      initialValid={true}
                    />
                    <Input
                      id={`paxnbr${i + 1}`}
                      element='select'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter valid paxnbr"
                      onInput={inputHandler}
                      onChange={e => handleInputChange(e, i)}
                      initialValue={x[5]}
                      value={x[5]}
                      initialValid={true}

                    />
                    <Input
                      id={`flightType${i + 1}`}
                      element='select'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter valid flightType"
                      onInput={inputHandler}
                      onChange={e => handleInputChange(e, i)}
                      initialValue={x[6]}
                      value={x[6]}
                      initialValid={true}
                    />
                    <div id={`button${i}`} className="btn-leg" key={i + 3}>
                      {i === 0 && <Button2 id="add-first-leg" onClick={(e) => handleAddFirstLeg()}>1st Leg</Button2>}
                      {inputList.length !== 1 && <Button2 onClick={(e) => handleRemoveClick(i)}  >-</Button2>}
                      {/* { inputList.length - 1 === i &&   */} <Button2 onClick={(e) => handleAddClick(i)}>+</Button2>{/* } */}
                    </div>
                  </div>
                }
              </div>
            )
          }
          )}
          <label>Note</label>
          <Input
            type="form-control2"
            element='textarea'
            id='note'
            name='note'
            rows={2}
            onInput={inputHandler}
            initialValue={loadedFlight.note}
            validators={[VALIDATOR_REQUIRE()]}
            initialValid={true}
          />
          <div className="handling-info">
            <div className="handling-origin" >
              {loadedAirports && currentOriginApt.map(airport =>
                <div key={airport._id}>
                  <p>{airport.icao}:</p>
                  <Input
                    name='hendlerOrigin'
                    element='select'
                    value={values.airport}
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
                    initialValue={formState.inputs.hendlerOrigin.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValid={true}
                  />
                </div>
              )}
            </div>
            <div className="handling-destination" >
              {loadedAirports && currentDestinationApt.map(airport =>
                <div key={airport._id}>
                  <p>{airport.icao}:</p>
                  <Input
                    name='hendlerDestination1'
                    element='select'
                    value={values.airport}
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
                    initialValue={formState.inputs.hendlerDestination1.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValid={true}
                  />
                </div>
              )}
            </div>
            <div className="handling-destination" >
              {loadedAirports && formState.inputs.destinationIcao1.value !== formState.inputs.originIcao2.value && currentOriginApt1.map(airport =>
                <div key={airport._id}>
                  <p>{airport.icao}:</p>
                  <Input
                    name='hendlerOrigin1'
                    element='select'
                    value={values.airport}
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
                    initialValue={formState.inputs.hendlerOrigin1.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValid={true}
                  />
                </div>

              )}

            </div>
            <div className="handling-origin" >
              {loadedAirports && currentDestinationApt1.map(airport =>

                <div key={airport._id}>
                  <p>{airport.icao}:</p>
                  <Input
                    name='hendlerDestination2'
                    element='select'
                    value={values.airport}
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
                    initialValue={formState.inputs.hendlerDestination2.value}
                    initialValid={true}
                  />
                </div>
              )}
            </div>

            <div className="handling-destination" >
              {loadedAirports && formState.inputs.destinationIcao2.value !== formState.inputs.originIcao3.value && currentOriginApt2.map(airport =>
                <div key={airport._id}>
                  <p>{airport.icao}:</p>
                  <Input
                    name='hendlerOrigin2'
                    element='select'
                    value={values.airport}
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
                    initialValue={formState.inputs.hendlerOrigin2.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValid={true}
                  />
                </div>
              )}
            </div>
            <div className="handling-origin" >
              {loadedAirports && currentDestinationApt2.map(airport =>

                <div key={airport._id}>
                  <p>{airport.icao}:</p>
                  <Input
                    name='hendlerDestination3'
                    element='select'
                    value={values.airport}
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
                    initialValue={formState.inputs.hendlerDestination3.value}
                    initialValid={true}
                  />
                </div>
              )}
            </div>

            <div className="handling-destination" >
              {loadedAirports && formState.inputs.destinationIcao3.value !== formState.inputs.originIcao4.value && currentOriginApt3.map(airport =>
                <div key={airport._id}>
                  <p>{airport.icao}:</p>
                  <Input
                    name='hendlerOrigin3'
                    element='select'
                    value={values.airport}
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
                    initialValue={formState.inputs.hendlerOrigin3.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValid={true}
                  />
                </div>
              )}
            </div>
            <div className="handling-origin" >
              {loadedAirports && currentDestinationApt3.map(airport =>

                <div key={airport._id}>
                  <p>{airport.icao}:</p>
                  <Input
                    name='hendlerDestination4'
                    element='select'
                    value={values.airport}
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
                    initialValue={formState.inputs.hendlerDestination4.value}
                    initialValid={true}
                  />
                </div>
              )}
            </div>

          </div>
          <div className='btn-holder-flt'>
            <Button type='submit' disabled={!formState.isValid}>
              UPDATE FLIGHT
            </Button>
          </div>
        </form>
      }
    </React.Fragment>
  );

};

export default UpdateFlight;