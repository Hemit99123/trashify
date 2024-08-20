"use client";

import { createContext, useState, ReactNode } from "react";
import StateObjProps from "../types/poststate";


interface PostDataContextProps {
    state: StateObjProps;
    setState: React.Dispatch<React.SetStateAction<StateObjProps>>;
}

export const PostDataContext = createContext<PostDataContextProps>({
    state: {},
    setState: () => {}
});