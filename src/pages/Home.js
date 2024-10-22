import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// components
import SmoothieCard from '../components/SmoothieCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        console.log(data); 
      
      if (error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
      setLoading(false) // Set loading to false after data is fetched
    }

    fetchSmoothies()

  }, [])

  return (
    <div className="page home">
      {/* Loading message */}
      {loading && <p>Loading smoothies...</p>}

      {/* Error message */}
      {fetchError && (<p>{fetchError}</p>)}

      {/* No smoothies fallback */}
      {!loading && smoothies?.length === 0 && !fetchError && (
        <p>No smoothies available.</p>
      )}

      {/* Smoothie grid */}
      {smoothies && smoothies.length > 0 && (
        <div className="smoothies">
          {/* Order-by buttons (if you have any) */}
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home