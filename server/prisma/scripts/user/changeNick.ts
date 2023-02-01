import { user } from 'src/api/dto/user.dto';
import { prisma } from '../../prisma';

const changeNick = async (data: user) => {
  const { wallet_address, nickname } = data;
  try {
    const changeRes = await prisma.user.update({
      where: {
        wallet_address,
      },
      data: {
        nickname,
      },
    });
    return changeRes;
  } catch (e) {
    return null;
  }
};

export { changeNick };
