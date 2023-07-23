"use client";
import Button from "@/app/components/Button";
import { useState, useRef, useEffect, useContext } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppContext } from "@/app/context/AppContext";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MyVm } from "@/app/types/Vm";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function Home() {
  const { jwt } = useContext(AppContext);
  const [account, setAccount] = useState(undefined);
  const [myVm, setMyVm] = useState<MyVm | null>();

  const [createAndDelete, setCreateAndDelete] = useState(false);
  const [version, setVersion] = useState({
    os: "UbuntuServer",
    version: "14.04.3-LTS",
    pub: "Canonical",
  });
  const [os, setOs] = useState({
    os: "UbuntuServer",
    version: [],
    pub: "Canonical",
  });

  const vm = [
    {
      os: "UbuntuServer",
      version: [
        "19.04",
        "18.04-LTS",
        "16.04-LTS",
        "14.04.4-LTS",
        "14.04.3-LTS",
        "12.04.3-LTS",
      ],
      pub: "Canonical",
    },

    {
      os: "WindowsServer",
      version: [
        "2022-Datacenter",
        "2022-datacenter-azure-edition-core",
        "2019-Datacenter",
        "2016-Datacenter",
        "2012-R2-Datacenter",
        "2012-Datacenter",
        "2008-R2-SP1",
      ],
      pub: "MicrosoftWindowsServer",
    },
    {
      os: "debian-11",
      version: ["11-backports", "11"],
      pub: "Debian",
    },
  ];

  const showMyVm = async () => {
    let data = null;
    await fetch(`http://localhost:${process.env.API_PORT}/vm`, {
      method: "GET",
    })
      .then(async function (response) {
        data = await response.json();
        setMyVm(data);
      })
      .catch(() => setMyVm(null));
  };

  useEffect(() => {
    showMyVm();
  }, []);

  const handleClick = async () => {
    let data = null;
    setTimer("10:00");
    setCreateAndDelete(true);
    await fetch(`http://localhost:${process.env.API_PORT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(version),
    }).then(async function (response) {
      data = await response.json();
      showMyVm();
      clearTimer(getDeadTime());
    });
  };

  const deleteVm = async () => {
    await fetch(`http://localhost:${process.env.API_PORT}/deleteVm`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      setCreateAndDelete(false);
      showMyVm();
    });
  };

  //---------------------------------------------------------------------------------

  const Ref = useRef(null);
  const [timer, setTimer] = useState("10:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("10:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 600);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  // useEffect(() => {
  //   timerIsStarted && clearTimer(getDeadTime());
  // }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  // const onClickReset = () => {
  //   clearTimer(getDeadTime());
  // };

  //---------------------------------------------------------------------------------

  useEffect(() => {
    timer === "00:00" && deleteVm();
  }, [timer]);

  useEffect(() => {
    setAccount(jwt);
  }, [jwt]);

  if (account === undefined) {
    return (
      <div className="text-center mt-4">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (jwt === "basic@gmail.com") {
    return (
      <div className="mt-4">
        {myVm ? (
          <div>
            <h1>Votre VM : </h1>

            <div className="w-auto p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {myVm.name}
              </h5>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                {myVm.vmId}
              </p>
              <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <div className="text-left">
                    <div className=" text-xs">
                      {myVm.storageProfile.osDisk.osType}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => deleteVmBefore()}
                  className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <div className="text-left">
                    <div className=" text-xs">
                      <RiDeleteBin2Line color="red" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Vous n'avez aucune VM</h1>
        )}
      </div>
    );
  }

  const deleteVmBefore = () => {
    if (timer === "00:00") {
      console.log("wait");
    } else {
      clearInterval(Ref.current);
      setTimer("00:00");
      setCreateAndDelete(true);
      // deleteVm();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <span className="m-4">{`Version choisis = ${version.os}, ${version.version}`}</span>
      {jwt === "superAdmin@gmail.com" && (
        <>
          <div className="inline-flex mb-8 shadow-sm" role="group">
            {vm.map((e, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setOs(e)}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                {e.os}
              </button>
            ))}
          </div>
          <div className="mb-8 inline-flex rounded-md shadow-sm" role="group">
            {os.version.map((e, index) => (
              <button
                type="button"
                key={index}
                onClick={() =>
                  setVersion({ os: os.os, version: e, pub: os.pub })
                }
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                {e}
              </button>
            ))}
          </div>
        </>
      )}

      {/* <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Settings
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Messages
        </button>
      </div> */}

      <div>
        {createAndDelete ? (
          timer !== "10:00" && timer !== "00:00" ? (
            <div className="mb-4">
              <AiOutlineCheckCircle color="green" size={50} />
            </div>
          ) : (
            <>
              <div className="text-center mt-4">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </>
          )
        ) : myVm ? (
          <span>Vous possédez déja une VM</span>
        ) : (
          <Button type="button" onClick={handleClick}>
            Créer une VM
          </Button>
        )}
      </div>
      {timer !== "10:00" && timer !== "00:00" && (
        <>
          <div>
            <span className="font-bold">{`La VM a été créée.`}</span>
          </div>
          <div>
            <span>
              {`Elle sera supprimée dans : `}
              <strong className="text-red-600">{timer}</strong>
              {"."}
            </span>
          </div>
        </>
      )}
      {timer === "00:00" && createAndDelete === true && (
        <span className="text-red-600 font-bold">
          {"La VM est en cours de suppression..."}
        </span>
      )}
      {timer === "00:00" && createAndDelete === false && (
        <span>{"La VM a été supprimée."}</span>
      )}

      <div className="mt-4">
        {myVm ? (
          <div>
            <h1>Votre VM : </h1>

            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {myVm.name}
              </h5>
              <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                {myVm.vmId}
              </p>
              <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <div className="text-left">
                    <div className=" text-xs">
                      {myVm.storageProfile.osDisk.osType}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => deleteVmBefore()}
                  className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <div className="text-left">
                    <div className=" text-xs">
                      <RiDeleteBin2Line color="red" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Vous n'avez aucune VM</h1>
        )}
      </div>
    </main>
  );
}
