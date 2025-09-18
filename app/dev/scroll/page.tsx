import test from 'node:test';

interface MetaViewerProps {
  id: number;
  inputMessage: string;
  aiMessage: string;
  title: string;
  thema: string;
  feeling: string;
  description: string;
  dateTime: string;
  tags: string[];
  fragCode: string;
}

const page = () => {
  let testData: MetaViewerProps[] = [
    {
      id: 1,
      inputMessage: 'inputMessage',
      aiMessage: 'aiMessage',
      title: 'title',
      thema: 'thema',
      feeling: 'feeling',
      description: 'description',
      dateTime: 'dateTime',
      tags: ['tag1', 'tag2', 'tag3'],
      fragCode: 'fragCode',
    },
  ];
  testData = testData.concat(testData);
  testData = testData.concat(testData);
  testData = testData.concat(testData);

  return (
    <>
      <div className="flex space-x-0">
        <div className="w-1/2 bg-blue-200 p-4">
          {testData.map((item, index) => (
            <div key={index} className="aspect-square">
              <p>inputMessage: {item.inputMessage}</p>
              <p>aiMessage: {item.aiMessage}</p>
              <p>title: {item.title}</p>
              <p>thema: {item.thema}</p>
              <p>feeling: {item.feeling}</p>
              <p>description: {item.description}</p>
              <p>dateTime: {item.dateTime}</p>
              <p>tags: {item.tags.join(', ')}</p>
              <p>fragCode: {item.fragCode}</p>
            </div>
          ))}
        </div>
        <div className="w-1/2 bg-red-200">
          <iframe src="/sketch.html" width="100%" height="100%"></iframe>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <input
          type="text"
          className="w-full p-2 rounded-md"
          placeholder="入力欄"
        />
      </div>
    </>
  );
};

export default page;
