let startDate = new Date("2021-01-01"); //YYYY-MM-DD
let endDate = new Date("2022-12-31"); //YYYY-MM-DD

let getDateArray = function (start, end) {
    // eslint-disable-next-line
    let arr = new Array();
    let dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt).toISOString().slice(0, 10));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

let datesNames = getDateArray(startDate, endDate);

datesNames.splice(86, 1);
datesNames.splice(449, 1);
datesNames.splice(303, 0, "2021-10-31");

export default datesNames;