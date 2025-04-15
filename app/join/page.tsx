import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata: Metadata = {
  title: "Join Plurality Tokyo",
  description: "Join our community and get involved with Plurality Tokyo's activities and events",
}

export default function JoinPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <PageHeader title="Join the Community" backLink={{ href: "/", label: "Home" }} />

        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-300 mb-8">
            Plurality Tokyo is an open community for anyone interested in the Plurality movement, digital democracy, and
            creating sustainable funding models for public goods.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Connect with us</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Discord</h3>
                  <p className="text-gray-300 mb-4">
                    Join our Discord server to connect with community members, participate in discussions, and stay
                    updated on events and news.
                  </p>
                  <Button asChild className="bg-lime-400 text-black hover:bg-lime-500">
                    <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer">
                      Join Discord
                    </Link>
                  </Button>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Twitter</h3>
                  <p className="text-gray-300 mb-4">
                    Follow us on Twitter for announcements, event updates, and news from the Plurality ecosystem.
                  </p>
                  <Button asChild className="bg-lime-400 text-black hover:bg-lime-500">
                    <Link href="https://x.com/pluralitytokyo" target="_blank" rel="noopener noreferrer">
                      Follow @pluralitytokyo
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Get Involved</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Attend Events</h3>
                  <p className="text-gray-300 mb-4">
                    Join our meetups, conferences, and online events to connect with like-minded individuals and learn
                    more about Plurality.
                  </p>
                  <Button asChild className="bg-lime-400 text-black hover:bg-lime-500">
                    <Link href="/events">View Upcoming Events</Link>
                  </Button>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Contribute</h3>
                  <p className="text-gray-300 mb-4">
                    Share your knowledge, skills, and ideas with the community. We welcome contributions in various forms,
                    from blog posts to event organization.
                  </p>
                  <Button asChild className="bg-lime-400 text-black hover:bg-lime-500">
                    <Link href="https://discord.com/invite/y4QXe6KtHh" target="_blank" rel="noopener noreferrer">
                      Discuss on Discord
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
