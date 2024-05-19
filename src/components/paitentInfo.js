import dayjs from 'dayjs';


function PaitentInfo(props) {
  let fullName, sex, dateEligible, dateOfBirth, patientAddress, kebele, subCityWoreda, houseNo, supportSex, telephoneNo, weightOnStart, dateArtStarted, supportName, currentStat
  let data = props.data
  return (
    <div className={props.className} style={props.style}>
      <div className='flex flex-col space-y-5'>
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
                <p className='text-sm text-gray-900'> {data.dateEligible}</p>
              </div>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium text-gray-500'> Weight on start</p>
                <p className='text-sm text-gray-900'> {data.weightOnStart}</p>
              </div>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium text-gray-500'> Current status</p>
                <p className='text-sm text-gray-900'> {data.currentStatus}</p>
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
                <p className='text-sm text-gray-900'> {dayjs(data.nextAppointment).format("DD / MMM / YYYY") }</p>
                <p className='text-sm text-red-600'> {(dayjs(data.nextAppointment).isBefore(dayjs(), 'day')&& ! dayjs(data.nextAppointment).isSame(dayjs(),'day'))?"-(Missed)":null}</p>
                <p className='text-sm text-green-600'> {( dayjs(data.nextAppointment).isSame(dayjs(),'day'))?"-(Today)":null}</p>
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
                <p className='text-sm font-medium text-gray-500'> City</p>
                <p className='text-sm text-gray-900'> {data.city}</p>
              </div>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium text-gray-500'> Subcity</p>
                <p className='text-sm text-gray-900'> {data.subCity}</p>
              </div>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium text-gray-500'> House no</p>
                <p className='text-sm text-gray-900'> {data.houseNumber}</p>
              </div>
            



            </div>

          </div>
        </div>



        <div className='flex flex-col space-y-2'>
          <div className='flex flex-col space-y-2'>
            <div className='flex justify-center'>
              <p className='font-semibold text-[1.2rem] '> Support person's details</p>

            </div>
            <div className='flex space-x-2 '>

            </div>
          </div>
          <div className='flex flex-col space-y-2'>
            <div className='flex justify-start'>
              <p className='font-semibold text-[1.2rem]  text-gray-600'> Adress </p>

            </div>

          </div>
        </div>


      </div>





    </div>
  );
}

export default PaitentInfo