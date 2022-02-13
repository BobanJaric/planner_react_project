const slotDest = (props) => {

  let slots = [];
  props.airportsData.forEach(airport => {
    if (airport.slot === 'yes') {
      slots.push(airport.icao);
    }
  });

  let slotDest = [];
  let destinationIcao = [props.destinationIcao1, props.destinationIcao2, props.destinationIcao3, props.destinationIcao4];
  for (let i = 0; i < 4; i++) {
    if (slots.includes(destinationIcao[i])) {
      slotDest[i + 1] = true;
    } else {
      slotDest[i + 1] = false;
    }
  }
  return slotDest;
}

export default slotDest;