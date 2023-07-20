"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IoCloseOutline, IoPerson, IoMenuOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import useClickOutside from "@/app/hooks/useClickOutside";
import { AppContext } from "@/app/context/AppContext";

const Navbar = () => {
  const [burger, setBurger] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const closeBothDropdown = () => {
    setBurger(false);
    setDropdown(false);
  };

  const { downNode } = useClickOutside(() => {
    closeBothDropdown();
  });
  // @ts-ignore
  const { logout, jwt } = useContext(AppContext);
  const [isConnected, setIsconnected] = useState(false);

  useEffect(() => {
    jwt ? setIsconnected(true) : setIsconnected(false);
  }, [jwt]);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-yellow-400">
            Vm Management
          </span>
        </a>
        {isConnected ? (
          <div className="flex  items-center md:order-2">
            {isConnected && (
              <div>
                <button
                  type="button"
                  className="flex mr-3 text-sm bg-gray-800 p-1.5 rounded-full md:mr-0  focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  onClick={
                    dropdown ? closeBothDropdown : () => setDropdown(true)
                  }
                >
                  <span className="sr-only">Open user menu</span>
                  <IoPerson className="w-6 h-6 text-slate-300 " />
                </button>

                <div
                  ref={downNode}
                  className={
                    "z-50   my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600 " +
                    (dropdown ? "absolute -translate-x-24" : "hidden")
                  }
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {jwt}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        type="button"
                        className="block px-4 py-2 text-sm  hover:bg-gray-600 text-gray-200 hover:text-white"
                        href={"login"}
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <button
              className=" text-dark block px-3 py-1 leading-none outline-none focus:outline-none md:hidden"
              type="button"
              onClick={burger ? closeBothDropdown : () => setBurger(true)}
            >
              <IconContext.Provider value={{ size: "40px" }}>
                {burger ? <IoCloseOutline /> : <IoMenuOutline />}
              </IconContext.Provider>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
