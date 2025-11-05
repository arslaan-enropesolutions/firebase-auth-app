import { useState } from "react";
import { LoginForm } from "./components/forms/login";
import { SignupForm } from "./components/forms/register";

function App() {
  const [login, setLogin] = useState(true);
  return (
    <div className="h-svh w-screen grid place-items-center">
      <h1 className="text-3xl border font-extrabold text-center">
        Firebase auth app
      </h1>
      {login ? (
        <LoginForm setLogin={setLogin}></LoginForm>
      ) : (
        <SignupForm setLogin={setLogin} className="md:w-1/2 w-11/12" />
      )}
    </div>
  );
}

export default App;
