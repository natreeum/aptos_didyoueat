import { prisma } from '../../prisma';

const getTokensByWallet = async (wallet_address: string) => {
  try {
    const tokens = await prisma.token.findMany({
      where: { user_wallet_address: wallet_address },
    });
    return tokens;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getTokensByWallet };
