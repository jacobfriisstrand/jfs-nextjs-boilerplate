import { defineQuery } from "next-sanity";

const IMAGE_QUERY = `{
  ...,
  alt,
  asset-> {
    _id,
    _type,
    url,
    dimensions {
      _type,
      aspectRatio,
      height,
      width
    }
  }
}`;

const SEO_QUERY = `
  "seo": {
    "title": seo.title,
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
`;

const CONTENT_QUERY = `content[]{
  ...,
  _type == "faqs" => {
    ...,
    faqs[]->{
    _id,
    title,
    body,
    "text": pt::text(body)
}

  },
  _type == "hero" => {
    ...,
    image ${IMAGE_QUERY}
  },
  _type == "textAndImage" => {
    ...,
    image ${IMAGE_QUERY}
  }
}`;

export const NOT_FOUND_PAGE_QUERY = defineQuery(`*[_id == "globalSettings"][0]{
    notFoundPage->{
      ...,
      ${SEO_QUERY}
      ${CONTENT_QUERY}
    }
  }`);
export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  ${SEO_QUERY}
  ${CONTENT_QUERY}
}`);

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "globalSettings"][0]{
    homePage->{
      ...,
      ${SEO_QUERY}
      ${CONTENT_QUERY}
    }
  }`);

export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && isEnabled == true] {
      source,
      destination,
      permanent
  }
`);

export const OG_IMAGE_QUERY = defineQuery(`
  *[_id == $id][0]{
    title,
    "image": seo.image {
      ...,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          palette
        }
      }
    }
  }    
`);

export const SITEMAP_QUERY = defineQuery(`
*[_type in ["page"] && defined(slug.current)] {
    "href": select(
      _type == "page" => "/" + slug.current,
      slug.current
    ),
    _updatedAt
}
`);
