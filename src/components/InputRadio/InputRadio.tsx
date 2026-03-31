import { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export interface RadioOption {
  label: string
  value: string
  description?: string
  isDisabled?: boolean
}

export interface InputRadioProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  label?: string
  helperText?: string
  errorMessage?: string
  isRequired?: boolean
  name?: string
  orientation?: "horizontal" | "vertical"
}

export const InputRadio = forwardRef<HTMLDivElement, InputRadioProps>(function InputRadio(
  {
    options,
    value,
    onChange,
    label,
    helperText,
    errorMessage,
    isRequired,
    name = "radio-group",
    orientation = "vertical",
  },
  ref
) {
  const hasError = !!errorMessage

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
        {options.map((opt) => {
          const isChecked = value === opt.value
          const isDisabled = opt.isDisabled

          return (
            <chakra.label
              key={opt.value}
              display="flex"
              alignItems="flex-start"
              gap="8px"
              cursor={isDisabled ? "not-allowed" : "pointer"}
              opacity={isDisabled ? 0.5 : 1}
            >
              <chakra.div position="relative" mt="1px" flexShrink={0}>
                <chakra.input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => onChange?.(opt.value)}
                  position="absolute"
                  opacity={0}
                  w="16px"
                  h="16px"
                  m={0}
                  cursor={isDisabled ? "not-allowed" : "pointer"}
                />
                <chakra.div
                  w="16px"
                  h="16px"
                  borderRadius="full"
                  border="2px solid"
                  borderColor={isChecked ? "green.800" : hasError ? "red.500" : "grey.100"}
                  bg={isChecked ? "green.800" : "white"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.15s"
                >
                  {isChecked && (
                    <chakra.div w="6px" h="6px" borderRadius="full" bg="white" />
                  )}
                </chakra.div>
              </chakra.div>
              <chakra.div display="flex" flexDir="column" gap="2px">
                <chakra.span fontSize="14px" color="slate.800" fontWeight="500">
                  {opt.label}
                </chakra.span>
                {opt.description && (
                  <chakra.span fontSize="12px" color="slate.700">
                    {opt.description}
                  </chakra.span>
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
