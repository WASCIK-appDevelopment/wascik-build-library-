import Image from "next/image";
import type { EventCardData } from "../types";

export function EventCard({ event }: { event: EventCardData }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border bg-slate-950 text-white">
      <div className="relative aspect-video">
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {event.genre ? (
          <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold">
            {event.genre}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-bold uppercase tracking-widest">{event.dateLabel}</p>
        <h3 className="mt-3 text-3xl font-black">{event.performer}</h3>
        <p className="mt-2 font-bold">{event.eventName}</p>
        <div className="mt-5 space-y-1 text-sm text-slate-300">
          {event.timeLabel ? <p>{event.timeLabel}</p> : null}
          <p>{event.venue}</p>
          <p>{event.location}</p>
        </div>
        <a
          href={event.affiliate.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-auto inline-flex min-h-12 items-center justify-center rounded-xl bg-fuchsia-400 px-5 py-3 font-black text-slate-950"
        >
          {event.affiliate.label}
        </a>
      </div>
    </article>
  );
}
