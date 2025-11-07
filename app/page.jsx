"use client";

import { useState, useEffect } from "react";
import FrameworkSelector from "./components/FrameworkSelector";
import StandardSelector from "./components/StandardSelector";
import WorkforceSelector from "./components/WorkforceSelector";
import SkillSelector from "./components/SkillSelector";
import SupportSelector from "./components/SupportSelector";
import NotesBox from "./components/NotesBox";
import { generateSSLO, getAllObjectives } from "../utils/api";
import { toast } from "react-toastify";

export default function SSLOGeneratorPage() {
  const [form, setForm] = useState({
    program: "",
    standardsFramework: "CCRS (National)",
    standardsType: "Mathematics: Measurement & Data (CCRS)",
    abeNrsLevel: "ABE NRS 1",
    selectedStandard: "",
    industry: "Health Science",
    workforceTask: "",
    employabilitySkills: [],
    supports: [],
    notes: "",
  });

  const [objective, setObjective] = useState("");
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all objectives on mount
  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await getAllObjectives();
        if (res.success && Array.isArray(res.data)) {
          setObjectives(res.data);
        }
      } catch (err) {
        console.error("Failed to load objectives:", err);
      }
    };
    fetchObjectives();
  }, [objective]);

  // 🔹 Validate required fields
  const validateForm = () => {
    const required = [
      { key: "program", label: "Program / School" },
      { key: "standardsFramework", label: "Standards Framework" },
      { key: "standardsType", label: "Standards Type" },
      { key: "abeNrsLevel", label: "ABE NRS Level" },
      { key: "selectedStandard", label: "Standard" },
      { key: "industry", label: "Industry" },
      { key: "workforceTask", label: "Workforce Task" },
    ];

    for (const f of required) {
      if (!form[f.key] || form[f.key].trim() === "") {
        toast.error(`Please fill out "${f.label}".`);
        return false;
      }
    }

    if (form.employabilitySkills.length === 0) {
      toast.error("Please select at least one Employability Skill.");
      return false;
    }

    return true;
  };

  // 🔹 Create dynamic message
  const generateDynamicObjective = (data) => {
    const { selectedStandard, workforceTask, employabilitySkills, supports, notes } = data;

    const skillText = employabilitySkills?.length
      ? employabilitySkills.join(", ")
      : "relevant employability skills";

    const supportText = supports?.length
      ? ` with supports such as ${supports.join(", ")}`
      : "";

    const notesText = notes ? ` ${notes}` : "";

    return `Students will be able to ${selectedStandard} by ${workforceTask}, using ${skillText}${supportText}.${notesText}`;
  };

  // 🔹 Generate Objective
  const handleGenerate = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await generateSSLO(form);
      setLoading(false);

      if (res.success && res.data) {
        const dynamicText = generateDynamicObjective(res.data);
        setObjective(dynamicText);
        toast.success("✅ SSLO generated successfully!");
      } else {
        toast.error(res.message || "Failed to generate SSLO.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong while generating SSLO.");
      console.error(err);
    }
  };

  // 🔹 Add to list
  const addToList = () => {
    if (!objective) {
      toast.error("No objective to add. Please generate one first.");
      return;
    }

    const updated = [...objectives, { objective }];
    setObjectives(updated);
    setObjective("");
    toast.success("Added to objective list!");
  };

  return (
    <main className="py-12">
      <div className="container mx-auto px-6 space-y-8">
        <h1 className="text-3xl font-bold mb-2 text-[var(--brandInk)]">
          SOLVED – SSLO Generator
        </h1>

        <div className="bg-white rounded-2xl shadow p-8 space-y-8 border border-[var(--brandLine)]">
          <FrameworkSelector form={form} setForm={setForm} />
          <StandardSelector form={form} setForm={setForm} />
          <WorkforceSelector form={form} setForm={setForm} />
          <SkillSelector form={form} setForm={setForm} />
          <SupportSelector form={form} setForm={setForm} />
          <NotesBox form={form} setForm={setForm} />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-5 py-2 bg-blue-900 text-white rounded-lg shadow hover:bg-blue-800 transition"
            >
              {loading ? "Generating..." : "Generate"}
            </button>

            {/* <button
              onClick={addToList}
              className="px-5 py-2 bg-[var(--brandColor)] text-white rounded-lg shadow hover:opacity-90 transition"
            >
              Add to List
            </button> */}
          </div>

          {/* Display generated objective */}
          {/* {objective && (
            <div className="border-l-4 border-[var(--brandBlue)] bg-[var(--brandLight)] p-4 rounded-md text-sm leading-relaxed">
              {objective}
            </div>
          )} */}

          {/* Existing objectives */}
          {objectives.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2 text-[var(--brandInk)]">
                Objective List
              </h3>
              <ol className="list-decimal ml-6 space-y-2 text-sm text-[var(--brandMuted)]">
                {objectives.map((o, i) => (
                  <li key={i}>
                    {o.objective ||
                      generateDynamicObjective(o)} {/* fallback if backend data */}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
