'use server';
export default async function makeRequest(
  verb: string,
  path: string,
  headers: HeadersInit,
  postBody: string,
) {
  await fetch(`https://www.bitmex.com${path}`, {
    method: verb,
    headers,
    body: postBody,
  });
}
