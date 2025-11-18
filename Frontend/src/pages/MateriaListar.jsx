import React, { useEffect, useState } from 'react';
import { listarMaterias } from '../api/materiaApi';
import { useNavigate } from 'react-router-dom';
import Style from '../styles/MateriaListar.module.css';

export default function MateriaListar() {
	useEffect(() => {
		document.title = 'NotasMAX - Listar Matérias';
	}, []);

	const [materias, setMaterias] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;

		const fetchMaterias = async () => {
			try {
				const res = await listarMaterias();
				if (mounted) setMaterias(res.data.materias || []);
			} catch (err) {
				console.error('Erro ao buscar matérias:', err);
				if (mounted) setError('Erro ao carregar matérias.');
			} finally {
				if (mounted) setLoading(false);
			}
		};

		fetchMaterias();
		return () => { mounted = false; };
	}, []);

	const navigate = useNavigate();

	if (loading) return <div className="p-4">Carregando matérias...</div>;
	if (error) return <div className="p-4 text-red-600">{error}</div>;

	return (
		<div className="p-4 bg-white">
			<h2 className={Style.MateriaListarHeader}>Matérias</h2>

			<div className={Style.MateriaListarContainer}>
							<a href="/Materias/Cadastrar" className={Style.LinkCadastrar}>
								<svg className={Style.LinkCadastrarIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
									<path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
								</svg>
								Cadastrar Nova Matéria
							</a>
			</div>

			{materias.length === 0 ? (
				<p>Nenhuma matéria encontrada.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full border-collapse">
						<thead>
							<tr className="text-left">
								<th className="px-3 py-2">Descritivo</th>
								<th className="px-3 py-2">Criado em</th>
								<th className="px-3 py-2">Ações</th>
							</tr>
						</thead>
						<tbody>
							{materias.map((m) => (
								<tr key={m._id || m.id} className="border-t">
									<td className="px-3 py-2">{m.nome}</td>
									<td className="px-3 py-2">{m.createdAt ? new Date(m.createdAt).toLocaleString() : '-'}</td>
									<td className="px-3 py-2">
										<button
											className="bg-blue-600 text-white px-3 py-1 rounded"
											onClick={() => navigate(`/Materias/Editar/${m._id || m.id}`)}
										>
											Editar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

