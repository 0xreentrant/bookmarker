"use server";

import sqlite3 from "sqlite3";
import { Bookmarks } from "../bookmarks";

const db = new sqlite3.Database("./bookmarks.db");

export default async function Page() {
  const bookmarks = await new Promise((resolve, reject) => {
    const allBookmarks = `
      select * from bookmarks
      where archived = 0
      order by date desc
    `;

    db.all(allBookmarks, (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      console.log("showing results:\n", data);

      resolve(data);
    });
  });

  return (
    <div className="flex flex-1 h-screen w-full">
      <Bookmarks bookmarks={bookmarks} hasError={false} doArchive={{}} />
    </div>
  );
}