import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Auth.css';


const Auth = () => {

  const auth = useContext(AuthContext);
  const storedDataEl = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );


/*   const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }
      }, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  }; */

  const history = useHistory();

  const authSubmitHandler = async event => {

    event.preventDefault();


    if (isLoginMode) {
      const { checked: storedData } = storedDataEl.current;
      if (storedData) {
        localStorage.setItem('email', formState.inputs.email.value);
        localStorage.setItem('emailValidity', formState.inputs.email.isValid);
        localStorage.setItem('password', formState.inputs.password.value);
        localStorage.setItem('passwordValidity', formState.inputs.password.isValid);
      } else {
        localStorage.removeItem('email', formState.inputs.email.value);
        localStorage.removeItem('emailValidity', formState.inputs.email.isValid);
        localStorage.removeItem('password', formState.inputs.password.value);
        localStorage.removeItem('passwordValidity', formState.inputs.password.isValid);
      }
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-type': 'application/json'
          }
        );

        auth.login(responseData.role,responseData.userId, responseData.token);
        history.push('/');
      } catch (err) {
        //ok empty
      }
    } else {
      try {

        const responseData = await sendRequest(`http://localhost:5000/api/users/signup`,
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-type': 'application/json'
          }
        );
        auth.login(responseData.user.id, responseData.token);
      } catch (err) {
      }
    }
  };


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="auth card">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login is mandatory</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id='name'
              element='input'
              label='Your name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name.'
              onInput={inputHandler}
            />
          )}
          <Input
            id='email'
            type="email"
            label="Email"
            element="input"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid email"
            onInput={inputHandler}
            initialValue={localStorage.getItem('email')}
            initialValid={localStorage.getItem('emailValidity')}
          />
          <Input
            id='password'
            type='password'
            element='input'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password.'
            onInput={inputHandler}
            initialValue={localStorage.getItem('password')}
            initialValid={localStorage.getItem('passwordValidity')}
          />
          <Button type="submit" disabled={!formState.isValid} id="btn-login" >
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
          <div className='check-box-holder'>
            <input ref={storedDataEl} type="checkbox" id="storedData" name="storedData" defaultChecked />
            <label htmlFor='storedData'>Remember me</label>
          </div>
        </form>
      </Card>
    </React.Fragment>);

};

export default Auth;
