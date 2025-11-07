import React from 'react'
import Header from './Header.jsx';
import Navigation from './Navigation.jsx';
import Style from "../styles/Layout.module.css";

export default function Layout({ children }) {
    return (
        <div className={Style.layout}>
            <Header />
            <div className={Style.navAndContent}>
                <Navigation />
                <main className={Style.content}>
                    {children}
                </main>
            </div>
        </div>
    )
}