import { event } from 'src/api/dto/event.dto';
import { prisma } from '../../prisma';

const createEvent = async (data: event) => {
  const { collection_id, content } = data;
  try {
    const newEvent = await prisma.event.create({
      data: { collection_id, content },
    });
    return newEvent;
  } catch (e) {
    return null;
  }
};

export { createEvent };
