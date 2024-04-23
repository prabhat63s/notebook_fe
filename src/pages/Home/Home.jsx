import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Card/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstacne";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import EmptyCard from "../../components/Card/EmptyCard";
import toast from "react-hot-toast";
import SearchNotFound from "../../components/SearchBar/SearchNotFound";

export default function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    date: null,
  });

  const now = new Date();
  const year = now.getFullYear();

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  // edit note
  const handleEdit = (notDetails) => {
    setOpenAddEditModal({ isShow: true, noteData: notDetails, type: "edit" });
  };

  useEffect(() => {
    Modal.setAppElement("#root"); // Set the app element
    getUserInfo(); // Fetch user information on component mount
  }, []);

  // get user information
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error("Error fetching user info:", error);
      }
    }
  };

  // get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      toast.error("An error occurred while fetching notes");
    }
  };

  // delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        toast.success("Note deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error("An error occurred while fetching notes");
      }
    }
  };

  // search
  const searchNote = async (query) => {
    try {
      console.log("Search query:", query);
      const response = await axiosInstance.get("/search-note", {
        params: { query },
      });

      console.log("Search response:", response.data);

      if (response.data && !response.data.error) {
        setIsSearch(true);
        setAllNotes(response.data.matchNote);
      } else {
        setIsSearch(false);
        setAllNotes([]);
      }
    } catch (error) {
      console.log("Search error:", error);
    }
  };

  // pin note
  const updatePinnedNote = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        toast.success("Pinned Update Successfully");
        getAllNotes();
      }
    } catch (error) {
      toast.error("Error updating note");
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo(); // Fetch user information on component
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} searchNote={searchNote} />

      <div className="w-full p-6 overflow-auto h-[80vh]">
        {isSearch ? (
          allNotes.length > 0 ? (
            <div className="w-full grid grid-cols-3 gap-6">
              {allNotes.map((item, index) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item, index)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => updatePinnedNote(item)}
                />
              ))}
            </div>
          ) : (
            <SearchNotFound />
          )
        ) : allNotes.length > 0 ? (
          <div className="w-full grid grid-cols-3 gap-6">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item, index)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updatePinnedNote(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>

      <button
        className="fixed bottom-14 lg:bottom-10 right-5 z-50 text-white hover:bg-green-400 bg-green-500 p-2 rounded-md shadow-md hover:shadow-lg"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", date: null });
        }}
      >
        <MdAdd size={30} />
      </button>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() =>
          setOpenAddEditModal({ isShow: false, type: "add", noteData: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        contentLabel=""
        className="w-[90%] lg:w-[60%] my-24  bg-white rounded-md mx-auto p-5"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.noteData}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", noteData: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
      {/* footer  */}
      <div className="fixed bottom-0 py-4 w-full text-center">
        <p className="font-medium">
          Copyright © {year}{" "}
          <Link to="https://prabhat-singh.vercel.app/" target="_/blank">
            Prabhat singh
          </Link>
        </p>
      </div>
    </div>
  );
}
