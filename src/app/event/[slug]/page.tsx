import H1 from "@/components/h1";
import { ChildrenNodeProps } from "@/lib/types";
import { getEventBySlug } from "@/lib/server-utils";
import { Metadata } from "next";

import Image from "next/image";
import React from "react";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  return {
    title: `${event.name} | Evento`,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);

  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={event.imageUrl}
          className="object-cover blur-3xl z-0"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width:1280px) 100vh, 1280px "
          priority
        />
        <div className="z-10 relative flex flex-col lg:flex-row gap-6 lg:gap-x-16 items-center text-center lg:text-left lg:items-stretch">
          <Image
            src={event.imageUrl}
            width={300}
            height={201}
            alt="Event image"
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-md text-white/75">{eventDate}</p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">{event.name}</H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by: <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg mt-5 lg:mt-auto capitalize w-[95vw] sm:w-full rounded-sm border-white/10 border-2 py-2 backdrop-blur-xl scale-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: ChildrenNodeProps) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: ChildrenNodeProps) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: ChildrenNodeProps) {
  return <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">{children}</p>;
}
