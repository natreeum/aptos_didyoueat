import { prisma } from '../../prisma';

const getCollectionsByOwner = async (owner_id: string) => {
  try {
    const collections = await prisma.collection.findMany({
      where: { owner_id },
    });
    return collections;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getCollectionsByOwner };
