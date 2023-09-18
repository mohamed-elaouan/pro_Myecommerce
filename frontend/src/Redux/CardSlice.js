import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SelectedProduct: JSON.parse(localStorage.getItem("myCartData"))
    ? JSON.parse(localStorage.getItem("myCartData"))
    : [],
  SelectedProductID: JSON.parse(localStorage.getItem("myCartID"))
    ? JSON.parse(localStorage.getItem("myCartID"))
    : [],
};

export const CartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    Remplir: (state) => {
      state.SelectedProduct = JSON.parse(localStorage.getItem("myCartData"));
      state.SelectedProductID = JSON.parse(
        localStorage.getItem("myCartDataID")
      );
    },
    AddToCart: (state, action) => {
      state.SelectedProduct.push(action.payload);
      state.SelectedProductID.push(action.payload.id);
      localStorage.setItem("myCartData", JSON.stringify(state.SelectedProduct));
      localStorage.setItem("myCartID", JSON.stringify(state.SelectedProductID));
    },
    increaseQte: (state, action) => {
      const ObjProduct = state.SelectedProduct.find((item) => {
        return item.id === action.payload.id;
      });
      ObjProduct.Qte += 1;
      localStorage.setItem("myCartData", JSON.stringify(state.SelectedProduct));
      localStorage.setItem("myCartID", JSON.stringify(state.SelectedProductID));
    },
    decreaseQte: (state, action) => {
      const ObjProduct = state.SelectedProduct.find((item) => {
        return item.id === action.payload.id;
      });
      ObjProduct.Qte -= 1;
      if (ObjProduct.Qte === 0) {
        const NewArr = state.SelectedProduct.filter((item) => {
          return item.id !== action.payload.id;
        });
        state.SelectedProduct = NewArr;
        //SelectedPro Id
        const NewArrId = state.SelectedProductID.filter((item) => {
          return item !== action.payload.id;
        });
        state.SelectedProductID = NewArrId;
      }
      localStorage.setItem("myCartData", JSON.stringify(state.SelectedProduct));
      localStorage.setItem("myCartID", JSON.stringify(state.SelectedProductID));
    },
    DeleteProduct: (state, action) => {
      //state.SelectedProduct.splice(action.payload, 1);
      //SelectedPro
      const DelProduct = state.SelectedProduct.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.SelectedProduct = DelProduct;
      //SelectedPro Id
      const NewArrId = state.SelectedProductID.filter((item) => {
        return item !== action.payload.id;
      });
      state.SelectedProductID = NewArrId;
      localStorage.setItem("myCartData", JSON.stringify(state.SelectedProduct));
      localStorage.setItem("myCartID", JSON.stringify(state.SelectedProductID));
    },
  },
});

// Action creators are generated for each case reducer function
export const { AddToCart, increaseQte, decreaseQte, DeleteProduct, Remplir } =
  CartSlice.actions;

export default CartSlice.reducer;
