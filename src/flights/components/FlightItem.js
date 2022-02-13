import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Ops from '../../shared/components/UIElements/Ops';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';


import './FlightItem.css';

const FlightItem = props => {

    let option;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setshowConfirmModal] = useState(false);


    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setshowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setshowConfirmModal(false);
    };


    const confirmDeleteHandler = async () => {
        setshowConfirmModal(false);
        try {
            await sendRequest(`http://185.119.90.74:5000/api/flights/${props.id}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
            props.onDelete(props.id);
        } catch (err) {

        }
    };

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date1 = new Date(props.date);
    let month = date1.toLocaleString('default', { month: 'short' });
    let day = date1.getDate();
    let dayInweek = days[date1.getDay()];
    let showDate = `${day}.${month}(${dayInweek})`;

    if (props.flightType1 === 'option') {
        option = 'raised';
    }
    if (props.flightType1 === 'tehnika') {
        option = 'tehnika';
    }


    let noteInfo = "note-info";

    if (props.note === "No notes") {
        noteInfo = "";
    }
    let noteOps1, noteOps2, noteOps3, noteOps4;

    if (props.noteOps[0] && props.noteOps[0] !== '') {
        noteOps1 = "!"
    }
    if (props.noteOps[1] && props.noteOps[1] !== '') {
        noteOps2 = "!"
    }
    if (props.noteOps[2] && props.noteOps[2] !== '') {
        noteOps3 = "!"
    }
    if (props.noteOps[3] && props.noteOps[3] !== '') {
        noteOps4 = "!"
    }

  

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                props={props}
                show={showMap}
                onCancel={closeMapHandler}
                header={props.date1}
                showDate={showDate}
                modal={`modal`}
                // eslint-disable-next-line 
                header={
                    (<div>
                        <Button onClick={closeMapHandler}>CLOSE</Button>
                        {/* Create here user role */}
                        {(auth.userId === "5fe46d14371ffc10f04ffec5" || auth.userId === "6058b8ef68ec011550673837") &&
                            <React.Fragment>
                                <Button className="editflight" to={`/flight/${props.id}`}>EDIT FLIGHT</Button>
                                <Button danger onClick={showDeleteWarningHandler} >DELETE</Button>
                            </React.Fragment>
                        }

                    </div>
                    )} >
                <div className="map-container">
                    <Ops {...props} />
                </div>
            </Modal>
            <Modal
                header="Are you sure ?"
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                footerClass='place-item__modal-actions'
                modal={'modal'}
                // eslint-disable-next-line 
                header={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </React.Fragment>
                } >
                <p>Do you want to proceed</p>
            </Modal>
            <li className="place-item" >
                <Card className='place-item__content place-item__info'>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <Button className="btn-item" option={option} onClick={openMapHandler}>
                        <div>
                            {props.date === props.date1 && <h3 className={props.paxnbr1 !== '0' ? 'pax' : undefined}><span className="span-exlamation">{noteOps1}</span><span className="span">{props.departureTime1}</span><span className="span">{props.originIcao1}</span><span>-</span><span className="span">{props.destinationIcao1}</span><span className="span">{props.arrivalTime1}</span><span className="span">{props.paxnbr1 === '0' ? '/' : `${props.paxnbr1}pax`}</span></h3>}
                            {props.date === props.date2 && <h3 className={props.paxnbr2 !== '0' ? 'pax' : undefined}><span className="span-exlamation">{noteOps2}</span><span className="span" >{props.departureTime2}</span><span className="span">{props.originIcao2}</span><span>-</span><span className="span">{props.destinationIcao2}</span><span className="span">{props.arrivalTime2}</span><span className="span">{props.paxnbr2 === '0' ? '/' : `${props.paxnbr2}pax`}</span></h3>}
                            {props.date === props.date3 && <h3 className={props.paxnbr3 !== '0' ? 'pax' : undefined}><span className="span-exlamation">{noteOps3}</span><span className="span">{props.departureTime3}</span><span className="span">{props.originIcao3}</span><span>-</span><span className="span">{props.destinationIcao3}</span><span className="span">{props.arrivalTime3}</span><span className="span">{props.paxnbr3 === '0' ? '/' : `${props.paxnbr3}pax`}</span></h3>}
                            {props.date === props.date4 && <h3 className={props.paxnbr4 !== '0' ? 'pax' : undefined}><span className="span-exlamation">{noteOps4}</span><span className="span">{props.departureTime4}</span><span className="span">{props.originIcao4}</span><span>-</span><span className="span">{props.destinationIcao4}</span><span className="span">{props.arrivalTime4}</span><span className="span">{props.paxnbr4 === '0' ? '/' : `${props.paxnbr4}pax`}</span></h3>}
                        </div>
                        <div className={noteInfo}></div>
                    </Button>
                </Card>
            </li>

        </React.Fragment>
    );
};

export default FlightItem;


