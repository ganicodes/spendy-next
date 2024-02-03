"use client";
import * as z from "zod";

import { APIURLConstant } from "@/common/apiURLConstants";
import axiosInstance from "@/helper/APIHelper";
import { updateUser } from "@/store/user";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import CustomForm from "../shared/CustomForm";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, {
    message: "Password should be atleast of 8 characters",
  }),
});

const formFields = [
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
];

const defaultFormFieldValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      let { data, status } = await axiosInstance.post(
        APIURLConstant.USER_LOGIN,
        values
      );

      if (data?.success || status === 200) {
        let response = data?.data;
        // const loggedInUserInfo = {
        //   name: response?.firstName + " " + response?.lastName,
        //   email: response?.email,
        //   userId: response?._id || response?.id,
        // };

        dispatch(
          updateUser({
            name: response?.firstName + " " + response?.lastName,
            email: response?.email,
            userId: response?._id || response?.id,
          })
        );

        toast({
          variant: "success",
          title: data?.message,
        });

        router.push("/dashboard");
      }
    } catch (error) {
      if (error?.response) {
        const { data, status } = error?.response;
        if (status === 400 || status === 411) {
          toast({
            variant: "destructive",
            title: data?.message,
          });
        }
      }
      console.error("Error: ", error.message);
    }
  };

  return (
    <CustomForm
      formSchema={formSchema}
      formFields={formFields}
      defaultFormFieldValues={defaultFormFieldValues}
      onSubmit={onSubmit}
      submitButtonText="Login"
    />
  );
};

export default Login;
