"use client";

import { useState, useRef, memo, useCallback } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
}

type StarItemProps = {
  index: number;
  displayValue: number;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function statusFor(value: number, index: number) {
  if (value >= index + 1) return 2;
  if (value >= index + 0.5) return 1;
  return 0;
}

const StarItem = memo(function StarItem({
  index,
  displayValue,
  onMouseMove,
  onClick,
}: StarItemProps) {
  const s = statusFor(displayValue, index);
  const isFull = s === 2;
  const isHalf = s === 1;
  return (
    <div
      data-index={index}
      className="relative cursor-pointer"
      onMouseMove={onMouseMove}
      onClick={onClick}
    >
      <Star className="h-6 w-6 text-muted-foreground/20 fill-none stroke-[1.5]" />
      {(isFull || isHalf) && (
        <div className={cn("absolute inset-0 overflow-hidden", isHalf ? "w-[50%]" : "w-full")}>
          <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
        </div>
      )}
    </div>
  );
}, (prev, next) => {
  if (prev.index !== next.index) return false;
  return statusFor(prev.displayValue, prev.index) === statusFor(next.displayValue, next.index);
});

export function RatingInput({
  value,
  onChange,
  max = 5,
  className,
}: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const hoverRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const idx = Number(target.dataset.index || 0);
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const next = idx + (isHalf ? 0.5 : 1);
    if (hoverRef.current === next) return;
    hoverRef.current = next;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setHoverValue(hoverRef.current);
    });
  }, []);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const idx = Number(target.dataset.index || 0);
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    onChange(idx + (isHalf ? 0.5 : 1));
  }, [onChange]);

  return (
    <div
      className={cn("flex items-center gap-1 select-none", className)}
      onMouseLeave={() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        hoverRef.current = null;
        setHoverValue(null);
      }}
    >
      {[...Array(max)].map((_, i) => (
        <StarItem
          key={i}
          index={i}
          displayValue={displayValue}
          onMouseMove={onMouseMove}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
