'use client';

import { generateFrag, responseFromAI } from '@/lib/generateFragFromAI';
import { useEffect, useState } from 'react';

import AIStatus from '@/components/AIStatus';
import CodeViewer from '@/components/CodeVierwer';
import P5Canvas from '@/components/P5Canvas';
// import ShaderViewer from '@/components/ShaderViewer';
import dynamic from 'next/dynamic';

const ShaderViewer = dynamic(() => import('@/components/ShaderViewer'), {
  ssr: false, // サーバーサイドレンダリングを無効化
});

const page = () => {
  const vertCode = `
precision highp float;
attribute vec3 aPosition;
void main() {
  gl_Position = vec4(aPosition, 1.0);
}
`;
  const prompt = 'JavaScriptについて簡潔に説明してください。';

  const [fragCode, setFragCode] = useState(`
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
void main() {
  vec3 color = vec3(sin(u_time) * 0.5 + 0.5, u_mouse.x, u_mouse.y);
  gl_FragColor = vec4(color, 1.0);
}
`);

  const fetchData = async () => {
    console.log('fetch');
    const response = await generateFrag(fragCode);
    setFragCode(response.fragCode);
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div onClick={() => fetchData()}>
      <CodeViewer code={fragCode} />
      <ShaderViewer vertCode={vertCode} fragCode={fragCode} />
    </div>
  );
};

export default page;
