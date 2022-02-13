import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './BrokerList.css';

const AircraftList = props => {

   /*  const [options, setOptions] = useState(props.items); */
   const options=props.items;
    options.sort((a, b) => a._id.localeCompare(b._id));

    return (
        <div className="aircraft-list">
            <div className="option-aircraft">
                <table className="table-aircraft">
                    <thead>
                        <tr>
                            <th scope="col" style={{ "maxWidth": "50px", "minWidth": "50px" }}></th>
                            <th scope="col" style={{ "maxWidth": "90px", "minWidth": "90px" }}>Reg</th>
                            <th scope="col" style={{ "maxWidth": "90px", "minWidth": "90px" }}>CallSign</th>
                            <th scope="col" style={{ "maxWidth": "90px", "minWidth": "90px" }}>Type</th>
                            <th scope="col" style={{ "maxWidth": "120px", "minWidth": "120px" }}>MTOW</th>
                            <th scope="col" style={{ "maxWidth": "120px", "minWidth": "120px" }}>TotalTime</th>
                            <th scope="col" style={{ "maxWidth": "160px", "minWidth": "160px" }}>Next Maintenance</th>
                            <th scope="col" style={{ "maxWidth": "80px", "minWidth": "80px" }}>EDIT</th>
                        </tr>
                    </thead>
                    {options
                        .map((value, i) => {
                            return (
                                <tbody key={`${i}body`}>
                                    <tr style={{ "height": "35px", "maxHeight": "35px", "minHeight": "35px" }}>
                                        <td key={`${i}`} style={{ "maxWidth": "50px", "minWidth": "50px", "paddingTop": "5px" }}>{i + 1}</td>
                                        <td key={`${i}aircraft`} style={{ "maxWidth": "90px", "minWidth": "90px", "paddingTop": "5px" }}>{value.aircraft}</td>
                                        <td key={`${i}callsign`} style={{ "maxWidth": "90px", "minWidth": "90px", "paddingTop": "5px" }}>{value.callsign}</td>
                                        <td key={`${i}type`} style={{ "maxWidth": "90px", "minWidth": "90px", "paddingTop": "5px" }}>{value.type}</td>
                                        <td key={`${i}mtow`} style={{ "maxWidth": "120px", "minWidth": "120px", "paddingTop": "5px" }}>{value.mtow}</td>
                                        <td key={`${i}totalTime`} style={{ "maxWidth": "120px", "minWidth": "120px", "paddingTop": "5px" }}>{value.totalTime}</td>
                                        <td key={`${i}nextMaintenance`} style={{ "maxWidth": "160px", "minWidth": "160px", "paddingTop": "5px" }}>{value.nextMaintenance}</td>
                                        <td key={`${i}link`} style={{ "maxWidth": "80px", "minWidth": "80px", "paddingTop": "5px" }}>
                                            <Link to={`/aircraft/${value._id}`}>
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
    )

};

export default AircraftList;
