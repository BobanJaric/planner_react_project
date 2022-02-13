import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';

import '../components/Crew.css';



const UpdateCrew = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [values, setValues] = useState();
     const crewId = useParams().crewId;


    const history = useHistory();

    useEffect(() => {
        const fetchCrew = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/crew/crewby/${crewId}`, 'GET', null,
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token
                    });
                setValues(responseData.crew);
    
            } catch (err) {

            }
        };
        fetchCrew();

    }, [sendRequest, crewId, auth.token]);

    let rankNbr = '1';
    if (values !== undefined) {
        if (values.rank === 'F/O') {
            rankNbr = '2';
        } else if (values.rank === 'ACM') {
            rankNbr = '3';
        }

    }

    const crewUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/api/crew/${crewId}`, 'PATCH',
                JSON.stringify({
                    rank: values.rank,
                    rankNbr: rankNbr,
                    fullname: values.fullname,
                    dob: values.dob,
                    nationality: values.nationality,
                    passport: values.passport,
                    passportValidity: values.passportValidity,
                    opc: values.opc,
                    lpc: values.lpc,
                    totalHours: values.totalHours,
                    workingFrom: values.workingFrom,
                    licenceNbr: values.licenceNbr,
 
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token

                }
            );
            history.push('/5fe46d14371ffc10f04ffec5/crew');
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
                    <h2>Could not find crew</h2>
                </Card>

            </div>
        );
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="aircarft-form-1" onSubmit={crewUpdateSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <label><strong>EDIT CREW</strong></label>
                <div className="form-control-aircraft">
                    <div className="form-info-aircraft">
                        <label>Rank</label>
                        <select
                            id='rank'
                            name='rank'
                            onChange={handleOnChange}
                            value={values.rank}
                        >
                            <option value="">--select CREW--</option>
                            <option value="CAPT">CAPT</option>
                            <option value="F/O">F/O</option>
                            <option value="ACM">ACM</option>
                        </select>
                    </div>
                    <div className="form-info-aircraft">
                        <label>Name and Surname</label>
                        <input
                            id='fullname'
                            name='fullname'
                            value={values.fullname}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>DOB</label>
                        <input
                            id='dob'
                            name='dob'
                            value={values.dob}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Nationality</label>
                        <input
                            id='nationality'
                            name='nationality'
                            value={values.nationality}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Passport nbr</label>
                        <input
                            id='passport'
                            name='passport'
                            value={values.passport}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Passport Validity</label>
                        <input
                            id='passportValidity'
                            name='passportValidity'
                            value={values.passportValidity}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Licence Number</label>
                        <input
                            id='licenceNbr'
                            name='licenceNbr'
                            value={values.licenceNbr}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>OPC</label>
                        <input
                            id='opc'
                            name='opc'
                            value={values.opc}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>LPC</label>
                        <input
                            id='lpc'
                            name='lpc'
                            value={values.lpc}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Total Hours</label>
                        <input
                            id='totalHours'
                            name='totalHours'
                            value={values.totalHours}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-info-aircraft">
                        <label>Working From</label>
                        <input
                            id='workingFrom'
                            name='workingFrom'
                            value={values.workingFrom}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                <div className="form-info5">
                    <Button type="submit"  >EDIT CREW</Button>
                </div>
            </form>
        </React.Fragment>
    );

};

export default UpdateCrew;