import React,{useState,useEffect} from 'react';
import { ViewAllentries} from './ViewAllentries';
//import { AddVehicle } from './AddVehicle';

const getDatafromLS=()=>{
    const data = localStorage.getItem('vehicles');
    if(data){
      return JSON.parse(data);
    }
    else{
      return []
    }
  }
  

export const ViewAlltolls = () => {
    // main array of objects state || vehicles state || vehicles array of objects
  const [vehicles, setvehicles]=useState(getDatafromLS());

 
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
    <div><h1>ViewAlltolls</h1></div>
    <h1>Toll Management Application</h1><br/>
    <form>
  <label>
    <b>Tollgate List :


</b>
    <input type="text"  name="name" placeholder='Search vehicle' />
  </label>
  <input type="submit" value="Submit" />
</form><br/>

<a href="/addentry" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add vehicle entry</a>
<a href="/admin" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add new toll</a>
<a href="/" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Back to vehicle logs</a>


<div className='view-container'>
            {vehicles.length > 0 && <>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>TOLL NAME</th>
                      <th>VEHICLE TYPE</th>
                      <th>VEHICLE NUMBER</th>
                      <th>TARIFF</th>
                      <th>DATE/TIME</th>
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

  </>
  )
}
