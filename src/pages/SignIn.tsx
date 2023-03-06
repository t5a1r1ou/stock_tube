import { Component } from "solid-js";
import { AccountForm } from "../component/AccountForm";

export const SignIn: Component = () => {
  return <AccountForm flag="signin" />;
};
