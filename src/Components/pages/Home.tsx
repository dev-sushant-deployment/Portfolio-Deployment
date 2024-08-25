import { Canvas } from "@react-three/fiber"
import { SlimeBall } from "../components/SlimeBall"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useSlimeBall } from "../../Context/slimeBall"
import { mouseInOut } from "../../Helper"

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
    <div className="w-lvw flex flex-col items-center text-white relative top-28 gap-8">
      <div className="w-[70%] flex">
        <div className="w-[80%] flex flex-col gap-8">
          <div className="flex flex-col w-full leading-none  text-[165px] font-bold">
            <p ref={messageRef}>{message}</p>
            <p className={mySkill.length > 6 ? "text-right" : "pl-[30%]"} ref={mySkillRef}>{mySkill}</p>
          </div>
          <div className="w-full">
            <p className="w-[70%] text-2xl font-medium">
              Hi there! I’m a dedicated full-stack developer with a passion for creating innovative web solutions. From interactive games to data-driven platforms, I love turning ideas into reality through code. Always eager to learn and tackle new challenges, I’m committed to crafting impactful digital experiences.
            </p>
          </div>
        </div>
        <div className="w-[20%] flex flex-col gap-10">
          <p className="font-semibold text-5xl">I Know</p>
          <div className="text-3xl grid grid-cols-3">
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
        </div>
      </div>
    </div>
  )
}