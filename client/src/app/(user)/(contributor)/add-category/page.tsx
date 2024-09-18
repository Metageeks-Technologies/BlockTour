"use client";
import Header from "@/components/Header";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { useAppDispatch } from "@/app/redux/hooks";
import { addCategory } from "@/app/redux/feature/category/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import UserHearder from "@/components/UserHearder";
import Sidebar from "@/components/contributor/Sidebar";
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddCategoryPage = () => {
  const dispatch = useAppDispatch(); // Initialize dispatch
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const newCategory = {
      name,
      slug,
      description: value,
    };
    try {
      // Dispatch the addCategory action
      await addCategory(dispatch, newCategory);

      // Show success notification
      // notifySuccess("Category added successfully!");
      alert("Category added successfully!")
        router.push("./category-list")
      // Clear form after successful submission
      setName("");
      setSlug("");
      setValue("");
    } catch (error) {
      notifyError("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  
        <div className="lg:ml-64 h-screen bg-[#0A090F] text-white m-4 rounded-2xl w-full border border-[#28272D]">
          <div className="border-b border-[#28272D] px-4 py-4">
            <h1 className="text-xl px-6">Add New Category</h1>
          </div>
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Wrap form in onSubmit */}
            <div className="flex px-8 py-6 gap-5">
              <div className="w-full">
                <div className="flex gap-3 w-full mb-4 text-[#7B7A7F]">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Category Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 outline-none custom-input"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Slug"
                      value={slug}
                      disabled={loading}
                      onChange={(e) => setSlug(e.target.value)} // Update slug state
                      className="w-full bg-[#0A090F] border border-[#414141] rounded p-2 outline-none custom-input"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <label className="block text-sm font-medium mb-3 text-[#7B7A7F]">
                    Description
                  </label>
                  <div className="bg-[#0A090F] rounded p-2 border border-[#414141]">
                    <div className="px-4 flex gap-4">
                      <p className="text-neutral-500 text-xs">File</p>
                      <p className="text-neutral-500 text-xs">Edit</p>
                      <p className="text-neutral-500 text-xs">View</p>
                      <p className="text-neutral-500 text-xs">Insert</p>
                      <p className="text-neutral-500 text-xs">Format</p>
                      <p className="text-neutral-500 text-xs">Tools</p>
                      <p className="text-neutral-500 text-xs">Table</p>
                      <p className="text-neutral-500 text-xs">Help</p>
                    </div>
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                      placeholder="Enter description..."
                      modules={{
                        toolbar: [
                          [{ font: [] }],
                          [{ size: [] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ color: [] }, { background: [] }],
                          [{ script: "sub" }, { script: "super" }],
                          ["blockquote", "code-block"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ align: [] }],
                          ["link", "image"],
                        ],
                      }}
                      formats={[
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "color",
                        "background",
                        "script",
                        "blockquote",
                        "code-block",
                        "list",
                        "bullet",
                        "align",
                        "link",
                        "image",
                      ]}
                      className="text-white"
                      readOnly={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 flex justify-end">
              <button
                type="submit" // Set button type to submit
                className="py-2 px-6 bg-[#DF841C] rounded text-[#000000] shadow-md"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add New Category"}
              </button>
            </div>
          </form>
        </div>
     
  );
};

export default AddCategoryPage;
