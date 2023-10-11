import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"


export const Rating = ({value,text}) => {
  return (
    <div className="rating flex items-center">
        <span className="text-[gold]">
            {value>=1? <FaStar/>: value>=0.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span className="text-[gold]">
            {value>=2? <FaStar/>: value>=1.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span className="text-[gold]">
            {value>=3? <FaStar/>: value>=2.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span className="text-[gold]">
            {value>=4? <FaStar/>: value>=3.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span className="text-[gold]">
            {value>=5? <FaStar/>: value>=4.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span className="ml-2">
            {text && text}
        </span>
    </div>
  )
}
