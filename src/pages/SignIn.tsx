import { useState } from "react";
import { useGetUsersQuery } from "../utils/api";
import { Link } from "react-router-dom";
import { SignwithGoogle } from "../App";

const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { data, isLoading } = useGetUsersQuery("/users");
  const [error, setError] = useState("");

  function checkUser() {
    setError("");

    if (!user.email || !user.password) {
      setError("Iltimos barcha maydonlarni to'ldiring");
      return;
    }

    if (!data || data.length === 0) {
      setError("Foydalanuvchilar topilmadi");
      return;
    }
    const foundUser = data.find(
      (itm: any) => itm.email === user.email && itm.password === user.password,
    );

    if (foundUser) {
      localStorage.setItem("token", foundUser.token);
      localStorage.setItem("role", foundUser.role);

      window.location.href = "/";
    } else {
      setError("Email yoki Parol noto'g'ri");
    }
  }
  if (isLoading) {
    return <h1 className="text-center mt-10">Yuklanmoqda...</h1>;
  }
  return (
    <div className="w-1/4 bg-blue-50 rounded p-3 mx-auto">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
        {error}
      </div>
      <input
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email ..."
        className="form-control mb-2"
        type="text"
      />
      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password ..."
        className="form-control mb-2"
        type="text"
      />

      <button onClick={checkUser} className="btn btn-dark w-full">
        Sign In
      </button>
      <p className="text-center my-3">Or</p>
      <p className="text-center">
        Don't have an account? - <Link to={"/sign-up"}>Sign up</Link>
      </p>
      <button className="btn btn-dark" onClick={()=>SignwithGoogle()}>Sign with Google</button>
    </div>
  );
};

export default SignIn;
