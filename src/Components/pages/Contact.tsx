import { ArrowRight, Github, Linkedin } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { mouseInOut } from "../../Helper";
import { useSlimeBall } from "../../Context/slimeBall";

interface ContactProps {}

export const Contact : React.FC<ContactProps> = ({}) => {
  const { setScale } = useSlimeBall()
  const mailLinkRef = useRef<HTMLAnchorElement>(null);
  const linkedinLinkRef = useRef<HTMLAnchorElement>(null);
  const githubLinkRef = useRef<HTMLAnchorElement>(null);
  let elements = [
    {ref: mailLinkRef},
    {ref: linkedinLinkRef},
    {ref: githubLinkRef}
  ]
  const [insideEle, setInsideEle] = useState<number>(-1);
  useEffect(() => {
    const onMouseMove = (e : MouseEvent) => mouseInOut(e, elements, setInsideEle)
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  },[mailLinkRef])
  useEffect(() => {
    if (insideEle >= 0) setScale(1.3);
    else setScale(1);
  },[insideEle])
  return (
    <div className="w-[90%] sm:w-[70%] flex flex-col text-white relative top-28 gap-20 left-1/2 -translate-x-1/2">
      <div className="flex flex-col gap-5 sm:gap-20">
        <p className="uppercase font-semibold text-lg">Like what you see?</p>
        <p className="font-bold text-9xl">Let's Talk</p>
      </div>
      <div className="flex justify-start gap-5 sm:justify-between flex-col sm:flex-row items-start">
        <Link to={`mailto:sushantssr12345@gmail.com?subject=Let's Collaborate!!`} className="py-4 px-6 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111] text-white" ref={mailLinkRef}>
          <p className="uppercase">sushantssr12345@gmail.com</p>
          <ArrowRight size={24} />
        </Link>
        <div className="flex gap-2 h-[50px]">
          <Link to="https://www.linkedin.com/in/sushant-wayal-721964266/" className="border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111] text-white px-3" ref={linkedinLinkRef}>
            <Linkedin size={24} color="white"/>
          </Link>
          <Link to="https://www.github.com/sushant-wayal" className="border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111] text-white px-3" ref={githubLinkRef}>
            <Github size={24} color="white"/>
          </Link>
        </div>
      </div>
      <div>
        <p className="text-2xl">I'm always looking for new opportunities and collaborations.</p>
        <p className="text-2xl">Feel free to reach out to me.</p>
      </div>
    </div>
  )
}