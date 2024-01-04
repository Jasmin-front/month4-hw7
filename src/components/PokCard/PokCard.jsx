import { useNavigate } from 'react-router-dom';

const PokCard = ({ pokeman }) => {
	const navigate = useNavigate();

	return (
		<div onClick={() => navigate(`/${pokeman.name}`)} style={{ width: 100, height: 'auto', border: '1px solid #fff' }}>
			<img src={pokeman.url} />
			<h3>{pokeman.name}</h3>
		</div>
	);
};

export default PokCard;
