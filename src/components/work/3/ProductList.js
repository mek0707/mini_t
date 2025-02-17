import {useState, useEffect} from "react";

// Custom hook สำหรับจัดการข้อมูลสินค้า
const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (name) => {
    const newProduct = {id: Date.now(), name};
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, newName) => {
    setProducts(products.map((p) => (p.id === id ? {...p, name: newName} : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return {products, addProduct, updateProduct, deleteProduct};
};

// Component สำหรับแสดงรายการสินค้า
const ProductList = () => {
  const {products, addProduct, updateProduct, deleteProduct} = useProducts();
  const [newProduct, setNewProduct] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="w-full md:w-[1000px] bg-white dark:text-white dark:bg-slate-500 shadow-lg rounded-lg">
      <span className="flex justify-center bg-gray-200 dark:bg-slate-500 p-4 rounded-t-xl">ข้อ 3 ระบบจัดการสินค้า CRUD</span>
      <div className="p-4 bg-white dark:bg-slate-700">
        {/* เพิ่มสินค้า */}
        <div className="flex gap-2 mb-4">
          <input type="text" placeholder="ชื่อสินค้า" className="border p-2 flex-grow" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              if (newProduct.trim()) {
                addProduct(newProduct);
                setNewProduct("");
              }
            }}
          >
            เพิ่ม
          </button>
        </div>

        {/* รายการสินค้า */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">ไม่มีสินค้า</p>
        ) : (
          <ul className=" h-[30vh] overflow-auto px-2">
            {products.map((product) => (
              <li key={product.id} className="flex items-center justify-between border-b py-2">
                {editId === product.id ? (
                  <>
                    <input type="text" className="border p-1 flex-grow" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <button
                      className="bg-green-500 text-white px-2 py-1 ml-2"
                      onClick={() => {
                        updateProduct(product.id, editName);
                        setEditId(null);
                      }}
                    >
                      บันทึก
                    </button>
                  </>
                ) : (
                  <>
                    <span>{product.name}</span>
                    <div>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 mr-2"
                        onClick={() => {
                          setEditId(product.id);
                          setEditName(product.name);
                        }}
                      >
                        แก้ไข
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1" onClick={() => deleteProduct(product.id)}>
                        ลบ
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductList;
