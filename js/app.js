// class Products {
//   constructor() {
//     let items;
    
//     (async function () {
//       items = await (async () => {
//         return await fetch("./../data/products.json")
//         .then(res => res.json())
//       })();

//       items = items.map(r => {
//         return {
//           id: r['id'],
//           name: r['name'].replace('\n', '').trim() ?? '',
//           brand: r['brand'] ?? '',
//           category: r['category'] ?? '',
//           product_type: r['product_type'] ?? '',
//           image_link: r['image_link'],
//           price: +r['price'] * 5.5,
//           rating: +r['rating'] ?? 0
//         }
//       });
//     })();

//     this.getItems = function () {
//       return items;
//     };
//   }
// }

function toTitleCase(str) {
  if (!str) return 'Null';
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function setComboOptions(combo, values) {
  combo  = document.getElementById(combo);
  values = values.sort();

  values.map(opt => combo.insertAdjacentHTML('beforeend', `<option value=${opt}>${toTitleCase(opt.replace('_', ' '))}</option>`) );
};

function productItem(product, cont) {

  const item = `
  <div class="product" data-name="${product.name}" data-brand="${product.brand}" data-type="${product.product_type}" tabindex="${cont}" id="product_${product.id}">
    <figure class="product-figure">
      <img src="${product.image_link}" width="215" height="215" alt="${product.name}" onerror="javascript:this.src='img/unavailable.png'">
    </figure>
    <section class="product-description">
      <h1 class="product-name">${product.name}</h1>
      <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
      <span class="product-brand background-price">R$ ${(+product.price).toFixed(2)}</span></div>
    </section>
    <!--  // CARREGAR OS DETALHES-->
    ${loadDetails(product)}
  </div>`;

return item;
}

function loadDetails(product) {
  const details = ['brand', 'price', 'rating', 'category', 'product_type'];

  let section =  Object.entries(product)
    .filter(([name, value]) => details.includes(name))
    .map(([name, value]) =>
      `<div class="details-row">
        <div>${name}</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${value}</div>
        </div>
      </div>`
    ).join("");

    return `<section class="product-details">${section}</section>`
}

function printItems() {
  const way = sorting.split('_')[0];
  const field = sorting.split('_')[1];

  items.sort((a, b) => {  
    if (field === 'name') {
      if ( a[field] < b[field] ) return -1
      else if ( a[field] > b[field] ) return 1
      return 0
    } 

    return a[field] - b[field];
  });

  if (way === 'desc') items.reverse();

  //TODO: Apply filters on items;

  for (let cont = qntd; cont < qntd+20; cont++) {
    catalog.innerHTML += productItem(items[cont], cont);
  }

  qntd+=20;
}

function changeFilter() {
  qntd = 0;
  sorting = document.getElementById('sort-type').value;
  document.getElementById('catalog').innerHTML = "";
  printItems();
}

(async () => {
  items = await fetch("./../data/products.json").then(r => r.json()); 
  items = items.map(r => {
    return {
      id: r['id'],
      name: toTitleCase(r['name'].replace('\n', '').trim()),
      brand: toTitleCase(r['brand']),
      category: toTitleCase(r['category']),
      product_type: r['product_type'] ?? 'null',
      image_link: r['image_link'],
      price: +r['price'] * 5.5,
      rating: +r['rating'] ?? 0
    }
  });

  [
    ['filter-brand', 'brand'], 
    ['filter-type', 'product_type']
  ].forEach(([combo, values]) => setComboOptions(combo, [...new Set(items.map(item => item[values]))]));

  printItems();

})();

let items;
let qntd = 0;
let sorting = document.getElementById('sort-type').value;
const catalog = document.getElementById("catalog");

// Implementação de paginação
document.addEventListener('scroll', function(event)
{
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max( 
      body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight 
    );
    
    const actPos = html.scrollTop || body.scrollTop;

    if (Math.floor(height - actPos) <= html.clientHeight) printItems();
});



// /*
// Products Keys
// 0: "id"
// 1: "brand"
// 2: "name"
// 3: "price"
// 4: "price_sign"
// 5: "currency"
// 6: "image_link"
// 7: "product_link"
// 8: "website_link"
// 9: "description"
// 10: "rating"
// 11: "category"
// 12: "product_type"
// 13: "tag_list"
// 14: "created_at"
// 15: "updated_at"
// 16: "product_api_url"
// 17: "api_featured_image"
// 18: "product_colors"
// */
