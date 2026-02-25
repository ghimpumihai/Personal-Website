"use client";

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoPlayerProps {
  url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-xl ring-1 ring-slate-900/5 dark:ring-slate-50/10 mb-12">
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        controls={true}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
}
