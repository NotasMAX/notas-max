import React from 'react'
import Style from "../src/styles/Navigation.module.css";

export default function Navigation({ }) {
    return (
        <nav className={Style.nav}>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}
