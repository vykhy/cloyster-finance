import { User } from "@firebase/auth";
import { createContext } from "react";

const userContext = createContext<User | null>(null)

export default userContext