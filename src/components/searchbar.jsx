import {
    memo,
    useContext,
    useState,
    useCallback
} from "react"
import { InputField } from "./inputField"
import { Typography } from './typography';
import { PropTypes } from 'prop-types';
import { SearchIcon, RatingStar, Check } from "../assets";
import { SearchContext } from "../context";


/**
 * @description Function to generate a tag with a star or a checkmark depending
 * on the content of the tag.
 * @param {string} text - The text content of the tag.
 * @returns {ReactElement} A ReactElement with the tag and the icon.
 */
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
 * @description Filter tag component
 * @prop {ReactNode} children - The tag name
 * @returns {ReactElement} Filter tag component
 */
const FilterTag = ({
    children
}) => {

    const icon = checkStarAndVerified(children)
    return (
        <div className="bg-white rounded-2xl w-fit px-3 py-1 flex items-center gap-2">
            <Typography
                fontWeight="medium"
                variant="p-m"
                className={"text-black"}
            >
                {children}
            </Typography>
            <div>{icon}</div>
        </div>
    )
}

/**
 * @description Search component
 * @returns {ReactElement} Search component
 */
const SearchComponent = () => {
    const { searchFilter, setSearchFilter } = useContext(SearchContext);
    const [searchTerm, setSearchTerm] = useState(searchFilter.name || '');

    /**
     * @description Function to update the URL params with the search term.
     * @param {string} name - The search term.
     */
    const updateURLParams = useCallback((name) => {
        const url = new URL(window.location);
        url.searchParams.set('name', name.toLowerCase());
        window.history.pushState({}, '', url.toString());
    }, []);

    /**
     * @description Function to handle search.
     * @param {string} value - The search term.
     */
    const handleSearch = useCallback((value) => {
        setSearchFilter((prevFilter) => ({
            ...prevFilter,
            name: value
        }));
        updateURLParams(value);
    }, [setSearchFilter, updateURLParams]);

    /**
     * @description Function to handle form submission.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        handleSearch(searchTerm);
    }, [handleSearch, searchTerm]);

    /**
     * @description Function to handle input change.
     * @param {Event} e - The input change event.
     */
    const handleInputChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <InputField
                    placeholder="Search tutors"
                    icon={<SearchIcon />}
                    onChange={handleInputChange}
                    value={searchTerm}
                />
            </form>

            <div className="w-full mt-4 flex items-center gap-3 flex-wrap">
                {searchFilter?.tag?.map((item, index) => (
                    <FilterTag key={index}>{item}</FilterTag>
                ))}
            </div>
        </div>
    );
}


export const Search = memo(SearchComponent)

FilterTag.propTypes = {
    children: PropTypes.node
}