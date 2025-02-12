import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "../hooks/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Toast({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return toast({
    title: title,
    description: description,
    variant: "destructive",
    className: "bg-[#02191d] border-2 border-[#2BA4B9] ",
  });
}
