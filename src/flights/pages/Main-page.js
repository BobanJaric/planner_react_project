import React from 'react';

import Input from '../../shared/components/FormElements/Input';

import { VALIDATOR_REQUIRE} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook'; 

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Capt from './capt';
import Copilot from './copilot';
import Acm from './acm';
import Pax from './pax';
import DatePicker from 'react-datepicker';

const MainPage= ({aircraft, changed, startDate, handleChangedate, checkRusApi, checkItalApi, capt, copilot, acm , paxnbr, onClickAdd, onClickCheck, 
    onClick, onClick2, onClick3,check, add})  =>{

         const [formState, inputHandler ] = useForm(
        {
          aircraft: {
            value: '',
            isValid: false
          }      
        },
        false
      );
      
     
    return  (
        <React.Fragment>
          <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 2, offset: 5 }}>
                <DatePicker className="Date"
                  selected={startDate}
                  value={startDate}
                  onChange={handleChangedate}
                  name="startDate"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Pick a Date" />
              </Col>
            </Row>
            <Row>
                <Col md={{ span: 2, offset: 5 }}>
                 <Input
                  id='aircraft'
                  element='select'   
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  name="aircraft" 
                  changed={changed} 
                  value={aircraft} 
                  
                /> 
                </Col>
              </Row>  
          </Container>
          <div className="Apt">
            <label>Origin Apt</label>
            <input type="text" placeholder="Origin Apt" name="origin" onChange={changed} />
            {!checkRusApi  && 
            <input type="text" placeholder="dep Time" name="depTime" onChange={changed} />
            }
            <label>Destination Apt</label>
            <input type="text" placeholder="Destination Apt" name="destination" onChange={changed} />
            {!checkRusApi  && 
            <input type="text"  placeholder="arr Time" name="arrTime" onChange={changed} />
            }
          </div>
          <div className="Details">
            <div>
              <label>Captain</label>
              <Capt value={capt} name="fullname1" changed={changed} />
            </div>
            {!check ?
              <div>
                <label>Captain</label>
                <Capt value={copilot} name="fullname2" changed={changed} />
              </div> :
              <div>
                <label>First officer</label>
                <Copilot value={copilot} name="fullname2" changed={changed} />
              </div>
            }
            <div>
              <label>ACM</label>
              <Acm value={acm} name="fullname3" changed={changed} />
            </div>
          </div>
            {!checkRusApi  &&
            <div>
              <label style={{margin:15}} >Pax Nbr</label>
              <select value={paxnbr} placeholder=" Pax Nbr" name="paxnbr" onChange={changed} style={{width:55,textAlign: 'center'}} >
                <option value="0" >0</option>
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
                <option value="6" >6</option>
                <option value="7" >7</option>
                <option value="8" >8</option>
              </select>
              </div>
              }
              <Pax info="1" changed={changed} checkRusApi={checkRusApi}  />
              <Pax info="2" changed={changed} checkRusApi={checkRusApi}  />
              <Pax info="3" changed={changed} checkRusApi={checkRusApi}  />
              <Pax info="4" changed={changed} checkRusApi={checkRusApi}  />
              {
               !add ?
                <div>
                  <Pax info="5" changed={changed} checkRusApi={checkRusApi}  />
                  <Pax info="6" changed={changed} checkRusApi={checkRusApi} />
                  <Pax info="7" changed={changed} checkRusApi={checkRusApi} />
                  <Pax info="8" changed={changed} checkRusApi={checkRusApi} />
                </div>
                : null
              }
                <Button  onClick={onClickAdd}>Add pax</Button>
              { checkRusApi &&
                <button className="btn btn-dark"  onClick={onClick}>Download GenDec</button>    
              }  
                
              {!checkRusApi &&
                <button className="btn btn-info" onClick={onClick2}>RUSKI API</button>
              }
              {!checkRusApi &&
                <button className="btn btn-info" onClick={onClick3}>ITAL API</button> 
              }
                <button type="button" className="btn btn-primary" onClick={onClickCheck}>Two Captains</button> 
        </div>

        </React.Fragment>
    );
};

export default MainPage;
