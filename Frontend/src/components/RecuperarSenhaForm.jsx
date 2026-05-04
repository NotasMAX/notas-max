import { useState } from "react";
import styles from "../styles/Login.module.css";

export default function RecuperarSenhaFormm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {
    email: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setMensagem("Por favor, insira seu e-mail institucional.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Informe o E-mail institucional</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={styles.input}
        placeholder="exemplo@email.com"
        required
      />
      <button type="submit" className={styles.button}>
        Enviar Link 
      </button>
    </form>
  );
}
