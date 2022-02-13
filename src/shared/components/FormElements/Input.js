import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';


const inputReducer = (state, action) => {


     switch (action.type) {
          case 'CHANGE':
               return {
                    ...state,
                    value: action.val,
                    isValid: validate(action.val, action.validators)
               };

          case 'TOUCH': {
               return {
                    ...state,
                    isTouched: true
               }
          }
          default:
               return state;
     }
};

const Input = props => {


     const [inputState, dispatch] = useReducer(inputReducer, {
          value: props.initialValue || '',
          isValid: props.initialValid || false,
          isTouched: false
     });

     const { id, onInput } = props;
     const { value, isValid } = inputState;

     useEffect(() => {
          onInput(id, value, isValid);
     }, [id, value, isValid, onInput]);

     const changeHandler = event => {
          let val1;
          if (event.target.id.substring(0, 7) === 'departu' && event.target.value.length === 4) {
               val1 = event.target.value.substring(0, 2) + ":" + event.target.value.substring(2, 4);
          } else if (event.target.id.substring(0, 7) === 'departu' && event.target.value.length !== 4) {
               val1 = event.target.value;
          } else if (event.target.id.substring(0, 7) === 'arrival' && event.target.value.length === 4) {
               val1 = event.target.value.substring(0, 2) + ":" + event.target.value.substring(2, 4);
          } else if (event.target.id.substring(0, 7) === 'arrival' && event.target.value.length !== 4) {
               val1 = event.target.value;
          }
          else if (event.target.id === 'originIcao1' || event.target.id === 'destinationIcao1' ||
               event.target.id === 'originIcao2' || event.target.id === 'destinationIcao2' ||
               event.target.id === 'originIcao3' || event.target.id === 'destinationIcao3' ||
               event.target.id === 'originIcao4' || event.target.id === 'destinationIcao4' || event.target.id === 'origin'
               || event.target.id === 'destination'

          ) {
               val1 = event.target.value.toUpperCase();
          } else {
               val1 = event.target.value;
          }

          if (val1.includes('::')) {
               val1 = val1.slice(0, 2) + ':' + val1.slice(4, 6);
          }
          dispatch({ type: 'CHANGE', val: val1, validators: props.validators });

     };

     const touchHandler = () => {
          dispatch({ type: 'TOUCH' });
     };


     const element = props.element === 'input' && props.errorText === "Please enter valid ICAO code" ? (
          <input
               className={props.type}
               id={props.id}
               type={props.type}
               placeholder={props.placeholder}
               onChange={changeHandler}
               onBlur={touchHandler}
               value={inputState.value}
          />
     ) :
          props.element === 'input' ? (
               <input
                    className={props.type}
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
               />
          )
               : props.element === 'select' && props.id === 'registration' ? (
                    <select
                         id={props.id}
                         onChange={changeHandler}
                         onBlur={touchHandler}
                         value={inputState.value}

                    >
                         <option value="">--Registration--</option>
                         <option onClick={props.setSelect} value="YUAAA">YUAAA</option>
                         <option value="YUBBB">YUBBB</option>
                         <option value="YUCCC">YUCCC</option>
                         <option value="YUDDD">YUDDD</option>
                    </select>
               ) : props.element === 'select' && props.id.slice(0, -1) === 'flightType' ? (
                    <select
                         id={props.id}
                         onChange={changeHandler}
                         onBlur={touchHandler}
                         value={inputState.value}
                    >
                         <option >--Flight Type--</option>
                         <option value="commercial">COMMERCIAL</option>
                         <option value="ferry">FERRY</option>
                         <option value="private">PRIVATE</option>
                         <option value="technical">TECHNICAL</option>
                         <option value="option">OPTION</option>
                         <option value="tehnika">TEHNIKA</option>
                    </select>
               ) :
                    props.element === 'select' && props.id === 'fullname1' ? (
                         <select
                              id={props.id}
                              onChange={changeHandler}
                              onBlur={touchHandler}
                              value={inputState.value}
                         >
                              <option defaultValue > -- Captain-- </option>
                              {
                                   props.crewData.map(cpt => {
                                        return (
                                             <option key={cpt.passport} value={cpt.fullname} >{cpt.fullname}</option>
                                        )
                                   })
                              }
                         </select>
                    ) :

                         props.element === 'select' && props.id === 'fullname2' && props.name === 'Captain' ? (
                              <select
                                   id={props.id}
                                   onChange={changeHandler}
                                   onBlur={touchHandler}
                                   value={inputState.value}
                              >
                                   <option defaultValue > -- Captain -- </option>
                                   {
                                        props.crewData.map(cpt => {
                                             return (
                                                  <option key={cpt.passport} value={cpt.fullname} >{cpt.fullname}</option>
                                             )
                                        })
                                   }
                              </select>
                         ) :
                              props.element === 'select' && props.id === 'fullname2' ? (
                                   <select
                                        id={props.id}
                                        onChange={changeHandler}
                                        onBlur={touchHandler}
                                        value={inputState.value}
                                   >
                                        <option defaultValue > -- F/O-- </option>
                                        {
                                             props.crewData.map(cpt => {
                                                  return (
                                                       <option key={cpt.passport} value={cpt.fullname} >{cpt.fullname}</option>
                                                  )
                                             })
                                        }
                                   </select>
                              ) :
                                   props.element === 'select' && props.id === 'fullname3' ? (
                                        <select
                                             id={props.id}
                                             onChange={changeHandler}
                                             onBlur={touchHandler}
                                             value={inputState.value}
                                        >
                                             <option defaultValue > -- Acm -- </option>
                                             {
                                                  props.crewData.map(cpt => {
                                                       return (
                                                            <option key={cpt.passport} value={cpt.fullname} >{cpt.fullname}</option>
                                                       )
                                                  })
                                             }
                                             <option value="No stw"   >No stw</option>

                                        </select>
                                   ) :
                                        props.element === 'select' && props.id === 'aircraft' ? (
                                             <select
                                                  id={props.id}
                                                  onChange={changeHandler}
                                                  onBlur={touchHandler}
                                                  value={inputState.value}
                                             >
                                                  <option defaultValue value="" > -- Aircarft -- </option>
                                                  <option value="YUAAA">YUAAA</option>
                                                  <option value="YUBBB">YUBBB</option>
                                                  <option value="YUCCC">YUCCC</option>
                                                  <option value="YUDDD">YUDDD</option>
                                             </select>
                                        ) :
                                             props.element === 'select' && props.id.slice(0, -1) === 'paxnbr' ? (
                                                  <select
                                                       id={props.id}
                                                       onChange={changeHandler}
                                                       onBlur={touchHandler}
                                                       value={inputState.value}
                                                  >
                                                       <option defaultValue value="" >-Nbr-</option>
                                                       <option value="0" >0</option>
                                                       <option value="1" >1</option>
                                                       <option value="2" >2</option>
                                                       <option value="3" >3</option>
                                                       <option value="4" >4</option>
                                                       <option value="5" >5</option>
                                                       <option value="6" >6</option>
                                                       <option value="7" >7</option>
                                                       <option value="8" >8</option>
                                                       <option value="TBA " > TBA</option>
                                                  </select>
                                             ) :
                                                  props.element === 'select' && props.id.substring(0, 7) === 'hendler' ? (<select
                                                       id={props.id}
                                                       onChange={changeHandler}
                                                       onBlur={touchHandler}
                                                       value={inputState.value}
                                                  >
                                                       <option value="">--Hendler--</option>
                                                       <option value={props.hendler1}  >{props.hendler1.split(',')[0]} </option>
                                                       <option value={props.hendler2}  >{props.hendler2.split(',')[0]} </option>
                                                       <option value={props.hendler3}  >{props.hendler3.split(',')[0]} </option>
                                                       <option value={props.hendler4}  >{props.hendler4.split(',')[0]} </option>
                                                       {props.hendler5 && <option value={props.hendler5}  >{props.hendler5.split(' ')[0]} </option>}
                                                  </select>) :
                                                   props.element === 'select' && props.id === 'role' ? (
                                                       <select
                                                            id={props.id}
                                                            onChange={changeHandler}
                                                            onBlur={touchHandler}
                                                            value={inputState.value}
                                                       >
                                                            <option defaultValue value="" > -- Select role -- </option>
                                                            <option value="admin">Admin</option>
                                                            <option value="sales">Sales</option>
                                                            <option value="user">User</option>
                                                       </select>
                                                  ) :
                                                       (
                                                            <textarea
                                                                 className={props.type}
                                                                 id={props.id}
                                                                 rows={props.rows || 2}
                                                                 onChange={changeHandler}
                                                                 onBlur={touchHandler}
                                                                 value={inputState.value}
                                                            />
                                                       );


     return (
          <div  >
               {props.label && <p id={props.label} htmlFor={props.id}>{props.label}</p>}
               {element}
               {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
          </div>
     );
};

export default Input;



