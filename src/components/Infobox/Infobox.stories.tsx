import type { Meta, StoryObj } from "@storybook/react"
import { Infobox } from "./Infobox"
import type { InfoboxType, InfoboxSize, InfoboxLeading } from "./Infobox"

const meta: Meta<typeof Infobox> = {
  title: "Feedback/Infobox",
  component: Infobox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    type: {
      control: "select",
      options: ["informational", "warning", "error", "success"] satisfies InfoboxType[],
      description: "Feedback type — controls background colour and icon",
    },
    size: {
      control: "select",
      options: ["md", "sm"] satisfies InfoboxSize[],
      description: "Size variant — affects padding, icon size, and typography",
    },
    leading: {
      control: "select",
      options: ["icon", "emoji"] satisfies InfoboxLeading[],
      description: "Leading element — semantic icon or custom emoji",
    },
    title: { control: "text", description: "Optional bold header above the body copy" },
    emoji: { control: "text", description: "Emoji character shown when leading=\"emoji\"" },
    children: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Infobox>

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    type: "informational",
    size: "md",
    leading: "icon",
    title: "Description",
    children:
      "View our complete list of accepted file types. Please also read our FAQ on email reliability relating to unaccepted file types.",
  },
}

// ── All types × sizes ─────────────────────────────────────────────────────────
export const AllTypesAndSizes: Story = {
  name: "All Types × Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
      {(["md", "sm"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>
            size={size}
          </p>
          {(["informational", "warning", "error", "success"] as const).map((type) => (
            <Infobox key={type} type={type} size={size} title="Description">
              {type === "success"
                ? "Successfully uploaded all file types. You can start using your files below."
                : type === "error"
                ? "Only 30 MyInfo fields are allowed in Email mode (30/30)."
                : type === "warning"
                ? "The highlighted fields in this form have been pre-filled. Please check that these values are what you intend to submit."
                : "View our complete list of accepted file types. Please also read our FAQ on email reliability."}
            </Infobox>
          ))}
        </div>
      ))}
    </div>
  ),
}

// ── Leading: Emoji ────────────────────────────────────────────────────────────
export const LeadingEmoji: Story = {
  name: "Leading: Emoji",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
      {(["informational", "warning", "error", "success"] as const).map((type) => (
        <Infobox key={type} type={type} size="md" leading="emoji" title="Description">
          {type === "success"
            ? "Successfully uploaded all file types. You can start using your files below."
            : type === "error"
            ? "Only 30 MyInfo fields are allowed in Email mode (30/30)."
            : type === "warning"
            ? "The highlighted fields in this form have been pre-filled. Please check that these values are what you intend to submit."
            : "View our complete list of accepted file types. Please also read our FAQ on email reliability."}
        </Infobox>
      ))}
    </div>
  ),
}

// ── Without title ─────────────────────────────────────────────────────────────
export const WithoutTitle: Story = {
  name: "Without Title",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
      {(["informational", "warning", "error", "success"] as const).map((type) => (
        <Infobox key={type} type={type} size="md">
          View our complete list of accepted file types. Please also read our FAQ on email reliability.
        </Infobox>
      ))}
    </div>
  ),
}

// ── With inline links ─────────────────────────────────────────────────────────
export const WithInlineLinks: Story = {
  name: "With Inline Links",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
      <Infobox type="informational" size="md" title="Description">
        View our{" "}
        <a href="#" style={{ textDecoration: "underline" }}>complete list</a>
        {" "}of accepted file types. Please also read our{" "}
        <a href="#" style={{ textDecoration: "underline" }}>FAQ on email reliability</a>
        {" "}relating to unaccepted file types.
      </Infobox>
      <Infobox type="error" size="md" title="Description">
        Only 30 MyInfo fields are allowed in Email mode (30/30).{" "}
        <a href="#" style={{ textDecoration: "underline" }}>Learn more</a>
      </Infobox>
    </div>
  ),
}
