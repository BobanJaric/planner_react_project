import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import UserAircrafts from './UserAircrafts';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './NewAircraft.css';
import '../components/BrokerList.css';

const NewAircraft = () => {
    const auth = useContext(AuthContext);
    const [values, setValues] = useState({});
    const [showForm, setShowForm] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const history = useHistory();

    const handleOnChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const addAircraft = () => {
        setShowForm(true);
    }


    const noteSubmitHandler = async event => {
        event.preventDefault();

        try {
            await sendRequest(`http://localhost:5000/api/aircraft`,
                'POST',
                JSON.stringify({
                    aircraft: values.aircraft,
                    callsign: values.callsign,
                    type: values.type,
                    mtow: values.mtow,
                    totalTime: values.totalTime,
                    nextMaintenance: values.nextMaintenance,

                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            history.push('http://localhost:3000/5fe46d14371ffc10f04ffec5/flights');
        } catch (err) {

        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="aircarft-form">
                <label>Aircraft List </label>
                <UserAircrafts />
                <div style={{ "float": "right"}}>
                    <Button onClick={addAircraft}  >ADD AIRCRAFT</Button>
                </div>

            </div>
            { showForm && <form className="aircarft-form-1" onSubmit={noteSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <label><strong>ADD AIRCRAFT</strong></label>
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
                        <label>Total Time</label>
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
                </div>
                <div className="form-info-aircraft">
                    <Button type="submit"  >ADD Aircraft</Button>
                </div>
            </form>
            }
        </React.Fragment>
    );
};
export default NewAircraft;
