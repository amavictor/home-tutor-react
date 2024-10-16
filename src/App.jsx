import { lazy, Suspense } from "react"
import { SearchLayout } from "./layouts"

function App() {

  const SearchScreen = lazy(() => import('./screens/searchScreen'))
  return (
    <Suspense fallback={null}>
      <SearchLayout>
        <SearchScreen />
      </SearchLayout>
    </Suspense>
  )
}

export default App
