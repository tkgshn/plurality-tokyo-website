"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface Post {
  id: string
  title: string
  slug: string
  published_at: string | null
  authors: {
    name: string
  } | null
}

// 仮の投稿データ
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Plurality Tokyo Meetup #1",
    slug: "plurality-tokyo-meetup-1",
    published_at: "2024-04-01",
    authors: {
      name: "John Doe"
    }
  },
  {
    id: "2",
    title: "Web3 Future",
    slug: "web3-future",
    published_at: "2024-03-15",
    authors: {
      name: "Jane Smith"
    }
  }
]

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 仮のデータを使用
        setPosts(mockPosts)
      } catch (error) {
        console.error("Error fetching posts:", error)
        toast({
          title: "Error",
          description: "Failed to load posts",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [toast])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      // 仮の削除処理
      setPosts(posts.filter((post) => post.id !== id))
      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                No posts found
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.authors?.name || "Unknown"}</TableCell>
                <TableCell>{post.published_at ? formatDate(post.published_at) : "Draft"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/posts/${post.id}`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
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
