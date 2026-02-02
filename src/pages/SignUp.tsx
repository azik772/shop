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
    <div className="w-1/4 shadow bg-gray-200 rounded p-3 mx-auto">
      <input
        onChange={(e) => props.getName(e.target.value)}
        placeholder="Name ..."
        className="form-control mb-2"
        type="text"
      />
      <input
        onChange={(e) => props.getPhone(e.target.value)}
        placeholder="Phone ..."
        className="form-control mb-2"
        type="text"
      />
      <input
        onChange={(e) => props.getEmail(e.target.value)}
        placeholder="Email ..."
        className="form-control mb-2"
        type="text"
      />
      <input
        onChange={(e) => props.getPassword(e.target.value)}
        placeholder="Password ..."
        className="form-control mb-2"
        type="text"
      />
      {props.checkPass && (
        <p className="text-red-600 my-1">
          There should be 8 character at least{" "}
        </p>
      )}
      <select
        className="form-control mb-2"
        onChange={(e) => props.getRole(e.target.value)}
      >
        <option disabled selected value="Choose Role">
          Choose Role
        </option>
        <option value="User">User</option>
        <option value="Teacher">Teacher</option>
      </select>
      <button onClick={signUser} className="btn btn-dark w-full">
        Sign Up
      </button>
    </div>
  );
};

export default connect((state: any) => ({ ...state.user }), actions)(SignUp);
