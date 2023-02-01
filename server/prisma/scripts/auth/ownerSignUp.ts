import { prisma } from '../../prisma';
import { getOwner } from './getOwner';

const ownerSignUp = async (owner_id: string, owner_pw: string) => {
  const getOwnerRes = await getOwner(owner_id);
  if (getOwnerRes !== null) return null;
  try {
    const SignUpRes = await prisma.owner.create({
      data: { owner_id, owner_pw },
    });
    return SignUpRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { ownerSignUp };
