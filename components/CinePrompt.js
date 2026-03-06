"use client";
import { useState } from "react";

const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";

const CAMERAS = ["Canon EOS R5","Sony A7 IV","ARRI Alexa 35","RED V-RAPTOR","Blackmagic URSA","Hasselblad X2D","Leica M11","iPhone 15 Pro (cinematic)"];
const LENTES = ["14mm ultra-wide","24mm wide","35mm","50mm standard","85mm portrait","135mm","200mm telephoto","Macro 100mm","Fisheye 8mm","Anamorphic 40mm"];
const MOVIMENTOS = ["Static / locked","Slow push in","Pull out","Pan left","Pan right","Tilt up","Tilt down","Dolly track","Handheld shaky","Crane / jib up","Drone aerial","360° orbit","Whip pan","Rack focus"];
const ILUMINACOES = ["Golden hour","Blue hour / dusk","Overcast soft light","Harsh midday sun","Neon / cyberpunk","Candlelight / practical","Studio strobe","Rembrandt lighting","Silhouette backlight","Moonlight","Fog + diffused","High key white","Low key dramatic"];
const ESTILOS = ["Hyperrealistic photo","Cinematic film","Editorial fashion","Documentary","Fine art","Concept art","Illustration","Anime / manga","3D render","Vintage analog film","Noir black & white","Painterly oil"];
const PROPORCOES_MJ = ["16:9","4:3","1:1","9:16","21:9","2:3","3:2"];
const VERSOES_MJ = ["--v 6.1","--v 6","--v 5.2","--niji 6"];
const FERRAMENTAS = ["Midjourney","Freepik","Higgsfield","Kling","Nano Banana","Veo 3"];

function Label({ children }) {
  return <div style={{ color: "#6ee7b7", fontSize: 10, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", marginBottom: 7 }}>{children}</div>;
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Label>{label}</Label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 13, fontFamily: "monospace", outline: "none", cursor: "pointer" }}
        onFocus={e => e.target.style.borderColor = "#6ee7b7"} onBlur={e => e.target.style.borderColor = "#1e3a5f"}>
        <option value="">— selecionar —</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Label>{label}</Label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ width: "100%", background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 13, fontFamily: "monospace", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }}
        onFocus={e => e.target.style.borderColor = "#6ee7b7"} onBlur={e => e.target.style.borderColor = "#1e3a5f"} />
    </div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Label>{label}</Label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 13, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }}
        onFocus={e => e.target.style.borderColor = "#6ee7b7"} onBlur={e => e.target.style.borderColor = "#1e3a5f"} />
    </div>
  );
}

function Toggle({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: 3, gap: 3, marginBottom: 20 }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: 12, fontWeight: 600, letterSpacing: 1, transition: "all 0.2s", background: value === o ? "#6ee7b7" : "transparent", color: value === o ? "#0a1628" : "#4a7fa5" }}>{o}</button>
      ))}
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "5px 12px", borderRadius: 20, border: "1px solid", cursor: "pointer", fontSize: 11, fontFamily: "monospace", transition: "all 0.2s", letterSpacing: 0.5, background: active ? "#6ee7b71a" : "transparent", borderColor: active ? "#6ee7b7" : "#1e3a5f", color: active ? "#6ee7b7" : "#4a7fa5" }}>{label}</button>
  );
}

function Section({ title, children, icon }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid #0f2744" }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontFamily: "serif", fontSize: 15, letterSpacing: 3, color: "#94a3b8", fontWeight: "bold" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <button onClick={copy} style={{ background: copied ? "#6ee7b720" : "#0a1628", color: copied ? "#6ee7b7" : "#4a7fa5", border: "1px solid", borderColor: copied ? "#6ee7b7" : "#1e3a5f", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontFamily: "monospace", cursor: "pointer", transition: "all 0.2s", letterSpacing: 1 }}>
      {copied ? "✓ COPIADO" : "COPIAR"}
    </button>
  );
}

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#6ee7b7" }}>
      <div style={{ width: 18, height: 18, border: "2px solid #6ee7b720", borderTop: "2px solid #6ee7b7", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <span style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 1 }}>GERANDO PROMPT...</span>
    </div>
  );
}

