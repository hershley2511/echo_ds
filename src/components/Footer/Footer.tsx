import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
}

export interface FooterLinkGroup {
  heading: string
  links: FooterLink[]
}

export interface FooterProps extends HTMLChakraProps<"footer"> {
  logo?: React.ReactNode
  tagline?: string
  linkGroups?: FooterLinkGroup[]
  bottomLinks?: FooterLink[]
  copyright?: string
  variant?: "full" | "minimal"
}

export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  {
    logo,
    tagline,
    linkGroups = [],
    bottomLinks = [],
    copyright,
    variant = "full",
    ...rest
  },
  ref
) {
  if (variant === "minimal") {
    return (
      <chakra.footer
        ref={ref}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap="12px"
        px="24px"
        py="16px"
        borderTop="1px solid"
        borderColor="grey.100"
        fontFamily="Inter, sans-serif"
        {...rest}
      >
        <chakra.span fontSize="12px" color="slate.700">
          {copyright ?? `© ${new Date().getFullYear()} All rights reserved.`}
        </chakra.span>
        {bottomLinks.length > 0 && (
          <chakra.div display="flex" gap="16px" flexWrap="wrap">
            {bottomLinks.map((link) => (
              <chakra.a
                key={link.href}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                fontSize="12px"
                color="slate.700"
                textDecoration="none"
                _hover={{ color: "green.800", textDecoration: "underline" }}
              >
                {link.label}
              </chakra.a>
            ))}
          </chakra.div>
        )}
      </chakra.footer>
    )
  }

  return (
    <chakra.footer
      ref={ref}
      bg="slate.900"
      color="white"
      fontFamily="Inter, sans-serif"
      {...rest}
    >
      <chakra.div
        maxW="1200px"
        mx="auto"
        px="24px"
        py="48px"
        display="grid"
        gridTemplateColumns={`1fr${linkGroups.length > 0 ? ` repeat(${Math.min(linkGroups.length, 4)}, auto)` : ""}`}
        gap="40px"
      >
        <chakra.div display="flex" flexDir="column" gap="12px">
          {logo}
          {tagline && (
            <chakra.p m={0} fontSize="13px" color="#BCC0D1" lineHeight="1.6" maxW="260px">
              {tagline}
            </chakra.p>
          )}
        </chakra.div>
        {linkGroups.map((group) => (
          <chakra.div key={group.heading} display="flex" flexDir="column" gap="12px">
            <chakra.h4 m={0} fontSize="12px" fontWeight="600" color="#7C8094" textTransform="uppercase" letterSpacing="0.8px">
              {group.heading}
            </chakra.h4>
            {group.links.map((link) => (
              <chakra.a
                key={link.href}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                fontSize="14px"
                color="#D8D9E5"
                textDecoration="none"
                _hover={{ color: "white" }}
              >
                {link.label}
              </chakra.a>
            ))}
          </chakra.div>
        ))}
      </chakra.div>
      <chakra.div
        borderTop="1px solid"
        borderColor="rgba(255,255,255,0.08)"
        px="24px"
        py="16px"
        maxW="1200px"
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap="12px"
      >
        <chakra.span fontSize="12px" color="#7C8094">
          {copyright ?? `© ${new Date().getFullYear()} All rights reserved.`}
        </chakra.span>
        {bottomLinks.length > 0 && (
          <chakra.div display="flex" gap="16px">
            {bottomLinks.map((link) => (
              <chakra.a
                key={link.href}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                fontSize="12px"
                color="#7C8094"
                textDecoration="none"
                _hover={{ color: "white" }}
              >
                {link.label}
              </chakra.a>
            ))}
          </chakra.div>
        )}
      </chakra.div>
    </chakra.footer>
  )
})
