(function () {

PC.pages.examples = {}

/**
 * Renders the examples list page
 *
 * The examples list page can optionally be filtered by a category, and will
 * then only show examples from that category. This is only used from the
 * categories page, in order to render lists of examples with only examples
 * from a selected category.
 */

PC.pages.examples.renderHTML = function (category, element) {

console.log("examples "+ category)


  var query = {

    content_type: PC.config.exampleContentTypeId

  }

  if (category) {

    query['fields.category.sys.id[in]'] = category

    if (element) {

      query['fields.element.sys.id[in]'] = element

    }


  }




  return PC.contentfulClient.getEntries(query)
  .then(function (entries) {
    return renderExamples(entries.items)


  })



}

function renderCategoryTitle(examples) {
  return '<h1 class="example-title">examples</h1>' +
    '<div class="examples">' +
    examples.map(renderSingleExample).join('\n') +
    '</div>'
}


function renderExamples(examples) {
  return '<div class="examples">' +
    examples.map(renderSingleExample).join('\n') +
    '</div>'
}

function renderSingleExample(example) {
  var fields = example.fields
  var exampleId = example.sys
  return '<div class="example-in-list">' +
    '<div class="example-details">' +
      renderExampleDetails(fields, exampleId) +
    '</div>' +
  '</div>'
}

function renderExampleDetails(fields, exampleId) {
  return renderExampleHeader(fields, exampleId)+
    '<div class="example-caption">'+
      '<p>' + fields.caption + '</p>'+
    '</div>'+
    '<div class="example-meta">'+
          '<div class="example-meta-list"><p>' +
      fields.industry +
          '</p></div>' +
          '<div class="example-meta-list"><p>' +
      fields.touchpoint +
          '</p></div>' +
          '<div class="example-meta-list"><p>' +
      fields.location +
          '</p></div>' +
      '</div></div>'+
  '<div class="product-image">' +
    renderImage(fields.image[0], fields.slug) +
  '</div>'
}

function renderExampleHeader(fields, exampleId) {
  return '<div class ="example-info-side"><div class="example-header">' +
    '<div class="example-slug"><h2>' +
        fields.slug +
    '</h2></div>' +
    '<div class="example-details">'+
    '<div class="example-details-list"><p>' +
      '<a href="example/' + exampleId.id + '" data-nav>' +
        fields.brand +
      '</a>'+
    '</p></div>' +
    '<div class="example-details-list"><p>' +
      '<a href="category/' + fields.category[0].sys.id + '" data-nav>' +
        fields.category.map(function (category) {
          return category.fields.title
        }).join(', ') +
      '</a>'+
    '</p></div>' +
    '<div class="example-details-list"><p>' +
      '<a href="element/' + fields.element[0].sys.id + '" data-nav>' +
        fields.element.map(function (element) {
          return element.fields.name
        }).join(', ') +
      '</a>'+
    '</p></div>' +
    '</div>'+
  '</div>'
}




function renderImage(image, caption) {
  if(image && image.fields.file) {
    return '<a href="example/' + caption + '" data-nav>' +
      '<img class="example-image" src="' + image.fields.file.url + '"  />' +
    '</a>'
  } else {
    return ''
  }
}



}());
