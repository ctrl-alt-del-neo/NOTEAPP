import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    // Fetch note details using the id from params
    // Example: api.get(`/notes/${id}`).then(response => setNote(response.data)).catch(error => console.error(error)).finally(() => setLoading(false));
    const fetchNote = async () => {
      try {
        // Simulate API call to fetch note details
        const res = await api.get(`/notes/${id}`);
        if (!res.data) {
          toast.error("Note not found");
          navigate("/");
          return;
        }
        setNote(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching note details:", error);
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoaderIcon className="animate-spin size-8 text-primary" />
      </div>
    );
  }
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error deleting note:", error);
    }
  };

  const handleSacve = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error updating note:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className=" flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="ml-2">Back</span>
            </Link>
            <button
              onClick={handleDelete}
              className={`btn ${saving ? "loading" : "btn-primary"}`}
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create a New Note</h2>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Note Title"
                className="input input-bordered w-full mb-4"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Note Content"
                className="textarea textarea-bordered w-full mb-4"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>
            <div className="card-footer flex justify-end">
              <button
                onClick={handleSacve}
                className={`btn ${saving ? "loading" : "btn-primary"}`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
