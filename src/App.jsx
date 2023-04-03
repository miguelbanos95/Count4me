import { useEffect, useState } from 'react'
import './App.css'
import cerveza from './assets/images/cerveza.png'
import { useBloodAlcohol } from './hooks/useBloodAlcohol'
// import { getAge } from './logic/parseDate'
import { useAge } from './hooks/useAge'
// import users from './mocks/users.json'
import { getRandomUser } from './services/randomUsers'
// import { saveBeersToStorage, resetGameStorage } from './logic/storage'

function App () {
  const [count, setCount] = useState(0)
  const [randomUser, setRandomUser] = useState([])
  const { getAlcoholemicRate } = useBloodAlcohol({ randomUser, count })
  const { getAge, age } = useAge({ randomUser })

  useEffect(() => {
    setRandomUser(getRandomUser)
  }, [])

  /* ----------------------------------------------------------------------------------------- */
  // Pasar cm a m
  const heightInMeters = () => {
    const newHeight = randomUser.height / 100
    return newHeight
  }
  /* ----------------------------------------------------------------------------------------- */
  // Añadir/Quitar consumiciones
  const handleOnClick = () => {
    setCount((count) => count + 1)
  }
  const handleOnRest = () => {
    if (count === 0) return
    setCount((count) => count - 1)
  }
  /* ----------------------------------------------------------------------------------------- */
  // Cerrar la cuenta
  const handleOnCose = () => {
    setCount(0)
  }
  return (
    <div className='App'>
      <header>
        <h1 className='title'>Count 4Me </h1>
      </header>
      <main>
        <div className='appBody'>
          <section>
            <div>
              <img id='mainBeer' src={cerveza} alt='beer' />
            </div>
            <div className='btn-main'>
              <div className={count ? 'mn-counter show' : 'mn-counter'}>{count}</div>
              <div>
                <button className='btn-main-add' onClick={handleOnClick}>AÑADIR</button>
              </div>
              <div>
                <button className='btn-main-close' onClick={handleOnRest}>¿Te equivocaste?</button>
              </div>
            </div>
          </section>
          <section>
            {randomUser && (
              <div className='mn-stadts'>
                <h2>Estadísticas</h2>
                <h4>Nombre: {randomUser.first_name} {randomUser.last_name}</h4>
                <h4>Edad: {getAge(age)}</h4>
                <h4>Altura: {heightInMeters(randomUser.height)} m</h4>
                <h4>Peso: {randomUser.weight} kg</h4>
                <h4>Género: {randomUser.gender}</h4>
                <div>
                  <h3>Record: </h3>
                  <h3>Tasa de alcoholemia (g/l): <br />{getAlcoholemicRate}</h3>
                </div>
              </div>
            )}
            <button className='btn-main-close close-count' onClick={handleOnCose}>Cerrar Cuenta</button>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
