import { useEffect, useRef, useState } from "react"
import { useSlimeBall } from "../../Context/slimeBall"
import { mouseInOut } from "../../Helper"
import { Link } from "react-router-dom"

interface NavbarProps {}

export const Navbar : React.FC<NavbarProps> = ({}) => {
  const fullStackRef = useRef<HTMLAnchorElement>(null)
  const projectsRef = useRef<HTMLAnchorElement>(null)
  const contactRef = useRef<HTMLAnchorElement>(null)
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
      <Link to="/" ref={fullStackRef}>Full-Stack Developer</Link>
      <Link to="/projects" ref={projectsRef}>Projects</Link>
      <Link to="/contact" ref={contactRef}>Contact</Link>
    </div>
  )
}