import { Canvas } from "@react-three/fiber"
import { SlimeBall } from "../components/SlimeBall"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useSlimeBall } from "../../Context/slimeBall"
import { mouseInOut } from "../../Helper"
import { Magnetic } from "../components/Magnetic"
import { Link } from "react-router-dom"

interface HomeProps {}

export const Home : React.FC<HomeProps> = ({}) => {
  const { setSlimeBallColor, setScale } = useSlimeBall()
  let skills = [
    {name: "react", skill: "ReactJs", color: "skyblue", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "next", skill: "NextJs", color: "#555555", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "nodejs", skill: "NodeJS", color: "lightgreen", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "expressjs", skill: "ExpressJS", color: "gray", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "mongodb", skill: "MongoDB", color: "green", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "socketio", skill: "SocketIO", color: "gray", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "tailwindcss", skill: "TailwindCSS", color: "blue", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "typescript", skill: "TypeScript", color: "darkblue", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "javascript", skill: "JavaScript", color: "yellow", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "css", skill: "CSS", color: "blue", ref: useRef<HTMLDivElement>(null), inside: false},
    {name: "html", skill: "HTML", color: "red", ref: useRef<HTMLDivElement>(null), inside: false},
  ]
  const [mySkill, setMySkill] = useState<string>("Wayal")
  const [message, setMessage] = useState<string>("Sushant")
  const messageRef = useRef<HTMLDivElement>(null)
  const mySkillRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (messageRef.current) gsap.fromTo(messageRef.current, {y: -50}, {y: 0, duration: 1})
  },[messageRef, message])
  useEffect(() => {
    if (mySkillRef.current) gsap.fromTo(mySkillRef.current, {y: 50}, {y: 0, duration: 1})
  },[mySkillRef, mySkill])
  const [anyInside, setAnyInside] = useState<number>(-1);
  useEffect(() => {
    const onMouseMove = (e : MouseEvent) => mouseInOut(e, skills, setAnyInside);
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  },[skills])
  useEffect(() => {
    if (anyInside >= 0) {
      setMySkill(skills[anyInside].skill || "Wayal")
      setMessage("I Know")
      setSlimeBallColor(skills[anyInside].color || "white")
      setScale(1.3)
    }
    else {
      setMySkill("Wayal")
      setMessage("Sushant")
      setSlimeBallColor("white")
      setScale(1)
    }
  },[anyInside])
  return (
    <div className="w-lvw flex flex-col items-center text-white relative top-36 sm:top-28 gap-20">
      <div className="w-[95%] md:w-[80%] xl:w-[70%] flex flex-col gap-20 lg:flex-row">
        <div className="w-full lg:w-[80%] flex flex-col gap-10 md:gap-8">
          <div className="flex flex-col w-full leading-none text-[100px] sm:text-[120px] md:text-[160px] lg:text-[165px] font-bold">
            <p ref={messageRef}>{message}</p>
            <p className={mySkill.length > 6 ? "text-right" : "pl-[30%]"} ref={mySkillRef}>{mySkill}</p>
          </div>
          <div className="w-full flex items-end gap-[10%]">
            <p className="w-full lg:w-[70%] text-md sm:text-lg md:text-xl lg:text-2xl font-medium">
              Hi there! I’m a dedicated full-stack developer with a passion for creating innovative web solutions. From interactive games to data-driven platforms, I love turning ideas into reality through code. Always eager to learn and tackle new challenges, I’m committed to crafting impactful digital experiences.
            </p>
            <Link to="/projects" className="hidden lg:block">
              <Magnetic height="100px" range={70} strength={2} color="#333333" className="-translate-x-1/2 -translate-y-1/2 mt-[10%] rounded-full flex flex-col justify-center items-center">
                <p>Explore</p>
                <p>Projects</p>
              </Magnetic>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-[20%] flex flex-col gap-10">
          <p className="font-semibold text-5xl">I Know</p>
          <div className="w-full flex justify-between">
            <div className="w-1/2 lg:w-auto text-3xl grid grid-cols-3">
              {skills.map(({name, ref}) => (
                <div
                  className="h-20"
                  ref={ref}
                >
                  <Canvas className="h-0">
                    <SlimeBall radius={2} distortion={0.4} distortionSpeed={2} color={"white"} displace={false} clientX={window.innerWidth/2} texture={`../../../logos/${name}.png`}/>
                    <ambientLight intensity={10} color={"white"}/>
                  </Canvas>
                </div>
              ))}
            </div>
            <Link to="/projects" className="hidden md:block lg:hidden">
              <Magnetic height="100px" range={70} strength={2} color="#333333" className="-translate-x-1/2 -translate-y-1/2 mt-[10%] rounded-full flex flex-col justify-center items-center">
                <p>Explore</p>
                <p>Projects</p>
              </Magnetic>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[70%]">
        <p className="text-left w-full font-normal text-7xl">Acheivement</p>
        <div className="pl-[10%] mt-[10%] flex flex-col gap-10">
          <p className="text-3xl">
            First Rank in IIT Mandi Hackathon (FrostHack 2024)
          </p>
          <div className="ml-[10%]">
            <p className="text-2xl mb-2">Note-Corner</p>
            <img src="../../../ProjectCover/notecorner.png" alt="Note-Corner" className="w-[80%] object-cover"/>
            <div className="flex justify-end mr-[10%]">
              <Link to="/project/notecorner">
                <Magnetic height="100px" range={70} strength={2} color="#333333" className="-translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col justify-center items-center">
                  <p>Explore</p>
                  <p>More</p>
                </Magnetic>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}