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
  // const { logout, jwt } = useContext(AppContext);
  const [isConnected, setIsconnected] = useState(false);

  // useEffect(() => {
  //   jwt ? setIsconnected(true) : setIsconnected(false);
  // }, [jwt]);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-yellow-400">
            Vm Management
          </span>
        </a>
        <div className="flex  items-center md:order-2">
          {isConnected && (
            <div>
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 p-1.5 rounded-full md:mr-0  focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                onClick={dropdown ? closeBothDropdown : () => setDropdown(true)}
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
                    dev
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                    name@iptv.com
                  </span>
                </div>
                <button className="px-4 py-3 w-full hover:bg-gray-600 text-gray-200 hover:text-white">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    VPN
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                    Activé le vpn
                  </span>
                </button>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      type="button"
                      className="block px-4 py-2 text-sm  hover:bg-gray-600 text-gray-200 hover:text-white"
                      href={"login"}
                      // onClick={logout}
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

        <div
          className={
            "items-center justify-between  w-full md:flex md:w-auto md:order-1" +
            (burger ? " block" : " hidden")
          }
          id="mobile-menu-2"
          ref={downNode}
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ">
            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4 text-white bg-yellow-600 rounded md:bg-transparent md:text-yellow-600 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/login"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
