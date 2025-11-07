const BASE_URL = "https://silved-education-backend-code.vercel.app";

export const generateSSLO = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/api/sslo/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error("generateSSLO error:", err);
    return { success: false, message: "Network error" };
  }
};

export const getAllObjectives = async () => {
  try {
    const res = await fetch(`${BASE_URL}/allproducts`);
    return await res.json();
  } catch (err) {
    console.error("getAllObjectives error:", err);
    return { success: false, data: [] };
  }
};
