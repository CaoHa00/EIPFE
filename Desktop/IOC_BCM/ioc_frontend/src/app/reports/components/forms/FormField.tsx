// src/components/forms/FormField.tsx
"use client";
import TextInput from "../fields/TextInput";
import NumberInput from "../fields/NumberInput";
import SelectInput from "../fields/SelectInput";
import FileUpload from "../fields/FileUpload";

type FieldProps =
  | ({ kind: "text" } & Parameters<typeof TextInput>[0])
  | ({ kind: "number" } & Parameters<typeof NumberInput>[0])
  | ({ kind: "select" } & Parameters<typeof SelectInput>[0])
  | ({ kind: "file" } & Parameters<typeof FileUpload>[0]);

export default function FormField(props: FieldProps) {
  switch (props.kind) {
    case "text":   return <TextInput {...props} />;
    case "number": return <NumberInput {...props} />;
    case "select": return <SelectInput {...props} />;
    case "file":   return <FileUpload {...props} />;
    default: return null;
  }
}
