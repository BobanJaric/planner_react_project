const vip = (props) => {

  let vips = [];
  props.airportsData.forEach(airport => {
    if (airport.vip === 'yes') {
      vips.push(airport.icao);
    }
  });

  let vipDest = [];
  let destinationIcaoCheck2 = [props.destinationIcao1, props.destinationIcao2, props.destinationIcao3, props.destinationIcao4];
  for (let i = 0; i < 4; i++) {
    if (vips.includes(destinationIcaoCheck2[i])) {
      vipDest[i + 1] = true;
    } else {
      vipDest[i + 1] = false;
    }
  }

  return vipDest;

}

export default vip;