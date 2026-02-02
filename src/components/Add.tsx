// interface props {
//   props: any;
// }
// import { useNavigate } from "react-router-dom";
// import { type Product } from "../utils/reducer";
// const Add = ({ props }: props) => {
//   const nav = useNavigate()
//   const addToCart = (product: Product) => {
//     props.ADD_TO_CART(product);
//     nav("/cart")
//   };
//   const addtolikes = (product:Product)=>{
//     props.addTolikes(product)
//     nav("/like")
//   }
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
//       {props.products && props.products.length > 0 ? (
//         <div className="grid md:grid-cols-5 flex justify-between items-center mx-auto">
//           {props.products.map((itm: any, i: number) => (
//             <div
//               key={i}
//               className="flex w-[300px] flex-col justify-between items-center gap-2 border rounded-[10px] "
//             >
//               <img className="w-[300px] h-[300px]" src={itm.img} alt="" />
//               <h1>name: {itm.title}</h1>
//               <h2>price: {itm.price}</h2>
//               <div className="flex gap-2">
//                 <button onClick={()=> addtolikes(itm)}>❤️</button>
//                 <button
//                   className="btn btn-success"
//                   onClick={() => addToCart(itm)}
//                 >
//                   Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 text-lg">
//           No products yet. Add your first product above!
//         </p>
//       )}
//     </div>
//   );
// };

// export default Add;
import {  useNavigate } from "react-router-dom";
import { useSelector,  } from "react-redux";
// import { shopActions, type Product } from "../utils/toolkit";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, data } from "../firebase.config";
// import type { Product } from "../utils/reducer";
 
const Add = () => {
  const nav = useNavigate();
  // const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.shop);

  // const addToCart = (product:Product ) => {
  //   dispatch(shopActions.addToCart(product));
  //   nav("/cart");
  // };

  // const addToLikes = (product: Product) => {
  //   dispatch(shopActions.addToLikes(product));
  //   nav("/like");
  // };
 const userId = auth.currentUser?.uid;

 const addToCart = async (product: any) => {
   if (!userId) {
     alert("Iltimos login qiling!");
     nav("/sign-in");
     return;
   }

   try {
     const userRef = doc(data, "users", userId);
     const userSnap = await getDoc(userRef);

     if (userSnap.exists()) {
       const cart = userSnap.data().cart || [];
       const existing = cart.find((item: any) => item.id === product.id);

       if (existing) {
         // Count ni oshirish
         const updatedCart = cart.map((item: any) =>
           item.id === product.id ? { ...item, count: item.count + 1 } : item,
         );
         await setDoc(userRef, { cart: updatedCart }, { merge: true });
       } else {
         // Yangi mahsulot qo'shish
         await setDoc(
           userRef,
           { cart: arrayUnion({ ...product, count: 1 }) },
           { merge: true },
         );
       }
     }

     alert("Cart ga qo'shildi!");
     nav("/cart");
   } catch (error) {
     console.error("Xatolik:", error);
     alert("Xatolik yuz berdi!");
   }
 };

 const addToLikes = async (product: any) => {
   if (!userId) {
     alert("Iltimos login qiling!");
     nav("/sign-in");
     return;
   }

   try {
     const userRef = doc(data, "users", userId);
     await setDoc(userRef, { liked: arrayUnion(product) }, { merge: true });

     alert("Like qilindi!");
     nav("/like");
   } catch (error) {
     console.error("Xatolik:", error);
   }
 };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
      {products && products.length > 0 ? (
        <div className="grid md:grid-cols-5 gap-4 mx-auto p-4">
          {products.map((itm: any, i: number) => (
            <div
              key={i}
              className="flex w-[300px] flex-col justify-between items-center gap-2 border rounded-[10px] p-4"
            >
              <img
                className="w-[300px] h-[300px] object-cover"
                src={itm.img}
                alt=""
              />
              <h1 className="font-semibold">Name: {itm.title}</h1>
              <h2 className="text-green-600">Price: ${itm.price}</h2>
              <div className="flex gap-2">
                <button
                  className="text-2xl hover:scale-110 transition"
                  onClick={() => addToLikes(itm)}
                >
                  ❤️
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(itm)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No products yet. Add your first product!
        </p>
      )}
    </div>
  );
};

export default Add;
