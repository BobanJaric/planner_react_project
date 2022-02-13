import dates from './dates';

import './FlightItem.css';


const Head = (props) => {
  let dateIndex = dates.indexOf(props.name);
  let sevenDays = dates.slice(dateIndex, dateIndex + props.index);

  return (
    <tr className="tr-maintable">
      <th ><button className="button-3" onClick={props.validDate}   ></button></th>
      {sevenDays.map(date => {
        let date1 = new Date(date);
        let month = date1.toLocaleString('default', { month: 'short' });
        let day = date1.getDate();
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let dayInweek = days[date1.getDay()];
        if ((props.name <= date)) {
          return <th key={date}>
            <span>{day}.{month} ({dayInweek})</span>
          </th>;
        } else {
          return null;
        }

      }
      )}
    </tr>
  )
}

export default Head;