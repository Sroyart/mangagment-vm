import React, { useContext } from "react";

interface CardProps {
  item: {
    name: string;
    id: number;
  };
  setId: (id: number) => void;
  openModal: () => void;
}

const Card: React.FC<CardProps> = ({ item, setId, openModal }) => {
  return (
    <div
      // onClick={() => {
      //   setId(item.id);
      //   openModal;
      // }}
      onClick={() => {
        openModal();
        setId(item.id);
      }}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
    >
      <span className="font-normal text-gray-700 dark:text-gray-400">
        {item.name}
      </span>
    </div>
  );
};

export default Card;
