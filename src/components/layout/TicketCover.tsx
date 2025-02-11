import { ReactNode } from "react";

export default function TicketCover({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-4xl border bg-transparent md:bg-[#08252B] border-transparent md:border-[#0E464F] p-0 md:p-6 w-full space-y-6 ">
      {children}
    </div>
  );
}
