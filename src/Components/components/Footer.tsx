interface FooterProps {}

export const Footer : React.FC<FooterProps> = ({}) => {
  return (
    <div className="w-full h-20 bg-black flex justify-center items-center text-white">
      <p className="text-2xl">© 2024 Sushant Wayal</p>
    </div>
  )
}