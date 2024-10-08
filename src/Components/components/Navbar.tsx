import { useEffect, useRef, useState } from "react"
import { useSlimeBall } from "../../Context/slimeBall"
import { mouseInOut } from "../../Helper"
import { Link, useLocation } from "react-router-dom"

interface NavbarProps {}

export const Navbar : React.FC<NavbarProps> = ({}) => {
  const location = useLocation()
  const fullStackRef = useRef<HTMLAnchorElement>(null)
  const projectsRef = useRef<HTMLAnchorElement>(null)
  const contactRef = useRef<HTMLAnchorElement>(null)
  const [mainText, setMainText] = useState<string>("Full-Stack Developer")
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
  useEffect(() => {
    if (location.pathname == "/") setMainText("Full-Stack Developer")
    else setMainText("Sushant Wayal")
  },[location])
  return (
    <div className="text-white flex py-4 justify-between px-8 font-semibold text-xl sm:text-2xl fixed top-0 left-0 w-lvw z-10 uppercase bg-[#111111] shadow-2xl shadow-[#111111]">
      <Link to="/" ref={fullStackRef}>{mainText}</Link>
      <Link to="/projects" ref={projectsRef}>Projects</Link>
      <Link to="/contact" className="sm:block hidden" ref={contactRef}>Contact</Link>
    </div>
  )
}