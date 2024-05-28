"use server";

import { eq, desc } from "drizzle-orm";
import { dbNew } from "../../db";
import { Bookmarks } from "../../components/Bookmarks";
import { bookmarks } from "../../schema";
import { Nothing } from "../../components/DefaultViews/Nothing";

export default async function Page() {
  const list = await dbNew.query.bookmarks.findMany({
    with: { bookmarksToLists: true },
    where: eq(bookmarks.archived, 0),
    orderBy: [desc(bookmarks.date)],
  });

  const allLists = await dbNew.query.lists.findMany();

  return (
    <div className="p-2">
      <h1>All bookmarks</h1>
      {list?.length ? (
        <Bookmarks bookmarks={list} allLists={allLists}  />
      ) : (
        <Nothing />
      )}
    </div>
  );
}
