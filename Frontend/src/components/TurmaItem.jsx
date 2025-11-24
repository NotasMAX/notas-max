import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Style from "../styles/TurmasItem.module.css";
import { Tooltip } from 'primereact/tooltip';
export default function TurmaItem({ turma, position }) {
    const tooltipRef = useRef(null);
    return (
        <div className={Style.TurmaContainer}>


            <Tooltip target={tooltipRef} mouseTrack mouseTrackLeft={10} />
            <a href={`/Turmas/Simulado/${turma._id}`}>

                <div className={(position === 1) ? Style.TurmaContainerHeaderYellow : Style.TurmaContainerHeaderBlue}> </div>
                <div className={Style.TurmaContainerBody}>
                    <div className={Style.TurmaContainerSerie}>{turma.serie}º EM</div>
                </div>
            </a>
            <Link
                ref={tooltipRef}
                to={`/Turmas/Editar/${turma._id}`}
                aria-label={`Editar turma ${turma._id}`}
                data-pr-tooltip={`Editar turma`}>
                <svg className={Style.TurmaContainerEditIcon} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.0834 6.33329C8.46006 6.33329 6.33341 8.45994 6.33341 11.0833V26.9166C6.33341 29.54 8.46006 31.6666 11.0834 31.6666H26.9167C29.5401 31.6666 31.6667 29.54 31.6667 26.9166V17.4166C31.6667 16.5422 32.3756 15.8333 33.2501 15.8333C34.1245 15.8333 34.8334 16.5422 34.8334 17.4166V26.9166C34.8334 31.2889 31.289 34.8333 26.9167 34.8333H11.0834C6.71116 34.8333 3.16675 31.2889 3.16675 26.9166V11.0833C3.16675 6.71104 6.71116 3.16663 11.0834 3.16663H20.5834C21.4579 3.16663 22.1667 3.87551 22.1667 4.74996C22.1667 5.62441 21.4579 6.33329 20.5834 6.33329H11.0834Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M30.3959 6.33329C30.0589 6.33329 29.7356 6.46719 29.4973 6.70552L17.0253 19.1775L16.4262 21.5739L18.8226 20.9748L31.2946 8.5028C31.5329 8.26447 31.6668 7.94122 31.6668 7.60416C31.6668 7.2671 31.5329 6.94385 31.2946 6.70552C31.0562 6.46719 30.733 6.33329 30.3959 6.33329ZM27.2581 4.46635C28.0903 3.63415 29.219 3.16663 30.3959 3.16663C31.5728 3.16663 32.7015 3.63415 33.5337 4.46635C34.3659 5.29855 34.8334 6.42725 34.8334 7.60416C34.8334 8.78107 34.3659 9.90977 33.5337 10.742L20.7516 23.5241C20.5487 23.727 20.2945 23.8709 20.0161 23.9405L14.6341 25.286C14.0946 25.4209 13.5238 25.2628 13.1305 24.8695C12.7373 24.4763 12.5792 23.9055 12.7141 23.3659L14.0595 17.984C14.1291 17.7056 14.2731 17.4514 14.476 17.2484L27.2581 4.46635Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24.2137 8.38037C24.8321 7.76204 25.8346 7.76204 26.4529 8.38037L29.6196 11.547C30.2379 12.1654 30.2379 13.1679 29.6196 13.7862C29.0013 14.4045 27.9987 14.4045 27.3804 13.7862L24.2137 10.6195C23.5954 10.0012 23.5954 8.9987 24.2137 8.38037Z" />
                </svg>
            </Link>
        </div >
    )
}