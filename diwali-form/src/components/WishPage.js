import React, { useEffect } from "react";

const WishPage = ({ data }) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "radial-gradient(circle at center, #1b2735, #090a0f)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fireworks animation */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="firework"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.5}s`,
          }}
        ></div>
      ))}

      <div style={{ textAlign: "center", zIndex: 5 }}>
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "3rem",
            color: "#FFD700",
          }}
        >
          🎇 Happy Diwali {data.to}! 🎆
        </h1>
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.2rem",
            color: "#fffacd",
            margin: "20px 0",
            maxWidth: "600px",
          }}
        >
          {data.msg}
        </p>
        <h3
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "2rem",
            color: "#FFA500",
          }}
        >
          ~ {data.from}
        </h3>
      </div>

      <style>{`
        @keyframes firework {
          0% { transform: scale(0.2); opacity: 1; }
          50% { transform: scale(2); opacity: 1; box-shadow: 0 0 20px 8px #fff, 0 0 50px 12px #ff0, 0 0 80px 20px #f00; }
          100% { transform: scale(0.1); opacity: 0; }
        }
        .firework {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #ff0 20%, #f00 80%);
          border-radius: 50%;
          animation: firework 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WishPage;
