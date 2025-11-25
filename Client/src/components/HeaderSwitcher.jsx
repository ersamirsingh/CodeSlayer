import React from "react";
import { useSelector } from "react-redux";
import AppHeader from "./layout/AppHeader";
import LandingHeader from "./layout/LandingHeader";

export default function HeaderSwitcher(props) {

  const auth = useSelector((s) => s.auth); 
  const isAuthenticated = Boolean(auth?.user?.token || auth?.isAuthenticated || auth?.user);
  const user = auth?.user || null;

  return isAuthenticated ? <AppHeader user={user} {...props} /> : <LandingHeader {...props} />;
}
