
import { useState, useEffect, useContext, createContext, useReducer } from "react";

/* ══════════════ PRODUCT DATA ══════════════ */
const PRODUCTS = [
  {id:1,  name:"Fresh Tomatoes",    cat:"veggies", e:"🍅", price:30,  orig:45,  unit:"500g",    badge:"sale"},
  {id:2,  name:"Baby Spinach",      cat:"veggies", e:"🥬", price:25,  orig:25,  unit:"250g",    badge:"fresh"},
  {id:3,  name:"Broccoli",          cat:"veggies", e:"🥦", price:55,  orig:75,  unit:"500g",    badge:"sale"},
  {id:4,  name:"Carrot",            cat:"veggies", e:"🥕", price:30,  orig:30,  unit:"500g",    badge:"fresh"},
  {id:5,  name:"Onions",            cat:"veggies", e:"🧅", price:20,  orig:28,  unit:"1kg",     badge:"sale"},
  {id:6,  name:"Green Chilli",      cat:"veggies", e:"🌶️", price:15,  orig:15,  unit:"100g",    badge:"fresh"},
  {id:7,  name:"Cauliflower",       cat:"veggies", e:"🥦", price:35,  orig:50,  unit:"1 head",  badge:"sale"},
  {id:8,  name:"Garlic",            cat:"veggies", e:"🧄", price:40,  orig:40,  unit:"100g",    badge:"fresh"},
  {id:9,  name:"Potato",            cat:"veggies", e:"🥔", price:25,  orig:35,  unit:"1kg",     badge:"sale"},
  {id:10, name:"Cucumber",          cat:"veggies", e:"🥒", price:20,  orig:20,  unit:"2 pcs",   badge:"fresh"},
  {id:11, name:"Alphonso Mango",    cat:"fruits",  e:"🥭", price:80,  orig:120, unit:"4 pcs",   badge:"sale"},
  {id:12, name:"Bananas",           cat:"fruits",  e:"🍌", price:40,  orig:40,  unit:"1 dozen", badge:"fresh"},
  {id:13, name:"Grapes",            cat:"fruits",  e:"🍇", price:60,  orig:80,  unit:"500g",    badge:"sale"},
  {id:14, name:"Watermelon",        cat:"fruits",  e:"🍉", price:45,  orig:60,  unit:"1 kg",    badge:"sale"},
  {id:15, name:"Pomegranate",       cat:"fruits",  e:"🍎", price:70,  orig:90,  unit:"2 pcs",   badge:"sale"},
  {id:16, name:"Papaya",            cat:"fruits",  e:"🍈", price:35,  orig:35,  unit:"1 pc",    badge:"fresh"},
  {id:17, name:"Full Cream Milk",   cat:"dairy",   e:"🥛", price:28,  orig:28,  unit:"500ml",   badge:"fresh"},
  {id:18, name:"Paneer",            cat:"dairy",   e:"🧀", price:90,  orig:90,  unit:"200g",    badge:"fresh"},
  {id:19, name:"Butter",            cat:"dairy",   e:"🧈", price:55,  orig:65,  unit:"100g",    badge:"sale"},
  {id:20, name:"Curd",              cat:"dairy",   e:"🥛", price:35,  orig:35,  unit:"400g",    badge:"fresh"},
  {id:21, name:"Toor Dal",          cat:"grains",  e:"🫘", price:75,  orig:90,  unit:"500g",    badge:"sale"},
  {id:22, name:"Basmati Rice",      cat:"grains",  e:"🌾", price:85,  orig:100, unit:"1kg",     badge:"sale"},
  {id:23, name:"Chana Dal",         cat:"grains",  e:"🫘", price:65,  orig:65,  unit:"500g",    badge:"fresh"},
  {id:24, name:"Wheat Flour",       cat:"grains",  e:"🌾", price:45,  orig:55,  unit:"1kg",     badge:"sale"},
  {id:25, name:"Coriander Seeds",   cat:"spices",  e:"🌿", price:20,  orig:20,  unit:"100g",    badge:"fresh"},
  {id:26, name:"Turmeric",          cat:"spices",  e:"🟡", price:35,  orig:35,  unit:"100g",    badge:"fresh"},
  {id:27, name:"Cumin Seeds",       cat:"spices",  e:"🌱", price:30,  orig:40,  unit:"100g",    badge:"sale"},
  {id:28, name:"Red Chilli Powder", cat:"spices",  e:"🌶️", price:45,  orig:45,  unit:"100g",    badge:"fresh"},
  {id:29, name:"Mint Leaves",       cat:"herbs",   e:"🌱", price:12,  orig:12,  unit:"50g",     badge:"fresh"},
  {id:30, name:"Curry Leaves",      cat:"herbs",   e:"🌿", price:8,   orig:8,   unit:"20g",     badge:"fresh"},
  {id:31, name:"Coriander Leaves",  cat:"herbs",   e:"🌿", price:10,  orig:15,  unit:"50g",     badge:"sale"},
  {id:32, name:"Almonds",           cat:"snacks",  e:"🥜", price:120, orig:160, unit:"100g",    badge:"sale"},
  {id:33, name:"Cashews",           cat:"snacks",  e:"🥜", price:150, orig:200, unit:"100g",    badge:"sale"},
  {id:34, name:"Raisins",           cat:"snacks",  e:"🫐", price:80,  orig:100, unit:"100g",    badge:"sale"},
];

