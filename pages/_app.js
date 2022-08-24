import Context from '../src/Componets/Context'
import Navigation from '../src/Componets/Navigation'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <Navigation />
      <Component {...pageProps} />
    </Context>
  )
}

export default MyApp
