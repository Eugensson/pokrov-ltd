import { EditProductForm } from "./edit-product-form";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Редагування продукту ${params.id}`,
  };
}

export default function AdminEditProduct({
  params,
}: {
  params: { id: string };
}) {
  return <EditProductForm productId={params.id} />;
}
