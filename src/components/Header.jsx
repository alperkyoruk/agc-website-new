import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center p-2 bg-white shadow-md">
      <div className="flex items-center">
        <img
          src="/assets/header/algolab_logo.png"
          alt="Logo"
          className="h-max"
        />
      </div>
      <nav className="nav ml-auto">
        <ul className="flex space-x-4">
          <li>
            <a href="#home" className="text-black">
              Hakkında
            </a>
          </li>
          <li>
            <a href="#about" className="text-black">
              Puanlar
            </a>
          </li>
          <li>
            <a href="#services" className="text-black">
              SSS
            </a>
          </li>
          <li>
            <a href="#contact" className="text-black">
              Ekibimiz
            </a>
          </li>
          <li>
            <a href="#contact" className="text-black">
              Galeri
            </a>
          </li>
        </ul>
      </nav>
      <button className="text-black font-light px-4 py-2">Başvur</button>
    </header>
  );
}

export default Header;
