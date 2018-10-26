(function () {

PC.pages.element = {}

/**
 * Renders the individual element page
 */

PC.pages.element.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    content_type: PC.config.elementContentTypeId,
    'fields.brand': params.brand
  })
  .then(function (entries) {
    return renderSingleElement(entries.items[0])
  })
}

function renderSingleElement(element) {
  var fields = element.fields
  return '<div class="element">' +
    '<div class="element-image">' +
    '</div>' +
    '<div class="element-header">' +
      '<h2>' + fields.brand + '</h2>' +
    '<p class="element-categories">' +
      fields.elementtypes.map(function (elementtype) {
        return elementtype.fields.title
      }).join(', ') +
    '</p>' +
  '</div>'
}

function renderImage(image) {
  if(image && images.fields.file) {
    return '<img src="' + images.fields.file.url + '" width="300" height="300" />'
  } else {
    return ''
  }
}

}());
