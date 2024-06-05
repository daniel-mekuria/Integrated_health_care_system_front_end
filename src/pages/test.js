import React, { useState,useRef } from "react";

import Checkbox from "@mui/material/Checkbox";
import {
 
  Button,

} from "@mui/material";

import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from "../components/httpRequest";
import { GetCookie } from "../components/cookies";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Popconfirm, Select } from "antd";


function convertStringToArray(str) {
  return str.split(',').map(function (item) {
    return item.trim();
  }).filter(function (item) {
    return item !== '';
  });
}


async function updateUser() {

  const drugs = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/getAllDrugs")
  return drugs.drugs







}

const UpdateUser = (props) => {
  let data = props.data
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)


  const editFormRef = useRef()


  const userId = JSON.parse(GetCookie("user")).id





  return (
    <div>
     
    </div>

  );
};

export default UpdateUser;
