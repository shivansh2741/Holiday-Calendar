import axios from 'axios';

const API_KEY: string = 'e2d94ccc7c5b4b558ac169d10eeb5751';

export  function fetchHolidaysByCountryAndYear(countryCode : string, year : string): void {
    axios.get(`https://holidays.abstractapi.com/v1/?api_key=e2d94ccc7c5b4b558ac169d10eeb5751&country=${countryCode}&year=${year}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

export  function fetchHolidaysByCountryAndMonth(countryCode : string, year : string, month : string): void {
    axios.get(`https://holidays.abstractapi.com/v1/?api_key=e2d94ccc7c5b4b558ac169d10eeb5751&country=${countryCode}&year=${year}&month=${month}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

export  function fetchHolidaysByCountryAndDay(countryCode : string, year : string, month : string, day : string): void {
    axios.get(`https://holidays.abstractapi.com/v1/?api_key=e2d94ccc7c5b4b558ac169d10eeb5751&country=${countryCode}&year=${year}&month=${month}&day=${day}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

// fetchHolidays();
