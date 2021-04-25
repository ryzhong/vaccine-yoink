const axios = require('axios');

const miToMeters = 0.000621371;
const metersToMi = 1609.34;

//gets all stores that have available appointments
const getAllStoresWithApt = () => {
    axios.get('https://www.vaccinespotter.org/api/v0/states/CA.json')
        .then(res => {
            return res.data.features
        })
        .then(res => {
            return res.filter(store => {
                if (store.properties.appointments) {
                    return store.properties.appointments.length > 0
                }
                return false
            })
        })
        .then(res => {
            console.log(res.length)
            return res;
        })
        .catch(err => {
            console.log(err)
        })
}

//gets all zip codes within a specific coordinate
const getZipCodesWithinDistance = (miles) => {
    let meters = miles * miToMeters;
    axios.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=&rows=10&facet=state&facet=timezone&facet=dst&refine.state=CA&geofilter.distance=37.364625%2C+-119.51261%2C++50000')
        .then(res => {
            let zipsWithin = [];
            for (place of res.data.records) {
                console.log(place.fields.zip)
                zipsWithin.push(place.fields.zip)
            }
            return zipsWithin;
        })

}

//gets all zip codes within a specific coordinate
const getCoorOfZip = (zipCode) => {
    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code&q=&facet=country_code&facet=admin_name1&facet=admin_code1&facet=admin_name2&facet=postal_code&refine.country_code=US&refine.admin_name1=California&refine.postal_code=${zipCode}`)
        .then(res => {
            console.log(res.data.records[0].fields.coordinates)
            return res.data.records[0].fields.coordinates;
        })

}
