import React from "react";

import VirtualizedList from "@/components/work/1/VirtualizedList";

import VirtualizedList_Pagination from "@/components/work/2/VirtualizedList_Pagination";

import ProductList from "@/components/work/3/ProductList";

import ChatApp from "@/components/work/5/ChatApp";

import RegisterForm from "@/components/work/6/RegisterForm";

import InfiniteScrollComponent from "@/components/work/7/InfiniteScrollComponent";

import Cart from "@/components/work/8/Cart";

import ExportCSV from "@/components/work/9/ExportCSV";

import App_Store from "@/components/work/10/store/UserList.js.js";
import UserList from "@/components/work/10/store/UserList.js.js";

export default function Home() {
  return (
    <div className="">
      <div className="p-4 relative flex flex-col justify-center items-center gap-4">
        <VirtualizedList />

        <VirtualizedList_Pagination />

        <ProductList />

        <ChatApp />

        <RegisterForm />

        <InfiniteScrollComponent />

        <Cart />

        <ExportCSV />

        <UserList />
      </div>
    </div>
  );
}
