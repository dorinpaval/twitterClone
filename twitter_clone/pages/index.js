import Head from 'next/head'
import { Inter } from '@next/font/google'
import Sidebar from 'components/Sidebar'
import Feed from 'components/Feed'
import Widgets from "../components/Widgets";
import CommentModal from "../components/CommentModal";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ newsResults, randomUsers }) {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen ">
        <Sidebar />
        <Feed />
        <Widgets newsResults={newsResults.articles}  randomUsersResults={randomUsers.results}/>
        <CommentModal />
      </main>
    </>
  )
}

// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  //who to follow
  const randomUsers = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture")
  .then((res) => res.json());
  return {
    props: {
      newsResults,
      randomUsers,
    },
  };
}