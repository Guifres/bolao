import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Bolão Online</h1>
        <p>
          <input type="email" name="em" id="em" />
        </p>
        <p>
          <input type="password" name="ps" id="ps" />
        </p>
      </header>
      <section>
        <h1>Venha se divertir e Faturar com a gente!</h1>
        <div>
          <h2>Crie sua conta e divirta-se!</h2>
          <p>Nome completo:</p>
          <input type="text" name="nome" id="nome" />
          <p>E-mail</p>
          <input type="email" name="emc" id="emc" />
          <p>Senha:</p>
          <input type="password" name="psc" id="psc" />
          <p>Data de Nascimento</p>
          <input type="date" name="data" id="data" />
          <input type="button" value="Cadastrar" />
        </div>

      </section>
      <footer>
        <p>Criado por guifres</p>
      </footer>
    </>
  )
}

export default App
