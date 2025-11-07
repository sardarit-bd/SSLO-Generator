"use client";
import React, { useEffect, useState } from "react";

// import datasets
import {
  CCRS_READING,
  CCRS_LANGUAGE,
  ELP_ANCHORS,
  BEST_RLA,
  BEST_MATH,
} from "@/lib/data/standardsData";

export default function StandardSelector({ form, setForm }) {
  const [standards, setStandards] = useState([]);

  // Auto-load correct dataset based on current framework and type
  useEffect(() => {
    let data = [];

    const { standardsFramework, standardsType, abeNrsLevel } = form;

    if (standardsFramework.includes("B.E.S.T.")) {
      // 🔹 Florida B.E.S.T. logic
      if (standardsType.includes("Reasoning through Language Arts"))
        data = BEST_RLA[abeNrsLevel] || [];
      else if (standardsType.includes("Mathematics"))
        data = BEST_MATH[abeNrsLevel] || [];
    } else if (standardsFramework.includes("ELP")) {
      // 🔹 ELP Anchors
      data = ELP_ANCHORS || [];
    } else {
      // 🔹 CCRS Frameworks
      if (standardsType.includes("Language"))
        data = CCRS_LANGUAGE[abeNrsLevel] || [];
      else data = CCRS_READING[abeNrsLevel] || [];
    }

    setStandards(data);
    setForm({ ...form, selectedStandard: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.standardsFramework, form.standardsType, form.abeNrsLevel]);

  // ABE NRS Levels
  const abeLevels = [
    "ABE NRS 1",
    "ABE NRS 2",
    "ABE NRS 3",
    "ABE NRS 4",
    "ABE NRS 5",
    "ABE NRS 6",
  ];

  return (
    <section className="space-y-4">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold mb-1 block">
            ABE NRS Level
          </label>
          <select
            value={form.abeNrsLevel}
            onChange={(e) => setForm({ ...form, abeNrsLevel: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            {abeLevels.map((lvl) => (
              <option key={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold mb-1 block">
            Standard ({form.standardsFramework.includes("ELP") ? "Anchor" : "Code"})
          </label>
          <div className="border rounded-lg p-3 bg-white max-h-64 overflow-auto">
            {standards.length > 0 ? (
              standards.map((s) => (
                <label
                  key={s.code}
                  className="flex items-start gap-2 py-1 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name="standard"
                    checked={form.selectedStandard === s.phrase}
                    onChange={() =>
                      setForm({ ...form, selectedStandard: s.phrase })
                    }
                  />
                  <span>
                    <strong>{s.code}</strong> — {s.phrase}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">
                No standards available for this selection.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
