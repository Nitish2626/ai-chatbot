import { FaArrowTurnUp } from "react-icons/fa6";

const SearchBar = () => {
    return (
        <form className="w-full h-18 flex gap-3 fixed bottom-0 bg-black py-2 px-2">
            <input
                type="text"
                placeholder="Search"
                className="w-10/12 py-1 px-2 rounded-md text-xl outline-none"
            />

            <button type="submit" className="w-2/12 flex items-center justify-center bg-green-500 text-white text-xl rounded-md hover:bg-green-700">
                <FaArrowTurnUp />
            </button>
        </form>
    );
};

export default SearchBar;