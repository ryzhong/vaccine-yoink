import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout.js';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: '',
            distance: 0,
            aptType: 1,
            vaccineType: [],
        }
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
                                        <label for='zipCode'>Zip Code</label>
                                        <input type='text' id='zipCode' name='zipCode'></input>
                                    </div>
                                    <div className='form-group'>
                                        <label for='distance'>Distance</label>
                                        <select className='distance'>
                                            <option value='5'>5 Miles</option>
                                            <option value='10'>10 Miles</option>
                                            <option value='25'>25 Miles</option>
                                            <option value='50'>50 Miles</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label for='aptType'>Appointment Type</label>
                                        <select className='aptType'>
                                            <option value='1'>All doses</option>
                                            <option value='2'>Second doses only</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for='vaccineType'>Vaccine Type</label>
                                        <select className='vaccineType'>
                                            <option value='all'>All Vaccines</option>
                                            <option value='moderna'>Moderna</option>
                                            <option value='pfizer'>Pfizer</option>
                                            <option value='JJ'>Johnson & Johnson</option>
                                        </select>
                                    </div>
                                    <div className='submitForm'>
                                        <button className='submitButton'>Submit</button>
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