import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getEventBySlug, getAllEvents, Event, Speaker } from "@/lib/events"
import { getAuthorBySlug } from "@/lib/content"
import { EventContent } from "@/types/content"
import { Metadata } from "next"
import ReactMarkdown from "react-markdown"
import { CalendarIcon, MapPinIcon, UserIcon, UsersIcon, FileTextIcon, ExternalLinkIcon, PlayIcon } from "lucide-react"
import remarkGfm from "remark-gfm"

interface EventPageProps {
  params: {
    slug: string
  }
}

interface SpeakerWithAuthorInfo extends Speaker {
  authorInfo?: {
    metadata: {
      [key: string]: any;
      avatar_url?: string;
    };
    content: string;
  };
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event: Event = getEventBySlug(params.slug)
  return {
    title: `${event.title} | Plurality Tokyo`,
    description: event.description,
  }
}

export default function EventPage({ params }: EventPageProps) {
  const event: Event = getEventBySlug(params.slug)
  const isEventEnded = new Date(event.date) < new Date();

  // Eventsに登場するスピーカーの数
  const speakersCount = event.speakers?.length || 0;
  // 参加者数（仮）- 実際のデータがあればそれを使用
  const attendeesCount = event.attendees_count || 0;

  // スピーカーに対応する著者情報を取得
  const speakersWithAuthorInfo: SpeakerWithAuthorInfo[] = event.speakers?.map(speaker => {
    try {
      // スピーカー名からスラグを生成（全て小文字+スペースをハイフンに変換）
      const possibleSlug = speaker.name.toLowerCase().replace(/\s+/g, '-');
      // スラグを正規化（"e. glen weyl" → "glen-weyl" など）
      const normalizedSlug = possibleSlug
        .replace(/^e\.\s+/, '') // E. から始まる場合は削除
        .replace(/^dr\.\s+/, '') // Dr. から始まる場合は削除
        .replace(/^prof\.\s+/, '') // Prof. から始まる場合は削除
        .replace(/['"]/g, ''); // " を含む場合は削除
      const authorInfo = getAuthorBySlug(normalizedSlug);

      return {
        ...speaker,
        authorInfo
      } as SpeakerWithAuthorInfo;
    } catch (error) {
      // 著者情報が見つからない場合は元のスピーカー情報をそのまま返す
      return speaker as SpeakerWithAuthorInfo;
    }
  }) || [];

  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Eventsタイトルとステータス */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
          {isEventEnded && (
            <div className="text-red-500 text-xl mb-6">THIS EVENT HAS ENDED, Thank you</div>
          )}
          <hr className="border-gray-700 my-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 左カラム: Events詳細 */}
          <div>
            <div className="mb-12">
              <p className="text-lg mb-8">{event.description}</p>

              {/* EventsレポートとEventsページへのリンク */}
              <div className="flex flex-wrap gap-4">
                {event.report_url && (
                  <Link href={event.report_url} passHref>
                    <Button variant="outline" className="border-white hover:bg-white hover:text-black">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Event report
                    </Button>
                  </Link>
                )}
                {event.event_page_url && (
                  <a
                    href={event.event_page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-white hover:bg-white hover:text-black">
                      <ExternalLinkIcon className="mr-2 h-4 w-4" />
                      Event page
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* 参加者情報 */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Attendees</h2>
              {event.video_url && (
                <p className="mb-6">you missed? full video on youtube:</p>
              )}

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold">{speakersCount}</div>
                  <div className="text-gray-400">speakers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">{attendeesCount}+</div>
                  <div className="text-gray-400">participated</div>
                </div>
              </div>
            </div>

            {/* スライド情報 */}
            {event.slides_url && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Presentation Slides</h2>
                <Link href={event.slides_url} passHref>
                  <Button variant="outline" className="border-white hover:bg-white hover:text-black">
                    See the slide
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* 右カラム: メディア */}
          <div>
            {/* Events画像 */}
            <div className="relative aspect-video mb-8">
              <Image
                src={event.cover_image_url || event.coverImage || event.image || `/images/events/${event.slug}.jpg`}
                alt={event.title}
                fill
                sizes="100vw"
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* YouTubeビデオ */}
            {event.video_url && (
              <div className="aspect-video mb-8">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYoutubeId(event.video_url)}`}
                  title={`${event.title} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            )}

            {/* スライド画像プレビュー */}
            {event.slides_preview_image && (
              <div className="relative aspect-video">
                <Image
                  src={event.slides_preview_image}
                  alt="Slide preview"
                  fill
                  sizes="100vw"
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* スピーカーセクション */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mt-16">
            <h2 className="text-5xl font-bold mb-8">Speakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakersWithAuthorInfo.map((speaker, index) => {
                // 画像ソースの優先順位:
                // 1. スピーカーのavatar_url
                // 2. 著者情報のavatar_url
                // 3. フォールバック画像
                const speakerSlug = speaker.name.toLowerCase().replace(/\s+/g, '-')
                  .replace(/^e\.\s+/, '')
                  .replace(/^dr\.\s+/, '')
                  .replace(/^prof\.\s+/, '')
                  .replace(/['"]/g, '');

                const imageSource = speaker.avatar_url ||
                  (speaker.authorInfo?.metadata?.avatar_url) || null;

                const speakerBio = speaker.bio ||
                    speaker.authorInfo?.metadata?.bio || null;

                return (
                  <div key={index} className="mb-12">
                    <div className="relative h-48 w-full mb-4">
                      <Image
                        src={imageSource || "/images/no-image.png"}
                        alt={speaker.name}
                        fill
                        sizes="100vw"
                        style={{
                          objectFit: 'contain',
                        }}
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                    {speaker.role && <p className="text-gray-400 mb-3">{speaker.role}</p>}
                    {speakerBio && <p className="text-sm">{speakerBio}</p>}
                    {speaker.authorInfo?.metadata?.position && !speaker.role && (
                      <p className="text-gray-400 mb-3">{speaker.authorInfo.metadata.position}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Events詳細コンテンツ */}
        <div className="mt-16 prose prose-lg prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{event.content}</ReactMarkdown>
        </div>


        {/* スポンサーセクション */}
        {event.sponsors && event.sponsors.length > 0 && (
          <div className="mt-16">
            <h2 className="text-5xl font-bold mb-8">Sponsors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.sponsors.map((sponsor, index) => {
                // 画像ソースの優先順位:
                // 1. スポンサーのavatar_url
                // 2. スポンサーのavatar_url
                // 3. フォールバック画像
                const sponsorsSlug = sponsor.name.toLowerCase().replace(/\s+/g, '-')
                  .replace(/^e\.\s+/, '')
                  .replace(/^dr\.\s+/, '')
                  .replace(/^prof\.\s+/, '')
                  .replace(/['"]/g, '');

                const imageSource = sponsor.avatar_url || null;

                return (
                  <div key={index} className="mb-12">
                    <div className="relative h-48 w-full mb-4">
                      <Image
                        src={imageSource || "/images/no-image.png"}
                        alt={sponsor.name}
                        fill
                        sizes="100vw max-h-48"
                        style={{
                          objectFit: 'contain',
                        }}
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{sponsor.name}</h3>
                    {sponsor.role && <p className="text-gray-400 mb-3">{sponsor.role}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        )}



      </div>
    </div>
  )
}

// YouTubeのURLからビデオIDを抽出する関数
function getYoutubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export async function generateStaticParams() {
  const events = getAllEvents()
  return events.map((event) => ({
    slug: event.slug,
  }))
}
