"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const BlogDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const [blogDetails, setBlogDetails] = useState([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/blog/${id}`);

        if (response.status === 200) {
          setBlogDetails(response.data.data);
        } else {
          console.error("Failed to fetch blog details");
        }
      } catch (error) {
        console.error("An error occurred while fetching blog details:", error);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8">
      <div className="rounded-lg shadow-lg w-[50%] border border-gray py-5 px-7">
        <hgroup className="flex justify-between items-baseline mb-5">
          <h1 className="text-3xl font-semibold mb-4 bg-gray-200 rounded-full px-4 py-2">About Blog Details</h1>
          <Link href="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Back</button>
          </Link>
        </hgroup>
        <hr />
        {blogDetails && blogDetails.length > 0 ? (
          blogDetails?.map((blog) => {
            return (
              <>
                <div key={blog._id} className="my-5">
                  <h2 className="text-3xl font-semibold mb-5">{blog.title}</h2>
                  <p className="text-2xl text-gray-600 mb-5">{blog.description}</p>
                  <p className="text-xl text-gray-700 mt-2 mb-10">{blog.content}</p>
                </div>

                <hr />

                <Link href="#" className="flex justify-center gap-5 my-5">
                  <button className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Author - {blog.author}
                  </button>
                  <button className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Created on {new Date(blog.createdAt).toLocaleDateString()}
                  </button>
                </Link>
              </>
            );
          })
        ) : (
          <>
            <div className="my-11 flex flex-col justify-start gap-5">
              <button className="bg-gray-200 rounded-full px-10 py-3 text-sm font-semibold text-gray-700 w-1/3"></button>
              <button className="bg-gray-200 rounded-full px-10 py-3 text-sm font-semibold text-gray-700 w-1/2"></button>
              <button className="bg-gray-200 rounded-full px-10 py-3 text-sm font-semibold text-gray-700 w-3/4"></button>
            </div>

            <hr />

            <Link href="#" className="flex justify-center gap-5 my-5">
              <button className="bg-gray-200 rounded-full px-10 py-3 text-sm font-semibold text-gray-700"></button>
              <button className="bg-gray-200 rounded-full px-10 py-3 text-sm font-semibold text-gray-700"></button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
