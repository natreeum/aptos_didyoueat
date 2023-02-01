import { prisma } from '../../prisma';

const getOwner = async (owner_id: string) => {
  try {
    const getOwnerRes = await prisma.owner.findUnique({ where: { owner_id } });
    return getOwnerRes;
  } catch (e) {
    return null;
  }
};

export { getOwner };
