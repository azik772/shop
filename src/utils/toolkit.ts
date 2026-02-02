// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { userApi } from "./api";

// const slice = createSlice({
//   name: "user",
//   initialState: {
//     user: { name: "", phone: 0, email: "", password: "", role: "" },
//     users: [],
//     current: "",
//     checkpass: false,
//   },
  
//   reducers: {
//     getName: (state, action) => {
//       state.user.name = action.payload;
//     },
//     getPhone: (state, action) => {
//       state.user.phone = action.payload;
//     },
//     getEmail: (state, action) => {
//       state.user.email = action.payload;
//     },
//     getPassword: (state, action) => {
//       console.log(action);

//       if (action.payload.length >= 8) {
//         state.user.password = action.payload;
//         state.checkpass = false;
//       } else {
//         state.checkpass = true;
//       }
//     },
//     getRole: (state, action) => {
//       state.user.role = action.payload;
//     },
//   },
// });
// export const store = configureStore({
//   reducer: {
//     user: slice.reducer,
//     [userApi.reducerPath]: userApi.reducer,
//   },
//   middleware: (gdM) => gdM().concat(userApi.middleware),
// });

// export const actions = { ...slice.actions };
import { configureStore, createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "./api";

// Type definitions
export interface Product {
  id: string;
  title: string;
  price: string;
  img: string;
  count: number;
}

interface ShopState {
  products: Product[];
  product: Product;
  cart: Product[];
  like: Product[];
}

interface UserState {
  user: {
    name: string;
    phone: number;
    email: string;
    password: string;
    role: string;
  };
  users: any[];
  current: string;
  checkpass: boolean;
}

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { name: "", phone: 0, email: "", password: "", role: "" },
    users: [],
    current: "",
    checkpass: false,
  } as UserState,
  reducers: {
    getName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    getPhone: (state, action: PayloadAction<number>) => {
      state.user.phone = action.payload;
    },
    getEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    getPassword: (state, action: PayloadAction<string>) => {
      if (action.payload.length >= 8) {
        state.user.password = action.payload;
        state.checkpass = false;
      } else {
        state.checkpass = true;
      }
    },
    getRole: (state, action: PayloadAction<string>) => {
      state.user.role = action.payload;
    },
  },
});

// Shop slice (mahsulotlar uchun)
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    products: [],
    product: { id: "", title: "", price: "", img: "", count: 0 },
    cart: [],
    like: [],
  } as ShopState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.product.id = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.product.title = action.payload;
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.product.price = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.product.img = action.payload;
    },
    addProduct: (state) => {
      state.products.push({
        ...state.product,
        id: state.product.id || Date.now().toString(),
      });
      state.product = { id: "", title: "", price: "", img: "", count: 0 };
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
    },
    addToLikes: (state, action: PayloadAction<Product>) => {
      const exists = state.like.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.like.push(action.payload);
      }
    },
    plus: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((itm) => itm.id === action.payload);
      if (product) product.count += 1;
    },
    minus: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((itm) => itm.id === action.payload);
      if (product && product.count > 1) product.count -= 1;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    removeFromLike: (state, action: PayloadAction<string>) => {
      state.like = state.like.filter((item) => item.id !== action.payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    shop: shopSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (gdM) => gdM().concat(userApi.middleware),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const userActions = { ...userSlice.actions };
export const shopActions = { ...shopSlice.actions };
export const actions = { ...userSlice.actions, ...shopSlice.actions };
