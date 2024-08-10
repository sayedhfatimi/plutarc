'use server';
export default async function restRequest(
  verb: string,
  path: string,
  headers: HeadersInit,
  postBody: string,
) {
  const res = await fetch(`https://www.bitmex.com${path}`, {
    method: verb,
    headers,
    body: postBody,
  });

  return res.json();
}
