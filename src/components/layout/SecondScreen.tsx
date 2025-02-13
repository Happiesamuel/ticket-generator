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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useTicket } from "../../context/TicketContext";
import React, { useCallback, useEffect } from "react";
import useUpload from "../../hooks/useUpload";
import { FadeLoader } from "react-spinners";
import Buttons from "./Buttons";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must contain at least 2 characters" }),
  email: z.string().email({ message: "The email you entered is not valid!" }),
  about: z
    .string()
    .min(2, {
      message: "Special request must contain at least 2 characters",
    })
    .max(101, {
      message: "Special request be less than 101 characters",
    }),
  profilePhoto: z.string().url("Invalid image URL"),
});

export default function SecondScreen() {
  const { dispatch, ticketType, numTicket } = useTicket();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      about: localStorage.getItem("about") || "",
      profilePhoto: localStorage.getItem("profilePhoto") || "",
    },
  });
  const { avatarUrl, uploading, uploadToCloudinary, setAvatarUrl } = useUpload(
    form.setValue
  );
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    localStorage.setItem(e.target.name, e.target.value);
  };
  const handleReset = () => {
    localStorage.removeItem("profilePhoto");
    localStorage.removeItem("about");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    form.reset();
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ticketType: ticketType,
      numTicket: numTicket,
      ...values,
    };
    dispatch({ type: "showLoader", payload: { load: true } });
    setTimeout(() => {
      dispatch({ type: "showLoader", payload: { load: false } });
      localStorage.setItem("formData", JSON.stringify(data));
      handleReset();
      dispatch({
        type: "ready",
      });
      localStorage.setItem("status", "third");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  }
  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) {
      form.setValue("profilePhoto", savedPhoto);
      setAvatarUrl(savedPhoto);
    }
  }, [form, setAvatarUrl]);

  const selectedFile = form.watch("profilePhoto");
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        uploadToCloudinary(acceptedFiles[0]);
      }
    },
    [uploadToCloudinary]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });
  function navigateBack() {
    dispatch({ type: "showLoader", payload: { load: true } });

    setTimeout(() => {
      dispatch({ type: "showLoader", payload: { load: false } });
      dispatch({ type: "backToFirst" });
      localStorage.setItem("status", "first");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  }
  return (
    <>
      <TicketHeader headerObj={{ title: "Attendee Details", step: 2 }} />
      <TicketCover>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="rounded-3xl text-[#FAFAFA] border border-[#07373F] bg-[#052228] space-y-8 p-6 pb-12">
              <FormField
                control={form.control}
                name="profilePhoto"
                render={() => (
                  <FormItem>
                    <div className="flex flex-col gap-4">
                      <FormLabel className="roboto font-normal text-base text-[#FAFAFA] pb-4 tracking-wide ">
                        Upload Profile Photo
                      </FormLabel>
                      <div className="bg-transparent md:bg-[#02191d]  h-[200px] relative flex flex-col items-center justify-center">
                        <FormControl>
                          <>
                            {uploading && avatarUrl && (
                              <div className=" cursor-pointer w-full md:w-[250px] h-[240px] absolute  rounded-3xl  flex flex-col gap-4 justify-center items-center">
                                <img
                                  src={avatarUrl}
                                  loading="lazy"
                                  alt="Preview"
                                  className="rounded-3xl object-cover object-center md:object-top w-[100%] h-[100%]"
                                />
                                <div className="absolute z-50 inset-0 rounded-3xl flex flex-col items-center gap-4 justify-center bg-[#000000]/10 backdrop-blur-xs opacity-100 hover:opacity-100 transition-opacity duration-500">
                                  <FadeLoader color="#197686" />
                                </div>
                              </div>
                            )}
                            {uploading && !selectedFile && !avatarUrl && (
                              <div className=" cursor-pointer w-full md:w-[250px] h-[240px] absolute  rounded-3xl  flex flex-col gap-4 justify-center items-center">
                                <img
                                  src={avatarUrl}
                                  loading="lazy"
                                  alt="Preview"
                                  className="rounded-3xl object-cover object-center md:object-top w-[100%] h-[100%]"
                                />
                                <div className="absolute z-50 inset-0 rounded-3xl flex flex-col items-center gap-4 justify-center bg-[#000000]/10 backdrop-blur-xs opacity-100 hover:opacity-100 transition-opacity duration-500">
                                  <FadeLoader color="#197686" />
                                </div>
                              </div>
                            )}
                            {!selectedFile && (
                              <div
                                {...getRootProps()}
                                className="bg-[#0E464F] border-4 border-[#24A0B5]/50 cursor-pointer w-full md:w-[250px] h-[240px] absolute  rounded-3xl  flex flex-col gap-4 justify-center items-center"
                              >
                                <input {...getInputProps()} />
                                <img src="/cloud.svg" />
                                <p className="roboto font-normal text-center tracking-wide">
                                  {isDragActive
                                    ? "Drop the files here..."
                                    : "Drag & drop or click to upload"}
                                </p>
                              </div>
                            )}

                            {!uploading && selectedFile && (
                              <div
                                {...getRootProps()}
                                className=" cursor-pointer w-full md:w-[250px] h-[240px] absolute  rounded-3xl  flex flex-col gap-4 justify-center items-center"
                              >
                                <img
                                  src={avatarUrl}
                                  loading="lazy"
                                  alt="Preview"
                                  className="rounded-3xl object-cover object-center md:object-top w-[100%] h-[100%]"
                                />
                                <div className="absolute inset-0 flex flex-col items-center gap-4 justify-center rounded-3xl bg-[#000000]/30 opacity-0 hover:opacity-100 transition-opacity duration-500">
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
                          </>
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
                  <FormLabel className="roboto font-normal text-[#FAFAFA] text-base tracking-wide">
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
                  <FormLabel className="roboto font-normal text-[#FAFAFA] text-base tracking-wide">
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
                  <FormLabel className="roboto font-normal  text-[#FAFAFA] text-base tracking-wide">
                    Special request?
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

            <Buttons
              first="Back"
              second="Get My Free Ticket"
              type1="reset"
              type2="submit"
              click1={navigateBack}
            />
          </form>
        </Form>
      </TicketCover>
    </>
  );
}
