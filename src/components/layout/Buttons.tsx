import { Button } from "../ui/button";

export default function Buttons({
  first,
  second,
  click1,
  click2,
  type1,
  type2,
}: {
  first: string;
  second: string;
  click1?(): void;
  click2?(): void;
  type1?: "button" | "submit" | "reset";
  type2?: "button" | "submit" | "reset";
}) {
  return (
    <div className="jeju md:px-12 text-base tracking-wide flex md:flex-row flex-col-reverse items-center item rounded-3xl border border-transparent  gap-4 md:gap-8">
      <Button
        onClick={() => click1?.()}
        type={type1 || "button"}
        className="w-full text-[#24A0B5] border border-[#24A0B5] bg-transparent hover:bg-transparent cursor-pointer "
      >
        {first}
      </Button>
      <Button
        type={type2 || "button"}
        onClick={() => click2?.()}
        className="w-full hover:bg-[#24A0B5] cursor-pointer bg-[#24A0B5]  text-[#FAFAFA]"
      >
        {second}
      </Button>
    </div>
  );
}
