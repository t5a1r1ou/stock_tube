import { Component, createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { supabase } from "../scripts/supabase";
import {
  heading,
  anker,
  form,
  formContainer,
  formField,
  inputLabel,
  input,
  error,
  submitButton,
} from "./AccountForm.css";

type Props = {
  flag: "signin" | "signup";
};

export const AccountForm: Component<Props> = ({ flag }) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");
  const navigate = useNavigate();

  const validation = () => {
    const emailValidation = () => {
      if (email() === "") {
        setEmailError("メールアドレスを入力してください。");
        return false;
      } else if (!email().includes("@")) {
        setEmailError("@をメールアドレスに含めてください");
        return false;
      } else {
        setEmailError("");
        return true;
      }
    };

    const passwordValidation = () => {
      if (password() === "") {
        setPasswordError("パスワードを入力してください。");
        return false;
      } else if (password().length < 6) {
        setPasswordError("パスワードは6文字以上必要です。");
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    };

    const emailResult = emailValidation();
    const passwordResult = passwordValidation();

    return emailResult && passwordResult;
  };

  const submitAccountForm = async (e: Event, flag: Props["flag"]) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    if (flag === "signup") {
      await supabase.auth
        .signUp({
          email: email(),
          password: password(),
        })
        .then(() => navigate("/"))
        .catch((error: any) => alert(error.message));
    } else {
      await supabase.auth
        .signInWithPassword({
          email: email(),
          password: password(),
        })
        .then(() => navigate("/"))
        .catch((error: any) => alert(error.message));
    }
  };

  return (
    <>
      <h2 class={heading}>{flag === "signin" ? "SignIn" : "SignUp"}</h2>
      {flag === "signin" ? (
        <p>
          まだ登録がお済みでない場合は
          <A href="/signup" class={anker}>
            こちら
          </A>
        </p>
      ) : (
        <p>
          登録済みの場合は
          <A href="/signin" class={anker}>
            こちら
          </A>
        </p>
      )}
      <form class={form} onSubmit={(e) => submitAccountForm(e, flag)}>
        <div class={formField}>
          <div class={formContainer}>
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
          {emailError() ? <p class={error}>{emailError()}</p> : null}
        </div>
        <div class={formField}>
          <div class={formContainer}>
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
          {passwordError() ? <p class={error}>{passwordError()}</p> : null}
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
