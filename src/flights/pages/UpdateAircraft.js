import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';
import './GenDec.css';



const UpdateAircraft = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [values, setValues] = useState({
        aircraft: "",
        callsign: "",
        type: "",
        mtow: "",
        nextMaintenance: "",
        totalTime: "",
        startMaintenance: "",
        endMaintenance: ""
    });


    const aircraftId = useParams().aircraftId;


    const history = useHistory();

    useEffect(() => {
        const fetchAircraft = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/aircraft/${aircraftId}`, 'GET', null,
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token
                    });
                setValues(responseData.aircraft);

            } catch (err) {

            }
        };
        fetchAircraft();

    }, [sendRequest, aircraftId, auth.token]);


    const aircraftUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/api/aircraft/${aircraftId}`, 'PATCH',
                JSON.stringify({
                    aircraft: values.aircraft,
                    callsign: values.callsign,
                    type: values.type,
                    mtow: values.mtow,
                    totalTime: values.totalTime,
                    nextMaintenance: values.nextMaintenance,
                    startMaintenance: values.startMaintenance,
                    endMaintenance: values.endMaintenance,
                    creator: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token

                }
            );
            history.push('/aircraft');
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
                    <h2>Could not find aircraft</h2>
                </Card>

            </div>
        );
    }




    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form1 " onSubmit={aircraftUpdateSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <label><strong>AIRCRAFT</strong></label>
                <div className="form-control-aircraft">
                    <div className="form-info-aircraft">
                        <label>Registration</label>
                        <input
                            id='aircraft'
                            name='aircraft'
                            value={values.aircraft}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Callsign</label>
                        <input
                            id='callsign'
                            name='callsign'
                            value={values.callsign}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Type</label>
                        <input
                            id='type'
                            name='type'
                            value={values.type}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>MTOW</label>
                        <input
                            id='mtow'
                            name='mtow'
                            value={values.mtow}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Total Time*</label>
                        <input
                            id='totalTime'
                            name='totalTime'
                            value={values.totalTime}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Next Maintenance Event</label>
                        <input
                            id='nextMaintenance'
                            name='nextMaintenance'
                            value={values.nextMaintenance}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Start Maintenance</label>
                        <input
                            type="date"
                            id='startMaintenance'
                            name='startMaintenance'
                            value={values.startMaintenance}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>End Maintenance </label>
                        <input
                            type="date"
                            id='endMaintenance'
                            name='endMaintenance'
                            value={values.endMaintenance}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                <div>
                    <p>*Total Time zakljucno sa 25tim u mesecu</p>
                </div>
                <div className="form-info5">
                    <Button type="submit"  >EDIT AIRCRAFT</Button>
                </div>
            </form>
        </React.Fragment>
    );

};

export default UpdateAircraft;