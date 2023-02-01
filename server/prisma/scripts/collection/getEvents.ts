import { prisma } from '../../prisma';

const getEvents = async (collection_id: string) => {
  try {
    const events = await prisma.event.findMany({ where: { collection_id } });
    return events;
  } catch (e) {
    return null;
  }
};

export { getEvents };
