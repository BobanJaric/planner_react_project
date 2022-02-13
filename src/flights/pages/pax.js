
import React from 'react';

import './GenDec.css';

const pax = (props) => {
  return (
    <div className="DetailsPax">
      <label>Pax {props.info}</label>
      <input type="text" placeholder=" First__Last Name" name={`pax${props.info}name`} onChange={props.changed} />
      <input type="text" placeholder=" DOB" name={`pax${props.info}dob`} onChange={props.changed} />
      <input type="text" id="nationality" placeholder=" Nationality" name={`pax${props.info}nationality`} onChange={props.changed} />
      <input type="text" placeholder=" Passport" name={`pax${props.info}passport`} onChange={props.changed} />
      {!props.checkRusApi &&
        <div className="selectDiv">
          <select value={props.value} placeholder="DocType" id="doctype" name={`pax${props.info}doc`} onChange={props.changed}  >
            <option defaultValue> -- docType -- </option>
            <option value="3">Stranci</option>
            <option value="2">Rusi</option>
          </select>
        </div>
      }
      {(!props.checkRusApi || !props.checkGar) &&
        <select value={props.value} placeholder=" Gender" id="gender" name={`pax${props.info}gender`} onChange={props.changed}  >
          <option defaultValue> -- Gender -- </option>
          <option value="M"  >Male</option>
          <option value="F"   >Female</option>
        </select>
      }
      {!props.checkGar &&
        <div className="selectDiv">
          <input type="text" id="pob" placeholder=" PlaceOfBirth" name={`pax${props.info}pob`} onChange={props.changed} />
          <input type="text" id="doe" placeholder=" DateOfExp" name={`pax${props.info}doe`} onChange={props.changed} />
        </div>
      }
    </div>
  );
};

export default pax;
