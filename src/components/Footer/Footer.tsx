import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type FooterDevice = "desktop" | "mobile"

export interface FooterLink {
  label: string
  href?: string
  onClick?: () => void
}

export interface FooterProps extends HTMLChakraProps<"footer"> {
  /** Controls which device layout to render */
  device?: FooterDevice
  /** Condensed single-row layout — hides divider, socials, and copyright */
  condensed?: boolean
  /** Nav links rendered in the top/side actions area */
  links?: FooterLink[]
  /** Copyright text */
  copyright?: string
  /** Show social icon buttons */
  showSocials?: boolean
}

// ── Favicon (product symbol) ──────────────────────────────────────────────────
function Favicon() {
  return (
    <chakra.img
      src="/footer/Symbol black web.svg"
      w="58px"
      h="44px"
      flexShrink={0}
      display="block"
      alt=""
    />
  )
}

// ── DOTC Brand Logo ───────────────────────────────────────────────────────────
function DotcLogo() {
  return (
    <chakra.img
      src="/footer/Logo.svg"
      w="76px"
      h="24px"
      flexShrink={0}
      display="block"
      alt="DOTC"
    />
  )
}

// ── "Built by DOTC" lockup ────────────────────────────────────────────────────
function BuiltByDotc() {
  return (
    <chakra.div display="flex" alignItems="center" gap="8px" flexShrink={0} pl="4">
      <chakra.span
        fontFamily="'Lato', sans-serif"
        fontWeight="400"
        fontSize="12px"
        lineHeight="16px"
        color="content.light.default"
        opacity={0.8}
        whiteSpace="nowrap"
      >
        Built by
      </chakra.span>
      <DotcLogo />
    </chakra.div>
  )
}

// ── Nav link button ───────────────────────────────────────────────────────────
function NavLink({ label, href, onClick, isMobile }: FooterLink & { isMobile: boolean }) {
  return (
    <chakra.a
      href={href ?? "#"}
      onClick={onClick}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      h={isMobile ? "32px" : "30px"}
      px={isMobile ? "16px" : "8px"}
      py={isMobile ? "8px" : "7px"}
      bg="transparent"
      border="1px solid transparent"
      borderRadius="8px"
      fontFamily="Inter, sans-serif"
      fontWeight="500"
      fontSize="14px"
      lineHeight="16px"
      color="content.light.default"
      textDecoration="none"
      whiteSpace="nowrap"
      cursor="pointer"
      transition="background 0.15s"
      style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
      _hover={{ bg: "interaction.neutral.default" }}
    >
      {label}
    </chakra.a>
  )
}

// ── Social icon buttons ───────────────────────────────────────────────────────
const socials = [
  { icon: "ri-instagram-line", label: "Instagram" },
  { icon: "ri-linkedin-fill",  label: "LinkedIn"  },
  { icon: "ri-facebook-box-fill", label: "Facebook" },
]

