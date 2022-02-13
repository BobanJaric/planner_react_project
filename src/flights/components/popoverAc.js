import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const PopoverAc = (props) => {

  const svlNalet = Number(props.ac.nextMaintenance);
  const SvlPredicted = (Number(props.aircraftMsp[props.i]) + Number(props.ac.totalTime)).toFixed(1);
  const SvlPredictedOrange = (Number(props.aircraftMsp[props.i]) + Number(props.ac.totalTime) + Number(50)).toFixed(1);

  let aircraftColor;
  if (SvlPredicted > svlNalet) {
    aircraftColor = 'red';
  } else if (svlNalet <= SvlPredictedOrange) {
    aircraftColor = 'orange';
  } else {
    aircraftColor = 'white';
  }

  const popoverAc = <Popover id="popover-basic3">
    <Popover.Title as="h3">Nalet Aviona</Popover.Title>
    <Popover.Content>
      Radovi na: {svlNalet}<br />
      Trenutno stanje + prodati letovi :{SvlPredicted}<br />
      Ostalo do radova: {(svlNalet - SvlPredicted).toFixed(1)}
    </Popover.Content>
  </Popover>

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popoverAc}  >
      <td className="svl" style={{ color: aircraftColor }}  >{props.ac.aircraft}<br /> ({props.aircraftMsp[props.i]})<br /><br /><br />
      </td>
    </OverlayTrigger>
  )

};


export default PopoverAc;


