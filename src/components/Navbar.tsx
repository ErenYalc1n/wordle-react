import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      {/* Sol - Logo */}
      <Link to="/" className="text-xl font-bold text-gray-800">
        Günlük Kelime
      </Link>

      {/* Sağ - Profil ikonu */}
      <Link to="/profile" className="text-gray-600 hover:text-gray-800 text-xl">
        <FaUser />
      </Link>
    </header>
  );
};

export default Navbar;
