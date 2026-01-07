"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    if (checks.length) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500", "bg-green-600"];

    return {
      score,
      label: labels[Math.min(score, 5)],
      color: colors[Math.min(score, 5)],
      checks,
    };
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-charcoal/70">Password Strength</span>
        <span className={`font-semibold ${strength.color.replace("bg-", "text-")}`}>
          {strength.label}
        </span>
      </div>
      <div className="w-full bg-charcoal/10 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        />
      </div>
      <div className="space-y-1 text-xs text-charcoal/60">
        <div className={`flex items-center gap-2 ${strength.checks.length ? "text-green-600" : ""}`}>
          {strength.checks.length ? (
            <Check className="w-3 h-3" />
          ) : (
            <X className="w-3 h-3" />
          )}
          <span>At least 8 characters</span>
        </div>
        <div className={`flex items-center gap-2 ${strength.checks.uppercase ? "text-green-600" : ""}`}>
          {strength.checks.uppercase ? (
            <Check className="w-3 h-3" />
          ) : (
            <X className="w-3 h-3" />
          )}
          <span>One uppercase letter</span>
        </div>
        <div className={`flex items-center gap-2 ${strength.checks.lowercase ? "text-green-600" : ""}`}>
          {strength.checks.lowercase ? (
            <Check className="w-3 h-3" />
          ) : (
            <X className="w-3 h-3" />
          )}
          <span>One lowercase letter</span>
        </div>
        <div className={`flex items-center gap-2 ${strength.checks.number ? "text-green-600" : ""}`}>
          {strength.checks.number ? (
            <Check className="w-3 h-3" />
          ) : (
            <X className="w-3 h-3" />
          )}
          <span>One number</span>
        </div>
        <div className={`flex items-center gap-2 ${strength.checks.special ? "text-green-600" : ""}`}>
          {strength.checks.special ? (
            <Check className="w-3 h-3" />
          ) : (
            <X className="w-3 h-3" />
          )}
          <span>One special character</span>
        </div>
      </div>
    </div>
  );
}

