import { Component, Show } from "solid-js";
import { A } from "@solidjs/router";
import { Dynamic } from "solid-js/web";
import { useAccountForm } from "../hooks/";
import { componentStyles, accountForm } from "../styles/style.css";
import type { AuthType } from "../types/types";

export const AccountForm: Component<AuthType> = (props) => {
  const {
    credentials,
    setEmail,
    setPassword,
    setPasswordConfirm,
    errors,
    submitAccountForm,
  } = useAccountForm();

  const onSubmit = (e: SubmitEvent) => submitAccountForm(e, props.flag);
  const onInputEmail = (e: { currentTarget: HTMLInputElement }) =>
    setEmail(e.currentTarget.value);
  const onInputPassword = (e: { currentTarget: HTMLInputElement }) =>
    setPassword(e.currentTarget.value);
  const onInputPasswordConfirm = (e: { currentTarget: HTMLInputElement }) =>
    setPasswordConfirm(e.currentTarget.value);

  const accountFormData = {
    signin: {
      text: "サインイン",
      link: () => (
        <p>
          まだ登録がお済みでない場合は
          <A href="/signup" class={accountForm.anker}>
            こちら
          </A>
        </p>
      ),
    },
    signup: {
      text: "登録",
      link: () => (
        <p>
          登録済みの場合は
          <A href="/signin" class={accountForm.anker}>
            こちら
          </A>
        </p>
      ),
    },
  };

  return (
    <>
      <h2 class={componentStyles.heading}>
        {accountFormData[props.flag].text}
      </h2>
      <Dynamic component={accountFormData[props.flag].link} />
      <form class={accountForm.form} onSubmit={onSubmit}>
        <div class={accountForm.formField}>
          <div class={accountForm.formContainer}>
            <label class={accountForm.inputLabel} for="email">
              メールアドレス
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
              パスワード（英数字6文字以上）
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
        <Show when={props.flag === "signup"}>
          <div class={accountForm.formField}>
            <div class={accountForm.formContainer}>
              <label class={accountForm.inputLabel} for="passwordConfirm">
                パスワード確認
              </label>
              <input
                id="passwordConfirm"
                type="password"
                class={accountForm.input}
                value={credentials.passwordConfirm}
                onInput={onInputPasswordConfirm}
                onChange={onInputPasswordConfirm}
              />
            </div>
            <Show when={errors.passwordConfirm}>
              <p class={accountForm.error}>{errors.passwordConfirm}</p>
            </Show>
          </div>
        </Show>
        <Show when={errors.server}>
          <div class={accountForm.formField}>
            <p class={accountForm.error}>{errors.server}</p>
          </div>
        </Show>
        <div class={accountForm.formField}>
          <button type="submit" class={accountForm.submitButton}>
            {accountFormData[props.flag].text}
          </button>
        </div>
      </form>
    </>
  );
};
