import { createContext, useState, useMemo } from "react";
import PropTypes from 'prop-types';

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    const getSearchParams = () => {
        const params = new URLSearchParams(window.location.search);
        const tags = params.getAll('tag');

        return {
            name: params.get('name') ?? '',
            tag: tags.length > 0 ? tags : [],
        };
    };

    const [searchFilter, setSearchFilter] = useState(getSearchParams());


    const contextValue = useMemo(() => ({
        searchFilter,
        setSearchFilter
    }), [searchFilter]);

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
};

SearchContextProvider.propTypes = {
    children: PropTypes.node
};