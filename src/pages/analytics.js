import { Button, Divider } from '@mui/material'
import React, { useRef, useState } from 'react'
import IosShareIcon from '@mui/icons-material/IosShare';
import { Card, Form, Select } from "antd";
import { LineChart } from '@mui/x-charts/LineChart';
import Radio, { radioClasses } from '@mui/joy/Radio';
import { DatePicker, Modal } from "antd/es";
import dayjs from 'dayjs';

import RadioGroup from '@mui/joy/RadioGroup';
import ExportForm from '../components/exportForm';
import { PieChart } from '@mui/x-charts';
import Barchart from '../components/barchart';
import Linechart from '../components/linechart';
import Piechart from '../components/piechart';

function Analytics(props) {

    let dataset = [{ x: 1, y: 4, Z: 45 }, { x: 2, y: 41, Z: 45 }, { x: 3, y: 11, Z: 45 }, { x: 6, y: 18, Z: 45 }, { x: 9, y: 41 }, { x: 11, y: 45 },]

    const [graphType, setGraptype] = useState("Line")
    const [xData, setXData] = useState()
    const [yData, setYData] = useState()
    const [optionName, setoptionName] = useState()

    const [dataSet, setdataSet] = useState()


    const [timeScale, setTimeScale] = useState("Day")
    const [startDate, setstartDate] = useState()
    const [endDate, setendDate] = useState()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isXModalOpen, setIsXModalOpen] = useState(false);

    const xFormRef = useRef();

    const options = {


        Bar: [
            { x: "time", y: "sex", name: "added paitent by sex vs time ", set: "paitents" },
            { x: "time", y: "birthDate", name: "added paitent by age vs time ", set: "paitents" },
            { x: "time", y: "severityLevel", name: "added paitent by severity vs time ", set: "paitents" },

            { x: "sex", y: "birthDate", name: "added paitent by age vs sex ", set: "paitents" },

            { x: "sex", y: "severityLevel", name: "added paitent by severity vs sex ", set: "paitents" },
            { x: "birthDate", y: "severityLevel", name: "added paitent by severity vs age ", set: "paitents" },





        ],
        Line: [
            { x: "time", y: "sex", name: "total paitent by sex vs time ", set: "paitents" },
            { x: "time", y: "birthDate", name: "total paitent by age vs time ", set: "paitents" },
            { x: "time", y: "severityLevel", name: "total paitent by severity vs time ", set: "paitents" },





        ]
        ,
        Pie: [
            { x: "time", y: "sex", name: "total paitent by sex ", set: "paitents" },
            { x: "time", y: "birthDate", name: "total paitent by age ", set: "paitents" },
            { x: "time", y: "severityLevel", name: "total paitent by severity ", set: "paitents" },






        ]


    }





    return (
        <div className={props.className + 'flex flex-col w-full h-full space-y-8'} style={props.style}>
            <Modal
                destroyOnClose
                onOk={() => {
                    xFormRef.current.submit()
                    setIsXModalOpen(false)
                }}
                title={(graphType != "Pie" ? "Select data set " : "Select data set")}
                centered

                open={isXModalOpen}
                onCancel={() => {
                    setIsXModalOpen(false)
                }}

            >
                <div className='p-4'>
                    <Form
                        onFinish={(x) => {

                            let option= options[graphType][x.select]
                            setXData(option.x)
                            setYData(option.y)
                            setdataSet(option.set)
                            setoptionName(option.name)
                            console.log(x.select)

                        }}
                        ref={xFormRef}
                    >
                        <Form.Item
                            name="select"
                            rules={[{ required: true }]}
                        >

                            
                            <Select placeholder="Please select an option" 
                            options={options[graphType].map((op,index) => (

                                { value:index, label: op.name }                                
                                ))}
                            
                            
                            >

                                {/* Add more options as needed */}
                            </Select>
                        </Form.Item>
                    </Form>
                </div>




            </Modal>
           

            <ExportForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div className='flex w-full'>
                <Button className='!ml-auto relative right-10' startIcon={<IosShareIcon />} variant='outlined' onClick={() => (setIsModalOpen(true)
                )} > Export</Button>
            </div>
            <div className='flex w-full h-[52%] space-x-4 ' >
                <div className='flex flex-col p-2 space-y-4 border-2 border-solid rounded-xl w-[25%]'>
                    <div className='flex justify-center'>
                        <p className='font-sans font-semibold text-gray-500 text-[1.5rem]'>Configuration</p>

                    </div>
                    <Divider />
                    <div className='space-y-2'>
                        <p className='font-sans font-semibold text-gray-500 text-[1rem] '>Graph type</p>
                        <div className='flex mb-3'>
                            <RadioGroup
                                orientation="horizontal"
                                aria-label="Alignment"
                                name="alignment"
                                variant="plain"
                                value={graphType}
                                onChange={(event) => setGraptype(event.target.value)}
                            >
                                {['Line', 'Bar', 'Pie'].map((type) => (

                                    <div
                                        key={type}
                                        className='!relative  flex justify-center  p-2  ml-1 mr-3 '
                                    >
                                        <Radio
                                            className='p-1'
                                            value={type}
                                            disableIcon
                                            overlay
                                            label={

                                                type
                                            }
                                            variant={graphType === type ? 'solid' : 'soft'}
                                            slotProps={{

                                                action: {

                                                    sx: { borderRadius: 10 },
                                                }
                                            }}
                                        />
                                    </div>

                                ))}

                            </RadioGroup>

                        </div>
                    </div>
                    <div className={'space-y-2 ' + ((graphType != "Pie"&&xData=="time") ? ' visible' : " hidden")}>
                        <p className='font-sans font-semibold text-gray-500 text-[1rem] '>Time Scale</p>
                        <div className='flex mb-3'>
                            <RadioGroup
                                orientation="horizontal"
                                aria-label="Alignment"
                                name="alignment"
                                variant="plain"
                                value={timeScale}
                                onChange={(event) => setTimeScale(event.target.value)}
                            >
                                {['Day', 'Month', 'Year'].map((type) => (

                                    <div
                                        key={type}
                                        className='!relative  flex justify-center  p-2  ml-1 mr-3 '
                                    >
                                        <Radio
                                            className='p-1'
                                            value={type}
                                            disableIcon
                                            overlay
                                            label={
                                                type
                                            }
                                            variant={timeScale === type ? 'solid' : 'soft'}
                                            slotProps={{

                                                action: {

                                                    sx: { borderRadius: 10 },
                                                }
                                            }}
                                        />
                                    </div>

                                ))}

                            </RadioGroup>

                        </div>
                    </div>
                    <div className={' space-y-2'}>
                        <p className='font-sans font-semibold text-gray-500 text-[1rem] '>Time Frame</p>
                        <div className='flex mb-3 space-x-2'>

                            <DatePicker
                                onChange={(x, y) => {
                                    setstartDate(y)
                                }}
                                maxDate={dayjs()}
                                placeholder="Start date" />
                            <DatePicker
                                onChange={(x, y) => {
                                    setendDate(y)
                                }}
                                maxDate={dayjs()}

                                placeholder="End date" />
                        </div>
                    </div>


                </div>

                <div className='w-[70%] border-2 border-solid rounded-xl'>

                    {



                        graphType == "Line" ? (
                            <Linechart x={xData} y={yData} startDate={startDate ? startDate : dayjs()} endDate={endDate ? endDate : dayjs()} timeScale={timeScale} set={dataSet}

                            />
                        ) : null



                    }
                    {



                        graphType == "Bar" ? (
                            <Barchart x={xData} y={yData} startDate={startDate ? startDate : dayjs()} endDate={endDate ? endDate : dayjs()} timeScale={timeScale} set={dataSet}

                            />
                        ) : null



                    }{



                        graphType == "Pie" ? (
                           <Piechart x={xData} y={yData} startDate={startDate ? startDate : dayjs()} endDate={endDate ? endDate : dayjs()} timeScale={timeScale} set={dataSet}

                            />
                        ) : null



                    }
                </div>

            </div>
            <div className='flex flex-col w-full h-[33%] space-y-3'>
                <div className='flex relative w-fit left-[30%]'>
                    <p className='font-sans text-lg font-semibold text-gray-500'>
                        Data sets
                    </p>
                </div>
                <div className='flex relative  left-[30%]space-x-10 h-[90%]'>
                    <div className=' bg-gray-100  h-full p-2 space-y-2 flex flex-col rounded-xl w-[30%]'>
                        <div className='flex justify-center'>
                            <p className='font-sans text-lg font-semibold text-gray-700 '>
                                {(graphType != "Pie" ? "Set" : " Set")}
                            </p>
                        </div>
                        <div className='flex flex-col space-y-2 overflow-scroll scrollbar-hide'>
                            {


                                (optionName == null) ?

                                    <Button onClick={() => (setIsXModalOpen(true))} color='success' variant='outlined' className=' !border-dashed !border-[3px] !border-green-400 h-[90%]  rounded-xl w-full'>
                                        <div className='relative flex flex-col -top-6'>
                                            <p className=' text-green-400 font-sans text-[6rem]'>
                                                +
                                            </p>
                                            <p className=' relative -top-6 text-green-400 font-sans text-[1rem]'>
                                                Add
                                            </p>
                                            <p className='  relative -top-6 text-green-400 font-sans text-[1rem]'>
                                                New Dataset
                                            </p>
                                        </div>
                                    </Button>
                                    : <Card hoverable >
                                        <div className='flex'>
                                            <p> {optionName}</p>
                                            <Button onClick={() => {
                                                setoptionName(null);
                                                setXData(null);
                                                setYData(null);
                                            }} className='!ml-auto' color='error'>
                                                X
                                            </Button>
                                        </div>
                                    </Card>



                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Analytics
