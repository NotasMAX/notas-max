import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from "./components/Layout";
import Turmas from "./pages/Turmas";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import TurmasEditar from "./pages/TurmasEditar";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import RecuperarSenha from "./pages/RecuperarSenha";
import ResetSenha from "./pages/ResetSenha";
import MateriaCadastrar from "./pages/MateriaCadastrar";
import MateriaListar from "./pages/MateriaListar";
import MateriaEditar from "./pages/MateriaEditar";
import Simulados from "./pages/Simulados";
import TurmasSimulados from "./pages/TurmasSimulados";
<<<<<<< HEAD
import SimuladosAlunosList from "./pages/SimuladosAlunosList";
import SimuladoNotasPorMateria from "./pages/SimuladoNotasPorMateria";
import SimuladoNotasPorSimulado from "./pages/SimuladoNotasPorSimulado";
=======
import SimuladosCadastrar from "./pages/SimuladosCadastrar";
import SimuladosEditar from "./pages/SimuladosEditar";
import NotFound from "./pages/NotFound";
>>>>>>> origin/main

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user && user.tipo_usuario !== 'administrador') return <div>Acesso negado.</div>;
  return children;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (user) return <Navigate to="/" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>

      <Route path="/reset-senha" element={
        <GuestRoute>
          <ResetSenha />
        </GuestRoute>
      } />

      <Route path="/Login" element={
        <GuestRoute>
          <Login />
        </GuestRoute>
      } />

      <Route path="/Home" element={
        <AdminRoute>
          <Layout>
            <Home />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/" element={
        <AdminRoute>
          <Layout>
            <Home />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/recuperar-senha" element={
        <GuestRoute>
          <RecuperarSenha />
        </GuestRoute>
      } />

      <Route path="Turmas/Cadastrar" element={
        <AdminRoute>
          <Layout>
            <TurmasCadastrar />
          </Layout>
        </AdminRoute>
      } />

      <Route path="Turmas/" element={
        <AdminRoute>
          <Layout>
            <Turmas />
          </Layout>
        </AdminRoute>
      } />

      <Route path="Turmas/:ano" element={
        <AdminRoute>
          <Layout>
            <Turmas />
          </Layout>
        </AdminRoute>
      } />

      <Route path="Turma/Editar/:id" element={
        <AdminRoute>
          <Layout>
            <TurmasEditar />
          </Layout>
        </AdminRoute>
      } />

      <Route path="Turmas/Simulado/:id" element={
        <Layout>
          <TurmasSimulados />
        </Layout>
      } />
      
      <Route path="Turma/:id" element={
        <AdminRoute>
          <Layout>
            <TurmasSimulados />
          </Layout>
        </AdminRoute>
      } />

      <Route path="Turmas/Simulado/Aluno/:id" element={
        <Layout>
          <SimuladosAlunosList />
        </Layout>
      } />

      <Route path="/Simulados" element={
        <AdminRoute>
          <Layout>
            <Simulados />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/Simulados/:bimestre/:ano/:serie?" element={
        <AdminRoute>
          <Layout>
            <Simulados />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/Simulados/Cadastrar" element={
        <AdminRoute>
          <Layout>
            <SimuladosCadastrar />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/Simulado/Editar/:id" element={
        <AdminRoute>
          <Layout>
            <SimuladosEditar />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/Simulados/Notas/:simuladoId/:alunoId" element={
        <Layout>
          <SimuladoNotasPorSimulado />
        </Layout>
      } />

      <Route path="/Simulados/Notas/Materia/:simuladoId/:alunoId" element={
        <Layout>
          <SimuladoNotasPorMateria />
        </Layout>
      } />

      <Route path="/Materias/Cadastrar" element={
        <AdminRoute>
          <Layout>
            <MateriaCadastrar />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/Materias" element={
        <AdminRoute>
          <Layout>
            <MateriaListar />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/Materias/Editar/:id" element={
        <AdminRoute>
          <Layout>
            <MateriaEditar />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/404" element={
        <NotFound />
      } />

      <Route path="*" element={
        <Navigate to="/404" replace />
      } />

    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;