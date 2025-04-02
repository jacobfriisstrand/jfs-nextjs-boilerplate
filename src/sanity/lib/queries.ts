import { defineQuery } from "next-sanity";

export const IMAGE_QUERY = defineQuery(`{
  ...,
  alt,
  asset-> {
    _id,
    _type,
    url,
    metadata {
      lqip
    },
    dimensions {
      _type,
      aspectRatio,
      height,
      width
    }
  }
}`);

export const POSTS_QUERY
  = defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage ${IMAGE_QUERY},
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const POSTS_SLUGS_QUERY
  = defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const POST_QUERY
  = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage ${IMAGE_QUERY},
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const PAGE_QUERY
  = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  content[]{
    ...,
    _type == "hero" => {
      _type,
      title,
      text,
      image ${IMAGE_QUERY}
    },
    _type == "textAndImage" => {
      _type,
      title,
      image ${IMAGE_QUERY},
      orientation
    },
    _type == "faqs" => {
      ...,
      faqs[]->
    }
  }
}`);
