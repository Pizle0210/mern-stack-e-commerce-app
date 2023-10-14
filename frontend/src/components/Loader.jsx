import React from 'react'

export default function Loader({style}) {
  return (
    <div
      className="font-extralight m-auto text-gray-500 spinner-border block"
      style={style}
    ></div>
  );
}
