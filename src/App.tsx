import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import Layout from "./layout/Layout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Index as IndexPage } from "./pages/Index";

const App: Component = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/" component={IndexPage}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
