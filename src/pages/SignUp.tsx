import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { Head } from "../layout/Head";
import { AccountForm } from "../component/";
import { supabase } from "../scripts/supabase";
import type { Component } from "solid-js";

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
  return (
    <>
      <Head title="StockTube | サインアップ" />
      <AccountForm flag="signup" />
    </>
  );
};

export default SignUp;
