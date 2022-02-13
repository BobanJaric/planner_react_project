const permit = (props) => {

    let pmt = [];
    let originIcaoCheck = [props.originIcao1, props.originIcao2, props.originIcao3, props.originIcao4];

    let pmts = [];
    props.airportsData.forEach(airport => {
        if (airport.doz === 'yes') {
            pmts.push(airport.icao);
        }
    });


    for (let i = 0; i < 4; i++) {
        if (pmts.includes(originIcaoCheck[i])) {
            pmt[i + 1] = true;
        } else {
            pmt[i + 1] = false;
        }
    }

    return pmt;

}

export default permit;