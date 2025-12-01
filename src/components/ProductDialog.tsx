import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  stock: number | null;
  image_url: string | null;
}

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
  onSuccess: () => void;
}

export const ProductDialog = ({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (product) {
        const { error } = await supabase
          .from("products")
          .update(data)
          .eq("id", product.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Produit mis à jour avec succès",
        });
      } else {
        const { error } = await supabase
          .from("products")
          .insert([data]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Produit créé avec succès",
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le produit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {product ? "Modifier le produit" : "Ajouter un produit"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Modifiez les informations du produit ci-dessous"
              : "Remplissez les informations du nouveau produit"}
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          onSubmit={handleSubmit}
          defaultValues={product || undefined}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
