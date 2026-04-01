import type { Meta, StoryObj } from "@storybook/react"
import { Avatar } from "./Avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    colour: {
      control: "select",
      options: ["strong", "neutral", "subtle", "mix"],
    },
    size:  { control: "select", options: ["md", "sm", "xs", "2xs"] },
    type:  { control: "select", options: ["letter", "icon"] },
    state: {
      control: "select",
      options: ["default", "alert", "disabled"],
      description:
        "Semantic component state. Hover / active / focus are CSS-driven — interact with the avatar in the canvas to trigger them.",
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Playground: Story = {
  args: {
    initials: "JD",
    colour:   "strong",
    size:     "md",
    type:     "letter",
    state:    "default",
    dropdown: false,
  },
}

// ── Colour variants ──────────────────────────────────────────────────────────

export const Colours: Story = {
  name: "Colour Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontFamily: "Inter, sans-serif", alignItems: "flex-end" }}>
      {(["strong", "neutral", "subtle", "mix"] as const).map((c) => (
        <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Avatar initials="JD" colour={c} size="md" />
          <span style={{ fontSize: 11, color: "#7C8094" }}>{c}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-end", fontFamily: "Inter, sans-serif" }}>
      {(["md", "sm", "xs", "2xs"] as const).map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Avatar initials="JD" size={s} colour="strong" />
          <span style={{ fontSize: 11, color: "#7C8094" }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Static states ────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
        {(["default", "alert", "disabled"] as const).map((s) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Avatar initials="JD" state={s} colour="strong" size="md" />
            <span style={{ fontSize: 11, color: "#7C8094" }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
        {(["default", "alert", "disabled"] as const).map((s) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Avatar type="icon" state={s} colour="strong" size="md" />
            <span style={{ fontSize: 11, color: "#7C8094" }}>icon / {s}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9A9FB8", margin: 0 }}>
        Hover → darker bg · Active (press) → ring + darker bg · Focus (tab) → green ring
      </p>
    </div>
  ),
}

// ── Interaction states (forced via Chakra data attributes) ───────────────────
// Chakra UI v3 maps _groupHover / _groupActive / _groupFocusVisible to
// [data-group]:is(:hover, [data-hover]) &  etc., so passing the matching
// data attribute on the root element forces the visual state without JS.

// Chakra UI v3 maps _groupHover / _groupActive / _groupFocusVisible to
// [data-group]:is(:hover, [data-hover]) & etc., so passing the matching
// data attribute on the root element forces the visual state without JS.
const interactionAttrs: Record<string, Record<string, string>> = {
  default: {},
  hover:   { "data-hover": "" },
  active:  { "data-active": "" },
  focus:   { "data-focus-visible": "" },
}

export const InteractionStates: Story = {
  name: "Interaction States",
  render: () => {
    const labels = ["default", "hover", "active", "focus"] as const
    const colours = ["strong", "neutral", "subtle", "mix"] as const

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: "Inter, sans-serif" }}>
        {colours.map((colour) => (
          <div key={colour} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {colour}
            </span>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
              {labels.map((label) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <Avatar initials="JD" colour={colour} size="md" {...interactionAttrs[label]} />
                  <span style={{ fontSize: 11, color: "#9A9FB8" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p style={{ fontSize: 11, color: "#9A9FB8", margin: 0 }}>
          States are forced via Chakra data attributes (data-hover / data-active / data-focus-visible).
        </p>
      </div>
    )
  },
}

// ── Type: Letter vs Icon ─────────────────────────────────────────────────────

export const Types: Story = {
  name: "Type: Letter vs Icon",
  render: () => (
    <div style={{ display: "flex", gap: 24, fontFamily: "Inter, sans-serif" }}>
      {(["strong", "subtle", "neutral"] as const).map((c) => (
        <div key={c} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <Avatar type="letter" initials="JD" colour={c} size="md" />
          <Avatar type="icon"   colour={c} size="md" />
          <span style={{ fontSize: 11, color: "#7C8094" }}>{c}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Remix Icons ──────────────────────────────────────────────────────────────

export const WithRemixIcons: Story = {
  name: "With Remix Icons",
  render: () => {
    const examples: Array<{ colour: "strong" | "neutral" | "subtle" | "mix"; icon: string; label: string }> = [
      { colour: "strong",  icon: "ri-user-3-line",       label: "user" },
      { colour: "neutral", icon: "ri-settings-4-line",   label: "settings" },
      { colour: "subtle",  icon: "ri-shield-check-line", label: "shield" },
      { colour: "mix",     icon: "ri-star-line",         label: "star" },
    ]
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: "Inter, sans-serif" }}>
        {/* All sizes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Sizes
          </span>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
            {(["md", "sm", "xs", "2xs"] as const).map((s) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <Avatar
                  type="icon"
                  colour="strong"
                  size={s}
                  icon={<i className="ri-user-3-line" style={{ fontSize: "inherit", lineHeight: 1 }} />}
                />
                <span style={{ fontSize: 11, color: "#9A9FB8" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Across colours */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Colour variants
          </span>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
            {examples.map(({ colour, icon, label }) => (
              <div key={colour} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <Avatar
                  type="icon"
                  colour={colour}
                  size="md"
                  icon={<i className={icon} style={{ fontSize: "inherit", lineHeight: 1 }} />}
                />
                <span style={{ fontSize: 11, color: "#9A9FB8" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interaction states with remix icon */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Interaction states
          </span>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
            {(["default", "hover", "active", "focus"] as const).map((label) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <Avatar
                  type="icon"
                  colour="strong"
                  size="md"
                  icon={<i className="ri-user-3-line" style={{ fontSize: "inherit", lineHeight: 1 }} />}
                  {...interactionAttrs[label]}
                />
                <span style={{ fontSize: 11, color: "#9A9FB8" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

// ── Dropdown ─────────────────────────────────────────────────────────────────

export const WithDropdown: Story = {
  name: "With Dropdown Caret",
  render: () => (
    <div style={{ display: "flex", gap: 24, fontFamily: "Inter, sans-serif" }}>
      {(["strong", "neutral", "subtle", "mix"] as const).map((c) => (
        <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Avatar initials="JD" colour={c} size="md" dropdown />
          <span style={{ fontSize: 11, color: "#7C8094" }}>{c}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Size × State matrix ──────────────────────────────────────────────────────

export const Matrix: Story = {
  name: "Size × State Matrix",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: "Inter, sans-serif" }}>
      {(["default", "alert", "disabled"] as const).map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 60, fontSize: 11, color: "#7C8094", textAlign: "right", flexShrink: 0 }}>{s}</span>
          {(["md", "sm", "xs", "2xs"] as const).map((sz) => (
            <Avatar key={sz} initials="JD" colour="strong" size={sz} state={s} />
          ))}
        </div>
      ))}
    </div>
  ),
}

// ── Avatar group (stacked) ───────────────────────────────────────────────────

export const AvatarGroup: Story = {
  name: "Avatar Group",
  render: () => {
    const users = [
      { initials: "AT", colour: "strong"  as const },
      { initials: "BL", colour: "subtle"  as const },
      { initials: "CN", colour: "neutral" as const },
      { initials: "DO", colour: "mix"     as const },
      { initials: "EK", colour: "strong"  as const },
    ]
    return (
      <div style={{ display: "flex", fontFamily: "Inter, sans-serif" }}>
        {users.map((u, i) => (
          <div key={u.initials} style={{ marginLeft: i > 0 ? -10 : 0, zIndex: users.length - i }}>
            <Avatar
              initials={u.initials}
              colour={u.colour}
              size="md"
              style={{ border: "2px solid white", borderRadius: "50%" }}
            />
          </div>
        ))}
        <div style={{ marginLeft: -10, zIndex: 0 }}>
          <Avatar
            type="letter"
            initials="+3"
            colour="neutral"
            size="md"
            style={{ border: "2px solid white", borderRadius: "50%" }}
          />
        </div>
      </div>
    )
  },
}
