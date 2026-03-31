import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Modal } from "./Modal"

const meta: Meta = {
  title: "Overlay/Modal",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "10px 20px",
            background: "#026257",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Open Modal
        </button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Modal Title"
          footer={
            <>
              <button
                onClick={() => setOpen(false)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E2E7E9", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 14 }}
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#026257", color: "white", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 14 }}
              >
                Confirm
              </button>
            </>
          }
        >
          <p style={{ margin: 0, fontSize: 14, color: "#6B6F8C", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            This is the modal body content. You can place any content here including forms, descriptions, or confirmations.
          </p>
        </Modal>
      </>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | null>(null)
    return (
      <>
        <div style={{ display: "flex", gap: 8, fontFamily: "Inter, sans-serif" }}>
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E2E7E9", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 13 }}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        {size && (
          <Modal isOpen title={`${size.toUpperCase()} Modal`} size={size} onClose={() => setSize(null)}>
            <p style={{ margin: 0, fontSize: 14, color: "#6B6F8C", fontFamily: "Inter, sans-serif" }}>
              This is a {size} sized modal.
            </p>
          </Modal>
        )}
      </>
    )
  },
}
