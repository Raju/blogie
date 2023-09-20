import { NextResponse } from "next/server";

import connectMongodb from "@config/mongodb";
import Blog from "@backend/models/blog.schema";

const GET = connectMongodb(async (_req, res) => {
	try {
    const { id } = res.params;
    const blog = await Blog.findById(id);

    if (blog) {
      return NextResponse.json({
        status: 200,
        success: true,
        data: [blog],
        message: "Successfully retrieved Blog Information.",
      });
    }

    return NextResponse.json({
      status: 404,
      success: false,
      data: [],
      message: "Blog not found.",
    });
  } catch (error) {
    console.error("An error occurred:", error);

    return NextResponse.json({
      status: 500,
      success: false,
      data: [],
      message: `An error occurred: ${error.message}`,
    });
  }
});

const PATCH = connectMongodb(async (req, res) => {
	try {
    const { id } = res.params;
    const sanitizedReq = await req.json();

    const blog = await Blog.findByIdAndUpdate(id, { ...sanitizedReq }, { new: true });

    if (blog) {
      return NextResponse.json({
        status: 200,
        success: true,
        data: [blog],
        message: "Blog Updated Successfully.",
      });
    }

    return NextResponse.json({
      status: 404,
      success: false,
      data: [],
      message: "Unable to update, requested blog was not found.",
    });
  } catch (error) {
    console.error("An error occurred:", error);

    return NextResponse.json({
      status: 500,
      success: false,
      data: [],
      message: `An error occurred: ${error.message}`,
    });
  }
});

const DELETE = connectMongodb(async (_req, res) => {
	try {
    const { id } = res.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (blog) {
      return NextResponse.json({
        status: 200,
        success: true,
        data: [blog],
        message: "Blog Deleted Successfully.",
      });
    }

    return NextResponse.json({
      status: 404,
      success: false,
      data: [],
      message: "Unable to Delete Blog, requested blog was not found.",
    });
  } catch (error) {
    console.error("An error occurred:", error);

    return NextResponse.json({
      status: 500,
      success: false,
      data: [],
      message: `An error occurred: ${error.message}`,
    });
  }
});

export { GET, PATCH, DELETE };
