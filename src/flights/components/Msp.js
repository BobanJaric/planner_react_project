const Msp= (props, reg) =>{
let curYear = props.currentDate.split('-')[0];
  let curMonth = props.currentDate.split('-')[1];

  function firstDayCurMonth() {
    if (curMonth - 1 === 0) {
      return `${curYear - 1}-12-26`;
    } else {
      return `${curYear}-${curMonth - 1}-26`;
    }
  }

  let firstDay = firstDayCurMonth();
  let lastDay = Date.parse(`${curYear}-${curMonth}-26`);

  if (props.currentDate.split('-')[2] >= 26) {
    firstDay = `${curYear}-${curMonth}-26`;
    lastDay = Date.parse(`${curYear}-${Number(curMonth) + 1}-26`);

  }
  const dateNum = Date.parse(firstDay);


    const loadedPlace1 = props.items.map(place => {
      if (place.registration === reg && Date.parse(place.date1) >= dateNum && Date.parse(place.date1) < lastDay)
        return [place.msp1, place.msp2, place.msp3, place.msp4]
          .filter(Number)
          .map(i => Number(i))
          .reduce(function (acc, val) { return acc + val; }, 0);
      ;
      return null;
    }).filter(Boolean);

    return loadedPlace1.map(i => Number(i)).reduce(function (acc, val) { return acc + val; }, 0);

  }

  export default Msp;