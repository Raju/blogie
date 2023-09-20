import { NextResponse } from "next/server";

import connectMongodb from "@config/mongodb";
import Blog from "@backend/models/blog.schema";

const GET = connectMongodb(async (_req, _res) => {
  try {
    const blog = await Blog.find();

    if (blog) {
      return NextResponse.json({
        status: 200,
        success: true,
        data: blog,
        message: "Successfully retrieved all Blog Information.",
      });
    }

    return NextResponse.json({
      status: 404,
      success: false,
      data: [],
      message: "No Blog Information found.",
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

const POST = connectMongodb(async (req, _res) => {
	try {
    const sanitizedReq = await req.json();
    const blog = await new Blog({ ...sanitizedReq }).save();

    if (blog) {
      return NextResponse.json({
        status: 200,
        success: true,
        data: [blog],
        message: "Blog Information Saved Successfully.fsadsadfsadf",
      });
    }

    return NextResponse.json({
      status: 404,
      success: false,
      data: [],
      message: "Unable to Save Blog Information. Blog creation failed.",
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

const DELETE = connectMongodb(async (req, _res) => {
	try {
    const id = req.nextUrl.searchParams.get("id");
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

export { GET, POST, DELETE };
