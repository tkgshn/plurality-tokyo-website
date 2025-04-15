"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Users, Plus } from "lucide-react"
import PostsTable from "@/components/admin/posts-table"
import EventsTable from "@/components/admin/events-table"
import AuthorsTable from "@/components/admin/authors-table"

interface AdminDashboardProps {
  postsCount: number
  eventsCount: number
  authorsCount: number
}

export default function AdminDashboard({ postsCount, eventsCount, authorsCount }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your community content and settings</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link href={`/admin/${activeTab}/new`}>
              <Plus className="mr-2 h-4 w-4" />
              New {activeTab.slice(0, -1)}
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsCount}</div>
            <p className="text-xs text-muted-foreground">Published blog posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventsCount}</div>
            <p className="text-xs text-muted-foreground">Community events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorsCount}</div>
            <p className="text-xs text-muted-foreground">Content contributors</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts" onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="authors">Authors</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostsTable />
        </TabsContent>
        <TabsContent value="events">
          <EventsTable />
        </TabsContent>
        <TabsContent value="authors">
          <AuthorsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
