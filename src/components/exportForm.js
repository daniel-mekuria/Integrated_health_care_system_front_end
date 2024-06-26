import { Divider } from '@mui/material';
import { Form, Modal, Popconfirm, DatePicker, Select, Input, Radio, Button } from 'antd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useRef, useState } from 'react'
import httpRequest from './httpRequest';
import { countEntries, countEntriesbydate } from './statUtils';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import LoadingSpinners from './loadingSpinners';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { LoadingButton } from '@mui/lab';

const exportToExcel = (data, fileName = "new_report.xlsx") => {
  // Create a new workbook
  const wb = new ExcelJS.Workbook();

  // Iterate over each table in the data
  data.forEach((tableData, index) => {
    // Truncate the title to 31 characters (Excel's limit is 31)
    const title = (index + "," + tableData.title).substring(0, 31);

    // Add a new worksheet with the truncated title
    const ws = wb.addWorksheet(title);

    const titleRow = ws.addRow([tableData.title]);

    // Change the font size and color of the title
    titleRow.eachCell((cell) => {
      cell.font = {
        size: 14,
        color: { argb: '808080' }
      };
    });

    // Add an empty row for spacing
    ws.addRow([]);

    // Define the columns
    const columns = tableData.data.column.map((colName) => {
      return { name: colName, filterButton: true };
    });

    // Calculate the range for merging cells based on the number of columns
    const numColumns = columns.length;

    // Add the xLabel and yLabel row
    const labelRow = ws.addRow([tableData.yLabel, tableData.xLabel, ...Array(numColumns - 2).fill('')]);

    // Merge cells for the xLabel to span across the remaining columns
    ws.mergeCells(`B${labelRow.number}:${String.fromCharCode(65 + numColumns)}${labelRow.number}`);

    // Apply formatting to the label row
    labelRow.eachCell((cell, colNumber) => {
      cell.font = {
        bold: true,
        size: 12,
        color: { argb: 'FFFFFF' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4F81BD' }
      };
    });

    // Add the table to the worksheet
    ws.addTable({
      name: `MyTable${index}`,
      ref: 'A4',
      headerRow: true,
      totalsRow: false,
      style: {
        theme: 'TableStyleMedium2',
        showRowStripes: true,
      },
      columns: columns,
      rows: tableData.data.row,
    });
  });

  // Write the workbook to a buffer
  wb.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer]);
    saveAs(blob, fileName);
  });
};



const exportToPdf = (data, fileName = "new_report.pdf") => {
  const doc = new jsPDF();
  let startY = 10;

  data.forEach((table) => {
    const { title,xLabel,yLabel, data: { column, row } } = table;

    

    // Create a header with the x and y labels and the column headers
    const tableHead = [
      [{ content: xLabel, styles: { halign: 'start' } }, { content: yLabel, colSpan: column.length, styles: { halign: 'center' } }],
      column // Column headers in the second row
    ];

    // Draw the table
    autoTable(doc, {
      head: tableHead,
      body: row,
      startY: startY
    });

    // Get the final Y position after the table is drawn
    const finalY = doc.autoTable.previous.finalY;

    // Add the table title below the table
    doc.setTextColor(100);
    doc.setFontSize(12);
    doc.text(`Table: ${title}`, 10, finalY + 10); // Position the title

    // Update the startY for the next table
    startY = finalY + 30; // Adjust to ensure space between tables
  });

  // Save the document
  doc.save(fileName);
};




function transformData(x, y) {
  let result = [];
  for (let i = 0; i < x.length; i++) {
    let temp = [x[i]];
    for (let j = 0; j < y.length; j++) {
      temp.push(y[j].data[i]);
    }
    result.push(temp);
  }
  return result;
}

async function fetchdata(set) {


  if (set == "drug") {

  }
  if (set == "paitents") {

    let data = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/allAtrPatients")
    return (data.patients)


  }
}


async function getTable(option, startDate, endDate, timeScale = null) {

  let rawdata = await fetchdata(option.set)
  let count
  if (rawdata == null) {
    return null
  }

  if (option.x == "time") {
    count = (countEntriesbydate(rawdata, option.set, startDate, endDate, timeScale, option.y))
    let column = []
    column.push(" ")
    count.y.map((y) => {
      column.push(y.label)
    })
    let row = (transformData(count.x, count.y))
    let data = { column: column, row: row }

    let title = option.name + dayjs(startDate).format("DD/MMM/YYYY") + " - " + dayjs(endDate).format("DD/MMM/YYYY")

    return { data: data, title: title ,xLabel:option.x==="time"?timeScale:option.x==="birthDate"?"Age":option.x,yLabel:option.y==="time"?timeScale:option.y==="birthDate"?"Age":option.y }

  }
  else {
    count = (countEntries(rawdata, option.set, startDate, endDate, option.x, option.y))
    let column = []
    column.push("")
    count.y.map((y) => {
      column.push(y.label)
    })
    let row = (transformData(count.x, count.y))
    let data = { column: column, row: row }

    let title = option.name + dayjs(startDate).format("DD/MMM/YYYY") + " - " + dayjs(endDate).format("DD/MMM/YYYY")
console.log(data)
    return { data: data, title: title ,xLabel:option.x==="time"?timeScale:option.x==="birthDate"?"Age":option.x,yLabel:option.y==="time"?timeScale:option.y==="birthDate"?"Age":option.y}

  }




}









