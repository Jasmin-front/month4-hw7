import axios from 'axios';
import { useEffect, useState } from 'react';
import PokCard from '../../components/PokCard/PokCard';
import Pagination from '../../components/Pagination/Pagination';

const MainPage = () => {
	const [data, setData] = useState({
		data: [],
		loading: false,
		error: null,
	});

	const [pageData, setPageData] = useState({
		currentPage: 1,
		itemsPerPage: 20,
		totalItems: 100,
	});

	const onPageChanged = pageNumber => {
		setPageData(prev => ({ ...prev, currentPage: pageNumber }));
	};

	useEffect(() => {
		const getAllPokemons = async () => {
			setData(prev => ({ ...prev, loading: true }));
			const offset = pageData.currentPage * 20;
			try {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
				setPageData(prev => ({ ...prev, totalItems: response.data.count }));
				const newArr = await Promise.all(
					response.data.results.map(async el => {
						const respPok = await axios.get(el.url);
						return { url: respPok.data.sprites.front_default, name: respPok.data.name };
						console.log(response)
					})
				);

				setData(prev => {
					return { ...prev, data: newArr };
				});
			} catch (e) {
				setData(prev => ({ ...prev, error: e }));
			} finally {
				setData(prev => ({ ...prev, loading: false }));
			}
		};
		getAllPokemons();
	}, [pageData.currentPage]);

	if (data.loading)
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
				<span className='loader'></span>
			</div>
		);

	return (
		<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, flexDirection: 'column' }}>
			<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
				{data.data?.map(pokeman => (
					<PokCard pokeman={pokeman} key={pokeman.name} />
				))}
			</div>
			<Pagination
				currentPage={pageData.currentPage}
				totalItems={pageData.totalItems}
				itemsPerPage={pageData.itemsPerPage}
				onPageChanged={onPageChanged}
			/>
		</div>
	);
};

export default MainPage;
