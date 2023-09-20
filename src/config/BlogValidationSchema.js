import * as Yup from "yup";
import moment from "moment";

const BlogValidationSchema = Yup.object({
  title: Yup.string().min(3, "Too Short!").max(50, "Must be 15 characters or less").required("Blog title is required"),
  description: Yup.string()
    .min(3, "Too Short!")
    .max(100, "Must be 15 characters or less")
    .required("Blog description is required"),
  content: Yup.string()
    .min(3, "Too Short!")
    .max(300, "Must be 200 characters or less")
    .required("Blog content is required"),
  author: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Must be 20 characters or less")
    .required("Blog author is required"),
});

export { BlogValidationSchema };
