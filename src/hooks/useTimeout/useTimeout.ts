import { useEffect } from "react";

export default function useTimeout(callback: () => void, delay?: number) {
  const execute = useRef(callback);
  
  useEffect(() => {
    const id = setTimeout(execute.current, delay);
    
    return () => clearTimeout(id);
  }, [delay]);
}
