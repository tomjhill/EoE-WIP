(function () {

PC.pages.element = {}

/**
 * Renders the individual element page
 */

PC.pages.element.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    content_type: PC.config.elementContentTypeId,
    'fields.slug': params.slug
  })
  .then(function (entries) {
    return renderSingleelement(entries.items[0])
  })
}

function renderSingleelement(element) {
  var fields = element.fields
  return '<div class="element">' +
    '<div class="element-header">' +
      '<h2>' + fields.name + '</h2>' +
      '</div>' +
    // '<p class="element-categories">' +
    //   fields.categories.map(function (category) {
    //     return category.fields.title
    //   }).join(', ') +
    // '</p>' +
    '<p>' + marked(fields.description) + '</p>' +
  '</div>'
}

function renderImage(image) {
  if(image && image.fields.file) {
    return '<img src="' + image.fields.file.url + '" width="300" height="300" />'
  } else {
    return ''
  }
}

}());
