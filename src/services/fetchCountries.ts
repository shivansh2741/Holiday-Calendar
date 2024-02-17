import axios from 'axios';

const url = 'https://date.nager.at/api/v3';
interface Country {
    countryCode: string;
    name: string;
}

export  async function fetchAllCountries(): Promise<Country[]> {
    return axios.get<Country[]>(`${url}/AvailableCountries`)
    .then(response => {
        const countries = response.data
        // console.log(countries);
        return countries;
    })
    .catch(error => {
        // console.log(error);
        return [];
    });
}


