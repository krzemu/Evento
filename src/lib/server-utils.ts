import 'server-only'

import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "./db";
import { capitalize } from "./utils";

export const getEventBySlug = unstable_cache(async (slug: string) => {
    const event = await prisma.eventoEvent.findUnique({
        where: {
            slug
        }
    })
    if (!event) return notFound();
    return event;
})

export const getEventsByCity = unstable_cache(async (city: string, page = 1) => {
    const itemsForPage = 8;

    const events = await prisma.eventoEvent.findMany({
        where: {
            city: city === 'all' ? undefined : capitalize(city)
        },
        orderBy: {
            date: 'asc'
        },
        take: itemsForPage,
        skip: (page - 1) * itemsForPage
    })
    if (events.length === 0) return notFound();
    let totalCount: number;
    if (city === 'all') {
        totalCount = await prisma.eventoEvent.count({});
    } else {
        totalCount = await prisma.eventoEvent.count({
            where: {
                city: capitalize(city)
            }
        })
    }


    return { events, totalCount };
})

