import { useTicket } from "../../context/TicketContext";
import Buttons from "./Buttons";
import Ticket from "./Ticket";
import TicketHeader from "./TicketHeader";

export default function ThirdScreen() {
  const { dispatch } = useTicket();
  const data = JSON.parse(localStorage.getItem("formData") || "");
  function bookAnother() {
    dispatch({ type: "showLoader", payload: { load: true } });

    setTimeout(() => {
      dispatch({ type: "showLoader", payload: { load: false } });
      dispatch({
        type: "bookAnother",
      });
      localStorage.setItem("status", "first");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  }
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
      <Ticket data={data} />

      <Buttons
        first="Book Another Ticket"
        second="Download Ticket"
        type1="reset"
        type2="submit"
        click1={bookAnother}
      />
    </>
  );
}
