"use client";

import { useRef } from "react";

export default function OtpInput({
  value,
  onChange,
  onComplete,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
}) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(5, " ").split("").slice(0, 5);

  function setDigit(index: number, char: string) {
    const chars = value.padEnd(5, " ").split("");
    chars[index] = char;
    const next = chars.join("").replace(/ /g, "").slice(0, 5);
    onChange(next);
    if (next.length === 5) onComplete?.(next);
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit) {
      setDigit(index, "");
      return;
    }
    setDigit(index, digit);
    if (index < 4) inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index].trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    if (pasted.length === 5) {
      onComplete?.(pasted);
      inputsRef.current[4]?.focus();
    } else {
      inputsRef.current[pasted.length]?.focus();
    }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      {digits.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={char.trim()}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-semibold rounded-xl border border-madin-line bg-white text-madin-navy outline-none focus:border-madin-orange focus:ring-2 focus:ring-madin-orange/30 transition-colors disabled:opacity-50"
        />
      ))}
    </div>
  );
}
