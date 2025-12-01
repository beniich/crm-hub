import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomerForm } from "./CustomerForm";

interface CustomerDialogProps {
  trigger: React.ReactNode;
  customerId?: string;
  defaultValues?: any;
  onSuccess?: () => void;
}

export function CustomerDialog({ trigger, customerId, defaultValues, onSuccess }: CustomerDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {customerId ? "Modifier le client" : "Nouveau client"}
          </DialogTitle>
          <DialogDescription>
            {customerId
              ? "Modifiez les informations du client."
              : "Ajoutez un nouveau client à votre base de données."}
          </DialogDescription>
        </DialogHeader>
        <CustomerForm
          customerId={customerId}
          defaultValues={defaultValues}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}