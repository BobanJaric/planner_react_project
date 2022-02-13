import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import UserBrokers from './UserBrokers';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './NewFlight.css';
import '../components/BrokerList.css';

const NewBroker = () => {
  const auth = useContext(AuthContext);
  const [values, setValues] = useState({
    brokerName: '',
    company: '',
    email: '',
    telephone: ''
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const handleOnChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  const noteSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(`http://localhost:5000/api/broker`,
        'POST',
        JSON.stringify({
          brokerName: values.brokerName,
          company: values.company,
          email: values.email,
          telephone: values.telephone

        }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      history.push('/');
    } catch (err) {

    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form1 " onSubmit={noteSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <label><strong>ADD BROKER</strong></label>
        <div className="form-control5">
          <div className="form-info5">
            <label>Broker Name</label>
            <input
              id='name'
              name='brokerName'
              value={values.brokerName}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-info5">
            <label>Broker company</label>
            <input
              id='company'
              name='company'
              value={values.company}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-info5">
            <label>E-mail</label>
            <input
              id='email'
              name='email'
              value={values.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-info5">
            <label>Telephone</label>
            <input
              id='telephone'
              name='telephone'
              value={values.telephone}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="form-info5">
          <Button type="submit"  >ADD BROKER</Button>
        </div>
      </form>
      <div className="place-form2 ">
        <label>Serch Broker</label>
        <UserBrokers />
      </div>
    </React.Fragment>
  );
};
export default NewBroker;
