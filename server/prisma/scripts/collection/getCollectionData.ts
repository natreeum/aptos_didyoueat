import { prisma } from '../../prisma';

const getCollectionData = async (collection_id: string) => {
  try {
    const collectionData = await prisma.collection.findUnique({
      where: {
        collection_id,
      },
    });
    return collectionData;
  } catch (e) {
    return null;
  }
};

export { getCollectionData };
