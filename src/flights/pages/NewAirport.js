import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook'; // custom HOOK!!!!
import { useHttpClient } from '../../shared/hooks/http-hook';

import './NewFlight.css';

const NewAirport = () => {
  const auth = useContext(AuthContext);
  const [values, setValues] = useState({});
  const [checkedVip, setCheckedVip] = useState(false);
  const [checkedDoz, setCheckedDoz] = useState(false);
  const [checkedSlot, setCheckedSlot] = useState(false);
  const [count, setCount] = useState(0);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      icao: {
        value: '',
        isValid: false
      },
      iata: {
        value: '',
        isValid: true
      },
      country: {
        value: '',
        isValid: false
      },
      city: {
        value: '',
        isValid: false
      },
      utc: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const handleOnChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  let result1 = [values.handler1name, values.handler1tel, values.handler1email];
  let result2 = [values.handler2name, values.handler2tel, values.handler2email];
  let result3 = [values.handler3name, values.handler3tel, values.handler3email];
  let result4 = [values.handler4name, values.handler4tel, values.handler4email];
  let result5 = [values.handler5name, values.handler5tel, values.handler5email];
  let hnd1details = (result1.map(v => v === undefined ? '' : v)).join();
  let hnd2details = (result2.map(v => v === undefined ? '' : v)).join();
  let hnd3details = (result3.map(v => v === undefined ? '' : v)).join();
  let hnd4details = (result4.map(v => v === undefined ? '' : v)).join();
  let hnd5details = (result5.map(v => v === undefined ? '' : v)).join();


  const placeSubmitHandler = async event => {
    event.preventDefault();
    let noteEmpty;
    if (values.note === undefined) {
      noteEmpty = ' ';
    } else {
      noteEmpty = values.note;
    }

    try {
      await sendRequest(`http://localhost:5000/api/flights/airports`,
        'POST',
        JSON.stringify({
          icao: formState.inputs.icao.value,
          iata: formState.inputs.iata.value,
          country: formState.inputs.country.value,
          city: formState.inputs.city.value,
          utc: formState.inputs.utc.value,
          hendler1: hnd1details,
          hendler2: hnd2details,
          hendler3: hnd3details,
          hendler4: hnd4details,
          hendler5: hnd5details,
          vip: vipChecked,
          doz: dozChecked,
          slot: slotChecked,
          meetingpoint: values.meetingpoint,
          note: noteEmpty
          /* creator:auth.userId */
        }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      /*  history.push('/airport/new');  */
      window.location.reload(false);
    } catch (err) {

    }
  };


  let vipChecked = '';
  let dozChecked = '';
  let slotChecked = '';
  if (checkedVip === true) { vipChecked = 'yes'; }
  if (checkedDoz === true) { dozChecked = 'yes'; }
  if (checkedSlot === true) { slotChecked = 'yes'; }

  return (
    <React.Fragment >
      <div className="form-holder">
        <ErrorModal error={error} onClear={clearError} />
        <form className="place-form1 " style={{ marginBottom: "65px" }} onSubmit={placeSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <h5>ADD AIRPORT</h5>
          <div className="form-control5">
            <Input
              id='icao'
              type="icao"
              element='input'
              label='ICAO Code'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid ICAO code.'
              onInput={inputHandler}
            />
            <Input
              id='iata'
              label="IATA Code"
              element='input'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter valid IATA code"
              onInput={inputHandler}
            />
            <Input
              id='country'
              label="Country"
              element='input'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter valid Country"
              onInput={inputHandler}
            />
            <Input
              id='city'
              label="City"
              element='input'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter valid City"
              onInput={inputHandler}
            />
            <Input
              id='utc'
              label="UTC"
              element='input'
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter valid UTC"
              onInput={inputHandler}
            />
            <div>
              <label>Meeting Point</label>
              <input
                id='meetingpoint'
                name='meetingpoint'
                rows={2}
                value={values.meetingpoint}
                onChange={handleOnChange}
              />
            </div>
            <div className="checkbox-holder">
              <div className="checkbox-holder-1">
                <label>Dozvola</label>
                <input
                  type="checkbox"
                  checked={checkedDoz}
                  id='doz'
                  name='doz'
                  onChange={e => setCheckedDoz(e.target.checked)}
                />
              </ div>
              <div className="checkbox-holder-1">
                <label>Slot</label>
                <input
                  type="checkbox"
                  checked={checkedSlot}
                  id='slot'
                  name='slot'
                  onChange={e => setCheckedSlot(e.target.checked)}
                />
              </div>
              <div className="checkbox-holder-1">
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
          </div>
          <div>
            <h5>ADD HANDLER</h5>
            {count === 0 && <Button onClick={()=>setCount(1)}>Add hnd</Button>}
          </div>
          {count === 1 &&
            <div>
              <label>Handler 1</label>
              <div className="form-control5">
                <label>Handler Name</label>
                <input
                  id='handler1name'
                  name='handler1name'
                  rows={2}
                  value={values.hendler1name}
                  onChange={handleOnChange}
                />
                <label>Contact Telephone</label>
                <input
                  id='handler1tel'
                  name='handler1tel'
                  rows={2}
                  value={values.hendler1tel}
                  onChange={handleOnChange}
                />
                <label>E-mail</label>
                <input
                  id='handler1email'
                  name='handler1email'
                  rows={2}
                  value={values.hendler1email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          }
          <label>Handler 2</label>
          <div className="form-control5">
            <label>Handler Name</label>
            <input
              id='handler2name'
              name='handler2name'
              rows={2}
              value={values.hendler2name}
              onChange={handleOnChange}
            />
            <label>Contact Telephone</label>
            <input
              id='handler2tel'
              name='handler2tel'
              rows={2}
              value={values.hendler2tel}
              onChange={handleOnChange}
            />
            <label>E-mail</label>
            <input
              id='handler2email'
              name='handler2email'
              rows={2}
              value={values.hendler2email}
              onChange={handleOnChange}
            />
          </div>
          <label>Handler 3</label>
          <div className="form-control5">
            <label>Handler Name</label>
            <input
              id='handler3name'
              name='handler3name'
              rows={2}
              value={values.hendler3name}
              onChange={handleOnChange}
            />
            <label>Contact Telephone</label>
            <input
              id='handler3tel'
              name='handler3tel'
              rows={2}
              value={values.hendler3tel}
              onChange={handleOnChange}
            />
            <label>E-mail</label>
            <input
              id='handler3email'
              name='handler3email'
              rows={2}
              value={values.hendler3email}
              onChange={handleOnChange}
            />
          </div>
          <label>Handler 4</label>
          <div className="form-control5">
            <label>Handler Name</label>
            <input
              id='handler4name'
              name='handler4name'
              rows={2}
              value={values.hendler4name}
              onChange={handleOnChange}
            />
            <label>Contact Telephone</label>
            <input
              id='handler4tel'
              name='handler4tel'
              rows={2}
              value={values.hendler4tel}
              onChange={handleOnChange}
            />
            <label>E-mail</label>
            <input
              id='handler4email'
              name='handler4email'
              rows={2}
              value={values.hendler4email}
              onChange={handleOnChange}
            />
          </div>
          <label>Handler 5</label>
          <div className="form-control5">
            <label>Handler Name</label>
            <input
              id='handler5name'
              name='handler5name'
              rows={2}
              value={values.hendler5name}
              onChange={handleOnChange}
            />
            <label>Contact Telephone</label>
            <input
              id='handler5tel'
              name='handler5tel'
              rows={2}
              value={values.hendler5tel}
              onChange={handleOnChange}
            />
            <label>E-mail</label>
            <input
              id='handler5email'
              name='handler5email'
              rows={2}
              value={values.hendler5email}
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
          <Button type="submit" disabled={!formState.isValid} >ADD AIRPORT</Button>
        </form>
        {/*     <div className="place-form2">
        <label>EDIT Airport</label>
        <p>Search for Airport</p>
        <UserAirports />
      </div> */}
      </div>
    </React.Fragment>
  );
};

export default NewAirport;
