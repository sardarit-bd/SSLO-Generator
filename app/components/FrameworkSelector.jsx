"use client";
import React from "react";
import { frameworkTypeOptions } from "@/lib/data/frameworkTypes";

export default function FrameworkSelector({ form, setForm }) {
  const frameworks = Object.keys(frameworkTypeOptions);

  const handleFrameworkChange = (fw) => {
    const firstType = frameworkTypeOptions[fw][0].options[0];
    setForm({
      ...form,
      standardsFramework: fw,
      standardsType: firstType,
      selectedStandard: "",
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Program */}
      <div>
        <label className="text-sm font-semibold mb-1 block">
          Program / School
        </label>
        <input
          value={form.program}
          onChange={(e) => setForm({ ...form, program: e.target.value })}
          placeholder="e.g., SOLVED Adult Education Program"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Framework */}
      <div>
        <label className="text-sm font-semibold mb-1 block">
          Standards Framework
        </label>
        <select
          value={form.standardsFramework}
          onChange={(e) => handleFrameworkChange(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          {frameworks.map((fw) => (
            <option key={fw}>{fw}</option>
          ))}
        </select>

        {/* Helpful note below */}
        {form.standardsFramework.includes("B.E.S.T.") && (
          <p className="text-xs text-gray-400 mt-1">
            Florida ABE RLA is defined for ABE NRS 1–4; 5–6 intentionally empty.
          </p>
        )}
      </div>

      {/* Standards Type */}
      <div>
        <label className="text-sm font-semibold mb-1 block">
          Standards Type
        </label>
        <select
          value={form.standardsType}
          onChange={(e) => setForm({ ...form, standardsType: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
        >
          {frameworkTypeOptions[form.standardsFramework].map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
