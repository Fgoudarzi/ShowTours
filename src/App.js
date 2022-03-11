import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'


function App() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false)
      setData(tours)
    }
    catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  useEffect(() => { fetchTours() }, [])

  const removeTour = (id) => {
    const newTours = data.filter(i => i.id !== id)
    setData(newTours)
  }

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (data.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button onClick={fetchTours} className='btn'>Refresh</button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={data} removeTour={removeTour} />
    </main>
  )
}

export default App
