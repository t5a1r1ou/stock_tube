import { onMount } from "solid-js";
import type { Component } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import { supabase } from "../scripts/supabase";

type User = {
  email?: string;
};

export const Index: Component = () => {
  const navigate = useNavigate();
  const [user, setUser] = createStore<User>({});
  onMount(async () => {
    const session = await supabase.auth.getSession();
    const user = await session.data.session?.user;
    if (!user) {
      navigate("/signin", { replace: true });
    } else {
      console.log(user);
      setUser(user);
    }
  });

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      navigate("signin", { replace: true });
    }
  };

  return (
    <div>
      <h2>Index</h2>
      <p>登録アドレス：{user.email}</p>
      <button onClick={() => signOut()}>サインアウト</button>
    </div>
  );
};
