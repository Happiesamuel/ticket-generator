import { ReactNode } from "react";

export default function BoxContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#041E23] rounded-[40px] border border-[#0E464F] p-6 md:p-12 w-[90%] lg:w-[50%] flex flex-col gap-8 mb-20">
      {children}
    </div>
  );
}
