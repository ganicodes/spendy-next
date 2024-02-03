"use client";
import * as z from "zod";

import { APIURLConstant } from "@/common/apiURLConstants";
import axiosInstance from "@/helper/APIHelper";
import CustomForm from "../shared/CustomForm";

const formSchema = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().min(1, "Required").email(),
    password: z.string().min(8, {
      message: "Password should be atleast of 8 characters",
    }),
    // .regex(regex, {
    //   message:
    //     "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.",
    // }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const formFields = [
  {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

const defaultFormFieldValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = (values) => {
  const { data } = axiosInstance.post(APIURLConstant.USER_SIGNUP, values);
};

const Signup = () => {
  return (
    <CustomForm
      formSchema={formSchema}
      formFields={formFields}
      defaultFormFieldValues={defaultFormFieldValues}
      onSubmit={onSubmit}
      submitButtonText="Signup"
    />
  );
};

export default Signup;
