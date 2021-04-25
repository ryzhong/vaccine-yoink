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
            console.log(res.length)
            return res;
        })
        .catch(err => {
            console.log(err)
        })
}

//gets all zip codes within a specific coordinate
//use zip > get coordinates > list of zips within area > filter stores > sort by distance
//not accurate
const getZipCodesWithinDistance = (coordinates, miles) => {
    let meters = miles * miToMeters;
    console.log(meters)
    return axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=&rows=10&facet=state&facet=timezone&facet=dst&refine.state=CA&geofilter.distance=${coordinates[0]}%2C+${coordinates[1]}%2C++${meters}`)
        .then(res => {
            let zipsWithin = [];
            for(let place of res.data.records) {
                zipsWithin.push(place.fields.zip)
            }
            return zipsWithin;
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

export default {getAllStoresWithApt, getZipCodesWithinDistance, getCoorOfZip}


// {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4410387,37.7198772]},

// "properties":{"id":1046831,"url":"https://www.safeway.com/pharmacy/covid-19.html","city":"San Francisco",
// "name":"Safeway 0964","state":"CA","address":"4950 Mission St","provider":"albertsons","time_zone":
// "America/Los_Angeles","postal_code":"94112","appointments":[],"provider_brand":"safeway",
// "carries_vaccine":null,"appointment_types":{"unknown":true},"provider_brand_id":5,"provider_brand_name":
// "Safeway","provider_location_id":"1600110758794","appointments_available":true,"appointment_vaccine_types":
// {"unknown":true},"appointments_last_fetched":"2021-04-25T22:15:05.086+00:00","appointments_last_modified":
// "2021-04-25T22:03:21+00:00","appointments_available_all_doses":true,"appointments_available_2nd_dose_only":false}}

// {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4908372,37.7542109]},
// "properties":{"id":1046839,"url":"https://www.safeway.com/pharmacy/covid-19.html","city":"San Francisco",
// "name":"Safeway 0985","state":"CA","address":"2350 Noriega Street","provider":"albertsons","time_zone":
// "America/Los_Angeles","postal_code":"94122","appointments":[],"provider_brand":"safeway",
// "carries_vaccine":true,"appointment_types":{"unknown":true},"provider_brand_id":5,"provider_brand_name":
// "Safeway","provider_location_id":"1600110858656","appointments_available":true,"appointment_vaccine_types":
// {"unknown":true},"appointments_last_fetched":"2021-04-25T22:50:58.945+00:00","appointments_last_modified":
// "2021-04-25T22:33:39+00:00","appointments_available_all_doses":true,"appointments_available_2nd_dose_only":false}}

// {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4675773,37.7745526]},

// "properties":{"id":1046925,"url":"https://www.safeway.com/pharmacy/covid-19.html","city":"San Francisco"
// ,"name":"Safeway 2646","state":"CA","address":"735 7th Ave","provider":"albertsons","time_zone":
// "America/Los_Angeles","postal_code":"94118","appointments":[],"provider_brand":"safeway",
// "carries_vaccine":true,"appointment_types":{},"provider_brand_id":5,"provider_brand_name":
// "Safeway","provider_location_id":"1600111963084","appointments_available":false,"appointment_vaccine_types":
// {},"appointments_last_fetched":"2021-04-25T22:15:05.086+00:00","appointments_last_modified":
// "2021-04-25T22:03:21+00:00","appointments_available_all_doses":false,"appointments_available_2nd_dose_only":false}}