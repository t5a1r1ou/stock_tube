import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import { AccountForm } from "../component/AccountForm";
import { supabase } from "../scripts/supabase";

const SignUp: Component = () => {
  const navigate = useNavigate();
  createEffect(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw Error;
    }
    if (data.session) {
      navigate("/library");
    }
  }, []);
  return <AccountForm flag="signup" />;
};

export default SignUp;
