import { createContext } from "react";

export interface User {
    uid : string;
    email : string;
    emailVerified: boolean;
    isAnonymous: boolean;
    lastLoginAt: string;
    photoURL: string;
    displayName: string;
    createdAt: string
}
const userContext = createContext<any | User | null>(null)

export default userContext