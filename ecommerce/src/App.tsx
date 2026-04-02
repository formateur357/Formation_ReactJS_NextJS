import './App.css'
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <div>
      <header className='app-header'>
        <div>
          <h1>Mini e-commerce</h1>
          <p>Catalogue, panier, theme et persistance avec Zustand.</p>
        </div>

        <ThemeToggle />
      </header>

      <main className="layout">
        <ProductList />
        <Cart />
      </main>

    </div>
  )
}
