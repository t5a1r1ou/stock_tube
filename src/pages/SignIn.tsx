import type { Component } from "solid-js";

import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

import { AccountForm } from "../components";
import { Head } from "../layout/Head";
import { supabase } from "../scripts/supabase";

const SignIn: Component = () => {
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
  return (
    <>
      <Head title="StockTube | サインイン" />
      <AccountForm flag="signin" />
    </>
  );
};

export default SignIn;
