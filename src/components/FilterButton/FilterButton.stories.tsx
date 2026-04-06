import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { FilterButton } from "./FilterButton"
import { DropdownTrigger } from "../DropdownMenu/DropdownTrigger"
import type { FilterButtonBorder } from "./FilterButton"
import type { DropdownTriggerColour, DropdownTriggerSize } from "../DropdownMenu/DropdownTrigger"

const meta: Meta<typeof FilterButton> = {
  title: "Navigation/Dropdown Buttons",
  component: FilterButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    border: {
      control: "select",
      options: ["default", "rounded"] satisfies FilterButtonBorder[],
      description: "Border radius shape — default (8px) or pill (50px)",
    },
    filtersApplied: {
      control: "boolean",
      description: "Switches to the muted-green scheme when filters are active",
    },
    showLeadingIcon: { control: "boolean", description: "Show filter icon before label" },
    showTrailingIcon: { control: "boolean", description: "Show chevron icon after label" },
    isOpen: { control: "boolean", description: "Chevron points up when the menu is open" },
    children: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof FilterButton>

// ── Filter Button / Playground ────────────────────────────────────────────────
export const FilterPlayground: Story = {
  name: "Filter Button / Playground",
  args: {
    border: "default",
    filtersApplied: false,
    showLeadingIcon: true,
    showTrailingIcon: true,
    isOpen: false,
    children: "Filter by status",
  },
}

// ── Filter Button / All Variants ──────────────────────────────────────────────
export const FilterAllVariants: Story = {
  name: "Filter Button / All Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "Inter, sans-serif" }}>
      {(["default", "rounded"] as const).map((border) => (
        <div key={border} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#7C8094", textTransform: "capitalize" }}>
            Border: {border}
          </span>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {/* No filters */}
            <FilterButton border={border}>Filter by status</FilterButton>
            <FilterButton border={border} forceInteractionState="hover">Hover</FilterButton>
            <FilterButton border={border} forceInteractionState="active">Active</FilterButton>
            {/* Filters applied */}
            <FilterButton border={border} filtersApplied>Status: Active</FilterButton>
            <FilterButton border={border} filtersApplied forceInteractionState="hover">Status: Active (hover)</FilterButton>
            <FilterButton border={border} filtersApplied isOpen>Status: Active (open)</FilterButton>
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Filter Button / States ────────────────────────────────────────────────────
export const FilterStates: Story = {
  name: "Filter Button / States",
  parameters: { controls: { disable: true } },
  render: () => {
    const states = [
      { label: "Default",          props: {} },
      { label: "Hover",            props: { forceInteractionState: "hover"  as const } },
      { label: "Active (pressed)", props: { forceInteractionState: "active" as const } },
      { label: "Open",             props: { isOpen: true } },
      { label: "Filters applied",  props: { filtersApplied: true } },
      { label: "Applied + hover",  props: { filtersApplied: true, forceInteractionState: "hover"  as const } },
      { label: "Applied + open",   props: { filtersApplied: true, isOpen: true } },
      { label: "No icons",         props: { showLeadingIcon: false, showTrailingIcon: false } },
      { label: "No leading icon",  props: { showLeadingIcon: false } },
    ]
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "Inter, sans-serif" }}>
        {states.map(({ label, props }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 12, color: "#7C8094", width: 160, flexShrink: 0 }}>{label}</span>
            <FilterButton {...props}>Filter by status</FilterButton>
            <FilterButton border="rounded" {...props}>Filter by status</FilterButton>
          </div>
        ))}
      </div>
    )
  },
}

