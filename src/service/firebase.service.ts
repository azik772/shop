import { doc, getDoc } from "firebase/firestore";
import type { Product } from "../utils/toolkit";
import { data } from "../firebase.config";


export const getUserCart = async (userId: string): Promise<Product[]> => {
  try {
    const cartRef = doc(data, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      return cartSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
};
