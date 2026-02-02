// import { type Product } from "../utils/reducer";
// import { Link, useNavigate } from "react-router-dom";

// interface props {
//   props: any;
//   // addtocart:(products:any)=>void
// }

// const Home = ({ props }: props) => {
//   const navigate = useNavigate()
//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     props.add()
//     navigate("/add");
//   }
//   return (
//     <form className="w-[400px] border mx-auto mt-40 " onSubmit={handleSubmit}>
//       <input
//         placeholder="product name.."
//         className="form-control mb-2"
//         onChange={(e) => props.title(e.target.value)}
//         type="text"
//       />
//       <input
//         placeholder="price.."
//         className="form-control mb-2"
//         onChange={(e) => props.price(e.target.value)}
//         type="text"
//       />
//       <input
//         type="file"
//         placeholder="upload the image of the product"
//         className="form-control mb-2"
//         required
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (file) {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => {
//               props.stringifyimg(reader.result as string);
//             };
//           }
//         }}
//       />
//       <button type="submit" className="btn btn-primary" >
//         Add
//       </button>
//     </form>
//   );
// };

// export default Home;
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { shopActions } from "../utils/toolkit";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { product } = useSelector((state: any) => state.shop);
  const [imagePreview, setImagePreview] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    
    // const newProduct = {
    //   ...product,
    //   id: Date.now().toString(),
    // };

    dispatch(shopActions.addProduct());
    setImagePreview("");
    navigate("/add");
  }

  return (
    <div className="container mx-auto mt-10">
      <form
        className="w-[400px] border rounded-lg shadow-lg p-6 mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

        <input
          placeholder="Product name..."
          className="form-control mb-3"
          onChange={(e) => dispatch(shopActions.setTitle(e.target.value))}
          type="text"
          required
        />

        <input
          placeholder="Price..."
          className="form-control mb-3"
          onChange={(e) => dispatch(shopActions.setPrice(e.target.value))}
          type="number"
          step="0.01"
          required
        />

        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          required
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const result = reader.result as string;
                dispatch(shopActions.setImg(result));
                setImagePreview(result);
              };
            }
          }}
        />

        {imagePreview && (
          <div className="mb-3 text-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-[200px] h-[200px] object-cover mx-auto rounded"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Home;