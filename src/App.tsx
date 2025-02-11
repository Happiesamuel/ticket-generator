import BoxContainer from "./components/layout/BoxContainer";
import Header from "./components/layout/Header";
import FirstScreen from "./components/layout/FirstScreen";
import SecondScreen from "./components/layout/SecondScreen";
import ThirdScreen from "./components/layout/ThirdScreen";
import { useTicket } from "./context/TicketContext";
import { useEffect } from "react";

export default function App() {
  const { status, dispatch } = useTicket();
  useEffect(
    function () {
      const stat = localStorage.getItem("status")
        ? localStorage.getItem("status")
        : "first";
      dispatch({ type: "statusSet", payload: { stats: stat } });
    },
    [dispatch]
  );
  return (
    <div className="w-full min-h-screen background flex flex-col items-center gap-12 md:gap-20">
      <Header />

      <div className="w-full flex items-center justify-center ">
        <BoxContainer>
          {status === "first" && <FirstScreen />}
          {status === "second" && <SecondScreen />}
          {status === "third" && <ThirdScreen />}
        </BoxContainer>
      </div>
    </div>
  );
}
