import { useState } from "react";
import { Box, Link, IconButton, styled } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";

const ArchiveButton = styled(IconButton)`
  padding: 0;
`;

export type EntryType = {
  href: string;
  title: string;
  date: string;
  score: number;
};

export const Entry = ({ style, entry, onClick }) => {
  const CachedLink = ({ link }) => (
    <Link
      target="_blank"
      href={"https://web.archive.org/web/*/" + link}
      whiteSpace="nowrap"
    >
      (Cached Link)
    </Link>
  );

  const HNLink = ({ link }) => (
    <Link
      target="_blank"
      href={
        "https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=" +
        encodeURIComponent(link)
      }
    >
      (HN)
    </Link>
  );

  const Score = ({ score }) => {
    const [cache, updateCache] = useState(score);
    return <>{cache}</>;
  };

  return (
    <Box display="flex" gap="10px" alignItems="center" style={style}>
      <Score score={entry.score} />
      <CachedLink link={entry.href} />
      <HNLink link={entry.href} />
      <ArchiveButton onClick={() => onClick(entry.id)}>
        <ArchiveIcon padding="0" />
      </ArchiveButton>
      <Box whiteSpace="nowrap">
        {new Date(entry.date * 1000).toLocaleString()}
      </Box>
      <Link target="_blank" href={entry.href} whiteSpace="nowrap">
        {entry.title}
      </Link>
    </Box>
  );
};
