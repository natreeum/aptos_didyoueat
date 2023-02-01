import { collection } from 'src/api/dto/collection.dto';
import { prisma } from '../../prisma';

const createCollection = async (data: collection) => {
  const {
    collection_id,
    img_url,
    location,
    created_at,
    coordinate_x,
    coordinate_y,
    owner_id,
    shop_name,
  } = data;

  try {
    const newCollection = await prisma.collection.create({
      data: {
        collection_id,
        img_url,
        location,
        created_at,
        coordinate_x,
        coordinate_y,
        owner_id,
        shop_name,
      },
    });

    return newCollection;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { createCollection };
