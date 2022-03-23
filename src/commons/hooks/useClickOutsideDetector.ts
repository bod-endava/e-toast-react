import { useEffect, useRef } from "react";

export const useClickOutsideDetector = <T extends HTMLElement>(fn: (ref:  React.MutableRefObject<T>) => void) => {
  const elementRef: React.MutableRefObject<T | null> = useRef(null)
  
  useEffect(() => {
    function clickHandler(e){
      if(elementRef.current && !elementRef.current.contains(e.target)){
        fn(elementRef as React.MutableRefObject<T>);
      }
    }
    document.addEventListener("mousedown", clickHandler);
    return () => document.removeEventListener("mousedown",clickHandler)
  },[])

  return elementRef
}