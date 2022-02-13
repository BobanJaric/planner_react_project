import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './NewAircraft.css';
import '../components/BrokerList.css';

const NewCrew = () => {
    const auth = useContext(AuthContext);
    const [values, setValues] = useState({
        rank: "",
        fullname: "",
        dob: "",
        nationality: "",
        passport: "",
        passportValidity: "",
        opc: "",
        lpc: "",
        totalHours: "",
        workingFrom: "",
        licenceNbr:""
    });
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const history = useHistory();

    const handleOnChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

        let rankNbr='1';
        if(values.rank==='F/O'){
            rankNbr='2';
        }else if(values.rank==='ACM'){
            rankNbr='3';
        }

    const crewSubmitHandler = async event => {
        event.preventDefault();

        try {
            await sendRequest(`http://localhost:5000/api/crew`,
                'POST',
                JSON.stringify({
                    rank: values.rank,
                    fullname: values.fullname,
                    dob: values.dob,
                    nationality: values.nationality,
                    passport: values.passport,
                    passportValidity: values.passportValidity,
                    opc: values.opc,
                    lpc: values.lpc,
                    totalHours: values.totalHours,
                    workingFrom: values.workingFrom,
                    rankNbr: rankNbr,
                    licenceNbr:values.licenceNbr

                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            history.push(`http://localhost:3000/5fe46d14371ffc10f04ffec5/crew`);
        } catch (err) {

        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="aircarft-form-1" onSubmit={crewSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <label><strong>ADD CREW</strong></label>
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
                            <option   value="CAPT">CAPT</option>
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
                <div className="form-info-aircraft">
                    <Button type="submit"  >ADD CREW</Button>
                </div>
            </form>
        </React.Fragment>
    );
};
export default NewCrew;
