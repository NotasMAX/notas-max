import React, { useRef, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { Toast } from 'primereact/toast';
import { useLocation } from 'react-router-dom';

export default function LoginPage() {
  const toast = useRef(null);
  const location = useLocation();
  const toastShown = useRef(false);

  useEffect(() => {
    if (location.state && !toastShown.current) {
      const { message, type } = location.state;
      if (message && type) {
        if (toast && toast.current) {
          toast.current.show({ severity: type, summary: 'Informação', detail: message, life: 8000 });
          toastShown.current = true;
        }
      }
      window.history.replaceState({}, '')
    }
  }, [location.state]);

  return (
    <div>
      <Toast ref={toast} />
      <LoginForm />;
    </div>)
}
