// dialy/[date]/page.tsx

import React, { use } from 'react';
import CodeViewer from '@/components/CodeVierwer';
import ShaderViewer from '@/components/ShaderViewerLoader';

const DatePage = async ({ params }: { params: { date: string } }) => {
  // const resolvedParams = React.use(params);
  // const { date } = resolvedParams;

  const { date } = await params;

  console.log(date);

  const vertCode = `
precision highp float;
attribute vec3 aPosition;
void main() {
  gl_Position = vec4(aPosition, 1.0);
}
`;
  const fragCode = `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
void main() {
  vec3 color = vec3(sin(u_time) * 0.5 + 0.5, u_mouse.x, u_mouse.y);
  gl_FragColor = vec4(color, 1.0);
}
`;

  return (
    <>
      <CodeViewer code={fragCode} />
      <ShaderViewer vertCode={vertCode} fragCode={fragCode} />
    </>
  );
};

async function getShaderCode(date: string) {
  // const response = await fetch(`/api/shader/${date}`);
  // const data = await response.json();
  // return data;
}

export async function generateStaticParams() {
  // const posts = await fetch('https://api.example.com/posts').then(res => res.json());

  const test = ['20250911', '20250910'];

  return test.map((t) => ({
    slug: t,
  }));
}

export default DatePage;
