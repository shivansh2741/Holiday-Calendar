import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { generateDate, months } from "./util/calender";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { fetchHolidaysByCountryAndMonth} from './services/fetchHolidays'
import countries from './util/countries'


interface Country {
	name: string;
	code: string;
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

export default function Calendar() {
	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
	const [selectedOption, setSelectedOption] = useState<'month' | 'year'>('month');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedCountry, setSelectedCountry] = useState<Country>({ name: 'Ukraine', code: 'UA' });
	const [holidays, setHolidays] = useState<Holiday[]>([]);

	useEffect(() => {
		const fetchHolidays = async () => {
			const currentYear: string = (today.year()).toString();

			const data: Holiday[] = await fetchHolidaysByCountryAndMonth(selectedCountry.code, currentYear);
			
			if(data.length !== 0){
				setHolidays(data);
				console.log(data);
			}
		}


		fetchHolidays();
	}, [selectedCountry])



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

	const getFormattedDate = (date: number, month: number, year: number): string => {
		const paddedMonth = (month + 1).toString().padStart(2, '0'); 
		const paddedDate = date.toString().padStart(2, '0');
		const formattedDate = `${year}-${paddedMonth}-${paddedDate}`;
		return formattedDate;
	};

	const condition = (date: number, month: number, year: number) => {
		const formattedDate = getFormattedDate(date, month, year);
		
		return holidays.some(holiday =>
			holiday.date === formattedDate
		);
	};
	

	function getFormattedDay(day: number): string {
		console.log(day.toString().padStart(2, '0'));
		return day.toString().padStart(2, '0');
	}

	return (
		<div className="flex gap-10 sm:divide-x justify-center sm:w-3/4 mx-auto h-screen items-center sm:flex-col flex-col">
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
				<div className="max-w-[50rem] max-h-[50rem]">
					<div className="flex justify-between items-center">
						<h1 className="select-none font-semibold">
							{months[today.month()]}, {today.year()}
						</h1>
						<div className="flex gap-10 items-center ">
							<GrFormPrevious
								className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
								onClick={() => {
									setToday(today.month(today.month() - 1));
								}}
							/>
							<h1
								className=" cursor-pointer hover:scale-105 transition-all"
								onClick={() => {
									setToday(currentDate);
								}}
							>
								Today
							</h1>
							<GrFormNext
								className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
								onClick={() => {
									setToday(today.month(today.month() + 1));
								}}
							/>
						</div>
					</div>
					<div className="grid grid-cols-7 ">
						{days.map((day, index) => {
							return (
								<h1
									key={index}
									className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
								>
									{day}
								</h1>
							);
						})}
					</div>

					<div className=" grid grid-cols-7">
						{generateDate(today.month(), today.year()).map(
							({ date, currentMonth, today }, index) => {
								return (
									<div
										key={index}
										className="p-2 text-center h-14 grid place-content-center text-sm border"	
										onClick={() => condition(date.date(),date.month(),date.year())}>
										<h1
											className={cn(
												currentMonth ? "" : "text-gray-400",
												today ? "bg-red-600 text-white" : ( condition(date.date(),date.month(),date.year())? "rounded-full bg-blue-500 text-white h-10 w-10 grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
												: ""),
												selectDate
													.toDate()
													.toDateString() ===
													date.toDate().toDateString()
													? "bg-black text-white"
													: "",
												"h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
											)}
											onClick={() => {
												setSelectDate(date);
											}}
										>
											{date.date()}
										</h1>
									</div>
								);
							}
						)}
					</div>
				</div>}
			{(selectedOption === 'year') &&
				<div> this is where year goes </div>
			}
		</div>
	);
}