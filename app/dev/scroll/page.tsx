'use client';

import { generateFrag, responseFromAI } from '@/lib/generateFragFromAI';
import AIStatus from '@/components/AIStatus';
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MetaViewerProps {
  id: number;
  inputMessage: string;
  title: string;
  theme: string;
  feeling: string;
  description: string;
  tags: string[];
  fragCode: string;
  createdAt: string;
}

const firstFragCode = `precision highp float;
uniform float u_time;
uniform float u_noise;
uniform float u_random;
void main() {
  vec3 color = vec3(sin(u_time) * 0.5 + 0.5, u_noise, u_random);
  gl_FragColor = vec4(color, 1.0);
}
`;

const page = () => {
  const [metaViewData, setMetaViewData] = useState<MetaViewerProps[]>([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [count, setCount] = useState(0);
  const [aiStatus, setAIStatus] = useState('');
  const [compilingData, setCompilingData] = useState<MetaViewerProps | null>(
    null
  );
  const [inputValue, setInputValue] = useState('');
  // let compilingData: MetaViewerProps | null = null;

  const resToMetaView = (
    res: responseFromAI,
    id: number,
    inputMessage: string
  ): MetaViewerProps => {
    const newMetaView: MetaViewerProps = {
      id: id,
      inputMessage: inputMessage,
      title: res.title,
      theme: res.theme,
      feeling: res.feeling,
      description: res.description,
      tags: res.tags,
      fragCode: res.fragCode,
      createdAt: res.createdAt.toLocaleString(),
    };
    return newMetaView;
  };

  // 初回
  useEffect(() => {
    const firstData = {
      id: count,
      inputMessage: '',
      title: 'title',
      theme: 'theme',
      feeling: 'feeling',
      description: 'description',
      tags: ['tag1', 'tag2', 'tag3'],
      fragCode: firstFragCode,
      createdAt: new Date().toLocaleString(),
    };
    setCompilingData(firstData);
    // compilingData = firstData;
    submitToIFrame(firstFragCode);
  }, []);

  // iframeにコードを送る
  const submitToIFrame = (message: string) => {
    setAIStatus('Shaderコンパイル中...');
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.contentWindow?.postMessage(message, '*');
    }
  };

  // iframeからのメッセージ受け取り
  useEffect(() => {
    const onCompiledMessage = (event: MessageEvent) => {
      const message = event.data;
      setAIStatus('Shaderコンパイル:' + message);
      if (message == 'success') {
        console.log(compilingData);
        if (compilingData) {
          setMetaViewData([...metaViewData, compilingData]);
          setCount(count + 1);
          // setCompilingData(null);
          // compilingData = null;
        }
      } else if (message == 'failed') {
      }
      setIsInputDisabled(false);
    };
    window.addEventListener('message', onCompiledMessage);

    return () => {
      // コンポーネントのアンマウント時にリスナーを削除する
      window.removeEventListener('message', onCompiledMessage);
    };
  }, [metaViewData, compilingData, count]);

  // フォーム送信
  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInputDisabled(true);
    const inputMessage = inputValue; //event.target.elements.theme.value;
    setAIStatus('テーマ「' + inputMessage + '」でAI生成中...');

    const refCode = metaViewData[metaViewData.length - 1].fragCode;
    const res = await generateFrag(refCode, inputMessage);
    // test
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // const res = testData;

    const newMetaView: MetaViewerProps = resToMetaView(
      res,
      count,
      inputMessage
    );
    setCompilingData(newMetaView);
    // compilingData = newMetaView;
    submitToIFrame(res.fragCode);
  };

  return (
    <>
      <div className="flex space-x-0">
        <div className="w-1/2 text-xs">
          {metaViewData.map((item, index) => (
            <div key={index} className="p-4 aspect-square overflow-y-auto">
              <p>createdAt: {item.createdAt}</p>
              <p>inputMessage: {item.inputMessage}</p>
              <p>title: {item.title}</p>
              <p>theme: {item.theme}</p>
              <p>feeling: {item.feeling}</p>
              <p>description: {item.description}</p>
              <p>tags: {item.tags.join(', ')}</p>
              <SyntaxHighlighter language="glsl" style={dracula}>
                {item.fragCode}
              </SyntaxHighlighter>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <iframe
            src="/sketch.html"
            width="100%"
            height="100%"
            scrolling="no"
            className="overflow-hidden"
          ></iframe>
        </div>
      </div>

      <div className="fixed w-full bottom-0 p-4">
        <div className="w-fit">
          <AIStatus status={aiStatus} />
        </div>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            name="theme"
            className="w-full p-2 rounded-md"
            placeholder="AIに描いてほしいテーマを与える"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            // onKeyDown={onInputKeyDown}
            disabled={isInputDisabled}
          />
        </form>
      </div>

      <div className="h-30"></div>
    </>
  );
};

export default page;

const testData: responseFromAI = {
  title: 'テストタイトル',
  theme: 'テストテーマ',
  feeling: 'テスト気分',
  description: 'テスト説明',
  tags: ['テストタグ1', 'テストタグ2'],
  fragCode: `precision highp float;
uniform float u_time;
uniform float u_noise;
uniform float u_random;
void main() {
  vec3 color =  vec3(0, u_random, 0);
  gl_FragColor = vec4(color, 1.0);
}
`,
  createdAt: new Date(),
};
