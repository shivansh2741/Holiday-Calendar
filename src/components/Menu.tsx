import React, { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Country {
	countryCode: string;
	name: string;
}

interface MenuProps{
    countries : Country[];
    handleCountryClick: any;
    selectedCountry: Country;
}   

const Menu: React.FC<MenuProps> = ({countries, handleCountryClick, selectedCountry}) => {
    
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
                    <ul className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-gray-300 rounded shadow-md">
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
                )}
        </div>
    )
}

export default Menu;