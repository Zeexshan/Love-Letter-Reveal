import { useState, useRef, useEffect, useCallback } from "react";
import img1 from "@assets/1776435407667_1776436469801.png";
import img2 from "@assets/1776435395083_1776436484043.png";
import img3 from "@assets/1776435379814_1776436484100.png";
import img4 from "@assets/1776435362295_1776436484121.png";
import img5 from "@assets/1776435331333_1776436484139.png";

const LETTER_TEXT = `Sobia, my sweet girl.

Happy birthday.

I have so much to say and I don't even know where to start, so just bear with me okay? I'm not good with words the way you deserve, but I'm going to try because you deserve the try.

This past year — the fights, the days we didn't talk, the silences that felt like forever — none of it changed a single thing about how I feel about you. Because in the end, we always came back to each other. Every single time. And I hope it stays like that forever. No matter how bad it gets, no matter how long the silence, I hope we always find our way back. I'm counting on it.

I want to be honest with you today of all days. I'm not perfect. I make mistakes and I know I frustrate you sometimes. But instead of being upset at me for it, please just help me be better. That's all I ask. Help me be better for you.

I won't pretend everything is perfect right now. I'm broke, I can't meet you, I feel like I'm not enough some days. But Sobia I am working so hard. Not for myself — for you. For us. For the life I keep imagining when I think about our future. I will be the man who takes care of you. I promise you that. Not someday in a vague way — I mean it, I'm working toward it every single day.

Before you, I was so lost. So confused. I used to ask Allah to guide me, to show me something, to give me a reason. And He gave me you. Out of billions of people in this chaotic world, I found you. The one who makes my soul feel at home. I don't know what I did to deserve that, but I'd choose you in every lifetime without thinking twice.

You are not the world, Sobia — but you are everything that makes the world good. Without you my life would still exist, but that's all it would manage to do.

I want you to know something. Being understood is more meaningful than being loved — and I want to give you both. I want to know your ins and outs, truly see you for who you are, and still choose you every single day. That's what you deserve. Someone who pays attention. Someone who notices your silence and knows what it means. I'm trying to be that person for you.

I want to make you so happy that you can't stop smiling sometimes. I want you to feel so loved that you never have to doubt anything for even a second.

You're the kind of girl I never saw coming. One second I didn't know you existed, and now I can't imagine existing without you. You feel like home. Not the building — the feeling. The one where I belong, where I was always supposed to be. I wasn't looking for anyone. And then there was you.

Sobia, you can't even imagine how much I love you. How much I think about you. How much I care.

This is your birthday, but honestly? I'm the one who got the gift.

Happy birthday my baby. Inshallah we will get married, have kids, build something beautiful together. Inshallah we will make it.

I LOVEEEE YOUUUU SOOOO MUCHHHH`;

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: "square" | "circle" | "heart";
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const STICKER_CONFIGS = [
  { img: img1, top: "5%",  left: "2%",   rot: "-10deg", dur: "3.2s", delay: "0s",   size: "130px" },
  { img: img2, top: "38%", right: "1%",  rot: "8deg",   dur: "2.8s", delay: "0.4s", size: "120px" },
  { img: img3, top: "62%", left: "1%",   rot: "-6deg",  dur: "3.5s", delay: "0.8s", size: "115px" },
  { img: img4, top: "15%", right: "2%",  rot: "12deg",  dur: "2.6s", delay: "0.2s", size: "110px" },
  { img: img5, top: "75%", right: "2%",  rot: "-9deg",  dur: "3.1s", delay: "1s",   size: "120px" },
];

