import { MdArrowBack } from "react-icons/md";

export default function SearchNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-4xl text-neutral-800 font-semibold mb-4">
        No notebook found related to search
      </h1>
      <button
        onClick={() => {
          window.location.reload(); // Reload the window
        }}
        className="text-neutral-100 flex items-center gap-2 hover:bg-neutral-800 shadow-lg bg-neutral-950 p-1.5 rounded-md px-4"
      >
        <MdArrowBack />
        Back
      </button>
    </div>
  );
}
