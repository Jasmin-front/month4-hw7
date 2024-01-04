import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonInfoPage = () => {
	const param = useParams();
	const [data, setData] = useState({
		loading: false,
		data: {},
		error: null,
	});

	useEffect(() => {
		const getAllPokemons = async () => {
			setData(prev => ({ ...prev, loading: true }));
			try {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${param.name}`);
				setData(prev => {
					return { ...prev, data: response.data };
				});
			} catch (e) {
				setData(prev => ({ ...prev, error: e }));
			} finally {
				setData(prev => ({ ...prev, loading: false }));
			}
		};
		getAllPokemons();
	}, []);

	if (data.loading)
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
				<span className='loader'></span>
			</div>
		);

	console.log(data.data);
	return (
		<div>
			<h3>{data.data.name}</h3>
			<p>height:{data.data.height}</p>
			<p>base_experience:{data.data.base_experience}</p>
			<p>order:{data.data.order}</p>
			<img src={data.data.sprites?.front_default} />
		</div>
	);
};

export default PokemonInfoPage;
