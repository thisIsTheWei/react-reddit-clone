import React, {FC} from 'react';
import {getAuthSession} from "@/lib/auth";
import {db} from "@/lib/db";
import {INFINITE_SCROLL_PAGINATION_RESULTS} from "@/config";
import {notFound} from "next/navigation";
import MiniCreatePost from "@/components/MiniCreatePost";

interface PageProps {
  params: {
    slug: string
  }
}

const Page = async ({params}: PageProps) => {
  const {slug} = params
  const  session = await getAuthSession()

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug},
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS
      }
    }
  })

  if (!subreddit) return notFound()

  return (
    <div>
      <h1 className='font-bold text-3xl md:text-4xl h-14'>
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      {/* TODO: Show posts in user feed */}
    </div>
  );
};

export default Page;