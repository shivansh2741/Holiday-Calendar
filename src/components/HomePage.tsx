import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { fetchAllCountries } from "../services/fetchCountries";
import Calendar from "./Calendar"
import Navbar from "./Navbar";
import { setDefaultResultOrder } from "dns";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";


interface Country {
	countryCode: string;
	name: string;
}

export default function HomePage() {

	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectedOption, setSelectedOption] = useState<'month' | 'year'>('month');
	const [selectedCountry, setSelectedCountry] = useState<Country>({ countryCode: 'Select a country', name: 'Select a country' });
	const [countries, setCountries] = useState<Country[]>([]);



	const handleSelectMonth = () => {
		setSelectedOption('month');
	};

	const handleSelectYear = () => {
		setSelectedOption('year');
	};

	const handleCountryClick = (country: Country) => {
		// console.log(country)
		setSelectedCountry(country);
		
	};




	useEffect(() => {

		fetchAllCountries().then(
			(data) => {
				setCountries(data);
				// console.log(data);
			}
		)



	}, [])

	const months = Array.from({ length: 12 }, (_, index) => index + 1);
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex gap-10 justify-center h-screen items-center flex-col m-10">

				<Navbar
					selectedOption = {selectedOption}
					handleSelectMonth = {handleSelectMonth}
					handleSelectYear = {handleSelectYear}
					countries = {countries}
					selectedCountry = {selectedCountry}
					handleCountryClick = {handleCountryClick}
				/>
				{(selectedOption === 'year') && <div className="flex gap-10 items-center lg:ml-auto">
                    <GrFormPrevious
                        className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                        onClick={() => {
							setToday(today.year(today.year() - 1));                        }}
                    />
                    <h1
                        className="cursor-pointer hover:scale-105 transition-all px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100"
                        onClick={() => {
                            setToday(currentDate);
                        }}
                    >
                        Today
                    </h1>
                    <GrFormNext
                        className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                        onClick={() => {
							setToday(today.year(today.year() + 1));
                        }}
                    />
                </div>}
				{(selectedOption === 'month') &&
					<div className="max-w-100 max-h-100">
						<Calendar selectedCountry={selectedCountry} selectedOption={selectedOption} today={today} setToday={setToday} />
					</div>}
				{(selectedOption === 'year') &&
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{months.map((month, index) => {

							const todayForMonth = today.startOf('year').add(index, 'month');

							return (
								<Calendar
									key={month}
									selectedCountry={selectedCountry}
									selectedOption={selectedOption}
									today={todayForMonth}
									setToday={setToday}
								/>
							);
						})}
					</div>
				}
			</div>
		</div>
	);
}