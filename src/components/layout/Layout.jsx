import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * @param {{ children: React.ReactNode, showFooter?: boolean }} props
 */
export function Layout({ children, showFooter = true }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
