
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user } = useAuth();

    useEffect(() => {
        document.title = 'NotasMAX - Página Inicial';
    }, []);

    return (
        <div>
            <h2 className='font-inter font-bold text-[2rem]'>Olá, {user?.nome} 👋</h2>
            <p className='font-inter font-medium text-[1.2rem] text-[#5B5B5B]'>Seja bem-vindo(a) de volta!</p>
        </div>
    );
}