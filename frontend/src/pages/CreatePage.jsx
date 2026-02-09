import React, { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-4">
            <ArrowLeftIcon className="size-4 mr-2" />
            Back to Home
          </Link>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Note Content"
                className="textarea textarea-bordered w-full mb-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end p-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
