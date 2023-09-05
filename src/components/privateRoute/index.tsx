import { APP_ROUTES } from "@/src/constants/app-routes";
import { checkUserAuthemticated } from "@/src/hook/check-user-authenticated";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { push } = useRouter();

    const isUserAuthenticated = checkUserAuthemticated();

    useEffect(() => {
        if(!isUserAuthenticated) {
            push(APP_ROUTES.public.login)
        }
    }, [isUserAuthenticated, push])

  return <>
    {!isUserAuthenticated && null}
    {isUserAuthenticated && children}
  </>
};
