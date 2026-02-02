
// export interface Product {
//   id: number
//   title: string;
//   price: string;
//   img: string;
//   count: number;
// }
// export interface State {
//   products: Product[];
//   product: Product;
//   cart: Product[];
//   like: Product[];
// }

// // const demoproduct: Product = {
// //   id:"",
// //   title:"",
// //   price:"",
// //   img:"",
// //   count:0,

// // }
// // const demoState: State={
// //     products:[],
// //     product: demoproduct,
// //     cart:[],
// //     like:[]
// // }
// export function reducer(state: State | undefined,action: any) {
//   if (!state) {
//     return {
//       products: [],
//       product: { id: "", title: "", price: "", img: "", count: 0 },
//       cart: [],
//       like: [],
//     };
//   }
//   switch (action.type) {
//     case "ID":
//       return {
//         ...state,
//         product: { ...state.product, id: action.payload },
//       };
//     case "TITLE":
//       return {
//         ...state,
//         product: { ...state.product, title: action.payload },
//       };
//     case "PRICE":
//       return {
//         ...state,
//         product: { ...state.product, price: action.payload },
//       };
//     case "IMG":
//       return {
//         ...state,
//         product: { ...state.product, img: action.payload },
//       };
//     case "COUNT":
//       return {
//         ...state,
//         product: { ...state.product, count: action.payload },
//       };
//     case "stringifyimg":
//       return {
//         ...state,
//         product: { ...state.product, img: action.payload },
//       };
//     case "add":
//       return {
//         ...state,
//         products: [...state.products, { ...state.product }],
//         product: { id: "", title: "", price: "", img: "", count: 0 },
//       };
//       case "addTolikes":
//         return {
//           ...state,
//           like:[...state.like,{...action.payload}]
//         }
//     case "ADD_TO_CART":
   
     
//         // return {
//         //   ...state,
//         //   cart: [
//         //     ...state.cart,
//         //     { ...action.payload, count: action.payload.count || 1 },
//         //   ],
//         // };
//          const existingProduct = state.cart.find(
//     (item) => item.id === action.payload.id
//   );

//   if (existingProduct) {
//     // Agar mahsulot allaqachon cartda bo'lsa, countni oshiramiz
//     return {
//       ...state,
//       cart: state.cart.map((item) =>
//         item.id === action.payload.id
//           ? { ...item, count: item.count + 1 }
//           : item
//       ),
//     };
//   } else {
//     // Yangi mahsulotni qo'shamiz va count ni 1 ga o'rnatamiz
//     return {
//       ...state,
//       cart: [
//         ...state.cart,
//         { ...action.payload, count: 1 },
//       ],
//     };
//   }
      
//     case "plus":
//       return {
//         ...state,
//         cart: state.cart.map((itm) =>
//           itm.id === (action.payload)
//             ? {
//                 ...itm,
//                 count: itm.count + 1,
//               }
//             : itm
//         ),
//       };
//     case "minus":
//       return {
//         ...state,
//         cart: state.cart.map((itm) =>
//           itm.id === (action.payload)
//             ? { ...itm, count: Math.max(1, itm.count - 1) }
//             : itm
//         ),
//       };
//     default:
//       return state;
//   }
// }
