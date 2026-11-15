"use client";

import { useState, useEffect, useCallback } from "react";
import {
  GameState,
  Point,
  Move,
  createInitialState,
  getGoatMoves,
  getTigerMoves,
  applyMove,
  countTrappedTigers,
  getBestAIMove,
} from "@/lib/bagh-chal-engine";
import { useLanguage } from "@/context/LanguageContext";

// Simple Web Audio API Synthesizer for board sounds
class SoundEffects {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private getCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  toggle(enabled: boolean) {
    this.enabled = enabled;
  }

  playPlace() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(340, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  playCapture() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  }

  playWin() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    const notes = [261.63, 329.63, 392.0, 523.25];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.36);
    });
  }
}

const sounds = new SoundEffects();

// Precise 5-point grid coordinates in percentage and SVG units (viewBox 0 0 1000 1000)
// Step size is exactly 215 units (21.5%), with 70 units (7%) margin on all sides.
const GRID_COORDS = [70, 285, 500, 715, 930];
const GRID_PCT = [7.0, 28.5, 50.0, 71.5, 93.0];

export default function BaghChalGame() {
  const { language } = useLanguage();
  const isNepali = language === "ne";

  const [state, setState] = useState<GameState>(createInitialState());
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [gameMode, setGameMode] = useState<"ai-tiger" | "ai-goat" | "pvp">("ai-tiger");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Auto trigger AI move when it's AI turn
  const isAiTurn =
    !state.winner &&
    ((gameMode === "ai-tiger" && state.turn === "T") ||
      (gameMode === "ai-goat" && state.turn === "G"));

  const makeAiMove = useCallback(() => {
    if (state.winner) return;

    setIsAiThinking(true);
    setTimeout(() => {
      const aiMove = getBestAIMove(state, difficulty);
      if (aiMove) {
        if (aiMove.capture) {
          sounds.playCapture();
        } else {
          sounds.playPlace();
        }

        const next = applyMove(state, aiMove);
        setState(next);
        setSelectedPoint(null);

        if (next.winner) {
          sounds.playWin();
        }
      }
      setIsAiThinking(false);
    }, 450);
  }, [state, difficulty]);

  useEffect(() => {
    if (isAiTurn && !isAiThinking) {
      makeAiMove();
    }
  }, [isAiTurn, isAiThinking, makeAiMove]);

  // Compute valid moves for selected piece or placement
  const validMoves: Move[] = [];
  if (!state.winner && !isAiTurn) {
    if (state.turn === "G") {
      if (state.phase === "PLACEMENT") {
        validMoves.push(...getGoatMoves(state));
      } else if (selectedPoint) {
        validMoves.push(...getGoatMoves(state, selectedPoint));
      }
    } else {
      if (selectedPoint) {
        validMoves.push(...getTigerMoves(state, selectedPoint));
      }
    }
  }

  function handlePointClick(r: number, c: number) {
    if (state.winner || isAiTurn) return;

    const cellPiece = state.board[r][c];

    // CASE 1: Goat Placement Phase
    if (state.turn === "G" && state.phase === "PLACEMENT") {
      if (cellPiece === null) {
        sounds.playPlace();
        const next = applyMove(state, { from: null, to: { r, c } });
        setState(next);
        setSelectedPoint(null);
        if (next.winner) sounds.playWin();
      }
      return;
    }

    // CASE 2: Selecting own piece to move
    if (cellPiece === state.turn) {
      setSelectedPoint({ r, c });
      return;
    }

    // CASE 3: Making a move with currently selected piece
    if (selectedPoint) {
      const matchingMove = validMoves.find((m) => m.to.r === r && m.to.c === c);

      if (matchingMove) {
        if (matchingMove.capture) {
          sounds.playCapture();
        } else {
          sounds.playPlace();
        }

        const next = applyMove(state, matchingMove);
        setState(next);
        setSelectedPoint(null);
        if (next.winner) sounds.playWin();
      } else {
        setSelectedPoint(null);
      }
    }
  }

  function handleUndo() {
    if (state.history.length === 0 || isAiThinking) return;

    let steps = gameMode === "pvp" ? 1 : 2;
    if (state.history.length < steps) steps = state.history.length;

    const targetHistory = state.history.slice(0, state.history.length - steps);
    const lastEntry = targetHistory[targetHistory.length - 1];

    if (lastEntry) {
      setState({
        board: lastEntry.board,
        turn: lastEntry.turn,
        phase: lastEntry.phase,
        goatsPlaced: lastEntry.goatsPlaced,
        goatsCaptured: lastEntry.goatsCaptured,
        winner: null,
        history: targetHistory,
      });
    } else {
      setState(createInitialState());
    }
    setSelectedPoint(null);
  }

  function handleRestart() {
    setState(createInitialState());
    setSelectedPoint(null);
  }

  function toggleSound() {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.toggle(next);
  }

  const trappedTigers = countTrappedTigers(state);
  const goatsInHand = 20 - state.goatsPlaced;

  return (
    <div className="space-y-6">
      {/* Prominent Header Mentioning Shakya Bajracharya Samaj */}
      <div className="bg-gradient-to-r from-[#7a1f1f] via-[#a83232] to-[#7a1f1f] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-amber-400 text-center relative overflow-hidden">
        <div className="absolute inset-0 dharma-pattern opacity-40 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 rounded-full px-4 py-1 text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">
            <span>☸</span>
            <span>{isNepali ? "शाक्य बज्राचार्य समाज यल, ललितपुर" : "Shakya Bajracharya Samaj Yala"}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-300 drop-shadow">
            🐅 {isNepali ? "परम्परागत नेपाली खेल: बाघचाल" : "Traditional Nepali Game: Bagh Chal"} 🐐
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-amber-100 max-w-2xl mx-auto leading-relaxed">
            {isNepali
              ? "नेपालको प्राचीन मौलिक रणनीति खेल — ४ बाघ (Tigers) र २० बाख्रा (Goats) बीचको रोमाञ्चक बुद्धिमत्तापूर्ण प्रतिस्पर्धा ।"
              : "Ancient strategic board game of Nepal — an intellectual battle between 4 Tigers and 20 Goats, traditionally played in Newar Buddhist monastic courtyards."}
          </p>
        </div>
      </div>

      {/* Game Controls & Mode Selection */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Game Mode */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700">
            {isNepali ? "खेल मोड:" : "Mode:"}
          </span>
          {[
            { id: "ai-tiger" as const, label: isNepali ? "🐐 तपाईं (बाख्रा) vs 🐅 AI कम्प्युटर" : "🐐 You (Goats) vs 🐅 AI Tiger" },
            { id: "ai-goat" as const, label: isNepali ? "🐅 तपाईं (बाघ) vs 🐐 AI कम्प्युटर" : "🐅 You (Tigers) vs 🐐 AI Goat" },
            { id: "pvp" as const, label: isNepali ? "👥 २ खेलाडी (Pass & Play)" : "👥 2 Players (Local)" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setGameMode(m.id);
                handleRestart();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                gameMode === m.id
                  ? "bg-[color:var(--brand)] text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-amber-100"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* AI Difficulty & Actions */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {gameMode !== "pvp" && (
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none"
            >
              <option value="easy">{isNepali ? "स्तर: सजिलो (Easy)" : "Difficulty: Easy"}</option>
              <option value="medium">{isNepali ? "स्तर: मध्यम (Medium)" : "Difficulty: Medium"}</option>
              <option value="hard">{isNepali ? "स्तर: कठिन (Hard)" : "Difficulty: Hard"}</option>
            </select>
          )}

          <button
            onClick={handleUndo}
            disabled={state.history.length === 0 || isAiThinking}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition disabled:opacity-40"
            title="Undo Move"
          >
            ↩ {isNepali ? "चाल फिर्ता" : "Undo"}
          </button>

          <button
            onClick={handleRestart}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
          >
            🔄 {isNepali ? "नयाँ खेल" : "Restart"}
          </button>

          <button
            onClick={toggleSound}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs"
            title="Toggle Sound"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Turn Status */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3">
          <div className="text-3xl">
            {state.turn === "G" ? "🐐" : "🐅"}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              {isNepali ? "पालो (Current Turn)" : "Turn"}
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {state.turn === "G"
                ? isNepali ? "बाख्राको पालो (Goat)" : "Goat's Turn"
                : isNepali ? "बाघको पालो (Tiger)" : "Tiger's Turn"}
              {isAiThinking && (
                <span className="text-[10px] text-amber-700 animate-pulse ml-1">
                  (सोच्दै...)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Phase / Goats in hand */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3">
          <div className="text-3xl">📥</div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              {isNepali ? "राख्न बाँकी बाख्रा" : "Goats In Hand"}
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {goatsInHand > 0 ? `${goatsInHand} / 20` : isNepali ? "सबै राखियो (Movement)" : "All Placed"}
            </div>
          </div>
        </div>

        {/* Captured Goats */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3">
          <div className="text-3xl">🥩</div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              {isNepali ? "बाघले खाएको बाख्रा" : "Captured Goats"}
            </div>
            <div className="text-sm font-extrabold text-red-700">
              {state.goatsCaptured} / 5 {state.goatsCaptured >= 5 ? "🏆" : ""}
            </div>
          </div>
        </div>

        {/* Trapped Tigers */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3">
          <div className="text-3xl">🕸️</div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              {isNepali ? "थुनिएका बाघहरु" : "Trapped Tigers"}
            </div>
            <div className="text-sm font-extrabold text-emerald-700">
              {trappedTigers} / 4 {trappedTigers === 4 ? "🏆" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Winner Announcement Banner */}
      {state.winner && (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 p-6 rounded-3xl border-2 border-amber-600 shadow-2xl text-center space-y-2 animate-in zoom-in-95">
          <div className="text-5xl animate-bounce">
            {state.winner === "G" ? "🐐🎉" : "🐅🏆"}
          </div>
          <h2 className="text-2xl font-black text-slate-950">
            {state.winner === "G"
              ? isNepali ? "बाख्रा पक्षको शानदार विजय !" : "Goats Win The Game!"
              : isNepali ? "बाघ पक्षको शानदार विजय !" : "Tigers Win The Game!"}
          </h2>
          <p className="text-sm font-bold text-amber-950">
            {state.winReason}
          </p>
          <button
            onClick={handleRestart}
            className="mt-3 inline-block bg-[color:var(--brand)] text-white font-extrabold px-6 py-2.5 rounded-full shadow hover:bg-[color:var(--brand-dark)] text-xs uppercase tracking-wider transition"
          >
            🔄 {isNepali ? "फेरि खेल्नुहोस् (Play Again)" : "Play Again"}
          </button>
        </div>
      )}

      {/* EXACT ALIGNED BAGH CHAL BOARD */}
      <div className="flex justify-center my-4">
        {/* Outer Wooden/Bronze Frame */}
        <div className="relative p-4 sm:p-7 bg-[#2e1308] rounded-3xl shadow-2xl border-4 sm:border-8 border-[#52210c] w-full max-w-[500px] aspect-square flex items-center justify-center">
          {/* Inner Board Area with Texture */}
          <div className="relative w-full h-full bg-gradient-to-br from-[#dfb173] via-[#d49e59] to-[#c78d47] rounded-2xl border-4 border-[#6e2e0e] shadow-inner overflow-hidden">

            {/* SVG BOARD GRID LINES — Exact viewBox 0 0 1000 1000 */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 1000"
            >
              {/* Board Outer Boundary Rectangle connecting points (0,0) to (4,4) */}
              <rect
                x={GRID_COORDS[0]}
                y={GRID_COORDS[0]}
                width={GRID_COORDS[4] - GRID_COORDS[0]}
                height={GRID_COORDS[4] - GRID_COORDS[0]}
                fill="none"
                stroke="#4a1c07"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Horizontal Grid Lines (rows 1, 2, 3) */}
              {[1, 2, 3].map((r) => (
                <line
                  key={`h-${r}`}
                  x1={GRID_COORDS[0]}
                  y1={GRID_COORDS[r]}
                  x2={GRID_COORDS[4]}
                  y2={GRID_COORDS[r]}
                  stroke="#4a1c07"
                  strokeWidth="5"
                />
              ))}

              {/* Vertical Grid Lines (cols 1, 2, 3) */}
              {[1, 2, 3].map((c) => (
                <line
                  key={`v-${c}`}
                  x1={GRID_COORDS[c]}
                  y1={GRID_COORDS[0]}
                  x2={GRID_COORDS[c]}
                  y2={GRID_COORDS[4]}
                  stroke="#4a1c07"
                  strokeWidth="5"
                />
              ))}

              {/* Major Diagonals */}
              {/* (0,0) to (4,4) */}
              <line
                x1={GRID_COORDS[0]}
                y1={GRID_COORDS[0]}
                x2={GRID_COORDS[4]}
                y2={GRID_COORDS[4]}
                stroke="#4a1c07"
                strokeWidth="5"
              />
              {/* (0,4) to (4,0) */}
              <line
                x1={GRID_COORDS[4]}
                y1={GRID_COORDS[0]}
                x2={GRID_COORDS[0]}
                y2={GRID_COORDS[4]}
                stroke="#4a1c07"
                strokeWidth="5"
              />

              {/* Diamond Rhombus Lines connecting midpoints */}
              {/* Top-Mid (0,2) to Right-Mid (2,4) */}
              <line
                x1={GRID_COORDS[2]}
                y1={GRID_COORDS[0]}
                x2={GRID_COORDS[4]}
                y2={GRID_COORDS[2]}
                stroke="#4a1c07"
                strokeWidth="5"
              />
              {/* Right-Mid (2,4) to Bottom-Mid (4,2) */}
              <line
                x1={GRID_COORDS[4]}
                y1={GRID_COORDS[2]}
                x2={GRID_COORDS[2]}
                y2={GRID_COORDS[4]}
                stroke="#4a1c07"
                strokeWidth="5"
              />
              {/* Bottom-Mid (4,2) to Left-Mid (2,0) */}
              <line
                x1={GRID_COORDS[2]}
                y1={GRID_COORDS[4]}
                x2={GRID_COORDS[0]}
                y2={GRID_COORDS[2]}
                stroke="#4a1c07"
                strokeWidth="5"
              />
              {/* Left-Mid (2,0) to Top-Mid (0,2) */}
              <line
                x1={GRID_COORDS[0]}
                y1={GRID_COORDS[2]}
                x2={GRID_COORDS[2]}
                y2={GRID_COORDS[0]}
                stroke="#4a1c07"
                strokeWidth="5"
              />

              {/* Corner Sub-Diagonals */}
              {/* Top-Left: (0,2) to (2,0) */}
              <line
                x1={GRID_COORDS[2]}
                y1={GRID_COORDS[0]}
                x2={GRID_COORDS[0]}
                y2={GRID_COORDS[2]}
                stroke="#4a1c07"
                strokeWidth="5"
              />
              {/* Bottom-Right: (2,4) to (4,2) */}
              <line
                x1={GRID_COORDS[4]}
                y1={GRID_COORDS[2]}
                x2={GRID_COORDS[2]}
                y2={GRID_COORDS[4]}
                stroke="#4a1c07"
                strokeWidth="5"
              />

              {/* Decorative Crosshair Node Studs on all 25 intersections */}
              {GRID_COORDS.map((y, r) =>
                GRID_COORDS.map((x, c) => (
                  <g key={`stud-${r}-${c}`}>
                    <circle cx={x} cy={y} r="14" fill="#3a1606" />
                    <circle cx={x} cy={y} r="7" fill="#d4a017" />
                  </g>
                ))
              )}
            </svg>

            {/* 25 EXACTLY CENTERED INTERSECTION NODES (Absolute Positioning at Crossing of Lines) */}
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
              {[0, 1, 2, 3, 4].map((r) =>
                [0, 1, 2, 3, 4].map((c) => {
                  const piece = state.board[r][c];
                  const isSelected = selectedPoint?.r === r && selectedPoint?.c === c;
                  const isValidTarget = validMoves.some((m) => m.to.r === r && m.to.c === c);

                  return (
                    <div
                      key={`point-${r}-${c}`}
                      onClick={() => handlePointClick(r, c)}
                      style={{
                        left: `${GRID_PCT[c]}%`,
                        top: `${GRID_PCT[r]}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className="absolute z-20 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer group"
                    >
                      {/* Hover Target Indicator */}
                      <div className="absolute w-6 h-6 rounded-full bg-amber-900/10 group-hover:bg-amber-800/30 transition pointer-events-none" />

                      {/* Valid Move Indicator Marker */}
                      {isValidTarget && (
                        <>
                          <div className="absolute w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-emerald-500/40 border-2 border-emerald-500 animate-ping pointer-events-none" />
                          {piece === null && (
                            <div className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-600 shadow-md ring-2 ring-white" />
                          )}
                        </>
                      )}

                      {/* TIGER PIECE 🐅 — Centered exactly at crossing */}
                      {piece === "T" && (
                        <div
                          className={`relative z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border-2 border-amber-950 shadow-2xl flex items-center justify-center text-xl sm:text-2xl select-none transition transform ${
                            isSelected
                              ? "scale-125 ring-4 ring-amber-300 ring-offset-2 animate-bounce shadow-amber-900/80"
                              : "group-hover:scale-110"
                          }`}
                        >
                          <span className="drop-shadow">🐅</span>
                        </div>
                      )}

                      {/* GOAT PIECE 🐐 — Centered exactly at crossing */}
                      {piece === "G" && (
                        <div
                          className={`relative z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-slate-100 via-stone-200 to-slate-400 border-2 border-slate-800 shadow-xl flex items-center justify-center text-base sm:text-lg select-none transition transform ${
                            isSelected
                              ? "scale-125 ring-4 ring-emerald-400 ring-offset-2 animate-bounce"
                              : "group-hover:scale-110"
                          }`}
                        >
                          <span className="drop-shadow">🐐</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Guide & Rules Accordion / Card */}
      <div className="bg-white rounded-3xl border border-amber-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-extrabold text-[color:var(--brand)] flex items-center gap-2">
          <span>📖</span>
          <span>{isNepali ? "बाघचाल कसरी खेल्ने? (Bagh Chal Quick Rules)" : "How To Play Bagh Chal"}</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 text-xs text-slate-700">
          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
            <b className="text-amber-950 block text-sm">१. बाख्रा राख्ने चरण (Placement):</b>
            <p>
              {isNepali
                ? "सुरुमा ४ कुनामा ४ वटा बाघ हुन्छन्। बाख्राले खाली रेखाको विन्दुमा १-१ गरी २० वटै बाख्रा नराखुन्जेल बाख्रा हिडाउन मिल्दैन।"
                : "The game starts with 4 tigers at the 4 corners. Goats place 20 pieces one-by-one on any line intersection before moving."}
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
            <b className="text-amber-950 block text-sm">२. बाघको चाल र शिकार (Tigers Jump):</b>
            <p>
              {isNepali
                ? "बाघ १ पाइला खाली विन्दुमा सर्न सक्छ वा बाख्रालाई नाघेर सीधा रेखामा रहेको अर्को खाली विन्दुमा उफ्रिएर बाख्रा खान सक्छ।"
                : "Tigers move 1 step along line intersections, or jump over an adjacent goat into an immediately following empty crosshair to capture it."}
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
            <b className="text-amber-950 block text-sm">३. जितको नियम (Winning Conditions):</b>
            <p>
              {isNepali
                ? "बाघले ५ बाख्रा खाएमा बाघ जित्छ। बाख्राले चारैतिरबाट घेरेर ४ वटै बाघलाई कुनै पनि चाल चाल्न नसक्ने गरी थुनेमा बाख्रा जित्छ।"
                : "Tigers win if they capture 5 goats. Goats win if they encircle and trap all 4 tigers so they have zero legal moves."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
