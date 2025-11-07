"use client";
import React from "react";

export default function NotesBox({ form, setForm }) {
  return (
    <div>
      <label className="text-sm font-semibold mb-1 block">Notes (optional)</label>
      <textarea
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        placeholder="any extra conditions (e.g., with a bilingual glossary)"
        className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
      ></textarea>
    </div>
  );
}
