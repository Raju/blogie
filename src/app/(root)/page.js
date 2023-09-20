"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import BlogList from "@components/Blog/BlogList";
import Modal from "@components/Modal/Modal";
import { BlogValidationSchema } from "@config/BlogValidationSchema";

const Home = () => {
  const [blogs, setBlogs] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedBlogToEdit, setSelectedBlogToEdit] = useState({});

  const initialValues = {
    title: "",
    description: "",
    content: "",
    author: "",
  };

  const handleAddBlog = async (blogData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/blog", blogData);

      if (response.status === 200) {
        setBlogs([...blogs, response.data.data[0]]);

        setIsOpen(false);
      } else {
        console.error("Failed to create blog:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while creating the blog:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/blog?id=${id}`);

      if (response.status === 200) {
        const updatedBlogs = blogs.filter((blog) => blog._id !== id);

        setBlogs(updatedBlogs);
      } else {
        console.error("Failed to delete blog:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the blog:", error);
    }
  };

  const handleEditModal = async (blogData) => {
    setSelectedBlogToEdit(blogData);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleEditBlog = async (blogData) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/blog/${blogData._id}`, blogData);

      if (response.status === 200) {
        const editedBlogIndex = blogs.findIndex((blog) => blog._id === blogData._id);
        const updatedBlogs = [...blogs];

        updatedBlogs[editedBlogIndex] = response.data.data[0];

        setBlogs(updatedBlogs);
        setIsOpen(false);
      } else {
        console.error("Failed to edit blog:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while editing the blog:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3000/api/v1/blog");

      setBlogs(response.data.data);
    })();
  }, []);

  return (
    <main className="flex flex-col justify-center items-center gap-5 w-100 p-28">
      <button onClick={() => setIsOpen(true)} className="bg-green-600 text-white rounded-md w-1/2 py-2">
        Add new blog
      </button>

      <BlogList blogs={blogs} handleDeleteBlog={handleDeleteBlog} handleEditModal={handleEditModal} />

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          handleAddBlog={handleAddBlog}
          handleEditBlog={handleEditBlog}
          initialValues={isEdit ? selectedBlogToEdit : initialValues}
          validationSchema={BlogValidationSchema}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
    </main>
  );
};

export default Home;
