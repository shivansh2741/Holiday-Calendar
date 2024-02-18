import React from 'react'
import Menu from './Menu';

interface Country {
    countryCode: string;
    name: string;
}

interface NavbarProps {

    selectedOption: string;
    handleSelectMonth: any;
    handleSelectYear: any;
    countries: Country[];
    handleCountryClick: any;
    selectedCountry: Country;
}

const Navbar: React.FC<NavbarProps> = (props) => {
   
    let {
        selectedOption,
        handleSelectMonth,
        handleSelectYear,
        countries,
        selectedCountry,
        handleCountryClick
    } = props

	const [showMessage, setShowMessage] = React.useState(false);

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col">
                <button
                    className={`mt-2 mr-2 px-4 py-2 w-24 rounded ${selectedOption === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleSelectMonth()}
                >
                    Month
                </button>
                <button
                    className={`mt-2 px-4 py-2 rounded w-24 ${selectedOption === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleSelectYear()}
                >
                    Year
                </button>
            </div>

            <Menu countries={countries} handleCountryClick={handleCountryClick} selectedCountry={selectedCountry} />

            <div className="relative inline-block hidden md:block">
                <button
                    className="mr-10 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300 hover:bg-blue-700"
                    onMouseEnter={() => setShowMessage(true)}
                    onMouseLeave={() => setShowMessage(false)}
                >
                    <span className="text-xs">i</span>
                </button>
                {showMessage && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-700 p-4 rounded-md shadow-md w-40 bg-opacity-90">
                        <div className="flex flex-col">
                            <div className="flex mb-2">
                                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                                <p className="text-sm">Today's Date</p>
                            </div>
                            <div className="flex mb-2">
                                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                                <p className="text-sm">Public Holiday</p>
                            </div>
                            <div className="flex">
                                <div className="w-4 h-4 rounded-full bg-black mr-2"></div>
                                <p className="text-sm">Selected Date</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;