// components/P5Canvas.tsx
'use client';

import p5 from 'p5';
import { useEffect, useRef } from 'react';

const P5Canvas = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(400, 400);
      };

      p.draw = () => {
        p.background(220);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
      };
    };

    if (sketchRef.current) {
      const p5Instance = new p5(sketch, sketchRef.current);

      return () => {
        p5Instance.remove();
      };
    }
  }, []);

  return <div ref={sketchRef} />;
};

export default P5Canvas;
