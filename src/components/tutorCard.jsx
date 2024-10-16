import { memo } from "react";
import { Typography } from ".";
import { PropTypes } from 'prop-types';
import { GreenStar, PinkStar, RatingStar, Check } from "../assets";

const checkStarAndVerified = (text) => {
  const parsedNumber = parseFloat(text);

  if (!isNaN(parsedNumber)) {
    return <RatingStar />;
  }

  if (text === 'Verified') {
    return <Check />;
  }

  return null;
};
const FilterTag = ({
  children
}) => {
  const icon = checkStarAndVerified(children)

  return (
    <div className="bg-gray  flex items-center gap-1 rounded-2xl w-fit px-3 py-1" >
      <Typography
        fontWeight="medium"
        variant="p-s"
        className={"text-black text-nowrap"}
      >
        {children}
      </Typography>

      <div>{icon}</div>
    </div>
  )
}

const Tutor = ({ tags, name, image, description }) => {
  return (
    <div className="w-full h-[26.4rem] m2xl:h-[20rem] mlg:h-[16rem] mxxxs:mb-40 flex flex-col mb-6 m2xl:mb-20 mlg:mb-56 cursor-pointer transition-all duration-300">
      <div className="w-full flex-grow bg-gray rounded-custom-sm-12 p-1">
        <div className="w-full h-full bg-purple rounded-custom-sm-12 relative group overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-custom-sm-12 transition-transform duration-300 group-hover:scale-110"
            src={image}
            alt="Tutor"
          />
          <GreenStar className="absolute top-3 left-3 transition-all duration-1500 ease-in-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-12" />
          <PinkStar className="absolute bottom-20 right-10 transition-all duration-1000 ease-in-out group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:-rotate-12" />
          <GreenStar className="absolute bottom-3 right-3 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-6" />
          <PinkStar className="absolute bottom-3 left-6 transition-all duration-700 ease-in-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:-rotate-6" />
        </div>
      </div>
      <div className="mt-2">
        <div className="flex w-full items-center gap-3 mb-2 overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {
            tags?.map((tag, index) => {
              return (
                <FilterTag
                  key={index}
                >
                  {tag}
                </FilterTag>
              )
            })
          }
        </div>

        <div>
          <Typography fontWeight="black" variant="h-s" className="mb-1">
            {name}
          </Typography>

          <Typography
            fontWeight="light"
            className={" leading-5"}
          >
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const TutorCard = memo(Tutor);


FilterTag.propTypes = {
  children: PropTypes.node
}


Tutor.propTypes = {
  tags: PropTypes.array,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
}