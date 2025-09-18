// components/ShaderViewer.tsx

'use client';

import p5 from 'p5';
import { useEffect, useRef } from 'react';

interface ShaderViewerProps {
  vertCode: string;
  fragCode: string;
}

const ShaderViewer = ({ vertCode, fragCode }: ShaderViewerProps) => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let myShader: p5.Shader;

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(200, 200, p.WEBGL);

        myShader = p.createShader(vertCode, fragCode);
        p.shader(myShader);

        // shaderコンパイルエラー取得
        //
      };

      p.draw = () => {
        p.background(220);

        myShader.setUniform('u_time', p.millis() / 1000.0);
        p.noStroke();
        p.shader(myShader);
        p.quad(-1, -1, -1, 1, 1, 1, 1, -1);
        p.resetShader();
      };

      // p.resizeCanvas = () => {
      //   p.resizeCanvas(p.windowWidth, p.windowHeight);
      // };
    };

    if (sketchRef.current) {
      const p5Instance = new p5(sketch, sketchRef.current);

      return () => {
        p5Instance.remove();
      };
    }
  }, [vertCode, fragCode]);

  return <div ref={sketchRef} />;
};

export default ShaderViewer;
