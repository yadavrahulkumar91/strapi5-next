// import React from "react";
// import AROC from "./aroc";

// export default function StyledTreeExample({ value }) {
//   return value && Array.isArray(value) && value.length > 0
//     ? value.map((item, index) => (
//         <div className="" key={index}>
//           <AROC data={item.data} layout_type={item.type} />

//           <div className="">
//             {item.caption ? <span>Fig. {item.caption}</span> : null}
//           </div>
//         </div>
//       ))
//     : null;
// }

import React from "react";
import AROC from "./aroc";

export default function StyledTreeExample({ value }) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <>
      {value.map((item, index) => (
        <div key={index}>
          <AROC data={item.data} layout_type={item.type} />

          {item.caption && (
            <div className="mt-2">
              <span>Fig. {item.caption}</span>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
