import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { TicketSvg } from "./TicketSvg";

interface FormData {
  data: {
    name: string;
    email: string;
    about: string;
    profilePhoto: string;
    ticketType: number;
    numTicket: number;
  };
}
export default function Ticket({ data }: FormData) {
  const [load, setLoad] = useState(true);
  setTimeout(() => {
    setLoad(false);
  }, 1000);
  return (
    <div className="flex items-center justify-center relative min-h-[620px]">
      {load ? (
        <FadeLoader color="#197686" />
      ) : (
        <div className="relative">
          <TicketSvg />

          <div className="absolute w-[260px]  h-[446px]  -translate-x-1/2 left-1/2  -translate-y-[63%]  flex flex-col items-center   border border-[#24A0B5] rounded-2xl  bg-[#031E21]/10 p-2 md:p-3  text-[#fffff] text-lg z-50  ">
            <div className="flex flex-col items-center gap-3 h-full md:gap-5 ">
              <div className="flex-1 min-w-0 ">
                <h1 className="road-rage  font-normal text-[34px] leading-[16px] pb-3 pt-2 text-[#FAFAFA]">
                  Techember Fest ”25
                </h1>
                <div className="space-y-0.5 text-center text-[10px] roboto text-[#ffffff] normal">
                  <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                  <p>📅 March 15, 2025 | 7:00 PM</p>
                </div>
              </div>
              <img
                src={data.profilePhoto}
                className="w-[135px] md:w-[140px] md:h-[140px]  object-cover object-center md:object-top flex-1 h-[135px] mb-2 rounded-xl border-4 border-[#24A0B5]/50"
              />
              <div className="border mb-1 grid grid-cols-2 border-[#133D44] bg-[#08343C]   rounded-[8px] w-full p-1">
                <div className="p-1 gap-1 border-b border-r border-[#12464E] flex-1 flex flex-col items-start ">
                  <p className="roboto font-normal text-[10px] text-[#FFFFFF]/50 tracking-wide">
                    Enter your name
                  </p>
                  <h4 className="roboto text-[12px] font-bold text-[#ffffff] tracking-wide">
                    {data.name}
                  </h4>
                </div>
                <div className="p-1 border-b pl-2 border-[#12464E] flex-1 gap-1 flex flex-col items-start  ">
                  <p className="roboto font-normal text-[10px]   text-[#FFFFFF]/50 tracking-wide">
                    Enter your email
                  </p>
                  <h4 className="roboto text-[10px]  text-wrap break-all leading-[12px] font-bold text-[#ffffff] tracking-wide">
                    {data.email}
                  </h4>
                </div>
                <div className="p-1 border-b border-r border-[#12464E] flex-1 gap-1 flex flex-col items-start">
                  <p className="roboto font-normal text-[10px] text-[#FFFFFF]/50 tracking-wide">
                    Ticket Type:
                  </p>
                  <h4 className="roboto text-[12px] font-bold text-[#ffffff] tracking-wide">
                    {data.ticketType === 1
                      ? "REGULAR"
                      : data.ticketType === 2
                      ? "VIP"
                      : "VVIP"}
                  </h4>
                </div>
                <div className="p-1 gap-1 border-b pl-2 border-[#12464E] flex-1 flex flex-col items-start">
                  <p className="roboto font-normal text-[10px] text-[#FFFFFF]/50 tracking-wide">
                    Ticket for:
                  </p>
                  <h4 className="roboto text-[12px] font-bold text-[#ffffff] tracking-wide">
                    {data.numTicket}
                  </h4>
                </div>
                <div className="p-1 gap-1 flex flex-col last:col-span-2 items-start">
                  <p className="roboto font-normal text-[10px] text-[#FFFFFF]/50 tracking-wide">
                    Special request?
                  </p>
                  <h4 className="roboto  text-wrap break-all text-[12px] font-bold text-[#ffffff] tracking-wide">
                    {data.about}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute w-[260px]   -translate-x-1/2 left-1/2  translate-y-[205%] gap-5 flex flex-col items-center  bg-[#031E21]/10 p-3.5 text-[#fffff]  z-50 ">
            <img src="/bar.svg" />
          </div>
        </div>
      )}
    </div>
  );
}
