import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout.js';
import Request from '../request/request.js';
import { getDistance } from 'geolib';
import Stores from '../components/Stores.js'

const metersToMi = 0.000621371;
const miToMeters = 1609.34;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: '',
            distance: '5',
            aptType: '1',
            vaccineType: 'all',
            coordinates: [],
            filteredStores: [],
        }

        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.handleAptTypeChange = this.handleAptTypeChange.bind(this);
        this.handleVaccineChange = this.handleVaccineChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleZipChange(event) {
        this.setState({ zip: event.target.value })

    }

    handleDistanceChange(event) {
        this.setState({ distance: event.target.value })
    }

    handleAptTypeChange(event) {
        this.setState({ aptType: event.target.value })
    }

    handleVaccineChange(event) {
        this.setState({ vaccineType: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getStores()
    }

    getStores() {
        Request.getCoorOfZip(this.state.zip)
            .then(coordinates => {
                this.setState({ coordinates })
                Request.getAllStoresWithApt()
                    .then(stores => {
                        let filteredStores = this.sortDistanceProperty(this.filterVaccines(this.filterAptType(this.filterByDistance(stores, coordinates))));
                        this.setState({ filteredStores })
                    })
            })
    }

    filterByDistance(stores, coordinates) {
        let filteredStores = [];
        let meters = this.state.distance * miToMeters;
        for (let store of stores) {
            let distance = getDistance({ latitude: coordinates[0], longitude: coordinates[1] },
                { latitude: store.geometry.coordinates[1], longitude: store.geometry.coordinates[0] });
            if( meters > distance) {
                store.properties.distanceFromZip = (distance * metersToMi).toFixed(2);
                filteredStores.push(store)
            }
        }
        return filteredStores;
    }

    filterAptType(stores) {
        let dose2 = false;
        if (this.state.aptType === '2') {
            dose2 = true;
        }
        return stores.filter(store => {
            if (dose2) {
                return store.properties.appointments_available_2nd_dose_only
            }
            else {
                return store.properties.appointments_available_all_doses
            }
        })
    }

    filterVaccines(stores) {
        if (this.state.vaccineType === 'all' || this.state.vaccineType === 'unknown') {
            return stores
        }
        stores = stores.filter(store => {
            return store.properties.appointment_vaccine_types[this.state.vaccineType]
        })
        return this.sortDistanceProperty(stores)
    }


    sortDistanceProperty(stores) {
        stores = stores.sort((a, b) => {
            return a.properties.distanceFromZip - b.properties.distanceFromZip
        })
        return stores;
    }

    render() {
        return (
            <Layout content={(
                <div>
                    <div>
                        <h1 className='home'>Vaccine Yoink</h1>
                    </div>

                    <div>
                        <div className='form-container'>
                            <div>
                                <div className='header'>
                                    <h2>Search for available appointments</h2>
                                </div>
                                <form>
                                    <div className='form-group'>
                                        <label>Zip Code</label>
                                        <input type='text' id='zipCode' name='zipCode' onChange={e => this.handleZipChange(e)}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Distance</label>
                                        <select className='distance' onChange={e => this.handleDistanceChange(e)}>
                                            <option value='5'>5 Miles</option>
                                            <option value='10'>10 Miles</option>
                                            <option value='25'>25 Miles</option>
                                            <option value='50'>50 Miles</option>
                                        </select>
                                    </div>
                                    <div className='form-group' onChange={e => this.handleAptTypeChange(e)}>
                                        <label>Appointment Type</label>
                                        <select className='aptType'>
                                            <option value='1'>All doses</option>
                                            <option value='2'>Second doses only</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Vaccine Type</label>
                                        <select className='vaccineType' onChange={e => this.handleVaccineChange(e)}>
                                            <option value='all'>All Vaccines</option>
                                            <option value='moderna'>Moderna</option>
                                            <option value='pfizer'>Pfizer</option>
                                            <option value='JJ'>Johnson & Johnson</option>
                                            <option value='unknown'>Unknown (Database not specified)</option>
                                        </select>
                                    </div>
                                    <div className='submitForm'>
                                        <button className='submitButton' onClick={e => this.handleSubmit(e)}>Submit</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div>
                            <Stores stores={this.state.filteredStores}/>
                        </div>
                    </div>

                    <style jsx>{`
                    h1 {
                        font-size: 3rem;
                    }
                    .home {
                        font-size: 4em;
                        margin: 0 auto;
                        margin-top: 30px;
                        text-align: center;
                        color: #069;
                    }
                    .header {
                        padding-top: 20px;
                        text-align: center;
                    }
                    .form-container {
                        width: 80%;
                        // text-align: center;
                        margin: 0 auto;
                        background-color: lightblue;
                        border-radius: .3rem;
                        height: 100%;
                        position: relative;
                    }
                    form {
                        margin: 0 auto;
                        // padding-top: 20px;
                        position: relative;
                        width: 50%;
                    }
                    label, input {
                        display: block;
                    }
                    input {
                        width: 100%;
                        border: none;
                        border-radius: 20px;
                        outline: none;
                        padding: 10px;
                        font-size: 1em;
                        color: #676767;
                        border: solid 3px #98d4f3;
                        box-sizing: border-box;
                    }
                    input:focus {
                        border:solid 3px #77bde0
                    }
                    select {
                        width: 100%;
                        border: none;
                        border-radius: 20px;
                        outline: none;
                        padding: 10px;
                        font-size: 1em;
                        color: #676767;
                        border: solid 3px #98d4f3;
                        box-sizing: border-box;
                    }
                    label {
                        font-size: 1em;
                        margin-top: 20px;
                        margin-left: 20px;
                    }
                    .submitForm {
                        text-align:center;
                        margin: 0 auto;
                        padding-top: 10px;
                        padding-bottom: 20px;
                    }
                    .submitButton {
                        font-size: 1.3em;
                    }
                `}</style>
                </div>

            )} />
        )
    }
}

export default Index;