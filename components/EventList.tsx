import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { EventContent } from '@/types/content';
import { cookies } from 'next/headers';
import { Locale, defaultLocale, translate } from '@/lib/i18n';
import { SpeakerAvatar } from './SpeakerAvatar';

interface SpeakerMetadata {
    name: string;
    avatar_url?: string;
    authorInfo?: {
        metadata: {
            avatar_url?: string;
        };
    };
}

interface EventListProps {
    events: EventContent[];
    showPast?: boolean;
    showUpcoming?: boolean;
    maxItems?: number;
    showHeaders?: boolean;
}

/**
 * EventList component displays a list of events
 *
 * @param events - Array of event content objects
 * @param showPast - Whether to show past events (default: true)
 * @param showUpcoming - Whether to show upcoming events (default: true)
 * @param maxItems - Maximum number of items to display per section (optional)
 * @param showHeaders - Whether to show section headers (default: true)
 */
export const EventList: React.FC<EventListProps> = ({
    events,
    showPast = true,
    showUpcoming = true,
    maxItems,
    showHeaders = true,
}) => {
    // サーバーサイドでロケールを取得
    const cookieStore = cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE');
    const locale = (localeCookie?.value || defaultLocale) as Locale;

    const t = (key: string) => translate(locale, key);
    const now = new Date();

    // Sort events by date
    const sortedEvents = [...events].sort((a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );

    // Filter upcoming and past events
    const upcomingEvents = sortedEvents.filter(event => {
        const eventEndDate = event.metadata.end_date ? new Date(event.metadata.end_date) : new Date(event.metadata.date);
        return eventEndDate >= now;
    }).reverse(); // Reverse to show nearest upcoming first

    const pastEvents = sortedEvents.filter(event => {
        const eventEndDate = event.metadata.end_date ? new Date(event.metadata.end_date) : new Date(event.metadata.date);
        return eventEndDate < now;
    });

    // Limit number of items if maxItems is provided
    const limitedUpcomingEvents = maxItems ? upcomingEvents.slice(0, maxItems) : upcomingEvents;
    const limitedPastEvents = maxItems ? pastEvents.slice(0, maxItems) : pastEvents;

    const renderEventCard = (event: EventContent, isUpcoming: boolean = false) => {
        const eventDate = new Date(event.metadata.date);
        const coverImage = event.metadata.cover_image_url || (event.metadata.image ? event.metadata.image : null);
        const fallbackImage = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000";

        // Style for upcoming events
        const cardStyle = isUpcoming
            ? "block p-6 border border-lime-500 rounded-lg hover:shadow-lg hover:border-lime-400 transition-all duration-200 bg-gradient-to-br from-gray-900 to-gray-800"
            : "block p-6 border border-gray-700 rounded-lg hover:shadow-lg hover:border-gray-500 transition-all duration-200 bg-gray-900";

        // Badge for upcoming events with i18n support
        const upcomingBadge = isUpcoming && (
            <div className="absolute top-4 right-4 bg-lime-500 text-black px-3 py-1 rounded-full font-medium text-sm z-10">
                {t('events.comingSoon')}
            </div>
        );

        return (
            <Link
                key={event.metadata.slug}
                href={`/events/${event.metadata.slug}`}
                className={cardStyle}
            >
                <div className="relative w-full h-40 mb-4 overflow-hidden rounded">
                    {upcomingBadge}
                    <Image
                        src={coverImage || fallbackImage}
                        alt={event.metadata.title}
                        fill
                        className="object-cover"
                    />
                    {isUpcoming && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    )}
                </div>

                <h2 className={`text-xl font-semibold mb-2 ${isUpcoming ? 'text-lime-400' : 'text-lime-400'}`}>
                    {event.metadata.title}
                </h2>

                <div className="flex items-center text-sm text-gray-400 mb-4">
                    <time dateTime={event.metadata.date}>
                        {format(eventDate, 'MMMM d, yyyy')}
                        {event.metadata.end_date && event.metadata.end_date !== event.metadata.date &&
                            ` - ${format(new Date(event.metadata.end_date), 'MMMM d, yyyy')}`
                        }
                    </time>
                    {event.metadata.location && (
                        <>
                            <span className="mx-2">•</span>
                            <span>{event.metadata.location}</span>
                        </>
                    )}
                </div>

                <p className="text-gray-300 mb-4 text-sm">{event.metadata.description}</p>

                {/* Speaker display */}
                {event.metadata.speakers && event.metadata.speakers.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">{t('common.speakers')}</h3>
                        <div className="flex -space-x-2 overflow-hidden">
                            {event.metadata.speakers.map((speaker: SpeakerMetadata, index) => {
                                const speakerSlug = speaker.name.toLowerCase()
                                    .replace(/\s+/g, '-')
                                    .replace(/^e\.\s+/, '')
                                    .replace(/^dr\.\s+/, '')
                                    .replace(/^prof\.\s+/, '')
                                    .replace(/['"]/g, '');

                                const imageSource = speaker.avatar_url ||
                                    (speaker.authorInfo?.metadata?.avatar_url) ||
                                    `/images/speakers/${speakerSlug}.jpg`;

                                return (
                                    <SpeakerAvatar
                                        key={index}
                                        src={imageSource}
                                        alt={speaker.name}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {event.metadata.tags && event.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {event.metadata.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`px-2 py-1 rounded-full text-xs ${isUpcoming ? 'bg-lime-900/50 text-lime-200' : 'bg-gray-800 text-gray-300'}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {isUpcoming && (
                    <div className="mt-6">
                        <button className="w-full py-2 px-4 bg-lime-500 hover:bg-lime-600 text-black font-medium rounded transition-colors duration-200">
                            {t('home.viewDetails')}
                        </button>
                    </div>
                )}
            </Link>
        );
    };

    return (
        <div className="space-y-16">
            {/* Upcoming Events */}
            {showUpcoming && limitedUpcomingEvents.length > 0 && (
                <section>
                    {showHeaders && <h2 className="text-3xl font-bold mb-8 text-lime-400">{t('home.upcomingEvents')}</h2>}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {limitedUpcomingEvents.map((event) => renderEventCard(event, true))}
                    </div>
                    {maxItems && upcomingEvents.length > maxItems && (
                        <div className="mt-8 text-center">
                            <Link
                                href="/events"
                                className="inline-block px-4 py-2 rounded bg-lime-800 hover:bg-lime-700 transition-colors"
                            >
                                {t('events.viewAllEvents')}
                            </Link>
                        </div>
                    )}
                </section>
            )}

            {/* Past Events */}
            {showPast && limitedPastEvents.length > 0 && (
                <section>
                    {showHeaders && <h2 className="text-3xl font-bold mb-8">{t('home.pastEvents')}</h2>}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {limitedPastEvents.map((event) => renderEventCard(event, false))}
                    </div>
                    {/* {maxItems && pastEvents.length > maxItems && (
                        <div className="mt-8 text-center">
                            <Link
                                href="/events"
                                className="inline-block px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                                View All Past Events
                            </Link>
                        </div>
                    )} */}
                </section>
            )}

            {/* No Events */}
            {((showUpcoming && limitedUpcomingEvents.length === 0) && (showPast && limitedPastEvents.length === 0)) && (
                <p className="text-gray-400">No events found.</p>
            )}
        </div>
    );
};

export default EventList;
