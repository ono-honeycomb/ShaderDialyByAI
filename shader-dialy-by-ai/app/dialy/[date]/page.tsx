// dialy/[date]/page.tsx

import React from 'react';

const DatePage = ({ params }: { params: { date: string } }) => {
  console.log(params.date);
  return (
    <div>
      <h1>静的ページ: {}</h1>
      <p>これはテスト用の静的生成ページです。</p>
    </div>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // テスト用に2つの日付を生成
//   const dates = ['2024-06-01', '2024-06-02'];
//   const paths = dates.map((date) => ({
//     params: { date },
//   }));

//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
//   const date = params?.date as string;
//   console.log(params);
//   return {
//     props: { date },
//   };
// };

export default DatePage;
