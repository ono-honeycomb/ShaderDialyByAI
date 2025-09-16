'use client';

import dynamic from 'next/dynamic';

const ShaderViewer = dynamic(() => import('@/components/ShaderViewer'), {
  ssr: false, // サーバーサイドレンダリングを無効化
});

export default ShaderViewer;
