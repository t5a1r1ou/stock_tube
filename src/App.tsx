import { createEffect } from "solid-js";
import { Routes, Route, useNavigate, useLocation } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import toast from "solid-toast";
import { supabase } from "./scripts/supabase";
import {
  currentVideoStore,
  deletingFolderStore,
  deletingVideoStore,
  foldersStore,
  savingFolderStore,
  savingVideoStore,
  searchStateStore,
  userStore,
  videosStore,
} from "./store/";
import Layout from "./layout/Layout";
import { Confirm, Libraries, Search, SignIn, SignUp, Videos } from "./pages";
import type { Component } from "solid-js";

const App: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticationPage = () => /signin|signup/g.test(location.pathname);
  const isRootPage = () => location.pathname === "/";

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      userStore.setData(session!.user);
      toast.success("サインインに成功しました。");
      if (isAuthenticationPage() || isRootPage()) {
        foldersStore.fetchData();
        videosStore.fetchData(() => {
          if (videosStore.data.length > 0) {
            navigate("/library");
          } else {
            navigate("/");
          }
        });
      }
    } else if (event === "SIGNED_OUT") {
      navigate("/");
      userStore.setData(null);
      toast.success("サインアウトしました。");
    }
  });

  createEffect(() => {
    const validateSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        navigate("/");
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
      deletingFolderStore.clearData();
      deletingVideoStore.clearData();
      userStore.setData(null);
      navigate("/", { replace: true });
    }
  };

  return (
    <MetaProvider>
      <Layout user={userStore.data} signOut={signOut}>
        <Routes>
          <Route path="/confirm" component={Confirm}></Route>
          <Route path="/library" component={Libraries}></Route>
          <Route path="/library/:url_id" component={Videos}></Route>
          <Route path="/" component={Search}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="*" component={SignIn}></Route>
        </Routes>
      </Layout>
    </MetaProvider>
  );
};

export default App;
