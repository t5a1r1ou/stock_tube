import { createEffect } from "solid-js";
import { Routes, Route, useNavigate, useLocation } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { supabase } from "./scripts/supabase";
import {
  currentVideoStore,
  foldersStore,
  savingFolderStore,
  savingVideoStore,
  searchStateStore,
  userStore,
  videosStore,
} from "./store/";
import Layout from "./layout/Layout";
import { Libraries, NotFound, Search, SignIn, SignUp, Videos } from "./pages";
import type { Component } from "solid-js";

const App: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticationPage = () => /signin|signup/g.test(location.pathname);
  const isRootPage = () => location.pathname === "/";

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && (isAuthenticationPage() || isRootPage())) {
      navigate("/library");
      userStore.setData(session!.user);
    } else if (event === "SIGNED_OUT") {
      navigate("/signin");
      userStore.setData(null);
    }
  });

  createEffect(() => {
    const validateSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        navigate("/signin");
        return;
      } else if (isAuthenticationPage()) {
        navigate("/library");
      }
      userStore.setData(data.session!.user);
    };
    validateSession();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw Error;
    } else {
      videosStore.clearData();
      foldersStore.clearData();
      savingFolderStore.clearData();
      savingVideoStore.clearData();
      searchStateStore.clearData();
      currentVideoStore.clearId();
      userStore.setData(null);
      navigate("signin", { replace: true });
    }
  };

  return (
    <MetaProvider>
      <Layout user={userStore.data} signOut={signOut}>
        <Routes>
          <Route path="/library" component={Libraries}></Route>
          <Route path="/library/:url_id" component={Videos}></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="*" component={NotFound}></Route>
        </Routes>
      </Layout>
    </MetaProvider>
  );
};

export default App;
