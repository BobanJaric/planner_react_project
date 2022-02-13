const permitDest = (props) => {

    let pmtDest = [];
    let destinationIcaoCheck = [props.destinationIcao1, props.destinationIcao2, props.destinationIcao3, props.destinationIcao4];

    let pmts = [];
    props.airportsData.forEach(airport => {
        if(airport.doz==='yes'){
            pmts.push(airport.icao);
        }
    });


  for (let i = 0; i < 4; i++) {
    if (pmts.includes(destinationIcaoCheck[i])) {
      pmtDest[i + 1] = true;
    } else {
      pmtDest[i + 1] = false;
    }
  }


    return pmtDest;

}

export default permitDest;