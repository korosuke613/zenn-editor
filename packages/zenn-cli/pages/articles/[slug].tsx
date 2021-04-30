import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import escapeHtml from 'escape-html';
import markdownToHtml from 'zenn-markdown-html';

import { ContentBody } from '@components/ContentBody';
import { ArticleHeader } from '@components/ArticleHeader';
import { MainContainer } from '@components/MainContainer';
import { getAllContentsNavCollections } from '@utils/nav-collections';
import { getArticleBySlug } from '@utils/api/articles';
import { Article, NavCollections } from '@types';
import { useState } from 'react';

type Props = {
  article: Article;
  allContentsNavCollections: NavCollections;
};

const Page: NextPage<Props> = (props) => {
  const { article } = props;

  return (
    <>
      <Head>
        <title>{article.title || '無題'}のプレビュー</title>
      </Head>
      <MainContainer navCollections={props.allContentsNavCollections}>
        <article>
          <div>
            <ArticleHeader article={article} />
            <ContentBody content={article.content} />
          </div>
        </article>
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  res,
  params,
}) => {
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    if (res) {
      res.setHeader('content-type', 'text/html; charset=utf-8');
      res.end(`articles/${escapeHtml(slug)}.mdが見つかりませんでした`);
      return {
        props: {} as any,
      };
    }
  }

  const content = markdownToHtml(article.content);
  const allContentsNavCollections = getAllContentsNavCollections();

  return {
    props: {
      article: {
        ...article,
        content,
        slug,
      },
      allContentsNavCollections,
    },
  };
};

export default Page;
