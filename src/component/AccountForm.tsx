import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { componentStyles, accountForm } from "../styles/style.css";
import useAccountForm from "../hooks/useAccountForm";
import type { AuthType } from "../types/types";

export const AccountForm: Component<AuthType> = (props) => {
  const { credentials, setEmail, setPassword, errors, submitAccountForm } =
    useAccountForm();

  return (
    <>
      <h2 class={componentStyles.heading}>
        {props.flag === "signin" ? "サインイン" : "登録"}
      </h2>
      {props.flag === "signin" ? (
        <p>
          まだ登録がお済みでない場合は
          <A href="/signup" class={accountForm.anker}>
            こちら
          </A>
        </p>
      ) : (
        <p>
          登録済みの場合は
          <A href="/signin" class={accountForm.anker}>
            こちら
          </A>
        </p>
      )}
      <form
        class={accountForm.form}
        onSubmit={(e) => submitAccountForm(e, props.flag)}
      >
        <div class={accountForm.formField}>
          <div class={accountForm.formContainer}>
            <label class={accountForm.inputLabel} for="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              class={accountForm.input}
              value={credentials.email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          {errors.email ? (
            <p class={accountForm.error}>{errors.email}</p>
          ) : null}
        </div>
        <div class={accountForm.formField}>
          <div class={accountForm.formContainer}>
            <label class={accountForm.inputLabel} for="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              class={accountForm.input}
              value={credentials.password}
              onInput={(e) => setPassword(e.currentTarget.value)}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {errors.password ? (
            <p class={accountForm.error}>{errors.password}</p>
          ) : null}
        </div>
        {errors.server ? (
          <div class={accountForm.formField}>
            {errors.server ? (
              <p class={accountForm.error}>{errors.server}</p>
            ) : null}
          </div>
        ) : null}
        <div class={accountForm.formField}>
          <button type="submit" class={accountForm.submitButton}>
            {props.flag === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </form>
    </>
  );
};
