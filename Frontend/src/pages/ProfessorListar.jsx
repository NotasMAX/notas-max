import React, { useEffect, useState } from 'react';
import { getProfessores } from '../api/usuariosapi';
import { useNavigate } from 'react-router-dom';
import Style from '../styles/ProfessorListar.module.css';
import Pagination from '../components/Pagination';
import { Toast } from 'primereact/toast';
import { useToast } from '../hooks/useToast';

export default function ProfessorListar() {
	const { toast } = useToast(); // Adiciona o hook para mostrar toast de redirect
	
	useEffect(() => {
		document.title = 'NotasMAX - Listar Professores';
	}, []);

	const [professores, setProfessores] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
	// Estados da paginação
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	useEffect(() => {
		let mounted = true;

		const fetchProfessores = async () => {
			try {
				const res = await getProfessores();
				console.log('Resposta da API:', res.data); // Debug
				// A API retorna um array direto, não um objeto com propriedade professores
				if (mounted) setProfessores(Array.isArray(res.data) ? res.data : []);
			} catch (err) {
				console.error('Erro ao buscar professores:', err);
				if (mounted) setError('Erro ao carregar professores.');
			} finally {
				if (mounted) setLoading(false);
			}
		};

		fetchProfessores();
		return () => { mounted = false; };
	}, []);

	const navigate = useNavigate();

	// Cálculos da paginação
	const totalPages = Math.ceil(professores.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentProfessores = professores.slice(startIndex, endIndex);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (loading) return <div className="p-4">Carregando professores...</div>;
	if (error) return <div className="p-4 text-red-600">{error}</div>;

	return (
		<div className={Style.pageContainer}>
			<Toast ref={toast} />
			<h2 className={Style.pageHeader}>Professor</h2>

			<div className={Style.headerContainer}>
				<a href="/Professores/Cadastrar" className={Style.linkCadastrar}>
					<svg className={Style.linkCadastrarIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
						<path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
					</svg>
					Cadastrar Novo Professor
				</a>
			</div>

			{professores.length === 0 ? (
				<p>Nenhum professor encontrado.</p>
			) : (
				<>
					<div className={Style.tableWrapper}>
						<table className={Style.table}>
							<thead>
								<tr className={Style.tableHeader}>
									<th className={Style.tableHeaderCell}>Nome</th>
									<th className={Style.tableHeaderCell}>E-mail</th>
									<th className={Style.tableHeaderCell}>Telefone</th>
									<th className={Style.tableHeaderCellAction}>Ação</th>
								</tr>
							</thead>
							<tbody>
								{currentProfessores.map((professor) => (
									<tr key={professor._id || professor.id} className={Style.tableRow}>
										<td className={Style.tableCell}>{professor.nome}</td>
										<td className={Style.tableCell}>{professor.email}</td>
										<td className={Style.tableCell}>{professor.telefone_contato}</td>
										<td className={Style.tableCellAction}>
											<div className={Style.actionButtons}>
												{/* Botão Visualizar */}
												<button
													className={Style.viewButton}
													onClick={() => navigate(`/Professores/Visualizar/${professor._id || professor.id}`)}
													aria-label="Visualizar professor"
												>
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
													</svg>
												</button>

												{/* Botão Editar */}
												<button
													className={Style.editButton}
													onClick={() => navigate(`/Professores/Editar/${professor._id || professor.id}`)}
													aria-label="Editar professor"
												>
													<svg className={Style.editIcon} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path fillRule="evenodd" clipRule="evenodd" d="M11.0834 6.33329C8.46006 6.33329 6.33341 8.45994 6.33341 11.0833V26.9166C6.33341 29.54 8.46006 31.6666 11.0834 31.6666H26.9167C29.5401 31.6666 31.6667 29.54 31.6667 26.9166V17.4166C31.6667 16.5422 32.3756 15.8333 33.2501 15.8333C34.1245 15.8333 34.8334 16.5422 34.8334 17.4166V26.9166C34.8334 31.2889 31.289 34.8333 26.9167 34.8333H11.0834C6.71116 34.8333 3.16675 31.2889 3.16675 26.9166V11.0833C3.16675 6.71104 6.71116 3.16663 11.0834 3.16663H20.5834C21.4579 3.16663 22.1667 3.87551 22.1667 4.74996C22.1667 5.62441 21.4579 6.33329 20.5834 6.33329H11.0834Z" />
														<path fillRule="evenodd" clipRule="evenodd" d="M30.3959 6.33329C30.0589 6.33329 29.7356 6.46719 29.4973 6.70552L17.0253 19.1775L16.4262 21.5739L18.8226 20.9748L31.2946 8.5028C31.5329 8.26447 31.6668 7.94122 31.6668 7.60416C31.6668 7.2671 31.5329 6.94385 31.2946 6.70552C31.0562 6.46719 30.733 6.33329 30.3959 6.33329ZM27.2581 4.46635C28.0903 3.63415 29.219 3.16663 30.3959 3.16663C31.5728 3.16663 32.7015 3.63415 33.5337 4.46635C34.3659 5.29855 34.8334 6.42725 34.8334 7.60416C34.8334 8.78107 34.3659 9.90977 33.5337 10.742L20.7516 23.5241C20.5487 23.727 20.2945 23.8709 20.0161 23.9405L14.6341 25.286C14.0946 25.4209 13.5238 25.2628 13.1305 24.8695C12.7373 24.4763 12.5792 23.9055 12.7141 23.3659L14.0595 17.984C14.1291 17.7056 14.2731 17.4514 14.476 17.2484L27.2581 4.46635Z" />
														<path fillRule="evenodd" clipRule="evenodd" d="M24.2137 8.38037C24.8321 7.76204 25.8346 7.76204 26.4529 8.38037L29.6196 11.547C30.2379 12.1654 30.2379 13.1679 29.6196 13.7862C29.0013 14.4045 27.9987 14.4045 27.3804 13.7862L24.2137 10.6195C23.5954 10.0012 23.5954 8.9987 24.2137 8.38037Z" />
													</svg>
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</>
			)}
		</div>
	);
}