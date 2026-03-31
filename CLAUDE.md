# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

**Echo** is a design system project. All UI work must be grounded in the Echo Figma design system file before implementation.

- **Figma file key**: `nBcsxeDdjIpGXhtiBagXd8`
- **Cover node**: `5:2916`
- **Figma URL**: `https://www.figma.com/design/nBcsxeDdjIpGXhtiBagXd8/-Design-System--Echo--Copy-?node-id=5-2916`

When implementing any UI, always call `mcp__figma__get_design_context` with the relevant node ID first. Use the returned tokens, spacing, and component structure as the source of truth.

---

## Design Tokens

### Color Tokens (Light Mode)

| Token | Hex | Usage |
|---|---|---|
| `color/interaction/muted/main/default` | `#DDFBC6` | Subtle button background, muted surfaces |
| `color/base/content/light/brand-strong` | `#026257` | Text/icons on light brand surfaces |
| `color/interaction/success/default` | `#009D7B` | Success state backgrounds |
| `color/interaction/critical/default` | `#C84F25` | Critical/destructive state backgrounds |
| `color/base/content/dark/strong` | `#FFFFFF` | Text/icons on dark/colored backgrounds |

Token naming convention: `color / [base|interaction] / [role] / [context] / [state]`

### Typography Tokens

| Token | Value |
|---|---|
| `typography/fontFamilies/inter` | Inter |
| `typography/fontWeights/medium` | 500 |
| `typography/fontSize/md` | 16px |
| `typography/lineHeights/6` | 24px |

**subhead-1** style: Inter Medium 16px / 24px, letter-spacing -0.096px, OpenType features `cv05 cv10`.

---

## Component Patterns

### Button

Variants × Color Schemes × States:

- **Variant**: `Solid` | `Outline` | `Clear`
- **ColorScheme**: `Subtle` | `Success` | `Critical` | `Neutral` | `Brand` | `Inverse`
- **Size**: `md` (48px height, 16px padding)
- **Border**: `Default` | `Rounded` (8px border-radius)
- **State**: `Default` | `Hover` | `Active`
- **Layout**: `Auto` (with optional leading/trailing icons, 8px gap)

---

## Development Commands

> No source files exist yet — update this section once a stack is initialised.

---

## Architecture

> To be documented once the project structure is established.
