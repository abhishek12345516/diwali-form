import React, { useEffect, useRef, useState } from "react";

const WishPage = ({ data }) => {
  const [soundOn, setSoundOn] = useState(true);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  // 🔥 Fireworks animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fireworks = [];
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const random = (min, max) => Math.random() * (max - min) + min;

    class Firework {
      constructor() {
        this.x = random(0, canvas.width);
        this.y = canvas.height;
        this.targetY = random(canvas.height / 4, canvas.height / 2);
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.size = 2;
        this.speed = random(5, 7);
        this.exploded = false;
      }
      update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
          this.exploded = true;
          for (let i = 0; i < 30; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = random(-4, 4);
        this.speedY = random(-4, 4);
        this.life = 100;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.05; // gravity
        this.life--;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.05) fireworks.push(new Firework());
      fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw();
        if (fw.exploded) fireworks.splice(i, 1);
      });

      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  // 🎵 Play sound when page opens
  useEffect(() => {
    if (soundOn && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [soundOn]);

  if (!data) {
    return (
      <div className="text-center mt-5">
        <h4>No wish data found 😅</h4>
      </div>
    );
  }

  return (
    <div className="position-relative text-center text-light">
      <canvas ref={canvasRef} className="position-fixed top-0 start-0 w-100 h-100" />

      <div
        className="d-flex flex-column justify-content-center align-items-center vh-100 position-relative p-3"
        style={{
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-4 rounded shadow-lg text-light w-100" style={{ maxWidth: "500px" }}>
          <h2 className="mb-3 text-warning">🎇 Happy Diwali 🎇</h2>
          <h4>Dear {data.to},</h4>
          <p className="lead">{data.msg}</p>
          <h5 className="mt-3 text-warning">~ {data.from}</h5>
          <button
            className="btn btn-outline-warning mt-3"
            onClick={() => setSoundOn((prev) => !prev)}
          >
            {soundOn ? "🔇 Mute Sound" : "🔊 Play Sound"}
          </button>
        </div>
      </div>

      {/* Background fireworks sound */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/02/23/audio_c7a2a5be17.mp3?filename=fireworks-125077.mp3"
      />

      {/* Responsive text adjustments */}
      <style>{`
        @media (max-width: 576px) {
          h2 { font-size: 1.6rem; }
          h4 { font-size: 1.2rem; }
          p.lead { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default WishPage;
