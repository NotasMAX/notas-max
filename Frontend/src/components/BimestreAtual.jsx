import React, { useEffect, useState } from "react";

function getBimester(date = new Date(), monthsPerBimester = 2, startMonth = 1) {
  const m = date.getMonth() + 1;
  const shifted = ((m - startMonth + 12) % 12) + 1;
  return Math.ceil(shifted / monthsPerBimester);
}

export default function BimestreAtual() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/ip")
      .then(res => {
        if (!res.ok) throw new Error("network");
        return res.json();
      })
      .then(j => {
        if (!j || !j.datetime) throw new Error("no-datetime");
        const d = new Date(j.datetime);
        if (isNaN(d)) throw new Error("invalid-date");
        setNow(d);
      })
      .catch(() => {
        setNow(new Date());
      });
  }, []);

  const ano = now.getFullYear();
  const bimestre = getBimester(now, 2, 1);

  return (
    <div className="border border-gray-500 rounded-md px-4 py-2 inline-block text-gray-500">
      {bimestre}º Bimestre - {ano}
    </div>
  );
}