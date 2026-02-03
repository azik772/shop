// import { Link, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import Cart from "./components/Cart";
// import Add from "./components/Add";
// // import { reducer } from "./utils/reducer";
// import type { Product, State } from "./utils/reducer";
// import { connect } from "react-redux";
// import { actions } from "./utils/actions";
// import Like from "./components/Like";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// export type Action =
//   | {
//       type: "UPDATE_PRODUCT_FIELD";
//       payload: { field: keyof Product; value: any };
//     }
//   | { type: "ID"; payload: string }
//   | { type: "TITLE"; payload: string }
//   | { type: "PRICE"; payload: string }
//   | { type: "IMG"; payload: string }
//   | { type: "COUNT"; payload: number }
//   | { type: "add"; payload: Product }
//   | { type: "CLEAR_PRODUCT" }
//   | { type: "ADD_TO_CART"; payload: Product }
//   | { type: "REMOVE_FROM_CART"; payload: string }
//   | { type: "addTolikes"; payload: Product }
//   | { type: "REMOVE_FROM_LIKE"; payload: string }
//   | { type: "SET_PRODUCTS"; payload: Product[] }
//   | { type: "stringifyimg"; payload: string }
//   | { type: "plus"; payload: number }
//   | { type: "minus"; payload: number };

// const App = (props: any) => {
//   // console.log("APP PROPS:", props);
//   return (
//     <div>
//       <div className="flex  justify-between items-center px-10 py-5 gap-2 bg-green-500">
//         <Link className="text-3xl text-white text-decoration-none" to={"/add"}>
//           Products
//         </Link>
//         <Link className="text-3xl text-white text-decoration-none" to={"/"}>
//           + Add Product
//         </Link>
//         <input
//           type="search"
//           className=" border w-[280px] h-[50px] border-white bg-white  rounded-[10px] text-center"
//           placeholder="search..."
//         />
//         <div className="flex">
//           <div className="flex w-[100px] h-[50px] bg-green">
//             <Link
//               className="text-3xl text-white text-decoration-none "
//               to={"/like"}
//             >
//               ❤️
//             </Link>
//             <div className=" rounded-[50%] w-[10px] h-[10px]">
//               {props?.like.length > 0 && `${props?.like.length}`}
//             </div>
//           </div>
//           <div className="flex w-[100px] h-[50px] bg-green">
//             <Link
//               className="text-3xl text-white text-decoration-none"
//               to={"/cart"}
//             >
//               🛒
//             </Link>
//             <div className=" rounded-[50%] w-[10px] h-[10px]">
//               {props?.cart.length > 0 && `${props?.cart.length}`}
//             </div>
//           </div>
//           <div>
//             <Link to={"/sign-in"} className="btn btn-primary">
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </div>

//       <Routes>
//         <Route path="/" element={<Home props={props} />} />
//         <Route path="/cart" element={<Cart props={props} />} />
//         <Route path="/add" element={<Add props={props} />} />
//         <Route path="/like" element={<Like props={props} />} />
//         <Route path="sign-in" element={<SignIn />} />
//         <Route path="/sign-up" element={<SignUp />} />
//       </Routes>
//     </div>
//   );
// };

// export default connect(
//   (state: State) => {
//     return { ...state };
//   },

//   actions,
// )(App);
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Add from "./components/Add";
import Like from "./components/Like";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, google } from "./firebase.config";
import { useState } from "react";
export const SignwithGoogle = async () => {
  const result = await signInWithPopup(auth, google);
  const user = result.user;
  alert(` Welcome,${user.displayName}`);
};
const App = () => {
  const { cart, like } = useSelector((state: any) => state.shop);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="bg-green-500 px-4 md:px-10 py-4">
        <div className="flex justify-between items-center">
          <Link
            className="text-2xl md:text-3xl text-white text-decoration-none"
            to={"/add"}
          >
            Products
          </Link>

          <div className="hidden md:flex items-center gap-6  ">
            <Link className="text-2xl text-white text-decoration-none" to={"/"}>
              Add Product
            </Link>

            <input
              type="search"
              className="border w-[280px] h-[45px] border-white bg-white rounded-lg text-center"
              placeholder="search..."
            />

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Link
                  className="text-2xl text-white text-decoration-none "
                  to={"/like"}
                >
                  ❤️
                </Link>
                {like?.length > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                    {like.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  className="text-2xl text-white text-decoration-none"
                  to={"/cart"}
                >
                  🛒
                </Link>
                {cart?.length > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                    {cart.length}
                  </span>
                )}
              </div>

              <Link
                to={"/sign-in"}
                className="btn btn-primary text-decoration-none"
              >
                Sign In
              </Link>
            </div>
          </div>

          <button
            className="md:hidden text-3xl text-white"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-4 mt-4 md:hidden">
            <Link className="text-white text-lg text-decoration-none" to={"/"}>
              + Add Product
            </Link>

            <input
              type="search"
              className="border w-full h-[45px] border-white bg-white rounded-lg text-center"
              placeholder="search..."
            />

            <div className="flex gap-6">
              <Link
                className="text-2xl text-white text-decoration-none"
                to={"/like"}
              >
                ❤️ {like?.length > 0 && `(${like.length})`}
              </Link>
              <Link
                className="text-2xl text-white text-decoration-none"
                to={"/cart"}
              >
                🛒 {cart?.length > 0 && `(${cart.length})`}
              </Link>
            </div>

            <Link
              to={"/sign-in"}
              className="bg-white text-green-600 px-4 py-2 rounded-lg w-fit text-decoration-none"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add" element={<Add />} />
        <Route path="/like" element={<Like />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
