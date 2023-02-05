
/* Here we are importing sanity and image from sanity server */
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

/* We are exporting abject with and some properties */
export const client = sanityClient({
  /* All of this properties coming from Sanity manager */
  projectId: 'w8dxlblk',
  dataset: 'production',
  apiVersion: '2023-01-28',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);