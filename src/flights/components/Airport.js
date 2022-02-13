import React from 'react';

import './PlaceItem.css';


const Airport = props =>{

    return(
        <div className="place-item">
           <select value={props.value} onChange={props.onChange} name={props.name} >
                    <option value="">--select Hendler--</option>   
                    <option value= {props.hendler1}  >{props.hendler1.split(' ')[0]} </option>
                    <option value={props.hendler2}  >{props.hendler2.split(' ')[0]} </option>
                    <option value={props.hendler3}  >{props.hendler3.split(' ')[0]} </option>
                    <option value={props.hendler4}  >{props.hendler4.split(' ')[0]} </option>
                  </select>
 
        </div>
    );
};

export default Airport;