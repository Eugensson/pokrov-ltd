import Carousel from "@/components/carousel";
import { serializedFrame } from "@/lib/utils";
import { getFramesByCategory } from "@/lib/services/frameService";

const CategoryGalleryPage = async ({ params }: { params: any }) => {
  const frames = await getFramesByCategory({ cat: params.cat });
  const serializedFrames = serializedFrame(frames);

  return (
    <section>
      <Carousel frames={serializedFrames} />
    </section>
  );
};

export default CategoryGalleryPage;
