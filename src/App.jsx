import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import PokemonInfoPage from './pages/PokemonInfoPage/PokemonInfoPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/:name' element={<PokemonInfoPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
