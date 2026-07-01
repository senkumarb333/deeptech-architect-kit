import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PageSEO } from "@/components/seo/PageSEO";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <PageSEO />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
