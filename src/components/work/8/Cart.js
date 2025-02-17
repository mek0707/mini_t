import React, {useState} from "react";

const Cart = () => {
  const [productList, setProductList] = useState([
    {id: 1, name: "Product 1", price: 100, image: "/images/P-1.jpg"},
    {id: 2, name: "Product 2", price: 200, image: "/images/P-2.jpg"},
    {id: 3, name: "Product 3", price: 300, image: "/images/P-3.jpg"},
    {id: 4, name: "Product 4", price: 400, image: "/images/P-4.jpg"},
  ]);

  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({name: "", price: "", image: ""});
  const [imagePreview, setImagePreview] = useState(null);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? {...item, quantity: item.quantity + 1} : item));
      } else {
        return [...prevCart, {...product, quantity: 1}];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({...newProduct, image: reader.result});
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFileInput = (e) => {
    e.target.value = "";
  };

  const handleAddProduct = () => {
    if (!newProduct.name) {
      alert("กรุณาใส่ชื่อสินค้า!");
    }
    if (!newProduct.price) {
      alert("กรุณาใส่ราคา!");
    }
    if (!newProduct.image) {
      alert("กรุณาใส่รูปใหม่");
    }

    if (!newProduct.name || !newProduct.price || !newProduct.image) return;

    const newId = productList.length > 0 ? productList[productList.length - 1].id + 1 : 1;
    const newItem = {id: newId, ...newProduct, price: parseFloat(newProduct.price)};

    setProductList([...productList, newItem]);
    setNewProduct({name: "", price: "", image: ""});
    setImagePreview(null);
  };

  return (
    <div className="w-full md:w-[1000px] shadow-lg text-[18px] relative dark:text-white">
      <span className="flex justify-center bg-gray-200 dark:bg-slate-500 p-4 rounded-t-xl">ข้อ 8 Shopping Cart</span>
      <div className="p-4 border-t dark:bg-slate-700">
        <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="border p-2 mr-2 dark:text-black" />
        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="border p-2 mr-2 dark:text-black" />
        <input type="file" accept="image/*" onChange={handleImageUpload} onClick={clearFileInput} className="border p-2 mr-2 " />
        <button onClick={handleAddProduct} className="bg-blue-500 rounded-lg p-2 text-white">
          Add Product
        </button>
        {imagePreview && <img src={imagePreview} alt="Preview" width="500" height="500" className="mt-2" />}
      </div>
      <div className="p-4 gap-4 grid md:grid-cols-2 dark:bg-slate-700">
        <span className="md:col-span-2">Products</span>
        {productList.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <img src={product.image} alt={product.name} width="50" height="50" />
            <span>
              {product.name} - ${product.price}
            </span>
            <button onClick={() => addToCart(product)} className="bg-green-500 rounded-lg p-1">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 gap-4 grid md:grid-cols-2 dark:bg-slate-700">
        <span className="md:col-span-2">Cart</span>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="md:col-span-2 h-[30vh] overflow-auto border p-4">
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[50px] items-center pb-2">
                  <div className="col-span-1 place-items-start">
                    <img src={item.image} alt={item.name} width="50" height="50" />
                  </div>

                  <span className="col-span-1 place-items-start">
                    {item.name} - ${item.price} x {item.quantity}
                  </span>
                  <span className="col-span-1">Total: ${item.price * item.quantity}</span>
                  <span className="col-span-2 md:col-span-1">
                    <button onClick={() => removeFromCart(item.id)} className="bg-red-500 rounded-lg p-1 w-full">
                      Remove
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="bg-slate-400 w-full p-2 rounded-b-lg">
        <span className="flex justify-center">TotalALL: ${getTotal()}</span>
      </p>
    </div>
  );
};

export default Cart;
