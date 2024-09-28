"use client";

import {getCurrentUser} from "@/app/redux/feature/contributor/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {useEffect} from "react";

export function IntialLoader ( {children}: {children: React.ReactNode;} ) {
    const user = useAppSelector( ( state: any ) => state.contributor.currentUser );
const dispatch = useAppDispatch()
useEffect(() => {
    getCurrentUser(dispatch)
}, [])
console.log("user:-", user);
    return (
        <div>
            {children}
       </div>
    );
}