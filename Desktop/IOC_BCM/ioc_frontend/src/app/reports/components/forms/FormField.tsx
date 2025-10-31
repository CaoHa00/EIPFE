// src/components/forms/FormField.tsx
"use client";
import TextInput from "../fields/TextInput";
import NumberInput from "../fields/NumberInput";
import SelectInput from "../fields/SelectInput";
import FileUpload from "../fields/FileUpload";
import Textarea from "../fields/Textarea";
import DateInput from "../fields/DateInput";

type FieldProps =
  | ({ kind: "text" } & Parameters<typeof TextInput>[0])
  | ({ kind: "number" } & Parameters<typeof NumberInput>[0])
  | ({ kind: "select" } & Parameters<typeof SelectInput>[0])
  | ({ kind: "file" } & Parameters<typeof FileUpload>[0])
  | ({ kind: "textarea" } & Parameters<typeof Textarea>[0])
  | ({ kind: "date" } & Parameters<typeof DateInput>[0]);

export default function FormField(props: FieldProps) {
  switch (props.kind) {
    case "text": {
      const { kind, ...rest } = props as Extract<FieldProps, { kind: "text" }>;
      return <TextInput {...rest} />;
    }
    case "number": {
      const { kind, ...rest } = props as Extract<FieldProps, { kind: "number" }>;
      return <NumberInput {...rest} />;
    }
    case "date": {
      const { kind, ...rest } = props as Extract<FieldProps, { kind: "date" }>;
      return <DateInput {...rest} />;
    }
    case "select": {
      const { kind, ...rest } = props as Extract<FieldProps, { kind: "select" }>;
      return <SelectInput {...rest} />;
    }
    case "file": {
      const { kind, ...rest } = props as Extract<FieldProps, { kind: "file" }>;
      return <FileUpload {...rest} />;
    }
    case "textarea": {
      const { kind, ...rest } = props as Extract<FieldProps, { kind: "textarea" }>;
      return <Textarea {...rest} />;
    }
    default: return null;
  }
}
