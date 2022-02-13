import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './FlightItem.css';


const NoteItem = props => {

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
            await sendRequest(`http://localhost:5000/api/flights/notes/delete/${props.id}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
            props.onDelete(props.id);
        } catch (err) {

        }
    };

   let noteToolTip= <div  >{props.note}</div> ;

    const renderTooltip = (props) => (
        <Tooltip className="button-tooltip" {...props}>
           {noteToolTip}
        </Tooltip>
    ); 

    let date1 = new Date(props.date);
    let month = date1.toLocaleString('default', { month: 'short' });
    let day = date1.getDate();
    let showDate = `${day}.${month}`;
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                props={props}
                show={showMap}
                onCancel={closeMapHandler}
                header={showDate}
                modal={'modal2'}
                footer={
                    (<div>
                        <Button onClick={closeMapHandler}>CLOSE</Button>
                        <Button danger onClick={showDeleteWarningHandler} >DELETE</Button>
                    </div>
                    )} >
                <div className="note-container">
                    {props.note}
                </div>
            </Modal>
            <Modal
                header="Are you sure ?"
                show={showConfirmModal}
                modal={'modal2'}
                onCancel={cancelDeleteHandler}
                footerClass='place-item__modal-actions' footer={
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
            <li className="place-item2">
                <Card  className='place-item__content2 place-item__info2' >
                    {isLoading && <LoadingSpinner asOverlay />}
                    <Button id="note-item" onClick={openMapHandler}   >
                   <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                        > 
                            <h5 style={{ textAlign:"left", paddingLeft:"10px"}}>{props.note.substring(0, 75)}</h5>
                      </OverlayTrigger> 
                    </Button>
                </Card>
            </li>
        </React.Fragment >
    );
};

export default NoteItem;


