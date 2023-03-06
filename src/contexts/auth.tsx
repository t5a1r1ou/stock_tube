import { JSX, createContext, createSignal } from "solid-js";
import { supabase } from "../scripts/supabase";

export const AuthContext = createContext({ user: {} }, {});

type Props = {
  children: JSX.Element;
};
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = createSignal<any>(null);
  const init = async () => {
    const session = await supabase.auth.getSession();
    await setUser(session.data.session?.user);
  };
  init();

  return (
    <AuthContext.Provider value={{ user: user() }}>
      {children}
    </AuthContext.Provider>
  );
};
