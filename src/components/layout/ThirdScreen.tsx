import { useTicket } from "../../context/TicketContext";
import { Button } from "../ui/button";
import TicketHeader from "./TicketHeader";

export default function ThirdScreen() {
  const { dispatch } = useTicket();
  const a = JSON.parse(localStorage.getItem("formData") || "");
  console.log(a);
  return (
    <>
      <TicketHeader headerObj={{ title: "Ready", step: 3 }} />
      <div className="space-y-4 text-center">
        <h1 className="alatsi text-[#ffffff] font-normal text-3xl tracking-wide ">
          Your Ticket is Booked!
        </h1>
        <p className="roboto font-normal text-base  tracking-wide text-[#FAFAFA]">
          You can download or Check your email for a copy
        </p>
      </div>

      <div className="jeju md:px-12 text-base tracking-wide flex md:flex-row flex-col-reverse items-center item rounded-3xl border border-transparent md:border-[#0E464F] gap-4 md:gap-8">
        <Button
          onClick={() => {
            dispatch({
              type: "bookAnother",
            });
            localStorage.setItem("status", "first");
          }}
          className="w-full text-[#24A0B5] border border-[#24A0B5] bg-transparent hover:bg-transparent cursor-pointer "
        >
          Book Another Ticket
        </Button>
        <Button className="w-full hover:bg-[#24A0B5] cursor-pointer bg-[#24A0B5]  text-[#FAFAFA]">
          Download Ticket
        </Button>
      </div>
    </>
  );
}
