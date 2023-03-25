import { createEffect, createSignal } from "solid-js";
import { Routes, Route, useNavigate } from "@solidjs/router";
import { supabase } from "./scripts/supabase";

import Layout from "./layout/Layout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Index } from "./pages/Index";
import { Search } from "./pages/Search";

import type { Component } from "solid-js";
import type { Session } from "@supabase/gotrue-js";

const App: Component = () => {
  const [session, setSession] = createSignal<Session | null>(null);
  const [buttonText, setButtonText] = createSignal<
    "サインイン" | "サインアウト"
  >("サインイン");
  const navigate = useNavigate();

  createEffect(async () => {
    const { data } = await supabase.auth.getSession();
    if (data) {
      setSession(data.session);
      setButtonText("サインアウト");
    } else {
      setButtonText("サインイン");
    }
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setSession(session);
        setButtonText("サインアウト");
      } else {
        setButtonText("サインイン");
      }
    });
  }, [supabase]);

  const signIn = () => {
    navigate("/signin", { replace: true });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw Error;
    } else {
      navigate("signin", { replace: true });
    }
  };

  const onClickAuthButton = () => {
    if (session()) {
      signOut();
      setButtonText("サインアウト");
    } else {
      signIn();
      setButtonText("サインイン");
    }
  };

  return (
    <Layout onClickAuthButton={onClickAuthButton} buttonText={buttonText()}>
      <Routes>
        <Route path="/" component={Index}></Route>
        <Route path="/search" component={Search}></Route>
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
