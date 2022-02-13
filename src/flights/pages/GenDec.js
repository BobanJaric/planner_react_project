import React, { useState, useContext } from 'react';

import axios from 'axios';
import { saveAs } from 'file-saver';

import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook'; // custom HOOK!!!!
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';


import Button2 from 'react-bootstrap/Button';

import Pax from './pax';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import './GenDec.css';

let date;


date = new Date();
// eslint-disable-next-line 
const y = date.getFullYear();

let month = String(date.getMonth() + 1);

if (month.length === 1) {
  month = "0" + month;
}
let day = String(date.getUTCDate());

if (day.length === 1) {
  day = "0" + day;
}
let h = String(date.getUTCHours());
if (h.length === 1) {
  h = "0" + h;
}
let m = String(date.getUTCMinutes());
if (m.length === 1) {
  m = "0" + m;
}
let s = String(date.getUTCSeconds());
if (s.length === 1) {
  s = "0" + s;
}


const App = ({ loadedCrew }) => {

  const auth = useContext(AuthContext);

  const [check, setCheck] = useState(true);
  const [add, setAdd] = useState(true);
  const [checkRusApi, setCheckRusApi] = useState(true);
  const [checkGar, setCheckGar] = useState(true);
  const [values, setValues] = useState({
    pax1name: '',
    pax2name: '',
    pax3name: '',
    pax4name: '',
    pax1dob: '',
    pax2dob: '',
    pax3dob: '',
    pax4dob: '',
    pax1nationality: '',
    pax2nationality: '',
    pax3nationality: '',
    pax4nationality: '',
    pax1passport: '',
    pax2passport: '',
    pax3passport: '',
    pax4passport: '',
    pax5name: '',
    pax6name: '',
    pax7name: '',
    pax8name: '',
    pax5dob: '',
    pax6dob: '',
    pax7dob: '',
    pax8dob: '',
    pax5nationality: '',
    pax6nationality: '',
    pax7nationality: '',
    pax8nationality: '',
    pax5passport: '',
    pax6passport: '',
    pax7passport: '',
    pax8passport: '',

  });
  const [error, setError] = useState();


  const [formState, inputHandler] = useForm(
    {
      startDate: {
        value: '',
        isValid: false
      },
      aircraft: {
        value: '',
        isValid: false
      },
      origin: {
        value: '',
        isValid: false
      },
      destination: {
        value: '',
        isValid: false
      },
      fullname1: {
        value: '',
        isValid: false
      },
      fullname2: {
        value: '',
        isValid: false
      },
      fullname3: {
        value: '',
        isValid: false
      }
    },
    false
  );


  const handlePaxChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  const createAndDownloadPdf = () => {

    axios.post(`http://localhost:5000/create-pdf`, { ...formState.inputs, values, creator: auth.userId }, {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth.token
    })
      .then(() => axios.get(`http://localhost:5000/fetch-pdf`, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `GenDec ${formState.inputs.origin.value}-${formState.inputs.destination.value}.pdf`);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
        }
        setError(error.response.data.message);
      })
  };


  const clearError = () => {
    setError(null);
  };
  let mainAdd = '';
  if (!add) {
    mainAdd = 'main-add';
  }


  const capt = loadedCrew.filter(el => el.rankNbr === '1');
  const fo = loadedCrew.filter(el => el.rankNbr === '2');
  const fa = loadedCrew.filter(el => el.rankNbr === '3');

  return (
    <div className={`main ${mainAdd}`} >
      <div className="App">
        <ErrorModal error={error} onClear={clearError} />
        <Input
          id='startDate'
          type="date"
          data-date-format="DD MMMM YYYY"
          element='input'
          label='Date'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Enter date.'
          onInput={inputHandler}
        />

        <Input
          id='aircraft'
          label='Registration'
          element='select'
          errorText="Enter Registration"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />

        <div className="Details">
          <Input
            id='origin'
            label='Origin'
            element='input'
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter Apt"
            onInput={inputHandler}
          />
          {(!checkRusApi || !checkGar) &&
            <Input
              id='depTime'
              label='Departure Time'
              element='input'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Enter time"
              onInput={inputHandler}
            />
          }
          <Input
            id='destination'
            label='Destination'
            element='input'
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Eneter Apt"
            onInput={inputHandler}
          />
          {(!checkRusApi || !checkGar) &&
            <Input
              id='arrTime'
              label='Arrival Time'
              element='input'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Enter time"
              onInput={inputHandler}
            />
          }
        </div>
        <div className="Details">
          <div>
            <Input
              id='fullname1'
              label='Captain'
              element='select'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter capt name"
              onInput={inputHandler}
              crewData={capt}
            />
          </div>
          {!check ?
            <div>
              <Input
                id='fullname2'
                label='Captain'
                name='Captain'
                element='select'
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter capt name"
                onInput={inputHandler}
                crewData={capt}
              />
            </div>
            :
            <div>
              <Input
                id='fullname2'
                label='First officer'
                element='select'
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter f/o name"
                onInput={inputHandler}
                crewData={fo}
              />
            </div>
          }
          <div>
            <Input
              id='fullname3'
              label='Acm'
              element='select'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter acm name"
              onInput={inputHandler}
              crewData={fa}
            />
          </div>
        </div>
        {!checkRusApi &&
          <div className="Details">
            <Input
              id='paxnbr1'
              label="Pax Nbr"
              element='select'
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
        }
        <Pax info="1" checkRusApi={checkRusApi} checkGar={checkGar} changed={handlePaxChange} />
        <Pax info="2" checkRusApi={checkRusApi} checkGar={checkGar} changed={handlePaxChange} />
        <Pax info="3" checkRusApi={checkRusApi} checkGar={checkGar} changed={handlePaxChange} />
        <Pax info="4" checkRusApi={checkRusApi} checkGar={checkGar} changed={handlePaxChange} />
        {
          !add ?
            <div>
              <Pax info="5" checkRusApi={checkRusApi} checkGar={checkGar} changed={handlePaxChange} />
              <Pax info="6" checkRusApi={checkRusApi} checkGar={checkGar} changed={handlePaxChange} />
              <Pax info="7" checkRusApi={checkRusApi} checkGar={checkGar} changed={handlePaxChange} />
              <Pax info="8" checkRusApi={checkRusApi} checkGar={checkGar} changed={handlePaxChange} />
            </div>
            : null
        }
        <Button2 onClick={(e) => setAdd(prevState => !prevState)}>Add pax</Button2>
        <Button type='submit' disabled={!formState.isValid} onClick={createAndDownloadPdf}  >Download GenDec</Button>
        <Button2 type="button" onClick={(e) => setCheck(prevState => !prevState)}>Two Captains</Button2>
      </div>
    </div>
  );

}

export default App;



