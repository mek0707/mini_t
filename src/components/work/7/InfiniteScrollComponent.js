import React, { useState, useEffect, useRef } from "react";

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true); // ใช้เพื่อควบคุมการโหลดข้อมูลเพิ่มเติม
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // เก็บหน้าปัจจุบัน
  const containerRef = useRef(null); // ใช้เพื่ออ้างอิงถึง div ที่เราต้องการให้เลื่อนถึงจุดสุดท้าย

  useEffect(() => {
    fetchItems(page); // ดึงข้อมูลเมื่อเริ่มต้น
  }, []);

  // ฟังก์ชันในการดึงข้อมูลจาก API
  const fetchItems = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const data = await response.json();

      if (data.length > 0) {
        setItems((prevItems) => [...prevItems, ...data]); // เพิ่มข้อมูลใหม่ใน items
      } else {
        setHasMore(false); // ถ้าข้อมูลหมดแล้ว จะตั้งค่า hasMore เป็น false
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับโหลดข้อมูลเพิ่มเติมเมื่อเลื่อนถึงจุดสิ้นสุด
  const loadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      fetchItems(page + 1); // ดึงข้อมูลจากหน้าใหม่
    }
  };

  // ตรวจสอบการเลื่อนของ div ที่มีความสูง 50vh
  const handleScroll = () => {
    const container = containerRef.current;
    // console.log("scrollHeight:", container.scrollHeight);
    // console.log("scrollTop:", container.scrollTop);
    // console.log("clientHeight:", container.clientHeight);

    if (container.scrollHeight - container.scrollTop <= container.clientHeight + 10 && hasMore && !loading) {
      loadMore(); // เรียกฟังก์ชันโหลดข้อมูลใหม่
    }
  };

  return (
    <div className="w-full md:w-[1000px] shadow-lg text-[18px] relative dark:text-white">
      <h2 className="flex justify-center bg-gray-200 dark:bg-slate-500 p-4 rounded-t-xl">ข้อ 7 Infinite Scroll</h2>
      <div
        ref={containerRef}
        className="w-full md:w-[1000px] h-[50vh] overflow-y-auto dark:bg-slate-700"
        onScroll={handleScroll} // เรียกฟังก์ชัน handleScroll เมื่อมีการเลื่อน
      >
        {items.map((item) => (
          <div key={item.id} style={{ padding: "15px", border: "1px solid #ccc", marginBottom: "0px" }}>
            <h4>Title : {item.title}</h4>
            <p>Detail : {item.body}</p>
          </div>
        ))}
        {loading && (
          <div className="text-center p-4">Loading...</div> // ข้อความแสดงระหว่างการโหลด
        )}
        {!hasMore && (
          <div className="text-center p-4">No more data!</div> // ข้อความแสดงเมื่อไม่มีข้อมูลเพิ่มเติม
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollComponent;
