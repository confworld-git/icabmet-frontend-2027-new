// Layout.jsx - Fresh Layout
import { Outlet } from "react-router-dom";
import Header from "../src/assets/components/Header/Header";
import Navigation from "../src/assets/components/Navigation/Navigation";
import Footer from "./assets/components/common/footer/footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with banner and top navbar */}
      <Header />                        
      
      {/* Main Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="flex-1 pt-22 lg:pt-32">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

