import dayjs from "dayjs";
import React, { useEffect, useState, useRef } from "react";
import { generateDate, months } from "../util/calender";
import cn from "../util/cn";
import { fetchHolidaysByCountryAndMonth } from '../services/fetchHolidays'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";


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

interface CalendarProps {
    selectedCountry: Country;
    selectedOption: string;
    today: dayjs.Dayjs;
    setToday: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}


const Calendar: React.FC<CalendarProps> = ({ selectedCountry, selectedOption, today, setToday }) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();
    const [selectDate, setSelectDate] = useState(currentDate);
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const outsideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (outsideRef.current && !outsideRef.current.contains(event.target as Node)) {
                setSelectDate(currentDate);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [currentDate]);

    const handleMouseEnter = (index: number) => {
        const id = setTimeout(() => {
            setPopupVisible(true);
            setHoveredDate(index);
        }, 0);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setPopupVisible(false);
        setHoveredDate(null);
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

    const fetchHolidayDetails = (date: number, month: number, year: number) => {
        const formattedDate = getFormattedDate(date, month, year);

        const holiday = holidays.find(holiday => holiday.date === formattedDate);
        return holiday ? holiday.name : undefined;
    }

    const [popupVisible, setPopupVisible] = useState(false);
    const [hoveredDate, setHoveredDate] = useState<number | null>(null);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);


    useEffect(() => {
        const fetchHolidays = async () => {
            const currentYear: string = (today.year()).toString();

            const data: Holiday[] = await fetchHolidaysByCountryAndMonth(selectedCountry.countryCode, currentYear);

            if (data.length !== 0) {
                setHolidays(data);
                // console.log(data);
            }
        }


        fetchHolidays();
    }, [selectedCountry, today.year()])



    return (
        <div ref={outsideRef} className="mr-8 mr-8 mb-8">
            <div className="flex justify-between items-center">
                <h1 className="select-none font-semibold">
                    {months[today.month()]}, {today.year()}
                </h1>
                {(selectedOption === 'month') && <div className="flex gap-10 items-center lg:ml-auto">
                    <GrFormPrevious
                        className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                        onClick={() => {
                            setToday(today.month(today.month() - 1));
                        }}
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
                            setToday(today.month(today.month() + 1));
                        }}
                    />
                </div>}
            </div>
            <div className="grid grid-cols-7">
                {days.map((day, index) => (
                    <h1
                        key={index}
                        className={`text-sm text-center h-16 ${selectedOption === "month" ? "sm:w-20 lg:w-40 md:w-24" : "w-1/7"
                            } grid place-content-center text-gray-500 select-none`}
                    >
                        {day}
                    </h1>
                ))}

                {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                    <div
                        key={index}
                        className={`p-2 text-center ${selectedOption === "month" ? "sm:w-1/7 lg:w-1/7" : "w-1/7"
                            } grid place-content-center text-sm border`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => console.log(date)}
                    >
                        <div className="flex flex-col justify-between items-center">
                            <h1
                                className={cn(
                                    currentMonth ? "" : "text-gray-400",
                                    today ? "bg-red-600 text-white" : condition(date.date(), date.month(), date.year())
                                        ? "rounded-full bg-blue-500 text-white h-10 w-10 grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                                        : "",
                                    selectDate.toDate().toDateString() === date.toDate().toDateString()
                                        ? "bg-black text-white"
                                        : "",
                                    "lg:h-10 lg:w-10 md:h-10 md:w-10 sm:h-6 sm:w-6 w-6 h-6 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                                )}
                                onClick={() => {
                                    setSelectDate(date);
                                }}
                            >
                                {date.date()}
                            </h1>
                            {(selectedOption === "month") && windowWidth >= 1024 && (
                                <p style={{ fontSize: '0.75rem' }}>
                                {(() => {
                                    const event = fetchHolidayDetails(date.date(), date.month(), date.year());
                                    return event && event.length >= 20 ? `${event.slice(0, 20)}...` : event;
                                })()}
                            </p>
                            )}
                        </div>
                        {condition(date.date(), date.month(), date.year()) && popupVisible && hoveredDate === index && (
                            <div className="absolute mt-12 ml-4 bg-blue-500 text-white border border-gray-300 shadow-lg rounded-lg p-4" style={{ zIndex: 999 }}>
                                <p>{fetchHolidayDetails(date.date(), date.month(), date.year())}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>


        </div>
    )
}


export default Calendar;