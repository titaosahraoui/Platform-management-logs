import { useState } from 'react';
import SearchIcon from "../assets/search.svg?react";
import FilterIcon from "../assets/filter.svg?react";


interface SearchBoxProps {
    setSearchTerm: (value: string) => void
    searchTerm: string
    boxStyles?: string
    searchBy?: string
    DropList?: string[]
}
const SearchBox = ({ setSearchTerm, searchTerm, boxStyles, DropList, searchBy }: SearchBoxProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleFilterIconClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleOptionClick = (option: string) => {
        setSearchTerm(option);
        setIsDropdownOpen(false);
    };
    return (
        <div className='relative w-fit'>
            <input className={`border px-8 p-2 rounded-lg focus:border-[#FF4B00] hover:border-[#FF4B00] duration-200  outline-none ${boxStyles}`} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder={`${(searchBy || "search")}`} />
            {/* Currently is not yet ready  */}
            {DropList && (
                <div className='relative inline-block -translate-y-6'>
                    <FilterIcon
                        className='w-4 h-4 absolute top-3 right-2 hover:scale-105 duration-200 cursor-pointer text-gray-500 '
                        onClick={handleFilterIconClick}
                    />
                    {isDropdownOpen && (
                        <div className='absolute right-0 top-8 mt-2 p-2 bg-white border rounded-lg shadow-md text-center min-w-32'>
                            {DropList.map((option, index) => (
                                <div
                                    key={index}
                                    className='cursor-pointer p-2 hover:bg-gray-100'
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <h1 className='w-fit text-center '>{option}</h1>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <SearchIcon className={`w-4 h-4 absolute  top-3 end-2 `} />
        </div>
    );
};

export default SearchBox;