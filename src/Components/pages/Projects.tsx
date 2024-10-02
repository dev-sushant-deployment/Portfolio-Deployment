import { useEffect, useRef, useState } from "react";
import { Magnetic } from "../components/Magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { breakPoint } from "../../constants";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {}

export const Projects: React.FC<ProjectsProps> = () => {
  const [rotation, setRotation] = useState<number>(-8);
  // const baseWidth = 1536;
  // const navigate = useNavigate();
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const projectNameRef = useRef<HTMLDivElement>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  // const [disabled, setDisabled] = useState(false);
  const disabled = false;
  const projects = [
    {name: "Idea-Connect", filename: "ideaconnect.webp", link: "ideaconnect", ref: useRef<HTMLImageElement>(null)},
    {name: "EnviScribe", filename: "enviscribe.webp", link: "enviscribe", ref: useRef<HTMLImageElement>(null)},
    {name: "Note-Corner", filename: "notecorner.webp", link: "notecorner", ref: useRef<HTMLImageElement>(null)},
    {name: "Tic-Tac-Toe", filename: "tictactoe.webp", link: "tictactoe", ref: useRef<HTMLImageElement>(null)},
  ];
  const handleScroll = () => {
    if (window.innerWidth < breakPoint) return;
    const height = scrollDivRef.current?.clientHeight;
    const y = (height || 0)/2 - window.scrollY;
    const x = y*Math.tan(-1*rotation*Math.PI/180);
    scrollDivRef.current?.style.setProperty("transform", `rotate(${rotation}deg) translateX(${x}px)`);
  };
  const [projectName, setProjectName] = useState("");
  const actResponsive = () => {
    if (window.innerWidth < breakPoint) {
      setRotation(0);
      gsap.to(scrollDivRef.current, {rotate: 0, duration: 0});
    }
    else {
      setRotation(-8);
      gsap.to(scrollDivRef.current, {rotate: -8, duration: 0});
    }
  };
  useEffect(() => {
    handleScroll();
    document.addEventListener("scroll", handleScroll);
    actResponsive();
    window.addEventListener("resize", actResponsive);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", actResponsive);
    }
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
              setProjectName(name);
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
  // useEffect(() => {
  //   document.body.style.overflow = "auto";
  //   const handleClick = (e: MouseEvent) => {
  //     e.preventDefault();
  //     const elements = document.elementsFromPoint(e.clientX, e.clientY);
  //     elements.forEach((element) => {
  //       if (element.id === "project") {
  //         element.remove();
  //         setDisabled(true);
  //         const href = `/project/${projects[projectIndex].link}`;
  //         setTimeout(() => navigate(href), 1000);
  //         projects.map(({ref}, i) => {
  //           if (i !== projectIndex) {
  //             ref.current?.remove();
  //           }
  //         });
  //         document.body.style.overflow = "hidden";
  //         gsap.to(projects[projectIndex].ref.current, {
  //           rotate: -1*rotation,
  //           scale: 1.2,
  //           position: "relative",
  //           top: 0.5*window.innerHeight+window.scrollY-projectIndex*((projects[projectIndex].ref.current?.clientHeight || 0)+86.25),
  //           // top: 0.5*window.innerHeight+window.scrollY+(baseWidth/window.innerWidth)*20-projectIndex*((projects[projectIndex].ref.current?.clientHeight || 0)+100)*Math.cos(rotation*Math.PI/180),
  //           left: window.innerWidth >= breakPoint ? -0.05375*window.innerWidth : 0,
  //           duration: 1,
  //         });
  //       }
  //     });
  //   };
  //   document.addEventListener("click", handleClick);
  //   return () => document.removeEventListener("click", handleClick);
  // },[projectIndex, projects, projectName]);
  return (
    <div className="w-lvw flex justify-center overflow-x-hidden">
      <Helmet>
        <title>Sushant Wayal | Projects</title>
        <meta name="description" content="Projects" />
      </Helmet>
      <div className="w-3/5  mt-[30%] sm:mt-[12%]">
        <div className="w-full flex flex-col gap-20" ref={scrollDivRef}>
          {projects.map(({filename, ref}, i) => (
            <Magnetic key={i} color="" range={250} height="70vh" width="60vw" strength={0.2} scale={1} className="flex justify-center items-center" disabled={disabled}>
              {/* <div style={{backgroundImage: `url(../../../ProjectCover/${filename})`}} className="w-full h-full bg-cover bg-center flex justify-center items-center bg-black" ref={ref}> */}
              <img src={`../../../ProjectCover/${filename}`} alt={filename} className="w-full h-full object-cover" ref={ref} />
              {/* </div> */}
            </Magnetic>
          ))}
        </div>
        <Link id="project" className="fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-[150%] md:bottom-[10%] md:right-[15%] md:translate-x-0 md:translate-y-0 z-[10000]" to={`/project/${projects[projectIndex].link}`}>
          <Magnetic color="black" range={100} height={window.innerWidth >= breakPoint ? "150px" : "100px"} strength={1.5} className="flex justify-center items-center rounded-full text-white">
            <p className="text-5xl">+</p>
          </Magnetic>
        </Link>
        <div className="w-full h-32"></div>
        <p className="fixed top-1/2 w-full left-0 text-6xl z-[10000] font-semibold text-center text-white" ref={projectNameRef}>
          {projectName}
        </p>
      </div>
    </div>
  );
};