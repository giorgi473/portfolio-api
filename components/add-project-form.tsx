"use client"

import { useState } from "react"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { toast, Toaster } from "sonner"
import * as z from "zod"
import { Loader2, X, Layout, FileText, Code2, BadgeCheck, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Checkbox } from "@/components/ui/checkbox"

const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(50, "Title is too long."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description is too long."),
  badge: z.string().min(2, "Badge text is required."),
  liveUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  codeUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  featured: z.boolean(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

export function AddProjectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      badge: "Live Demo",
      liveUrl: "",
      codeUrl: "",
      featured: false,
    },
  })

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    setLoading(true)
    try {
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

      // Clean data before sending
      const submissionData = {
        ...data,
        liveUrl: data.liveUrl || undefined,
        codeUrl: data.codeUrl || undefined,
      }

      await convex.mutation(api.projects.create, submissionData)

      toast.success("Project created successfully!", {
        description: "Your new project is now visible on the portfolio.",
        position: "bottom-right",
      })

      form.reset()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Failed to create project", error)
      toast.error("Failed to create project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <Toaster />
      <Card className="border-border/50 bg-card/30 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-8 border-b border-border/40">
          <div className="space-y-1.5">
            <CardTitle className="text-3xl font-extrabold tracking-tight">Create Project</CardTitle>
            <CardDescription className="text-base">
              Fill out the details below to showcase your amazing work.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="rounded-full hover:bg-muted/50"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="pt-8 pb-10">
          <form id="project-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-10">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Layout className="h-4 w-4 text-primary" />
                      <FieldLabel htmlFor="title" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Project Title</FieldLabel>
                    </div>
                    <Input
                      {...field}
                      id="title"
                      placeholder="E.g. Modern E-commerce Platform"
                      className="h-12 bg-background/50 border-border/60 focus:bg-background transition-all"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <FileText className="h-4 w-4 text-primary" />
                      <FieldLabel htmlFor="description" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Description</FieldLabel>
                    </div>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="description"
                        placeholder="Tell the story of this project..."
                        className="min-h-[160px] resize-none bg-background/50 border-border/60 focus:bg-background transition-all p-4"
                        aria-invalid={fieldState.invalid}
                        rows={6}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums text-xs font-medium opacity-50 px-3 pb-2">
                          {field.value?.length || 0}/500 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription className="mt-2 italic text-xs">
                      Explain the technologies used and the problem this project solves.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Controller
                  name="badge"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <FieldLabel htmlFor="badge" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Badge Label</FieldLabel>
                      </div>
                      <Input
                        {...field}
                        id="badge"
                        placeholder="E.g. Active, V1.0"
                        className="h-11 bg-background/50 border-border/60 focus:bg-background transition-all"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="featured"
                  control={form.control}
                  render={({ field }) => (
                    <Field orientation="horizontal" className="pt-8 flex items-center gap-3">
                      <Checkbox
                        id="featured"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5 rounded-md"
                      />
                      <div className="flex items-center gap-2 mb-1.5">
                        <BadgeCheck className={`h-4 w-4 ${field.value ? "text-yellow-500 fill-current" : "text-muted-foreground"}`} />
                        <FieldLabel
                          htmlFor="featured"
                          className="font-semibold cursor-pointer select-none"
                        >
                          Mark as Featured
                        </FieldLabel>
                      </div>
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Controller
                  name="liveUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <FieldLabel htmlFor="liveUrl" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Deployment</FieldLabel>
                      </div>
                      <Input
                        {...field}
                        id="liveUrl"
                        type="url"
                        placeholder="https://your-project.com"
                        className="h-11 bg-background/50 border-border/60 focus:bg-background transition-all"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="codeUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Code2 className="h-4 w-4 text-primary" />
                        <FieldLabel htmlFor="codeUrl" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Source Code</FieldLabel>
                      </div>
                      <Input
                        {...field}
                        id="codeUrl"
                        type="url"
                        placeholder="https://github.com/you/repo"
                        className="h-11 bg-background/50 border-border/60 focus:bg-background transition-all"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="pt-8 pb-8 bg-muted/20 border-t border-border/40">
          <div className="flex items-center justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={loading}
              className="h-11 px-6 font-bold uppercase tracking-widest text-xs"
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              form="project-form"
              disabled={loading}
              className="h-11 px-8 font-bold uppercase tracking-widest text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Publish Project"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

