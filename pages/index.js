import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout.js';
import Request from '../request/request.js';
import { getDistance } from 'geolib';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: '',
            distance: '5',
            aptType: true,
            vaccineType: 'all',
            coordinates: [],
        }

        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.handleAptTypeChange = this.handleAptTypeChange.bind(this);
        this.handleVaccineChange = this.handleVaccineChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleZipChange(event) {
        console.log(event.target.value)
        this.setState({ zip: event.target.value })

    }

    handleDistanceChange(event) {
        console.log(event.target.value)
        this.setState({ distance: event.target.value })
    }

    handleAptTypeChange(event) {
        console.log(event.target.value)
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
            .then(res => {
                this.setState({ coordinates: res })
                Request.getZipCodesWithinDistance(res, this.state.distance)
                    .then(zipCodes => {
                        console.log(zipCodes)
                        Request.getAllStoresWithApt()
                            .then(stores => {
                                console.log(stores)
                                let filteredVaccines = this.filterVaccines(this.filterAptType(this.filterByZip(stores, zipCodes)));
                                console.log(filteredVaccines)
                                this.setState({filteredVaccines})
                            })
                    })
            })
    }

    filterByZip(stores, zipCodes) {
        let filteredStores = [];
        for (let store of stores) {
            if (zipCodes.includes(store.properties.postal_code)) {
                filteredStores.push(store)
            }
        }
        return filteredStores;
    }

    filterAptType(stores) {
        let dose2Only = this.state.aptType === '2' ? true : false;
        return stores.filter( store => {
            if(dose2Only) {
                return store.properties.appointments_available_2nd_dose_only && dose2Only
            }
            else {
                return store.properties.appointments_available_all_doses && !dose2Only
            }
        })
    }

    filterVaccines(stores) {
        if(this.state.vaccineType === 'all' || this.state.vaccineType === 'unknown') {
            stores.forEach( store => {
                console.log(store)
                store.properties.distancesFromZip = getDistance({latitude: this.state.coordinates[0], longitude: this.state.coordinates[1]}, 
                    {latitude: store.geometry.coordinates[1], longitude: store.geometry.coordinates[0]});
            });
            return stores;
        }
        stores.filter( store => {
            return store.properties.appointment_vaccine_types[this.state.vaccineType]
        })
        stores.forEach( store => {
            console.log(store)
            store.properties.distancesFromZip = 0;
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