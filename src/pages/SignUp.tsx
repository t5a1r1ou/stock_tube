import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import { AccountForm } from "../component/AccountForm";
import { supabase } from "../scripts/supabase";

export const SignUp: Component = () => {
  const navigate = useNavigate();
  createEffect(async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      navigate("/");
    }
  });
  return <AccountForm flag="signup" />;
};
