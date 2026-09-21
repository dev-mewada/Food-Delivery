import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Cart/Login";
import Register from "./Components/Cart/Register";
import AddFood from "./Pages/Home/AddFood";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="AddFood" element={<AddFood/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;