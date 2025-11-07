
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {

    useEffect(() => {
        document.title = 'NotasMAX - Página Inicial';
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            <h2>Bem-vindo à Página Inicial</h2>
            <a href="/Turmas/Cadastrar">Cadastrar Turma</a>

        </div>
    );
}