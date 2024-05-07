import { BarChart } from "@mui/x-charts"
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const dsd=  [{
    "severeLevel": 1,
    "visitDate": null,
    "nextAppointmentDate": null,
    "_id": "66256793dc61cd492273147a",
    "fullName": "Wolansa Tariku",
    "atrNumber": "T123",
    "birthDate": "2024-01-11T00:00:00.000Z",
    "sex": "Male",
    "phoneNumber": "+251930651099",
    "subCity": "Bolde",
    "kebele": "m211",
    "houseNumber": "121",
    "__v": 0,
    "createdAt": "2024-05-07T12:25:42.481Z"
},
{
    "severeLevel": 3,
    "visitDate": null,
    "nextAppointmentDate": null,
    "_id": "66336553f55b2beba2aca3bf",
    "fullName": "Dagi Tru",
    "atrNumber": "T124",
    "birthDate": "2024-01-11T00:00:00.000Z",
    "sex": "Female",
    "phoneNumber": "+251930651099",
    "subCity": "Bole",
    "kebele": "m211",
    "houseNumber": "121",
    "__v": 0,
    "createdAt": "2024-05-07T12:25:42.481Z"
},
{
    "_id": "66363f7a854e53d52dc9b009",
    "fullName": "Dona Trum",
    "atrNumber": "T125",
    "birthDate": "2024-01-11T00:00:00.000Z",
    "sex": "Female",
    "severeLevel": 2,
    "phoneNumber": "+251930651099",
    "subCity": "Bolde",
    "kebele": "m211",
    "houseNumber": "121",
    "visitDate": "2024-05-04T00:00:00.000Z",
    "nextAppointmentDate": "2024-05-30T00:00:00.000Z",
    "createdAt": "2024-05-04T14:00:26.005Z",
    "__v": 0
},
{
    "visitDate": null,
    "nextAppointmentDate": null,
    "_id": "6636402a161ba925d30270ca",
    "fullName": "Dona Trum",
    "atrNumber": "T126",
    "birthDate": "2024-01-11T00:00:00.000Z",
    "sex": "Male",
    "severeLevel": 2,
    "phoneNumber": "+251930651099",
    "subCity": "Bole",
    "kebele": "m211",
    "houseNumber": "121",
    "createdAt": "2024-05-04T14:03:22.251Z",
    "__v": 0
},
{
    "_id": "6636416c624138cc5a6dec14",
    "fullName": "Dona Trum",
    "atrNumber": "T127",
    "birthDate": "2024-01-11T00:00:00.000Z",
    "sex": "Male",
    "severeLevel": 1,
    "phoneNumber": "+251930651099",
    "subCity": "Bole",
    "kebele": "m211",
    "houseNumber": "121",
    "visitDate": "2024-05-04T00:00:00.000Z",
    "nextAppointmentDate": "2024-05-30T00:00:00.000Z",
    "createdAt": "2024-05-04T14:08:44.230Z",
    "__v": 0
},
{
    "_id": "66364184624138cc5a6dec18",
    "fullName": "Dona Trum",
    "atrNumber": "T128",
    "birthDate": "2024-01-11T00:00:00.000Z",
    "sex": "Female",
    "severeLevel": 2,
    "phoneNumber": "+251930651099",
    "subCity": "Bofle",
    "kebele": "m211",
    "houseNumber": "121",
    "visitDate": "2024-04-05T00:00:00.000Z",
    "nextAppointmentDate": "2024-05-05T00:00:00.000Z",
    "createdAt": "2024-05-06T14:09:08.021Z",
    "__v": 0
}
]
function countEntriesbydate(data, startDate, endDate, timeScale, categoryField = null) {
    let start = dayjs(startDate);
    let end = dayjs(endDate).add(1, timeScale);
    ;
    let result = [];
    let categories = {};
    let dateValues = [];

    // Initialize counts for each category for each day in the date range
    data.forEach(item => {
        let category = item[categoryField] || 'Uncategorized';
        categories[category] = Array(dayjs(end).diff(start, timeScale)).fill(0);
    });

    data.forEach(item => {
        let createdAt = dayjs(item.createdAt);
        if (createdAt.isAfter(start) && createdAt.isBefore(end)) {
            let category = item[categoryField] || 'Uncategorized';
            let index = createdAt.diff(start, timeScale);
            categories[category][index]++;
        }
    });

    for(let category in categories) {
        result.push({ label: category, data: categories[category] });
    }
    end = end.add(-1, timeScale);

    while(start.isBefore(end)) {
        // Add date values to dateValues array in the order they appear
        let format="D"
        if(timeScale==="month")
            format="MMM"
        else if(timeScale==="year")
            format="YYYY"
        dateValues.push(start.format(format));
        start = start.add(1, timeScale);

    }


    return {x:dateValues,y:result};
}
function countEntries(data, startDate, endDate, countField, categoryField = null) {
    let start = dayjs(startDate);
    let end = dayjs(endDate);
    let result = [];
    let categories = {};
    let countFieldValues = [];

    // Get all unique countField values
    data.forEach(item => {
        if (!countFieldValues.includes(item[countField])) {
            countFieldValues.push(item[countField]);
        }
    });

    // Initialize counts for each category for each unique value in the countField
    data.forEach(item => {
        let category = item[categoryField] || 'Uncategorized';
        if (!categories[category]) {
            categories[category] = {};
            countFieldValues.forEach(value => {
                categories[category][value] = 0; // Initialize count as 0 for each countField value
            });
        }
    });

    data.forEach(item => {
        let createdAt = dayjs(item.createdAt);
        if (createdAt.isAfter(start) && createdAt.isBefore(end)) {
            let category = item[categoryField] || 'Uncategorized';
            let countValue = item[countField];
            categories[category][countValue]++;
        }
    });

    for(let category in categories) {
        let data = [];
        for(let countValue of countFieldValues) {
            data.push(categories[category][countValue]);
        }
        result.push({ label: category, data: data });
    }

    return { countFieldValues: countFieldValues, result: result };
}
function getYAxisData(y,timeScale,startDate,endDate){

    switch (y) {
        case "number of paitents":
            {
            return(   [{ data: [4, 3] }, { data: [1, 6] }, { data: [2, 5] }])

                
            }
            break;
    
        default:
            break;
    }

    
}



