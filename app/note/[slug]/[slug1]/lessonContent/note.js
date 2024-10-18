import React from "react";
import { renderAttributes } from "./lessonContent";

function Note({ value }) {
  return (
    <div>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((note, index) => (
            <span key={index}>
              {note.title ? (
                <div className="rounded-md border-red-600 border m-2 overflow-hidden">
                  <div className="bg-red-200 text-xl font-bold pl-1">
                    {note.title}
                  </div>

                  <div className="bg-red-50 font-sans">
                    {renderAttributes(note.data, note.level ? note.level : 1)}
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-md border-yellow-600 border m-2 overflow-hidden"
                  key={index}
                >
                  <div className="bg-yellow-200 text-xl pl-1">Note</div>

                  <div className="bg-yellow-50 font-sans">
                    {renderAttributes(note.data, note.level ? note.level : 1)}
                  </div>
                </div>
              )}
            </span>
          ))
        : null}
    </div>
  );
}

export default Note;
