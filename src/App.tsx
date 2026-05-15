/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Box, Monitor, Info, Download, AlignLeft, Send, Layout, Layers } from 'lucide-react';
import { toPng } from 'html-to-image';

type TemplateType = 'classic' | 'poetic' | 'zen' | 'kruger' | 'ledger' | 'manifesto' | 'holzer' | 'wool' | 'ruscha' | 'depth' | 'stream' | 'cyber' | 'kinetic' | 'bubble' | 'floating';

const TEMPLATES: { id: TemplateType; name: string; icon: any; emoji: string }[] = [
  { id: 'classic', name: '素雅极简', icon: Info, emoji: '📖' },
  { id: 'ruscha', name: '日出地平线', icon: Sparkles, emoji: '🌅' },
  { id: 'kinetic', name: '动感光束', icon: Zap, emoji: '☄️' },
  { id: 'bubble', name: '泡泡3D', icon: Box, emoji: '🫧' },
  { id: 'floating', name: '悬浮空间', icon: Layers, emoji: '🌌' },
  { id: 'depth', name: '电影深度', icon: Box, emoji: '🧊' },
  { id: 'poetic', name: '叙事人文', icon: Sparkles, emoji: '🎬' },
  { id: 'zen', name: '禅意空灵', icon: Layers, emoji: '🎋' },
  { id: 'kruger', name: '红色宣言', icon: Box, emoji: '🟥' },
  { id: 'holzer', name: '直白真言', icon: Monitor, emoji: '📟' },
  { id: 'wool', name: '油漆模版', icon: Zap, emoji: '🏁' },
  { id: 'stream', name: '极速流线', icon: Zap, emoji: '⚡️' },
  { id: 'cyber', name: '赛博错位', icon: Monitor, emoji: '🎮' },
  { id: 'manifesto', name: '极简黑调', icon: Layout, emoji: '📢' },
];

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('classic');
  const [lines, setLines] = useState([
    "越过星河的暗岸",
    "倾听时间的潮汐",
    "宇宙在静默中交织成诗"
  ]);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!captureRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        backgroundColor: 
          (activeTemplate === 'classic' || activeTemplate === 'poetic' || activeTemplate === 'zen' || activeTemplate === 'wool' || activeTemplate === 'kinetic') ? '#ffffff' : 
          activeTemplate === 'ledger' ? '#e5e5e5' : 
          activeTemplate === 'ruscha' ? '#b21f1f' : 
          activeTemplate === 'kruger' ? '#ff0000' :
          activeTemplate === 'bubble' ? '#e0e7ff' :
          activeTemplate === 'manifesto' ? '#111111' : '#000000',
      });
      const link = document.createElement('a');
      link.download = `GreatCover-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!captureRef.current) return;
    setIsCopying(true);
    try {
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        backgroundColor: 
          (activeTemplate === 'classic' || activeTemplate === 'poetic' || activeTemplate === 'zen' || activeTemplate === 'wool' || activeTemplate === 'kinetic') ? '#ffffff' : 
          activeTemplate === 'ledger' ? '#e5e5e5' : 
          activeTemplate === 'ruscha' ? '#b21f1f' : 
          activeTemplate === 'kruger' ? '#ff0000' :
          activeTemplate === 'bubble' ? '#e0e7ff' :
          activeTemplate === 'manifesto' ? '#111111' : '#000000',
      });
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      // Use standard alert if browser allows, or just set a temporary state for feedback
    } catch (err) {
      console.error('Clipboard error:', err);
    } finally {
      setIsCopying(false);
    }
  };

  const updateLine = (index: number, val: string) => {
    const newLines = [...lines];
    newLines[index] = val;
    setLines(newLines);
  };

  const renderTemplateContent = () => {
    switch (activeTemplate) {
      case 'classic':
        return (
          <div className="flex flex-col items-center text-center space-y-4 max-w-[80%] mx-auto">
            <div className="classic-title-1">{lines[0] || " "}</div>
            <div className="classic-title-2 ml-3">{lines[1] || " "}</div>
            <div className="classic-title-3 mt-2">{lines[2] || " "}</div>
          </div>
        );
      case 'depth':
        return (
          <motion.div 
            initial={{ rotateY: 20, rotateX: 5, scale: 0.95 }}
            animate={{ rotateY: 15, rotateX: 5, scale: 1.02 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="flex flex-col items-start text-left -ml-5 perspect-1000 max-w-[80%]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="depth-title-1 mb-2 leading-tight">{lines[0] || " "}</div>
            <div className="depth-title-2 mb-4 leading-tight">{lines[1] || " "}</div>
            <div className="depth-line pt-3 inline-block">
              <span className="text-[#b0a496] text-xl tracking-[8px] uppercase">{lines[2] || " "}</span>
            </div>
          </motion.div>
        );
      case 'stream':
        return (
          <div className="flex flex-col items-center text-center space-y-3 max-w-[80%] mx-auto">
            <div className="stream-text">
              <div className="stream-glow" />
              {lines[0] || " "}
            </div>
            <div className="stream-text stream-text-main">
              <div className="stream-glow" />
              {lines[1] || " "}
            </div>
            <div className="stream-text text-lg text-slate-400 skew-x-0 tracking-[6px]">
              {lines[2] || " "}
            </div>
          </div>
        );
      case 'cyber':
        return (
          <div className="flex flex-col items-center text-center space-y-2 max-w-[80%] mx-auto">
            <div className="cyber-text">{lines[0] || " "}</div>
            <div className="cyber-text cyber-text-main">{lines[1] || " "}</div>
            <div className="cyber-sub mt-2">{lines[2] || " "}</div>
          </div>
        );
      case 'poetic':
        return (
          <div className="poetic-content relative px-10">
            <div className="poetic-red-dot" />
            <div className="poetic-line-1">{lines[0]}</div>
            <div className="poetic-line-2 max-w-[90%]">{lines[1]}</div>
            <div className="poetic-line-3">{lines[2]}</div>
            <div className="poetic-tag">
              良言集 / Poetic Archive
            </div>
          </div>
        );
      case 'zen':
        return (
          <div className="zen-content w-full h-full flex flex-col justify-center">
            <div className="zen-line zen-line-1">{lines[0]}</div>
            <div className="zen-line zen-line-2">{lines[1]}</div>
            <div className="zen-line zen-line-3">{lines[2]}</div>
          </div>
        );
      case 'kruger':
        return (
          <div className="kruger-content">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="kruger-line">{lines[0]}</motion.div>
            <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="kruger-line">{lines[1]}</motion.div>
            <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="kruger-line">{lines[2]}</motion.div>
          </div>
        );
      case 'ledger':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="ledger-frame">
              <div className="ledger-line-1">归档编号 / Ledger No. {Date.now().toString().slice(-4)}</div>
              <div className="ledger-line-2">{lines[1] || lines[0]}</div>
              <div className="ledger-line-3">{lines[2]}</div>
            </div>
          </div>
        );
      case 'manifesto':
        return (
          <div className="w-full h-full flex flex-col items-start justify-center px-12 overflow-hidden select-none">
            <span className="manifesto-meta">独立宣言 / MANIFESTO {Date.now().toString().slice(-4)}</span>
            <motion.div 
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="manifesto-line"
            >
              {lines[1] || lines[0]}
            </motion.div>
            <div className="text-white/20 font-mono text-xs tracking-widest mt-6 uppercase">
              {lines[2]}
            </div>
          </div>
        );
      case 'holzer':
        return (
          <div className="holzer-content relative">
            <div className="holzer-scanlines" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="z-10"
            >
              <div className="holzer-line">{lines[0]}</div>
              <div className="holzer-line text-5xl shadow-green-500/20">{lines[1]}</div>
              <div className="holzer-line text-sm opacity-60">{lines[2]}</div>
            </motion.div>
          </div>
        );
      case 'wool':
        return (
          <div className="wool-content">
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col gap-0"
            >
              <div className="wool-line">{lines[0]}</div>
              <div className="wool-line">{lines[1]}</div>
              <div className="wool-line text-3xl mt-4 border-t-4 border-black pt-2">{lines[2]}</div>
            </motion.div>
          </div>
        );
      case 'ruscha':
        return (
          <div className="ruscha-content">
            <motion.div 
              initial={{ letterSpacing: '40px', opacity: 0 }}
              animate={{ letterSpacing: '15px', opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="ruscha-line"
            >
              {lines[1] || lines[0]}
            </motion.div>
          </div>
        );
      case 'kinetic':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-2">
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="kinetic-text"
              >
                {lines[0]}
              </motion.div>
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="kinetic-text"
              >
                {lines[1]}
              </motion.div>
            </div>
            {/* Motion Streaks inspired by the reference */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="kinetic-streak"
                initial={{ x: -200, width: 0 }}
                animate={{ 
                  x: [null, 1200], 
                  width: [0, 400, 0],
                  top: `${20 + i * 15}%`,
                  left: i % 2 === 0 ? '-10%' : '110%',
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        );
      case 'bubble':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-1, 1, -1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bubble-text"
            >
              {lines[1] || lines[0]}
              <div className="bubble-glow top-0 left-0" />
            </motion.div>
            <motion.div 
              animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-indigo-400 font-mono text-sm tracking-[10px] mt-8 uppercase"
            >
              {lines[2]}
            </motion.div>
          </div>
        );
      case 'floating':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
            <div className="flex flex-col gap-6 items-center">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ z: -200, opacity: 0, rotateX: 45 }}
                  animate={{ 
                    z: 0, 
                    opacity: 1, 
                    rotateX: 0,
                    y: [0, i % 2 === 0 ? 5 : -5, 0]
                  }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.2,
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="floating-word text-4xl lg:text-6xl text-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#121212]">
      {/* Decorative Brand Text */}
      <div className="fixed top-8 left-8 flex items-center gap-2 text-white/20 select-none">
        <Sparkles className="w-4 h-4" />
        <span className="text-xs font-mono tracking-widest uppercase text-white/40">好封面 Great Cover / Art Pro</span>
      </div>

      <div className="w-full max-w-[1200px] grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start pt-10">
        {/* Main Preview Area */}
        <div className="flex flex-col items-center gap-8 sticky top-10">
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <motion.div 
              ref={captureRef}
              layout
              id="capture-area"
              className={`w-full aspect-[2.35/1] relative overflow-hidden rounded-xl shadow-2xl flex items-center justify-center transition-all duration-700 ease-in-out tpl-${activeTemplate} border border-white/5`}
            >
            <div className="art-grain" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTemplate + lines.join('')}
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="z-10 w-full h-full flex items-center justify-center"
              >
                {renderTemplateContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          </div>

          {/* Context Hint */}
          <div className="flex items-center gap-4 text-[10px] text-white/20 uppercase tracking-[2px] font-mono">
            <div className="flex gap-1">
              <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">ALT</span>
              <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">C</span>
            </div>
            <span>Quick Capture Selector</span>
          </div>

          {/* Template Selection */}
          <div className="bg-[rgba(20,20,20,0.85)] border border-white/10 backdrop-blur-2xl px-6 py-2 rounded-full flex gap-2 items-center shadow-2xl overflow-x-auto max-w-[90vw] no-scrollbar">
            <div className="flex gap-2 min-w-max">
              {TEMPLATES.map((tpl) => {
                const isActive = activeTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setActiveTemplate(tpl.id)}
                    className={`
                      px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                      ${isActive 
                        ? 'bg-white text-black shadow-lg scale-105' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'}
                    `}
                  >
                    <span className="text-sm">{tpl.emoji}</span>
                    {tpl.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editor Sidebar */}
        <div className="flex flex-col gap-8 bg-[#1a1c23]/80 backdrop-blur-[40px] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between border-b border-white/5 pb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,1)]" />
              <h2 className="text-[10px] font-mono uppercase tracking-[3px] text-white/60">封面内容 / Content</h2>
            </div>
            <Layout className="w-4 h-4 text-white/10" />
          </div>

          <div className="space-y-8 relative z-10">
            {lines.map((line, idx) => (
              <div key={idx} className="space-y-3 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-mono uppercase tracking-[2px] text-gray-500 group-focus-within:text-white transition-all duration-500">
                    字段 / Field 0{idx + 1}
                  </label>
                  <div className="h-[1px] flex-1 mx-4 bg-white/5 group-focus-within:bg-white/10 transition-all duration-700" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => updateLine(idx, e.target.value)}
                    placeholder={`输入内容 / Enter content ${idx + 1}...`}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:border-white/20 focus:bg-black/80 transition-all duration-500 placeholder:text-gray-800"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-4 bg-white/5 group-focus-within:bg-white/40 transition-all" />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 relative z-10 grid grid-cols-2 gap-4">
            <button
              onClick={handleCopyToClipboard}
              disabled={isCopying}
              className={`
                py-4 rounded-2xl font-bold text-[9px] uppercase tracking-[2px] flex items-center justify-center gap-2 transition-all duration-500
                ${isCopying 
                  ? 'bg-white/5 text-gray-600' 
                  : 'bg-white/10 text-white hover:bg-white/20'}
              `}
            >
              <Send className="w-3 h-3" />
              {isCopying ? '处理中...' : '复制图片 / Copy'}
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className={`
                py-4 rounded-2xl font-bold text-[9px] uppercase tracking-[2px] flex items-center justify-center gap-2 transition-all duration-700
                ${isExporting 
                  ? 'bg-white/5 text-gray-600 cursor-wait' 
                  : 'bg-white text-black hover:bg-gray-200 shadow-xl'}
              `}
            >
              <Download className="w-3 h-3" />
              {isExporting ? '处理中...' : '导出封面 / Save'}
            </button>
          </div>
          <p className="text-center text-white/10 text-[8px] mt-8 uppercase tracking-[5px] font-mono select-none">
            Artifact.Raster_Engine v2.04.12
          </p>
        </div>
      </div>
    </div>
  );
}
