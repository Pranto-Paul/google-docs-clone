"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  BoldIcon,
  ItalicIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
  UnderlineIcon,
  StrikethroughIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  MinusIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  LinkIcon,
  ImageIcon,
} from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icons: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icons: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const HeadingButton = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  const headings = [
    { label: "H1", level: 1 },
    { label: "H2", level: 2 },
    { label: "H3", level: 3 },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[80px] flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm">
          <span className="truncate">
            {editor.getAttributes("heading").level
              ? `H${editor.getAttributes("heading").level}`
              : "Paragraph"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {headings.map((h) => (
          <DropdownMenuItem
            key={h.level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: h.level }).run()
            }
          >
            {h.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          Paragraph
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Georgia", value: "Georgia" },
    { label: "Impact", value: "Impact" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[140px] flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm">
          <span className="truncate">
            {editor.getAttributes("textStyle")?.fontFamily || "Arial"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {fonts.map((f) => (
          <DropdownMenuItem
            key={f.value}
            onClick={() => editor.chain().focus().setFontFamily(f.value).run()}
          >
            {f.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  const sizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "36px",
    "48px",
    "72px",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[100px] flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm">
          <span className="truncate">
            {editor.getAttributes("textStyle")?.fontSize || "14px"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sizes.map((s) => (
          <DropdownMenuItem
            key={s}
            onClick={() =>
              editor.chain().focus().setMark("textStyle", { fontSize: s }).run()
            }
          >
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ColorButton = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  return (
    <input
      type="color"
      className="w-7 h-7 rounded cursor-pointer"
      onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
      value={editor.getAttributes("textStyle")?.color || "#000000"}
    />
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  const setLink = () => {
    const url = prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={setLink}
        isActive={editor.isActive("link")}
        icons={LinkIcon}
      />
      {editor.isActive("link") && (
        <button
          onClick={unsetLink}
          className="text-xs px-2 rounded-sm hover:bg-neutral-200/80"
        >
          Remove
        </button>
      )}
    </div>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Enter Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return <ToolbarButton onClick={addImage} icons={ImageIcon} />;
};

const ToolBar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: false,
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
        isActive: false,
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
        isActive: false,
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
        isActive: false,
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold") || false,
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic") || false,
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline") || false,
      },
      {
        label: "Strikethrough",
        icon: StrikethroughIcon,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike") || false,
      },
      {
        label: "Bullet List",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList") || false,
      },
      {
        label: "Ordered List",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList") || false,
      },
      {
        label: "Blockquote",
        icon: QuoteIcon,
        onClick: () => editor?.chain().focus().toggleBlockquote().run(),
        isActive: editor?.isActive("blockquote") || false,
      },
      {
        label: "Horizontal Rule",
        icon: MinusIcon,
        onClick: () => editor?.chain().focus().setHorizontalRule().run(),
        isActive: false,
      },
      {
        label: "Align Left",
        icon: AlignLeftIcon,
        onClick: () => editor?.chain().focus().setTextAlign("left").run(),
        isActive: editor?.isActive({ textAlign: "left" }) || false,
      },
      {
        label: "Align Center",
        icon: AlignCenterIcon,
        onClick: () => editor?.chain().focus().setTextAlign("center").run(),
        isActive: editor?.isActive({ textAlign: "center" }) || false,
      },
      {
        label: "Align Right",
        icon: AlignRightIcon,
        onClick: () => editor?.chain().focus().setTextAlign("right").run(),
        isActive: editor?.isActive({ textAlign: "right" }) || false,
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => alert("Comment feature coming soon!"),
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList") || false,
      },
      {
        label: "Remove Formating",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: false,
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
          icons={item.icon}
        />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* Font Family */}
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* Font Size */}
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* Color */}
      <ColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
          icons={item.icon}
        />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* Link + Image */}
      <LinkButton />
      <ImageButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[2].map((item) => (
        <ToolbarButton
          key={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
          icons={item.icon}
        />
      ))}
    </div>
  );
};

export default ToolBar;
