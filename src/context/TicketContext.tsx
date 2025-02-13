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
  load?: boolean;
}
interface State {
  status: string;
  numTicket: number;
  ticketType: number | null;
  loading: boolean;
}
interface Value extends State {
  dispatch: Dispatch<{
    type: string;
    payload?: SelectTicket;
  }>;
}

const initialState: State = {
  status: "ready",
  numTicket: 1,
  ticketType: null,
  loading: false,
};
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
    case "selectTicket2":
      return {
        ...state,
        numTicket: action?.payload?.ticketNum as number,
        ticketType: action.payload?.id as number,
      };
    case "ready":
      return {
        ...state,
        status: "third",
      };
    case "showLoader":
      return {
        ...state,
        loading: action.payload?.load as boolean,
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
  const [{ status, numTicket, ticketType, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <TicketContext.Provider
      value={{ status, dispatch, numTicket, ticketType, loading }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  const context = useContext(TicketContext);
  if (context === undefined) console.log("Wrong context!");
  return context;
}
