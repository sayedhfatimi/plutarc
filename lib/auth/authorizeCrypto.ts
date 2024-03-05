import { ethers } from 'ethers';
import prisma from '@/lib/prisma';
import RequestInternal from 'next-auth';

export default async function authorizeCrypto(
  credentials: Record<'publicAddress' | 'signedNonce', string> | undefined,
  req: Pick<
    keyof typeof RequestInternal,
    'body' | 'headers' | 'method' | 'query'
  >,
) {
  if (!credentials) return null;

  const { publicAddress, signedNonce } = credentials;

  // Get user from database with their generated nonce
  const user = await prisma.user.findUnique({
    where: { publicAddress },
    include: { cryptoLoginNonce: true },
  });

  if (!user?.cryptoLoginNonce) return null;

  // Compute the signer address from the saved nonce and the received signature
  const signerAddress = ethers.verifyMessage(
    user.cryptoLoginNonce.nonce,
    signedNonce,
  );

  // Check that the signer address matches the public address that is trying to sign in
  if (signerAddress !== publicAddress) return null;

  // Check that the nonce is not expired
  if (user.cryptoLoginNonce.expires < new Date()) return null;

  // Everything is fine, clear the nonce and return the user
  await prisma.cryptoLoginNonce.delete({ where: { userId: user.id } });

  return {
    id: user.id,
    publicAddress: user.publicAddress,
  };
}
