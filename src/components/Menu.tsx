import React, { useEffect, useState, useRef } from 'react'
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
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

    const menuAction = (country: Country) => {
        handleCountryClick(country)
        toggleMenu();
        setFilteredCountries(countries);
    }

    
    const onSearch = (q:string) => {
        setFilteredCountries(
            countries.filter((country) => {
                return country.name.toLowerCase().startsWith(q.toLowerCase());
            })
        )
        // console.log(filteredCountries)
    }

    useEffect(() => {
      setFilteredCountries(countries)
    }, [countries])
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return (
        <div ref={menuRef}>
            <button  onClick={toggleMenu} className="lg:px-4 lg:py-2 md:px-4 md:py-2 sm:px-4 sm:py-2 py-2 px-4 bg-gray-200 border border-gray-300 rounded flex items-center">
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
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="input-group-search"
                                    className="block w-full p-2 ps-10 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                    placeholder="Search"
                                    onChange={(event) => onSearch(event.target.value)}
                                />
                            </div>
                        </div>
                        <ul className="h-48 px-3 pb-3 overflow-y-auto text-lg">
                            {filteredCountries.map((country, index) => (
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