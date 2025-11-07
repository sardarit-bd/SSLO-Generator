"use client";
import React, { useEffect } from "react";
import { Workforce } from "../../lib/data/standardsData";;

export default function WorkforceSelector({ form, setForm }) {
  const tasks = Workforce[form.industry] || [];

  useEffect(() => {
    if (tasks.length > 0 && !form.workforceTask) {
      setForm({ ...form, workforceTask: tasks[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.industry]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-semibold mb-1 block">Industry</label>
        <select
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value, workforceTask: "" })}
          className="w-full border rounded-lg px-3 py-2"
        >
          {Object.keys(Workforce).map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold mb-1 block">Workforce Task</label>
        <select
          value={form.workforceTask}
          onChange={(e) => setForm({ ...form, workforceTask: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
        >
          {tasks.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
