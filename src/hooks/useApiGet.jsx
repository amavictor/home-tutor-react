import {
    useEffect,
    useState,
    useCallback,
    useRef
} from "react";
import { DELAY_CONSTANTS, SEARCH_DATA } from "../utils";

/**
 * A hook to fetch data from an API and cache the result.
 * The hook will fetch the data when the component mounts and when the
 * `filter` object changes.
 * The hook will also cache the result of the API call and return the
 * cached data if the same `queryKey` and `filter` are provided.
 *
 * @param {any} queryKey - The key to use to cache the data. This can be an
 * array or object.
 * @param {Object} filter - The filter object to use to filter the data.
 * The filter object should have a `name` property and a `tag` property.
 * The `name` property should be a string and the `tag` property should be
 * an array of strings.
 * @param {Object} options - An object with options for the hook.
 * The options object can have the following properties:
 * - `enabled`: A boolean that determines whether the hook should fetch
 * the data or not. Defaults to `true`.
 *
 * @returns {Object} An object with the following properties:
 * - `data`: The data fetched from the API.
 * - `isLoading`: A boolean that indicates whether the hook is currently
 * loading the data or not.
 * - `isFetching`: A boolean that indicates whether the hook is currently
 * fetching the data or not.
 * - `isFetched`: A boolean that indicates whether the hook has finished
 * fetching the data or not.
 */
export const useApiGet = (queryKey, filter, options = {}) => {
    const { enabled = true } = options;
    const [data, setData] = useState([]);
    const [activityIndicator, setActivityIndicator] = useState({
        isLoading: true,
        isFetching: false,
        isFetched: false
    });

    const cache = useRef(new Map());
    const isMounted = useRef(false);

    /**
     * A function to filter the data based on the `filter` object.
     * The function will return a new array with the filtered data.
     *
     * @param {any} data - The data to filter.
     * @param {Object} filter - The filter object to use to filter the data.
     *
     * @returns {any} The filtered data.
     */
    const filterData = useCallback((data, filter) => {
        if (!filter ||
            (filter.name === '' && (!filter.tag || filter.tag.length === 0))) {
            return data;
        }

        const lowercaseName = filter.name.toLowerCase();
        const tags = Array.isArray(filter.tag) ? filter.tag : [filter.tag];

        return data.filter(item => {
            const nameMatch = filter.name === '' ||
                item.name.toLowerCase().includes(lowercaseName);
            const tagMatch = tags.length === 0 ||
                tags.some(tag =>
                    item.tags.some(itemTag =>
                        itemTag.toLowerCase() === tag.toLowerCase()
                    )
                );
            return nameMatch && tagMatch;
        });
    }, []);

    /**
     * A function to get the cache key for the data.
     * The function will return a string that can be used to cache the data.
     *
     * @param {any} queryKey - The key to use to cache the data.
     *
     * @returns {string} The cache key.
     */
    const getCacheKey = useCallback((queryKey) => {
        return JSON.stringify(queryKey);
    }, []);

    /**
     * A function to fetch the data from the API.
     * The function will set the `isLoading` and `isFetching` properties of
     * the `activityIndicator` state to `true` and `false` respectively.
     * The function will also set the `isFetched` property to `true` when
     * the data has been fetched.
     */
    const fetchData = useCallback(() => {
        if (!enabled) return;

        console.log(enabled, "enabled")
        const cacheKey = getCacheKey(queryKey);
        if (cache.current.has(cacheKey)) {
            setData(cache.current.get(cacheKey));
            setActivityIndicator({
                isLoading: false,
                isFetching: false,
                isFetched: true
            });
            return;
        }

        setActivityIndicator(prev => ({ ...prev, isFetching: true }));

        setTimeout(() => {
            const filteredData = filterData(SEARCH_DATA, filter);
            if (isMounted.current) {
                setData(filteredData);
                cache.current.set(cacheKey, filteredData);
                setActivityIndicator({
                    isLoading: false,
                    isFetching: false,
                    isFetched: true
                });
            }
        }, DELAY_CONSTANTS.API);
    }, [enabled, queryKey, filter, filterData, getCacheKey]);

    useEffect(() => {
        isMounted.current = true;
        if (enabled) {
            fetchData();
        }
        return () => {
            isMounted.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, filter]);

    const { isLoading, isFetching, isFetched } = activityIndicator;

    return { data, isLoading, isFetching, isFetched };
};