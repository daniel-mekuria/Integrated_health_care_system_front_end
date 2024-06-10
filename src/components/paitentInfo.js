import { AddOutlined, Edit, EditNotifications, Note } from '@mui/icons-material';
import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import EditPaitent from './Editpaitent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PaitentInfo(props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [data, setdata] = useState(props.data)


  async function saveEdit(x) {
    toast.success(" Saved succesfuly");
    setTimeout(() => {
      setdata(x)
    }, 3000);


  }

  return (
    <div className={props.className} style={props.style}>
      <EditPaitent isEditModalOpen={isEditModalOpen} data={data} setIsEditModalOpen={setIsEditModalOpen} saveEdit={saveEdit} />

      <div className='flex flex-col space-y-5'>
        <div className='flex justify-end'>
          <Button onClick={() => { setIsEditModalOpen(true) }} icon={< Edit />} type='primary' >
            Edit

          </Button>
        </div>
        <div className='h-[70vh] flex flex-col space-y-5 p-2 overflow-y-scroll'>
          <Card className='shadow-sm drop-shadow-sm'>

            <div className='flex flex-col space-y-6'>
              <div className='flex flex-col space-y-4'>
                <div className='flex justify-center'>
                  <p className='font-semibold text-[1.2rem] '> Personal details</p>


                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Full name</p>
                    <p className='text-sm text-gray-900'> {data.fullName}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Sex</p>
                    <p className='text-sm text-gray-900'> {data.sex}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Date of birth</p>
                    <p className='text-sm text-gray-900'> {dayjs(data.birthDate).format("DD / MMM / YYYY")}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Age</p>
                    <p className='text-sm text-gray-900'> {data.age}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Date eligible</p>
                    <p className='text-sm text-gray-900'> {dayjs(data.dateEligible).format("DD / MMM / YYYY")}</p>
                  </div>
                  {/* <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Weight on start</p>
                    <p className='text-sm text-gray-900'> {data.weightOnStart}</p>
                  </div> */}
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'>Current weight</p>
                    <p className='text-sm text-gray-900'> {data.weight}</p>
                  </div>

                 
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Date ART started</p>
                    <p className='text-sm text-gray-900'> {dayjs(data.createdAt).format("DD / MMM / YYYY")}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Last appointment</p>
                    <p className='text-sm text-gray-900'> {dayjs(data.visitDate).format("DD / MMM / YYYY")}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Next appointment</p>
                    <div className='flex'>
                      <p className='text-sm text-gray-900'> {dayjs(data.nextAppointmentDate).format("DD / MMM / YYYY")}</p>
                      <p className='text-sm text-red-600'> {(dayjs(data.nextAppointmentDate).isBefore(dayjs(), 'day') && !dayjs(data.nextAppointmentDate).isSame(dayjs(), 'day')) ? "-(Missed)" : null}</p>
                      <p className='text-sm text-green-600'> {(dayjs(data.nextAppointmentDate).isSame(dayjs(), 'day')) ? "-(Today)" : null}</p>
                    </div>
                  </div>



                </div>










              </div>
              <div className='flex flex-col space-y-2'>
                <div className='flex justify-start'>
                  <p className='font-semibold text-[1.1rem]  text-gray-550'> Adress </p>

                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Phonenumber</p>
                    <p className='text-sm text-gray-900'> {data.phoneNumber}</p>
                  </div>

                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Subcity</p>
                    <p className='text-sm text-gray-900'> {data.subCity}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Kebele</p>
                    <p className='text-sm text-gray-900'> {data.kebele}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> House no</p>
                    <p className='text-sm text-gray-900'> {data.houseNumber}</p>
                  </div>




                </div>

              </div>
            </div>

          </Card>
          <Card className='shadow-sm drop-shadow-sm'>

            <div className='flex flex-col space-y-6'>
              <div className='flex flex-col space-y-4'>
                <div className='flex justify-center'>
                  <p className='font-semibold text-[1.2rem] '> Support person's details</p>


                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Full name</p>
                    <p className='text-sm text-gray-900'> {data.supporterName}</p>
                  </div>







                </div>










              </div>
              <div className='flex flex-col space-y-2'>
                <div className='flex justify-start'>
                  <p className='font-semibold text-[1.1rem]  text-gray-550'> Adress </p>

                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Phonenumber</p>
                    <p className='text-sm text-gray-900'> {data.supporterPhone}</p>
                  </div>
                 
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Subcity</p>
                    <p className='text-sm text-gray-900'> {data.supporterSubcity}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Kebele</p>
                    <p className='text-sm text-gray-900'> {data.supporterKebele}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Wereda</p>
                    <p className='text-sm text-gray-900'> {data.supporterWereda}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> House no</p>
                    <p className='text-sm text-gray-900'> {data.supporterHouseNumber}</p>
                  </div>




                </div>

              </div>
            </div>

          </Card>
          <Card className='shadow-sm drop-shadow-sm'>

            <div className='flex flex-col space-y-6'>
              <div className='flex flex-col space-y-4'>
                <div className='flex justify-center'>
                  <p className='font-semibold text-[1.2rem] '> Clinical information</p>


                </div>
                <div class="grid grid-cols-4 gap-4">
                <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Previous exposure to ARVs</p>
                    <p className='text-sm text-gray-900'> {data.previousExposure}</p>
                  </div>
                  {
                    data.previousExposure !== "Naive" ?
                      <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium text-gray-500'> Current status</p>
                        <p className='text-sm text-gray-900'> {data.patientStatus}</p>
                      </div> : null
                  }
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> History of ADR or side effects</p>
                    <p className='text-sm text-gray-900'> {data.sideEffect}</p>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Concomitant diseases</p>
                    <p className='text-sm text-gray-900'> {data.concomitantDisease}</p>
                  </div>
                  <div className='flex flex-col col-span-2 space-y-1'>
                    <p className='text-sm font-medium text-gray-500'> Reason for change in regimen or other remarks</p>
                    <p className='text-sm text-gray-900'> {data.additionalNote}</p>
                  </div>




                </div>










              </div>

            </div>

          </Card>


        </div>

      </div>




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

    </div>
  );
}

export default PaitentInfo