import React, { useEffect } from "react";

export const useClickOutsideDetector = <T extends HTMLElement>(elementRef: React.MutableRefObject<T | null>, fn: (ref:  React.MutableRefObject<T>) => void) => {
  useEffect(() => {
    function clickHandler(e){
      if(elementRef.current && !elementRef.current.contains(e.target)){
        fn(elementRef as React.MutableRefObject<T>);
      }
    }
    document.addEventListener("mousedown", clickHandler);
    return () => document.removeEventListener("mousedown",clickHandler)
  },[])
}