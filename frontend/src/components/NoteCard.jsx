import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();
  const handleUpdate = (e, id) => {
    e.preventDefault();
    // Implement update functionality here
    console.log("Update note with ID:", note._id);
    navigate(`/create?edit=${id}`);
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    // Implement delete functionality here
    console.log("Delete note with ID:", note._id);
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transitional-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/50">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleUpdate(e, note._id)}
            >
              <PenSquareIcon className="size-4 text-base-content/70" />
            </button>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4 text-base-content/70" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
