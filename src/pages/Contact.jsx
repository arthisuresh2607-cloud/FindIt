import React, { useState } from 'react';
import './Contact.css'; // Importing custom CSS file for contact styles

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate real database submission sequence
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="contact-container">
      
      {/* Page header */}
      <div className="contact-header">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">
          Have questions about a lost item or need verification assistance? Our support infrastructure is here to help.
        </p>
      </div>

      <div className="contact-layout-grid">
        
        {/* Left Column: Interactive Contact Form */}
        <div className="contact-card form-wrapper">
          <h3 className="card-heading">Send us a Message</h3>
          
          {submitted ? (
            <div className="submission-success">
              <div className="success-icon">✓</div>
              <h4 className="success-title">Message Transmitted Successfully</h4>
              <p className="success-text">Thank you for reaching out. The FindIt operations team will review your ticket and reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="clean-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g., Sarah Jenkins" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Campus Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="username@campus.edu" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Inquiry Department</label>
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Claim Verification">Claim Verification Assistance</option>
                  <option value="Disputed Item Ownership">Disputed Item Ownership</option>
                  <option value="Technical Bug Report">Technical Bug Report</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Provide explicit item details, date frames, or specific system problems..." 
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">Dispatch Message</button>
            </form>
          )}
        </div>

        {/* Right Column: Real Operational Contact Details */}
        <div className="contact-details-panel">
          
          {/* Box 1: Physical Office Location */}
          <div className="contact-card detail-box">
            <div className="detail-icon-circle blue-theme"></div>
            <div className="detail-content">
              <h4 className="detail-title">Address</h4>
              <p className="detail-text font-bold text-slate-800">Reception</p>
              <p className="detail-subtext">College Main Building, Ground Floor </p>
            </div>
          </div>

          {/* Box 2: Digital Channels */}
          <div className="contact-card detail-box">
            <div className="detail-icon-circle purple-theme"></div>
            <div className="detail-content">
              <h4 className="detail-title">For Query</h4>
              <p className="detail-text font-bold text-slate-800">support-findit@campus.edu</p>
            </div>
          </div>

          {/* Box 3: Telephone Helplines */}
          <div className="contact-card detail-box">
            <div className="detail-icon-circle rose-theme"></div>
            <div className="detail-content">
              <h4 className="detail-title">Telephone Number</h4>
              <p className="detail-text font-bold text-slate-800">+1 (555) 019-2831</p>
              <p className="detail-subtext">Extension: 4402 (Campus Landlines Only)</p>
            </div>
          </div>

          {/* Box 4: Business Operating Hours */}
          <div className="contact-card detail-box">
            <div className="detail-icon-circle emerald-theme"></div>
            <div className="detail-content">
              <h4 className="detail-title">Hours of Operation</h4>
              <p className="detail-text font-bold text-slate-800">Monday – Friday: 08:00 AM – 05:00 PM</p>
              <p className="detail-text font-bold text-slate-800">Saturday: 09:00 AM – 01:00 PM</p>
              <p className="detail-subtext text-rose-500 italic">Closed on Sundays</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}