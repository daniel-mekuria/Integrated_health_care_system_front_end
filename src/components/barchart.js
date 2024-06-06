import { BarChart, LineChart } from "@mui/x-charts"
import { countEntries, countEntriesbydate, countTotalEntries, countTotalEntriesbydate } from "./statUtils"
import useAsyncData from "./useAsyncData"
import httpRequest from "./httpRequest"
import { useEffect } from "react"



function generateData(data, x, y, startDate, endDate, timeScale = null) {
    if (x == "time") {
        return (countEntriesbydate(data,set, startDate, endDate, timeScale, y))
    }
    else {

        let fd = (countTotalEntries(data,set, startDate, endDate, x, y))
        return fd
    }




}


let set = ""

async function fetchdata() {


    if (set == "drug") {

    }
    if (set == "paitents") {

        let data = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/allAtrPatients")
        return (data.patients)


    }
}

function Barchart(props) {
    let rawData = []
    set = props.set

    const { data, isLoading, error } = useAsyncData(fetchdata, [props]);


    let xData = [{ data: [0] }]
    let yData = [{ data: [0, 1] }]
    if (props.x && props.y && !isLoading && data) {

        rawData = data

        let result = generateData(rawData, props.x, props.y, props.startDate, props.endDate, props.timeScale);
        xData = [{ scaleType: 'band', data: result.x }]
        yData = result.y

    }
    if (xData[0].data.length !== yData[0].data.length) {

        xData = []
        yData = []
    }

    return (
        <BarChart
        loading={isLoading}
            xAxis={xData}
            series={yData}

        />
    )

}

export default Barchart
