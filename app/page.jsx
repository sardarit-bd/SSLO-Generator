"use client";

import { useState } from "react";
import FrameworkSelector from "./components/FrameworkSelector";
import StandardSelector from "./components/StandardSelector";
import WorkforceSelector from "./components/WorkforceSelector";
import SkillSelector from "./components/SkillSelector";
import SupportSelector from "./components/SupportSelector";
import NotesBox from "./components/NotesBox";
import { generateSSLO } from "../utils/api";
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

  const handleGenerate = async () => {
    if (!form.selectedStandard || !form.workforceTask)
      return alert("Please complete required fields.");

    setLoading(true);
    const res = await generateSSLO(form);
    setLoading(false);

    if (res.success) {
      setObjective(res.data.objective);
      toast.success("SSLO generated successfully!");
    } else {
      toast.error(res.message || "Failed to generate SSLO."); 
    }
  };

  const addToList = () => {
    if (objective) {
      setObjectives([...objectives, objective]);
      setObjective("");
    }else {
     toast.error("No objective to add. Please generate one first.");
    }
  };

  return (
    <main className="py-12">
      <div className=" container mx-auto px-6 space-y-8">
        <h1 className="text-3xl font-bold mb-2">SOLVED – SSLO Generator</h1>

        <div className="bg-white rounded-2xl shadow p-8 space-y-8 border">
          <FrameworkSelector form={form} setForm={setForm} />
          <StandardSelector form={form} setForm={setForm} />
          <WorkforceSelector form={form} setForm={setForm} />
          <SkillSelector form={form} setForm={setForm} />
          <SupportSelector form={form} setForm={setForm} />
          <NotesBox form={form} setForm={setForm} />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <button
              onClick={addToList}
              className="px-4 py-2 bg-[var(--brandBlue)] text-white rounded-lg"
            >
              Add to List
            </button>
          </div>

          {objective && (
            <div className="border-l-4 border-[var(--brandBlue)] brandLight p-4 rounded-md text-sm">
              {objective}
            </div>
          )}

          {objectives.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2">Objective List</h3>
              <ol className="list-decimal ml-6 space-y-2 text-sm">
                {objectives.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