function SocialButtons() {
  return (
    <chakra.div display="flex" alignItems="center">
      {socials.map(({ icon, label }) => (
        <chakra.a
          key={label}
          href="#"
          aria-label={label}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="56px"
          h="56px"
          bg="transparent"
          borderRadius="9px"
          color="content.light.brand-subtle"
          _hover={{ bg: "interaction.neutral.default" }}
          transition="background 0.15s"
        >
          <chakra.i className={icon} fontSize="28px" lineHeight={1} />
        </chakra.a>
      ))}
    </chakra.div>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return <chakra.div w="full" h="1px" bg="brand.secondary.200" flexShrink={0} />
}

// ── Default links ─────────────────────────────────────────────────────────────
const DEFAULT_LINKS: FooterLink[] = [
  { label: "Contact us", href: "#" },
  { label: "Privacy",    href: "#" },
  { label: "Terms of use", href: "#" },
]

const DEFAULT_COPYRIGHT =
  "©2023 Digital Ops-Tech Centre, a member of the Digital and Intelligence Service\nSingapore Armed Forces | Ministry of Defence Singapore"

// ── Component ─────────────────────────────────────────────────────────────────
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  {
    device = "desktop",
    condensed = false,
    links = DEFAULT_LINKS,
    copyright = DEFAULT_COPYRIGHT,
    showSocials = true,
    ...rest
  },
  ref
) {
  const isMobile   = device === "mobile"
  const isDesktop  = device === "desktop"

  // Condensed desktop: single row — logo + "Built by" + links
  if (isDesktop && condensed) {
    return (
      <chakra.footer
        ref={ref}
        display="flex"
        alignItems="center"
        w="1280px"
        bg="brand.secondary.100"
        p="24px"
        gap="20px"
        fontFamily="Inter, sans-serif"
        {...rest}
      >
        <Favicon />
        <BuiltByDotc />
        <chakra.div display="flex" flex={1} gap="20px" alignItems="center" justifyContent="flex-end">
          {links.map((l) => <NavLink key={l.label} isMobile={false} {...l} />)}
        </chakra.div>
      </chakra.footer>
    )
  }

  // Condensed mobile: logo + stacked links + divider + "Built by"
  if (isMobile && condensed) {
    return (
      <chakra.footer
        ref={ref}
        display="flex"
        flexDir="column"
        w="360px"
        bg="brand.secondary.100"
        px="24px"
        pt="28px"
        pb="40px"
        gap="24px"
        fontFamily="Inter, sans-serif"
        {...rest}
      >
        <chakra.div display="flex" flexDir="column" gap="8px">
          <Favicon />
          {links.map((l) => <NavLink key={l.label} isMobile={true} {...l} />)}
        </chakra.div>
        <Divider />
        <BuiltByDotc />
      </chakra.footer>
    )
  }

  // Full desktop: two rows — links row + divider + logo/socials/copyright row
  if (isDesktop) {
    return (
      <chakra.footer
        ref={ref}
        display="flex"
        flexDir="column"
        w="1280px"
        bg="brand.secondary.100"
        px="80px"
        pt="28px"
        pb="40px"
        gap="24px"
        fontFamily="Inter, sans-serif"
        {...rest}
      >
        {/* Top row: Favicon + nav links */}
        <chakra.div display="flex" alignItems="center" gap="20px" w="full">
          <Favicon />
          <chakra.div display="flex" flex={1} gap="20px" alignItems="center" justifyContent="flex-end">
            {links.map((l) => <NavLink key={l.label} isMobile={false} {...l} />)}
          </chakra.div>
        </chakra.div>

        <Divider />

        {/* Bottom row: "Built by DOTC" + socials + copyright */}
        <chakra.div display="flex" alignItems="center" justifyContent="space-between" w="full">
          <BuiltByDotc />
          <chakra.div display="flex" flexDir="column" alignItems="flex-end" gap="4px">
            {showSocials && <SocialButtons />}
            <chakra.p
              m={0}
              fontFamily="Inter, sans-serif"
              fontWeight="400"
              fontSize="10px"
              lineHeight="16px"
              color="content.light.default"
              opacity={0.8}
              textAlign="right"
              whiteSpace="pre-line"
            >
              {copyright}
            </chakra.p>
          </chakra.div>
        </chakra.div>
      </chakra.footer>
    )
  }

  // Full mobile: stacked layout
  return (
    <chakra.footer
      ref={ref}
      display="flex"
      flexDir="column"
      w="360px"
      bg="brand.secondary.100"
      px="24px"
      pt="28px"
      pb="40px"
      gap="24px"
      fontFamily="Inter, sans-serif"
      {...rest}
    >
      {/* Top: Favicon + stacked nav links */}
      <chakra.div display="flex" flexDir="column" gap="8px">
        <Favicon />
        {links.map((l) => <NavLink key={l.label} isMobile={true} {...l} />)}
      </chakra.div>

      <Divider />

      {/* Bottom: "Built by DOTC" + socials + copyright */}
      <chakra.div display="flex" flexDir="column" gap="24px">
        <BuiltByDotc />
        <chakra.div display="flex" flexDir="column" gap="4px">
          {showSocials && <SocialButtons />}
          <chakra.p
            m={0}
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            fontSize="10px"
            lineHeight="16px"
            color="content.light.default"
            opacity={0.8}
            whiteSpace="pre-line"
          >
            {copyright}
          </chakra.p>
        </chakra.div>
      </chakra.div>
    </chakra.footer>
  )
})
