import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import DialogPortal from "../../Layout/DialogPortal";
import { usePrompts, type Prompt } from "~hooks/usePrompts";

export const DeletePromptButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [prompts, setPrompts] = usePrompts();

  const handleDelete = () => {
    const removeItem = (items: Prompt[], id: string): Prompt[] => {
      const newItems = items.filter((item) => item.id !== id);
      newItems.forEach((item) => {
        if (item.children) {
          item.children = removeItem(item.children, id);
        }
      });
      return newItems;
    };
    setPrompts([]);
    setPrompts(removeItem(prompts, id));
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="cdx-rounded-sm cdx-p-1 dark:cdx-bg-red-500/50 cdx-bg-red-300/50"
          type="button"
        >
          <HiTrash />
        </button>
      </Dialog.Trigger>
      <DialogPortal
        title="Delete Prompt ?"
        primaryAction={() => {
          handleDelete();
          setOpen(false);
        }}
        secondaryAction={() => setOpen(false)}
        primaryText="Delete"
      >
        You are about to delete this prompt. This action cannot be undone.
      </DialogPortal>
    </Dialog.Root>
  );
};
