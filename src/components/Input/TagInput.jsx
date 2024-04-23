import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

export default function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    // Validate input before adding the tag
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]); // Add trimmed tag to the tags array
      setInputValue(""); // Clear input after adding the tag
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1">
              #{tag}
              <button
                className="text-neutral-600"
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="bg-slate-100 rounded-md py-1 px-2 outline-none border"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag..."
        />
        <button
          className="text-white bg-green-500 hover:bg-green-400 p-1 rounded-md shadow-md hover:shadow-lg"
          onClick={addNewTag}
        >
          <MdAdd size={24} />
        </button>
      </div>
    </div>
  );
}
