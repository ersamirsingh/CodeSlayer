/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Phone, Edit2, Check, X, Upload } from "lucide-react";

const AVAILABLE_SKILLS = [
  "Construction", "Painting", "Carpentry", "Electrical",
  "Plumbing", "Loading/Unloading", "Warehouse", "Cleaning",
  "Welding", "Masonry"
];

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: [],
    experience: "",
    avatarUrl: ""
  });

  // helper: axios instance with auth
  const api = axios.create({
    http:'//localhost:3000',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      "Content-Type": "application/json"
    }
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    api.get("/api/v1/users/me")
      .then(res => {
        if (!mounted) return;
        const data = res.data;
        setUser({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          skills: data.skills || [],
          experience: data.experience || "",
          avatarUrl: data.avatarUrl || ""
        });
      })
      .catch(err => {
        console.error("Failed to fetch profile:", err);
        setError(err?.response?.data?.message || "Unable to load profile.");
        // optionally redirect to login if unauthorized
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
    // eslint-disable-next-line
  }, []);

  const toggleSkill = (skill) => {
    setUser(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMsg("");
    try {
      const payload = {
        name: user.name,
        phone: user.phone,
        location: user.location,
        skills: user.skills,
        experience: user.experience
      };
      // PUT to update profile
      const res = await api.put("/api/v1/users/me", payload);
      setSuccessMsg("Profile updated successfully.");
      // update avatarUrl if returned
      if (res.data?.avatarUrl) setUser(prev => ({ ...prev, avatarUrl: res.data.avatarUrl }));
    } catch (err) {
      console.error("Update failed:", err);
      setError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMsg(""), 2500);
    }
  };

  const handleAvatarPick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("avatar", file);
      // Example endpoint expects multipart/form-data
      const res = await api.post("/api/v1/users/me/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUser(prev => ({ ...prev, avatarUrl: res.data.avatarUrl || prev.avatarUrl }));
      setSuccessMsg("Avatar uploaded");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error("Avatar upload error:", err);
      setError(err?.response?.data?.message || "Avatar upload failed.");
    } finally {
      setAvatarUploading(false);
      // reset file input so same file can be re-selected later
      e.target.value = "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-gray-500">Loading profile...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <div className="flex items-center gap-3">
            <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Avatar / basic */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-gray-400">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10" />
                )}
              </div>

              <div className="absolute right-0 bottom-0">
                <button
                  onClick={handleAvatarPick}
                  className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary/20 border border-primary/20"
                  title="Upload avatar"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium">{user.name || "Your Name"}</h2>
              <p className="text-sm text-gray-500">{user.email || "No email"}</p>
              <p className="text-sm text-gray-500 mt-2"><MapPin className="inline w-4 h-4 mr-1" /> {user.location || "Not set"}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email (read-only)</label>
              <input type="email" value={user.email} className="input input-bordered w-full bg-gray-100" readOnly />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                  className="input input-bordered flex-1"
                />
                <button type="button" className="btn btn-outline" onClick={() => alert("Trigger phone verification flow")}>
                  Verify
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={user.location}
                onChange={(e) => setUser(prev => ({ ...prev, location: e.target.value }))}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SKILLS.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm border transition ${
                      user.skills.includes(skill) ? "bg-primary/10 border-primary text-primary" : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <select
                value={user.experience}
                onChange={(e) => setUser(prev => ({ ...prev, experience: e.target.value }))}
                className="input input-bordered w-48"
              >
                <option value="">Select</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1 - 3 years</option>
                <option value="3-5">3 - 5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

            <div className="flex items-center gap-3">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving..." : <><Check className="w-4 h-4 mr-2" /> Save Changes</>}
              </button>
              <button type="button" onClick={() => { /* reset to last fetched or clear */ window.location.reload(); }} className="btn btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Account actions */}
        <div className="mt-6 flex gap-3">
          <button onClick={() => navigate("/applications")} className="btn btn-outline">
            My Applications
          </button>
          <button onClick={() => navigate("/disputes")} className="btn btn-outline">
            My Disputes
          </button>
          <button onClick={handleLogout} className="btn btn-error ml-auto">
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