const TWINKLE_STARS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 90}%`,
  size: `${6 + Math.random() * 8}px`,
  dur: `${1.5 + Math.random() * 2}s`,
  delay: `${Math.random() * 2}s`,
}));

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [flapAnimating, setFlapAnimating] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const confettiTimerRef = useRef<number | null>(null);

  const launchConfetti = useCallback(() => {
    const colors = ["#f06292", "#e91e8c", "#f8bbd9", "#ff80ab", "#fff176", "#80cbc4", "#ffb74d"];
    const shapes: ("square" | "circle" | "heart")[] = ["square", "circle", "heart"];
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 8,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.8,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setConfetti(pieces);
    confettiTimerRef.current = window.setTimeout(() => setConfetti([]), 4000);
  }, []);

  useEffect(() => {
    return () => {
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
    };
  }, []);

  const handleEnvelopeClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen || flapAnimating) return;

    // Add ripple
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (rect) {
      const ripple = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setRipples(prev => [...prev, ripple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== ripple.id)), 800);
    }

    // Add sparkles
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: 40 + Math.random() * 20,
      y: 40 + Math.random() * 20,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 900);

    setFlapAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
      setFlapAnimating(false);
      setTimeout(() => {
        setShowLetter(true);
        launchConfetti();
      }, 200);
    }, 600);
  }, [isOpen, flapAnimating, launchConfetti]);

  const handleClose = useCallback(() => {
    setShowLetter(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  }, []);

  const paragraphs = LETTER_TEXT.split("\n\n");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #fce4ec 50%, #fdf2f8 100%)" }}>

      {/* Background sparkle stars */}
      {TWINKLE_STARS.map(star => (
        <div
          key={star.id}
          className="twinkle absolute pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            "--dur": star.dur,
            "--delay": star.delay,
          } as React.CSSProperties}
        >
          <svg viewBox="0 0 24 24" fill="#f48fb1" opacity="0.6">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>
      ))}

      {/* Floating PNG stickers */}
      {STICKER_CONFIGS.map((sticker, i) => (
        <div
          key={i}
          className="sticker absolute pointer-events-none select-none"
          style={{
            top: sticker.top,
            ...("left" in sticker ? { left: (sticker as { left: string }).left } : {}),
            ...("right" in sticker ? { right: (sticker as { right: string }).right } : {}),
            "--rot": sticker.rot,
            "--duration": sticker.dur,
            "--delay": sticker.delay,
            width: sticker.size,
            transform: `rotate(${sticker.rot})`,
            zIndex: 1,
          } as React.CSSProperties}
        >
          <img
            src={sticker.img}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 3px 8px rgba(233,30,140,0.25))",
            }}
          />
        </div>
      ))}

      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.x}%`,
            width: piece.size,
            height: piece.shape === "heart" ? piece.size : piece.size,
            background: piece.shape !== "heart" ? piece.color : "transparent",
            borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "square" ? "2px" : "0",
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            fontSize: piece.shape === "heart" ? `${piece.size}px` : undefined,
            color: piece.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {piece.shape === "heart" ? "♥" : ""}
        </div>
      ))}

      {/* Main envelope section */}
      {!showLetter && (
        <div className="relative flex flex-col items-center gap-6 z-10 px-4">

          {/* Birthday heading */}
          <div className="text-center" style={{ animation: "fadeInUp 0.8s ease-out both" }}>
            <h1
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                color: "#c2185b",
                textShadow: "0 2px 12px rgba(194,24,91,0.2)",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
              }}
            >
              Happy Birthday, Sobia 🌸
            </h1>
            <p style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
              color: "#e57399",
              marginTop: "0.5rem",
              fontWeight: 500,
            }}>
              Something special is waiting for you...
            </p>
          </div>

          {/* Envelope */}
          <div
            ref={envelopeRef}
            className="ripple-container relative cursor-pointer select-none"
            onClick={handleEnvelopeClick}
            style={{
              width: "clamp(240px, 50vw, 340px)",
              height: "clamp(170px, 35vw, 240px)",
              filter: "drop-shadow(0 12px 30px rgba(233,30,140,0.25))",
              transition: "transform 0.2s ease, filter 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLDivElement).style.filter = "drop-shadow(0 16px 40px rgba(233,30,140,0.35))";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLDivElement).style.filter = "drop-shadow(0 12px 30px rgba(233,30,140,0.25))";
            }}
          >
            <EnvelopeSVG flapOpen={isOpen} flapAnimating={flapAnimating} />

            {/* Ripple effects */}
            {ripples.map(ripple => (
              <div
                key={ripple.id}
                className="ripple-effect"
                style={{ left: ripple.x, top: ripple.y }}
              />
            ))}

            {/* Sparkles on click */}
            {sparkles.map((sp, i) => (
              <div
                key={sp.id}
                className="sparkle-enter absolute pointer-events-none"
                style={{
                  left: `${sp.x + (i % 3 - 1) * 20}%`,
                  top: `${sp.y + (Math.floor(i / 2) - 1) * 20}%`,
                  fontSize: "1.3rem",
                }}
              >
                ✨
              </div>
            ))}
          </div>

          {/* Tap to open */}
          <div className="flex flex-col items-center gap-2">
            <p
              className="float-text"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                color: "#e91e8c",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              ✉️ Tap to open
            </p>
            <div style={{ fontSize: "0.85rem", color: "#f06292", fontFamily: "'Quicksand', sans-serif" }}>
              A letter just for you 💕
            </div>
          </div>
        </div>
      )}

      {/* Letter overlay */}
      {showLetter && (
        <div
          className="fixed inset-0 flex items-end sm:items-center justify-center z-50 px-0 sm:px-4 pb-0 sm:pb-4"
          style={{ background: "rgba(253, 242, 248, 0.92)", backdropFilter: "blur(8px)" }}
          onClick={e => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Letter paper */}
          <div
            ref={letterRef}
            className="letter-enter letter-paper letter-scroll relative w-full sm:max-w-lg overflow-y-auto"
            style={{
              maxHeight: "92vh",
              height: "92vh",
              borderRadius: "20px 20px 0 0",
              padding: "clamp(1.5rem, 5vw, 3rem) clamp(1.2rem, 4vw, 2.5rem)",
              border: "1px solid #f8bbd9",
              boxShadow: "0 -8px 40px rgba(233, 30, 140, 0.15), 0 0 0 1px rgba(248,187,217,0.5)",
              scrollBehavior: "smooth",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: "sticky",
                top: 0,
                float: "right",
                zIndex: 10,
                background: "rgba(255,255,255,0.9)",
                border: "1.5px solid #f8bbd9",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1rem",
                color: "#c2185b",
                boxShadow: "0 2px 8px rgba(194,24,91,0.15)",
                transition: "all 0.2s",
                marginBottom: "0.5rem",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fce4ec";
                (e.currentTarget as HTMLButtonElement).style.transform = "rotate(90deg)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.9)";
                (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg)";
              }}
            >
              ✕
            </button>

            {/* Decorative top */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem", clear: "both" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💌</div>
              <div style={{
                height: "2px",
                background: "linear-gradient(90deg, transparent, #f48fb1, transparent)",
                marginBottom: "0.5rem",
              }} />
              <div style={{ fontSize: "0.85rem", color: "#f06292", fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}>
                April 18th, 2025
              </div>
            </div>

            {/* Letter content */}
            <div style={{ position: "relative" }}>
              {/* Decorative stickers scattered around letter */}
              <span style={{ position: "absolute", top: "-10px", right: "10px", fontSize: "1.8rem", transform: "rotate(12deg)", opacity: 0.7 }}>🌸</span>
              <span style={{ position: "absolute", top: "120px", right: "-5px", fontSize: "1.5rem", transform: "rotate(-8deg)", opacity: 0.6 }}>💕</span>
              <span style={{ position: "absolute", top: "280px", left: "-8px", fontSize: "1.6rem", transform: "rotate(6deg)", opacity: 0.6 }}>🌹</span>
              <span style={{ position: "absolute", top: "500px", right: "-5px", fontSize: "1.4rem", transform: "rotate(10deg)", opacity: 0.65 }}>✨</span>
              <span style={{ position: "absolute", top: "700px", left: "-5px", fontSize: "1.5rem", transform: "rotate(-12deg)", opacity: 0.6 }}>🍉</span>

              {paragraphs.map((paragraph, i) => (
                <div key={i} style={{ marginBottom: "1.4rem" }}>
                  {i === 0 ? (
                    // First paragraph - big heading style
                    <p style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                      color: "#c2185b",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: "0.5rem",
                    }}>
                      {paragraph}
                    </p>
                  ) : i === 1 ? (
                    // "Happy birthday." - special styling
                    <p style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)",
                      color: "#e91e8c",
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}>
                      {paragraph}
                    </p>
                  ) : paragraph === "I LOVEEEE YOUUUU SOOOO MUCHHHH" ? (
                    // Emphatic line
                    <p style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                      color: "#c2185b",
                      fontWeight: 700,
                      textAlign: "center",
                      padding: "0.5rem",
                      background: "linear-gradient(135deg, #fce4ec, #fdf2f8)",
                      borderRadius: "12px",
                      border: "1.5px dashed #f8bbd9",
                      lineHeight: 1.4,
                    }}>
                      {paragraph}
                    </p>
                  ) : (
                    <p style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                      color: "#5d2a40",
                      lineHeight: 1.85,
                      fontWeight: 500,
                    }}>
                      {paragraph}
                    </p>
                  )}
                </div>
              ))}

              {/* Signature */}
              <div style={{
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px dashed #f8bbd9",
              }}>
                <p style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  color: "#c2185b",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}>
                  Yours,
                </p>
                <p style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                  color: "#e91e8c",
                  fontWeight: 700,
                }}>
                  Zeeshan 🍉
                </p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["💕", "🌸", "💌", "✨", "🥹"].map((emoji, i) => (
                    <span
                      key={i}
                      className="heartbeat"
                      style={{
                        fontSize: "1.5rem",
                        animationDelay: `${i * 0.3}s`,
                        display: "inline-block",
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom divider */}
            <div style={{
              height: "2px",
              background: "linear-gradient(90deg, transparent, #f48fb1, transparent)",
              marginTop: "1.5rem",
            }} />
            <div style={{
              textAlign: "center",
              marginTop: "0.75rem",
              fontSize: "0.85rem",
              color: "#f06292",
              fontFamily: "'Quicksand', sans-serif",
            }}>
              Made with love 💗
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EnvelopeSVG({ flapOpen, flapAnimating }: { flapOpen: boolean; flapAnimating: boolean }) {
  return (
    <svg
      viewBox="0 0 340 240"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="envBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8bbd9" />
          <stop offset="100%" stopColor="#f48fb1" />
        </linearGradient>
        <linearGradient id="envShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e91e8c" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#e91e8c" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f06292" />
          <stop offset="100%" stopColor="#f8bbd9" />
        </linearGradient>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#e91e8c" floodOpacity="0.2" />
        </filter>
        <clipPath id="envelopeClip">
          <rect x="10" y="10" width="320" height="220" rx="16" />
        </clipPath>
      </defs>

      {/* Envelope body */}
      <rect x="10" y="10" width="320" height="220" rx="16" fill="url(#envBody)" filter="url(#softShadow)" />

      {/* Bottom fold lines */}
      <path d="M10 230 L170 145 L330 230" fill="#f06292" opacity="0.35" clipPath="url(#envelopeClip)" />
      <path d="M10 10 L170 100" stroke="#f48fb1" strokeWidth="1.5" opacity="0.5" clipPath="url(#envelopeClip)" />
      <path d="M330 10 L170 100" stroke="#f48fb1" strokeWidth="1.5" opacity="0.5" clipPath="url(#envelopeClip)" />

      {/* Side triangles for 3d effect */}
      <path d="M10 10 L10 230 L170 145 Z" fill="#f48fb1" opacity="0.5" clipPath="url(#envelopeClip)" />
      <path d="M330 10 L330 230 L170 145 Z" fill="#f06292" opacity="0.45" clipPath="url(#envelopeClip)" />

      {/* Envelope flap */}
      <g
        style={{
          transformOrigin: "170px 10px",
          transformBox: "fill-box",
          animation: flapAnimating ? "envelopeFlap 0.6s ease-in-out forwards" : "none",
          transform: flapOpen ? "rotateX(-180deg)" : "rotateX(0deg)",
        }}
      >
        <path
          d="M10 10 L170 115 L330 10 Z"
          fill="url(#flapGrad)"
          stroke="#e91e8c"
          strokeWidth="1"
          clipPath="url(#envelopeClip)"
        />
        {/* Heart seal */}
        {!flapOpen && (
          <g transform="translate(160, 70)">
            <circle r="20" fill="white" opacity="0.9" />
            <circle r="20" fill="none" stroke="#e91e8c" strokeWidth="1.5" opacity="0.5" />
            <path
              d="M0 5 C0 0, -7 -8, -12 -5 C-17 -2, -17 5, -10 10 L0 20 L10 10 C17 5, 17 -2, 12 -5 C7 -8, 0 0, 0 5 Z"
              fill="#e91e8c"
              className="heartbeat"
            />
          </g>
        )}
      </g>

      {/* Envelope border */}
      <rect x="10" y="10" width="320" height="220" rx="16" fill="none" stroke="#e91e8c" strokeWidth="1.5" opacity="0.4" />

      {/* Small decorative dots */}
      {[30, 310].map((x, i) => (
        <circle key={i} cx={x} cy="200" r="3" fill="#e91e8c" opacity="0.3" />
      ))}
    </svg>
  );
}
