"use client"
import { useState, useEffect } from "react"

type ScrollPosition = {
  scrollX: number;
  scrollY: number;
};

export const useScroll = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollX: 0,
    scrollY: 0,
  })


  const handleScroll = () => {
    setScrollPosition({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    })
  }
  useEffect(() => {

     setScrollPosition({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    });

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  return scrollPosition
}

export default useScroll;

