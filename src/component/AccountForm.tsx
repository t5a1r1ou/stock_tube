import { Component, Show } from "solid-js";
import { A } from "@solidjs/router";
import { Dynamic } from "solid-js/web";
import { useAccountForm } from "../hooks/";
import { componentStyles, accountForm } from "../styles/style.css";
import type { AuthType } from "../types/types";

export const AccountForm: Component<AuthType> = (props) => {
  const { credentials, setEmail, setPassword, errors, submitAccountForm } =
    useAccountForm();

  const onSubmit = (e: SubmitEvent) => submitAccountForm(e, props.flag);
  const onInputEmail = (e: { currentTarget: HTMLInputElement }) =>
    setEmail(e.currentTarget.value);
  const onInputPassword = (e: { currentTarget: HTMLInputElement }) =>
    setPassword(e.currentTarget.value);

  const accountFormData = {
    signin: {
      heading: "サインイン",
      link: () => (
        <p>
          まだ登録がお済みでない場合は
          <A href="/signup" class={accountForm.anker}>
            こちら
          </A>
        </p>
      ),
      buttonText: "Sign In",
    },
    signup: {
      heading: "登録",
      link: () => (
        <p>
          登録済みの場合は
          <A href="/signin" class={accountForm.anker}>
            こちら
          </A>
        </p>
      ),
      buttonText: "Sign Up",
    },
  };

  return (
    <>
      <h2 class={componentStyles.heading}>
        {accountFormData[props.flag].heading}
      </h2>
      <Dynamic component={accountFormData[props.flag].link} />
      <form class={accountForm.form} onSubmit={onSubmit}>
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
              onInput={onInputEmail}
              onChange={onInputEmail}
            />
          </div>
          <Show when={errors.email}>
            <p class={accountForm.error}>{errors.email}</p>
          </Show>
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
              onInput={onInputPassword}
              onChange={onInputPassword}
            />
          </div>
          <Show when={errors.password}>
            <p class={accountForm.error}>{errors.password}</p>
          </Show>
        </div>
        <Show when={errors.server}>
          <div class={accountForm.formField}>
            <p class={accountForm.error}>{errors.server}</p>
          </div>
        </Show>
        <div class={accountForm.formField}>
          <button type="submit" class={accountForm.submitButton}>
            {accountFormData[props.flag].buttonText}
          </button>
        </div>
      </form>
    </>
  );
};
