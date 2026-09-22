import { useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Sidebar from './sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const authRoutes = ["/login", "/signup"];
  const isAuthPage = authRoutes.includes(location.pathname);

  if (isAuthPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}