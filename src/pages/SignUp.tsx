import { connect } from "react-redux";
import { actions } from "../utils/toolkit";
import { useAddUserMutation } from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignUp = (props: any) => {
  const [addUser, {}] = useAddUserMutation();
  const navigate = useNavigate();

  function signUser() {
    addUser(props.user);
    alert("Ro'yxatdan o'tdingiz! Endi kirish sahifasiga o'tishingiz mumkin.");
    navigate("/sign-in");
  }
  return (
    <div className="w-full max-w-[380px] sm:max-w-[420px] bg-gray-200 shadow rounded-xl p-4 sm:p-6 mx-auto mt-10">
      <input
        onChange={(e) => props.getName(e.target.value)}
        placeholder="Name ..."
        className="form-control mb-3 h-[45px] sm:h-[50px]"
        type="text"
      />

      <input
        onChange={(e) => props.getPhone(e.target.value)}
        placeholder="Phone ..."
        className="form-control mb-3 h-[45px] sm:h-[50px]"
        type="text"
      />

      <input
        onChange={(e) => props.getEmail(e.target.value)}
        placeholder="Email ..."
        className="form-control mb-3 h-[45px] sm:h-[50px]"
        type="text"
      />

      <input
        onChange={(e) => props.getPassword(e.target.value)}
        placeholder="Password ..."
        className="form-control mb-2 h-[45px] sm:h-[50px]"
        type="password"
      />

      {props.checkPass && (
        <p className="text-red-600 my-2 text-sm sm:text-base">
          There should be at least 8 characters
        </p>
      )}

      <select
        className="form-control mb-3 h-[45px] sm:h-[50px]"
        onChange={(e) => props.getRole(e.target.value)}
        defaultValue=""
      >
        <option disabled value="">
          Choose Role
        </option>
        <option value="User">User</option>
        <option value="Teacher">Teacher</option>
      </select>

      <button onClick={signUser} className="btn btn-dark w-full py-2 sm:py-3">
        Sign Up
      </button>
    </div>
  );
};

export default connect((state: any) => ({ ...state.user }), actions)(SignUp);
