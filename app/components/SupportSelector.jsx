"use client";
import React, { useState } from "react";
import { Supports } from "../../lib/data/standardsData";

export default function SupportSelector({ form, setForm }) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState("");

  const toggleSupport = (item) => {
    const selected = form.supports;
    if (selected.includes(item)) {
      setForm({ ...form, supports: selected.filter((s) => s !== item) });
    } else {
      setForm({ ...form, supports: [...selected, item] });
    }
  };

  const addCustomSupport = (e) => {
    if (e.key === "Enter" && custom.trim()) {
      const newItem = custom.trim();
      setForm({
        ...form,
        supports: [...form.supports, newItem],
      });
      setCustom("");
      e.preventDefault();
    }
  };

  return (
    <div>
      <label className="text-sm font-semibold mb-1 block">Supports / Scaffolds</label>
      <div
        className="border rounded-lg px-3 py-2 relative bg-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap gap-2 min-h-[36px]">
          {form.supports.map((s) => (
            <span
              key={s}
              className="bg-[var(--brandBlue)] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              {s}
              <button
                className="text-white hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSupport(s);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {open && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-lg shadow-md max-h-48 overflow-auto z-20">
            {Supports.map((s) => (
              <div
                key={s}
                onClick={() => toggleSupport(s)}
                className={`px-3 py-2 text-sm hover:bg-[var(--brandLight)] cursor-pointer ${
                  form.supports.includes(s)
                    ? "bg-[var(--brandLight)] font-semibold"
                    : ""
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        onKeyDown={addCustomSupport}
        placeholder="Add custom support (Enter)"
        className="w-full border rounded-lg px-3 py-2 mt-2"
      />
    </div>
  );
}
