import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
interface SelectTicket {
  id?: number;
  ticketNum?: number;
  stats?: string | null;
}
interface State {
  status: string;
  numTicket: number;
  ticketType: number | null;
}
interface Value extends State {
  dispatch: Dispatch<{
    type: string;
    payload?: SelectTicket;
  }>;
}

const initialState: State = { status: "first", numTicket: 1, ticketType: null };
const TicketContext = createContext<Value>({
  ...initialState,
  dispatch: () => {},
});
function reducer(
  state: State,
  action: {
    type: string;
    payload?: SelectTicket;
  }
): State {
  switch (action.type) {
    case "selectTicket":
      return {
        ...state,
        numTicket: action?.payload?.ticketNum as number,
        ticketType: action.payload?.id as number,
        status: "second",
      };
    case "ready":
      return {
        ...state,
        status: "third",
      };
    case "backToFirst":
      return {
        ...state,
        status: "first",
      };
    case "bookAnother":
      return {
        ...initialState,
      };
    case "statusSet":
      return {
        ...state,
        status: action?.payload?.stats as string,
      };

    default:
      return { ...state };
  }
}
export default function TicketProvider({ children }: { children: ReactNode }) {
  const [{ status, numTicket, ticketType }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <TicketContext.Provider value={{ status, dispatch, numTicket, ticketType }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  const context = useContext(TicketContext);
  if (context === undefined) console.log("Wrong context!");
  return context;
}
