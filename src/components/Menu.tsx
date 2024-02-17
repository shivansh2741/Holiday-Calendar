import React, { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Country {
    countryCode: string;
    name: string;
}

interface MenuProps {
    countries: Country[];
    handleCountryClick: any;
    selectedCountry: Country;
}

const Menu: React.FC<MenuProps> = ({ countries, handleCountryClick, selectedCountry }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const menuAction = (country: Country) => {
        handleCountryClick(country)
        toggleMenu();
    }
    return (
        <div>
            <button onClick={toggleMenu} className="px-4 py-2 bg-gray-200 border border-gray-300 rounded flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                {selectedCountry.name}
            </button>
            {isOpen &&
                (
                    <div className="absolute mt-2 z-10 bg-white border border-gray-300 rounded-lg">
                        <div className="p-3">
                            <label htmlFor="input-group-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="input-group-search" className="block w-full p-2 ps-10 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search" />
                            </div>
                        </div>
                        <ul className="h-48 px-3 pb-3 overflow-y-auto text-lg">
                            {countries.map((country, index) => (
                                <li
                                    key={index}
                                    onClick={() => menuAction(country)}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {country.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    )
}

export default Menu;