import { Button } from "../ui/button";

type Nav = {
  id: number;
  name: string;
};
export default function Header() {
  const navbar = [
    { id: 1, name: "Events" },
    { id: 2, name: "My Tickets" },
    { id: 3, name: "About Project" },
  ] as Nav[];
  return (
    <header className="w-[90%] md:w-[80%] bg-[#05252C]/40 backdrop-blur-xs flex justify-between items-center px-4 py-3 mt-6 rounded-3xl border border-[#197686]">
      <img src="/logo.png" />
      <ul className="lg:flex gap-4 items-center hidden">
        {navbar.map((nav) => (
          <li
            key={nav.id}
            className={`p-2.5 font-normal jeju text-lg ${
              nav.id === 1 ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
            } '`}
          >
            {nav.name}
          </li>
        ))}
      </ul>
      <Button className="jeju bg-[#ffffff] hover:bg-[#ffffff] cursor-pointer text-[#0A0C11] text-sm md:text-base font-normal border border-[#D5EA00]/10 py-3 px4 md:py-4 md:px-6 space-x-2 rounded-lg">
        <span>MY TICKETS</span>
        <span>
          <img src="/arrow-right.svg" />
        </span>
      </Button>
    </header>
  );
}
