import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { TicketContext } from "../context/TicketProvider";

export const useTheme = () => useContext(ThemeContext);
export const useAuth = () => useContext(AuthContext);
export const useTicket = () => useContext(TicketContext)