"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface Author {
  id: string
  name: string
  slug: string
  role: string | null
  avatar_url: string | null
}

// 仮の著者データ
const mockAuthors: Author[] = [
  {
    id: "1",
    name: "John Doe",
    slug: "john-doe",
    role: "Developer",
    avatar_url: "/images/avatar.jpg"
  },
  {
    id: "2",
    name: "Jane Smith",
    slug: "jane-smith",
    role: "Designer",
    avatar_url: "/images/avatar.jpg"
  }
]

export default function AuthorsTable() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        // 仮のデータを使用
        setAuthors(mockAuthors)
      } catch (error) {
        console.error("Error fetching authors:", error)
        toast({
          title: "Error",
          description: "Failed to load authors",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAuthors()
  }, [toast])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return

    try {
      // 仮の削除処理
      setAuthors(authors.filter((author) => author.id !== id))
      toast({
        title: "Success",
        description: "Author deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting author:", error)
      toast({
        title: "Error",
        description: "Failed to delete author",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading authors...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                No authors found
              </TableCell>
            </TableRow>
          ) : (
            authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={author.avatar_url || "/placeholder.svg"}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>{author.name}</span>
                  </div>
                </TableCell>
                <TableCell>{author.role || "No role"}</TableCell>
                <TableCell>{author.slug}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/authors/${author.id}`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(author.id)}>
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
