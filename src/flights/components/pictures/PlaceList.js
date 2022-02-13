import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import NoteItem from './NoteItem';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

import Head from './head';
import dates from './dates';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PopoverContent from 'react-bootstrap/PopoverContent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const PlaceList = props => {


  /* const auth = useContext(AuthContext);
  const {  sendRequest } = useHttpClient(); */
  const [startDate, setStartDate] = useState(new Date());
  const [index, setIndex] = useState(7);
  /*   const [loadedNotes, setLoadedNotes] = useState(props.loadedNotes); */


  let currentDate = new Date(startDate).toISOString().slice(0, 10);

  /*   const loadedPlace1 = props.items.map(place => {
      console.log(place.date1.split('-')[1]);
      if(place.registration=== 'YUSPC'  && place.date1.split('-')[1]=== currentDate.split('-')[1] ){
        return [place.msp1,place.msp2, place.msp3,place.msp4].filter(Number).map(i => Number(i)).reduce(function (acc, val) { return acc + val; }, 0);
      };   
    }).filter( Boolean );
  
    let spcMsp = loadedPlace1.map(i => Number(i)).reduce(function (acc, val) { return acc + val; }, 0); */

  function Msp(reg) {
    const loadedPlace1 = props.items.map(place => {
      /*     console.log(place.date1.split('-')[1]); */
      if (place.registration === reg && place.date1.split('-')[1] === currentDate.split('-')[1])
        return [place.msp1, place.msp2, place.msp3, place.msp4]
          .filter(Number)
          .map(i => Number(i))
          .reduce(function (acc, val) { return acc + val; }, 0);
      ;
      return null;
    }).filter(Boolean);

    return loadedPlace1.map(i => Number(i)).reduce(function (acc, val) { return acc + val; }, 0);
  }

  let svlMsp = Msp('YUSVL').toFixed(1);
  let spcMsp = Msp('YUSPC').toFixed(1);
  let svjMsp = Msp('YUSVJ').toFixed(1);
  let scjMsp = Msp('YUSCJ').toFixed(1);
  /* 
    useEffect(()=>{
      const fetchNotes= async ()=>{
  
        try{
        const responseData = await sendRequest('http://localhost:5000/api/places/notes/all','GET',null,
        {
          'Content-Type':'application/json',
          Authorization: 'Bearer '+ auth.token
         
         });
        
  
          setLoadedNotes(responseData.notes);  
  
        }catch(err){
  
        }
      };
      fetchNotes();
      
    },[sendRequest, auth.token]);
          
    console.log(loadedNotes); */

  /*  const onDeleteNote = deletedNoteId=>{
 
     props.setLoadedNotes(prevNotes => prevNotes.filter(note=> note._id!==deletedNoteId));
 
   }; */


  let regSpc;


  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Flights Found. Maybe create one?</h2>
          <Button to="/places/new" >Create Flight </Button>
        </Card>
      </div>)
      ;
  };

  const flight = (item, date) => (

    <div className="place-list" key={item._id}  >
      <PlaceItem

        id={item.id}
        flightType1={item.flightType1}
        flightType2={item.flightType2}
        flightType3={item.flightType3}
        flightType4={item.flightType4}
        paxnbr1={item.paxnbr1}
        paxnbr2={item.paxnbr2}
        paxnbr3={item.paxnbr3}
        paxnbr4={item.paxnbr4}
        msp1={item.msp1}
        msp2={item.msp2}
        msp3={item.msp3}
        msp4={item.msp4}
        date={date}
        date3={item.date3}
        date4={item.date4}
        date1={item.date1}
        date2={item.date2}
        departureTime1={item.departureTime1}
        departureTime2={item.departureTime2}
        departureTime3={item.departureTime3}
        departureTime4={item.departureTime4}
        arrivalTime1={item.arrivalTime1}
        arrivalTime2={item.arrivalTime2}
        arrivalTime3={item.arrivalTime3}
        arrivalTime4={item.arrivalTime4}
        hendlerDestination1={item.hendlerDestination1}
        hendlerDestination2={item.hendlerDestination2}
        hendlerDestination3={item.hendlerDestination3}
        hendlerDestination4={item.hendlerDestination4}
        destinationIcao1={item.destinationIcao1}
        destinationIcao2={item.destinationIcao2}
        destinationIcao3={item.destinationIcao3}
        destinationIcao4={item.destinationIcao4}
        originIcao1={item.originIcao1}
        originIcao2={item.originIcao2}
        originIcao3={item.originIcao3}
        originIcao4={item.originIcao4}
        registration={item.registration}
        callsign={item.callsign}
        broker1={item.broker1}
        broker2={item.broker2}
        broker3={item.broker3}
        broker4={item.broker4}
        creatorId={item.creator}
        hendlerOrigin={item.hendlerOrigin}
        hendlerOrigin1={item.hendlerOrigin1}
        hendlerOrigin2={item.hendlerOrigin2}
        hendlerOrigin3={item.hendlerOrigin3}
        brief={item.brief}
        brief2={item.brief2}
        brief3={item.brief3}
        brief4={item.brief4}
        agreement={item.agreement}
        agreement2={item.agreement2}
        agreement3={item.agreement3}
        agreement4={item.agreement4}
        racun={item.racun}
        racun2={item.racun2}
        racun3={item.racun3}
        racun4={item.racun4}
        ket={item.ket}
        ket2={item.ket2}
        ket3={item.ket3}
        ket4={item.ket4}
        price1={item.price1}
        price2={item.price2}
        price3={item.price3}
        price4={item.price4}
        manjak1={item.manjak1}
        manjak2={item.manjak2}
        manjak3={item.manjak3}
        manjak4={item.manjak4}
        fltrac1={item.fltrac1}
        fltrac2={item.fltrac2}
        fltrac3={item.fltrac3}
        fltrac4={item.fltrac4}
        payment1={item.payment1}
        payment2={item.payment2}
        payment3={item.payment3}
        payment4={item.payment4}
        handling={item.handling}
        selectCapt={item.selectCapt}
        doz={item.doz}
        slot={item.slot}
        crew={item.crew}
        ovf={item.ovf}
        vip={item.vip}
        note={item.note}
        noteOps={item.noteOps}
        onDelete={props.onDeletePlace}
        currentDate={currentDate}
      />
    </div>
  );


  let dateIndex = dates.indexOf(currentDate);
  let sevenDays = dates.slice(dateIndex, dateIndex + index);

  const nextDate = () => {
    const nextDate = dates[dateIndex + 1];
    setStartDate(new Date(nextDate));
  };

  const prevDate = () => {
    const prevDate = dates[dateIndex - 1];
    setStartDate(new Date(prevDate));
  };

  const validDate = () => {
    setStartDate(new Date());
  };

  /*  let currentDate = new Date(startDate).toISOString().slice(0, 10); */

  const forteenDays = () => {
    const nextDate = dates[dateIndex - 7];
    setStartDate(new Date(nextDate));
  };

  const sevenDay = () => {
    const nextDate = dates[dateIndex + 7];
    setStartDate(new Date(nextDate));
  };

  // ubaciti ceo ovaj deo 

  const itemSorted2 = props.items.sort((a, b) => {
    let aDate = a.date1;
    let bDate = b.date1;
    return new Date(aDate) - new Date(bDate)
    }
  );

  const itemSorted = itemSorted2.sort((a, b) => {
    return parseInt(a.departureTime1) - parseInt(b.departureTime1);
    }
  );



  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Nalet Aviona</Popover.Title>
      <Popover.Content>
      Sa onih +25h ostalo je jos cca 18.5h.
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="table-div">
      <div className="date-picker">
        <button className="button-2" onClick={forteenDays} id="prevWeek" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg></button>
        <button className="button-2" id="previous" onClick={prevDate}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg></button>
        <DatePicker
          id="selectDate"
          className="button-2"
          key={Math.random()}
          onChange={date => setStartDate(date)}
          withPortal
        />
        {/*   <button className="button-2" onClick={validDate} id="currentDate" ></button> */}
        <button className="button-2" id="next" onClick={nextDate}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg></button>
        <button className="button-2" onClick={sevenDay} id="nextWeek" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg></button>
      </div>
      {/*  <div className="date-picker">
         <button className="button-2" id="previous" onClick={prevDate}></button> 
        <DatePicker
        id="selectDate"
          className="button-2"
          key={Math.random()}
           selected={startDate} 
          onChange={date => setStartDate(date)}
          withPortal
        />
        <button className="button-2" id="next" onClick={nextDate}></button> 
      </div> */}
      <table className="table"  >
        <thead>
          <Head name={currentDate} index={index} validDate={validDate} />
        </thead>
        <tbody>
          <tr>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <td className="svl">YUSVL<br /> ({svlMsp})</td>
            </OverlayTrigger>
            {sevenDays.map(date => {
              if ((currentDate <= date)) {
                return <td key={Math.random()}>
                  {itemSorted.map(item => {
                    if (item.registration === 'YUSVL' && item.date1 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSVL' && item.date2 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSVL' && item.date3 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSVL' && item.date4 === date) {
                      return flight(item, date);
                    } else {
                      return null;
                    }
                  })}
                </td>
              } else {
                return null;
              }
            }
            )}
          </tr>
          <tr>
            <td className="spc">YUSPC <br /> ({spcMsp})</td>
            {sevenDays.map(date => {
              if ((currentDate <= date)) {
                if (new Date(date).getTime() < new Date('2021-04-15').getTime() && new Date(date).getTime() > new Date('2021-02-26').getTime()) {
                  regSpc = 'regSvj';
                }
                return <td key={Math.random()} className={regSpc}>
                  {props.items.map(item => {
                    if (item.registration === 'YUSPC' && item.date1 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSPC' && item.date2 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSPC' && item.date3 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSPC' && item.date4 === date) {
                      return flight(item, date);
                    } else {
                      return null;
                    }
                  })}
                </td>
              } else {
                return null;
              }
            }
            )}
          </tr>
          <tr>
            <td className="svj"  >YUSVJ<br /> ({svjMsp})</td>
            {sevenDays.map(date => {
              if ((currentDate <= date)) {
                /*         console.log(sevenDays);
                        if (new Date(date).getTime() > new Date('2021-01-25').getTime() && new Date(date).getTime() < new Date('2021-03-02').getTime()) {
                          regSvj = 'regSvj';
                        } */
                return <td key={Math.random()} id={`id${date.split('-')[2]}${date.split('-')[1]}`}>
                  {props.items.map(item => {
                    if (item.registration === 'YUSVJ' && item.date1 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSVJ' && item.date2 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSVJ' && item.date3 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSVJ' && item.date4 === date) {
                      return flight(item, date);
                    }
                    else {
                      return null;
                    }
                  })}
                </td>
              } else {
                return null;
              }
            }
            )}
          </tr>
          <tr>
            <td className="scj">YUSCJ<br />({scjMsp})<br />{/* <FontAwesomeIcon icon={faPlane} rotation={270} border size="3x" /> */} </td>
            {sevenDays.map(date => {
              if ((currentDate <= date)) {
                return <td key={Math.random()}>
                  {props.items.map(item => {
                    if (item.registration === 'YUSCJ' && item.date1 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSCJ' && item.date2 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSCJ' && item.date3 === date) {
                      return flight(item, date);
                    } else if (item.registration === 'YUSCJ' && item.date4 === date) {
                      return flight(item, date);
                    } else {
                      return null;
                    }
                  })}
                </td>
              } else {
                return null;
              }
            }
            )}
          </tr>

          <tr>
            <td className="note"></td>
            {sevenDays.map(date => {
              if ((currentDate <= date)) {
                return <td key={Math.random()}>
                  {props.loadedNotes.map(item => {
                    if (item.date === date) {
                      return <NoteItem date={item.date} note={item.note} id={item.id} key={item.id} onDelete={props.onDeleteNote} />;
                    } else {
                      return null;
                    }
                  })}
                </td>
              } else {
                return null;
              }
            }
            )}
          </tr>
        </tbody>
      </table>
      <footer></footer>


    </div>)
};

export default PlaceList;
