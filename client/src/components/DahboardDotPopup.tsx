// import { useRouter } from 'next/navigation';
// import React from 'react';


// export interface Post {
//     _id: string;
//     title: string;
//     description: string;
//     permaLink: string;
//     postSliderImageUrl: string[];
//     previewImageUrl: string;
//     status: string;
//     createdAt: Date;
//     visibility: string;
//     updatedAt: string;
//     category: string[];
//     postType: string;
//     authorName?: string;
//   }

// interface ActionPopupProps {
//   isOpen: boolean;
//   togglePopup: () => void;
// }

// const ActionPopup: React.FC<ActionPopupProps> = ({ isOpen, togglePopup }) => {
//   if (!isOpen) return null;
  
//   const router = useRouter()

//   return (
//     <>
//     {isOpen && (
//     <div className="absolute right-0 -bottom-28  w-40 bg-[#000000] border border-[#17161B] rounded-md shadow-lg z-30">
//       <div className="flex flex-col divide-y divide-[#17161B] text-[#999999]">
//         <button className="px-4 py-2 hover:bg-[#0A090F] text-left rounded" 
//          onClick={() => {
//             router.push( `/article` );
//           }}
//         >
//           View
//         </button>
//         <button className="px-4 py-2 hover:bg-[#0A090F] text-left rounded" >
//           Edit
//         </button>
//         <button className="px-4 py-2 hover:bg-[#0A090F] text-left rounded" >
//           Delete
//         </button>
//       </div>
//     </div>
// )}
// </>
//   );
// };

// export default ActionPopup;
