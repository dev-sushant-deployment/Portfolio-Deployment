import { useEffect, useRef, useState } from "react";
import { Magnetic } from "../components/Magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {}

export const Projects: React.FC<ProjectsProps> = () => {
  const rotatation = -8;
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const projectNameRef = useRef<HTMLDivElement>(null);
  const projects = [
    {name: "Idea-Connect", filename: "ideaconnect.png", ref: useRef<HTMLDivElement>(null)},
    {name: "EnviScribe", filename: "enviscribe.png", ref: useRef<HTMLDivElement>(null)},
    {name: "Note-Corner", filename: "notecorner.png", ref: useRef<HTMLDivElement>(null)},
    {name: "Miraz-Web", filename: "mirazweb.png", ref: useRef<HTMLDivElement>(null)},
    {name: "Multiplayer Tic-Tac-Toe", filename: "tictactoe.png", ref: useRef<HTMLDivElement>(null)},
  ];
  const handleScroll = () => {
    const height = scrollDivRef.current?.clientHeight;
    const y = (height || 0)/2 - window.scrollY;
    const x = y*Math.tan(-1*rotatation*Math.PI/180);
    scrollDivRef.current?.style.setProperty("transform", `rotate(${rotatation}deg) translateX(${x-100}px)`);
  };
  const [projectName, setProjectName] = useState("");
  useEffect(() => {
    handleScroll();
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrollDivRef]);
  useEffect(() => {
    projects.forEach(({name, ref}) => {
      if (ref.current) {
        gsap.to(ref.current, {scrollTrigger: {
          trigger: ref.current,
          start: "top 50%",
          end: "bottom 50%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.to(ref.current, {
              opacity: 1,
              scale: 1.1,
            })
            setProjectName(name);
            gsap.fromTo(projectNameRef.current, {y: -50}, {y: 0, duration: 1});
          },
          onLeave: () => gsap.to(ref.current, {
            opacity: 0.5,
            scale: 1,
          }),
          onEnterBack: () => {
            gsap.to(ref.current, {
              opacity: 1,
              scale: 1.1,
            })
            setProjectName(name);
            gsap.fromTo(projectNameRef.current, {y: 50}, {y: 0, duration: 1});
          },
          onLeaveBack: () => gsap.to(ref.current, {
            opacity: 0.5,
            scale: 1,
          }),
        }});
      }
    });
  }, [projects]);
  return (
    <div className="w-lvw flex justify-center overflow-x-hidden">
      <div className="w-3/5 mt-[12%]">
        <div className="w-full flex flex-col gap-20" ref={scrollDivRef}>
          {projects.map(({filename, ref}, i) => (
            <Magnetic key={i} color="" range={250} height="70vh" width="60vw" strength={0.2} scale={1} className="flex justify-center items-center">
              <div style={{backgroundImage: `url(../../../ProjectCover/${filename})`}} className="w-full h-full bg-cover bg-center flex justify-center items-center" ref={ref}>
              </div>
            </Magnetic>
          ))}
        </div>
        <div className="fixed bottom-[10%] right-[15%]">
          <Magnetic color="black" range={100} height="150px" strength={1.5} className="flex justify-center items-center rounded-full text-white">
            <p className="text-5xl">+</p>
          </Magnetic>
        </div>
        <div className="w-full h-32"></div>
        <p className="fixed top-1/2 left-[35%] translate-x-1/2 -translate-y-1/2 text-6xl z-[100000] text-black font-semibold" ref={projectNameRef}>
          {projectName}
        </p>
      </div>
    </div>
  );
};