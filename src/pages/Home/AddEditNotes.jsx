import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstacne";
import toast from "react-hot-toast";

export default function AddEditNotes({ noteData, type, getAllNotes, onClose }) {
  // Ensure that noteData is defined before accessing its properties
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  // add note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        toast.success("Note added Successfully!");
        getAllNotes();
        onClose(); // Close the modal after successfully adding the note
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error("Error adding note!");
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        toast.success("Note updated Successfully!");
        getAllNotes();
        onClose(); // Close the modal after successfully updating the note
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error("Error occurred while updating!");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }
    if (!content) {
      setError("Please enter a content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div>
      <div className="w-full flex justify-end">
        <button
          className="text-neutral-600 hover:text-neutral-950 p-1 hover:bg-neutral-200 rounded-md"
          onClick={onClose}
        >
          <MdClose />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-neutral-600">Title</label>
        <input
          type="text"
          className="bg-slate-100  p-2 border border-gray-300 rounded-md text-xl outline-none"
          placeholder="Titel..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-neutral-600">Content</label>
        <textarea
          type="text"
          rows={8}
          className="bg-slate-100  p-2 border resize-none border-gray-300 rounded-md outline-none"
          placeholder="Content..."
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-neutral-600">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
      <button
        className="w-fit bg-neutral-950 text-white rounded-md font-medium mt-5 py-1.5 px-4 hover:bg-neutral-800"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
}
