import { useState } from "react";
import TicketHeader from "./TicketHeader";
import TicketCover from "./TicketCover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useTicket } from "../../context/TicketContext";
import { Toast } from "../../lib/utils";
export default function FirstScreen() {
  const { numTicket: ticNum, dispatch, ticketType } = useTicket();
  const [id, setId] = useState<number | null>(ticketType);
  const [numTicket, setNumTicket] = useState<number>(ticNum);
  const buttons = [
    {
      title: "REGULAR ACCESS",
      price: 0,
      slot: 20,
      id: 1,
    },
    {
      title: "VIP ACCESS",
      price: 50,
      slot: 20,
      id: 2,
    },
    {
      title: "VVIP ACCESS",
      price: 150,
      slot: 20,
      id: 3,
    },
  ];
  async function handleSubmit() {
    if (!id) {
      Toast({
        title: "Select Ticket Type",
        description: "Choose your ticket type and number of ticket",
      });
      return;
    }
    dispatch({ type: "showLoader", payload: { load: true } });
    setTimeout(() => {
      dispatch({ type: "showLoader", payload: { load: false } });
      dispatch({
        type: "selectTicket",
        payload: { id: id, ticketNum: numTicket },
      });
      localStorage.setItem("status", "second");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  }
  return (
    <>
      <TicketHeader headerObj={{ title: "Ticket Selection", step: 1 }} />
      <TicketCover>
        <div className="border-[#07373F] background-ticket backdrop-blur-lg border-x-2 border-b-2 p-6 rounded-3xl text-center flex flex-col items-center space-y-2">
          <h1 className="road-rage font-normal text-5xl md:text-6xl text-[#FAFAFA]">
            Techember Fest ”25
          </h1>
          <p className="roboto font-normal text-sm md:text-base text-[#FAFAFA] tracking-wide w-[70%] text-center">
            Join us for an unforgettable experience at [Event Name]! Secure your
            spot now.
          </p>
          <p className="roboto hidden md:block font-normal text-base text-[#FAFAFA] space-x-4 tracking-wide">
            <span>📍 [Event Location]</span>
            <span>| |</span>
            <span>March 15, 2025 | 7:00 PM</span>
          </p>
          <p className="roboto  md:hidden font-normal text-base text-[#FAFAFA] flex flex-col gap-1 mt-6 tracking-wide">
            <span>📍 [Event Location]</span>
            <span>March 15, 2025 | 7:00 PM</span>
          </p>
        </div>

        <div className="w-full h-1 bg-[#07373F]" />

        <div className="space-y-2">
          <p className="roboto text-[#FAFAFA] font-normal text-base tracking-wide">
            Select Ticket Type:
          </p>

          <div className="bg-[#052228] border border-[#07373F] rounded-3xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {buttons.map((button) => (
              <div
                key={button.id}
                onClick={() => setId(button.id)}
                className={`flex justify-between cursor-pointer items-center border border-[#07373F]  rounded-xl p-2  transition-all duration-500 ${
                  button.id === id ? "bg-[#197686]" : "bg-transparent"
                }`}
              >
                <div className="space-y-1 roboto text-[#FAFAFA] tracking-wide">
                  <h3 className="font-normal text-base">{button.title}</h3>
                  <p className="text-sm font-normal tracking-wide">
                    {button.slot} left!
                  </p>
                </div>
                <p className="border  text-[#FAFAFA] border-[#2BA4B9] roboto text-xl  font-semibold bg-[#0E464F] w-[70px] h-[38px] flex items-center justify-end pr-2 gap-2.5 rounded-xl">
                  {button.price === 0 ? "Free" : button.price + "$"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="roboto text-[#FAFAFA] font-normal text-base tracking-wide">
            Number of Tickets
          </p>

          <Select
            onValueChange={(e) => setNumTicket(+e)}
            defaultValue={numTicket.toString()}
          >
            <SelectTrigger className="w-full cursor-pointer border border-[#07373F] text-[#FAFAFA]">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent className="bg-[#052228] text-[#FAFAFA] border border-[#07373F] ">
              <SelectGroup>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SelectItem
                    className="hover:bg-[#24A0B5] duration-300 translate-all hover:text-[#FAFAFA] cursor-pointer"
                    value={`${i + 1}`}
                    key={i}
                  >
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="jeju md:px-12 text-base tracking-wide flex md:flex-row flex-col-reverse items-center item rounded-3xl border border-transparent md:border-[#0E464F] gap-4 md:gap-8">
          <Button className="w-full text-[#24A0B5] border border-[#24A0B5] bg-transparent hover:bg-transparent cursor-pointer ">
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            className="w-full hover:bg-[#24A0B5] cursor-pointer bg-[#24A0B5]  text-[#FAFAFA]"
          >
            Next
          </Button>
        </div>
      </TicketCover>
    </>
  );
}
