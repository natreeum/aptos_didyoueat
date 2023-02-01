import { prisma } from '../../prisma';

const getUserData = async (wallet_address: string) => {
  try {
    const userData = await prisma.user.findUnique({
      where: { wallet_address },
    });
    if (!userData) {
      return await prisma.user.create({
        data: { wallet_address, nickname: wallet_address },
      });
    } else return userData;
  } catch (e) {
    return null;
  }
};

export { getUserData };
