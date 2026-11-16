import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '../api/client';
import type { User } from '../types';
type AuthValue = { user: User|null; login: (email:string,password:string)=>Promise<void>; register:(name:string,email:string,password:string)=>Promise<void>; logout:()=>void };
const AuthContext = createContext<AuthValue|null>(null);
export function AuthProvider({children}:{children:ReactNode}) {
 const [user,setUser]=useState<User|null>(()=>{const raw=localStorage.getItem('user');return raw?JSON.parse(raw):null;});
 const save=(data:any)=>{localStorage.setItem('accessToken',data.accessToken);localStorage.setItem('user',JSON.stringify(data.user));setUser(data.user);};
 const login=async(email:string,password:string)=>{const {data}=await api.post('/auth/login',{email,password});save(data);};
 const register=async(name:string,email:string,password:string)=>{const {data}=await api.post('/auth/register',{name,email,password});save(data);};
 const logout=()=>{localStorage.removeItem('accessToken');localStorage.removeItem('user');setUser(null);};
 const value=useMemo(()=>({user,login,register,logout}),[user]);
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>{const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider');return value;};
