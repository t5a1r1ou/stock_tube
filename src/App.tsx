import { createEffect } from "solid-js";
import { Routes, Route, useNavigate, useLocation } from "@solidjs/router";
import { supabase } from "./scripts/supabase";

import Layout from "./layout/Layout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Index } from "./pages/Index";
import { Search } from "./pages/Search";
import { user, setUser } from "./store/user";

import type { Component } from "solid-js";

const App: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticationPage = () => /signin|signup/g.test(location.pathname);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && isAuthenticationPage()) {
      navigate("/");
      setUser(session!.user);
    } else if (event === "SIGNED_OUT") {
      navigate("/signin");
      setUser(null);
    }
  });

  createEffect(() => {
    const validateSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        navigate("/signin");
        return;
      } else if (isAuthenticationPage()) {
        navigate("/");
      }
      setUser(data.session!.user);
    };
    validateSession();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw Error;
    } else {
      navigate("signin", { replace: true });
    }
  };

  return (
    <Layout user={user} signOut={signOut}>
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
