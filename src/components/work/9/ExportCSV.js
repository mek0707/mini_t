import React from "react";

// ข้อมูลตัวอย่างสินค้า
const productList = [
  {id: 1, name: "apple", price: 1000, category: "fruit"},
  {id: 2, name: "banana", price: 800, category: "fruit"},
  {id: 3, name: "watermelon", price: 100, category: "fruit"},
  {id: 4, name: "coconut", price: 400, category: "fruit"},
  {id: 5, name: "knife", price: 100, category: "kitchenware"},
  {id: 6, name: "plate", price: 200, category: "kitchenware"},
  {id: 7, name: "spatula", price: 300, category: "kitchenware"},
  {id: 8, name: "cutting board", price: 400, category: "kitchenware"},
];

const ExportCSV = () => {
  // ฟังก์ชันสำหรับแปลงข้อมูลเป็น CSV และดาวน์โหลด
  const exportToCSV = () => {
    // แปลงข้อมูลเป็น CSV
    const csvRows = [
      ["ID", "Name", "Price", "Category"], // หัวคอลัมน์
      ...productList.map((product) => [product.id, product.name, product.price, [product.category]]), // ข้อมูลรายการสินค้า
    ];

    // แปลงอาร์เรย์เป็น CSV (โดยใช้ join และ map)
    const csvString = csvRows.map((row) => row.join(",")).join("\n"); // เชื่อมแต่ละบรรทัดด้วย \n

    // สร้าง Blob สำหรับไฟล์ CSV
    const blob = new Blob([csvString], {type: "text/csv;charset=utf-8;"});

    // สร้าง URL สำหรับดาวน์โหลด
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "products.csv"); // ชื่อไฟล์ที่ดาวน์โหลด
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full md:w-[1000px] shadow-lg text-[18px] relative dark:text-white">
      <span className="flex justify-center bg-gray-200 dark:bg-slate-500 p-4 rounded-t-xl">ข้อ 9 Export Data to CSV</span>

      <div className="flex justify-end items-center p-4 dark:bg-slate-700">
        <button onClick={exportToCSV} className="p-2 bg-blue-500 rounded-lg">
          Export CSV
        </button>
      </div>

      <div className="p-4 overflow-auto dark:bg-slate-700">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-500 dark:text-gray-400 sticky top-0 ">
            <tr className="">
              <th className="min-w-[25px] w-[25px] p-4">ID</th>
              <th className="p-4 text-center">Product Name</th>
              <th className="min-w-[100px] w-[100px] p-4">Price ($)</th>
              <th className="min-w-[100px] w-[100px] p-4">Category</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100 border-b">
                <td className="p-4">{product.id}</td>
                <td className="p-4 text-center">{product.name}</td>
                <td className="p-4 text-right">${product.price}</td>
                <td className="p-4 text-right">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <ul>
        {productList.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} บาท
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ExportCSV;
