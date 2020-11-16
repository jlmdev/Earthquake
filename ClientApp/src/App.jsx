import React, { useEffect, useState } from 'react'
import './custom.scss'
import ReactMapGL, { NavigationControl } from 'react-map-gl'

export function App() {
  const [viewport, setViewport] = useState({
    width: 500,
    height: 400,
    latitude: 0,
    longitude: 0,
    zoom: 0,
  })

  const [earthquakes, setEarthquakes] = useState([])

  useEffect(() => {
    async function loadEarthquakes() {
      const url = ('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson')
      const response = await fetch(url)
      const json = await response.json()
      setEarthquakes(json.features)
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
          <ul>
            {earthquakes.map((earthquake) => (
              <li key={earthquake.id}>{earthquake.properties.place}</li>
            ))}
          </ul>
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
