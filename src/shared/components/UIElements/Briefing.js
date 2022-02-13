const briefing = (props) => {

  let dates = [props.date1, props.date2, props.date3, props.date4];

  let correctedDates = [];
  dates.forEach(date => {
    if (date !== "") {
      let dateNum = new Date(date).getDate();

      if (dateNum.toString().length === 2) {
        correctedDates.push(dateNum + '-' + new Date(date).toLocaleString('default', { month: 'short' }));
      } else {
        correctedDates.push('0' + dateNum + '-' + new Date(date).toLocaleString('default', { month: 'short' }));
      }

    } else {
      correctedDates.push("");
    }

  });


  const func = (hndInput) => {

    let arr = hndInput.split(",");

    for (var i = 0; i < arr.length; i++) {

      if (arr[i].includes("@")) {
        arr.splice(i, 1);
        i--;
      }
    };

    return arr.join(" ");
  }

  let hndOrg = func(props.hendlerOrigin);
  let hndDest1 = func(props.hendlerDestination1);
  let hndDest2 = func(props.hendlerDestination2);
  let hndDest3 = func(props.hendlerDestination3);


  if (!props.originIcao4){
    hndDest3="";
  };


  let legData1 = '';
  if (props.originIcao1) {
    legData1 = `${correctedDates[0]} ${props.departureTime1} utc  ${props.originIcao1}… ${props.destinationIcao1} ${props.arrivalTime1} utc , ${props.paxnbr1} pax `;
  }

  let legData2 = '';
  if (props.originIcao2) {
    legData2 = `${correctedDates[1]} ${props.departureTime2} utc ${props.originIcao2}… ${props.destinationIcao2}  ${props.arrivalTime2} utc , ${props.paxnbr2} pax  `;
  }

  let legData3 = '';
  if (props.originIcao3) {
    legData3 = `${correctedDates[2]} ${props.departureTime3} utc ${props.originIcao3}… ${props.destinationIcao3}  ${props.arrivalTime3} utc , ${props.paxnbr3} pax `;
  }

  let legData4 = '';
  if (props.originIcao4) {
    legData4 = `${correctedDates[3]} ${props.departureTime4} utc ${props.originIcao4}… ${props.destinationIcao4}  ${props.arrivalTime4} utc , ${props.paxnbr4} pax `;
  }
  const element = document.createElement("a");
  const file = new Blob([
    `
SCHEDULE:  \r\n
${legData1}
${legData2}
${legData3}
${legData4}\r\n
SPECIAL NOTE: \r\n
AIRPORTS INFO: \r\n
${props.originIcao1}  
${hndOrg}  \r\n
${props.destinationIcao1}  
${hndDest1}  \r\n
${props.destinationIcao2}  
${hndDest2}  \r\n
${props.destinationIcao3}  
${hndDest3}  \r\n
      `
  ], { type: 'text/plain;charset=utf-8' });
  element.href = URL.createObjectURL(file);
  element.download = "briefing.txt";
  document.body.appendChild(element);
  element.click();
};


export default briefing;