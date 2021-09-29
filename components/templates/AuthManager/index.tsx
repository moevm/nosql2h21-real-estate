import { observer } from "mobx-react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import authStore from "stores/auth";
import { isAuthRoute, isPublicRoute } from "./routesList";

const AuthManager: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    authStore.checkAuth();
  }, []);

  if (authStore.isChecked === false) return <>Authorization check</>;
  if (isAuthRoute(router.asPath)) {
    if (authStore.me !== null) {
      router.push("/");
      return <></>;
    }
    return <>{children}</>;
  }
  if (isPublicRoute(router.asPath)) {
    return <>{children}</>;
  }
  if (authStore.me !== null) return <>{children}</>;
  router.push("/auth/signin");
  return <></>;
};

export default observer(AuthManager);
