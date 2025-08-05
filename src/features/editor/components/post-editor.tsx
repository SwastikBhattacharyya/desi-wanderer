"use client";

import { SerializedEditorState } from "lexical";
import { useState } from "react";

import { useFormContext } from "react-hook-form";
import { Editor } from "../../../components/blocks/editor";
import { PostType } from "../schemas/post";

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export function PostEditor({ content }: { content: string | null }) {
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    content !== null ? JSON.parse(content) : initialValue,
  );
  const methods = useFormContext<PostType>();

  return (
    <Editor
      editorSerializedState={editorState}
      onSerializedChange={(value) => {
        setEditorState(value);
        methods.setValue("content", JSON.stringify(value));
      }}
    />
  );
}
