import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/api";
import "../styles/Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setProfileData(response.data.user);
      setFormData(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setUpdating(true);
    setMessage("");
    try {
      const response = await updateProfile(formData);
      setProfileData(response.data.user);
      setIsEditing(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profileData) {
    return <div className="error">Failed to load profile</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            {profileData.profileImage ? (
              <img src={profileData.profileImage} alt="Profile" />
            ) : (
              <div className="profile-placeholder">
                {profileData.fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1>{profileData.fullName}</h1>
            <p className="email">{profileData.email}</p>
          </div>
        </div>

        {message && <div className="message success-message">{message}</div>}

        <div className="profile-content">
          {!isEditing ? (
            <div className="profile-view">
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>{profileData.fullName}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{profileData.email}</p>
                </div>
                <div className="info-item">
                  <label>Phone Number</label>
                  <p>{profileData.phoneNumber}</p>
                </div>
                <div className="info-item">
                  <label>Date of Birth</label>
                  <p>
                    {new Date(profileData.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <p>{profileData.gender}</p>
                </div>
                <div className="info-item">
                  <label>Profession</label>
                  <p>{profileData.profession}</p>
                </div>
                <div className="info-item full-width">
                  <label>Address</label>
                  <p>{profileData.address}</p>
                </div>
              </div>

              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-edit">
              <div className="info-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    disabled={updating}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleChange}
                    disabled={updating}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={
                      formData.dateOfBirth
                        ? formData.dateOfBirth.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    disabled={updating}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    disabled={updating}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="profession">Profession</label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession || ""}
                    onChange={handleChange}
                    disabled={updating}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    disabled={updating}
                    rows="3"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="profileImage">Profile Image URL</label>
                  <input
                    type="url"
                    id="profileImage"
                    name="profileImage"
                    value={formData.profileImage || ""}
                    onChange={handleChange}
                    disabled={updating}
                  />
                </div>
              </div>

              <div className="button-group">
                <button
                  className="save-btn"
                  onClick={handleSave}
                  disabled={updating}
                >
                  {updating ? "Saving..." : "💾 Save Changes"}
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(profileData);
                  }}
                  disabled={updating}
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