const CATS = [
  {k:"all",    l:"All Items",       e:"🏪"},
  {k:"veggies",l:"Vegetables",      e:"🥦"},
  {k:"fruits", l:"Fruits",          e:"🍎"},
  {k:"dairy",  l:"Dairy",           e:"🥛"},
  {k:"grains", l:"Grains & Pulses", e:"🌾"},
  {k:"spices", l:"Spices",          e:"🌶️"},
  {k:"herbs",  l:"Herbs",           e:"🌿"},
  {k:"snacks", l:"Dry Fruits",      e:"🥜"},
];

/* ══════════════ CART REDUCER ══════════════ */
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": return { ...state, [action.id]: (state[action.id] || 0) + 1 };
    case "INC": return { ...state, [action.id]: (state[action.id] || 0) + 1 };
    case "DEC": {
      const nq = (state[action.id] || 1) - 1;
      if (nq <= 0) { const s = { ...state }; delete s[action.id]; return s; }
      return { ...state, [action.id]: nq };
    }
    case "CLEAR": return {};
    default: return state;
  }
};

/* ══════════════ TOAST CONTEXT ══════════════ */
const ToastCtx = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const show = (msg) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div style={{ position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",zIndex:9999,display:"flex",flexDirection:"column",gap:8,alignItems:"center",pointerEvents:"none" }}>
        {toasts.map((t) => (
          <div key={t.id} style={{ background:"#1a2e0f",color:"#fff",padding:"12px 24px",borderRadius:14,fontSize:".88rem",fontWeight:600,boxShadow:"0 8px 32px rgba(0,0,0,.25)",whiteSpace:"nowrap" }}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

const useToast = () => useContext(ToastCtx);

/* ══════════════ INLINE STYLE HELPERS ══════════════ */
const btn = (bg, c = "#fff", extra = {}) => ({
  background: bg, color: c, border: "none", borderRadius: 12,
  padding: "10px 22px", fontFamily: "DM Sans,sans-serif",
  fontWeight: 600, fontSize: ".9rem", cursor: "pointer", transition: ".2s", ...extra,
});
const inputStyle = {
  width: "100%", border: "2px solid #e5e7eb", borderRadius: 12,
  padding: "11px 16px", fontSize: ".9rem", fontFamily: "DM Sans,sans-serif",
  outline: "none", background: "#fffbf0", transition: ".2s",
};
const cardStyle = {
  background: "#fff", borderRadius: 18,
  boxShadow: "0 4px 24px rgba(45,122,31,.10)", overflow: "hidden",
  transition: ".25s", cursor: "pointer",
};

/* ══════════════ PRODUCT CARD ══════════════ */
function ProdCard({ p, cart, dispatch }) {
  const [hover, setHover] = useState(false);
  const toast = useToast();
  const qty = cart[p.id] || 0;
  const disc = Math.round((1 - p.price / p.orig) * 100);

  return (
    <div
      style={{ ...cardStyle, transform: hover ? "translateY(-6px)" : "none", boxShadow: hover ? "0 14px 40px rgba(45,122,31,.18)" : cardStyle.boxShadow }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ background: "#e8f5e3", padding: "28px 10px", textAlign: "center", fontSize: "4rem", position: "relative" }}>
        {p.badge === "fresh"
          ? <span style={{ position:"absolute",top:10,left:10,background:"#2d7a1f",color:"#fff",fontSize:".68rem",fontWeight:700,padding:"3px 10px",borderRadius:50 }}>Fresh</span>
          : disc > 0 && <span style={{ position:"absolute",top:10,left:10,background:"#f97316",color:"#fff",fontSize:".68rem",fontWeight:700,padding:"3px 10px",borderRadius:50 }}>{disc}% OFF</span>
        }
        {p.e}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 600, fontSize: ".93rem", marginBottom: 3 }}>{p.name}</div>
        <div style={{ color: "#6b7280", fontSize: ".78rem", marginBottom: 10 }}>{p.unit}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontSize: "1.15rem", fontWeight: 800, color: "#2d7a1f" }}>
            ₹{p.price}{" "}
            {p.orig > p.price && <del style={{ color: "#9ca3af", fontSize: ".8rem", fontWeight: 400, fontFamily: "DM Sans,sans-serif" }}>₹{p.orig}</del>}
          </div>
          {qty > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={() => dispatch({ type: "DEC", id: p.id })} style={{ background:"#e8f5e3",border:"none",borderRadius:8,width:30,height:30,fontWeight:700,cursor:"pointer",color:"#2d7a1f" }}>−</button>
              <span style={{ fontWeight: 700, minWidth: 18, textAlign: "center", fontSize: ".88rem" }}>{qty}</span>
              <button onClick={() => dispatch({ type: "INC", id: p.id })} style={{ background:"#e8f5e3",border:"none",borderRadius:8,width:30,height:30,fontWeight:700,cursor:"pointer",color:"#2d7a1f" }}>+</button>
            </div>
          ) : (
            <button
              onClick={() => { dispatch({ type: "ADD", id: p.id }); toast("✅ " + p.name + " added!"); }}
              style={{ background:"#2d7a1f",color:"#fff",border:"none",borderRadius:10,width:34,height:34,fontSize:"1.3rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}
            >+</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════ NAVBAR ══════════════ */
function Navbar({ page, setPage, cartCount, openCart }) {
  const links = [["home","Home"],["shop","Shop"],["deals","🔥 Deals"],["track","Track"],["contact","Contact"]];
  return (
    <nav style={{ background:"#fff",boxShadow:"0 2px 20px rgba(45,122,31,.08)",position:"sticky",top:0,zIndex:900,padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:68 }}>
      <div onClick={() => setPage("home")} style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.65rem",fontWeight:800,color:"#2d7a1f",cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
        🌿 Aapla <span style={{ color: "#f97316" }}>Bazaar</span>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {links.map(([k, l]) => (
          <button key={k} onClick={() => setPage(k)} style={btn(page===k?"#e8f5e3":"transparent", page===k?"#2d7a1f":"#1a2e0f", { padding:"8px 13px",fontSize:".88rem",borderRadius:10 })}>
            {l}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={openCart} style={{ position:"relative",background:"#e8f5e3",border:"none",borderRadius:12,padding:"10px 15px",cursor:"pointer",fontSize:"1.15rem" }}>
          🛒
          {cartCount > 0 && <span style={{ position:"absolute",top:-5,right:-5,background:"#f97316",color:"#fff",fontSize:".65rem",fontWeight:700,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}>{cartCount}</span>}
        </button>
        <button onClick={() => setPage("login")} style={btn("transparent","#2d7a1f",{ border:"2px solid #2d7a1f",padding:"8px 18px" })}>Login</button>
        <button onClick={() => setPage("signup")} style={btn("#2d7a1f","#fff",{ padding:"9px 20px" })}>Sign Up</button>
      </div>
    </nav>
  );
}

/* ══════════════ CART SIDEBAR ══════════════ */
function CartSidebar({ open, onClose, cart, dispatch }) {
  const toast = useToast();
  const items = Object.entries(cart);
  const total = items.reduce((s, [id, q]) => { const p = PRODUCTS.find((x) => x.id == id); return p ? s + p.price * q : s; }, 0);

  const checkout = () => {
    if (!items.length) { toast("⚠️ Cart is empty!"); return; }
    dispatch({ type: "CLEAR" });
    onClose();
    toast("🎉 Order placed! Delivering in ~25 mins!");
  };

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:1000,display:open?"block":"none" }} />
      <div style={{ position:"fixed",right:0,top:0,bottom:0,width:370,background:"#fff",zIndex:1001,transform:open?"translateX(0)":"translateX(100%)",transition:".3s cubic-bezier(.4,0,.2,1)",display:"flex",flexDirection:"column",boxShadow:"-8px 0 40px rgba(0,0,0,.15)" }}>
        <div style={{ padding:24,borderBottom:"1px solid #f0f0f0",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <h3 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.3rem",fontWeight:800 }}>🛒 Your Basket</h3>
          <button onClick={onClose} style={{ background:"none",border:"none",fontSize:"1.3rem",cursor:"pointer",color:"#6b7280" }}>✕</button>
        </div>
        <div style={{ flex:1,overflowY:"auto",padding:"16px 24px" }}>
          {!items.length
            ? <p style={{ color:"#6b7280",textAlign:"center",marginTop:50,fontSize:".9rem" }}>Your cart is empty 🥕</p>
            : items.map(([id, qty]) => {
                const p = PRODUCTS.find((x) => x.id == id);
                if (!p) return null;
                return (
                  <div key={id} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:"1px solid #f5f5f5" }}>
                    <div style={{ width:50,height:50,background:"#e8f5e3",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem" }}>{p.e}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600,fontSize:".88rem" }}>{p.name}</div>
                      <div style={{ color:"#6b7280",fontSize:".77rem" }}>{p.unit}</div>
                    </div>
                    <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6 }}>
                      <div style={{ fontWeight:700,color:"#2d7a1f",fontSize:".92rem" }}>₹{p.price * qty}</div>
                      <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                        <button onClick={() => dispatch({ type:"DEC",id:p.id })} style={{ background:"#e8f5e3",border:"none",borderRadius:8,width:28,height:28,fontWeight:700,cursor:"pointer",color:"#2d7a1f" }}>−</button>
                        <span style={{ fontWeight:600,minWidth:18,textAlign:"center",fontSize:".88rem" }}>{qty}</span>
                        <button onClick={() => dispatch({ type:"INC",id:p.id })} style={{ background:"#e8f5e3",border:"none",borderRadius:8,width:28,height:28,fontWeight:700,cursor:"pointer",color:"#2d7a1f" }}>+</button>
                      </div>
                    </div>
                  </div>
                );
              })
          }
        </div>
        <div style={{ padding:"20px 24px",borderTop:"1px solid #f0f0f0" }}>
          <div style={{ display:"flex",justifyContent:"space-between",fontWeight:700,marginBottom:16,fontSize:"1rem" }}>
            <span>Total</span>
            <span style={{ color:"#2d7a1f",fontSize:"1.2rem" }}>₹{total}</span>
          </div>
          <button onClick={checkout} style={btn("#2d7a1f","#fff",{ width:"100%",padding:14,fontSize:"1rem",borderRadius:14 })}>Proceed to Checkout →</button>
        </div>
      </div>
    </>
  );
}

/* ══════════════ FOOTER ══════════════ */
function Footer({ setPage }) {
  return (
    <footer style={{ background:"#1a2e0f",color:"rgba(255,255,255,.8)",padding:"48px 48px 24px" }}>
      <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36,marginBottom:36 }}>
        <div>
          <div style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.6rem",fontWeight:800,color:"#fff",marginBottom:12 }}>
            🌿 Aapla <span style={{ color:"#f97316" }}>Bazaar</span>
          </div>
          <p style={{ fontSize:".84rem",lineHeight:1.8,opacity:.7,maxWidth:270 }}>Punes's & PCMC's favourite platform for fresh vegetables, fruits & groceries.</p>
          <div style={{ display:"flex",gap:10,marginTop:16 }}>
            {["📘","📸","🐦","▶️"].map((i) => (
              <div key={i} style={{ width:36,height:36,background:"rgba(255,255,255,.1)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>{i}</div>
            ))}
          </div>
        </div>
        {[
          ["Quick Links",  [["Home","home"],["Shop","shop"],["Deals","deals"]]],
          ["Account",      [["Login","login"],["Sign Up","signup"],["Track Order","track"]]],
          ["Contact",      [["+91 98765 43210",null],["hello@aaplabazaar.in",null],["Support Centre","contact"]]],
        ].map(([h, ls]) => (
          <div key={h}>
            <h4 style={{ color:"#fff",fontSize:".88rem",fontWeight:700,marginBottom:14 }}>{h}</h4>
            {ls.map(([l, p]) => (
              <a key={l} onClick={p ? () => setPage(p) : undefined} style={{ display:"block",color:"rgba(255,255,255,.6)",fontSize:".83rem",marginBottom:9,cursor:p?"pointer":"default",textDecoration:"none" }}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:20,display:"flex",justifyContent:"space-between",fontSize:".78rem",opacity:.45 }}>
        <span>© 2026 Aapla Bazaar. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}

/* ══════════════ PAGE: HOME ══════════════ */
function HomePage({ setPage, cart, dispatch }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#1a4a0a 0%,#2d7a1f 50%,#4caf35 100%)",padding:"70px 60px 0",display:"flex",alignItems:"flex-end",gap:40,overflow:"hidden",position:"relative",minHeight:460 }}>
        <div style={{ flex:1,color:"#fff",position:"relative",paddingBottom:50 }}>
          <div style={{ background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",display:"inline-flex",alignItems:"center",gap:6,padding:"6px 16px",borderRadius:50,fontSize:".78rem",marginBottom:22 }}>
            <span style={{ width:8,height:8,background:"#4ade80",borderRadius:"50%",display:"inline-block" }}/>
            Delivering in 20–30 mins •Pune & Nearby
          </div>
          <h1 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"3rem",lineHeight:1.15,fontWeight:800,marginBottom:18 }}>
            Farm Fresh Veggies <span style={{ color:"#fbbf24" }}>Delivered</span> in Minutes!
          </h1>
          <p style={{ fontSize:"1rem",opacity:.88,maxWidth:400,marginBottom:30,lineHeight:1.75 }}>
            Order from Aapla Bazaar and get the freshest vegetables, fruits & groceries straight from local farms.
          </p>
          <div style={{ display:"flex",gap:14 }}>
            <button onClick={() => setPage("shop")} style={btn("#f97316","#fff",{ fontSize:"1rem",padding:"13px 30px",borderRadius:14 })}>🛒 Order Now</button>
          </div>
        </div>
        <div style={{ fontSize:"13rem",lineHeight:1,filter:"drop-shadow(0 20px 40px rgba(0,0,0,.3))" }}>🧺</div>
      </div>

      {/* Stats */}
      <div style={{ background:"#fff",padding:"18px 60px",display:"flex",gap:16,borderBottom:"1px solid #f0f0f0" }}>
        {[["50,000+","Happy Customers","#e8f5e3","#2d7a1f"],["500+","Products","#fff3e0","#f97316"],["25 min","Avg Delivery","#e8f5e3","#2d7a1f"],["100%","Fresh Guarantee","#fff3e0","#f97316"]].map(([n,l,bg,c]) => (
          <div key={l} style={{ flex:1,background:bg,borderRadius:14,padding:"14px 20px",textAlign:"center" }}>
            <strong style={{ display:"block",fontFamily:"'Baloo 2',cursive",fontSize:"1.5rem",fontWeight:800,color:c }}>{n}</strong>
            <small style={{ fontSize:".77rem",opacity:.75 }}>{l}</small>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={{ background:"#fff",padding:"50px 60px" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <span style={{ background:"#e8f5e3",color:"#2d7a1f",fontSize:".74rem",fontWeight:600,padding:"4px 12px",borderRadius:50 }}>Browse by Category</span>
          <h2 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"2rem",fontWeight:800,marginTop:8 }}>What Are You Looking For?</h2>
        </div>
        <div style={{ display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center" }}>
          {CATS.map((c) => (
            <div key={c.k} onClick={() => setPage("shop")} style={{ background:"#fffbf0",borderRadius:20,padding:"18px 26px",display:"flex",flexDirection:"column",alignItems:"center",gap:9,cursor:"pointer",border:"2px solid transparent",minWidth:110,transition:".25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.border="2px solid #2d7a1f"; e.currentTarget.style.background="#e8f5e3"; e.currentTarget.style.transform="translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.border="2px solid transparent"; e.currentTarget.style.background="#fffbf0"; e.currentTarget.style.transform="none"; }}>
              <span style={{ fontSize:"2.4rem" }}>{c.e}</span>
              <span style={{ fontSize:".8rem",fontWeight:600 }}>{c.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ padding:"50px 60px",background:"#fffbf0" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <span style={{ background:"#e8f5e3",color:"#2d7a1f",fontSize:".74rem",fontWeight:600,padding:"4px 12px",borderRadius:50 }}>Today's Picks</span>
          <h2 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"2rem",fontWeight:800,marginTop:8 }}>🌟 Featured Products</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20 }}>
          {PRODUCTS.slice(0, 8).map((p) => <ProdCard key={p.id} p={p} cart={cart} dispatch={dispatch} />)}
        </div>
        <div style={{ textAlign:"center",marginTop:32 }}>
          <button onClick={() => setPage("shop")} style={btn("#2d7a1f","#fff",{ padding:"13px 36px",fontSize:"1rem",borderRadius:14 })}>View All Products →</button>
        </div>
      </div>

      {/* Offers */}
      <div style={{ background:"linear-gradient(120deg,#c2410c,#f97316,#fbbf24)",padding:"48px 60px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18 }}>
          {[["🚀","Free Delivery","On orders above ₹299"],["🌱","Farm Fresh","Directly from local farms"],["⏱️","30-Min Delivery","Super-fast to your door"],["💯","Quality Promise","Full refund if not satisfied"]].map(([e,h,p]) => (
            <div key={h} style={{ background:"rgba(255,255,255,.18)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.3)",borderRadius:16,padding:22,color:"#fff",display:"flex",alignItems:"center",gap:14 }}>
              <span style={{ fontSize:"2.2rem" }}>{e}</span>
              <div><h3 style={{ fontSize:".95rem",fontWeight:700 }}>{h}</h3><p style={{ fontSize:".8rem",opacity:.85,marginTop:3 }}>{p}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding:"50px 60px",background:"#e8f5e3" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <h2 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"2rem",fontWeight:800 }}>What Our Customers Say 💬</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20 }}>
          {[["Priya Kulkarni","Pune","👩","★★★★★","Best grocery app in Pune! Always fresh and delivery is super fast."],["Ramesh Patil","PCMC","👨","★★★★★","Switched from my sabziwala to Aapla Bazaar. Better quality, home delivery!"],["Sunita Deshmukh","Pune","👩","★★★★☆","Subscription plan is a game-changer. Daily veggies delivered automatically!"]].map(([n,loc,av,s,t]) => (
            <div key={n} style={{ background:"#fff",borderRadius:18,padding:26,boxShadow:"0 4px 24px rgba(45,122,31,.08)" }}>
              <div style={{ color:"#fbbf24",marginBottom:10 }}>{s}</div>
              <p style={{ color:"#6b7280",fontSize:".88rem",lineHeight:1.75,marginBottom:16 }}>"{t}"</p>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:40,height:40,background:"#e8f5e3",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem" }}>{av}</div>
                <div><strong style={{ fontSize:".88rem" }}>{n}</strong><div style={{ color:"#6b7280",fontSize:".76rem" }}>{loc}, MH</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

/* ══════════════ PAGE: SHOP ══════════════ */
function ShopPage({ cart, dispatch }) {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  let list = PRODUCTS.filter((p) => (cat === "all" || p.cat === cat) && p.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === "low")  list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div style={{ background:"#fff",borderBottom:"1px solid #f0f0f0",padding:"18px 32px",display:"flex",gap:14,alignItems:"center" }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search products..." style={{ ...inputStyle,flex:1 }}/>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ ...inputStyle,width:200 }}>
          <option value="">Sort: Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
      <div style={{ display:"flex" }}>
        <div style={{ width:190,flexShrink:0,padding:"22px 16px",background:"#fff",borderRight:"1px solid #f0f0f0",minHeight:"calc(100vh - 120px)" }}>
          <p style={{ fontSize:".78rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".05em",marginBottom:12 }}>Categories</p>
          {CATS.map((c) => (
            <div key={c.k} onClick={() => setCat(c.k)} style={{ padding:"9px 12px",borderRadius:10,cursor:"pointer",fontSize:".84rem",fontWeight:cat===c.k?700:400,color:cat===c.k?"#2d7a1f":"#1a2e0f",background:cat===c.k?"#e8f5e3":"transparent",marginBottom:3,transition:".15s" }}>
              {c.e} {c.l}
            </div>
          ))}
        </div>
        <div style={{ flex:1,padding:"26px 30px" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
            <h2 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.45rem",fontWeight:800 }}>{CATS.find((c) => c.k === cat)?.l || "All Products"}</h2>
            <span style={{ color:"#6b7280",fontSize:".84rem" }}>{list.length} products</span>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20 }}>
            {list.map((p) => <ProdCard key={p.id} p={p} cart={cart} dispatch={dispatch} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ PAGE: DEALS ══════════════ */
function DealsPage({ cart, dispatch }) {
  const [h, setH] = useState(5);
  const [m, setM] = useState(32);
  const [s, setS] = useState(47);
  useEffect(() => {
    const t = setInterval(() => {
      setS((ps) => { if (ps > 0) return ps - 1; setM((pm) => { if (pm > 0) return pm - 1; setH((ph) => ph > 0 ? ph - 1 : 0); return pm > 0 ? 59 : 0; }); return 59; });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const deals = PRODUCTS.filter((p) => p.orig > p.price);
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div>
      <div style={{ background:"linear-gradient(120deg,#c2410c,#f97316,#fbbf24)",padding:"50px 60px",color:"#fff",textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"2.6rem",fontWeight:800,margin:"12px 0 8px" }}>🔥 Today's Hot Deals</h1>
        <p style={{ opacity:.9,marginBottom:20 }}>Limited-time offers! Grab them before they're gone.</p>
        <div style={{ display:"flex",gap:14,justifyContent:"center" }}>
          {[[pad(h),"Hours"],[pad(m),"Mins"],[pad(s),"Secs"]].map(([v,l]) => (
            <div key={l} style={{ background:"rgba(255,255,255,.2)",borderRadius:12,padding:"12px 22px",textAlign:"center" }}>
              <strong style={{ display:"block",fontFamily:"'Baloo 2',cursive",fontSize:"2rem",fontWeight:800 }}>{v}</strong>
              <small style={{ fontSize:".74rem",opacity:.85 }}>{l}</small>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"40px 60px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20 }}>
          {deals.map((p) => {
            const disc = Math.round((1 - p.price / p.orig) * 100);
            return (
              <div key={p.id} style={{ ...cardStyle,position:"relative" }}>
                <div style={{ position:"absolute",top:14,right:-8,background:"#ef4444",color:"#fff",fontSize:".7rem",fontWeight:700,padding:"4px 14px 4px 10px",borderRadius:"4px 0 0 4px",zIndex:1 }}>{disc}% OFF</div>
                <div style={{ background:"#e8f5e3",padding:"28px 10px",textAlign:"center",fontSize:"4rem" }}>{p.e}</div>
                <div style={{ padding:16 }}>
                  <div style={{ fontWeight:600,fontSize:".93rem",marginBottom:3 }}>{p.name}</div>
                  <div style={{ color:"#6b7280",fontSize:".78rem",marginBottom:10 }}>{p.unit}</div>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <div style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.15rem",fontWeight:800,color:"#2d7a1f" }}>₹{p.price} <del style={{ color:"#9ca3af",fontSize:".8rem",fontWeight:400 }}>₹{p.orig}</del></div>
                    <button onClick={() => dispatch({ type:"ADD",id:p.id })} style={btn("#f97316","#fff",{ width:34,height:34,borderRadius:10,padding:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem" })}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════ PAGE: TRACK ══════════════ */
function TrackPage() {
  const steps = [{e:"📋",l:"Order Placed",s:"done"},{e:"✅",l:"Confirmed",s:"done"},{e:"📦",l:"Packed",s:"done"},{e:"🛵",l:"On the Way",s:"active"},{e:"🏠",l:"Delivered",s:"pending"}];
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#1a4a0a,#2d7a1f)",padding:"50px 60px",color:"#fff",textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"2.4rem",fontWeight:800 }}>📦 Track Your Order</h1>
      </div>
      <div style={{ padding:"50px 60px" }}>
        <div style={{ background:"#fff",borderRadius:24,padding:36,boxShadow:"0 4px 24px rgba(45,122,31,.10)",maxWidth:640,margin:"0 auto" }}>
          <h3 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.35rem",fontWeight:800,marginBottom:4 }}>Order #ABZ-20241108</h3>
          <p style={{ color:"#6b7280",fontSize:".83rem",marginBottom:12 }}>Placed: Today, 10:32 AM</p>
          <div style={{ background:"#fed7aa",borderRadius:10,padding:"10px 16px",fontSize:".84rem",color:"#9a3412",fontWeight:600 }}>🛵 Your rider Suresh is 5 minutes away!</div>
          <div style={{ display:"flex",justifyContent:"space-between",position:"relative",margin:"30px 0" }}>
            <div style={{ position:"absolute",top:20,left:0,right:0,height:3,background:"#e5e7eb",zIndex:0 }}/>
            <div style={{ position:"absolute",top:20,left:0,width:"60%",height:3,background:"#2d7a1f",zIndex:0 }}/>
            {steps.map((st, i) => (
              <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:8,position:"relative",zIndex:1 }}>
                <div style={{ width:42,height:42,borderRadius:"50%",background:st.s==="done"?"#2d7a1f":st.s==="active"?"#f97316":"#e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",color:st.s==="pending"?"#9ca3af":"#fff" }}>{st.e}</div>
                <span style={{ fontSize:".73rem",fontWeight:600,color:"#6b7280",textAlign:"center",maxWidth:68 }}>{st.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ PAGE: CONTACT ══════════════ */
function ContactPage({ setPage }) {
  const toast = useToast();
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#1a4a0a,#2d7a1f)",padding:"50px 60px",color:"#fff",textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"2.4rem",fontWeight:800 }}>Get In Touch 👋</h1>
      </div>
      <div style={{ padding:"50px 60px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,maxWidth:900,margin:"0 auto" }}>
          <div>
            <h3 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.5rem",fontWeight:800,marginBottom:22 }}>Let's Talk</h3>
            {[["📞","Call Us","+91 98765 43210"],["✉️","Email","hello@aaplabazaar.in"],["📍","Office","Pune - 411001"],["🕒","Hours","Daily 6:00 AM – 10:00 PM"]].map(([e,h,v]) => (
              <div key={h} style={{ display:"flex",gap:14,marginBottom:20,alignItems:"flex-start" }}>
                <div style={{ width:42,height:42,background:"#e8f5e3",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0 }}>{e}</div>
                <div><strong style={{ display:"block",fontSize:".88rem" }}>{h}</strong><span style={{ color:"#6b7280",fontSize:".84rem" }}>{v}</span></div>
              </div>
            ))}
            <div style={{ background:"#e8f5e3",borderRadius:16,padding:20,marginTop:8 }}>
              <h4 style={{ fontWeight:700,color:"#2d7a1f",marginBottom:8 }}>🚜 Want to Supply with Us?</h4>
              <button onClick={() => setPage("org-login")} style={btn("#2d7a1f","#fff",{ padding:"9px 20px" })}>Register as Supplier</button>
            </div>
          </div>
          <div style={{ background:"#fff",borderRadius:24,padding:34,boxShadow:"0 4px 24px rgba(45,122,31,.10)" }}>
            <h3 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.3rem",fontWeight:800,marginBottom:20 }}>Send Us a Message</h3>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Your Name</label><input style={inputStyle} placeholder="Ramesh Patil"/></div>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Email</label><input style={inputStyle} placeholder="ramesh@email.com"/></div>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Message</label><textarea style={{ ...inputStyle,minHeight:100,resize:"vertical" }} placeholder="How can we help?"/></div>
            <button onClick={() => toast("✅ Message sent! We'll reply within 24 hours.")} style={btn("#2d7a1f","#fff",{ width:"100%",padding:13,fontSize:".95rem",borderRadius:13 })}>Send Message 📨</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ PAGE: LOGIN ══════════════ */
function LoginPage({ setPage }) {
  const [tab, setTab] = useState("user");
  const toast = useToast();
  return (
    <div style={{ minHeight:"calc(100vh - 68px)",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#e8f5e3,#fffbf0)",padding:"40px 20px" }}>
      <div style={{ background:"#fff",borderRadius:24,boxShadow:"0 20px 60px rgba(45,122,31,.15)",width:"100%",maxWidth:420,padding:40 }}>
        <div style={{ display:"flex",background:"#e8f5e3",borderRadius:12,padding:4,marginBottom:28 }}>
          {[["user","👤 Customer"],["org","🏢 Business"]].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ flex:1,padding:10,borderRadius:10,border:"none",fontWeight:600,fontSize:".88rem",cursor:"pointer",background:tab===k?"#2d7a1f":"transparent",color:tab===k?"#fff":"#1a2e0f",transition:".2s",fontFamily:"DM Sans,sans-serif" }}>{l}</button>
          ))}
        </div>
        {tab === "user" ? (
          <>
            <h2 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.7rem",fontWeight:800,marginBottom:4 }}>Welcome Back! 👋</h2>
            <p style={{ color:"#6b7280",fontSize:".84rem",marginBottom:24 }}>Sign in to your Aapla Bazaar account</p>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Phone / Email</label><input style={inputStyle} placeholder="Enter phone or email"/></div>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Password</label><input type="password" style={inputStyle} placeholder="Enter your password"/></div>
            <button onClick={() => { toast("✅ Login successful!"); setPage("home"); }} style={btn("#2d7a1f","#fff",{ width:"100%",padding:14,fontSize:"1rem",borderRadius:13 })}>Login →</button>
            <p style={{ textAlign:"center",marginTop:18,fontSize:".84rem",color:"#6b7280" }}>Don't have an account? <span onClick={() => setPage("signup")} style={{ color:"#2d7a1f",fontWeight:600,cursor:"pointer" }}>Sign up free</span></p>
          </>
        ) : (
          <>
            <h2 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.6rem",fontWeight:800,marginBottom:4 }}>Business Login</h2>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Business Email / GST</label><input style={inputStyle} placeholder="business@example.com"/></div>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Password</label><input type="password" style={inputStyle} placeholder="Password"/></div>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Login As</label><select style={inputStyle}><option>Seller / Retailer</option><option>Farmer / Supplier</option><option>Delivery Partner</option></select></div>
            <button onClick={() => { toast("✅ Business login successful!"); setPage("home"); }} style={btn("#1a2e0f","#fff",{ width:"100%",padding:14,fontSize:"1rem",borderRadius:13 })}>Access Dashboard →</button>
            <p style={{ textAlign:"center",marginTop:18,fontSize:".84rem",color:"#6b7280" }}>New business? <span onClick={() => setPage("org-login")} style={{ color:"#2d7a1f",fontWeight:600,cursor:"pointer" }}>Register your store</span></p>
          </>
        )}
      </div>
    </div>
  );
}

/* ══════════════ PAGE: SIGNUP ══════════════ */
function SignupPage({ setPage }) {
  const toast = useToast();
  return (
    <div style={{ minHeight:"calc(100vh - 68px)",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#e8f5e3,#fffbf0)",padding:"40px 20px" }}>
      <div style={{ background:"#fff",borderRadius:24,boxShadow:"0 20px 60px rgba(45,122,31,.15)",width:"100%",maxWidth:480,padding:40 }}>
        <div style={{ textAlign:"center",marginBottom:24 }}>
          <span style={{ fontSize:"2.3rem" }}>🌿</span>
          <h2 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.75rem",fontWeight:800,marginTop:8 }}>Create Your Account</h2>
          <p style={{ color:"#6b7280",fontSize:".84rem",marginTop:4 }}>Join 50,000+ happy customers</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>First Name</label><input style={inputStyle} placeholder="Rahul"/></div>
          <div><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Last Name</label><input style={inputStyle} placeholder="Patil"/></div>
        </div>
        <div style={{ marginTop:14 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Mobile</label><input style={inputStyle} placeholder="+91 98765 43210"/></div>
        <div style={{ marginTop:14 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Email</label><input style={inputStyle} placeholder="rahul@email.com"/></div>
        <div style={{ marginTop:14 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Delivery Address</label><input style={inputStyle} placeholder="Flat No., Street, Nashik"/></div>
        <div style={{ marginTop:14 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Password</label><input type="password" style={inputStyle} placeholder="At least 8 characters"/></div>
        <button onClick={() => { toast("🎉 Account created! Welcome!"); setPage("home"); }} style={{ ...btn("#2d7a1f","#fff",{ width:"100%",padding:14,fontSize:"1rem",borderRadius:13 }),marginTop:20 }}>Create Account 🎉</button>
        <p style={{ textAlign:"center",marginTop:18,fontSize:".84rem",color:"#6b7280" }}>Already have an account? <span onClick={() => setPage("login")} style={{ color:"#2d7a1f",fontWeight:600,cursor:"pointer" }}>Login</span></p>
      </div>
    </div>
  );
}

/* ══════════════ PAGE: ORG LOGIN ══════════════ */
function OrgLoginPage({ setPage }) {
  const toast = useToast();
  return (
    <div style={{ minHeight:"calc(100vh - 68px)",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0f2a08,#1a4a0a,#2d7a1f)",padding:"40px 20px" }}>
      <div style={{ background:"#fff",borderRadius:24,boxShadow:"0 20px 60px rgba(0,0,0,.3)",width:"100%",maxWidth:500,padding:40 }}>
        <div style={{ background:"linear-gradient(135deg,#0f2a08,#1a4a0a)",color:"#fff",borderRadius:14,padding:18,marginBottom:24,display:"flex",gap:16,alignItems:"center" }}>
          <span style={{ fontSize:"2.2rem" }}>🚜</span>
          <div><h3 style={{ fontSize:".95rem",fontWeight:700 }}>Supplier / Farmer Registration</h3><p style={{ fontSize:".78rem",opacity:.8,marginTop:3 }}>Join our network & reach 50,000+ customers</p></div>
        </div>
        <h2 style={{ fontFamily:"'Baloo 2',cursive",fontSize:"1.7rem",fontWeight:800,marginBottom:20 }}>Register Your Business</h2>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Owner Name</label><input style={inputStyle} placeholder="Suresh Shinde"/></div>
          <div><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Business Name</label><input style={inputStyle} placeholder="Shinde Farms"/></div>
        </div>
        <div style={{ marginTop:14 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Business Type</label><select style={inputStyle}><option>Farmer / Grower</option><option>Wholesaler</option><option>Retailer</option><option>Brand</option></select></div>
        <div style={{ marginTop:14 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>What do you supply?</label><input style={inputStyle} placeholder="e.g. Tomatoes, Onions, Leafy Vegetables"/></div>
        <div style={{ marginTop:14 }}><label style={{ display:"block",fontSize:".83rem",fontWeight:600,marginBottom:6 }}>Password</label><input type="password" style={inputStyle} placeholder="Create a secure password"/></div>
        <button onClick={() => { toast("✅ Application submitted! We'll review in 24–48 hrs."); setPage("home"); }} style={{ ...btn("#1a2e0f","#fff",{ width:"100%",padding:14,fontSize:"1rem",borderRadius:13 }),marginTop:20 }}>Submit Application 🚀</button>
        <p style={{ textAlign:"center",marginTop:18,fontSize:".84rem",color:"#6b7280" }}>Already registered? <span onClick={() => setPage("login")} style={{ color:"#2d7a1f",fontWeight:600,cursor:"pointer" }}>Login here</span></p>
      </div>
    </div>
  );
}

/* ══════════════ ROOT APP ══════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, {});
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const pages = {
    home:      <HomePage setPage={setPage} cart={cart} dispatch={dispatch} />,
    shop:      <ShopPage cart={cart} dispatch={dispatch} />,
    deals:     <DealsPage cart={cart} dispatch={dispatch} />,
    track:     <TrackPage />,
    contact:   <ContactPage setPage={setPage} />,
    login:     <LoginPage setPage={setPage} />,
    signup:    <SignupPage setPage={setPage} />,
    "org-login": <OrgLoginPage setPage={setPage} />,
  };

  return (
    <ToastProvider>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} openCart={() => setCartOpen(true)} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} dispatch={dispatch} />
      <main key={page} style={{ animation: "fadeIn .3s ease" }}>
        {pages[page] || pages.home}
      </main>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #fffbf0; color: #1a2e0f; }
      `}</style>
    </ToastProvider>
  );
}
