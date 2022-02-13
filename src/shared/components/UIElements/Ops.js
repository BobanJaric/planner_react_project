import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import openSocket from 'socket.io-client';

import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';

import Button from '../FormElements/Button';
import Background from '../../../flights/components/pictures/no.png';
import Background2 from '../../../flights/components/pictures/no2.png';


import briefing from './Briefing';
import handler from './Handling';
import handlers from './Handlers';
import permit from './Permit';
import permitDest from './PermitDest';
import slots from './Slots';
import slotDestination from './SlotDest';
import vips from './Vips';
import vipDests from './VipDest';
import ovfPmts from './OvfPmts';



import './Ops.css';
import handlerEmail from './HandlingEmail';

const Ops = props => {


    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [values, setValues] = useState({});
    const [selectCapt, setSelectCapt] = useState(props.selectCapt);

    const history = useHistory();

    useEffect(() => {
        const fetchPlaces = async () => {

            let currentFlt;

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/flights/${props.id}`, 'GET', null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token

                    });

                currentFlt = responseData.flight;


            } catch (err) {

            }


            for (let i = 0; i < 8; i++) {
                if (currentFlt.handling[i] === null) {
                    currentFlt.handling[i] = "";
                }
            }
            for (let i = 0; i < 8; i++) {
                if (currentFlt.doz[i] === null) {
                    currentFlt.doz[i] = "";
                }
            }
            for (let i = 0; i < 8; i++) {
                if (currentFlt.slot[i] === null) {
                    currentFlt.slot[i] = "";
                }
            }
            for (let i = 0; i < 8; i++) {
                if (currentFlt.ovf[i] === null) {
                    currentFlt.ovf[i] = "";
                }
            }
            for (let i = 0; i < 8; i++) {
                if (currentFlt.vip[i] === null) {
                    currentFlt.vip[i] = "";
                }
            }
            for (let i = 0; i < 8; i++) {
                if (currentFlt.crew[i] === null) {
                    currentFlt.crew[i] = "";
                }
            }
            for (let i = 0; i < 5; i++) {
                if (currentFlt.noteOps[i] === null) {
                    currentFlt.noteOps[i] = "";
                }
            }

            setValues({
                hnd1: currentFlt.handling[0], hnd2: currentFlt.handling[1], hnd3: currentFlt.handling[2], hnd4: currentFlt.handling[3],
                hnd5: currentFlt.handling[4], hnd6: currentFlt.handling[5], hnd7: currentFlt.handling[6], hnd8: currentFlt.handling[7],
                slot1: currentFlt.slot[0], doz1: currentFlt.doz[0], ovf1: currentFlt.ovf[0], vip1: currentFlt.vip[0],
                slot2: currentFlt.slot[1], doz2: currentFlt.doz[1], ovf2: currentFlt.ovf[1], vip2: currentFlt.vip[1],
                slot3: currentFlt.slot[2], doz3: currentFlt.doz[2], ovf3: currentFlt.ovf[2], vip3: currentFlt.vip[2],
                slot4: currentFlt.slot[3], doz4: currentFlt.doz[3], ovf4: currentFlt.ovf[3], vip4: currentFlt.vip[3],
                slot5: currentFlt.slot[4], doz5: currentFlt.doz[4], ovf5: currentFlt.ovf[4], vip5: currentFlt.vip[4],
                slot6: currentFlt.slot[5], doz6: currentFlt.doz[5], ovf6: currentFlt.ovf[5], vip6: currentFlt.vip[5],
                slot7: currentFlt.slot[6], doz7: currentFlt.doz[6], ovf7: currentFlt.ovf[6], vip7: currentFlt.vip[6],
                slot8: currentFlt.slot[7], doz8: currentFlt.doz[7], ovf8: currentFlt.ovf[7], vip8: currentFlt.vip[7],
                fullname1: currentFlt.crew[0], fullname2: currentFlt.crew[1], fullname3: currentFlt.crew[2],
                noteOps1: currentFlt.noteOps[0], noteOps2: currentFlt.noteOps[1], noteOps3: currentFlt.noteOps[2], noteOps4: currentFlt.noteOps[3],
                hendlerDestination1: currentFlt.hendlerDestination1, hendlerDestination2: currentFlt.hendlerDestination2, hendlerDestination3: currentFlt.hendlerDestination3, hendlerDestination4: currentFlt.hendlerDestination4,
                hendlerOrigin: currentFlt.hendlerOrigin, hendlerOrigin1: currentFlt.hendlerOrigin1, hendlerOrigin3: currentFlt.hendlerOrigin3, hendlerOrigin4: currentFlt.hendlerOrigin4,
                airportsData: currentFlt.airportsData,
            });
        };
        fetchPlaces();

    }, [props.id, sendRequest, auth.token]);


    const placeSubmitHandler = async event => {

        event.preventDefault();

        try {
            await sendRequest('http://localhost:5000/api/flights/ops',
                'POST',
                JSON.stringify({
                    id: props.id,
                    handling: [values.hnd1, values.hnd2, values.hnd3, values.hnd4, values.hnd5, values.hnd6, values.hnd7, values.hnd8],
                    slot: [values.slot1, values.slot2, values.slot3, values.slot4, values.slot5, values.slot6, values.slot7, values.slot8],
                    doz: [values.doz1, values.doz2, values.doz3, values.doz4, values.doz5, values.doz6, values.doz7, values.doz8],
                    ovf: [values.ovf1, values.ovf2, values.ovf3, values.ovf4, values.ovf5, values.ovf6, values.ovf7, values.ovf8],
                    vip: [values.vip1, values.vip2, values.vip3, values.vip4, values.vip5, values.vip6, values.vip7, values.vip8],
                    crew: [values.fullname1, values.fullname2, values.fullname3],
                    noteOps: [values.noteOps1, values.noteOps2, values.noteOps3, values.noteOps4],
                    selectCapt: selectCapt
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            openSocket('http://localhost:5000');

            console.log(auth.userId);

            history.push(`/${auth.userId}/flights`); 
        } catch (err) {

        }
    };

    const handlingSubmitHandler = () => {
        handler(props);
    }

    const briefingSubmitHandler = () => {
        briefing(props);
    };

    const handleOnChange = event => {
        const { name, value } = event.target;
        if (value === 'white') {
            setValues({ ...values, [name]: 'red' });
        } else if (value === 'red') {
            setValues({ ...values, [name]: 'green' });
        } else if (value === 'green') {
            setValues({ ...values, [name]: 'black' });
        } else {
            setValues({ ...values, [name]: 'white' });
        }
    };

    const handleOnChange2 = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    let slot = slots(props);
    let slotDest = slotDestination(props);
    let pmt = permit(props);
    let pmtDest = permitDest(props);
    let hendlerOrigin = handlers(props);
    let vip = vips(props);
    let vipDest = vipDests(props);
    let ovfPmt = ovfPmts(props);


    const selectCapt2 = () => {
        if (selectCapt === 'false') {
            setSelectCapt('true');
        } else {
            setSelectCapt('false');
        }

    };




    const Mailto = ({ hendlerDestination, children, date1, date2, departureTime1, originIcao1, destinationIcao1, arrivalTime1, paxnbr1,
        departureTime2, originIcao2, destinationIcao2, arrivalTime2, paxnbr2, registration, callsign }) => {

        let dates = [date1, date2];
        let correctedDates = [];
        dates.forEach(date => {
            if (date !== "") {
                let dateNum = new Date(date).getDate();

                if (dateNum.toString().length === 2) {
                    correctedDates.push(dateNum + '-' + new Date(date).toLocaleString('default', { month: 'short' }));
                } else {
                    correctedDates.push('0' + dateNum + '-' + new Date(date).toLocaleString('default', { month: 'short' }));
                }

            } else {
                correctedDates.push("");
            }

        });

        let email = hendlerDestination.split(',')[2];


        let subject = [correctedDates[0] + ' ' + registration + ' ' + originIcao1 + '-' + destinationIcao1 + '-' + destinationIcao2];

        let body = handlerEmail(correctedDates, departureTime1, originIcao1, destinationIcao1, arrivalTime1, paxnbr1,
            departureTime2, originIcao2, destinationIcao2, arrivalTime2, paxnbr2, registration, callsign);


        return <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>;
    };


    const capt = props.loadedCrew.filter(el => el.rankNbr === '1');
    const fo = props.loadedCrew.filter(el => el.rankNbr === '2');
    const fa = props.loadedCrew.filter(el => el.rankNbr === '3');

    return (
        <div className="map">
            <div className="ops">
                <table className="table3" >
                    <thead className="table2-thead">
                        <tr className="table2-thead" >
                            <th style={{ color: "rgb(34, 82, 121)" }} >{props.registration}</th>
                            <th className="row1">ETD</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th className="row1">ETA</th>
                            <th className="row1">PAX</th>
                            <th className="row1">Type</th>
                            <th className="row1">FLT</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody className="table2-body">
                        {props.date === props.date1 &&
                            <React.Fragment>
                                <tr className="button-fuckyou">
                                    <td></td>
                                    <td className="row1"></td>
                                    <td>
                                        <button name='hnd1' className="hndAb" value={values.hnd1} style={{ background: values.hnd1 }} onClick={handleOnChange}>{props.originIcao1 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slot[1] && <button name='slot1' value={values.slot1} style={{ background: values.slot1 }} onClick={handleOnChange}>S</button>}
                                        {pmt[1] && <button name='doz1' value={values.doz1} style={{ background: values.doz1 }} onClick={handleOnChange}>D</button>}
                                        {ovfPmt[1] && <button className="ovf1" name='ovf1' value={values.ovf1} style={values.ovf1 === 'black' ? { backgroundImage: `url(${Background2})`, backgroundRepeat: 'no-repeat' } : { background: values.ovf1 }} onClick={handleOnChange}>BLR</button>}
                                        {vip[1] && <button name='vip1' value={values.vip1} style={values.vip1 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip1 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td>
                                        <button name='hnd2' className="hndAb" value={values.hnd2} style={{ background: values.hnd2 }} onClick={handleOnChange}>{props.destinationIcao1 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slotDest[1] && <button name='slot2' value={values.slot2} style={{ background: values.slot2 }} onClick={handleOnChange}>S</button>}
                                        {pmtDest[1] && <button name='doz2' value={values.doz2} style={{ background: values.doz2 }} onClick={handleOnChange}>D</button>}
                                        {vipDest[1] && <button name='vip2' value={values.vip2} /* className={values.vip2}  */ style={values.vip2 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip2 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Leg1</td>
                                    <td className="row1" >{props.departureTime1}</td>
                                    <td>{props.originIcao1}</td>
                                    <td>{props.destinationIcao1}</td>
                                    <td className="row1">{props.arrivalTime1}</td>
                                    <td className="row1">{props.paxnbr1}</td>
                                    <td className="row1">{props.flightType1}</td>
                                    <td className="row1">{props.msp1}</td>
                                    <td className="row12">
                                        <textarea
                                            className="text-row1"
                                            rows="1"
                                            placeholder="NoteOps "
                                            name="noteOps1"
                                            value={values.noteOps1}
                                            onChange={handleOnChange2}
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        }
                        {props.date === props.date2 &&
                            <React.Fragment>
                                <tr className="button-fuckyou">
                                    <td></td>
                                    <td className="row1"></td>
                                    <td>
                                        <button name='hnd3' className="hndAb" value={values.hnd3} style={{ background: values.hnd3 }} onClick={handleOnChange}>{props.originIcao2 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slot[2] && <button name='slot3' value={values.slot3} style={{ background: values.slot3 }} onClick={handleOnChange}>S</button>}
                                        {pmt[2] && <button name='doz3' value={values.doz3} style={{ background: values.doz3 }} onClick={handleOnChange}>D</button>}
                                        {vip[2] && <button name='vip3' value={values.vip3} style={values.vip3 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip3 }} onClick={handleOnChange}>V</button>}
                                        {ovfPmt[2] && <button name='ovf3' className="ovf1" value={values.ovf3} style={values.ovf3 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.ovf3 }} onClick={handleOnChange}>{
                                            (props.originIcao2.substring(0, 2) === "OE" || props.destinationIcao2.substring(0, 2) === 'OE') ? 'EGY' : 'BLR'
                                        }</button>}
                                    </td>
                                    <td>
                                        <button name='hnd4' className="hndAb" value={values.hnd4} style={{ background: values.hnd4 }} onClick={handleOnChange}>{props.destinationIcao2 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slotDest[2] && <button name='slot4' value={values.slot4} style={{ background: values.slot4 }} onClick={handleOnChange}>S</button>}
                                        {pmtDest[2] && <button name='doz4' value={values.doz4} style={{ background: values.doz4 }} onClick={handleOnChange}>D</button>}
                                        {vipDest[2] && <button name='vip4' value={values.vip4} style={values.vip4 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip4 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Leg2</td>
                                    <td className="row1">{props.departureTime2}</td>
                                    <td>{props.originIcao2}</td>
                                    <td>{props.destinationIcao2}</td>
                                    <td className="row1">{props.arrivalTime2}</td>
                                    <td className="row1">{props.paxnbr2}</td>
                                    <td className="row1">{props.flightType2}</td>
                                    <td className="row1">{props.msp2}</td>
                                    <td className="row12">
                                        <textarea
                                            className="text-row1"
                                            rows="1"
                                            placeholder="NoteOps "
                                            name="noteOps2"
                                            value={values.noteOps2}
                                            onChange={handleOnChange2}
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        }
                        {props.date === props.date3 &&
                            <React.Fragment>
                                <tr className="button-fuckyou">
                                    <td></td>
                                    <td className="row1"></td>
                                    <td>
                                        <button name='hnd5' className="hndAb" value={values.hnd5} style={{ background: values.hnd5 }} onClick={handleOnChange}>{props.originIcao3 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slot[3] && <button name='slot5' value={values.slot5} style={{ background: values.slot5 }} onClick={handleOnChange}>S</button>}
                                        {pmt[3] && <button name='doz5' value={values.doz5} style={{ background: values.doz5 }} onClick={handleOnChange}>D</button>}
                                        {ovfPmt[3] && <button name='ovf5' className="ovf1" value={values.ovf5} style={{ background: values.ovf5 }} onClick={handleOnChange}>{
                                            (props.originIcao3.substring(0, 2) === "OE" || props.destinationIcao3.substring(0, 2) === 'OE') ? 'EGY' : 'BLR'
                                        }</button>}
                                        {vip[3] && <button name='vip5' value={values.vip5} style={values.vip5 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip5 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td>
                                        <button name='hnd6' className="hndAb" value={values.hnd6} style={{ background: values.hnd6 }} onClick={handleOnChange}>{props.destinationIcao3 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slotDest[3] && <button name='slot6' value={values.slot6} style={{ background: values.slot6 }} onClick={handleOnChange}>S</button>}
                                        {pmtDest[3] && <button name='doz6' value={values.doz6} style={{ background: values.doz6 }} onClick={handleOnChange}>D</button>}
                                        {vipDest[3] && <button name='vip6' value={values.vip6} style={values.vip6 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip6 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Leg3</td>
                                    <td className="row1">{props.departureTime3}</td>
                                    <td>{props.originIcao3}</td>
                                    <td>{props.destinationIcao3}</td>
                                    <td className="row1">{props.arrivalTime3}</td>
                                    <td className="row1">{props.paxnbr3}</td>
                                    <td className="row1">{props.flightType3}</td>
                                    <td className="row1">{props.msp3}</td>
                                    <td className="row12">
                                        <textarea
                                            className="text-row1"
                                            rows="1"
                                            placeholder="NoteOps "
                                            name="noteOps3"
                                            value={values.noteOps3}
                                            onChange={handleOnChange2}
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        }
                        {props.date === props.date4 &&
                            <React.Fragment>
                                <tr className="button-fuckyou">
                                    <td></td>
                                    <td className="row1"></td>
                                    <td>
                                        <button name='hnd7' className="hndAb" value={values.hnd7} style={{ background: values.hnd7 }} onClick={handleOnChange}>{props.originIcao4 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slot[4] && <button name='slot7' value={values.slot7} style={{ background: values.slot7 }} onClick={handleOnChange}>S</button>}
                                        {pmt[4] && <button name='doz7' value={values.doz7} style={{ background: values.doz7 }} onClick={handleOnChange}>D</button>}
                                        {ovfPmt[4] && <button name='ovf7' className="ovf1" value={values.ovf7} style={{ background: values.ovf7 }} onClick={handleOnChange}>BLR</button>}
                                        {vip[4] && <button name='vip7' value={values.vip7} style={values.vip7 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip7 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td>
                                        <button name='hnd8' className="hndAb" value={values.hnd8} style={{ background: values.hnd8 }} onClick={handleOnChange}>{props.destinationIcao4 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slotDest[4] && <button name='slot8' value={values.slot8} style={{ background: values.slot8 }} onClick={handleOnChange}>S</button>}
                                        {pmtDest[4] && <button name='doz8' value={values.doz8} style={{ background: values.doz8 }} onClick={handleOnChange}>D</button>}
                                        {vipDest[4] && <button name='vip8' value={values.vip8} style={values.vip8 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip8 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Leg4</td>
                                    <td className="row1">{props.departureTime4}</td>
                                    <td>{props.originIcao4}</td>
                                    <td>{props.destinationIcao4}</td>
                                    <td className="row1">{props.arrivalTime4}</td>
                                    <td className="row1">{props.paxnbr4}</td>
                                    <td className="row1">{props.flightType4}</td>
                                    <td className="row1">{props.msp4}</td>
                                    <td className="row12">
                                        <textarea
                                            className="text-row1"
                                            rows="1"
                                            placeholder="NoteOps "
                                            name="noteOps4"
                                            value={values.noteOps4}
                                            onChange={handleOnChange2}
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        }
                        <tr>
                            <td>Note</td>
                            <td colSpan="9">{props.note}</td>
                        </tr>
                        <tr>
                            <td>Handling</td>
                            <td colSpan="9">{hendlerOrigin}</td>
                        </tr>
                        <tr>
                            <td><Button onClick={selectCapt2} >Crew</Button></td>
                            <td colSpan="2">
                                <select className="select-css" id='fullname1' name='fullname1' value={values.fullname1} onChange={handleOnChange2} >
                                    <option defaultValue=""  >-- select Captain --</option>
                                    {
                                        capt.map(cpt => {
                                            return (
                                                <option key={cpt.passport} value={cpt.fullname} >{cpt.fullname}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            {selectCapt !== 'false' ?
                                <React.Fragment>
                                    <td colSpan="3">
                                        <select className="select-css" id='fullname2' name='fullname2' value={values.fullname2} onChange={handleOnChange2} >
                                            <option defaultValue=""  >-- select F/O --</option>
                                            {
                                                fo.map(f => {
                                                    return (
                                                        <option key={f.passport} value={f.fullname} >{f.fullname}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </td>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <td colSpan="3">
                                        <select className="select-css" id='fullname3' name='fullname2' value={values.fullname2} onChange={handleOnChange2} >
                                            <option defaultValue=""  >-- select Captain --</option>
                                            {
                                                capt.map(cpt => {
                                                    return (
                                                        <option key={cpt.passport} value={cpt.fullname} >{cpt.fullname}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </td>
                                </React.Fragment>
                            }
                            <td colSpan="3">
                                <select className="select-css" id='fullname3' name='fullname3' value={values.fullname3} onChange={handleOnChange2} >
                                    <option defaultValue="" >-- select Acm --</option>
                                    {
                                        fa.map(f => {
                                            return (
                                                <option key={f.passport} value={f.fullname} >{f.fullname}</option>
                                            )
                                        })
                                    }
                                    <option value=" "   >No stw</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {(auth.role === "admin" || auth.role === "sales") &&
                    <React.Fragment>
                        <div className="btn-holder">
                            {(auth.role === "admin" || auth.role === "sales") &&
                                <button className="btn-savechange"  onClick={placeSubmitHandler} >SAVE</button>
                            }
                            <button className="btn-savechange" onClick={briefingSubmitHandler} target='_blank' >brief</button>
                        </div>
                        <div className="btn-holder">
                            <button className="btn-savechange" onClick={handlingSubmitHandler} target='_blank' >HND REQ</button>
                            <button className="btn-savechange">
                                <Mailto props={props}
                                    hendlerDestination={props.hendlerDestination1}
                                    originIcao1={props.originIcao1}
                                    originIcao2={props.originIcao2}
                                    destinationIcao1={props.destinationIcao1}
                                    destinationIcao2={props.destinationIcao2}
                                    date1={props.date1}
                                    date2={props.date2}
                                    departureTime1={props.departureTime1}
                                    arrivalTime1={props.arrivalTime1}
                                    paxnbr1={props.paxnbr1}
                                    departureTime2={props.departureTime2}
                                    arrivalTime2={props.arrivalTime2}
                                    paxnbr2={props.paxnbr2}
                                    registration={props.registration}
                                    callsign={props.callsign}
                                >
                                    Req Leg1
                                </Mailto>
                            </button>
                            <button className="btn-savechange">
                                <Mailto props={props}
                                    hendlerDestination={props.hendlerDestination2}
                                    originIcao1={props.originIcao2}
                                    originIcao2={props.originIcao3}
                                    destinationIcao1={props.destinationIcao2}
                                    destinationIcao2={props.destinationIcao3}
                                    date1={props.date2}
                                    date2={props.date3}
                                    departureTime1={props.departureTime2}
                                    arrivalTime1={props.arrivalTime2}
                                    paxnbr1={props.paxnbr2}
                                    departureTime2={props.departureTime3}
                                    arrivalTime2={props.arrivalTime3}
                                    paxnbr2={props.paxnbr3}
                                    registration={props.registration}
                                    callsign={props.callsign}
                                >
                                    Req Leg2
                                </Mailto>
                            </button>
                            {props.originIcao3 !== "" &&
                                <button className="btn-savechange">
                                    <Mailto props={props}
                                        hendlerDestination={props.hendlerDestination3}
                                        originIcao1={props.originIcao3}
                                        originIcao2={props.originIcao4}
                                        destinationIcao1={props.destinationIcao3}
                                        destinationIcao2={props.destinationIcao4}
                                        date1={props.date3}
                                        date2={props.date4}
                                        departureTime1={props.departureTime3}
                                        arrivalTime1={props.arrivalTime3}
                                        paxnbr1={props.paxnbr3}
                                        departureTime2={props.departureTime4}
                                        arrivalTime2={props.arrivalTime4}
                                        paxnbr2={props.paxnbr4}
                                        registration={props.registration}
                                        callsign={props.callsign}
                                    >
                                        Req Leg3
                                    </Mailto>
                                </button>}
                        </div>
                    </React.Fragment>
                }
            </div>
            <div className="ops2" >
                <table className="table-mob"  >
                    <thead className="thead-mob">
                        <tr className="thead-mob" >
                            <th className="row1-mob">ETD</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th className="row1-mob">ETA</th>
                            <th className="row1-mob">PAX</th>
                            <th>Note</th>
                        </tr>
                    </thead>

                    <tbody className="table-mob">
                        {props.date === props.date1 &&
                            <React.Fragment>
                                <tr className="button-fuckyou">
                                    <td></td>
                                    <td>
                                        <button name='hnd1' className="hndAb" value={values.hnd1} style={{ background: values.hnd1 }} onClick={handleOnChange}>{props.originIcao1 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slot[1] && <button name='slot1' value={values.slot1} style={{ background: values.slot1 }} onClick={handleOnChange}>S</button>}
                                        {pmt[1] && <button name='doz1' value={values.doz1} style={{ background: values.doz1 }} onClick={handleOnChange}>D</button>}
                                        {ovfPmt[1] && <button className="ovf1" name='ovf1' value={values.ovf1} style={values.ovf1 === 'black' ? { backgroundImage: `url(${Background2})`, backgroundRepeat: 'no-repeat' } : { background: values.ovf1 }} onClick={handleOnChange}>BLR</button>}
                                        {vip[1] && <button name='vip1' value={values.vip1} style={values.vip1 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip1 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td>
                                        <button name='hnd2' className="hndAb" value={values.hnd2} style={{ background: values.hnd2 }} onClick={handleOnChange}>{props.destinationIcao1 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slotDest[1] && <button name='slot2' value={values.slot2} style={{ background: values.slot2 }} onClick={handleOnChange}>S</button>}
                                        {pmtDest[1] && <button name='doz2' value={values.doz2} style={{ background: values.doz2 }} onClick={handleOnChange}>D</button>}
                                        {vipDest[1] && <button name='vip2' value={values.vip2} /* className={values.vip2}  */ style={values.vip2 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip2 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                </tr>
                                <tr className="thead-mob">
                                    <td className="row1-mob" >{props.departureTime1}</td>
                                    <td>{props.originIcao1}</td>
                                    <td>{props.destinationIcao1}</td>
                                    <td className="row1-mob">{props.arrivalTime1}</td>
                                    <td className="row1-mob">{props.paxnbr1}</td>
                                    <td className="row1-mob">{props.noteOps1}</td>
                                </tr>
                            </React.Fragment>
                        }
                        {props.date === props.date2 &&
                            <React.Fragment>
                                <tr className="button-fuckyou">
                                    <td className="row1"></td>
                                    <td>
                                        <button name='hnd3' className="hndAb" value={values.hnd3} style={{ background: values.hnd3 }} onClick={handleOnChange}>{props.originIcao2 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slot[2] && <button name='slot3' value={values.slot3} style={{ background: values.slot3 }} onClick={handleOnChange}>S</button>}
                                        {pmt[2] && <button name='doz3' value={values.doz3} style={{ background: values.doz3 }} onClick={handleOnChange}>D</button>}
                                        {vip[2] && <button name='vip3' value={values.vip3} style={values.vip3 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip3 }} onClick={handleOnChange}>V</button>}
                                        {ovfPmt[2] && <button name='ovf3' className="ovf1" value={values.ovf3} style={values.ovf3 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.ovf3 }} onClick={handleOnChange}>{
                                            (props.originIcao2.substring(0, 2) === "OE" || props.destinationIcao2.substring(0, 2) === 'OE') ? 'EGY' : 'BLR'
                                        }</button>}
                                    </td>
                                    <td>
                                        <button name='hnd4' className="hndAb" value={values.hnd4} style={{ background: values.hnd4 }} onClick={handleOnChange}>{props.destinationIcao2 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slotDest[2] && <button name='slot4' value={values.slot4} style={{ background: values.slot4 }} onClick={handleOnChange}>S</button>}
                                        {pmtDest[2] && <button name='doz4' value={values.doz4} style={{ background: values.doz4 }} onClick={handleOnChange}>D</button>}
                                        {vipDest[2] && <button name='vip4' value={values.vip4} style={values.vip4 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip4 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                </tr>
                                <tr>
                                    <td className="row1">{props.departureTime2}</td>
                                    <td>{props.originIcao2}</td>
                                    <td>{props.destinationIcao2}</td>
                                    <td className="row1">{props.arrivalTime2}</td>
                                    <td className="row1">{props.paxnbr2}</td>
                                    <td className="row1-mob">{props.noteOps2}</td>
                                </tr>
                            </React.Fragment>
                        }
                        {props.date === props.date3 &&
                            <React.Fragment>
                                <tr className="button-fuckyou">
                                    <td className="row1"></td>
                                    <td>
                                        <button name='hnd5' className="hndAb" value={values.hnd5} style={{ background: values.hnd5 }} onClick={handleOnChange}>{props.originIcao3 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slot[3] && <button name='slot5' value={values.slot5} style={{ background: values.slot5 }} onClick={handleOnChange}>S</button>}
                                        {pmt[3] && <button name='doz5' value={values.doz5} style={{ background: values.doz5 }} onClick={handleOnChange}>D</button>}
                                        {ovfPmt[3] && <button name='ovf5' className="ovf1" value={values.ovf5} style={{ background: values.ovf5 }} onClick={handleOnChange}>{
                                            (props.originIcao3.substring(0, 2) === "OE" || props.destinationIcao3.substring(0, 2) === 'OE') ? 'EGY' : 'BLR'
                                        }</button>}
                                        {vip[3] && <button name='vip5' value={values.vip5} style={values.vip5 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip5 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td>
                                        <button name='hnd6' className="hndAb" value={values.hnd6} style={{ background: values.hnd6 }} onClick={handleOnChange}>{props.destinationIcao3 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slotDest[3] && <button name='slot6' value={values.slot6} style={{ background: values.slot6 }} onClick={handleOnChange}>S</button>}
                                        {pmtDest[3] && <button name='doz6' value={values.doz6} style={{ background: values.doz6 }} onClick={handleOnChange}>D</button>}
                                        {vipDest[3] && <button name='vip6' value={values.vip6} style={values.vip6 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip6 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                </tr>
                                <tr>
                                    <td className="row1">{props.departureTime3}</td>
                                    <td>{props.originIcao3}</td>
                                    <td>{props.destinationIcao3}</td>
                                    <td className="row1">{props.arrivalTime3}</td>
                                    <td className="row1">{props.paxnbr3}</td>
                                    <td className="row1-mob">{props.noteOps3}</td>
                                </tr>
                            </React.Fragment>
                        }
                        {props.date === props.date4 &&
                            <React.Fragment>
                                <tr className="button-fuckyou">
                                    <td className="row1"></td>
                                    <td>
                                        <button name='hnd7' className="hndAb" value={values.hnd7} style={{ background: values.hnd7 }} onClick={handleOnChange}>{props.originIcao4 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slot[4] && <button name='slot7' value={values.slot7} style={{ background: values.slot7 }} onClick={handleOnChange}>S</button>}
                                        {pmt[4] && <button name='doz7' value={values.doz7} style={{ background: values.doz7 }} onClick={handleOnChange}>D</button>}
                                        {ovfPmt[4] && <button name='ovf7' className="ovf1" value={values.ovf7} style={{ background: values.ovf7 }} onClick={handleOnChange}>BLR</button>}
                                        {vip[4] && <button name='vip7' value={values.vip7} style={values.vip7 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip7 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td>
                                        <button name='hnd8' className="hndAb" value={values.hnd8} style={{ background: values.hnd8 }} onClick={handleOnChange}>{props.destinationIcao4 === 'LYBE' ? 'AB' : 'H'}</button>
                                        {slotDest[4] && <button name='slot8' value={values.slot8} style={{ background: values.slot8 }} onClick={handleOnChange}>S</button>}
                                        {pmtDest[4] && <button name='doz8' value={values.doz8} style={{ background: values.doz8 }} onClick={handleOnChange}>D</button>}
                                        {vipDest[4] && <button name='vip8' value={values.vip8} style={values.vip8 === 'black' ? { backgroundImage: `url(${Background})` } : { background: values.vip8 }} onClick={handleOnChange}>V</button>}
                                    </td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                    <td className="row1"></td>
                                </tr>
                                <tr>
                                    <td className="row1">{props.departureTime4}</td>
                                    <td>{props.originIcao4}</td>
                                    <td>{props.destinationIcao4}</td>
                                    <td className="row1">{props.arrivalTime4}</td>
                                    <td className="row1">{props.paxnbr4}</td>
                                    <td className="row1-mob">{props.noteOps4}</td>
                                </tr>
                            </React.Fragment>
                        }
                        <tr>
                            <td>Note</td>
                            <td colSpan="9">{props.note}</td>
                        </tr>
                        <tr>
                            <td>HND</td>
                            <td colSpan="6" className="hnd-mob">{hendlerOrigin}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ops;

