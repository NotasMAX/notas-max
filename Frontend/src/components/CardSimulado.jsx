import Style from "../styles/ButtonGroup.module.css";
import { Tooltip } from "primereact/tooltip";
import { useRef } from "react";

export default function CardSimulado({ simulado, onView, onEdit }) {
  const formtDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);
    if (isNaN(d)) return date;

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);
  };

  const tooltipRef = useRef(null);
  const isEditable =
    Date.now() - new Date(simulado.createdAt).getTime() <
    16 * 24 * 60 * 60 * 1000;

  return (
    <div className="flex w-[49%] h-1/3 items-center justify-between rounded-lg border border-gray-300 bg-white px-8 py-3">
      <Tooltip target={tooltipRef} position="top"/>

      <p className="w-1/3 flex gap-3 justify-start">
        Simulado {simulado.numero}
      </p>

      <p className="w-1/3 flex gap-3 justify-center">
        {formtDate(simulado.data_realizacao)}
      </p>

      <div className="w-1/3 flex gap-3 justify-end">
        <button
          ref={tooltipRef}
          data-pr-tooltip={
            isEditable
              ? `Editar simulado Nº ${simulado.numero}`
              : "Não é possível editar após 15 dias da criação"
          }
          className={Style.buttonSquare}
          onClick={onEdit}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V11C20 10.4477 20.4477 10 21 10C21.5523 10 22 10.4477 22 11V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2H13C13.5523 2 14 2.44772 14 3C14 3.55228 13.5523 4 13 4H7Z"
              fill="#000"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.1974 4C18.9845 4 18.7803 4.08457 18.6298 4.23509L10.7528 12.1121L10.3744 13.6256L11.8879 13.2473L19.7649 5.37021C19.9155 5.21969 20 5.01553 20 4.80265C20 4.58978 19.9155 4.38562 19.7649 4.23509C19.6144 4.08457 19.4102 4 19.1974 4ZM17.2156 2.82088C17.7412 2.29528 18.4541 2 19.1974 2C19.9407 2 20.6535 2.29528 21.1791 2.82088C21.7047 3.34648 22 4.05934 22 4.80265C22 5.54596 21.7047 6.25883 21.1791 6.78443L13.1062 14.8573C12.9781 14.9855 12.8175 15.0764 12.6417 15.1204L9.24256 15.9701C8.90178 16.0553 8.54129 15.9555 8.29291 15.7071C8.04453 15.4587 7.94468 15.0982 8.02988 14.7575L8.87966 11.3583C8.92362 11.1825 9.01453 11.0219 9.14269 10.8938L17.2156 2.82088Z"
              fill="#000"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289L18.7071 7.29289C19.0976 7.68342 19.0976 8.31658 18.7071 8.70711C18.3166 9.09763 17.6834 9.09763 17.2929 8.70711L15.2929 6.70711C14.9024 6.31658 14.9024 5.68342 15.2929 5.29289Z"
              fill="#000"
            />
          </svg>
        </button>
        <button
          className={Style.buttonSquare}
          onClick={onView}
          ref={tooltipRef}
          data-pr-tooltip={"Ver as notas dos alunos"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 8.25C9.92894 8.25 8.25001 9.92893 8.25001 12C8.25001 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75001 12C9.75001 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75001 13.2426 9.75001 12Z"
              fill="#000000"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 3.25C9.85905 3.25 7.92325 4.30899 6.35173 5.59572C4.77164 6.88946 3.47962 8.47865 2.61142 9.68801L2.53981 9.78759C2.01715 10.5138 1.58691 11.1117 1.58691 12C1.58691 12.8883 2.01715 13.4862 2.53981 14.2124L2.61142 14.312C3.47962 15.5214 4.77164 17.1105 6.35173 18.4043C7.92325 19.691 9.85905 20.75 12 20.75C14.141 20.75 16.0768 19.691 17.6483 18.4043C19.2284 17.1105 20.5204 15.5214 21.3886 14.312L21.4602 14.2124C21.9829 13.4862 22.4131 12.8883 22.4131 12C22.4131 11.1117 21.9829 10.5138 21.4602 9.78759L21.3886 9.68801C20.5204 8.47865 19.2284 6.88946 17.6483 5.59572C16.0768 4.30899 14.141 3.25 12 3.25ZM3.82993 10.5628C4.6592 9.40765 5.86348 7.93414 7.302 6.75631C8.7491 5.57146 10.3542 4.75 12 4.75C13.6458 4.75 15.2509 5.57146 16.698 6.75631C18.1365 7.93414 19.3408 9.40765 20.1701 10.5628C20.794 11.4319 20.9131 11.6415 20.9131 12C20.9131 12.3585 20.794 12.5681 20.1701 13.4372C19.3408 14.5923 18.1365 16.0659 16.698 17.2437C15.2509 18.4285 13.6458 19.25 12 19.25C10.3542 19.25 8.7491 18.4285 7.302 17.2437C5.86349 16.0659 4.6592 14.5923 3.82993 13.4372C3.20597 12.5681 3.08691 12.3585 3.08691 12C3.08691 11.6415 3.20597 11.4319 3.82993 10.5628Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
