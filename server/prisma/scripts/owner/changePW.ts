import { prisma } from '../../prisma';
import { ownerSignDto } from 'src/api/dto/ownerSign.dto';

const changePW = async function (data: ownerSignDto) {
  const { id, password } = data;

  try {
    const owner = await prisma.owner.update({
      where: {
        owner_id: id,
      },
      data: {
        owner_pw: password,
      },
    });

    return owner;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { changePW };
