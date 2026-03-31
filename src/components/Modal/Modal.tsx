import { forwardRef, useEffect } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type ModalSize = "sm" | "md" | "lg" | "xl"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: ModalSize
  children?: React.ReactNode
  footer?: React.ReactNode
  closeOnOverlayClick?: boolean
}

const modalWidths: Record<ModalSize, string> = {
  sm: "380px",
  md: "480px",
  lg: "600px",
  xl: "768px",
}

export function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  footer,
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <chakra.div
      position="fixed"
      inset={0}
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="Inter, sans-serif"
    >
      <chakra.div
        position="absolute"
        inset={0}
        bg="rgba(31, 34, 51, 0.6)"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <chakra.div
        position="relative"
        bg="white"
        borderRadius="12px"
        boxShadow="0 20px 60px rgba(0,0,0,0.18)"
        w={modalWidths[size]}
        maxW="calc(100vw - 32px)"
        maxH="calc(100vh - 64px)"
        display="flex"
        flexDir="column"
        overflow="hidden"
      >
        {title && (
          <chakra.div
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px="24px"
            py="16px"
            borderBottom="1px solid"
            borderColor="grey.100"
          >
            <chakra.h2 m={0} fontSize="16px" fontWeight="600" color="slate.800">
              {title}
            </chakra.h2>
            <chakra.button
              type="button"
              onClick={onClose}
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="28px"
              h="28px"
              bg="transparent"
              border="none"
              cursor="pointer"
              color="slate.700"
              fontSize="16px"
              borderRadius="6px"
              _hover={{ bg: "slate.100" }}
              aria-label="Close"
            >
              ✕
            </chakra.button>
          </chakra.div>
        )}
        <chakra.div flex={1} overflowY="auto" px="24px" py="20px">
          {children}
        </chakra.div>
        {footer && (
          <chakra.div
            px="24px"
            py="16px"
            borderTop="1px solid"
            borderColor="grey.100"
            display="flex"
            justifyContent="flex-end"
            gap="8px"
          >
            {footer}
          </chakra.div>
        )}
      </chakra.div>
    </chakra.div>
  )
}
