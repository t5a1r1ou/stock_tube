import { Component, createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { supabase } from "../scripts/supabase";
import {
  heading,
  form,
  formField,
  inputLabel,
  input,
  submitButton,
} from "./AccountForm.css";

type Props = {
  flag: "signin" | "signup";
};

export const AccountForm: Component<Props> = ({ flag }) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();

  const submitAccountForm = async (e: Event, flag: Props["flag"]) => {
    e.preventDefault();
    try {
      flag === "signup"
        ? await supabase.auth.signUp({
            email: email(),
            password: password(),
          })
        : await supabase.auth.signInWithPassword({
            email: email(),
            password: password(),
          });
      navigate("/");
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <h2 class={heading}>{flag === "signin" ? "SignIn" : "SignUp"}</h2>
      {flag === "signin" ? (
        <p>
          まだ登録がお済みでない場合は<A href="/signup">こちら</A>
        </p>
      ) : (
        <p>
          登録済みの場合は<A href="/signin">こちら</A>
        </p>
      )}
      <form class={form} onSubmit={(e) => submitAccountForm(e, flag)}>
        <div class={formField}>
          <label class={inputLabel} for="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            class={input}
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div class={formField}>
          <label class={inputLabel} for="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            class={input}
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div class={formField}>
          <button type="submit" class={submitButton}>
            {flag === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </form>
    </>
  );
};
