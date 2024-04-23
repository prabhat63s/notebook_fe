import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Card/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar({ userInfo, searchNote }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout successfully");
  };

  const handleSearch = () => {
    if (searchQuery) {
      searchNote(searchQuery);
    }
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2.5 border-b">
      <h2 className="text-2xl font-medium text-black py-2">Notebook</h2>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}
