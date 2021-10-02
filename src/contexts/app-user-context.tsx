import { User } from "@firebase/auth";
import { createContext } from "react";

export interface Sale{
    id: string;
    projectId: string;
    customer?: string;
    weight?:number;
    amount: number;
    reason: string;
    createdAt: number;
    type?: string;
}
export interface Expense{
    id: string;
    projectId: string;
    item?: string;
    amount: number;
    reason: string;
    createdAt: number;
    type?: string;
}
interface Project{
    id: string
}
export interface AppUser {
    user: User
    name: boolean;
    expenses: Array<Expense>;
    sales: Array<Sale>;
    projects: Array<Project>;
    createdAt: string;
}
const AppUserContext = createContext< AppUser | null>(null)

export default AppUserContext