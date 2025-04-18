import { cn } from "@/lib/utils";
import { Toggle } from "@radix-ui/react-toggle";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

type MenuBarProps = {
  editor: Editor | null;
  isImageSelectorOpen: boolean;
  setIsImageSelectorOpen: (isOpen: boolean) => void;
};

export default function MenuBar({
  editor,
  isImageSelectorOpen,
  setIsImageSelectorOpen,
}: MenuBarProps) {
  if (!editor) {
    return null;
  }

  const options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <ImageIcon className="size-4" />,
      onClick: () => setIsImageSelectorOpen(!isImageSelectorOpen),
      pressed: false,
    },
  ];

  return (
    <div className="mb-1 space-x-2 rounded-md border bg-slate-50 p-1">
      {options.map((option, index) => (
        <Toggle
          disabled={isImageSelectorOpen}
          key={index}
          className={cn(
            "cursor-pointer rounded-md bg-slate-50 p-2 hover:bg-slate-200 focus:bg-slate-200 focus:outline-none",
            {
              "bg-slate-300 hover:bg-slate-300 focus:bg-slate-300":
                option.pressed,
            },
            {
              "hover:bg-slate-50": isImageSelectorOpen && !option.pressed,
            },
          )}
          onClick={() => !isImageSelectorOpen && option.onClick()}
          pressed={option.pressed}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
