import { GetServerSideProps } from 'next'
import Blog from "@backend/models/blog.schema";

const errorStatus = {
  500: () => {
    throw new Error("Internal Server Error");
  },
};

const saveBlogService = async (req) => {
  try {
    const blog = await new Blog({ ...req }).save();

    if (blog) {
      return { status: 201, request: { ...req }, response: [blog], message: "Blog Information Saved Successfully." };
    }

    throw new Error("Unable to save Blog Information.");
  } catch (error) {
    errorStatus[500]();
  }
};

const viewBlogService = async () => {
  try {
    const blog = await Blog.find();

    if (blog) {
      return { status: 200, request: {}, response: blog, message: "Showing all Blog Information." };
    }

    return { status: 404, request: {}, response: [], message: "Unable to show all Blog Information." };
  } catch (error) {
    console.error(error);
    errorStatus[500]();
  }
};

const viewSingleBlogService = async ({ id }) => {
  try {
    const blog = await Blog.findById(id);

    if (blog) {
      return { status: 200, request: { id }, response: [blog], message: "Showing a Blog Information." };
    }

    return { status: 404, request: { id }, response: [], message: "Blog not found." };
  } catch (error) {
    errorStatus[500]();
  }
};

const updateBlogService = async (req) => {
  const {
    sanitizedReq,
    params: { id },
  } = req;

  try {
    const blog = await Blog.findByIdAndUpdate(id, { ...sanitizedReq }, { new: true });

    if (blog) {
      return { status: 200, request: { ...sanitizedReq }, response: [blog], message: "Blog Updated Successfully." };
    }

    return { status: 404, request: { ...sanitizedReq }, response: [], message: "Unable to Update Blog, blog not found." };
  } catch (error) {
    errorStatus[500]();
  }
};

const deleteBlogService = async ({ id }) => {
  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (blog) {
      return { status: 200, request: { id }, response: blog, message: "Blog Deleted Successfully." };
    }

    return {
      status: 404,
      request: { id },
      response: [],
      message: "Unable to Delete Blog, requested blog was not found.",
    };
  } catch (error) {
    errorStatus[500]();
  }
};

const deleteBlogQueryParamsService = async (req) => {
  const id = req;

  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (blog) {
      return { status: 200, request: { id }, response: blog, message: "Blog Deleted Successfully." };
    }

    return {
      status: 404,
      request: { id },
      response: [],
      message: "Unable to Delete Blog, requested blog was not found.",
    };
  } catch (error) {
    errorStatus[500]();
  }
};

export {
  saveBlogService,
  viewBlogService,
  viewSingleBlogService,
  updateBlogService,
  deleteBlogService,
  deleteBlogQueryParamsService,
};
