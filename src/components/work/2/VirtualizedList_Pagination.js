import {FixedSizeList as List} from "react-window";
import usePagination from "./usePagination";

const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // ตัวอย่าง API

const rowHeight = 60; // ความสูงของแถว
const columnHeaders = ["ID", "Title"]; // หัวคอลัมน์

const Row = ({index, style, data}) => {
  const item = data[index];
  if (!item) return null;

  return (
    <div style={style} className="grid grid-cols-3 border-b dark:bg-slate-700">
      <div className="col-span-1 p-2 text-center border-r">{item.id}</div>
      <div className="col-span-2 p-2 text-pretty">{item.title}</div>
    </div>
  );
};

const VirtualizedList_Pagination = () => {
  const {data, loading, hasMore, nextPage} = usePagination(apiUrl, 20);

  return (
    <div className="rounded-lg w-full md:w-[1000px] dark:text-white">
      {/* Header คอลัมน์ */}
      <span className="flex justify-center bg-gray-200 p-4 rounded-t-xl dark:bg-slate-500 border-b border-b-black">ข้อ 2 Virtualized List With Pagination</span>
      <div className="grid grid-cols-3 bg-gray-200 dark:bg-slate-500 font-bold sticky top-0 z-10">
        {columnHeaders.map((header, index) => (
          <div key={index} className={`${header === "Title" ? "col-span-2" : "col-span-1"} p-2 text-center border dark:border-0`}>
            {header}
          </div>
        ))}
      </div>

      {/* Grid แสดงข้อมูล */}
      <List
        height={400}
        itemCount={data.length + (hasMore ? 1 : 0)}
        itemSize={rowHeight}
        width={"md:w-[1000px]"}
        itemData={data}
        onItemsRendered={({visibleStopIndex}) => {
          if (visibleStopIndex >= data.length - 1 && hasMore && !loading) {
            nextPage();
          }
        }}
      >
        {Row}
      </List>

      {loading && <div className="text-center p-2">Loading...</div>}
    </div>
  );
};

export default VirtualizedList_Pagination;
