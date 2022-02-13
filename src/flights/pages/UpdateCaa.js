import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';
import './NewAircraft.css';



const UpdateCaa = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [values, setValues] = useState({
        contact: "",
        country: "",
        covid: "",
        leadingTime: "",
        note: "",
        permit: "",
        validity: "",
        workingHours: "",
    });

    const caaId = useParams().caaId;


    const history = useHistory();

    useEffect(() => {
        const fetchCaa = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/caa/caaby/${caaId}`, 'GET', null,
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token
                    });

                setValues(responseData.caa);

            } catch (err) {

            }
        };
        fetchCaa();

    }, [sendRequest, caaId, auth.token]);


    const caaUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/api/caa/${caaId}`, 'PATCH',
                JSON.stringify({
                    contact: values.contact,
                    country: values.country,
                    covid: values.covid,
                    note: values.note,
                    leadingTime: values.leadingTime,
                    permit: values.permit,
                    validity: values.validity,
                    api: values.api,
                    workingHours: values.workingHours,
                    creator: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token

                }
            );
            history.push('/caa');
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
                    <h2>Could not find caa</h2>
                </Card>

            </div>
        );
    }




    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="caa-form " onSubmit={caaUpdateSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <label><strong>CAA</strong></label>
                <div className="form-control-caa">
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
                <div className="form-info5">
                    <Button type="submit"  >EDIT CAA</Button>
                </div>
            </form>
        </React.Fragment>
    );

};

export default UpdateCaa;