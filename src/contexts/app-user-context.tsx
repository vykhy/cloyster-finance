import { User } from "@firebase/auth";
import { createContext } from "react";

export interface SaleType{
    id?: string;
    projectId: string;
    customer?: string;
    weight?:number;
    amount: number;
    createdAt: number;
    type?: string;
}
export interface Expense{
    id?: string;
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
    sales: Array<SaleType>;
    projects: Array<Project>;
    createdAt: number;
}
const AppUserContext = createContext< AppUser | null>(null)

export default AppUserContext