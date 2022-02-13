import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './Crew.css';

const CrewList = props => {

    const [options, setOptions] = useState(props.items);
    const [scheduler, setScheduler] = useState(true);
    options.sort((a, b) => a.rankNbr.localeCompare(b.rankNbr));

    const showCapt = (e) => {
        setScheduler(true);
        const newOption = [...props.items];
        if (e.target.name === 'ALL') {
            setOptions(newOption);
        } else {
            const onlyCapt = newOption.filter(option => {
                return option.rank === e.target.name;
            });
            setOptions(onlyCapt);
        }

    };

    return (
        <React.Fragment>

            <div className="crew-list">
                <div className="crew-form-2">
                    <button type="button" name="ALL" className="btn btn-primary" onClick={(e) => showCapt(e)}>All</button>
                    <button type="button" name="CAPT" className="btn btn-warning" onClick={(e) => showCapt(e)}>Capt</button>
                    <button type="button" name="F/O" className="btn btn-success" onClick={(e) => showCapt(e)} >F/O</button>
                    <button type="button" name="ACM" className="btn btn-info" onClick={(e) => showCapt(e)} >ACM</button>
                    <button type="button" name="SCH" className="btn btn-danger" onClick={(e) => setScheduler(false)} >SCHEDULE</button>
                </div>
                <div className="crew-form2">
                    <table className="table-aircraft">
                        <thead>
                            <tr>
                                <th scope="col" style={{ "maxWidth": "30px", "minWidth": "30px" }}></th>
                                <th scope="col" style={{ "maxWidth": "60px", "minWidth": "60px" }}>Rank</th>
                                <th scope="col" style={{ "maxWidth": "190px", "minWidth": "190px" }}>Full Name</th>
                                <th scope="col" style={{ "maxWidth": "90px", "minWidth": "90px" }}>DOB</th>
                                <th scope="col" style={{ "maxWidth": "60px", "minWidth": "60px" }}>Nat</th>
                                <th scope="col" style={{ "maxWidth": "120px", "minWidth": "120px" }}>Passport Nbr</th>
                                <th scope="col" style={{ "maxWidth": "160px", "minWidth": "160px" }}>Passport Validity</th>
                                <th scope="col" style={{ "maxWidth": "160px", "minWidth": "160px" }}>Crew Licence</th>
                                <th scope="col" style={{ "maxWidth": "60px", "minWidth": "60px" }}>OPC</th>
                                <th scope="col" style={{ "maxWidth": "60px", "minWidth": "60px" }}>LPC</th>
                                <th scope="col" style={{ "maxWidth": "160px", "minWidth": "160px" }}>Total Hours</th>
                                <th scope="col" style={{ "maxWidth": "160px", "minWidth": "160px" }}>Start Employement</th>
                                <th scope="col" style={{ "maxWidth": "50px", "minWidth": "50px" }}>EDIT</th>
                            </tr>
                        </thead>
                        {options
                            .map((value, i) => {
                                return (
                                    <tbody key={`${i}body`}>
                                        <tr style={{ "height": "35px", "maxHeight": "35px", "minHeight": "35px" }}>
                                            <td key={`${i}`} style={{ "maxWidth": "30px", "minWidth": "30px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{i + 1}</td>
                                            <td key={`${i}rank`} style={{ "maxWidth": "40px", "minWidth": "40px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.rank}</td>
                                            <td key={`${i}fullname`} style={{ "maxWidth": "190px", "minWidth": "190px", "paddingTop": "5px", "paddingLeft": "5px", "textAlign": "left", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.fullname}</td>
                                            <td key={`${i}dob`} style={{ "maxWidth": "90px", "minWidth": "90px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.dob}</td>
                                            <td key={`${i}nat`} style={{ "maxWidth": "60px", "minWidth": "60px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.nationality}</td>
                                            <td key={`${i}pass`} style={{ "maxWidth": "120px", "minWidth": "120px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.passport}</td>
                                            <td key={`${i}passVal`} style={{ "maxWidth": "120px", "minWidth": "120px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.passportValidity}</td>
                                            <td key={`${i}passLic`} style={{ "maxWidth": "120px", "minWidth": "120px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.licenceNbr}</td>
                                            <td key={`${i}opc`} style={{ "maxWidth": "60px", "minWidth": "60px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.opc}</td>
                                            <td key={`${i}lpc`} style={{ "maxWidth": "60px", "minWidth": "60px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.lpc}</td>
                                            <td key={`${i}totalH`} style={{ "maxWidth": "160px", "minWidth": "160px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.totalHours}</td>
                                            <td key={`${i}workfrom`} style={{ "maxWidth": "160px", "minWidth": "160px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>{value.workingFrom}</td>
                                            <td key={`${i}link`} style={{ "maxWidth": "50px", "minWidth": "50px", "paddingTop": "5px", "maxHeight": "35px", "minHeight": "35px", "height": "35px" }}>
                                                <Link to={`/crewby/crew/${value._id}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>

                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </React.Fragment>
    )

};

export default CrewList;
