(function () {

PC.pages.categories = {}

/**
 * Renders the categories list page
 *
 * The categories list first gets a list of all existing categories,
 * then uses the elements page method to render that same code but only
 * with elements from the selected category.
 * If no selected category exists, the first from the list is used.
 */
PC.pages.categories.renderHTML = function (params) {

  console.log(params.selectedCategoryId)


  return PC.contentfulClient.getEntries({
    content_type: PC.config.categoryContentTypeId
  })
  .then(function (entries) {
    var query = {}
    if(params.selectedCategoryId) {
      query.categoryId = params.selectedCategoryId


    }




    function isSelectedCategory(entries) {
      if(params.selectedCategoryId) {
        return entries.sys.id === params.selectedCategoryId;
      }

  }


    var selectedCategory = (entries.items.find(isSelectedCategory));
  // { name: 'cherries', quantity: 5 }





    return PC.pages.elements.renderHTML(query)
    .then(function (elementsHTML) {
      return renderCategoryListPage(entries.items, elementsHTML, selectedCategory )
    })







  })
}


function renderCategoryListPage(categories, elementsHTML, selectedCategory ) {


  return '<div class="categories">' +
      '<ul class="categories-list">' + renderCategoryList(categories) + '</ul>' +
      '<div class="elements-list">' + renderSelectedCategory(selectedCategory) + elementsHTML  + '</div>'+
    '</div>'
}



function renderCategoryList(categories) {
  return '<li><a href="categories" data-nav>All</a></li>'+
    categories.map(function (category) {
      var fields = category.fields
      return '<li>' +
        '<a href="categories/' + category.sys.id + '" data-nav>' + fields.title + '</a>' +
        '</li>'
    }).join('\n')
}

function renderSelectedCategory(selectedCategory) {
  if(selectedCategory) {
    return '<div class ="selected-category"> <div class="category-background">' + selectedCategory.fields.background + '</div> <h2 href="categories/' + selectedCategory.fields.title + '" data-nav>' + selectedCategory.fields.title + '</h2>'+
    '<p>' +  selectedCategory.fields.description + '</p></div>'


  }
}

}());
