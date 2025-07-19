import User from "../models/user.model.js";

// 🔹 Get All Candidates
export const getAllCandidates = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("name email Skill");

    const formatted = users.map(user => ({
      name: user.name,
      email: user.email,
      skills: user.Skill || "N/A",  // Your model uses "Skill", not "Skills"
    }));

    res.status(200).json({ success: true, candidates: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching candidates", error: err.message });
  }
};

// 🔹 Get All Recruiters
export const getAllRecruiter = async (req, res) => {
  try {
    const recruiters = await User.find({ role: "recruiter" }).select(
      "name email companyName contactPhone"
    );

    const formatted = recruiters.map(rec => ({
      name: rec.name,
      email: rec.email,
      company: rec.companyName || "N/A",
      phone: rec.contactPhone || "N/A",
    }));

    res.status(200).json({ success: true, recruiters: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching recruiters", error: err.message });
  }
};
