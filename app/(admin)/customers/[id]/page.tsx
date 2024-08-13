import { CustomerEditForm } from "./customer-edit-form";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Редагувати інформацію користувача ${params.id}`,
  };
}

export default function AdminCustomerEdit({
  params,
}: {
  params: { id: string };
}) {
  return <CustomerEditForm userId={params.id} />;
}
