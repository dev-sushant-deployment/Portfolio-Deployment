import { ArrowLeft, ArrowRight, Github, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Tag } from "../components/Tag";
import { mouseInOut } from "../../Helper";
import { useSlimeBall } from "../../Context/slimeBall";
import { MyProjects } from "../../Data/projects.json"
import { MediaNavigator } from "../components/MediaNavigator";
import { VideoPlayer } from "../components/VideoPlayer";
import { Helmet } from "react-helmet";

interface ProjectProps {}

export const Project : React.FC<ProjectProps> = ({}) => {
  const { name } = useParams<{name: string}>()
  const project = MyProjects.find(project => project.link === name);
  const projectIndex = MyProjects.findIndex(project => project.link === name);
  if (!project) return null;
  const { name : projectName, description, github, website, filename, demoVideo, year, technologies, link, noOfSS } = project;
  const { setScale }  = useSlimeBall()
  useEffect(() => {
    window.scrollTo(0,0);
  }, [name]);
  const githubLinkRef = useRef<HTMLAnchorElement>(null);
  const websiteLinkRef = useRef<HTMLAnchorElement>(null);
  const backLinkRef = useRef<HTMLAnchorElement>(null);
  const nextLinkRef = useRef<HTMLAnchorElement>(null);
  const lastWebsiteLinkRef = useRef<HTMLAnchorElement>(null);
  let elements = [
    {ref: githubLinkRef},
    {ref: websiteLinkRef},
    {ref: backLinkRef},
    {ref: nextLinkRef},
    {ref: lastWebsiteLinkRef}
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
      <Helmet>
        <title>Sushant Wayal | {projectName}</title>
        <meta name="description" content={description} />
      </Helmet>
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
      <div className="h-[100px] sm:h-auto w-[72vw] flex flex-col sm:flex-row justify-between items-center text-white">
        <Link to={github} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111]" ref={githubLinkRef}>
          <p>Visit Github</p>
          <Github size={18} />
          <ArrowRight size={24} />
        </Link>
        {website && <Link to={website} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111]" ref={websiteLinkRef}>
          <p>Visit Website</p>
          <Globe size={18} />
          <ArrowRight size={24} />
        </Link>}
      </div>
      <hr className="w-[72vw] border-[0.5px] border-white" />
      <div className="w-[72vw] flex flex-col sm:flex-row justify-start gap-8 sm:justify-between text-white uppercase">
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
      {demoVideo && <div className="flex flex-col gap-4">
        <p className="uppercase text-white text-center font-semibold text-lg"> Demo Video </p>
        <VideoPlayer src={`../../../DemoVideos/${demoVideo}`} className="w-[90vw] sm:w-[72vw] aspect-video object-cover border-2 border-white rounded-2xl" videoClassName="w-full h-full aspect-video object-cover rounded-2xl"/>
      </div>}
      <div className="flex flex-col gap-0">
        <p className="uppercase text-white text-center font-semibold text-lg"> Screen-shots </p>
        <MediaNavigator projectName={link} numberOfMedia={noOfSS} />
      </div>
      {website && <Link to={website} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111] text-white" ref={lastWebsiteLinkRef}>
        <p>Visit Website</p>
        <Globe size={18} />
        <ArrowRight size={24} />
      </Link>}
      <hr className="w-[72vw] border-[0.5px] border-white" />
      <div className="w-[90vw] sm:w-[72vw] flex justify-between text-white">
        <Link to={projectIndex === 0 ? "/projects" : `/project/${MyProjects[projectIndex-1].link}`} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111]" ref={backLinkRef}>
          <ArrowLeft size={24} />
          <p> {projectIndex === 0 ? "Back to Projects" : "Previous Project"} </p>
        </Link>
        {
          projectIndex === MyProjects.length-1 ?
          null :
          <Link to={`/project/${MyProjects[projectIndex+1].link}`} className="py-2 px-2 border-white border-[1px] rounded-full flex items-center gap-2 bg-[#111111]" ref={nextLinkRef}>
          <p> Next Project </p>
          <ArrowRight size={24} />
        </Link>}
      </div>
    </div>
  )
}