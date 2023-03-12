import { Routes, Route, useNavigate } from "@solidjs/router";
import { supabase } from "./scripts/supabase";

import Layout from "./layout/Layout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Index as IndexPage } from "./pages/Index";

import { createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";
import type { Session } from "@supabase/gotrue-js";

const App: Component = () => {
  const [session, setSession] = createSignal<Session | null>(null);
  const navigate = useNavigate();

  createEffect(async () => {
    const { data } = await supabase.auth.getSession();
    if (data) {
      setSession(data.session);
    }
  }, []);

  const signIn = () => {
    navigate("/signin", { replace: true });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      navigate("signin", { replace: true });
    }
  };

  return (
    <Layout signIn={signIn} signOut={signOut} session={session}>
      <Routes>
        <Route path="/" component={IndexPage}></Route>
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
