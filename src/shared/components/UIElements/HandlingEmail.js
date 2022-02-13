const handlerEmail = (correctedDates, departureTime1, originIcao1, destinationIcao1, arrivalTime1, paxnbr1,
  departureTime2, originIcao2, destinationIcao2, arrivalTime2, paxnbr2, registration, callsign) => {


  let legData1 = '';
  if (originIcao1) {
    legData1 = `${correctedDates[0]} ${departureTime1} utc  ${originIcao1}… ${destinationIcao1} ${arrivalTime1} utc , ${paxnbr1} pax `;
  }

  let legData2 = '';
  if (originIcao2) {
    legData2 = `${correctedDates[1]} ${departureTime2} utc ${originIcao2}… ${destinationIcao2}  ${arrivalTime2} utc , ${paxnbr2} pax  `;
  }


  return `Good day,\r\n
Reg:            ${registration} 
Flt number:${callsign} 
Type:          Cessna
Operator:  Aviation \r\n
AIR-TAXI FLIGHT \r\n
Please arrange HANDLING, LANDING ,SLOT at ${destinationIcao1} : 

${legData1}
${legData2}

Best regards,
Boban Jaric

      `

};

export default handlerEmail;
