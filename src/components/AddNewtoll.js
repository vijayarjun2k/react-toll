import React, {useState, useEffect} from 'react';
import { Viewtoll } from './Viewtoll';


const getDatafromLS=()=>{
  const data = localStorage.getItem('vehicles');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const AddNewtoll=()=> {

  // main array of objects state || vehicles state || vehicles array of objects
  const [vehicles, setvehicles]=useState(getDatafromLS());

  // input field states
  const [tollname, setTollname]=useState('');
  const [vehicletype, setVehicletype]=useState('');
  const [singlejourney, setSinglejourney]=useState('');
  const [returnjourney, setReturnjourney]=useState('');
  // form submit event
  const handleAddVehicleSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let vehicle={
      tollname,
      vehicletype,
      singlejourney,
      returnjourney
    }
    setvehicles([...vehicles,vehicle]);
    setTollname('');
    setVehicletype('');
    setSinglejourney('');
    setReturnjourney('')
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
    <>
<div>
  <h1>Add new toll</h1>
    <div className='wrapper'>
        <h1>Add New Toll Location</h1>
        <p>Allows admin to add new toll loactions and view vehicle using local storage</p>
        <div className='main'>
          <div className='form-container'>
            <form autoComplete="off" className='form-group'
              onSubmit={handleAddVehicleSubmit}>
                <div class="form-group">
                  <label for="formGroupExampleInput">Toll Name<b color='red'>*</b></label>
                  <input type="text" class="form-control" placeholder="Enter toll name" 
                  onChange={(e) => setTollname(e.target.value)} value={tollname} required/>
                </div>
              
                <div class="form-group">
                <label for="exampleFormControlSelect1">Vehicle fare details</label>
                <select className="form-control" onChange={(e) => setVehicletype(e.target.value)} value={vehicletype} required>
                  <option><b>Select vehicle type</b></option>
                  <option>Car/Jeep/Van</option>
                  <option>LCV</option>
                  <option>Truck/Bus</option>
                  <option>Heavy vehicle</option>
                </select>
              </div>

              <div class="row">
              <div class="col">
                <input type="number" class="form-control" placeholder="Single Journey"
                onChange={(e) => setSinglejourney(e.target.value)} value={singlejourney} required/>
              </div>
              <div class="col">
                <input type="number" class="form-control" placeholder="Return Journey"
                onChange={(e) => setReturnjourney(e.target.value)} value={returnjourney} required/>
              </div>
            </div><br></br>
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
                      <th>Single Journey rate</th>
                      <th>Return Journey rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Viewtoll vehicles={vehicles} deleteVehicle={deleteVehicle} />
                  </tbody>
                </table>
              </div>
              <button className='btn btn-danger btn-md'
                onClick={() => setvehicles([])}>Remove All</button>
            </>}
            {vehicles.length < 1 && <div>No vehicles are added yet</div>}
          </div>
        </div>
      </div>

</div></>
)
}

