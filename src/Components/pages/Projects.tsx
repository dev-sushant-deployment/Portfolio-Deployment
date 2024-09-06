import { useEffect, useRef, useState } from "react";
import { Magnetic } from "../components/Magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {}

export const Projects: React.FC<ProjectsProps> = () => {
  const rotatation = -8;
  const navigate = useNavigate();
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const projectNameRef = useRef<HTMLDivElement>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const projects = [
    {name: "Idea-Connect", filename: "ideaconnect.jpg", link: "ideaconnect", ref: useRef<HTMLDivElement>(null)},
    {name: "EnviScribe", filename: "enviscribe.jpg", link: "enviscribe", ref: useRef<HTMLDivElement>(null)},
    {name: "Note-Corner", filename: "notecorner.jpg", link: "notecorner", ref: useRef<HTMLDivElement>(null)},
    {name: "Miraz-Web", filename: "mirazweb.jpg", link: "mirazweb", ref: useRef<HTMLDivElement>(null)},
    {name: "Multiplayer Tic-Tac-Toe", filename: "tictactoe.jpg", link: "tictactoe", ref: useRef<HTMLDivElement>(null)},
  ];
  const handleScroll = () => {
    const height = scrollDivRef.current?.clientHeight;
    const y = (height || 0)/2 - window.scrollY;
    const x = y*Math.tan(-1*rotatation*Math.PI/180);
    scrollDivRef.current?.style.setProperty("transform", `rotate(${rotatation}deg) translateX(${x}px)`);
  };
  const [projectName, setProjectName] = useState("");
  useEffect(() => {
    handleScroll();
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrollDivRef]);
  useEffect(() => {
    projects.forEach(({name, ref}, ind) => {
      if (ref.current) {
        gsap.to(ref.current, {scrollTrigger: {
          trigger: ref.current,
          start: "top 50%",
          end: "bottom 50%",
          toggleActions: "play none none none",
          onEnter: () => {
            if (!disabled) {
              gsap.to(ref.current, {
                opacity: 1,
                scale: 1.1,
              })
              setProjectName(name);
              gsap.fromTo(projectNameRef.current, {y: -50}, {y: 0, duration: 1});
              setProjectIndex(ind);
            }
          },
          onLeave: () => {
            if (!disabled) {
              gsap.to(ref.current, {
                opacity: 0.5,
                scale: 1,
              })
            }
          },
          onEnterBack: () => {
            if (!disabled) {
              gsap.to(ref.current, {
                opacity: 1,
                scale: 1.1,
              })
              gsap.fromTo(projectNameRef.current, {y: 50}, {y: 0, duration: 1});
              setProjectIndex(ind);
            }
          },
          onLeaveBack: () => {
            if (!disabled) {
              gsap.to(ref.current, {
                opacity: 0.5,
                scale: 1,
              })
            }
          },
        }});
      }
    });
  }, [projects]);
  useEffect(() => {
    document.body.style.overflow = "auto";
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      elements.forEach((element) => {
        if (element.id === "project") {
          element.remove();
          setDisabled(true);
          const href = `/project/${projects[projectIndex].link}`;
          setTimeout(() => navigate(href), 1000);
          projects.map(({ref}, i) => {
            if (i !== projectIndex) {
              ref.current?.remove();
            }
          });
          document.body.style.overflow = "hidden";
          gsap.to(projects[projectIndex].ref.current, {
            rotate: -1*rotatation,
            scale: 1.2,
            position: "relative",
            top: 0.5*window.innerHeight+window.scrollY-projectIndex*((projects[projectIndex].ref.current?.clientHeight || 0)+86.25),
            left: -0.05375*window.innerWidth,
            duration: 1,
          });
        }
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  },[projectIndex, projects, projectName]);
  return (
    <div className="w-lvw flex justify-center overflow-x-hidden">
      <div className="w-3/5 mt-[12%]">
        <div className="w-full flex flex-col gap-20" ref={scrollDivRef}>
          {projects.map(({filename, ref}, i) => (
            <Magnetic key={i} color="" range={250} height="70vh" width="60vw" strength={0.2} scale={1} className="flex justify-center items-center" disabled={disabled}>
              <div style={{backgroundImage: `url(../../../ProjectCover/${filename})`}} className="w-full h-full bg-cover bg-center flex justify-center items-center bg-black" ref={ref}>
              </div>
            </Magnetic>
          ))}
        </div>
        <div id="project" className="fixed bottom-[10%] right-[15%] z-[10000]">
          <Magnetic color="black" range={100} height="150px" strength={1.5} className="flex justify-center items-center rounded-full text-white">
            <p className="text-5xl">+</p>
          </Magnetic>
        </div>
        <div className="w-full h-32"></div>
        <p className="fixed top-1/2 w-full left-0 text-6xl z-[10000] font-semibold text-center text-white" ref={projectNameRef}>
          {projectName}
        </p>
      </div>
    </div>
  );
};