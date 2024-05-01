import { Button, Divider } from '@mui/material';
import { Modal, Popconfirm } from 'antd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import React, { useState } from 'react'


function TableGen(props) {

  return (
    <div className='flex flex-col  space-y-6 p-[6%] bg-slate-100'>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label={props.title}>
          <TableHead>
            <TableRow>
              {props.data.column.map((col) => (
                <TableCell>{col}</TableCell>
              ))}


            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.row.map((row) => (
              <TableRow

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
  const [tablesList, setTablesList] = useState([]);

  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  return (
    <Modal open={props.isModalOpen}
      keyboard={false}
      maskClosable={false}
      okText={"Export"}
      footer={<div className='flex justify-end space-x-3'>

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
      closeIcon={ <Popconfirm
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
      <div style={props.style} className={props.className + ''}>
        <div className='!pt-16 flex flex-col space-y-4 h-[80vh] overflow-scroll scrollbar-hide'>
          {
            tablesList.map((Table) => (
              <div>

              </div>
            ))
          }

          <TableGen data={{ column: ["id", "sex"], row: [["10", "12"], ["sd", "5"]] }} title={"sex list"} />
          <Divider />
          <Button color='success' variant='outlined' > Add Table</Button>
        </div>

      </div>
    </Modal>

  )
}

export default ExportForm
