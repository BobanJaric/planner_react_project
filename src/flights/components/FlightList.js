import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import FlightItem from './FlightItem';
import NoteItem from './NoteItem';
import SearchBar from './SearchBar';
import Button from '../../shared/components/FormElements/Button';

import Head from './head';
import dates from './dates';
import Msp from './Msp';
import PopoverAc from './popoverAc';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './FlightList.css';

const FlightList = (props) => {

  // eslint-disable-next-line
  const [index, setIndex] = useState(7);
  const [aircrafts, setAircrafts] = useState(props.aircraft);

  let dateIndex = dates.indexOf(props.currentDate);
  let maintenanceClass;

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
      <FlightItem
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
        handling={item.handling}
        selectCapt={item.selectCapt}
        doz={item.doz}
        slot={item.slot}
        crew={item.crew}
        ovf={item.ovf}
        vip={item.vip}
        note={item.note}
        noteOps={item.noteOps}
        airportsData={item.airportsData}
        onDelete={props.onDeletePlace}
        currentDate={props.currentDate}
        loadedCrew={props.loadedCrew}

      />
    </div>
  );

  let sevenDays = dates.slice(dateIndex, dateIndex + index);

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

  let aircraftMsp = [];
  if (props.aircraft === undefined) {
    return;
  }
  props.aircraft.map(ac => {
    aircraftMsp.push(Msp(props, ac.aircraft).toFixed(1));
  });



  return (
    <div className="table-div">
      <div className="date-picker">
        <div className="date-block">
          <button className="button-2" onClick={props.forteenDays} id="prevWeek" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg></button>
          <button className="button-2" id="previous" onClick={props.prevDate}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg></button>
          <DatePicker
            id="selectDate"
            className="button-2"
            key={Math.random()}
            onChange={date => props.setStartDate(date)}
            withPortal
          />
          <button className="button-2" id="next" onClick={props.nextDate}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg></button>
          <button className="button-2" onClick={props.sevenDay} id="nextWeek" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg></button>
        </div>
        <div className="search-bar">
          <SearchBar props={props.items} />
        </div>
      </div>
      <table className="table"  >
        <thead>
          <Head name={props.currentDate} index={index} validDate={props.validDate}  />
        </thead>
        <tbody>

          {aircrafts.map((ac, i) => {
            return (
              <tr key={i}>
                <PopoverAc ac={ac} aircraftMsp={aircraftMsp} i={i} />
                {sevenDays.map(date => {
                  if (new Date(date).getTime() < new Date(ac.endMaintenance).getTime() && new Date(date).getTime() >= new Date(ac.startMaintenance).getTime()) {
                    maintenanceClass = 'maintenance';
                  } else {
                    maintenanceClass = '';
                  }
                  if ((props.currentDate <= date)) {
                    return <td key={Math.random()} className={maintenanceClass}>
                      {itemSorted.map(item => {
                        if (item.registration === ac.aircraft && item.date1 === date) {
                          return flight(item, date);
                        } else if (item.registration === ac.aircraft && item.date2 === date) {
                          return flight(item, date);
                        } else if (item.registration === ac.aircraft && item.date3 === date) {
                          return flight(item, date);
                        } else if (item.registration === ac.aircraft && item.date4 === date) {
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
            )
          }
          )
          }
          <tr>
            <td className="note"></td>
            {sevenDays.map(date => {
              if ((props.currentDate <= date)) {
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
    </div>);

};

export default FlightList;