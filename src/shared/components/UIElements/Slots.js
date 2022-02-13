const slots = (props) => {

  let slots = [];
  props.airportsData.forEach(airport => {
    if (airport.slot === 'yes') {
      slots.push(airport.icao);
    }
  });

  let slot = [];
  let originIcao = [props.originIcao1, props.originIcao2, props.originIcao3, props.originIcao4];
  for (let i = 0; i < 4; i++) {
    if (slots.includes(originIcao[i])) {
      slot[i + 1] = true;
    } else {
      slot[i + 1] = false;
    }
  }
  return slot;
}

export default slots;