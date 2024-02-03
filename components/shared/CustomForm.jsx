"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const CustomForm = ({
  formSchema,
  defaultFormFieldValues,
  formFields,
  onSubmit,
  submitButtonText = "Submit",
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormFieldValues,
  });

  function onFormSubmit(values) {
    onSubmit(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        {formFields?.map((item) => (
          <FormField
            key={item?.name}
            control={form.control}
            name={item?.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={item?.type}
                    placeholder={item?.placeholder}
                    {...field}
                  />
                </FormControl>
                {/* {item?.name === "password" ? (
                  <FormDescription>
                    Password must contain at least one uppercase letter, one
                    lowercase letter, one special character, and be at least 8
                    characters long.
                  </FormDescription>
                ) : null} */}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full">
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default CustomForm;
