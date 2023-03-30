import { createEffect } from "solid-js";
import { Routes, Route, useNavigate, useLocation } from "@solidjs/router";
import { supabase } from "./scripts/supabase";

import Layout from "./layout/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Videos from "./pages/Videos";
import Search from "./pages/Search";
import Libraries from "./pages/Libraries";
import { user, setUser } from "./store/user";

import type { Component } from "solid-js";
import { useQueryVideos } from "./queries/useQueryVideos";
import { setAllVideos } from "./store/videos";
import { Folder, Video } from "./types/types";
import { setAllFolders } from "./store/folders";
import { useQueryFolders } from "./queries/useQueryFolders";

const App: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticationPage = () => /signin|signup/g.test(location.pathname);
  const isRootPage = () => location.pathname === "/";

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && (isAuthenticationPage() || isRootPage())) {
      navigate("/library");
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
        navigate("/library");
      }
      setUser(data.session!.user);
    };
    validateSession();

    const getVideos = async () => {
      const { data: videos, error } = await useQueryVideos();

      if (error) {
        throw new Error();
      }

      setAllVideos(videos as Video[]);
    };

    getVideos();

    const getFolders = async () => {
      const { data: folders, error } = await useQueryFolders();

      if (error) {
        throw new Error();
      }

      setAllFolders(folders as Folder[]);
    };

    getFolders();
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
        <Route path="/library" component={Libraries}></Route>
        <Route path="/library/:url_id" component={Videos}></Route>
        <Route path="/search" component={Search}></Route>
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
