"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface Event {
  id: string
  title: string
  slug: string
  start_date: string | null
  end_date: string | null
  status: string
}

// 仮のEventsデータ
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Plurality Tokyo Meetup #1",
    slug: "plurality-tokyo-meetup-1",
    start_date: "2024-04-01",
    end_date: "2024-04-01",
    status: "upcoming"
  },
  {
    id: "2",
    title: "Web3 Future",
    slug: "web3-future",
    start_date: "2024-03-15",
    end_date: "2024-03-15",
    status: "past"
  }
]

export default function EventsTable() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 仮のデータを使用
        setEvents(mockEvents)
      } catch (error) {
        console.error("Error fetching events:", error)
        toast({
          title: "Error",
          description: "Failed to load events",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [toast])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      // 仮の削除処理
      setEvents(events.filter((event) => event.id !== id))
      toast({
        title: "Success",
        description: "Event deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting event:", error)
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                No events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>
                  {event.start_date ? formatDate(event.start_date) : "TBD"}
                  {event.end_date && event.end_date !== event.start_date
                    ? ` - ${formatDate(event.end_date)}`
                    : ""}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      event.status === "upcoming"
                        ? "default"
                        : event.status === "past"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/events/${event.id}`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
