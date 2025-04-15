"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { generateSlug } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

interface Author {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

interface PostFormProps {
  post?: {
    id: string
    title: string
    slug: string
    content: string
    content_plain: string
    short_description: string
    cover_image_url: string
    author_id: string
    url: string
    published_at: string | null
  }
  authors: Author[]
  tags: Tag[]
  selectedTags?: string[]
}

export default function PostForm({ post, authors, tags, selectedTags = [] }: PostFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [content, setContent] = useState(post?.content || "")
  const [contentPlain, setContentPlain] = useState(post?.content_plain || "")
  const [shortDescription, setShortDescription] = useState(post?.short_description || "")
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url || "")
  const [authorId, setAuthorId] = useState(post?.author_id || "")
  const [url, setUrl] = useState(post?.url || "")
  const [isPublished, setIsPublished] = useState(!!post?.published_at)
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(selectedTags)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!post) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleTagToggle = (tagId: string) => {
    setSelectedTagIds((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const postData = {
        title,
        slug,
        content,
        content_plain: contentPlain || content,
        short_description: shortDescription,
        cover_image_url: coverImageUrl,
        author_id: authorId,
        url,
        published_at: isPublished ? new Date().toISOString() : null,
      }

      // 仮の保存処理
      console.log("Saving post:", postData)
      console.log("Selected tags:", selectedTagIds)

      toast({
        title: "Success",
        description: post ? "Post updated successfully" : "Post created successfully",
      })

      router.push("/dashboard/posts")
      router.refresh()
    } catch (error) {
      console.error("Error saving post:", error)
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter post slug"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Textarea
          id="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Enter short description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Tabs defaultValue="markdown" className="w-full">
          <TabsList>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="markdown">
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content in Markdown"
              className="min-h-[300px]"
              required
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="prose dark:prose-invert max-w-none">
              {/* プレビュー表示は別途実装 */}
              <p>Preview will be shown here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImageUrl">Cover Image URL</Label>
        <Input
          id="coverImageUrl"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="Enter cover image URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Select value={authorId} onValueChange={setAuthorId}>
          <SelectTrigger>
            <SelectValue placeholder="Select author" />
          </SelectTrigger>
          <SelectContent>
            {authors.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">External URL</Label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter external URL"
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center space-x-2">
              <Checkbox
                id={`tag-${tag.id}`}
                checked={selectedTagIds.includes(tag.id)}
                onCheckedChange={() => handleTagToggle(tag.id)}
              />
              <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="published"
          checked={isPublished}
          onCheckedChange={(checked) => setIsPublished(checked as boolean)}
        />
        <Label htmlFor="published">Publish immediately</Label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  )
}
