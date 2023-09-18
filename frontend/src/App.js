//Pages
import Cart from "Pages/Cart/Cart";
import NotFound from "Pages/NotFound";
import ProductDetails from "Pages/ProductDetails";
import Root from "Pages/Root";
import Home from "Pages/home/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="Cart" element={<Cart />} />
      <Route path="ProductDetail">
        <Route path=":ProdId" element={<ProductDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
