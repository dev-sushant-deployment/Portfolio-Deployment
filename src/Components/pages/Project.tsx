import { ArrowLeft, ArrowRight, Github, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Tag } from "../components/Tag";
import { mouseInOut } from "../../Helper";
import { useSlimeBall } from "../../Context/slimeBall";
import { MyProjects } from "../../Data/projects.json"
import axios from "axios";

interface ProjectProps {}

export const Project : React.FC<ProjectProps> = ({}) => {
  const { name } = useParams<{name: string}>()
  const project = MyProjects.find(project => project.link === name);
  const projectIndex = MyProjects.findIndex(project => project.link === name);
  if (!project) return null;
  const { name : projectName, description, github, website, filename, year, technologies } = project;
  const { setScale }  = useSlimeBall()
  const [feedbacks, setFeedbacks] = useState<string[]>([
    "This is a good project",
    "I like this project",
    "This project is very helpful",
    "I am very happy to see this project"
  ]);
  useEffect(() => {
    window.scrollTo(0,0);
    // const { data } = axios.get("https://api.github.com/repos/Abdul-Sen/Portfolio/issues");
    // setFeedbacks(data);
  }, [name]);
  const githubLinkRef = useRef<HTMLAnchorElement>(null);
  const websiteLinkRef = useRef<HTMLAnchorElement>(null);
  const backLinkRef = useRef<HTMLAnchorElement>(null);
  const nextLinkRef = useRef<HTMLAnchorElement>(null);
  let elements = [
    {ref: githubLinkRef},
    {ref: websiteLinkRef},
    {ref: backLinkRef},
    {ref: nextLinkRef}
  ]
  const [insideEle, setInsideEle] = useState<number>(-1);
  useEffect(() => {
    const onMouseMove = (e : MouseEvent) => mouseInOut(e, elements, setInsideEle)
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  },[githubLinkRef, websiteLinkRef, backLinkRef, nextLinkRef])
  useEffect(() => {
    if (insideEle >= 0) setScale(1.3);
    else setScale(1);
  },[insideEle])
  return (
    <div className="relative pb-[10%] top-[50vh] w-lvw flex flex-col gap-[41px] justify-center items-center">
      <p className="w-full left-0 text-6xl text-white font-semibold text-center">
        {projectName}
      </p>
      <img src={`../../../ProjectCover/${filename}`} alt={projectName} className="w-[72vw] h-[84vh] object-cover" />
      <div className="w-[72vw] text-white flex flex-col gap-10">
        <p className="uppercase font-semibold">Description</p>
        <p className="text-2xl">
          {description}
        </p>
      </div>
      <div className="w-[72vw] flex justify-between text-white">
        <Link to={github} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111]" ref={githubLinkRef}>
          <p>Visit Github</p>
          <Github size={18} />
          <ArrowRight size={24} />
        </Link>
        <Link to={website} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111]" ref={websiteLinkRef}>
          <p>Visit Website</p>
          <Globe size={18} />
          <ArrowRight size={24} />
        </Link>
      </div>
      <hr className="w-[72vw] border-[0.5px] border-white" />
      <div className="w-[72vw] flex justify-between text-white uppercase">
        <div className="flex flex-col items-start gap-5">
          <p>Year :</p>
          <div>
            <Tag name={year}/>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <p>Technologies :</p>
          <div className="flex flex-wrap gap-3">
            {technologies.map((technology, i) => (
              <Tag key={i} name={technology} />
            ))}
          </div>
        </div>
      </div>
      <video src={`../../../ProjectCover/${filename}`} className="w-[72vw] h-[84vh] object-cover border-2 border-white rounded-2xl" autoPlay loop muted />
      <div className="w-[72vw] flex flex-col gap-10 justify-between text-white">
        <p className="uppercase font-semibold">Feedbacks</p>
        <div className="flex gap-2 flex-wrap">
          {feedbacks.map((feedback, i) => (
            <Tag key={i} name={feedback} />
          ))}
        </div>
        <input type="text" placeholder="Add Your Feedback" className="w-full py-2 px-2 border-[1px] border-white rounded-full bg-[#111111] text-white z-[10000]" />
      </div>
      <div className="w-[72vw] flex justify-between text-white">
        <Link to={projectIndex === 0 ? "/projects" : `/project/${MyProjects[projectIndex-1].link}`} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111]" ref={backLinkRef}>
          <ArrowLeft size={24} />
          <p> {projectIndex === 0 ? "Back to Projects" : "Previous Project"} </p>
        </Link>
        {
          projectIndex === MyProjects.length-1 ?
          null :
          <Link to={`/project/${MyProjects[projectIndex+1].link}`} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111]" ref={nextLinkRef}>
          <p> {"Next Project"} </p>
          <ArrowRight size={24} />
        </Link>}
      </div>
    </div>
  )
}