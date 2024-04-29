import LineChart  from "./components/Linechart"
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import '../index.css'
import { BarChartHero } from "./components/BarchartHero"
import TableHero from "./components/TableHero"
import PatinetProfile from "./pages/patinetProfile"
import RegistrationPage from "./pages/Registration"





function App() {
  const chartData = [
    {
      date: 'Jan 22',
      female: 2890,
      'male': 2338,
    },
    {
      date: 'Feb 22',
      female: 2756,
      'male': 2103,
    },
    {
      date: 'Mar 22',
      female: 3322,
      'male': 2194,
    },
    {
      date: 'Apr 22',
      female: 3470,
      'male': 2108,
    },
    {
      date: 'May 22',
      female: 3475,
      'male': 1812,
    },
    {
      date: 'Jun 22',
      female: 3129,
      'male': 1726,
    },
    {
      date: 'Jul 22',
      female: 3490,
      'male': 1982,
    },
    {
      date: 'Aug 22',
      male: 2903,
      'female': 2012,
    },
    {
      date: 'Sep 22',
      female: 2643,
      'male': 2342,
    },
    {
      date: 'Oct 22',
      female: 2837,
      'male': 2473,
    },
    {
      date: 'Nov 22',
      female: 2954,
      'male': 3848,
    },
    {
      date: 'Dec 22',
      female: 3239,
      'male': 3736,
    },
  ]
  

  return (
    <div className="container ">
     
     <div className="dashboard">
      <div>
        <Header/>
        <Navigation/>
      </div>
        
        <PatinetProfile className="self-center"/>
       {/* <RegistrationPage/> */}
     </div>

     
      
    </div>
  )
}

export default App
