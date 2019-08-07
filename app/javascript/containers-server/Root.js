import React from "react"
import DocumentTitle from "ui/DocumentTitle"

function toElements() {
  return this.map((tag, i) => {
    /* tag.element is what is passed back from app */
    /* tag.type is what is passed back from styled-components */
    const Elem = tag.element || tag.type
    return <Elem {...tag.props} key={i} />
  })
}

function Root({ location, INITIAL_STATE, headTags, bodyTags }) {
  const propsForApplication = { location, INITIAL_STATE }
  const { PROPS_ATTR, CLASS_NAME_ATTR } = self.ReactRailsUJS
  const initialRender = self.ReactRailsUJS.serverRender("renderToString", "App", { ...propsForApplication })
  const propsForReactRoot = {
    [CLASS_NAME_ATTR]: "App",
    [PROPS_ATTR]: JSON.stringify({ ...propsForApplication }),
    dangerouslySetInnerHTML: { __html: initialRender }
  }
  const title = DocumentTitle.rewind()
  const combinedTags = [...headTags]

  return (
    <html lang="en">
      <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# business: http://ogp.me/ns/business#">
        <title>{title}</title>
        {combinedTags::toElements()}
      </head>
      <body>
        {bodyTags.open::toElements()}
        <div {...propsForReactRoot} />
        {bodyTags.close::toElements()}
      </body>
    </html>
  )
}

export default Root
