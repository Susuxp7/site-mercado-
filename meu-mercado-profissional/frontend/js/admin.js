const API = (location.hostname==='localhost'||location.hostname==='127.0.0.1')?'http://localhost:4000/api':'/api';
let token = null;
document.getElementById('login-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const res = await fetch(API + '/auth/login',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username: fd.get('username'), password: fd.get('password') }) });
  const j = await res.json();
  if (res.ok) { token = j.token; document.getElementById('login-area').classList.add('d-none'); document.getElementById('admin-area').classList.remove('d-none'); loadAdmin(); }
  else alert(j.error||'Erro no login');
});

async function loadAdmin(){
  await loadAdminProducts();
  await loadOrders();
}

async function loadAdminProducts(){
  const res = await fetch(API + '/products');
  const list = await res.json();
  const ul = document.getElementById('admin-products');
  ul.innerHTML = '';
  list.forEach(p=>{
    const li = document.createElement('li'); li.className='list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `<div><strong>${p.name}</strong><div class="text-muted">R$ ${p.price.toFixed(2).replace('.',',')}</div></div><div><button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Remover</button></div>`;
    ul.appendChild(li);
  });
}

async function deleteProduct(id){
  const res = await fetch(API + '/products/' + id, { method:'DELETE', headers: { Authorization: 'Bearer ' + token } });
  if (res.ok) loadAdminProducts(); else alert('Erro ao remover');
}

document.getElementById('product-form')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = { name: fd.get('name'), price: parseFloat(fd.get('price')), stock: parseInt(fd.get('stock')||'0'), image: fd.get('image'), description: fd.get('description') };
  const res = await fetch(API + '/products', { method:'POST', headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(body) });
  if (res.ok) { e.target.reset(); loadAdminProducts(); } else alert('Erro ao salvar');
});

async function loadOrders(){
  const res = await fetch(API + '/orders', { headers: { Authorization: 'Bearer ' + token } });
  const list = await res.json();
  const ul = document.getElementById('admin-orders'); ul.innerHTML='';
  list.forEach(o=>{
    const li = document.createElement('li'); li.className='list-group-item';
    li.innerHTML = `<div><strong>Pedido #${o.id}</strong> - R$ ${o.total.toFixed(2).replace('.',',')}<div class="text-muted">${o.customer_name} - ${o.customer_address}</div></div><pre>${o.items}</pre>`;
    ul.appendChild(li);
  });
}
