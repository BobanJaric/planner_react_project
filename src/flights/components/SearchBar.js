import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './SearchBar.css';

const SearchBar = ({ props }) => {
    const auth = useContext(AuthContext);
    const [display, setDisplay] = useState(true);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState('');
    const { sendRequest } = useHttpClient();
    const wrapperRef = useRef(null);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    let icaoSet = '';

    if (search !== []) {
        if (search.includes(' ')) {
            icaoSet = search.split(' ')[0];
        } else {
            icaoSet = search;
        }

    };

    const fetchAirport = async (e) => {
        let nameSerach = e.target.value.toUpperCase();
        setSearch(nameSerach);
        if (nameSerach !== '' && nameSerach.length === 4) {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/flights/airport/${nameSerach}`, 'GET', null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token

                    });
                setOptions(responseData.airport);
                //  openSocket('http://185.119.90.74:5000'); 
            } catch (err) {

            }
        }
    };

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(true);
        }
    };

    const filter = {
        icao: icaoSet
    };



     return (
        <div className="search-bar2">
            <div ref={wrapperRef} className="flex-container2 flex-column2 pos-rel2">
                <div className="row-searchbar" >
                    <label>Search</label>
                    <input
                        className="form-control mr-sm-2" type="search"
                        autoComplete="off"
                        onChange={(e) => fetchAirport(e)}
                        placeholder="Enter ICAO code"
                        value={search}
                    ></input>
                </div>
                {display && (
                    <div className="autoContainer-search">
                        {options
                            .filter(function (item) {
                                for (var key in filter) {
                                    if (item[key] === undefined || item[key] !== filter[key])
                                        return false;
                                }
                                return true;
                            })
                            .map((value, i) => {
                                return (
                                    <div
                                        className="option-search"
                                        key={i}
                                        tabIndex="0"
                                    >
                                        <span className="span-2">
                                            <Link to={`/airport/${value._id}`}>
                                                < h5 key={Math.random()} id={value._id} style={{ color: "rgb(0,123,255)", fontWeight: "bold" }} >
                                                    {value.city}({value.icao})
                                                </h5><hr />
                                            </Link>
                                            <h5 style={{ color: "rgb(246, 166, 35)", fontSize: "18px" }}>{value.hendler1.split(',')[0]}</h5>
                                            <p style={{ margin: "0", fontSize: "15px" }}>Tel: {value.hendler1.split(',')[1]}</p>
                                            <p style={{ margin: "0", fontSize: "15px" }}>E-mail: {value.hendler1.split(',')[2]}</p>

                                            {value.hendler2.trim() !== "" && <React.Fragment>
                                                <h5 style={{ color: "rgb(246, 166, 35)", fontSize: "18px", marginTop: "9px" }}>{value.hendler2.split(',')[0]}</h5>
                                                <p style={{ margin: "0", fontSize: "15px" }}>Tel:{value.hendler2.split(',')[1]}</p>
                                                <p style={{ margin: "0", fontSize: "15px" }}>E-mail:{value.hendler2.split(',')[2]}</p>
                                            </React.Fragment>}

                                            {value.hendler3.trim() !== "" && <React.Fragment>
                                                <h5 style={{ color: "rgb(246, 166, 35)", fontSize: "18px", marginTop: "9px" }}>{value.hendler3.split(',')[0]}</h5>
                                                <p style={{ margin: "0", fontSize: "15px" }}>Tel:{value.hendler3.split(',')[1]}</p>
                                                <p style={{ margin: "0", fontSize: "15px" }}>E-mail:{value.hendler3.split(',')[2]}</p>
                                            </React.Fragment>}

                                            {value.hendler4.trim() !== "" && <React.Fragment>
                                                <h5 style={{ color: "rgb(246, 166, 35)", fontSize: "18px", marginTop: "9px" }}>{value.hendler4.split(',')[0]}</h5>
                                                <p style={{ margin: "0", fontSize: "15px" }}>Tel:{value.hendler4.split(',')[1]}</p>
                                                <p style={{ margin: "0", fontSize: "15px" }}>E-mail:{value.hendler4.split(',')[2]}</p>
                                            </React.Fragment>}
                                            {value.hendler5 && <React.Fragment>
                                                <h5 style={{ color: "rgb(246, 166, 35)", fontSize: "18px", marginTop: "9px" }}>{value.hendler5.split(',')[0]}</h5>
                                                <p style={{ margin: "0", fontSize: "15px" }}>Tel:{value.hendler5.split(',')[1]}</p>
                                                <p style={{ margin: "0", fontSize: "15px" }}>E-mail:{value.hendler5.split(',')[2]}</p>
                                            </React.Fragment>}

                                            <hr />
                                            {value.note.length !== 1 &&
                                                <React.Fragment>
                                                    <h5 style={{ color: "rgb(0,123,255)" }} >Note:</h5>
                                                    <h6 style={{ fontSize: "14px", textTransform: "lowercase" }}>{value.note}</h6><hr />
                                                </React.Fragment>
                                            }
                                            <Link to={`/caa/${options[0]._id}`}>
                                                <h5>{value.country}</h5>
                                            </Link>
                                            <p className="country-para"><span style={{ color: "rgb(246, 166, 35)" }} >Contact:</span><span style={{ fontSize: "14px", textTransform: "initial" }}>{options[0].contact}</span></p>
                                            <p className="country-para"><span style={{ color: "rgb(246, 166, 35)" }} >Leading Time:</span><span style={{ fontSize: "14px", textTransform: "initial" }}>{options[0].leadingTime}</span> </p>
                                            <p className="country-para"><span style={{ color: "rgb(246, 166, 35)" }} >Note:</span><span style={{ fontSize: "14px", textTransform: "initial" }}>{options[0].note}</span> </p>
                                            <p className="country-para"><span style={{ color: "rgb(246, 166, 35)" }} >Permit:</span><span style={{ fontSize: "14px", textTransform: "initial" }}>{options[0].permit}</span> </p>
                                            <p className="country-para"><span style={{ color: "rgb(246, 166, 35)" }} >Validity:</span><span style={{ fontSize: "14px", textTransform: "initial" }}>{options[0].validity}</span> </p>
                                            <p className="country-para"><span style={{ color: "rgb(246, 166, 35)" }} >Operating Hours:</span><span style={{ fontSize: "14px", textTransform: "initial" }}>{options[0].workingHours}</span></p>
                                            <p className="country-para"><span style={{ color: "rgb(246, 166, 35)" }} >API:</span><span style={{ fontSize: "14px", textTransform: "initial" }}>{options[0].api}</span></p>
                                            <p className="country-para"><span style={{ color: "rgb(246, 166, 35)" }} >Covid restrictions:</span><span style={{ fontSize: "14px", textTransform: "initial" }}>{options[0].covid}</span></p>
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        </div>
    )

};

export default SearchBar;