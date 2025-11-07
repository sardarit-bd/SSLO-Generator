"use client";
import React, { useState } from "react";
import { Employability } from "../../lib/data/standardsData";

export default function SkillSelector({ form, setForm }) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState("");

  const toggleSkill = (skill) => {
    const selected = form.employabilitySkills;
    if (selected.includes(skill)) {
      setForm({ ...form, employabilitySkills: selected.filter((s) => s !== skill) });
    } else if (selected.length < 3) {
      setForm({ ...form, employabilitySkills: [...selected, skill] });
    } else {
      alert("You can select up to 3 skills.");
    }
  };

  const addCustomSkill = (e) => {
    if (e.key === "Enter" && custom.trim()) {
      if (form.employabilitySkills.length >= 3) return alert("Max 3 skills.");
      const newSkill = custom.trim();
      setForm({
        ...form,
        employabilitySkills: [...form.employabilitySkills, newSkill],
      });
      setCustom("");
      e.preventDefault();
    }
  };

  return (
    <div>
      <label className="text-sm font-semibold mb-1 block">Employability Skills</label>
      <div
        className="border rounded-lg px-3 py-2 relative bg-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap gap-2 min-h-[36px]">
          {form.employabilitySkills.map((s) => (
            <span
              key={s}
              className="bg-[var(--brandBlue)] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              {s}
              <button
                className="text-white hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSkill(s);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {open && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-lg shadow-md max-h-48 overflow-auto z-20">
            {Employability.map((s) => (
              <div
                key={s}
                onClick={() => toggleSkill(s)}
                className={`px-3 py-2 text-sm hover:bg-[var(--brandLight)] cursor-pointer ${
                  form.employabilitySkills.includes(s)
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
        onKeyDown={addCustomSkill}
        placeholder="Add custom skill (Enter)"
        className="w-full border rounded-lg px-3 py-2 mt-2"
      />
    </div>
  );
}
