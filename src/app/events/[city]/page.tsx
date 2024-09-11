import EventsList from "@/components/eventsList";
import H1 from "@/components/h1";
import React, { Suspense } from "react";
import Loading from "./loading";
import { capitalize } from "@/lib/utils";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
};

type CityPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props) {
  const city = params.city;
  return {
    title: city === "all" ? "All Events | Evento" : `Events in ${city} | Evento`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function CityPage({ params, searchParams }: CityPageProps) {
  const city = params.city;

  const page = searchParams.page || 1;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }
  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events in ${capitalize(city)}`}
      </H1>
      <Suspense key={city + page} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
