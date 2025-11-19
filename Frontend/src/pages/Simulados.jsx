import React, { useEffect, useState, useRef, use } from 'react';
import { useParams, useNavigate, useLocation, replace } from 'react-router-dom';
import Style from '../styles/Simulados.module.css';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import SimuladosPesquisarForm from '../components/SimuladoPesquisarForm';
import { findSimuladoByBimestreAnoSerie } from '../api/simuladoApi';
import SimuladosItem from '../components/SimuladosItem';


export default function Simulados() {
    const {
        bimestre: bimestreURL,
        ano: anoURL,
        serie: serieURL,
    } = useParams();
    const [Simulados, setSimulados] = useState([]);
    let firstLoad = true;
    const toast = useRef(null);
    const toastShown = useRef(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = `NotasMAX - Simulados`;

        if (firstLoad) {
            firstLoad = false;
            if (!bimestreURL && !serieURL && !anoURL) {
                const month = new Date().getMonth() + 1;
                let currentBimestre;
                let currentAno = new Date().getFullYear();
                if (month >= 2 && month <= 4) {
                    currentBimestre = 1;
                } else if (month >= 5 && month <= 7) {
                    currentBimestre = 2;
                } else if (month >= 8 && month <= 10) {
                    currentBimestre = 3;
                } else {
                    currentBimestre = 4;
                }
                navigate(`/Simulados/${currentBimestre}/${currentAno}`, { replace: true });
            }
        }

        if (location.state && !toastShown.current) {
            const { message, type } = location.state;
            if (message && type === 'success') {
                if (toast && toast.current) {
                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: message, life: 3000 });
                    toastShown.current = true;
                }
            }
            window.history.replaceState({}, '')
        }
    }, []);

    useEffect(() => {
        document.title = `NotasMAX - Simulados -` + (serieURL ? ` ${serieURL}º EM` : '') + ` - ${bimestreURL}º Bimestre ${anoURL}`;
        fetchSimulados();
    }, [bimestreURL, anoURL, serieURL]);

    const fetchSimulados = async () => {
        try {
            findSimuladoByBimestreAnoSerie(bimestreURL, anoURL, serieURL).then((response) => {
                const data = response.data;
                setSimulados(data.simulados || []);
            });
        } catch (error) {
            console.error("Erro ao buscar simulados:", error);
        }
    }

    return (
        <div>
            <Toast ref={toast} />
            <h2 className={Style.SimuladosHeader}>Simulados</h2>
            <p className={Style.SimuladosAlert}>A alteração dos simulados pode ser feita até 15 dias após a sua realização.</p>
            <div className={Style.SimuladosContainer}>
                <a href="/Simulados/Cadastrar" className={Style.LinkCadastrar}>
                    <svg className={Style.LinkCadastrarIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
                    </svg>
                    Cadastrar Novo Simulado
                </a>
                <SimuladosPesquisarForm initialData={{
                    ano: anoURL ? parseInt(anoURL) : 0,
                    serie: serieURL ? parseInt(serieURL) : 0,
                    bimestre: bimestreURL ? parseInt(bimestreURL) : 0,
                }} />
            </div>
            <div className={Style.SimuladoContainer}>
                <div className={Style.ContainerHeader}>
                    <div className={Style.ContainerCol}>
                        Turma
                    </div>
                    <div className={Style.ContainerCol}>
                        Simulado
                    </div>
                    <div className={Style.ContainerCol}>
                        Tipo
                    </div>
                    <div className={Style.ContainerCol}>
                        Data Realização
                    </div>
                    <div className={Style.ContainerColAcoes}>
                    </div>
                </div>
                {Simulados.length === 0 && (
                    <div className={Style.ContainerEmpty}>
                        Nenhum simulado encontrado.
                    </div>
                )}
                {Simulados.map((simulado) => (
                    <SimuladosItem key={simulado._id} simulado={simulado} />
                ))}
            </div>
        </div>
    );
}