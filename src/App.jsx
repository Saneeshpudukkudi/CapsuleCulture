import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './index.css';
const CapsuleAssembly = lazy(() => import('./components/CapsuleAssembly'));

const wa = (message = 'Hi Capsule Culture, I would like to discuss a capsule project.') => `https://wa.me/918848337921?text=${encodeURIComponent(message)}`;
const models = [
  ['Premium living', 'A custom space for holiday stays, guest accommodation or everyday living.', '/gallery-exterior2.jpg'],
  ['Resort stays', 'Distinctive guest accommodation tailored to its setting.', '/1%20(18).jpg'],
  ['Modular offices', 'Purpose-built workspaces with the layout and facilities your team needs.', '/1%20(13).jpg'],
  ['Fitness capsules', 'A compact training space planned for equipment, mirrors and natural light.', '/1%20(19).jpg'],
];
const questions = [
  ['Can I customize the layout?', 'Yes. Size, layout, finishes and features are discussed for each project.'],
  ['Do you build on site?', 'On-site and off-site construction options depend on your project and site access.'],
  ['How much will it cost?', 'Pricing depends on size, specifications, location and site conditions. Contact us for a tailored quotation.'],
  ['What is included in the warranty?', 'Coverage depends on the agreed specification and contract. The applicable terms will be set out in your quotation.'],
];
const buildStages = [
  ['01', 'A strong start.', 'Every great space starts with a plan for its site. The raised platform and supports establish the footprint.'],
  ['02', 'The frame takes shape.', 'A galvanized steel structure establishes the form of the capsule and supports its enclosure.'],
  ['03', 'A space to live in.', 'The floor and insulated enclosure bring comfort and definition to the space.'],
  ['04', 'Light comes in.', 'Toughened glazing connects the interior with its surroundings and gives the capsule its open feel.'],
  ['05', 'Made for your life.', 'Interior fittings, furniture and lighting are planned around how you will use the space.'],
  ['06', 'Weather ready.', 'The roof, protective coating and PU exterior finish complete the shell and its architectural profile.'],
  ['07', 'Ready to make yours.', 'The final details bring the design together. Let’s discuss the size, site and features for your project.'],
];

