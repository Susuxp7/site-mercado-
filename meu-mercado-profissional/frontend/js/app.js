const API = (location.hostname==='localhost'||location.hostname==='127.0.0.1')?'http://localhost:4000/api':'/api';

async function loadProducts(){
  const res = await fetch(API + '/products');
  const products = await res.json();
  const container = document.getElementById('produtos');
  container.innerHTML = '';
  products.forEach(p=>{
    const col = document.createElement('div'); col.className='col-md-3';
    col.innerHTML = `<div class="product-card p-2"><img src="${p.image}" style="height:160px;object-fit:cover;border-radius:6px"><h5 class="mt-2">${p.name}</h5><div class="text-success fw-bold">R$ ${p.price.toFixed(2).replace('.',',')}</div><div class="mt-2"><a class="btn btn-sm btn-outline-primary me-1" href="produto.html?id=${p.id}">Ver</a><button class="btn btn-sm btn-success" onclick="addToCart(${p.id})">Adicionar</button></div></div>`;
    container.appendChild(col);
  });
}

function getCart(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); renderCartCount(); }
async function addToCart(id){
  const res = await fetch(API + '/products/' + id);
  const p = await res.json();
  const cart = getCart();
  const found = cart.find(i=>i.id===p.id);
  if (found) found.q++; else cart.push({ id: p.id, name: p.name, price: p.price, q:1 });
  saveCart(cart);
  alert('Adicionado ao carrinho');
}
function renderCartCount(){ const c = getCart().reduce((s,i)=>s+i.q,0); document.getElementById('cart-count').innerText = c; }
document.getElementById('cart-btn')?.addEventListener('click', ()=>{ const modal=new bootstrap.Modal(document.getElementById('cartModal')); const items=document.getElementById('cart-items'); items.innerHTML=''; getCart().forEach(i=>{ const li=document.createElement('li'); li.className='list-group-item'; li.innerText=`${i.name} x ${i.q} — R$ ${(i.price*i.q).toFixed(2).replace('.',',')}`; items.appendChild(li); }); document.getElementById('cart-total').innerText = getCart().reduce((s,i)=>s+i.price*i.q,0).toFixed(2).replace('.',','); modal.show(); });
loadProducts(); renderCartCount();
