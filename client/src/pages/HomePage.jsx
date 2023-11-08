import { useEffect } from "react"

function HomePage() {
  useEffect(() => { 
    document.title = "Home"
   },[])

  return (
    <div className="page-container">
      <h1 className="page-title">Home page</h1>
    </div>
  )
}

export default HomePage