import React, { useEffect, useState } from "react";

export default function NotasCard({ conteudo, simulado }) {
  // const materia =

  return (
    <div className="flex w-full bg-white border border-gray-300 rounded-lg py-2 px-3 items-center">
      <div className="w-1/4">Simulado {simulado.numero}</div>
      <div className="w-1/4 capitalize">{simulado.tipo}</div>
      <div className="w-1/4">{conteudo.peso.toFixed(2).replace('.', ',')} %</div>
      <div className="flex w-1/4 items-center gap-3">
        <p className="w-1/12">{conteudo.resultado.acertos}</p>
        <p className="w-1/12">/</p>
        <p className="w-1/12">{conteudo.quantidade_questoes}</p>
      </div>
    </div>
  );
}
