//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const name = product['name'];
  const item = `<div class="product" data-name="${name}" data-brand="nyx" data-type="bronzer" tabindex="508">
  <figure class="product-figure">
    <img src="${product['image_link']}" width="215" height="215" alt="${name}" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${product['brand']}</span>
    <span class="product-brand background-price">R$ ${((+product['price']) * 5.5).toFixed(2)}</span></div>
  </section>
  <!--  // CARREGAR OS DETALHES-->
</div>`;

return item;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">nyx</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">10.49</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">5</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"></div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
      </div></section>`;
}

async function getItems() {
  return await fetch("./../data/products.json").then(r => r.json());
}

async function printItems() {
  const items = await getItems();

  items.sort((a,b) => {
    a['rating'] = a['rating'] ?? 0;
    b['rating'] = b['rating'] ?? 0;
    
    return b['rating'] - a['rating'];
  });

  const catalog = document.getElementById("catalog");
  for (let item of items.slice(qntd, qntd+20)) {
    catalog.innerHTML += productItem(item);
  }
  qntd += 20;
}

let qntd = 0;
printItems();

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
    if (height - actPos <= html.clientHeight) printItems();
});
/*
Products Keys
0: "id"
1: "brand"
2: "name"
3: "price"
4: "price_sign"
5: "currency"
6: "image_link"
7: "product_link"
8: "website_link"
9: "description"
10: "rating"
11: "category"
12: "product_type"
13: "tag_list"
14: "created_at"
15: "updated_at"
16: "product_api_url"
17: "api_featured_image"
18: "product_colors"
*/
