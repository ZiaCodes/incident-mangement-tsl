import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { TicketContext } from "../context/TicketProvider";
import { CreateSingleTicketContext } from "../context/CreateTicketProvider";

export const useTheme = () => useContext(ThemeContext);
export const useAuth = () => useContext(AuthContext);
export const useTicket = () => useContext(TicketContext)
export const useCreateSingleTicket = () => useContext(CreateSingleTicketContext)