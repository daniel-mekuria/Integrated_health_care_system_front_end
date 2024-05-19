import React from 'react'
import { useNavigate } from 'react-router-dom';
import  {SetCookie, GetCookie} from './cookies'




async function makeRequest(url, headers = {}, data = {}, method = "get") {
    let toReturn = null;
    try {
        const response = await fetch(url,( method==="get"?{
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
        }:{
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }));

        toReturn = response;
    } catch (error) {
        console.error(error);
    }

    return toReturn;
}

async function httpRequest(url, data, method = "get") {


    while (true) {

        const AccessToken = GetCookie("accessToken")
        const RefreshToken = GetCookie("refreshToken")
       
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +AccessToken

        }


        let response = await makeRequest(url, headers, data, method)
        if (response == null) {
            console.log("no res")

            return null
        }
        else if (response.status == 401) {
            const headers = {
                'Content-Type': 'application/json',

            }
            const data = {
                "token": RefreshToken

            }
            response = await makeRequest(process.env.REACT_APP_BASE_URL+"/v1/refresh", headers, data, "post")
            
             if (response.status == 401) {
                window.location.href = "/login";
                return(null)

            }
            else if (response.status <300 && response.status >=200) {

                let resData = await response.json()

                SetCookie("accessToken", resData.accessToken)
                continue
            }
            else if (response == null) {

                return null
            }
            else{
                return null



            }
        }
        else if (response.status <300 && response.status >=200) {
            let resData= await response.json()
            return resData
        }
        else
            return null



    }
    

   

}

export default httpRequest;
