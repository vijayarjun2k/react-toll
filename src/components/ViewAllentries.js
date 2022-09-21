import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'


export const ViewAllentries = ({vehicles,deleteVehicle}) => {
    
    return vehicles.map(vehicle=>(
        
        <tr key={vehicle.tollname}>
            <td>{vehicle.tollname}</td>
            <td>{vehicle.vehicletype}</td>
            <td>{vehicle.vehicleno}</td>
            <td>{vehicle.tariff}</td>
            <td>{vehicle.datetime}</td>
            <td className='delete-btn' onClick={()=>deleteVehicle(vehicle.tollname)}>
                <Icon icon={trash}/>
            </td>           
        </tr>
))
}