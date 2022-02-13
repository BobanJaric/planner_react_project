const vip = (props) => {

    let vips = [];
    props.airportsData.forEach(airport => {
        if (airport.vip === 'yes') {
            vips.push(airport.icao);
        }
    });

    let vip = [];
    let originIcaoCheck2 = [props.originIcao1, props.originIcao2, props.originIcao3, props.originIcao4];
    for (let i = 0; i < 4; i++) {
        if (vips.includes(originIcaoCheck2[i])) {
            vip[i + 1] = true;
        } else {
            vip[i + 1] = false;
        }
    }
    return vip;

}

export default vip;