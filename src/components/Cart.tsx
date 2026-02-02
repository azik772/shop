//  export interface props {
//   props: any;
// }
// const Cart = ({ props }: props) => {
//   return (
//     <div>
//       <div>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>img</th>
//               <th>name</th>
//               <th>price</th>
//               <th>amount</th>
//             </tr>
//           </thead>

//           <tbody>
//             {props.cart.map((itm: any, i: number) => (
//               <tr key={i}>
//                 <td>
//                   <img className="w-[100px] h-[100px]" src={itm.img} alt="" />
//                 </td>
//                 <td>
//                   <h1>{itm.title}</h1>
//                 </td>
//                 <td>
//                   <h1>{itm.price}</h1>
//                 </td>
//                 <td>
//                   <div className="flex gap-5">
//                   <button onClick={()=>props.plus(itm.id)} className="btn btn-success">+</button>
//                   <h1>{itm.count}</h1>
//                   <button onClick={()=>props.minus(itm.id)} className="btn btn-danger">-</button>
//                   </div>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Cart;
// import { useDispatch } from "react-redux";
// import { shopActions } from "../utils/toolkit";
import { auth, data } from "../firebase.config";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc,  } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const userId = auth.currentUser?.uid;
  const nav = useNavigate();

  useEffect(() => {
    if (!userId) {
      nav("/sign-in");
      return;
    }
    loadCart();
  }, [userId]);

  const loadCart = async () => {
    if (!userId) return;

    try {
      const userRef = doc(data, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setCart(userSnap.data().cart || []);
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const updateCart = async (newCart: any[]) => {
    if (!userId) return;

    try {
      const userRef = doc(data, "users", userId);
      await setDoc(userRef, { cart: newCart }, { merge: true });
      setCart(newCart);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handlePlus = (id: string) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item,
    );
    updateCart(newCart);
  };

  const handleMinus = (id: string) => {
    const newCart = cart.map((item) =>
      item.id === id && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item,
    );
    updateCart(newCart);
  };

  const handleRemove = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + Number(item.price) * item.count,
    0,
  );

  if (!userId) {
    return <p className="text-center mt-10">Iltimos login qiling</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((itm: any, i: number) => (
                <tr key={i}>
                  <td>
                    <img
                      className="w-[100px] h-[100px] object-cover"
                      src={itm.img}
                      alt=""
                    />
                  </td>
                  <td>
                    <h1>{itm.title}</h1>
                  </td>
                  <td>
                    <h1>${itm.price}</h1>
                  </td>
                  <td>
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => handleMinus(itm.id)}
                        className="btn btn-danger btn-sm"
                      >
                        -
                      </button>
                      <h1 className="font-bold">{itm.count}</h1>
                      <button
                        onClick={() => handlePlus(itm.id)}
                        className="btn btn-success btn-sm"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <h1 className="font-semibold">
                      ${(Number(itm.price) * itm.count).toFixed(2)}
                    </h1>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemove(itm.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <h2 className="text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
    </div>
    // <div className="container mx-auto p-4">
    //   <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
    //   {cart.length > 0 ? (
    //     <>
    //       <table className="table w-full">
    //         <thead>
    //           <tr>
    //             <th>Image</th>
    //             <th>Name</th>
    //             <th>Price</th>
    //             <th>Quantity</th>
    //             <th>Total</th>
    //             <th>Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {cart.map((itm: any, i: number) => (
    //             <tr key={i}>
    //               <td>
    //                 <img
    //                   className="w-[100px] h-[100px] object-cover"
    //                   src={itm.img}
    //                   alt=""
    //                 />
    //               </td>
    //               <td>
    //                 <h1>{itm.title}</h1>
    //               </td>
    //               <td>
    //                 <h1>${itm.price}</h1>
    //               </td>
    //               <td>
    //                 <div className="flex gap-3 items-center">
    //                   <button
    //                     onClick={() => handleMinus(itm.id)}
    //                     className="btn btn-danger btn-sm"
    //                   >
    //                     -
    //                   </button>
    //                   <h1 className="font-bold">{itm.count}</h1>
    //                   <button
    //                     onClick={() => handlePlus(itm.id)}
    //                     className="btn btn-success btn-sm"
    //                   >
    //                     +
    //                   </button>
    //                 </div>
    //               </td>
    //               <td>
    //                 <h1 className="font-semibold">
    //                   ${Number(itm.price) * itm.count}
    //                 </h1>
    //               </td>
    //               <td>
    //                 <button
    //                   onClick={() => handleRemove(itm.id)}
    //                   className="btn btn-danger btn-sm"
    //                 >
    //                   Remove
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //       <div className="mt-4 text-right">
    //         <h2 className="text-2xl font-bold">
    //           Total: ${totalPrice.toFixed(2)}
    //         </h2>
    //       </div>
    //     </>
    //   ) : (
    //     <p className="text-center text-gray-500">Your cart is empty</p>
    //   )}
    // </div>
  );
};

export default Cart;