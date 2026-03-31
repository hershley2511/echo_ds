import { forwardRef, useRef } from "react"
import { chakra } from "@chakra-ui/react"

export interface AttachedFile {
  name: string
  size: number
  type: string
}

export interface InputAttachmentProps {
  label?: string
  helperText?: string
  errorMessage?: string
  isDisabled?: boolean
  isRequired?: boolean
  accept?: string
  multiple?: boolean
  files?: AttachedFile[]
  onChange?: (files: File[]) => void
  onRemove?: (index: number) => void
  maxSizeMB?: number
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const InputAttachment = forwardRef<HTMLDivElement, InputAttachmentProps>(function InputAttachment(
  {
    label,
    helperText,
    errorMessage,
    isDisabled,
    isRequired,
    accept,
    multiple = false,
    files = [],
    onChange,
    onRemove,
    maxSizeMB = 10,
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const hasError = !!errorMessage

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from((e.target as HTMLInputElement).files ?? [])
    onChange?.(fileList)
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (isDisabled) return
    const droppedFiles = Array.from(e.dataTransfer.files)
    onChange?.(droppedFiles)
  }

  return (
    <chakra.div ref={ref} display="flex" flexDir="column" gap="8px" w="100%" fontFamily="Inter, sans-serif">
      {label && (
        <chakra.label fontSize="13px" fontWeight="600" color="slate.800">
          {label}
          {isRequired && <chakra.span color="red.500" ml="2px">*</chakra.span>}
        </chakra.label>
      )}
      <chakra.div
        border="2px dashed"
        borderColor={hasError ? "red.500" : "grey.100"}
        borderRadius="8px"
        p="24px"
        display="flex"
        flexDir="column"
        alignItems="center"
        gap="8px"
        bg={isDisabled ? "grey.100" : "slate.100"}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        opacity={isDisabled ? 0.6 : 1}
        transition="border-color 0.2s"
        _hover={isDisabled ? {} : { borderColor: "green.500" }}
        onClick={() => !isDisabled && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <chakra.span fontSize="24px">📎</chakra.span>
        <chakra.div textAlign="center">
          <chakra.p m={0} fontSize="14px" fontWeight="500" color="slate.800">
            Click to upload or drag and drop
          </chakra.p>
          <chakra.p m={0} mt="2px" fontSize="12px" color="grey.400">
            Max {maxSizeMB}MB{accept ? ` • ${accept}` : ""}
          </chakra.p>
        </chakra.div>
        <chakra.input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={isDisabled}
          onChange={handleChange}
          display="none"
        />
      </chakra.div>

      {files.length > 0 && (
        <chakra.ul listStyle="none" m={0} p={0} display="flex" flexDir="column" gap="6px">
          {files.map((file, i) => (
            <chakra.li
              key={`${file.name}-${i}`}
              display="flex"
              alignItems="center"
              gap="10px"
              p="8px 12px"
              bg="white"
              border="1px solid"
              borderColor="grey.100"
              borderRadius="6px"
            >
              <chakra.span fontSize="16px">📄</chakra.span>
              <chakra.div flex={1} overflow="hidden">
                <chakra.p m={0} fontSize="13px" fontWeight="500" color="slate.800" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  {file.name}
                </chakra.p>
                <chakra.p m={0} fontSize="11px" color="grey.400">{formatBytes(file.size)}</chakra.p>
              </chakra.div>
              {onRemove && (
                <chakra.button
                  type="button"
                  onClick={() => onRemove(i)}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w="24px"
                  h="24px"
                  bg="transparent"
                  border="none"
                  cursor="pointer"
                  color="grey.400"
                  fontSize="12px"
                  borderRadius="4px"
                  _hover={{ bg: "grey.100", color: "red.500" }}
                  aria-label={`Remove ${file.name}`}
                >
                  ✕
                </chakra.button>
              )}
            </chakra.li>
          ))}
        </chakra.ul>
      )}

      {hasError && <chakra.span fontSize="12px" color="red.500">{errorMessage}</chakra.span>}
      {!hasError && helperText && <chakra.span fontSize="12px" color="slate.700">{helperText}</chakra.span>}
    </chakra.div>
  )
})