function BuildStory() {
  const section = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference(); preference.addEventListener('change', updatePreference);
    let ticking = false;
    const update = () => {
      const el = section.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const travel = rect.height;
        setProgress(Math.max(0, Math.min(1, (window.innerHeight * .48 - rect.top) / Math.max(1, travel))));
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { preference.removeEventListener('change', updatePreference); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  const current = Math.min(6, Math.floor(progress * 7));
  return <section className="build-story" id="build" aria-label="How a capsule takes shape">
    <div className="build-head wrap"><span className="eyebrow">THE MAKING OF A SPACE</span><h2>Watch an idea<br/><em>come together.</em></h2><p>Scroll to build a capsule, one layer at a time.</p></div>
    <div className="build-layout" ref={section}>
      <div className="build-copy">{buildStages.map(([number,title,desc],i) => <article className={`build-step ${current===i?'active':''}`} key={number}><div><span className="build-number">{number} <span>/ 07</span></span><h3>{title}</h3><p>{desc}</p>{i === 6 && <a className="button dark" href="#contact">Start your project ↗</a>}</div></article>)}</div>
      <div className="build-sticky"><div className="build-viewport"><Suspense fallback={<div className="assembly-loading">Preparing the capsule…</div>}><CapsuleAssembly progress={progress} reducedMotion={reducedMotion}/></Suspense><div className="build-display"><span>CAPSULE CULTURE <span>·</span> THE BUILD</span><strong>{String(current+1).padStart(2,'0')} <i>/ 07</i></strong></div><div className="build-progress"><span style={{width:`${Math.max(4,progress*100)}%`}}/></div><div className="build-caption">Architectural illustration · Specifications vary by project</div></div></div>
    </div>
  </section>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', location: '', type: 'Living capsule', message: '' });
  const [status, setStatus] = useState('idle');
  async function submit(e) {
    e.preventDefault(); setStatus('sending');
    try {
      const r = await fetch('https://formspree.io/f/xqerkpvw', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) });
      if (!r.ok) throw new Error('Failed');
      setStatus('success'); setForm({ name: '', phone: '', location: '', type: 'Living capsule', message: '' });
    } catch { setStatus('error'); }
  }
  return <>
    <header className="header"><div className="wrap nav"><a className="brand" href="#top"><span className="mark">CC</span><span>CAPSULE<br/>CULTURE</span></a><button className="menu" aria-label="Toggle menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? 'Close ×' : 'Menu ☰'}</button><nav className={menu ? 'open' : ''} aria-label="Main navigation">{[['Models','#models'],['How it works','#process'],['About','#about'],['Contact','#contact']].map(([label,url]) => <a key={url} href={url} onClick={() => setMenu(false)}>{label}</a>)}<a className="nav-cta" href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp us ↗</a></nav></div></header>
    <main id="top">
      <section className="hero"><img src="/gallery-exterior1.jpg" alt="Architectural concept of a compact capsule home among trees" fetchPriority="high"/><div className="shade"/><div className="wrap hero-inner"><span className="eyebrow">PREFAB SPACES · KANNUR, KERALA</span><h1>Small footprint.<br/><em>Big possibilities.</em></h1><p>Custom-built capsule spaces for living, hospitality and work. Designed around your needs, made for your site.</p><div className="actions"><a className="button light" href="#build">See how it comes together ↗</a><a className="underlink" href="#contact">Plan your project ↗</a></div><small className="visual-label">Concept visualisation</small></div></section>
      <BuildStory/>
      <section className="section intro" id="about"><div className="wrap two-col"><div><span className="eyebrow">WHAT WE DO</span><h2>Built for the way<br/>you want to use it.</h2></div><div><p>Capsule Culture creates custom modular spaces for homes, resorts and businesses. We plan the design around your site and intended use, then discuss the materials, finish and installation for your project.</p><a className="inline" href="#process">See how we work ↗</a></div></div></section>
      <section className="section models" id="models"><div className="wrap"><div className="section-title"><div><span className="eyebrow">EXPLORE THE POSSIBILITIES</span><h2>Spaces with a purpose.</h2></div><p>Every project can be planned around your requirements.</p></div><div className="cards">{models.map(([name,detail,img],i) => <article className="card" key={name}><div className="card-image"><img src={img} alt={`${name} architectural design concept`} loading="lazy"/><span>Design concept</span></div><div className="card-body"><small>0{i+1} / 04</small><h3>{name}</h3><p>{detail}</p><a href={wa(`Hi Capsule Culture, I would like to know more about ${name.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">Enquire about this space ↗</a></div></article>)}</div></div></section>
      <section className="band"><div className="wrap two-col"><div><span className="eyebrow">MADE FOR YOUR PROJECT</span><h2>One idea.<br/>Your own space.</h2></div><p>Choose a compact living space, a resort unit or a work area. Tell us what matters most, and we’ll discuss a design and specification that fits. Construction and installation options depend on your site and access.</p></div></section>
      <section className="section process" id="process"><div className="wrap"><span className="eyebrow">A STRAIGHTFORWARD PROCESS</span><h2>From idea to handover.</h2><div className="steps">{[['01','Tell us your idea','Share the intended use, approximate size, location and budget.'],['02','Plan the details','We discuss the layout, finishes, site needs and a tailored quotation.'],['03','Build and hand over','Your capsule is fabricated and installed according to the agreed scope.']].map(([n,t,d]) => <div className="step" key={n}><strong>{n}</strong><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
      <section className="section faq"><div className="wrap two-col"><div><span className="eyebrow">GOOD TO KNOW</span><h2>Questions, answered.</h2></div><div>{questions.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
      <section className="section contact" id="contact"><div className="wrap two-col"><div><span className="eyebrow">LET’S TALK</span><h2>Have a space<br/>in mind?</h2><p>Tell us where your project is and what you’re planning. We’ll help you explore the next steps.</p><a className="button light" href={wa()} target="_blank" rel="noopener noreferrer">Start on WhatsApp ↗</a><div className="details"><a href="tel:+918848337921">+91 88483 37921</a><a href="mailto:capsuleculture.kerala@gmail.com">capsuleculture.kerala@gmail.com</a><span>Therur Palayode, Kannur, Kerala</span></div></div><form onSubmit={submit}><h3>Send an enquiry</h3><label>Name<input required name="name" autoComplete="name" value={form.name} onChange={e => setForm({...form,name:e.target.value})}/></label><label>Phone / WhatsApp<input required type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})}/></label><div className="form-row"><label>Project location<input required name="location" value={form.location} onChange={e => setForm({...form,location:e.target.value})}/></label><label>Type of space<select name="type" value={form.type} onChange={e => setForm({...form,type:e.target.value})}><option>Living capsule</option><option>Resort unit</option><option>Office / commercial</option><option>Other</option></select></label></div><label>What are you planning?<textarea name="message" rows="4" placeholder="Approximate size, features, timeline…" value={form.message} onChange={e => setForm({...form,message:e.target.value})}/></label><button className="button dark" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry ↗'}</button>{status === 'success' && <p role="status">Thank you. Your enquiry has been sent.</p>}{status === 'error' && <p role="alert">We couldn’t send this enquiry. Please use WhatsApp or email us directly.</p>}</form></div></section>
    </main>
    <footer><div className="wrap footer"><a className="brand" href="#top"><span className="mark">CC</span><span>CAPSULE<br/>CULTURE</span></a><p>Custom prefabricated spaces, made in Kerala.</p><div><a href="https://instagram.com/cc_capsule_culture" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.facebook.com/profile.php?id=61583151132210" target="_blank" rel="noopener noreferrer">Facebook ↗</a></div><small>© {new Date().getFullYear()} Capsule Culture</small></div></footer>
  </>;
}
