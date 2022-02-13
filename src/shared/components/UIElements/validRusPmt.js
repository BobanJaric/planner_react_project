const validRusPmt = (props) => {

  let validRus = false;
  let icaoAirports = [props.originIcao1.substring(0, 2), props.originIcao2.substring(0, 2), props.originIcao3.substring(0, 2),
     props.originIcao4.substring(0, 2), props.destinationIcao1.substring(0, 2), props.destinationIcao2.substring(0, 2), props.destinationIcao3.substring(0, 2), props.destinationIcao4.substring(0, 2)];
  if (icaoAirports.includes('UU') || icaoAirports.includes('UL') || icaoAirports.includes('UW') || icaoAirports.includes('UR')) {
    validRus = true;
  }
  return validRus;

}

export default validRusPmt;