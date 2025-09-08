// components/P5Sketch.js
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Sketch = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(400, 400);
      };

      p.draw = () => {
        p.background(220);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
      };
    };

    let p5Instance = new p5(sketch, sketchRef.current);

    // コンポーネントがアンマウントされたときにインスタンスを削除
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default P5Sketch;