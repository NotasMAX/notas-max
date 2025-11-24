import { useRef } from 'react';

export const useToast = () => {
    const toast = useRef(null);

    const showSuccess = (message = 'Operação realizada com sucesso!') => {
        toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: message,
            life: 3000
        });
    };

    const showError = (message = 'Erro ao realizar operação.') => {
        toast.current?.show({
            severity: 'error',
            summary: 'Erro',
            detail: message,
            life: 3000
        });
    };

    const showInfo = (message) => {
        toast.current?.show({
            severity: 'info',
            summary: 'Informação',
            detail: message,
            life: 3000
        });
    };

    const showWarn = (message) => {
        toast.current?.show({
            severity: 'warn',
            summary: 'Atenção',
            detail: message,
            life: 3000
        });
    };

    return { toast, showSuccess, showError, showInfo, showWarn };
};