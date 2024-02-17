import axios from 'axios';

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


