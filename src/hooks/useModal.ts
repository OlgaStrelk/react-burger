// import { useDispatch } from "react-redux";
// import { useState } from "react";

// export const useModal = (initialValue: any) => {
//   const dispatch = useDispatch();

//   const [isOpen, setIsOpen] = useState(initialValue);

//   const onOpen = () => {
//     setIsOpen(true);
//   };

//   const onClose = (action: string | string[]) => {
//     if (typeof action == "string") {
//       dispatch({ type: action });
//     } else {
//       [...action].forEach((element) => {
//         dispatch({ type: element });
//       });
//     }
//     setIsOpen(false);
//   };

//   return [isOpen, onOpen, onClose];
// };
