import { EditGalleryFrameForm } from "./gallery-frame-form";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Редагування світлини ${params.id}`,
  };
}

export default function AdminEditFrame({ params }: { params: { id: string } }) {
  return <EditGalleryFrameForm frameId={params.id} />;
}
