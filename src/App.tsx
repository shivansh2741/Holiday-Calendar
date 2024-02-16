import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { fetchAllCountries } from "./services/fetchCountries";
import Calendar from "./components/Calendar"

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
	
	const [selectedOption, setSelectedOption] = useState<'month' | 'year'>('month');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedCountry, setSelectedCountry] = useState<Country>({ countryCode: 'Ukraine', name: 'UA' });
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const [countries, setCountries] = useState<Country[]>([]);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSelectMonth = () => {
		setSelectedOption('month');
	};

	const handleSelectYear = () => {
		setSelectedOption('year');
	};

	const handleCountryClick = (country: Country) => {
		setSelectedCountry(country);
		toggleMenu();
	};


	

	useEffect( () => {

		fetchAllCountries().then(
			(data) => {
				setCountries(data);
				console.log(data);
			}
		)
		
		

	}, [])

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col items-center m-10">
				
				<div className="flex items-center mb-2">
					<div className="w-4 h-4 rounded-full bg-red-500 mr-4"></div>
					<p className="text-base">Today's Date</p>
				</div>

				
				<div className="flex items-center mb-2">
					<div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
					<p className="text-base">Public Holiday</p>
				</div>

				
				<div className="flex items-center">
					<div className="w-4 h-4 rounded-full bg-black mr-2"></div>
					<p className="text-base">Selected Date</p>
				</div>
			</div>


			<div className="flex gap-10 sm:divide-x justify-center h-screen items-center sm:flex-col flex-col m-10">
				<div>
					<button
						className={`mr-2 px-4 py-2 rounded ${selectedOption === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
							}`}
						onClick={handleSelectMonth}
					>
						Month
					</button>
					<button
						className={`px-4 py-2 rounded ${selectedOption === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
							}`}
						onClick={handleSelectYear}
					>
						Year
					</button>
				</div>
				<button onClick={toggleMenu} className="px-4 py-2 bg-gray-200 border border-gray-300 rounded flex items-center">
					<FaMapMarkerAlt className="mr-2 text-gray-500" />
					{selectedCountry.name}
				</button>
				{isOpen &&
					(
						<ul className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-gray-300 rounded shadow-md">
							{countries.map((country, index) => (
								<li
									key={index}
									onClick={() => handleCountryClick(country)}
									className="px-4 py-2 cursor-pointer hover:bg-gray-100"
								>
									{country.name}
								</li>
							))}
						</ul>
					)}
				{(selectedOption === 'month') &&
					<div className="max-w-[100rem] max-h-[50rem]">
						<Calendar selectedCountry={selectedCountry}/>
					</div>}
				{(selectedOption === 'year') &&
					<div> this is where year goes </div>
				}
			</div>
		</div>
	);
}