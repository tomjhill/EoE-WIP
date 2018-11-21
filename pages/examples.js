(function () {

PC.pages.examples = {}

/**
<<<<<<< HEAD
 * Renders the elements list page
 *
 * The elements list page can optionally be filtered by a category, and will
 * then only show elements from that category. This is only used from the
 * categories page, in order to render lists of elements with only elements
 * from a selected category.
 */

PC.pages.examples.renderHTML = function (params) {


  var query = {
    content_type: PC.config.exampleContentTypeId
  }

  if (params && params.elementId) {

    query['fields.element.sys.id[in]'] = params.elementId

  }

  return PC.contentfulClient.getEntries(query)

  .then(function (entries) {
    return renderExamples(entries.items)


  })




=======
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
>>>>>>> a9af1a4936e2306ff201bbf95d90e243101820d6



}

function renderCategoryTitle(examples) {
<<<<<<< HEAD
  return '<h1 class="category-title">Examples</h1>' +
=======
  return '<h1 class="example-title">examples</h1>' +
>>>>>>> a9af1a4936e2306ff201bbf95d90e243101820d6
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
<<<<<<< HEAD
  return '<div class="example-in-list">' +
    '<div class="example-details">' +
      renderExampleDetails(fields) +
=======
  var exampleId = example.sys
  return '<div class="example-in-list">' +
    '<div class="example-details">' +
      renderExampleDetails(fields, exampleId) +
>>>>>>> a9af1a4936e2306ff201bbf95d90e243101820d6
    '</div>' +
  '</div>'
}

<<<<<<< HEAD
function renderExampleDetails(fields) {
  return renderExampleHeader(fields)

}

function renderExampleHeader(fields) {
  return '<div class="example-header">' +
    '<h2>' +
      '<a href="example/' + fields.description + '" data-nav>' +
        fields.name +
      '</a>'+
    '</h2>' +
  '</div>'
}

function renderImage(image, caption) {
  if(image && image.fields.file) {
    return '<a href="element/' + caption + '" data-nav>' +
      '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
=======
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
>>>>>>> a9af1a4936e2306ff201bbf95d90e243101820d6
    '</a>'
  } else {
    return ''
  }
}



}());
