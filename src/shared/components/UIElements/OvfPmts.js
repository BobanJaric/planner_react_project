const ovfPmts = (props) => {
  let ovfPmt = [];
  let originIcaoCheck1 = [props.originIcao1, props.originIcao2, props.originIcao3, props.originIcao4];
  let destinationIcaoCheck1 = [props.destinationIcao1, props.destinationIcao2, props.destinationIcao3, props.destinationIcao4];
 
  for (let i = 0; i < 4; i++) {
    if (originIcaoCheck1[i].substring(0, 2) === 'UU') {
      switch (destinationIcaoCheck1[i].substring(0, 2)) {
        case 'LY':
        case 'LT':
        case 'LG':
        case 'LB':
        case 'LR':
        case 'LU':
        case 'EY':
        case 'EP':
        case 'ED':
        case 'LO':
        case 'LK':
        case 'LZ':
        case 'LD':
        case 'LQ':
        case 'LI':
        case 'LS':
        case 'LF':
        case 'LM':
        case 'LA':
        case 'LJ':
        case 'LH':
        case 'EB':
        case 'EL':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    } else if(destinationIcaoCheck1[i].substring(0, 2) === 'UU'){
      switch (originIcaoCheck1[i].substring(0, 2)) {
        case 'LY':
        case 'LT':
        case 'LG':
        case 'LB':
        case 'LR':
        case 'LU':
        case 'EY':
        case 'EP':
        case 'ED':
        case 'LO':
        case 'LK':
        case 'LZ':
        case 'LD':
        case 'LQ':
        case 'LI':
        case 'LS':
        case 'LF':
        case 'LM':
        case 'LA':
        case 'LJ':
        case 'LH':
        case 'EB':
        case 'EL':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }else if(destinationIcaoCheck1[i].substring(0, 2) === 'UL'){
      switch (originIcaoCheck1[i].substring(0, 2)) {
        case 'LC':
        case 'LG':
        case 'LT':
        case 'LR':
        case 'LB':
        case 'LU':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }else if( originIcaoCheck1[i].substring(0, 2) === 'UL'){
      switch (destinationIcaoCheck1[i].substring(0, 2)) {
        case 'LC':
        case 'LG':
        case 'LT':
        case 'LR':
        case 'LB':
        case 'LU':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }else if( originIcaoCheck1[i].substring(0, 2) === 'EV'){
      switch (destinationIcaoCheck1[i].substring(0, 2)) {
        case 'LC':
        case 'LT':
        case 'UK':
        case 'LB':
        case 'LU':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }else if( originIcaoCheck1[i].substring(0, 2) === 'EY'){
      switch (destinationIcaoCheck1[i].substring(0, 2)) {
        case 'LC':
        case 'LT':
        case 'UK':
        case 'LB':
        case 'LU':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }else if( originIcaoCheck1[i].substring(0, 2) === 'EE'){
      switch (destinationIcaoCheck1[i].substring(0, 2)) {
        case 'LC':
        case 'LT':
        case 'UK':
        case 'LB':
        case 'LU':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }else if( destinationIcaoCheck1[i].substring(0, 2) === 'EV'){
      switch ( originIcaoCheck1[i].substring(0, 2)) {
        case 'LC':
        case 'LT':
        case 'UK':
        case 'LB':
        case 'LU':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }else if( destinationIcaoCheck1[i].substring(0, 2) === 'EY'){
      switch ( originIcaoCheck1[i].substring(0, 2)) {
        case 'LC':
        case 'LT':
        case 'UK':
        case 'LB':
        case 'LU':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }else if( destinationIcaoCheck1[i].substring(0, 2) === 'EE'){
      switch ( originIcaoCheck1[i].substring(0, 2)) {
        case 'LC':
        case 'LT':
        case 'UK':
        case 'LB':
        case 'LU':
          ovfPmt[i + 1] = true;
          break;
        default:
          ovfPmt[i + 1] = false;
      }
    }
  }
  return ovfPmt;

}

export default ovfPmts;