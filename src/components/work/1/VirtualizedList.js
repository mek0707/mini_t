import {FixedSizeList as List} from "react-window";

const itemCount = 100000; // จำนวนรายการทั้งหมด
const rowHeight = 40; // ความสูงของแต่ละแถว
const columnHeaders = ["ID", "ITEM"]; // หัวคอลัมน์

const Row = ({index, style}) => {
  return (
    <div style={style} className="grid grid-cols-2 border-b dark:bg-slate-700">
      <div className="p-2 text-center border-r">{index + 1}</div>
      <div className="p-2 text-center">Item {index + 1}</div>
    </div>
  );
};

const VirtualizedGrid = () => {
  return (
    <div className="rounded-lg w-full md:w-[1000px] dark:text-white">
      {/* Header คอลัมน์ */}
      <span className="flex justify-center bg-gray-200 dark:bg-slate-500 p-4 rounded-t-xl">ข้อ 1 Virtualized List Component</span>
      <div className="grid grid-cols-2 bg-gray-200 dark:bg-slate-500  font-bold sticky top-0 z-10 border-t border-t-black">
        {columnHeaders.map((header, index) => (
          <div key={index} className="p-2 border dark:border-0 text-center" style={{width: "100%"}}>
            {header}
          </div>
        ))}
      </div>

      {/* Grid แสดงข้อมูล */}
      <List height={400} itemCount={itemCount} itemSize={rowHeight} width={"md:w-[1000px]"}>
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedGrid;
