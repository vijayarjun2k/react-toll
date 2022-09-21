import React, {useState, useEffect} from 'react';
import { ViewAllentries } from './ViewAllentries';



const getDatafromLS=()=>{
  const data = localStorage.getItem('vehicles');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}


export const AddVehicle = () => {
    // main array of objects state || vehicles state || vehicles array of objects
  const [vehicles, setvehicles]=useState(getDatafromLS());

  // input field states
  const [tollname, setTollname]=useState('');
  const [vehicletype, setVehicletype]=useState('');
  const [vehicleno, setVehicleno]=useState('');
  const [tariff, setTariff]=useState('');
  const [datetime, setDatetime]=useState('');
  // form submit event
  const handleAddVehicleSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let vehicle={
      tollname,
      vehicletype,
      vehicleno,
      tariff,
      datetime
    }
    setvehicles([...vehicles,vehicle]);
    setTollname('');
    setVehicletype('');
    setVehicleno('');
    setTariff('');
    setDatetime('')
  }

  // delete vehicle from LocalStorage
  const deleteVehicle=(tollname)=>{
    const filteredVehicles=vehicles.filter((element,index)=>{
      return element.tollname !== tollname
    })
    setvehicles(filteredVehicles);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('vehicles',JSON.stringify(vehicles));
  },[vehicles])

  return (
    <><div>
      <h1>AddVehicle</h1>
    </div><div className='wrapper'>
        <h1>Add New Vehicle Entry</h1>
        <p>Add and view your vehicle using local storage</p>
        <div className='main'>
          <div className='form-container'>
            <form autoComplete="off" className='form-group'
              onSubmit={handleAddVehicleSubmit}>
              <label for="cars">Select toll name</label>
              <select name="cars" id="cars" className='form-control' required
                onChange={(e) => setTollname(e.target.value)} value={tollname}>
                 <option value="Kappalur">Kappalur</option>
                 <option value="Chengalpattu">Chengalpattu</option>
                <option value="Krishnagiri">Krishnagiri</option>
              </select>
            <br></br>
            
            <label for="cars">Select vehicle type</label>
              <select name="cars" id="cars" className='form-control' required
                onChange={(e) => setVehicletype(e.target.value)} value={vehicletype}>
                 <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                 <option value="LCV">LCV</option>
                <option value="Truck/Bus">Truck/Bus</option>
                <option value="Heavy vehicle">Heavy vehicle</option>
              </select>
            <br></br>
              <label>Vehicle Number</label>
              <input type="text" className='form-control' required pattern="[a-zA-Z0-9]+" placeholder='Enter alphanumeric value'
                onChange={(e) => setVehicleno(e.target.value)} value={vehicleno}></input>
              <br></br>
              <label>Tariff</label>
              <input type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"  className='form-control' required
                onChange={(e) => setTariff(e.target.value)} value={tariff} placeholder='Enter tariff amount'></input>
              <br></br>
              <label>Date/Time</label>
              <input type="datetime-local" oninput=""  value={(datetime || '').toString().substring(0, 16)} className='form-control' required
                onChange={(e) => setDatetime(e.target.value)}  placeholder='Date and Time'></input>
              <br></br>
              <button type="submit" className='btn btn-success btn-md'>
                ADD
              </button>
            </form>
          </div>

          <div className='view-container'>
            {vehicles.length > 0 && <>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Toll Name</th>
                      <th>Vehicle Type</th>
                      <th>Vehicle Number</th>
                      <th>Tariff</th>
                      <th>Date/Time</th>
                      <th>DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ViewAllentries vehicles={vehicles} deleteVehicle={deleteVehicle} />
                  </tbody>
                </table>
              </div>
              <button className='btn btn-danger btn-md'
                onClick={() => setvehicles([])}>Remove All</button>
            </>}
            {vehicles.length < 1 && <div>No vehicles are added yet</div>}
          </div>
        </div>
      </div></>

  )
}
