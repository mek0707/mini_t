import Layout from "@/layouts/Layout";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/components/work/10/store/store";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isIndexOr404 = router.pathname === "/" || pageProps?.statusCode === 404;

  return (
    <Provider store={store}>
      <div className="bg-white dark:bg-slate-900 min-h-screen">
        {isIndexOr404 ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </div>
    </Provider>
  );
}

export default MyApp;
