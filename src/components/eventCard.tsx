"use client";
import { EventoEvent } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type EventCardProps = {
  event: EventoEvent;
};

const MotionLink = motion.create(Link);

export default function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  const eventDate = new Date(event.date);
  return (
    <MotionLink
      ref={ref}
      href={`/event/${event.slug}`}
      className="h-[380px] max-w-[500px] flex-1 basis-80"
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}>
      <article
        key={event.id}
        className="w-full h-full bg-white/[3%] rounded-xl overflow-hidden flex flex-col relative scale-effects">
        <Image
          className="h-[60%] object-cover"
          src={event.imageUrl}
          width={500}
          height={200}
          alt={event.name}
        />
        <div className="flex flex-col justify-center items-center flex-1">
          <h2 className="text-2xl font-semibold text-white/75">{event.name}</h2>
          <p className="text-sm text-white/75">By {event.organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{event.location}</p>
        </div>
        <section className="absolute top-3 left-3 flex flex-col items-center justify-center text-center h-[45px] w-[45px] bg-black/30 rounded-md">
          <p className="text-xl font-bold -mb-1">
            {eventDate.toLocaleDateString("en-US", { day: "2-digit" })}
          </p>
          <p className="text-xs uppercase text-accent">
            {eventDate.toLocaleDateString("en-US", { month: "short" })}
          </p>
        </section>
      </article>
    </MotionLink>
  );
}
