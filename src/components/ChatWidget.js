"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobot2Fill } from "react-icons/ri";

const STARTER_PROMPTS = [
  "What projects has Irfan built?",
  "What's his tech stack?",
  "Is he available for freelance?",
];

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm Irfan's portfolio assistant. Ask me about his projects, skills, or experience.",
};

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "10px 12px" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--primary)",
            display: "inline-block",
          }}
        />
      ))}
    </div>
  );
}

function Avatar({ isUser }) {
  if (isUser) return null;
  return (
    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--primary), #b98f00)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#171717",
        flexShrink: 0,
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      <RiRobot2Fill size={15} />
    </div>
  );
}

// Parses a line for **bold** segments and returns React nodes.
function renderInline(text, keyPrefix) {
  const parts = text.split(/(\*\*.+?\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${i}`} style={{ fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={`${keyPrefix}-${i}`}>{part}</React.Fragment>;
  });
}

// Lightweight markdown: supports **bold** and "- " bullet lists, line by line.
// Avoids pulling in a full markdown library for a small chat widget.
function FormattedMessage({ content }) {
  const lines = content.split("\n");
  const blocks = [];
  let currentList = [];

  const flushList = (key) => {
    if (currentList.length) {
      blocks.push(
        <ul key={`ul-${key}`} style={{ margin: "4px 0", paddingLeft: 18 }}>
          {currentList.map((item, i) => (
            <li key={i} style={{ marginBottom: 2 }}>
              {renderInline(item, `li-${key}-${i}`)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.slice(2));
    } else {
      flushList(idx);
      if (trimmed.length > 0) {
        blocks.push(<div key={`line-${idx}`}>{renderInline(line, `line-${idx}`)}</div>);
      } else {
        blocks.push(<div key={`gap-${idx}`} style={{ height: 4 }} />);
      }
    }
  });
  flushList("end");

  return <>{blocks}</>;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setHasOpenedOnce(true);
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Mobile keyboards shrink the visual viewport without shrinking window.innerHeight,
  // so a fixed-position panel using vh units gets covered by the keyboard.
  // Tracking visualViewport lets us lift the panel to sit right above the keyboard.
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    const vv = window.visualViewport;
    const handleResize = () => {
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      setKeyboardOffset(offset > 60 ? offset : 0);
    };
    vv.addEventListener("resize", handleResize);
    vv.addEventListener("scroll", handleResize);
    handleResize();
    return () => {
      vv.removeEventListener("resize", handleResize);
      vv.removeEventListener("scroll", handleResize);
    };
  }, []);

  async function sendMessage(text) {
    const content = text ?? input;
    if (!content.trim() || loading) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error — please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed z-[60] right-4 sm:right-6 bottom-[76px] lg:bottom-6">
        {/* Ambient pulse ring — draws the eye before first open */}
        {!hasOpenedOnce && (
          <motion.span
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "var(--primary)",
              pointerEvents: "none",
            }}
          />
        )}
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.08, rotate: open ? 0 : -4 }}
          whileTap={{ scale: 0.92 }}
          animate={!open ? { y: [0, -5, 0] } : { y: 0 }}
          transition={!open ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
          aria-label="Open chat"
          style={{
            position: "relative",
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "linear-gradient(145deg, var(--primary), #e0b800)",
            color: "#171717",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.div
                key="robot"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: [0, -6, 6, -3, 0],
                }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{
                  scale: { duration: 0.18 },
                  opacity: { duration: 0.18 },
                  rotate: { duration: 4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" },
                }}
                style={{ display: "flex" }}
              >
                <RiRobot2Fill size={27} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[60] right-4 sm:right-6 bottom-[146px] lg:bottom-24"
            style={{
              zIndex: 60,
              bottom: keyboardOffset > 0 ? keyboardOffset + 8 : undefined,
              width: "min(370px, calc(100vw - 32px))",
              height:
                keyboardOffset > 0
                  ? `min(420px, calc(100dvh - ${keyboardOffset + 90}px))`
                  : "min(500px, calc(100dvh - 160px))",
              maxHeight: keyboardOffset > 0 ? "70dvh" : undefined,
              borderRadius: 20,
              border: "1px solid var(--border-color)",
              background: "var(--card-bg)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid var(--border-color)",
                background: "linear-gradient(135deg, var(--primary), #e0b800)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#171717",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RiRobot2Fill size={19} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#171717" }}>
                  Irfan&apos;s Assistant
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "#171717",
                    opacity: 0.75,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#1a7f37",
                      display: "inline-block",
                    }}
                  />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="custom-scrollbar"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 6,
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      flexDirection: m.role === "user" ? "row-reverse" : "row",
                      maxWidth: "88%",
                    }}
                  >
                    <Avatar isUser={m.role === "user"} />
                    <div
                      style={{
                        background:
                          m.role === "user"
                            ? "linear-gradient(135deg, var(--primary), #e0b800)"
                            : "var(--card-bg-secondary)",
                        color: m.role === "user" ? "#171717" : "var(--foreground)",
                        padding: "9px 13px",
                        borderRadius: m.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                        fontSize: 13.5,
                        lineHeight: 1.45,
                        whiteSpace: "pre-wrap",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                      }}
                    >
                      <FormattedMessage content={m.content} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 6,
                    alignSelf: "flex-start",
                  }}
                >
                  <Avatar isUser={false} />
                  <div
                    style={{
                      background: "var(--card-bg-secondary)",
                      borderRadius: "14px 14px 14px 3px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {messages.length > 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  style={{ display: "flex", justifyContent: "center", marginTop: 4 }}
                >
                  <motion.button
                    onClick={resetChat}
                    whileHover={{ scale: 1.03, color: "var(--primary)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--foreground)",
                      opacity: 0.55,
                      cursor: "pointer",
                      padding: "6px 10px",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    End conversation
                  </motion.button>
                </motion.div>
              )}

              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}
                >
                  {STARTER_PROMPTS.map((p, i) => (
                    <motion.button
                      key={p}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      whileHover={{ scale: 1.02, borderColor: "var(--primary)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(p)}
                      style={{
                        textAlign: "left",
                        fontSize: 12.5,
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid var(--border-color)",
                        background: "transparent",
                        color: "var(--foreground)",
                        cursor: "pointer",
                      }}
                    >
                      {p}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              style={{
                display: "flex",
                gap: 8,
                padding: 10,
                borderTop: "1px solid var(--border-color)",
                background: "var(--card-bg)",
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my work…"
                maxLength={800}
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--border-color)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: 16,
                  outline: "none",
                }}
              />
              <motion.button
                whileHover={{ scale: loading || !input.trim() ? 1 : 1.06 }}
                whileTap={{ scale: loading || !input.trim() ? 1 : 0.92 }}
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  width: 38,
                  height: 38,
                  flexShrink: 0,
                  borderRadius: 10,
                  border: "none",
                  background: "linear-gradient(135deg, var(--primary), #e0b800)",
                  color: "#171717",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  opacity: loading || !input.trim() ? 0.5 : 1,
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}