export const generateSSLO = async (payload) => {
  try {
    const res = await fetch(
      "https://silved-education-backend-code.vercel.app/api/sslo/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("SSLO API Error:", err);
    return { success: false, message: "Server connection failed" };
  }
};
