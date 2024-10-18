import { memo, useContext, useEffect } from "react"
import { FILTER_OPTIONS } from "../utils/data"
import { Typography } from "./typography"
import { PropTypes } from 'prop-types';
import { FilterIcon, RatingStar, Check } from "../assets";
import { SearchContext } from "../context";

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
/**
 * @description Update URL parameters with new tags
 * @param {string[]} tags array of tags to be added to the url
 * @returns {void}
 */
const updateURLParams = (tags) => {
    const url = new URL(window.location);
    url.searchParams.delete('tag');
    tags.forEach(tag => url.searchParams.append('tag', tag));
    window.history.pushState({}, '', url);
};

/**
 * @description Filter tag component
 * @prop {ReactNode} children tag name
 * @returns {ReactElement} Filter tag component
 */
const FilterTag = ({ children }) => {
    const { searchFilter, setSearchFilter } = useContext(SearchContext);
    const isSelected = searchFilter.tag.includes(children);
    const icon = checkStarAndVerified(children);
    const handleToggleTag = () => {
        setSearchFilter(prevFilter => {
            const updatedTags = isSelected
                ? prevFilter.tag.filter(tag => tag !== children)
                : [...prevFilter.tag, children];
            updateURLParams(updatedTags);
            return { ...prevFilter, tag: updatedTags };
        });
    }; 

    return (
<div
    onClick={handleToggleTag}
    className={`rounded-2xl flex items-center gap-2 gap-2w-fit px-3 py-1 transition-all cursor-pointer ${
        isSelected ? 'bg-black' : 'bg-gray hover:bg-black'
    } group`}
>
    <Typography
        fontWeight="medium"
        variant="p-m"
        className={`transition-all ${
            isSelected ? 'text-white' : 'text-black group-hover:text-white'
        } mlg:text-xs`}
    >
        {children}
    </Typography>
    <div>{icon}</div>
</div>
    );
};

/**
 * @description Filter component
 * @returns {ReactElement} Filter component
 */
const GFilter = () => {
    const { setSearchFilter } = useContext(SearchContext);

    useEffect(() => {
        const url = new URL(window.location);
        const tags = url.searchParams.getAll('tag');
        setSearchFilter(prevFilter => ({ ...prevFilter, tag: tags }));

        const handlePopState = () => {
            const newUrl = new URL(window.location);
            const newTags = newUrl.searchParams.getAll('tag');
            setSearchFilter(prevFilter => ({ ...prevFilter, tag: newTags }));
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [setSearchFilter]);

    return (
        <div className="w-full rounded-custom-sm-12 p-[2rem] bg-white">
            <section className="flex items-center justify-between mb-5">
                <Typography fontWeight="black">Filter</Typography>
                <FilterIcon />
            </section>
            <section className="flex items-center gap-3 w-full flex-wrap">
                {FILTER_OPTIONS?.map((option, index) => (
                    <FilterTag key={index}>{option}</FilterTag>
                ))}
            </section>
        </div>
    );
};

/**
 * @description Filter component with memo
 * @returns {ReactElement} Filter component with memo
 */
export const Filter = memo(GFilter);

FilterTag.propTypes = {
    children: PropTypes.node.isRequired
};
