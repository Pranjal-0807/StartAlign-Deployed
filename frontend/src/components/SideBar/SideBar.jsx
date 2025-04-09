import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { sideBarIcons } from "../../utils/constants";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/account");
  }

  return (
    <div
      className={`bg-gray-900 text-white ${isOpen ? "w-64" : "w-20"
        } h-screen transition-all duration-300 p-4 flex-shrink-0`}
    >
      <button
        className="text-white mb-6 p-2 rounded-lg hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
      <ul className="space-y-2">
        {sideBarIcons.map(({ icon: Icon, text, path, id }) => (
          <Link to={path} key={id}>
            <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
              <Icon size={24} />
              {isOpen && <span className="text-lg">{text}</span>}
            </li>
          </Link>
        ))}
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
          <LogOut size={24} />
          {isOpen && <span className="text-lg">Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
