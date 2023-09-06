import React, { useState, useEffect } from "react";
import { apiUrl, filterData } from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";
function App() {
  const [courses, setCourses] = useState(null);
  const[loading,setLoading]=useState(true);
  const[category,setCategory]=useState(filterData[0].title);
  async function fetchData() {
    setLoading(true);
    try {
      let res = await fetch(apiUrl);
      let data = await res.json();
      setCourses(data.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
    <div>
      <Navbar />
    </div>

    <div className="bg-bgDark2">
      <div>
        <Filter
          filterData={filterData}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
        {
          loading ? (
            <Spinner />
          ) : (
            <Cards courses={courses}  category={category}/>
          )
        }
      </div>
    </div>
  </div>
  );
}

export default App;