function TableGen(props) {




  return (
    <div className='flex flex-col  space-y-6 p-[6%] bg-slate-100'>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label={props.title}>
          <TableHead>
          <TableRow>
            <TableCell>
            {props.xLabel}
            </TableCell>
            <TableCell>
            <div className='flex justify-center' >{props.yLabel}</div>
            </TableCell>
            </TableRow>
            <TableRow>
              {props.data.column.map((col,index) => (
                <TableCell key={index}>{col}</TableCell>
              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.row.map((row ,index) => (
              <TableRow
              key={index}

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((cell) => (
                  <TableCell align="left">{cell}</TableCell>

                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div class="flex space-x-1 justify-center">
        <p className='font-sans font-semibold text-gray-600 text-[1rem]'>
          Table:
        </p>
        <p className='font-sans font-semibold text-gray-900 text-[1rem]'>
          {props.title}
        </p>
      </div>
    </div>
  )

}




function ExportForm(props) {

  const [isTableModalOpen, setIsTableModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false)
  const tableFormRef = useRef();
  const exportFormRef = useRef();


  const tableOptions = [
    { x: "time", y: "sex", name: "added paitent by sex vs time ", set: "paitents" },
    { x: "time", y: "birthDate", name: "added paitent by age vs time ", set: "paitents" },
    { x: "time", y: "severityLevel", name: "added paitent by severity vs time ", set: "paitents" },

    { x: "sex", y: "birthDate", name: "added paitent by age vs sex ", set: "paitents" },

    { x: "sex", y: "severityLevel", name: "added paitent by severity vs sex ", set: "paitents" },
    { x: "birthDate", y: "severityLevel", name: "added paitent by severity vs age ", set: "paitents" },





  ]


  const [tablesList, setTablesList] = useState([]);

  const [timeScale, setTimeScale] = useState("Day")
  const [addLoading, setAddLoading] = useState(false)
  const [startDate, setstartDate] = useState(dayjs())
  const [endDate, setendDate] = useState(dayjs())
  const [xData, setXData] = useState("tijme")



  const handleOk = () => {
    tablesList.length > 0 ? setIsExportModalOpen(true) : toast.error("No table to export");


  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
    setTablesList([])


  };
  return (
    <div>
      <Modal open={props.isModalOpen}


        keyboard={false}
        maskClosable={false}
        okText={"Export"}
        footer={<div className='flex justify-end space-x-3'>
          <Button type='primary' onClick={() => {
            setIsTableModalOpen(true)
          }} color='success' variant='outlined' > Add Table</Button>
          <Popconfirm
            title="Cancel the task"
            description="Are you sure to Cancel?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleCancel}
          >
            <Button className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>
          </Popconfirm>
          <Popconfirm
            title="Export the task"
            description="Are you sure to Export this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleOk}

          >
            <Button className='!rounded-xl' variant='contained'>Export</Button>
          </Popconfirm>



        </div>}
        closeIcon={<Popconfirm
          title="Cancel the task"
          description="Are you sure to Cancel?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleCancel}


        >
          X
        </Popconfirm>}
        centered
        className='!w-[95vw]'

      >


        <Modal
          destroyOnClose

          title={("Select a table type")}
          centered


          footer={

            <div className='flex justify-end space-x-3'>


              <Button onClick={() => {
                setXData(null)
                setIsTableModalOpen(false)
              }}


                className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>


              <LoadingButton
                loading={addLoading}
                variant="contained"
                className="w-40 "

                onClick={() => {
                  tableFormRef.current.submit()

                }}

              >

                <span>Ok</span>
              </LoadingButton>
            </div>

          }
          open={isTableModalOpen}


        >
          <div className='p-4'>
            <Form
              onFinish={async (x) => {
                setAddLoading(true)

                let newTable = await getTable(tableOptions[x.table], x.startDate, x.endDate, (xData === "time") ? x.timeScale : undefined)

                if (newTable) {
                  setTablesList(prevTablesList => [...prevTablesList, newTable]);
                }
                setAddLoading(false)


                setIsTableModalOpen(false)
                setXData(null)



              }}
              ref={tableFormRef}
            >
              {
                (xData == "time") ?
                  <div className={'space-y-2 ' + ((xData == "time") ? ' visible' : " hidden")}>

                    <p className='font-sans font-semibold text-gray-500 text-[1rem] '>Time Scale</p>
                    <div className='flex mb-3'>
                      <Form.Item
                        name="timeScale"
                        rules={[{ required: true }]}
                      >

                        <Radio.Group
                          buttonStyle='solid'
                          className='space-x-3'
                          value={timeScale}
                          onChange={(event) => setTimeScale(event.target.value)}
                        >
                          {['Day', 'Month', 'Year'].map((type) => (


                            <Radio.Button
                              key={type}


                              value={type}

                            >{type}</Radio.Button>

                          ))}

                        </Radio.Group>
                      </Form.Item>

                    </div>
                  </div>
                  : null
              }


              <div className={' space-y-2'}>
                <p className='font-sans font-semibold text-gray-500 text-[1rem] '>Time Frame</p>
                <div className='flex mb-3 space-x-2'>
                  <Form.Item
                    name="startDate"
                    rules={[{ required: true }]}
                  >
                    <DatePicker

                      maxDate={dayjs()}
                      placeholder="Start date" />
                  </Form.Item>
                  <Form.Item
                    name="endDate"
                    rules={[{ required: true }]}
                  >
                    <DatePicker

                      maxDate={dayjs()}

                      placeholder="End date" />
                  </Form.Item>

                </div>
              </div>

              <div className={'space-y-2 '}>

                <p className='font-sans font-semibold text-gray-500 text-[1rem] '>Table type</p>

                <Form.Item
                  name="table"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Please select a table"
                    onChange={(x) => {
                      if (tableOptions[x].x == "time")
                        setXData("time")
                      else
                        setXData(null)
                    }}
                    options={tableOptions.map((op, index) => (

                      { value: index, label: op.name }
                    ))}


                  >

                    {/* Add more options as needed */}
                  </Select>
                </Form.Item>

              </div>
            </Form>
          </div>




        </Modal >
        <Modal
          destroyOnClose
          onOk={() => {
            exportFormRef.current.submit()
          }}
          title={("Select export settings")}
          centered

          open={isExportModalOpen}
          onCancel={() => {
            setXData(null)
            setIsExportModalOpen(false)
          }}

        >
          <div className='p-4'>
            <Form
              onFinish={async (x) => {

                setIsLoadingModalOpen(true)
                await (x.format === "PDF") ? exportToPdf(tablesList, x.fileName ? x.fileName : undefined) : exportToExcel(tablesList, x.fileName ? x.fileName : undefined)
                setIsExportModalOpen(false)
                setIsLoadingModalOpen(false)






              }}
              ref={exportFormRef}
            >

              <div className={'space-y-2 '}>

                <p className='font-sans font-semibold text-gray-500 text-[1rem] '>Format</p>
                <div className='flex mb-3'>
                  <Form.Item
                    name="format"
                    rules={[{ required: true }]}
                  >

                    <Radio.Group
                      buttonStyle='solid'
                      className='space-x-3'
                      value={timeScale}
                    >
                      {['Excel', 'PDF',].map((type) => (


                        <Radio.Button
                          key={type}


                          value={type}

                        >{type}</Radio.Button>

                      ))}

                    </Radio.Group>
                  </Form.Item>

                </div>
              </div>



              <div className={' space-y-2'}>
                <p className='font-sans font-semibold text-gray-500 text-[1rem] '>File name</p>
                <div className='flex mb-3 space-x-2'>
                  <Form.Item
                    name="fileName"
                    rules={[{ required: false }]}
                  >
                    <Input

                      placeholder="File name (optional)" />
                  </Form.Item>


                </div>
              </div>


            </Form>
          </div>




        </Modal>

        <Modal
          footer={<></>}

          closable={false}
          destroyOnClose
          open={isLoadingModalOpen}
        >
          <LoadingSpinners size={3} className={"w-full h-full"} />



        </Modal>












        <div style={props.style} className={props.className + ''}>
          <div className='!pt-16 flex flex-col space-y-4 h-[80vh] overflow-scroll scrollbar-hide'>

            <div className='flex-col space-y-3 '>
              {
                tablesList.length > 0 ? tablesList.map((table => {
                  return (
                    <TableGen data={table.data} xLabel={table.xLabel} yLabel={table.yLabel} title={table.title} />

                  )
                })) :
                  <div className='flex justify-center p-3'>
                    <p className='font-sans font-semibold text-gray-500 text-[1rem] '>No tables</p>

                  </div>
              }

            </div>
            <Divider />

          </div>

        </div>

      </Modal >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div >

  )
}

export default ExportForm
