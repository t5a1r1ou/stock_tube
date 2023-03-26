import { createStore } from "solid-js/store";
import { supabase } from "../scripts/supabase";

import type { Credentials, AuthType } from "../types/types";

const useAccountForm = () => {
  const initialCredentials = {
    email: "",
    password: "",
  };
  const initialErrors = {
    email: "",
    password: "",
    server: "",
  };
  const [credentials, setCredentials] = createStore(initialCredentials);
  const [errors, setErrors] = createStore(initialErrors);

  const setEmail = (email: Credentials["email"]) =>
    setCredentials({ ...credentials, email });

  const setPassword = (password: Credentials["password"]) =>
    setCredentials({ ...credentials, password });

  const validation = () => {
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

    const emailResult = emailValidation();
    const passwordResult = passwordValidation();

    return emailResult && passwordResult;
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
    }
  };

  const submitAccountForm = async (e: Event, flag: AuthType["flag"]) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    if (flag === "signup") {
      signUp(credentials);
    } else {
      signIn(credentials);
    }
  };

  return { credentials, setPassword, setEmail, errors, submitAccountForm };
};

export default useAccountForm;
