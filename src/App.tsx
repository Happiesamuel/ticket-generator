import BoxContainer from "./components/layout/BoxContainer";
import Header from "./components/layout/Header";
import FirstScreen from "./components/layout/FirstScreen";
import SecondScreen from "./components/layout/SecondScreen";
import ThirdScreen from "./components/layout/ThirdScreen";
import { useTicket } from "./context/TicketContext";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
export default function App() {
  const { status, dispatch, loading } = useTicket();
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);
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
        {loading && (
          <div className="h-screen top-0 fixed flex items-center justify-center z-[999999] overflow-auto background-ticket  backdrop-blur-[4px] w-full">
            <FadeLoader color="#197686" />
          </div>
        )}
        <BoxContainer>
          {status === "first" && <FirstScreen />}
          {status === "second" && <SecondScreen />}
          {status === "third" && <ThirdScreen />}
        </BoxContainer>
      </div>
    </div>
  );
}
