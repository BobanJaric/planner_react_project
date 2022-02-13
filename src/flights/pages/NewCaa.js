import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './NewAircraft.css';
import '../components/BrokerList.css';

const NewCaa = () => {
    const auth = useContext(AuthContext);
    const [values, setValues] = useState({});
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const history = useHistory();

    const handleOnChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const caaSubmitHandler = async event => {
        event.preventDefault();


        try {
            await sendRequest(`http://localhost:5000/api/caa`,
                'POST',
                JSON.stringify({
                    country: values.country,
                    permit: values.permit,
                    contact: values.contact,
                    workingHours: values.workingHours,
                    leadingTime: values.leadingTime,
                    validity: values.validity,
                    note: values.note,
                    api: values.api,
                    covid: values.covid,

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
            <form className="aircarft-form-1" onSubmit={caaSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <label><strong>ADD CAA</strong></label>
                <div className="form-control-aircraft">
                    <div className="form-info-aircraft">
                        <label>Country</label>
                        <input
                            id='country'
                            name='country'
                            value={values.country}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Permit</label>
                        <input
                            id='permit'
                            name='permit'
                            value={values.permit}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Contact</label>
                        <input
                            id='contact'
                            name='contact'
                            value={values.contact}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Working Hours</label>
                        <input
                            id='workingHours'
                            name='workingHours'
                            value={values.workingHours}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Leading Time</label>
                        <input
                            id='leadingTime'
                            name='leadingTime'
                            value={values.leadingTime}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Validity</label>
                        <input
                            id='validity'
                            name='validity'
                            value={values.validity}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Note</label>
                        <input
                            id='note'
                            name='note'
                            value={values.note}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>API</label>
                        <input
                            id='api'
                            name='api'
                            value={values.api}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Covid resrictions</label>
                        <input
                            id='covid'
                            name='covid'
                            value={values.covid}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                <div className="form-info-aircraft">
                    <Button type="submit"  >ADD CAA</Button>
                </div>
            </form>
        </React.Fragment>
    );
};
export default NewCaa;
