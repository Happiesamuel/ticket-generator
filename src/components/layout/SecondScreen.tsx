import TicketCover from "./TicketCover";
import TicketHeader from "./TicketHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useTicket } from "../../context/TicketContext";
import React, { useCallback, useEffect } from "react";
import { base64ToFile, handleFileUpload } from "../../lib/constants";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must contain at least 2 characters" }),
  email: z.string().email({ message: "The email you entered is not valid!" }),
  about: z.string().min(2, {
    message: "Project details must contain at least 2 characters",
  }),
  profilePhoto: z
    .custom<File>((file) => file instanceof File, "Profile photo is required")
    .refine((file) => file.size > 0, "Profile photo cannot be empty")
    .refine(
      (file) => ["image/png", "image/jpeg"].includes(file.type),
      "Only PNG or JPG allowed"
    )
    .refine((file) => file.size <= 2 * 1024 * 1024, "File must be under 2MB"),
});

export default function SecondScreen() {
  const { dispatch } = useTicket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      about: localStorage.getItem("about") || "",
    },
  });
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    localStorage.setItem(e.target.name, e.target.value);
  };
  const handleReset = () => {
    // localStorage.removeItem("formData");
    localStorage.removeItem("profilePhoto");
    localStorage.removeItem("about");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    form.reset();
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("formData", JSON.stringify(values));
    handleReset();
    dispatch({
      type: "ready",
    });
    localStorage.setItem("status", "third");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) {
      const file = base64ToFile(savedPhoto, "profilePhoto.png");
      form.setValue("profilePhoto", file);
    }
  }, [form]);

  const selectedFile = form.watch("profilePhoto");
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        form.setValue("profilePhoto", acceptedFiles[0]);
        handleFileUpload(acceptedFiles[0]);
      }
    },
    [form]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });
  return (
    <>
      <TicketHeader headerObj={{ title: "Attendee Details", step: 2 }} />
      <TicketCover>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="rounded-3xl text-[#FAFAFA]/95 border border-[#07373F] bg-[#052228] space-y-8 p-6">
              <FormField
                control={form.control}
                name="profilePhoto"
                render={() => (
                  <FormItem>
                    <div className="flex flex-col gap-4">
                      <FormLabel className="roboto font-normal text-base text-[#FAFAFA]/95 tracking-wide ">
                        Profile Photo
                      </FormLabel>
                      <div className="bg-[#02191d] h-[240px] flex flex-col items-center justify-center">
                        <FormControl>
                          {!selectedFile ? (
                            <div
                              {...getRootProps()}
                              className="bg-[#0E464F] cursor-pointer w-full md:w-[250px] h-full  rounded-3xl  flex flex-col gap-4 justify-center items-center"
                            >
                              <input {...getInputProps()} />
                              <img src="/cloud.svg" />
                              <p className="roboto font-normal text-center tracking-wide">
                                {isDragActive
                                  ? "Drop the files here..."
                                  : "Drag & drop or click to upload"}
                              </p>
                            </div>
                          ) : (
                            <div
                              {...getRootProps()}
                              className="relative overflow-hidden cursor-pointer w-full md:w-[250px] h-full flex flex-col gap-4 justify-center items-center"
                            >
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Preview"
                                className="rounded-3xl object-cover object-center md:object-top w-[100%] h-[100%]"
                              />
                              <div className="absolute inset-0 flex flex-col items-center gap-4 justify-center bg-[#000000]/30 opacity-0 hover:opacity-100 transition-opacity duration-500">
                                <input {...getInputProps()} />
                                <img src="/cloud.svg" />
                                <p className="roboto font-normal text-center tracking-wide">
                                  {isDragActive
                                    ? "Drop the files here..."
                                    : "Drag & drop or click to upload"}
                                </p>
                              </div>
                            </div>
                          )}
                        </FormControl>
                      </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full h-1 bg-[#07373F]" />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="roboto font-normal text-[#FAFAFA]/95 text-base tracking-wide">
                    Enter your name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                      type="text"
                      className="border roboto font-normal text-base text-[#ffffff]  tracking-wide focus:border-2 focus:border-[#197686] border-[#07373F]  p-2"
                    />
                  </FormControl>
                  <FormMessage className="roboto font-normal text-base tracking-wide" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="roboto font-normal text-[#FAFAFA]/95 text-base tracking-wide">
                    Enter your email *
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2 rounded-xl border border-[#07373F] text-[#AAAAAA] px-2 py-1">
                      <img src="/envelop.svg" />
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        type="email"
                        className="border-none shadow-none p-0 pl-2  roboto font-normal text-base text-[#ffffff]  tracking-wide"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="roboto font-normal text-base tracking-wide" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="roboto font-normal  text-[#FAFAFA]/95 text-base tracking-wide">
                    About the project
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                      placeholder="Textarea"
                      className="border focus:border-2 roboto font-normal text-base text-[#ffffff]  tracking-wide focus:border-[#197686] h-[127px] border-[#07373F]  p-2"
                    />
                  </FormControl>
                  <FormMessage className="roboto font-normal text-base tracking-wide" />
                </FormItem>
              )}
            />

            <div className="jeju md:px-12 text-base tracking-wide flex md:flex-row flex-col-reverse items-center item rounded-3xl border border-transparent  gap-4 md:gap-8">
              <Button
                type="reset"
                onClick={() => {
                  dispatch({ type: "backToFirst" });
                  localStorage.setItem("status", "first");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full text-[#24A0B5] border border-[#24A0B5] bg-transparent hover:bg-transparent cursor-pointer "
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full hover:bg-[#24A0B5] cursor-pointer bg-[#24A0B5]  text-[#FAFAFA]/95"
              >
                Get My Free Ticket
              </Button>
            </div>
          </form>
        </Form>
      </TicketCover>
    </>
  );
}
