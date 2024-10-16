import { useContext } from "react"
import { LineLoader, TutorCard } from "../components"
import { SearchContext } from "../context"
import { useApiGet } from "../hooks"

const Search = () => {
    const { searchFilter } = useContext(SearchContext)

    const { data, isLoading, isFetching } = useApiGet(
        ['search', { searchFilter }],
        searchFilter,
        {
            enabled: !!searchFilter
        }
    )

    return (
        <div className="w-full bg-white p-6 rounded-3xl h-full">
            <div className="w-full overflow-y-auto h-[99%]">
                <div className="w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mlg:gap-2 mmd:gap-4 gap-4 transition-all duration-300">
                    {
                        data?.map((item, index) =>
                            <div key={index}>
                                <TutorCard
                                    tags={item.tags}
                                    name={item.name}
                                    description={item.description}
                                    image={item.image}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            <LineLoader 
                loading={isLoading || isFetching}
             />
        </div>
    )

}


export default Search