function generateXAxisTimeData(startDate, endDate, timeScale) {


let result = countEntries(dsd, '2024-05-04', '2024-05-08', 'sex',"subCity");
console.log(result);



    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const data = [];
    let formatString;
    if (timeScale === 'Day') {
      formatString = 'DD';
    } else if (timeScale === 'Month') {
      formatString = 'MMM';
    } else if (timeScale === 'Year') {
      formatString = 'YYYY';
    }

    let current = start;
    while (current.isBetween(start, end, timeScale, '[]')) {
        data.push(current.format(formatString));
        if (timeScale === 'Day') {
        current = current.add(1, 'Day');
      } else if (timeScale === 'Month') {
        current = current.add(1, 'Month');
      } else if (timeScale === 'Year') {
        current = current.add(1, 'Year');
      }
    }

    return [{ scaleType: 'band', data }];
  }



function Barchart(props) {
    let xData=[]
    let yData=[]

if (props.x=="time"){
 xData=generateXAxisTimeData(props.startDate,props.endDate,props.timeScale)
}
else if (props.x=="age"){
     xData=  [{ scaleType: 'band', data: ['< 5', '5-12', '12-18','18-35','35-60','>60'] }]

}
else if (props.x=="gender"){
     xData=  [{ scaleType: 'band', data: ['Female', 'Male'] }]

}
else if (props.x=="severity"){
     xData=  [{ scaleType: 'band', data: ['early', 'mild','sevire'] }]

}




  return (
       <BarChart
                                xAxis={xData}
                                series={yData}

                            />
  )
}

export default Barchart
