/* eslint-disable react/prop-types */
import moment from "moment";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

export default function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className="border h-fit rounded p-4 hover:shadow-lg transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-sm font-medium">{title}</h1>
          <span className="text-xs text-neutral-600">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`cursor-pointer ${
            isPinned ? "text-blue-500" : "text-neutral-600"
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-sm mt-2">{content}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-neutral-600">
          {tags.map((item) => `#${item}`)}
        </div>
        <div className="flex text-neutral-600 items-center gap-2">
          <MdCreate className="hover:text-green-500" onClick={onEdit} />
          <MdDelete className="hover:text-red-500" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
