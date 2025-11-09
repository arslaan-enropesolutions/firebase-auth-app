import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { ChevronsUpDown } from "lucide-react";
import type { userType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

function ChangeRole({ uid, role }: { uid: string; role: userType["role"] }) {
  const [currentRole, setCurrentRole] = useState(role);
  const [modalOpen, setModalOpen] = useState(false);
  //*update role function
  async function updateUserRole() {
    const id = toast.loading("Updating role...");
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { role: currentRole });
      toast.success(`Role updated to "${currentRole}"`, { id });
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update user role.", { id });
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <ChevronsUpDown className="text-muted-foreground" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select role</DialogTitle>
        </DialogHeader>
        {(
          [
            {
              name: "admin",
              description: "Full access to manage users and settings.",
            },
            {
              name: "employee",
              description: "Can manage assigned tasks and view reports.",
            },
            {
              name: "user",
              description: "Basic access to view and use the app features.",
            },
          ] as {
            name: userType["role"];
            description: string;
          }[]
        ).map((r) => (
          <Item
            variant={"outline"}
            className={cn(
              r.name == currentRole && "bg-primary text-primary-foreground"
            )}
            onClick={() => setCurrentRole(r.name)}
            key={r.name}
          >
            <ItemContent>
              <ItemTitle>{r.name}</ItemTitle>
              <ItemDescription
                className={cn(
                  r.name == currentRole && "text-primary-foreground/60"
                )}
              >
                {r.description}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
        <article className="flex justify-evenly md:justify-end gap-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={updateUserRole}
            className="bg-primary"
            disabled={currentRole === role}
          >
            Save
          </Button>
        </article>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeRole;
