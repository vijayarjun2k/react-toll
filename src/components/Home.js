import React, {useState,useEffect} from 'react';


const getDatafromLS=()=>{
  const data = localStorage.getItem('vehicles');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}


export const Home = () => {
  
   // main array of objects state || vehicles state || vehicles array of objects
   const [vehicles]=useState(getDatafromLS());
   

  
 const [search,setSearch]=useState('');
   //console.log(search)
 
   // saving data to local storage
   useEffect(()=>{
     localStorage.setItem('vehicles',JSON.stringify(vehicles));
   },[vehicles])   
   
   
  return (
    
    
    <div><h1>Im Home
      </h1>
    
      
      <h1>Toll Management Application</h1>  <br/>
        <form>
  <label>
    <b>Toll entries/Vehicle entries :</b>


{/* <select className="form-select" aria-label="Default select example">
  <option selected>Filter- ALL</option>
  <option value="1">Kolappur</option>
  <option value="2">Chengalpattu</option>
  <option value="3">Krishnagiri</option>
  
  
</select> <svg xmlns="http://www.w3.org/2000/svg"  height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
 */}
    <input type="text"  onChange={(e)=>setSearch(e.target.value)} placeholder='Search vehicle' />
  </label>
  
  <input type="submit" value="Submit" />
</form><br/>

<div> 
      <div className='space'></div>
      <a href="/addentry" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add vehicle entry</a>
      <div className='space'></div>
      <a href="/admin" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" >Add new toll</a>
      <div className='space'></div>
      <a href="/viewalltoll" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">View all tolls</a> 
</div>
      <div className='view-container'>
            <>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>VEHICLE TYPE</th>
                      <th>VEHICLE NUMBER</th>
                      <th>DATE/TIME</th>
                      <th>TOLL NAME</th>
                      <th>TARIFF</th>
                    </tr>
                  </thead>
                  <tbody>
                  {vehicles.filter((vehicle)=>{
                      return search?.toLowerCase() === '' ? vehicle : vehicle.vehicleno?.toLowerCase().includes(search);
                    }).map((vehicle)=>( <tr key={vehicle.tollname}>
                      <td>{vehicle.vehicletype}</td>
                      <td>{vehicle.vehicleno}</td>
                      <td>{vehicle.datetime}</td>
                      <td>{vehicle.tollname}</td>
                      <td>{vehicle.tariff}</td>       
                  </tr>     
                  ))}

                  </tbody>
                </table>
              </div>
              
            </>
            
          </div>
    </div> 
  )
}