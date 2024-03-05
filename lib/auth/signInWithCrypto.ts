import { ethers } from 'ethers';
import { signIn } from 'next-auth/react';

// Fix typescript errors for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// This function requests a nonce then signs it, proving that
//  the user owns the public address they are using
export default async function signInWithEthereum() {
  try {
    // check if metamask is installed
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    // Get the wallet provider, the signer and address
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const publicAddress = await signer.getAddress();

    // Send the public address to generate a nonce associates with our account
    const response = await fetch('/api/auth/crypto/generateNonce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        publicAddress,
      }),
    });
    const responseData = await response.json();

    // Sign the received nonce
    const signedNonce = await signer.signMessage(responseData.nonce);
    console.log('publicAddress: ', publicAddress);
    console.log('signedNonce: ', signedNonce);

    // Use NextAuth to sign in with our address and the nonce
    await signIn('crypto', {
      publicAddress,
      signedNonce,
      callbackUrl: '/auth/dashboard',
    });
  } catch {
    window.alert('Error with signing, please try again.');
  }
}
