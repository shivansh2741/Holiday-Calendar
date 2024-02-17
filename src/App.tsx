import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { fetchAllCountries } from "./services/fetchCountries";
import Calendar from "./components/Calendar"
import Menu from "./components/Menu";

interface Country {
	countryCode: string;
	name: string;
}

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


export default function App() {

	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectedOption, setSelectedOption] = useState<'month' | 'year'>('month');
	const [selectedCountry, setSelectedCountry] = useState<Country>({ countryCode: 'Select a country', name: 'Select a country' });
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const [countries, setCountries] = useState<Country[]>([]);



	const handleSelectMonth = () => {
		setSelectedOption('month');
	};

	const handleSelectYear = () => {
		setSelectedOption('year');
	};

	const handleCountryClick = (country: Country) => {
		console.log(country)
		setSelectedCountry(country);
	};




	useEffect(() => {

		fetchAllCountries().then(
			(data) => {
				setCountries(data);
				console.log(data);
			}
		)



	}, [])

	const [showMessage, setShowMessage] = React.useState(false);
	const months = Array.from({ length: 12 }, (_, index) => index + 1);
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex gap-10 justify-center h-screen items-center sm:flex-col flex-col m-10">
				<div className="flex items-center justify-between w-full"> 
					<div className=""> 
						<button
							className={`mr-2 px-4 py-2 rounded ${selectedOption === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
							onClick={handleSelectMonth}
						>
							Month
						</button>
						<button
							className={`px-4 py-2 rounded ${selectedOption === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
							onClick={handleSelectYear}
						>
							Year
						</button>
					</div>

					<Menu countries={countries} handleCountryClick={handleCountryClick} selectedCountry={selectedCountry} />

					<div className="relative inline-block">
						<button
							className="mr-10 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300 hover:bg-blue-700"
							onMouseEnter={() => setShowMessage(true)}
							onMouseLeave={() => setShowMessage(false)}
						>
							<span className="text-xs">i</span>
						</button>
						{showMessage && (
							<div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-700 p-4 rounded-md shadow-md w-40 bg-opacity-90">
								<div className="flex flex-col items-center">
									<div className="flex items-center mb-2">
										<div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
										<p className="text-sm">Today's Date</p>
									</div>
									<div className="flex items-center mb-2">
										<div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
										<p className="text-sm">Public Holiday</p>
									</div>
									<div className="flex items-center">
										<div className="w-4 h-4 rounded-full bg-black mr-2"></div>
										<p className="text-sm">Selected Date</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{(selectedOption === 'month') &&
					<div className="max-w-100 max-h-100">
						<Calendar selectedCountry={selectedCountry} selectedOption={selectedOption} today={today} setToday={setToday} />
					</div>}
				{(selectedOption === 'year') &&
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{months.map((month, index) => {

							const todayForMonth = dayjs().startOf('year').add(index, 'month');

							return (
								<Calendar
									key={month}
									selectedCountry={selectedCountry}
									selectedOption={selectedOption}
									today={todayForMonth}
									setToday={() => { }}
								/>
							);
						})}
					</div>
				}
			</div>
		</div>
	);
}