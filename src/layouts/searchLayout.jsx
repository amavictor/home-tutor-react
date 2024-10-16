import { memo } from "react"
import { Filter, Navbar, Search } from "../components"
import PropTypes from "prop-types"


const Layout = ({ children }) => {
    return (
        <main className="w-full h-auto">
            <Navbar />
            <section className="w-full flex justify-between mt-14 gap-10 mmd:flex-col">
                <aside className="w-[20%] mlg:w-[18%] mmd:w-full transition-all duration-300">
                    <Filter />
                </aside>
                <section className="w-full max-w-[80%] mlg:max-w-full">
                    <Search />
                    <div className="mt-5 h-[75vh] mmd:pb-10">
                        {children}
                    </div>
                </section>
            </section>
        </main>
    )
}

export const SearchLayout = memo(Layout)

Layout.propTypes = {
    children: PropTypes.node
}