export default function CinePrompt() {
  const [ferramenta, setFerramenta] = useState("Midjourney");
  const [outputType, setOutputType] = useState("Imagem");
  const [inputMode, setInputMode] = useState("Menus");
  const [cena, setCena] = useState("");
  const [sujeito, setSujeito] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [humor, setHumor] = useState("");
  const [camera, setCamera] = useState("");
  const [cameraCustom, setCameraCustom] = useState("");
  const [lente, setLente] = useState("");
  const [lenteCustom, setLenteCustom] = useState("");
  const [movimento, setMovimento] = useState("");
  const [movimentoCustom, setMovimentoCustom] = useState("");
  const [iluminacao, setIluminacao] = useState("");
  const [estilo, setEstilo] = useState("");
  const [proporcao, setProporcao] = useState("16:9");
  const [versaoMJ, setVersaoMJ] = useState("--v 6.1");
  const [negativo, setNegativo] = useState("");
  const [extras, setExtras] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("imagem");

  const callClaude = async (prompt) => {
    // Uses /api/chat proxy route — keeps API key secure on the server
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1000,
        system: "Você é um diretor de fotografia e especialista em prompts para IA generativa. Responda SEMPRE em JSON válido, sem markdown, sem texto fora do JSON. Crie prompts em inglês, extremamente detalhados e técnicos, otimizados para qualidade máxima.",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    const text = data.content.map(i => i.text || "").join("");
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  };

  const gerar = async () => {
    if (!cena && !sujeito) return setError("Descreva pelo menos a cena ou o sujeito.");
    setError(null); setLoading(true); setResultado(null);
    const camFinal = cameraCustom || camera;
    const lenFinal = lenteCustom || lente;
    const movFinal = movimentoCustom || movimento;
    try {
      const prompt = `Crie prompts cinematográficos profissionais para geração de imagens e vídeos com IA.

DADOS DA CENA:
- Descrição livre: ${cena || "não informado"}
- Sujeito principal: ${sujeito || "não informado"}
- Ambiente / cenário: ${ambiente || "não informado"}
- Humor / emoção: ${humor || "não informado"}

DADOS TÉCNICOS DE CÂMERA:
- Câmera: ${camFinal || "não especificado"}
- Lente: ${lenFinal || "não especificado"}
- Movimento de câmera: ${movFinal || "não especificado"}
- Iluminação: ${iluminacao || "não especificado"}
- Estilo visual: ${estilo || "não especificado"}

FERRAMENTAS ALVO: ${ferramenta}
TIPO DE OUTPUT: ${outputType}
PROPORÇÃO: ${proporcao}
ELEMENTOS A EVITAR: ${negativo || "nenhum"}
EXTRAS: ${extras || "nenhum"}

Retorne JSON com EXATAMENTE esta estrutura:
{
  "prompt_imagem": "prompt completo em inglês para imagem estática, extremamente detalhado com termos técnicos de fotografia, iluminação, câmera, lente, estilo, qualidade — tudo em uma linha contínua",
  "prompt_video": "prompt completo em inglês para vídeo/motion, incluindo descrição do movimento de câmera, timing, transições e dinâmica da cena",
  "prompt_midjourney": "prompt_imagem + parâmetros MJ como --ar ${proporcao} ${versaoMJ} --style raw --q 2",
  "prompt_freepik": "versão otimizada para Freepik AI Image com termos específicos da plataforma",
  "prompt_higgsfield": "versão otimizada para Higgsfield AI com foco em movimento de câmera cinematográfico realista e física do mundo real",
  "prompt_kling": "versão otimizada para Kling AI com foco em coerência temporal, movimentos suaves e descrição física detalhada",
  "prompt_nanobanana": "versão curta e direta para Nano Banana com forte ancoragem visual e ação clara",
  "prompt_veo3": "versão otimizada para Veo 3 do Google com descrição cinematográfica completa, movimento de câmera preciso e ritmo narrativo",
  "dicas": ["dica técnica 1", "dica técnica 2", "dica técnica 3"],
  "palavras_chave": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;
      const json = await callClaude(prompt);
      setResultado(json);
      setActiveTab(outputType === "Vídeo" ? "video" : "imagem");
    } catch { setError("Erro ao gerar. Verifique sua conexão e tente novamente."); }
    finally { setLoading(false); }
  };

  const reset = () => { setResultado(null); setError(null); };

  const TABS = [
    { id: "imagem", label: "📷 Imagem" },
    { id: "video", label: "🎥 Vídeo" },
    { id: "midjourney", label: "🔷 MJ" },
    { id: "freepik", label: "🟣 Freepik" },
    { id: "higgsfield", label: "🎞️ Higgsfield" },
    { id: "kling", label: "⚡ Kling" },
    { id: "nanobanana", label: "🍌 Nano" },
    { id: "veo3", label: "🎬 Veo 3" },
    { id: "dicas", label: "💡 Dicas" }
  ];

  const PROMPT_MAP = {
    imagem: { key: "prompt_imagem", label: "Prompt para imagem estática", dica: null },
    video: { key: "prompt_video", label: "Prompt para vídeo / motion", dica: null },
    midjourney: { key: "prompt_midjourney", label: "Prompt otimizado para Midjourney", dica: <>Cole no Discord do Midjourney com o comando <span style={{ color: "#6ee7b7" }}>/imagine</span></> },
    freepik: { key: "prompt_freepik", label: "Prompt otimizado para Freepik", dica: <>Use em <span style={{ color: "#6ee7b7" }}>freepik.com/pikaso</span> ou no gerador de imagens do Freepik AI</> },
    higgsfield: { key: "prompt_higgsfield", label: "Prompt otimizado para Higgsfield", dica: <>Acesse <span style={{ color: "#6ee7b7" }}>app.higgsfield.ai</span> → Create → Custom. Melhor com vídeos de <span style={{ color: "#6ee7b7" }}>3 a 6 segundos</span></> },
    kling: { key: "prompt_kling", label: "Prompt otimizado para Kling AI", dica: <>Acesse <span style={{ color: "#6ee7b7" }}>klingai.com</span>. Use o modo <span style={{ color: "#6ee7b7" }}>Professional</span>. Duração: 5 ou 10 segundos</> },
    nanobanana: { key: "prompt_nanobanana", label: "Prompt otimizado para Nano Banana", dica: <>Acesse <span style={{ color: "#6ee7b7" }}>nanobanana.ai</span>. Prefere prompts diretos e visuais</> },
    veo3: { key: "prompt_veo3", label: "Prompt otimizado para Veo 3", dica: <>Disponível via <span style={{ color: "#6ee7b7" }}>Google Labs / VideoFX</span>. Quanto mais contexto cinematográfico, melhor</> },
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060d1a", color: "#e2e8f0", fontFamily: "Georgia, serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a1628; }
        ::-webkit-scrollbar-thumb { background: #6ee7b7; border-radius: 2px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        select option { background: #0a1628; }
        textarea::placeholder, input::placeholder { color: #2a5a7a; }
        button:hover { opacity: 0.85; }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #0f2744", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 4, background: "linear-gradient(90deg, #6ee7b7, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "Georgia, serif" }}>
            CINE PROMPT
          </div>
          <div style={{ color: "#1e4d6b", fontSize: 10, fontFamily: "monospace", letterSpacing: 2 }}>GERADOR DE PROMPTS CINEMATOGRÁFICOS · CARTEL CRIATIVO</div>
        </div>
        {resultado && (
          <button onClick={reset} style={{ background: "transparent", color: "#4a7fa5", border: "1px solid #1e3a5f", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 11, fontFamily: "monospace", letterSpacing: 1 }}>← NOVO PROMPT</button>
        )}
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 60px", display: resultado ? "block" : "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

        {/* ── FORMULÁRIO ── */}
        {!resultado && (
          <>
            <div className="fade-in">
              <div style={{ marginBottom: 24 }}>
                <Label>Ferramenta de destino</Label>
                <Toggle options={FERRAMENTAS} value={ferramenta} onChange={setFerramenta} />
                <Label>Tipo de output</Label>
                <Toggle options={["Imagem", "Vídeo", "Os dois"]} value={outputType} onChange={setOutputType} />
                <Label>Modo de input</Label>
                <Toggle options={["Menus", "Texto livre", "Os dois"]} value={inputMode} onChange={setInputMode} />
              </div>

              <Section title="DESCRIÇÃO DA CENA" icon="🎬">
                {(inputMode === "Texto livre" || inputMode === "Os dois") && (
                  <TextArea label="Descrição livre da cena" value={cena} onChange={setCena} placeholder="Ex: Uma mulher caminha por uma rua molhada de Tokyo à noite, reflexos de neon no asfalto..." rows={4} />
                )}
                {(inputMode === "Menus" || inputMode === "Os dois") && (
                  <>
                    <Input label="Sujeito principal" value={sujeito} onChange={setSujeito} placeholder="Ex: mulher de 30 anos, skyline urbano, produto de luxo..." />
                    <Input label="Ambiente / cenário" value={ambiente} onChange={setAmbiente} placeholder="Ex: Tokyo à noite, deserto ao amanhecer, estúdio minimalista..." />
                    <Input label="Humor / emoção" value={humor} onChange={setHumor} placeholder="Ex: melancólico, épico, íntimo, tenso, eufórico..." />
                  </>
                )}
              </Section>
            </div>

            <div className="fade-in">
              <Section title="CÂMERA & ÓPTICA" icon="📷">
                {(inputMode === "Menus" || inputMode === "Os dois") && (
                  <>
                    <Select label="Câmera" value={camera} onChange={setCamera} options={CAMERAS} />
                    <Select label="Lente" value={lente} onChange={setLente} options={LENTES} />
                  </>
                )}
                {(inputMode === "Texto livre" || inputMode === "Os dois") && (
                  <>
                    <Input label="Câmera (personalizado)" value={cameraCustom} onChange={setCameraCustom} placeholder="Ex: ARRI Alexa 35 com lente anamórfica..." />
                    <Input label="Lente (personalizado)" value={lenteCustom} onChange={setLenteCustom} placeholder="Ex: 35mm f/1.4 Zeiss Master Prime..." />
                  </>
                )}
              </Section>

              <Section title="MOVIMENTO & LUZ" icon="🎥">
                {(inputMode === "Menus" || inputMode === "Os dois") && (
                  <>
                    <Select label="Movimento de câmera" value={movimento} onChange={setMovimento} options={MOVIMENTOS} />
                    <Select label="Iluminação" value={iluminacao} onChange={setIluminacao} options={ILUMINACOES} />
                    <Select label="Estilo visual" value={estilo} onChange={setEstilo} options={ESTILOS} />
                  </>
                )}
                {(inputMode === "Texto livre" || inputMode === "Os dois") && (
                  <Input label="Movimento (personalizado)" value={movimentoCustom} onChange={setMovimentoCustom} placeholder="Ex: slow push in com rack focus no sujeito..." />
                )}
              </Section>

              <Section title="PARÂMETROS TÉCNICOS" icon="⚙️">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                  <div>
                    <Label>Proporção</Label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                      {PROPORCOES_MJ.map(p => <Chip key={p} label={p} active={proporcao === p} onClick={() => setProporcao(p)} />)}
                    </div>
                  </div>
                  <div>
                    <Label>Versão Midjourney</Label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                      {VERSOES_MJ.map(v => <Chip key={v} label={v} active={versaoMJ === v} onClick={() => setVersaoMJ(v)} />)}
                    </div>
                  </div>
                </div>
                <Input label="Elementos a evitar (negativo)" value={negativo} onChange={setNegativo} placeholder="Ex: blur, noise, text, watermark, low quality..." />
                <Input label="Parâmetros extras" value={extras} onChange={setExtras} placeholder="Ex: --style raw, --chaos 20, --weird 50..." />
              </Section>

              {error && <p style={{ color: "#f87171", fontSize: 12, fontFamily: "monospace", marginBottom: 12 }}>⚠ {error}</p>}

              <button onClick={gerar} disabled={loading} style={{ width: "100%", background: loading ? "#0a1628" : "linear-gradient(135deg, #6ee7b7, #3b82f6)", color: loading ? "#4a7fa5" : "#060d1a", border: "none", borderRadius: 10, padding: "14px 0", fontSize: 14, fontFamily: "monospace", fontWeight: 700, letterSpacing: 2, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
                {loading ? <Spinner /> : "⚡ GERAR PROMPT CINEMATOGRÁFICO"}
              </button>
            </div>
          </>
        )}

        {/* ── RESULTADO ── */}
        {resultado && (
          <div className="fade-in">
            <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 10, padding: 4, flexWrap: "wrap" }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, minWidth: 60, padding: "8px 4px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: 11, letterSpacing: 0.5, transition: "all 0.2s", background: activeTab === t.id ? "#6ee7b720" : "transparent", color: activeTab === t.id ? "#6ee7b7" : "#4a7fa5", borderBottom: activeTab === t.id ? "2px solid #6ee7b7" : "2px solid transparent" }}>{t.label}</button>
              ))}
            </div>

            {activeTab === "dicas" ? (
              <div className="fade-in">
                <Label>Dicas técnicas para melhorar o resultado</Label>
                <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
                  {resultado.dicas?.map((d, i) => (
                    <div key={i} style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "#6ee7b7", fontFamily: "monospace", fontSize: 12, minWidth: 20 }}>0{i + 1}</span>
                      <span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>{d}</span>
                    </div>
                  ))}
                </div>
                <Label>Palavras-chave</Label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {resultado.palavras_chave?.map((k, i) => <Chip key={i} label={k} active={true} onClick={() => {}} />)}
                </div>
              </div>
            ) : PROMPT_MAP[activeTab] ? (
              <div className="fade-in">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <Label>{PROMPT_MAP[activeTab].label}</Label>
                  <CopyBtn text={resultado[PROMPT_MAP[activeTab].key] || ""} />
                </div>
                <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 10, padding: 20, lineHeight: 1.8, fontSize: 14, color: "#cbd5e1", fontFamily: "monospace" }}>
                  {resultado[PROMPT_MAP[activeTab].key]}
                </div>
                {PROMPT_MAP[activeTab].dica && (
                  <div style={{ marginTop: 16, padding: "12px 16px", background: "#0f2744", borderRadius: 8, fontSize: 12, color: "#4a7fa5", fontFamily: "monospace" }}>
                    💡 {PROMPT_MAP[activeTab].dica}
                  </div>
                )}
              </div>
            ) : null}

            <button onClick={reset} style={{ width: "100%", marginTop: 24, background: "transparent", color: "#4a7fa5", border: "1px solid #1e3a5f", borderRadius: 10, padding: "12px 0", fontSize: 12, fontFamily: "monospace", letterSpacing: 2, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#6ee7b7"; e.currentTarget.style.color = "#6ee7b7"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e3a5f"; e.currentTarget.style.color = "#4a7fa5"; }}>
              ← CRIAR NOVO PROMPT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
