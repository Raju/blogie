import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import ShowSkeletonBlog from "./ShowSkeletonBlog";

const BlogList = ({ blogs, handleDeleteBlog, handleEditModal }) => {
  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs?.map((blog) => {
          const { _id, title, description, content, author, updatedAt } = blog;

          return (
            <article key={_id + title} className="rounded-lg shadow-lg w-[50%] border border-gray py-5 px-7">
              <header className="flex justify-between items-baseline">
                <hgroup className="mb-5">
                  <h2 className="font-bold text-xl mb-2">{title}</h2>
                  <p className="text-gray-700 text-base">{description}</p>
                </hgroup>

                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEditModal(blog)}>
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => handleDeleteBlog(_id)}>
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </header>
              <footer className="flex justify-between items-baseline mb-1">
                <div className="flex gap-2">
                  <p className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-500">{author}</p>
                  <time dateTime={updatedAt} className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-500">
                    {moment(updatedAt).format("MM/DD/YY, hh:mm a")}
                  </time>
                </div>
                <Link href={`/blog/${_id}/${title}`}>
                  <button className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Read more...
                  </button>
                </Link>
              </footer>
            </article>
          );
        })
      ) : (
        <ShowSkeletonBlog />
      )}
    </>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
  ),
};

export default BlogList;
