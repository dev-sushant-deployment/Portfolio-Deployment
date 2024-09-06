interface TagProps {
  name: string;
}

export const Tag: React.FC<TagProps> = ({name}) => {
  return (
    <p className="py-1 px-2 border-white text-center border-[1px] rounded-full bg-[#111111] text-white uppercase text-sm">
      {name}
    </p>
  );
};