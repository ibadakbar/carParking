import logo from './logo.svg';
import './App.css';
import AddCar from './component/AddCar';
import CarData from './component/CarData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      {/* 
      <div className='app'>
      </div> */}
      <ToastContainer />
      <div class="container">
        <div class="row">
          <div class="col" >
            <AddCar />

          </div>
          <div class="col" >
            <CarData />

          </div>
        </div>

      </div>
    </>
  );
}

export default App;
