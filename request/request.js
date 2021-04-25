const axios = require('axios');

const metersToMi = 0.000621371;
const miToMeters = 1609.34;

//gets all stores that have available appointments
const getAllStoresWithApt = () => {
    return axios.get('https://www.vaccinespotter.org/api/v0/states/CA.json')
        .then(res => {
            return res.data.features
        })
        .then(res => {
            return res.filter(store => {
                    return store.properties.appointments_available
            })
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err)
        })
}

//gets all zip codes within a specific coordinate
const getCoorOfZip = (zipCode, cb) => {
    return axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code&q=&facet=country_code&facet=admin_name1&facet=admin_code1&facet=admin_name2&facet=postal_code&refine.country_code=US&refine.admin_name1=California&refine.postal_code=${zipCode}`)
        .then(res => {
            // cb(res.data.records[0].fields.coordinates)
            return res.data.records[0].fields.coordinates;
        })
        .catch( err => console.log(err))
}

export default {getAllStoresWithApt, getCoorOfZip}
