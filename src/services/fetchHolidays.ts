import axios from 'axios';

const API_KEY: string = 'e2d94ccc7c5b4b558ac169d10eeb5751';
interface Holiday {
    name: string;
    name_local?: string;
    language?: string;
    description?: string;
    country: string;
    location: string;
    type: string;
    date: string;
    date_year: string;
    date_month: string;
    date_day: string;
    week_day: string;
}



export  async function fetchHolidaysByCountryAndMonth(countryCode : string, year : string): Promise<Holiday[]> {
    return axios.get<Holiday[]>(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`)
    .then(response => {
        const nationalHolidays = response.data
        // console.log(nationalHolidays);
        return nationalHolidays;
    })
    .catch(error => {
        // console.log(error);
        return [];
    });
}


