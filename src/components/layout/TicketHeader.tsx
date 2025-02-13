interface HeaderObj {
  headerObj: {
    title: string;
    step: number;
  };
}
export default function TicketHeader({ headerObj }: HeaderObj) {
  return (
    <div className="space-y-3 w-full tracking-wide">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 ">
        <h1 className="font-normal jeju text-2xl md:text-3xl text-[#ffffff]">
          {headerObj.title}
        </h1>
        <p className="roboto font-normal text-base text-[#FAFAFA]">
          Step {headerObj.step}/3
        </p>
      </div>
      <div
        className={`line ${
          headerObj.step === 1
            ? "after:w-[33.33%]"
            : headerObj.step === 2
            ? "after:w-[66.66%]"
            : "after:w-full"
        }`}
      />
    </div>
  );
}