// ── Filter Button / Interactive Demo ──────────────────────────────────────────
export const FilterInteractiveDemo: Story = {
  name: "Filter Button / Interactive Demo",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen]             = useState(false)
    const [border, setBorder]             = useState<FilterButtonBorder>("default")
    const [filtersApplied, setFilters]    = useState(false)
    const [showLeading, setShowLeading]   = useState(true)
    const [showTrailing, setShowTrailing] = useState(true)

    const toggleStyle: React.CSSProperties = { display: "flex", gap: 4, alignItems: "center", cursor: "pointer" }
    const divider = <span style={{ width: 1, background: "#E2E7E9", alignSelf: "stretch" }} />

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#424559", alignItems: "center", flexWrap: "wrap" }}>
          {(["default", "rounded"] as const).map((b) => (
            <label key={b} style={toggleStyle}>
              <input type="radio" checked={border === b} onChange={() => setBorder(b)} /> {b}
            </label>
          ))}
          {divider}
          <label style={toggleStyle}>
            <input type="checkbox" checked={filtersApplied} onChange={(e) => setFilters(e.target.checked)} /> filters applied
          </label>
          <label style={toggleStyle}>
            <input type="checkbox" checked={showLeading} onChange={(e) => setShowLeading(e.target.checked)} /> leading icon
          </label>
          <label style={toggleStyle}>
            <input type="checkbox" checked={showTrailing} onChange={(e) => setShowTrailing(e.target.checked)} /> trailing icon
          </label>
        </div>
        <FilterButton
          border={border}
          filtersApplied={filtersApplied}
          showLeadingIcon={showLeading}
          showTrailingIcon={showTrailing}
          isOpen={isOpen}
          onClick={() => setIsOpen((o) => !o)}
        >
          {filtersApplied ? "Status: Active" : "Filter by status"}
        </FilterButton>
        {isOpen && (
          <div style={{ fontSize: 12, color: "#7C8094" }}>↑ menu would open here</div>
        )}
      </div>
    )
  },
}

// ── Dropdown Trigger / All States × Colours × Sizes ──────────────────────────
export const TriggerStates: Story = {
  name: "Dropdown Trigger / All States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "Inter, sans-serif" }}>
      {(["brand", "neutral"] as const).map((colour) => (
        <div key={colour} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#7C8094", textTransform: "capitalize" }}>{colour}</span>
          <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            {(["md", "sm", "xs"] as const).map((size) => (
              <div key={size} style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <DropdownTrigger colour={colour} size={size}>Default</DropdownTrigger>
                <DropdownTrigger colour={colour} size={size} isOpen>Open</DropdownTrigger>
                <DropdownTrigger colour={colour} size={size} showBadge badgeCount={3}>With badge</DropdownTrigger>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Dropdown Trigger / Playground ─────────────────────────────────────────────
export const TriggerPlayground: Story = {
  name: "Dropdown Trigger / Playground",
  parameters: { controls: { disable: true } },
  render: () => {
    const [colour, setColour] = useState<DropdownTriggerColour>("brand")
    const [size, setSize]     = useState<DropdownTriggerSize>("md")
    const [isOpen, setIsOpen] = useState(false)
    const [badge, setBadge]   = useState(false)

    const toggleStyle: React.CSSProperties = { display: "flex", gap: 4, cursor: "pointer", alignItems: "center" }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#424559", flexWrap: "wrap", alignItems: "center" }}>
          {(["brand", "neutral"] as const).map((c) => (
            <label key={c} style={toggleStyle}>
              <input type="radio" checked={colour === c} onChange={() => setColour(c)} /> {c}
            </label>
          ))}
          <span style={{ width: 1, background: "#E2E7E9", alignSelf: "stretch" }} />
          {(["md", "sm", "xs"] as const).map((s) => (
            <label key={s} style={toggleStyle}>
              <input type="radio" checked={size === s} onChange={() => setSize(s)} /> {s}
            </label>
          ))}
          <span style={{ width: 1, background: "#E2E7E9", alignSelf: "stretch" }} />
          <label style={toggleStyle}>
            <input type="checkbox" checked={badge} onChange={(e) => setBadge(e.target.checked)} /> badge
          </label>
        </div>
        <DropdownTrigger
          colour={colour}
          size={size}
          isOpen={isOpen}
          showBadge={badge}
          badgeCount={3}
          onClick={() => setIsOpen((o) => !o)}
        >
          Filter by
        </DropdownTrigger>
      </div>
    )
  },
}

// ── Side-by-side comparison ───────────────────────────────────────────────────
export const BothStyles: Story = {
  name: "Both Styles — Side by Side",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.96px" }}>
          Filter Button — compact, icon-led, applied-state aware
        </span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <FilterButton>Status</FilterButton>
          <FilterButton filtersApplied>Status: Active</FilterButton>
          <FilterButton border="rounded">Tags</FilterButton>
          <FilterButton border="rounded" filtersApplied>Tags: 3 selected</FilterButton>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.96px" }}>
          Dropdown Trigger — text-led, badge count, size variants
        </span>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <DropdownTrigger size="md">All documents</DropdownTrigger>
          <DropdownTrigger size="sm" showBadge badgeCount={5}>Shared with me</DropdownTrigger>
          <DropdownTrigger size="xs" colour="neutral">Sort by</DropdownTrigger>
        </div>
      </div>
    </div>
  ),
}
