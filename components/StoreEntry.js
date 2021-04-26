import React from 'react';
import { DateTime } from "luxon";

const Stores = props => {
    console.log(props.store)
    let address = '';
    let time = DateTime.fromISO(props.store.properties.appointments_last_modified);
    let available_vaccines = '';
    time = time.toLocaleString(DateTime.DATETIME_MED)
    if(props.store.properties.address) {
        address = props.store.properties.address + ', ' + props.store.properties.city + ', ' +  props.store.properties.state  + ', ' +  props.store.properties.postal_code;
    } else {
        address = `Address not available. Please check on ${props.store.properties.provider_brand_name} website`;
    }
    for(let vaccine in props.store.properties.appointment_vaccine_types) {
        available_vaccines += " " + vaccine
    }
    return (
        <div>
            <div className='store-container'>
                <div className='distance-info'>
                    {props.store.properties.distanceFromZip} mi - {props.store.properties.city}
                </div>
                <div className='store-info'>
                    {props.store.properties.provider_brand_name} - Last Updated: {time}
                </div>
                <div className='store-info'>
                    {address}
                </div>
                <div className='store-info-vaccine'>
                    Available Vaccines: {available_vaccines}
                </div>
                <div className='store-info'>
                    <button onClick={() => window.open(`${props.store.properties.url}`)}>Visit {props.store.properties.provider_brand_name} website to make an appointment</button>
                </div>
            </div>

            <style jsx>{`
                .store-container {
                    width: 80%;
                    margin: 0 auto;
                    background-color: lightblue;
                    border-radius: .3rem;
                    height: 100%;
                    position: relative;
                    margin-top: 20px;
                }
                .distance-info {
                    padding: 10px;
                    margin-left: 15px;
                }
                .store-info {
                    padding: 10px;
                    margin-left: 15px;
                }
                .store-info-vaccine {
                    padding: 10px;
                    margin-left: 15px;
                    text-transform:capitalize;
                }
            `}
            </style>
        </div>
    )
}

export default Stores;