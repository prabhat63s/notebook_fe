import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar({ value, onChange, handleSearch }) {
  return (
    <div className="w-80 hidden lg:flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
      <input
        type="text"
        placeholder="Search Notebook"
        value={value}
        onChange={onChange}
        className="w-full bg-transparent py-2 pl-2 outline-none"
      />
      <FaMagnifyingGlass
        onClick={handleSearch}
        className="text-neutral-500 border-l border-gray-300 mx-2 pl-2 text-2xl cursor-pointer"
      />
    </div>
  );
}
