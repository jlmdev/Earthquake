import React, { useEffect, useState } from 'react'
import './custom.scss'
import ReactMapGL, { NavigationControl } from 'react-map-gl'

export function App() {
  const [viewport, setViewport] = useState({
    width: 500,
    height: 400,
    latitude: 27.77,
    longitude: -82.66,
    zoom: 9.8,
  })

  

  useEffect(() => {
    async function loadEarthquakes() {
      const url = ('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson')
      const response = await fetch(url)
      const json = await response.json()
      console.log(json)
    }
    loadEarthquakes()
    
  }, [])

  return (
    <>
      <header>
        <div className="d-flex justify-content-center display-2 hero-text">Earthquake!</div>
      </header>
      <main>
        <section className="list">
          <div>List</div>
        </section>
        <section className="map">
          <ReactMapGL
            style={{ position: 'absolute' }}
            {...viewport}
            onViewportChange={setViewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
              <div style={{ position: 'absolute', right: 0 }}>
                <NavigationControl />
              </div>
            </ReactMapGL>
        </section>
      </main>
    </>
  )
}
