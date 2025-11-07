import React from 'react'
import { NavLink } from 'react-router-dom';
import Style from "../src/styles/Navigation.module.css";

export default function Navigation({ }) {
    return (
        <nav className={Style.nav}>
            <NavLink className={({ isActive }) => isActive ? Style.navLinkActive : Style.navLink}
                to="/">
                <svg className={Style.navIconFill} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path d="M10.55 2.532a2.25 2.25 0 0 1 2.9 0l6.75 5.692c.507.428.8 1.057.8 1.72v9.31a1.75 1.75 0 0 1-1.75 1.75h-3.5a1.75 1.75 0 0 1-1.75-1.75v-5.007a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25v5.007a1.75 1.75 0 0 1-1.75 1.75h-3.5A1.75 1.75 0 0 1 3 19.254v-9.31c0-.663.293-1.292.8-1.72l6.75-5.692Zm1.933 1.147a.75.75 0 0 0-.966 0L4.767 9.37a.75.75 0 0 0-.267.573v9.31c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-5.007c0-.967.784-1.75 1.75-1.75h3.5c.966 0 1.75.783 1.75 1.75v5.007c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-9.31a.75.75 0 0 0-.267-.573l-6.75-5.692Z" /></svg>
                <div className={Style.navLinkText}>
                    Inicial
                </div>
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? Style.navLinkActive : Style.navLink} to="/Turmas">
                <svg className={Style.navIconFill} width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M5 8.9c1.44 0 2.68.252 3.575.855C9.502 10.38 10 11.343 10 12.6a.501.501 0 0 1-1 0c0-.958-.358-1.596-.983-2.017C7.359 10.141 6.35 9.9 5 9.9s-2.36.241-3.017.684C1.358 11.005 1 11.643 1 12.601a.501.501 0 0 1-1 0c0-1.258.497-2.221 1.424-2.846C2.319 9.152 3.56 8.9 5 8.9m4.975 0c1.439 0 2.68.252 3.575.855c.927.625 1.425 1.588 1.425 2.846a.5.5 0 0 1-1 0c0-.958-.358-1.596-.984-2.017c-.518-.349-1.253-.57-2.202-.65a4.5 4.5 0 0 0-.87-1.033zM5 1.85a3.151 3.151 0 0 1 0 6.3a3.15 3.15 0 1 1 0-6.3m4.975 0a3.15 3.15 0 0 1 0 6.3c-.524 0-1.016-.13-1.45-.356a4.5 4.5 0 0 0 .534-.852a2.15 2.15 0 1 0 0-3.887a4.5 4.5 0 0 0-.535-.85a3.1 3.1 0 0 1 1.45-.355M5 2.85a2.151 2.151 0 0 0 0 4.3a2.15 2.15 0 0 0 0-4.3" /></svg>
                <div className={Style.navLinkText}>
                    Turmas
                </div>
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? Style.navLinkActive : Style.navLink} to="/Simulados">
                <svg className={Style.navIconStroke} width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.246 20.25h-6a1.5 1.5 0 0 1-1.5-1.5V2.25a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5V9m-10.5-3.75h6m-9 4.5h9m-9 4.5h7.5m9.881.62L15 22.5l-3.75.75l.75-3.75l7.631-7.63a2.115 2.115 0 0 1 2.991 0l.009.008a2.115 2.115 0 0 1-.004 2.992" /></svg>

                <div className={Style.navLinkText}>
                    Simulados
                </div>
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? Style.navLinkActive : Style.navLink} to="/Professores">
                <svg className={Style.navIconStroke} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M2 2h14c1.886 0 2.828 0 3.414.586S20 4.114 20 6v6c0 1.886 0 2.828-.586 3.414S17.886 16 16 16H9m1-9.5h6M2 17v-4c0-.943 0-1.414.293-1.707S3.057 11 4 11h2m-4 6h4m-4 0v5m4-5v-6m0 6v5m0-11h6" /><path d="M6 6.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0" /></g></svg>
                <div className={Style.navLinkText}>
                    Professores
                </div>
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? Style.navLinkActive : Style.navLink} to="/Alunos">
                <svg className={Style.navIconStroke} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" ><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M14 3.5c3.771 0 5.657 0 6.828 1.245S22 7.993 22 12s0 6.01-1.172 7.255S17.771 20.5 14 20.5h-4c-3.771 0-5.657 0-6.828-1.245S2 16.007 2 12s0-6.01 1.172-7.255S6.229 3.5 10 3.5z"/><path d="M5 15.5c1.609-2.137 5.354-2.254 7 0m-1.751-5.25a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0M15 9.5h4m-4 4h2"/></g></svg>
                <div className={Style.navLinkText}>
                    Alunos
                </div>
            </NavLink>

        </nav >
    )
}
