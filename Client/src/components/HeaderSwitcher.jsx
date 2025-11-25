// HeaderSwitcher.jsx
import React from "react";
import { useSelector } from "react-redux";
import AppHeader from "./layout/AppHeader";
import LandingHeader from "./layout/LandingHeader";

export default function HeaderSwitcher(props) {
  // adapt this selector to your store shape
  const auth = useSelector((s) => s.auth); 
  const isAuthenticated = Boolean(auth?.user?.token || auth?.isAuthenticated || auth?.user);
  const user = auth?.user || null;

  // You can pass props through to AppHeader (eg. onSearch)
  return isAuthenticated ? <AppHeader user={user} {...props} /> : <LandingHeader {...props} />;
}
