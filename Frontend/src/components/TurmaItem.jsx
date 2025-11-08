import React from 'react'

export default function TurmaItem({ turma }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded hover:shadow-sm">
            <div>
                <div className="font-medium">{turma.serie}</div>
                <div className="text-sm text-gray-600">{turma.ano}</div>
            </div>
        </div>
    )
}