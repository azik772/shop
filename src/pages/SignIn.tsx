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
    <div className="w-full max-w-[380px] sm:max-w-[420px] bg-blue-50 rounded-xl p-4 sm:p-6 mx-auto mt-10 shadow">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3 text-sm sm:text-base">
          {error}
        </div>
      )}

      <input
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email ..."
        className="form-control mb-3 h-[45px] sm:h-[50px]"
        type="text"
      />

      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password ..."
        className="form-control mb-3 h-[45px] sm:h-[50px]"
        type="password"
      />

      <button onClick={checkUser} className="btn btn-dark w-full py-2 sm:py-3">
        Sign In
      </button>

      <p className="text-center my-3 text-sm sm:text-base">Or</p>

      <p className="text-center text-sm sm:text-base mb-3">
        Don't have an account?{" "}
        <Link to={"/sign-up"} className="text-blue-600 font-medium">
          Sign up
        </Link>
      </p>

      <button
        className="btn btn-dark w-full py-2 sm:py-3"
        onClick={() => SignwithGoogle()}
      >
        Sign with Google
      </button>
    </div>
  );
};

export default SignIn;
