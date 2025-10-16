import React, { useState, useEffect } from "react";

const FormPage = ({ onGenerate }) => {
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { from: fromName, to: toName, msg: message };
    const encoded = encodeURIComponent(JSON.stringify(data));

    // ✅ Yeh line change ki gayi hai (important for GitHub Pages)
    const generatedLink = `${window.location.origin}/diwali-form/?data=${encoded}`;

    setLink(generatedLink);
    onGenerate(data);

    // Clear fields after submission
    setFromName("");
    setToName("");
    setMessage("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("🎉 Link copied successfully!");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        background: "radial-gradient(circle at center, #1b2735, #090a0f 80%)",
        overflow: "hidden",
      }}
    >
      {/* Floating diyas */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="floating-diya"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
          }}
        ></div>
      ))}

      {/* Fireworks */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`fw-${i}`}
          className="firework"
          style={{
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
          }}
        ></div>
      ))}

      {/* Glow orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`glow-${i}`}
          className="glow-light"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.5}s`,
          }}
        ></div>
      ))}

      <div
        className="card shadow-lg p-4 text-center"
        style={{
          maxWidth: "450px",
          width: "90%",
          zIndex: 5,
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "1.5rem",
        }}
      >
        <h2
          className="mb-4"
          style={{
            color: "#d97706",
            fontFamily: "'Great Vibes', cursive",
            fontSize: "2.3rem",
          }}
        >
          🪔 Create Your Diwali Wish 🪔
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold text-dark">From Name</label>
            <input
              type="text"
              className="form-control"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-bold text-dark">To Name</label>
            <input
              type="text"
              className="form-control"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-bold text-dark">Message</label>
            <textarea
              className="form-control"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold text-light"
            style={{
              background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
              border: "none",
              borderRadius: "25px",
              padding: "10px",
            }}
          >
            Generate Diwali Wish 🎇
          </button>
        </form>

        {link && (
          <div className="mt-4">
            <p className="fw-bold text-dark">Your Shareable Link:</p>
            <input
              type="text"
              className="form-control mb-2"
              value={link}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="btn btn-outline-success"
            >
              Copy Link 📋
            </button>
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style>{`
        .floating-diya {
          position: absolute;
          bottom: -50px;
          width: 35px;
          height: 35px;
          background: radial-gradient(circle at 10px 10px, #ff9933, #cc6600);
          border-radius: 50%;
          box-shadow: 0 0 25px 8px #ffcc33;
          animation: floatUp 14s linear infinite;
          opacity: 0.85;
        }

        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0.9; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }

        .glow-light {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255,255,200,0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: glowPulse 6s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0.9; }
        }

        .firework {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #ff0 20%, #f00 80%);
          border-radius: 50%;
          animation: fireworkExplosion 2s ease-out infinite;
        }

        @keyframes fireworkExplosion {
          0% {
            transform: scale(0.2) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) translateY(-80px);
            opacity: 1;
            box-shadow: 0 0 10px 3px #fff, 0 0 40px 8px #ff0, 0 0 70px 12px #f00;
          }
          100% {
            transform: scale(0.1) translateY(0);
            opacity: 0;
          }
        }

        @media (max-width: 576px) {
          h2 { font-size: 1.8rem !important; }
          .card { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default FormPage;
