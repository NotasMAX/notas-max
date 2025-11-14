import React, { useEffect, useState } from 'react';
import { listarMaterias } from '../api/materiaApi';
import { useNavigate } from 'react-router-dom';

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
				if (mounted) setMaterias(res.data || []);
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
			<h2 className="mb-4">Matérias Cadastradas</h2>

			<div className="mb-4">
				<button
					className="bg-green-600 text-white px-4 py-2 rounded"
					onClick={() => navigate('/Materias/Cadastrar')}
				>
					Cadastrar nova Matéria
				</button>
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

