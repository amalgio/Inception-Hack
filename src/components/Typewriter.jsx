import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export default function Typewriter({
  text = "",
  typeSpeed = 40,
  onComplete,
  className,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setDisplayedText("");
    let currentIndex = 0;
    
    intervalRef.current = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        onCompleteRef.current?.();
      }
    }, typeSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, typeSpeed]);

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {displayedText}
      <span className="inline-block w-[3px] h-[1.1em] bg-[#ff5500] ml-1 align-middle animate-[blink-caret_0.75s_step-end_infinite] shadow-[0_0_8px_#ff5500]" />
    </span>
  );
}
