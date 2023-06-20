import { useContext } from "react";
import Modal from "react-modal";

type Props = {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const RdvModal = (props: Props) => {
  if (!props.show) return <></>;

  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      tabIndex={-1}
    >
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              Supprimer le projet ?
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4">
            Si vous supprimez le projet, il sera impossible de le récupérer.
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="button"
              className="inline-block px-6 py-2.5  bg-cyan-600 text-white hover:bg-cyan-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
              onClick={props.onClose}
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={props.onDelete}
              className="ml-8 inline-block px-6 py-2.5  bg-red-600 text-white hover:bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RdvModal;
