import type { AuthType, Credentials } from "../types/types";

import { useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";

import { supabase } from "../scripts/supabase";

export const useAccountForm = () => {
  const navigate = useNavigate();
  const initialCredentials = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const initialErrors = {
    email: "",
    password: "",
    passwordConfirm: "",
    server: "",
  };
  const [credentials, setCredentials] = createStore(initialCredentials);
  const [errors, setErrors] = createStore(initialErrors);

  const setEmail = (email: Credentials["email"]) =>
    setCredentials({ ...credentials, email });

  const setPassword = (password: Credentials["password"]) =>
    setCredentials({ ...credentials, password });

  const setPasswordConfirm = (
    passwordConfirm: Credentials["passwordConfirm"],
  ) => setCredentials({ ...credentials, passwordConfirm });

  const validation = (flag: AuthType["flag"]) => {
    const emailValidation = () => {
      if (credentials.email === "") {
        setErrors({ ...errors, email: "メールアドレスを入力してください。" });
        return false;
      } else if (!credentials.email.includes("@")) {
        setErrors({ ...errors, email: "@をメールアドレスに含めてください。" });
        return false;
      } else {
        setErrors({ ...errors, email: "" });
        return true;
      }
    };

    const passwordValidation = () => {
      if (credentials.password === "") {
        setErrors({ ...errors, password: "パスワードを入力してください。" });
        return false;
      } else if (credentials.password.length < 6) {
        setErrors({ ...errors, password: "パスワードは6文字以上必要です。" });
        return false;
      } else {
        setErrors({ ...errors, password: "" });
        return true;
      }
    };

    const passwordConfirmValidation = () => {
      if (credentials.password === "") {
        setErrors({
          ...errors,
          passwordConfirm: "パスワードを入力してください。",
        });
        return false;
      } else if (credentials.password !== credentials.passwordConfirm) {
        setErrors({ ...errors, passwordConfirm: "パスワードが一致しません。" });
        return false;
      } else {
        setErrors({ ...errors, passwordConfirm: "" });
        return true;
      }
    };

    const emailResult = emailValidation();
    const passwordResult = passwordValidation();

    if (flag === "signup") {
      const passwordConfirmResult = passwordConfirmValidation();
      return emailResult && passwordResult && passwordConfirmResult;
    } else {
      return emailResult && passwordResult;
    }
  };

  const signIn = async (credentials: Credentials) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      setErrors({
        ...errors,
        server: "メールアドレスもしくはパスワードが間違っています。",
      });
    }
  };

  const signUp = async (credentials: Credentials) => {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      setErrors({
        ...errors,
        server: "メールアドレスもしくはパスワードが間違っています。",
      });
    } else {
      navigate("/confirm");
    }
  };

  const submitAccountForm = async (e: Event, flag: AuthType["flag"]) => {
    e.preventDefault();

    if (!validation(flag)) {
      return;
    }

    if (flag === "signup") {
      signUp(credentials);
    } else {
      signIn(credentials);
    }
  };

  return {
    credentials,
    setPassword,
    setPasswordConfirm,
    setEmail,
    errors,
    submitAccountForm,
  };
};
