// import type { props } from './Cart'

// const Like = ({props}:props) => {
//   return (
//     <div>
//         <div>
//           {props.like.map((itm:any, id:number)=>{
//             return(
//             <div key={id} className='  flex flex-col items-center justify-center mx-auto'>
//               <img className='w-[150px] h-[100px]' src={itm.img} alt="" />
//               <h1>name {itm.title}</h1>
//               <h2>price ${itm.price}</h2>
//             </div>
//           )})}
//         </div>
//     </div>
//   )
// }

// export default Like
// import { useSelector, useDispatch } from "react-redux";
// import { shopActions } from "../utils/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, data } from "../firebase.config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Like = () => {
  // const dispatch = useDispatch();
  // const { like } = useSelector((state: any) => state.shop);

  // const handleRemove = (id: string) => {
  //   dispatch(shopActions.removeFromLike(id));
  // };

    const [liked, setLiked] = useState<any[]>([]);
    const userId = auth.currentUser?.uid;
    const nav = useNavigate();

    useEffect(() => {
      if (!userId) {
        nav("/sign-in");
        return;
      }
      loadLiked();
    }, [userId]);

    const loadLiked = async () => {
      if (!userId) return;

      try {
        const userRef = doc(data, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setLiked(userSnap.data().liked || []);
        }
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    const handleRemove = async (id: string) => {
      if (!userId) return;

      try {
        const newLiked = liked.filter((item) => item.id !== id);
        const userRef = doc(data, "users", userId);
        await setDoc(userRef, { liked: newLiked }, { merge: true });
        setLiked(newLiked);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    if (!userId) {
      return <p className="text-center mt-10">Iltimos login qiling</p>;
    }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Liked Products ❤️</h2>
      {liked.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-4">
          {liked.map((itm: any, id: number) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                className="w-[150px] h-[150px] object-cover rounded mb-2"
                src={itm.img}
                alt=""
              />
              <h1 className="font-semibold">Name: {itm.title}</h1>
              <h2 className="text-green-600">Price: ${itm.price}</h2>
              <button
                onClick={() => handleRemove(itm.id)}
                className="btn btn-danger btn-sm mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No liked products yet</p>
      )}
    </div>

    // <div className="container mx-auto p-4">
    //   <h2 className="text-2xl font-bold mb-6 text-center">Liked Products ❤️</h2>
    //   {like.length > 0 ? (
    //     <div className="grid md:grid-cols-4 gap-4">
    //       {like.map((itm: any, id: number) => (
    //         <div
    //           key={id}
    //           className="flex flex-col items-center justify-center border rounded-lg p-4 shadow hover:shadow-lg transition"
    //         >
    //           <img
    //             className="w-[150px] h-[150px] object-cover rounded mb-2"
    //             src={itm.img}
    //             alt=""
    //           />
    //           <h1 className="font-semibold">Name: {itm.title}</h1>
    //           <h2 className="text-green-600">Price: ${itm.price}</h2>
    //           <button
    //             onClick={() => handleRemove(itm.id)}
    //             className="btn btn-danger btn-sm mt-2"
    //           >
    //             Remove
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <p className="text-center text-gray-500">No liked products yet</p>
    //   )}
    // </div>
  );
};

export default Like;