import { BarChart, LineChart } from "@mui/x-charts"
import { countEntries, countEntriesbydate, countTotalEntries, countTotalEntriesbydate } from "./statUtils"
import useAsyncData from "./useAsyncData"
import httpRequest from "./httpRequest"
import { useEffect } from "react"


const dsd = [{
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
    "birthDate": "1956-01-11T00:00:00.000Z",
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
    "birthDate": "2010-01-11T00:00:00.000Z",
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


function generateData(data,dataLabel,x, y, startDate, endDate, timeScale = null) {
    if (x == "time") {
        return (countEntriesbydate(data, dataLabel,startDate, endDate, timeScale, y))
    }
    else {
        return (countTotalEntries(data, dataLabel,startDate, endDate, x, y))

    }




}




async function fetchdata(set){


    if (set=="drug"){

    }
    if (set=="paitents"){

        let data=await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/allAtrPatients")
        return(data.patients)

        
    }
}

function Linechart(props) {
    let rawData=[]
    
    const { data, isLoading, error } = useAsyncData(()=>{
return fetchdata(props.set)
    },[props]);

    
    let xData = [{data:[0]}]
    let yData = [{data:[0,1]}]
    if(props.x &&props.y && !isLoading&&data){

    rawData=data
   
    let result = generateData(rawData,props.set,props.x, props.y, props.startDate, props.endDate, props.timeScale);
    xData = [{ scaleType: 'band', data: result.x }]
    yData=result.y

}
if (xData[0].data.length !== yData[0].data.length){

    xData = []
    yData = []
}

    return (
        <LineChart
            xAxis={ xData}
            series={yData}

        />
    )

}

export default Linechart
