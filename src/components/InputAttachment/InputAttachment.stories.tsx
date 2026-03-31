import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { InputAttachment, type AttachedFile } from "./InputAttachment"

const meta: Meta = {
  title: "Forms/InputAttachment",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => {
    const [files, setFiles] = useState<AttachedFile[]>([])
    return (
      <div style={{ maxWidth: 480 }}>
        <InputAttachment
          label="Upload documents"
          accept=".pdf,.doc,.docx"
          multiple
          files={files}
          onChange={(newFiles) =>
            setFiles((prev) => [
              ...prev,
              ...newFiles.map((f) => ({ name: f.name, size: f.size, type: f.type })),
            ])
          }
          onRemove={(idx) => setFiles((prev) => prev.filter((_, i) => i !== idx))}
          helperText="PDF, DOC or DOCX up to 10MB"
          maxSizeMB={10}
        />
      </div>
    )
  },
}

export const WithPreloadedFiles: Story = {
  name: "With Preloaded Files",
  render: () => {
    const [files, setFiles] = useState<AttachedFile[]>([
      { name: "report-q1-2024.pdf", size: 245760, type: "application/pdf" },
      { name: "budget-2024.xlsx", size: 88192, type: "application/vnd.ms-excel" },
    ])
    return (
      <div style={{ maxWidth: 480 }}>
        <InputAttachment
          label="Attached files"
          files={files}
          onChange={(newFiles) =>
            setFiles((prev) => [...prev, ...newFiles.map((f) => ({ name: f.name, size: f.size, type: f.type }))])
          }
          onRemove={(idx) => setFiles((prev) => prev.filter((_, i) => i !== idx))}
        />
      </div>
    )
  },
}
