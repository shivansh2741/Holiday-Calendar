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


export  async function fetchHolidaysByCountryAndYear(countryCode : string, year : string): Promise<Holiday[]> {
    return axios.get<Holiday[]>(`https://holidays.abstractapi.com/v1/?api_key=e2d94ccc7c5b4b558ac169d10eeb5751&country=${countryCode}&year=${year}`)
    .then(response => {
        const nationalHolidays = response.data.filter(holiday => holiday.type === 'National');
        console.log(nationalHolidays);
        return nationalHolidays;
    })
    .catch(error => {
        console.log(error);
        throw error; 
    });
}

export  async function fetchHolidaysByCountryAndMonth(countryCode : string, year : string, month : string): Promise<Holiday[]> {
    return axios.get<Holiday[]>(`https://holidays.abstractapi.com/v1/?api_key=e2d94ccc7c5b4b558ac169d10eeb5751&country=${countryCode}&year=${year}&month=${month}`)
    .then(response => {
        const nationalHolidays = response.data.filter(holiday => holiday.type === 'National');
        console.log(nationalHolidays);
        return nationalHolidays;
    })
    .catch(error => {
        console.log(error);
        // throw error; 
        return [];
    });
    // return null;
}

export  async function fetchHolidaysByCountryAndDay(countryCode : string, year : string, month : string, day : string): Promise<Holiday[]> {
    return axios.get<Holiday[]>(`https://holidays.abstractapi.com/v1/?api_key=e2d94ccc7c5b4b558ac169d10eeb5751&country=${countryCode}&year=${year}&month=${month}&day=${day}`)
    .then(response => {
        const nationalHolidays = response.data.filter(holiday => holiday.type === 'National');
        console.log(nationalHolidays);
        return nationalHolidays;
    })
    .catch(error => {
        console.log(error);
        throw error; 
    });
}

