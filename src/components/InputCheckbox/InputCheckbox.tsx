import { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export interface CheckboxOption {
  label: string
  value: string
  description?: string
  isDisabled?: boolean
}

export interface InputCheckboxProps {
  options?: CheckboxOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  label?: string
  helperText?: string
  errorMessage?: string
  isRequired?: boolean
  orientation?: "horizontal" | "vertical"
  // Single checkbox mode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  checkboxLabel?: string
  isDisabled?: boolean
}

export const InputCheckbox = forwardRef<HTMLDivElement, InputCheckboxProps>(function InputCheckbox(
  {
    options,
    value = [],
    onChange,
    label,
    helperText,
    errorMessage,
    isRequired,
    orientation = "vertical",
    checked,
    onCheckedChange,
    checkboxLabel,
    isDisabled,
  },
  ref
) {
  const hasError = !!errorMessage
  const isSingle = !options

  const toggleOption = (optValue: string) => {
    const next = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue]
    onChange?.(next)
  }

  const CheckboxIcon = ({ isChecked, isIndeterminate }: { isChecked: boolean; isIndeterminate?: boolean }) => (
    <chakra.div
      w="16px"
      h="16px"
      borderRadius="4px"
      border="2px solid"
      borderColor={isChecked || isIndeterminate ? "green.800" : hasError ? "red.500" : "grey.100"}
      bg={isChecked || isIndeterminate ? "green.800" : "white"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all 0.15s"
      flexShrink={0}
    >
      {isChecked && (
        <chakra.span color="white" fontSize="10px" fontWeight="700" lineHeight={1}>
          ✓
        </chakra.span>
      )}
      {isIndeterminate && !isChecked && (
        <chakra.div w="8px" h="2px" bg="white" borderRadius="1px" />
      )}
    </chakra.div>
  )

  if (isSingle) {
    return (
      <chakra.label
        ref={ref}
        display="inline-flex"
        alignItems="center"
        gap="8px"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        opacity={isDisabled ? 0.5 : 1}
        fontFamily="Inter, sans-serif"
      >
        <chakra.div position="relative">
          <chakra.input
            type="checkbox"
            checked={checked}
            disabled={isDisabled}
            onChange={(e) => onCheckedChange?.((e.target as HTMLInputElement).checked)}
            position="absolute"
            opacity={0}
            w="16px"
            h="16px"
            m={0}
            cursor={isDisabled ? "not-allowed" : "pointer"}
          />
          <CheckboxIcon isChecked={!!checked} />
        </chakra.div>
        {checkboxLabel && (
          <chakra.span fontSize="14px" color="slate.800" fontWeight="500">
            {checkboxLabel}
          </chakra.span>
        )}
      </chakra.label>
    )
  }

  return (
    <chakra.div ref={ref} display="flex" flexDir="column" gap="6px" fontFamily="Inter, sans-serif">
      {label && (
        <chakra.span fontSize="13px" fontWeight="600" color="slate.800">
          {label}
          {isRequired && <chakra.span color="red.500" ml="2px">*</chakra.span>}
        </chakra.span>
      )}
      <chakra.div
        display="flex"
        flexDir={orientation === "horizontal" ? "row" : "column"}
        gap={orientation === "horizontal" ? "16px" : "8px"}
        flexWrap="wrap"
      >
        {(options ?? []).map((opt) => {
          const isChecked = value.includes(opt.value)
          const isOptDisabled = opt.isDisabled

          return (
            <chakra.label
              key={opt.value}
              display="flex"
              alignItems="flex-start"
              gap="8px"
              cursor={isOptDisabled ? "not-allowed" : "pointer"}
              opacity={isOptDisabled ? 0.5 : 1}
            >
              <chakra.div position="relative" mt="1px">
                <chakra.input
                  type="checkbox"
                  value={opt.value}
                  checked={isChecked}
                  disabled={isOptDisabled}
                  onChange={() => toggleOption(opt.value)}
                  position="absolute"
                  opacity={0}
                  w="16px"
                  h="16px"
                  m={0}
                  cursor={isOptDisabled ? "not-allowed" : "pointer"}
                />
                <CheckboxIcon isChecked={isChecked} />
              </chakra.div>
              <chakra.div display="flex" flexDir="column" gap="2px">
                <chakra.span fontSize="14px" color="slate.800" fontWeight="500">
                  {opt.label}
                </chakra.span>
                {opt.description && (
                  <chakra.span fontSize="12px" color="slate.700">{opt.description}</chakra.span>
                )}
              </chakra.div>
            </chakra.label>
          )
        })}
      </chakra.div>
      {hasError && <chakra.span fontSize="12px" color="red.500">{errorMessage}</chakra.span>}
      {!hasError && helperText && <chakra.span fontSize="12px" color="slate.700">{helperText}</chakra.span>}
    </chakra.div>
  )
})
