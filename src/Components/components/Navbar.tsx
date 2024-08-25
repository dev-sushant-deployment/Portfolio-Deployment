import { useEffect, useRef, useState } from "react"
import { useSlimeBall } from "../../Context/slimeBall"
import { mouseInOut } from "../../Helper"

interface NavbarProps {}

export const Navbar : React.FC<NavbarProps> = ({}) => {
  const fullStackRef = useRef<HTMLParagraphElement>(null)
  const projectsRef = useRef<HTMLParagraphElement>(null)
  const contactRef = useRef<HTMLParagraphElement>(null)
  const { setScale }  = useSlimeBall()
  let elements = [
    {ref: fullStackRef},
    {ref: projectsRef},
    {ref: contactRef}
  ]
  const [insideEle, setInsideEle] = useState<number>(-1);
  useEffect(() => {
    const onMouseMove = (e : MouseEvent) => mouseInOut(e, elements, setInsideEle)
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  },[fullStackRef, projectsRef, contactRef])
  useEffect(() => {
    if (insideEle >= 0) setScale(1.3);
    else setScale(1);
  },[insideEle])
  return (
    <div className="text-white flex py-4 justify-between px-8 font-semibold text-2xl fixed top-0 left-0 w-lvw z-10 uppercase">
      <p ref={fullStackRef}>Full-Stack Developer</p>
      <p ref={projectsRef}>Projects</p>
      <p ref={contactRef}>Contact</p>
    </div>
  )
}