import React from 'react';
import Style from '../styles/Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            // Se tiver poucas páginas, mostra todas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Lógica para mostrar páginas com "..."
            if (currentPage <= 3) {
                // Início: 1 2 3 4 5 ... última
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Final: 1 ... antepenúltima penúltima última
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Meio: 1 ... atual-1 atual atual+1 ... última
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={Style.paginationContainer}>
            <button
                className={Style.paginationButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
                </svg>
                Anterior
            </button>

            <div className={Style.pageNumbers}>
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className={Style.ellipsis}>...</span>
                    ) : (
                        <button
                            key={page}
                            className={`${Style.pageNumber} ${currentPage === page ? Style.active : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                className={Style.paginationButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próxima
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
                </svg>
            </button>
        </div>
    );
}