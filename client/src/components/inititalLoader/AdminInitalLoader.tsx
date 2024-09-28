"use client";

import {getCurrentAdmin} from "@/app/redux/feature/admin/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {useEffect} from "react";

export function AdminInitalLoader ( {children}: {children: React.ReactNode;} ) {
    const admin = useAppSelector( ( state: any ) => state.superAdmin.currAdmin );
    const dispatch = useAppDispatch();
    useEffect( () => {
        getCurrentAdmin( dispatch );
    }, [] );
    console.log( "admin:-", admin );
    return (
        <div>
            {children}
        </div>
    );
}