// components/Header/Header.jsx - Header with banner and top navbar
import TopNavbar from "../common/navbar/topNavbar";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner */}
<div className="overflow-hidden bg-orange-400 text-shadow-2xs  text-white text-center">
  <div className="animate-marquee whitespace-nowrap inline-block">
    <p className="text-xs lg:text-sm px-4 text-white">
      <span className="font-bold">HYBRID EVENT</span> - You can participate in person at{" "}
      <span className="font-bold">Chennai, India</span> or{" "}
      <span className="font-bold">Virtually</span> from your home or office.
    </p>
  </div>
</div>

      
      {/* Top Navbar */}
      <TopNavbar />
    </header>
  );
}