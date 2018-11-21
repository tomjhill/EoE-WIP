(function () {

PC.pages.product = {}

/**
 * Renders the individual product page
 */

PC.pages.product.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    content_type: PC.config.productContentTypeId,
    'fields.slug': params.caption
  })
  .then(function (entries) {
    return renderSingleProduct(entries.items[0])
  })
}

function renderSingleProduct(product) {
  var fields = product.fields
  return '<div class="product">' +
    '<div class="product-image">' +
      renderImage(fields.image[0]) +
    '</div>' +
    '<div class="product-header">' +
      '<h2>' + fields.brand + '</h2>' +
      '</div>' +
    '<p class="product-categories">' +
      fields.categories.map(function (category) {
        return category.fields.title
      }).join(', ') +
    '</p>' +
    '<p>' + marked(fields.caption) + '</p>' +
    '<p>Size/Type/Color: ' + fields.brand+ '</p>' +
    '<p>' + fields.brand + ' in stock</p>' +
    '<p>' + fields.brand + ' &euro;</p>' +
    '<p>SKU: ' + fields.brand + '</p>' +
    '<p>More details: <a href="'+fields.finder+'">' + fields.finder + '</a></p>' +
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
