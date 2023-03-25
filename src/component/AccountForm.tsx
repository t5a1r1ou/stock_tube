import { Component } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import {
  heading,
  anker,
  form,
  formContainer,
  formField,
  inputLabel,
  error,
  submitButton,
} from "./AccountForm.css";
import { input } from "../styles/utility.css";
import useAccountForm from "../hooks/useAccountForm";
import type { AuthType } from "../types/types";

export const AccountForm: Component<AuthType> = (props) => {
  const { credentials, setEmail, setPassword, errors, submitAccountForm } =
    useAccountForm();
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/");

  return (
    <>
      <h2 class={heading}>{props.flag === "signin" ? "サインイン" : "登録"}</h2>
      {props.flag === "signin" ? (
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
      <form
        class={form}
        onSubmit={(e) => submitAccountForm(e, props.flag, navigateToHome)}
      >
        <div class={formField}>
          <div class={formContainer}>
            <label class={inputLabel} for="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              class={input}
              value={credentials.email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          {errors.email ? <p class={error}>{errors.email}</p> : null}
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
              value={credentials.password}
              onInput={(e) => setPassword(e.currentTarget.value)}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {errors.password ? <p class={error}>{errors.password}</p> : null}
        </div>
        {errors.server ? (
          <div class={formField}>
            {errors.server ? <p class={error}>{errors.server}</p> : null}
          </div>
        ) : null}
        <div class={formField}>
          <button type="submit" class={submitButton}>
            {props.flag === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </form>
    </>
  );
};
