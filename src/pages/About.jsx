import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      
      {/* Hero Headline Section with Catchy Slogan */}
      <div className="about-hero">
        <span className="badge">Our Mission</span>
        <h1 className="hero-title">Lost Today. Found Tomorrow.</h1>
        <p className="hero-description">
          FindIt is a simple campus system designed to connect missing items with their owners quickly and easily.
        </p>
      </div>

      {/* Catchy Quotes Callout Panel */}
      <div className="quotes-grid">
        <div className="quote-card">
          <span className="quote-icon">“</span>
          <p className="quote-text">
            Integrity is doing the right thing, even when no one is watching. Returning what is lost reflects the strength of our campus culture.
          </p>
          <h5 className="quote-author">— Campus Community Values</h5>
        </div>
        <div className="quote-card">
          <span className="quote-icon">“</span>
          <p className="quote-text">
            Technology is at its best when it brings people together and solves real-world human struggles—starting right here with our belongings.
          </p>
          <h5 className="quote-author">— FindIt Core Philosophy</h5>
        </div>
      </div>

      {/* Deep-Dive App Information Grid */}
      <div className="info-section">
        <div className="info-header">
          <h3 className="section-title">Why FindIt Matters</h3>
          <p className="section-subtitle">
            Traditional pinboards can be messy. FindIt organizes everything into one simple digital space where claims are verified easily.
          </p>
        </div>

        <div className="info-cards-grid">
          <div className="info-card">
            <div className="card-icon"></div>
            <h4 className="card-title">Instant Logging</h4>
            <p className="card-text">Report lost property parameters or newly found assets within seconds.</p>
          </div>
          <div className="info-card">
            <div className="card-icon"></div>
            <h4 className="card-title">Secure Claims</h4>
            <p className="card-text">Admin verification channels safeguard items from false collection attempts.</p>
          </div>
          <div className="info-card">
            <div className="card-icon"></div>
            <h4 className="card-title">Modern Layout</h4>
            <p className="card-text">
              An adaptive rendering workflow featuring fluid structures, interactive state changes, clean card grids, and high-contrast styling designed for optimal mobile and desktop clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Aesthetic Asymmetric Floating Flow Chart Section */}
      <div className="visual-flowchart-container">
        <div className="flowchart-header">
          <h3 className="section-title">The Recovery Journey</h3>
          <p className="section-subtitle">See how seamlessly your belongings move through the FindIt system.</p>
        </div>

        <div className="asymmetric-canvas">
          
          {/* Card 1: Top Left Area */}
          <div className="floating-group node-1">
            <div className="handwritten-label label-top">
              Don't panic over <br />misplaced items
            </div>
            <div className="curved-arrow arrow-top-to-card1"></div>
            <div className="aesthetic-card">
              <div className="card-node-header">
                <span className="node-icon icon-rose"></span>
                <span className="node-heading">Lost Items</span>
              </div>
              <div className="skeleton-preview">
                <div className="skel-thumb-rose"></div>
                <div className="skel-lines">
                  <div className="skel-line long">Item details posted</div>
                  <div className="skel-line short">Waiting for match</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Mid Right Area */}
          <div className="floating-group node-2">
            <div className="handwritten-label label-right">
              Browse everything <br />turned in safely
            </div>
            <div className="curved-arrow arrow-right-to-card2">➔</div>
            <div className="aesthetic-card">
              <div className="card-node-header">
                <span className="node-icon icon-blue"></span>
                <span className="node-heading">Found Catalog</span>
              </div>
              <div className="skeleton-preview">
                <div className="skel-avatar"></div>
                <div className="skel-lines">
                  <div className="skel-line long">Items collected</div>
                  <div className="skel-line mid">Ready to be claimed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mid Left Center Area */}
          <div className="floating-group node-3">
            <div className="handwritten-label label-left-mid">
              Verified items from <br />top campus spots
            </div>
            <div className="curved-arrow arrow-left-to-card3">➔</div>
            <div className="aesthetic-card narrow-card">
              <div className="card-node-header">
                <span className="node-icon icon-purple"></span>
                <span className="node-heading">Hotspots</span>
              </div>
              <div className="mini-badge-row">
                <span className="loc-tag">Library</span>
                <span className="loc-tag">A-Hall</span>
                <span className="loc-tag">Cafeteria</span>
              </div>
            </div>
          </div>

          {/* Card 4: Bottom Center-Right Area */}
          <div className="floating-group node-4">
            <div className="handwritten-label label-bottom-track">
              Track recovery <br />status live
            </div>
            <div className="curved-arrow arrow-bottom-to-card4">➔</div>
            <div className="aesthetic-card">
              <div className="card-node-header">
                <span className="node-icon icon-emerald"></span>
                <span className="node-heading">Verification</span>
              </div>
              <div className="skeleton-preview-split">
                <div className="split-subbox text-emerald">
                  <span>Approved</span>
                </div>
                <div className="split-subbox text-blue">
                  <span> Returned</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}