const validBlrPmt = (props) => {

    let validBlr = false;
    let icaoAirports = [
        props.originIcao1.substring(0, 2),
        props.originIcao2.substring(0, 2),
        props.originIcao3.substring(0, 2),
        props.originIcao4.substring(0, 2),
        props.destinationIcao1.substring(0, 2),
        props.destinationIcao2.substring(0, 2),
        props.destinationIcao3.substring(0, 2),
        props.destinationIcao4.substring(0, 2),
    ];

    if (icaoAirports.includes('UU') && ((icaoAirports.includes('LY') || icaoAirports.includes('LT') || icaoAirports.includes('LG')
    || icaoAirports.includes('LB')|| icaoAirports.includes('LR')|| icaoAirports.includes('LU')|| icaoAirports.includes('EY')
    || icaoAirports.includes('EP')|| icaoAirports.includes('ED')|| icaoAirports.includes('LO')|| icaoAirports.includes('LK')
    || icaoAirports.includes('LZ')|| icaoAirports.includes('LD')|| icaoAirports.includes('LQ')|| icaoAirports.includes('LI')
    || icaoAirports.includes('LS')|| icaoAirports.includes('LF')|| icaoAirports.includes('LM')|| icaoAirports.includes('LA')
     || icaoAirports.includes('LJ') || icaoAirports.includes('LH') || icaoAirports.includes('EB')|| icaoAirports.includes('EL') )
    )) {
        validBlr = true;
    } else if (icaoAirports.includes('UL') && (icaoAirports.includes('LC') || icaoAirports.includes('LT') || icaoAirports.includes('LB') || icaoAirports.includes('LR') || icaoAirports.includes('LG'))) {
        validBlr = true;
    }

    return validBlr;
    

}

export default validBlrPmt;