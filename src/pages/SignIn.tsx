import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import { AccountForm } from "../component/AccountForm";
import { supabase } from "../scripts/supabase";

export const SignIn: Component = () => {
  const navigate = useNavigate();
  createEffect(() => {
    setTimeout(() => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        console.log(user);
        if (user) {
          navigate("/");
        }
      });
    }, 4000);
  });
  return <AccountForm flag="signin" />;
};
