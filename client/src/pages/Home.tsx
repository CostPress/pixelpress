import React, { useState, useMemo } from "react";

const COLORS = {
  paper: "#F7F4EC",
  sheet: "#FFFFFF",
  ink: "#1C1B18",
  slate: "#8A8374",
  line: "#F5F5DC",
  cyan: "#0093C9",
  pixelpress: "#166534",
  magenta: "#D31670",
  yellow: "#C99400",
  danger: "#B4432E",
};

const CURRENCIES = [
  { code: "XAF", label: "FCFA XAF" },

];

function formatMoney(value, code) {
  const safe = Number.isFinite(value) ? value : 0;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
    }).format(safe);
  } catch {
    return safe.toFixed(2);
  }
}

function num(v, fallback = 0) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

const PRODUCTS_WITH_BINDING = ["book", "receipt"];
const RegMark = ({ color = COLORS.ink, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="6.5" stroke={color} strokeWidth="1.4" />
    <line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="1.4" />
    <line x1="1" y1="12" x2="23" y2="12" stroke={color} strokeWidth="1.4" />
  </svg>
);

function Field({ label, hint, tooltip, children }) {
  return (
    <label style={{ display: "block" }}>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: COLORS.slate,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 6,
        }}
      >
        {label}
        {tooltip && (
          <span title={tooltip} style={{ cursor: "help", color: COLORS.slate, fontSize: 12 }}>
            ⓘ
          </span>
        )}
        
      </div>
      {children}
      {hint && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: COLORS.slate,
            marginTop: 4,
          }}
        >
          {hint}
        </div>
      )}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 14,
  color: COLORS.ink,
  background: COLORS.sheet,
  border: `1px solid ${COLORS.line}`,
  borderRadius: 4,
  padding: "9px 10px",
  outline: "none",
};

const textInputStyle = {
  ...inputStyle,
  fontFamily: "'Inter', sans-serif",
};

function NumberInput(props) {
  return (
    <input
      type="number"
      style={inputStyle}
      onFocus={(e) => (e.target.style.borderColor = COLORS.ink)}
      onBlur={(e) => (e.target.style.borderColor = COLORS.line)}
      {...props}
    />
  );
}

function TextInput(props) {
  return (
    <input
      type="text"
      style={textInputStyle}
      onFocus={(e) => (e.target.style.borderColor = COLORS.ink)}
      onBlur={(e) => (e.target.style.borderColor = COLORS.line)}
      {...props}
    />
  );
}

function SelectInput({ children, ...props }) {
  return (
    <select
      style={{ ...textInputStyle, cursor: "pointer" }}
      onFocus={(e) => (e.target.style.borderColor = COLORS.ink)}
      onBlur={(e) => (e.target.style.borderColor = COLORS.line)}
      {...props}
    >
      {children}
    </select>
  );
}

function Section({ number, title, accent, children }) {
  return (
    <section
      style={{
        background: COLORS.sheet,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 6,
        marginBottom: 20,
        overflow: "hidden",
      }}
    >
      <div style={{ height: 3, background: accent }} />
      <div style={{ padding: "18px 22px 22px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
            paddingBottom: 12,
            borderBottom: `1px solid ${COLORS.line}`,
          }}
        >
          <RegMark color={accent} />
          <h2
            style={{
              margin: 0,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: COLORS.ink,
            }}
          >
            {number} · {title}
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px 20px",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function LedgerRow({ label, value, currency, strong, muted }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        padding: strong ? "10px 0 2px" : "5px 0",
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: strong ? 14 : 13,
          fontWeight: strong ? 700 : 500,
          color: muted ? COLORS.slate : COLORS.ink,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          flex: 1,
          borderBottom: `1px dotted ${COLORS.line}`,
          transform: "translateY(-3px)",
        }}
      />
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: strong ? 15 : 13,
          fontWeight: strong ? 700 : 500,
          color: muted ? COLORS.slate : COLORS.ink,
          whiteSpace: "nowrap",
        }}
      >
        {formatMoney(value, currency)}
      </span>
    </div>
  );
}

export default function Home({ productType }: { productType?: string }) {
  const [ticketNo] = useState(
    () => "PP-" + String(Math.floor(1000 + Math.random() * 9000))
  );

  const [jobName, setJobName] = useState("");
  const [client, setClient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [finishedSize, setFinishedSize] = useState("");
  const [currency, setCurrency] = useState("FRS");
  const [isRectoVerso, setIsRectoVerso] = useState(false);
  const [isRectoVerso1, setIsRectoVerso1] = useState(false);

  const [paperStock, setPaperStock] = useState("Uncoated bond");
  const [paperGrammage, setpaperGrammage] = useState(80);
  const [paperGrammage1, setpaperGrammage1] = useState(80);
  const [priceperream, setpriceperream] = useState("");
  const [priceperream1, setpriceperream1] = useState("");
   const [sheetsPerReam, setSheetsPerReam] = useState("");
   const [sheetsPerReam1, setSheetsPerReam1] = useState("");
  const [sheetsNeeded, setSheetsNeeded] = useState("");
  const [spoilagePercent, setSpoilagePercent] = useState("");
  const [spoilagePercent1, setSpoilagePercent1] = useState("");
  const [finalNumOnReam, setfinalNumOnReam] = useState("");
  const [finalNumOnReam1, setfinalNumOnReam1] = useState("");

  const [numColors, setNumColors] = useState("");
  const [insheetnumColors, setinsheetNumColors] = useState("");
  const [costPerPlate, setCostPerPlate] = useState("");
  const [costPerPlate1, setCostPerPlate1] = useState("");
  const [numPlates, setNumPlates] = useState("");
  const [plateSize, setplateSize] = useState("");
  const [insheetplateSize, setinsheetplateSize] = useState("");
  const [innerSheetSeparationType, setInnerSheetSeparationType] = useState("tracingPaper");

  const [priceImpression, setpriceImpression] = useState("");
  const [priceImpression1, setpriceImpression1] = useState("");
  const [finalNumOnCutting, setfinalNumOnCutting] = useState("");
  const [finalNumOnCutting1, setfinalNumOnCutting1] = useState("");
  const [colorSeparationprice, setcolorSeparationprice] = useState("");
  const [colorSeparationprice1, setcolorSeparationprice1] = useState("");
  const [Numpages, setNumpages] = useState("");

  const [bindingUnitPrice, setBindingUnitPrice] = useState("");
  const [laminationUnitPrice, setLaminationUnitPrice] = useState("");

  const resetAll = () => {
  setJobName("");
  setClient("");
  setQuantity("");
  setFinishedSize("");

  setCurrency("XAF");

  setPaperStock("");
  setpaperGrammage("");
  setpaperGrammage1("");
  setpriceperream("");
  setpriceperream1("");
  setSheetsPerReam("");
  setSheetsPerReam1("");
  setSheetsNeeded("");
  setSpoilagePercent("");
  setSpoilagePercent1("");
  setfinalNumOnReam("");
  setfinalNumOnReam1("");

  setNumColors("");
  setinsheetNumColors("");
  setCostPerPlate("");
  setCostPerPlate1("");
  setNumPlates("");
  setplateSize("");
  setinsheetplateSize("");

  setpriceImpression("");
  setpriceImpression1("");
  setfinalNumOnCutting("");
  setfinalNumOnCutting1("");
  setLaborRate("");
  setIsRectoVerso(false);
  setIsRectoVerso1(false);

  setcolorSeparationprice("");
  setcolorSeparationprice1("");
  setNumPages("");
  setBindingUnitPrice("");
  setLaminationUnitPrice("");
};

  function computeCalc() {
    const sidesMultiplier = isRectoVerso ? 2 : 1;
    const sheetsNeeded = quantity / num(finalNumOnReam);
    const impressionNum = quantity / num(finalNumOnCutting)* num(numColors) * sidesMultiplier;
    const totalSheets = num(sheetsNeeded) * (1 + num(spoilagePercent) / 100);
    const totalReams = Math.round(totalSheets / num(sheetsPerReam));
    const leftoverReams = totalSheets % num(sheetsPerReam);
    const bindingTotal = num(bindingUnitPrice) * quantity;
    const laminationTotal = num(laminationUnitPrice) * quantity;
    const rawPaperCost = quantity / (num(finalNumOnReam) * num(sheetsPerReam)) * num(priceperream);
    const paperCost = rawPaperCost * (1 + num(spoilagePercent) / 100) + bindingTotal + laminationTotal;
    const plateCost = num(numColors) * num(costPerPlate);
    const impCost = (num(quantity) / num(finalNumOnCutting)) * num(numColors) * num(priceImpression) * sidesMultiplier;
    const colorSeparationCost = num(colorSeparationprice) * numColors * sidesMultiplier;
    const subtotal = paperCost + plateCost + impCost + colorSeparationCost;
    const qty = num(quantity) > 0 ? num(quantity) : 1;

    const sidesMultiplier1 = isRectoVerso1 ? 2 : 1;
    const sheetsNeeded1 = (quantity * num(Numpages)) / (num(finalNumOnReam1) * 2);
    const impressionNum1 = quantity * num(Numpages) / num(finalNumOnCutting1) * num(insheetnumColors) * sidesMultiplier1;
    const totalSheets1 = num(sheetsNeeded1) * (1 + num(spoilagePercent1) / 100);
    const totalReams1 = Math.round(totalSheets1 / num(sheetsPerReam1));
    const numofPages = num(Numpages) / num(finalNumOnReam1);
    const leftoverReams1 = totalSheets1 % num(sheetsPerReam1);
    const rawPaperCost1 = (quantity * numofPages) / (num(finalNumOnReam1) * num(sheetsPerReam1)) * num(priceperream1);
    const paperCost1 = rawPaperCost1 * (1 + num(spoilagePercent1) / 100);
    const plateCost1 = num(insheetnumColors) * num(costPerPlate1) * (num(Numpages) / num(finalNumOnReam1));
    const impCost1 = innerSheetSeparationType ? (num(quantity) / num(finalNumOnCutting1)) * num(insheetnumColors) * (num(Numpages) / num(finalNumOnCutting1)) * num(priceImpression1) * sidesMultiplier1 : 0;
    const colorSeparationCost1 = num(colorSeparationprice1) * num(insheetnumColors) *(num(Numpages) / num(finalNumOnCutting1)) * sidesMultiplier1;
    const subtotal1 = productType === "book" ? paperCost1 + plateCost1 + impCost1 + colorSeparationCost1 : 0;
    const total = subtotal + subtotal1;
    const perUnit = total / qty;

    return {
      totalSheets,
      totalSheets1,
      numPlates,
      paperCost,
      numofPages,
      paperCost1,
      totalReams,
      totalReams1,
      plateCost,
      plateCost1,
      leftoverReams,
      leftoverReams1,
      impressionNum,
      impressionNum1,
      laminationTotal,
      bindingTotal,
      impCost,
      impCost1,
      colorSeparationCost,
      colorSeparationCost1,
      subtotal,
      subtotal1,
      total,
      perUnit,
    };
  }
  const calc = computeCalc();
([
    sheetsNeeded,
    spoilagePercent,
    spoilagePercent1,
    priceperream,
    priceperream1,
    sheetsPerReam,
    sheetsPerReam1,
    costPerPlate,
    costPerPlate1,
    numColors,
    insheetnumColors,
    plateSize,
    insheetplateSize,
    finalNumOnCutting,
    finalNumOnCutting1,
    finalNumOnReam,
    finalNumOnReam1,
    priceImpression,
    priceImpression1,
    quantity,
  ]);

  return (
    <div
      style={{
        background: COLORS.paper,
        minHeight: "100vh",
        padding: "36px 24px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Ticket header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 12,
            paddingBottom: 16,
            marginBottom: 28,
            borderBottom: `2px solid ${COLORS.ink}`,
            position: "relative",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <button
  onClick={resetAll}
  style={{
    padding: "8px 14px",
    background: COLORS.danger,
    color: "#FFFFFF",
    border: "none",
    borderRadius: 4,
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  }}
>
  Reset
</button>
              <RegMark color={COLORS.ink} size={22} />
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 34,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: COLORS.pixelpress,
                }}
              >
                PixelPress
              </h1>
            </div>
            <p
              style={{
                margin: "0 0 0 32px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: COLORS.slate,
                letterSpacing: "0.02em",
              }}
            >
              Job cost ticket — offset print estimate
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: COLORS.slate,
                }}
              >
                Ticket no.
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.ink,
                }}
              >
                {ticketNo}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: COLORS.slate,
                }}
              >
                Currency
              </div>
              <SelectInput
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ ...textInputStyle, padding: "6px 8px", fontSize: 14 }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </SelectInput>
            </div>
          </div>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 340px",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Main form column */}
          <div style={{ minWidth: 0 }}>
            <Section title="Job details" accent={COLORS.pixelpress}>
              <Field label="Job name">
                <TextInput
                  placeholder="Flyer reprint — Q3 promo"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                />
              </Field>
              <Field label="Client">
                <TextInput
                  placeholder="Client or company name"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                />
              </Field>
              <Field label="Quantity" hint="Finished units ordered">
                <NumberInput
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Field>
              <Field label="Finished size">
                <TextInput
                  placeholder="A5, 148 × 210 mm"
                  value={finishedSize}
                  onChange={(e) => setFinishedSize(e.target.value)}
                />
              </Field>
            </Section>
           <div
      style={{
        width: '200px',
        height: '25px',
        backgroundColor: '#166534', // any color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '6px',
      }}
    >
      Cover Sheet Costing
    </div>
          <Section number="01" title="Colour Separation" accent={COLORS.cyan}>
              <Field label="COLOUR SEPARATION SIZE" hint="size of films to be mounted">
              <SelectInput
                  value={plateSize}
                  onChange={(e) => setplateSize(e.target.value)}
                >
                <option>A3</option>
                <option>A2</option>
              </SelectInput>
              </Field>
              <Field label="NUMBER OF COLOURS" hint="Printing Ink. Add 1 colour if you intend to vanish">
                <NumberInput
                  min="1"
                  max="4"
                  value={numColors}
                  onChange={(e) => setNumColors(e.target.value)}
                />
              </Field>
               <Field label="Unit Price" hint="per colour">
                <NumberInput
                min="0"
                step="1000"
                  value={colorSeparationprice}
                  onChange={(e) => setcolorSeparationprice(e.target.value)}
                  
                />
              </Field>
            </Section>

               <Section number="02" title="Impression" accent={COLORS.magenta}>
              <Field label="Impression U.P" hint="impression per copy">
                <NumberInput
                  min="4"
                  step="1"
                  value={priceImpression}
                  onChange={(e) => setpriceImpression(e.target.value)}
                />
              </Field>
              <Field label="Number of final on plate size" hint="Cutting size is print plate size">
                <SelectInput
                  value={finalNumOnCutting}
                  onChange={(e) => setfinalNumOnCutting(e.target.value)}
                  >
                <option>1</option>
                <option>2</option>
                <option>4</option>
                <option>8</option>
                <option>16</option>
                <option>32</option>
                </SelectInput>
              </Field>
              <Field label="Print side" hint="Recto or recto-verso">
  <div
    style={{
      display: "inline-flex",
      border: `1px solid ${COLORS.line}`,
      borderRadius: 4,
      padding: 3,
      background: COLORS.paper,
    }}
  >
    <button
      type="button"
      onClick={() => setIsRectoVerso(false)}
      style={{
        padding: "7px 14px",
        border: "none",
        borderRadius: 3,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        background: !isRectoVerso ? COLORS.magenta : "transparent",
        color: !isRectoVerso ? "#FFFFFF" : COLORS.slate,
        transition: "all 0.15s",
      }}
    >
      Recto
    </button>
    <button
      type="button"
      onClick={() => setIsRectoVerso(true)}
      style={{
        padding: "7px 14px",
        border: "none",
        borderRadius: 3,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        background: isRectoVerso ? COLORS.magenta : "transparent",
        color: isRectoVerso ? "#FFFFFF" : COLORS.slate,
        transition: "all 0.15s",
      }}
    >
      Recto-verso
    </button>
  </div>
</Field>
            </Section>

            <Section number="03" title="plates" accent={COLORS.yellow}>
              <Field label="Colors" hint="e.g. 4 for CMYK">
                <NumberInput
                  min="1"
                  max="5"
                  value={numColors}
                  onChange={(e) => setNumColors(e.target.value)}
                />
              </Field>
              <Field label="Plates" hint="Colors × sides">
                <NumberInput
                  min="0"
                  value={numColors}
                  onChange={(e) => setNumColors(e.target.value)}
                />
              </Field>
              <Field label="Cost per plate">
                <NumberInput
                  min="1000"
                  step="500"
                  value={costPerPlate}
                  onChange={(e) => setCostPerPlate(e.target.value)}
                />
              </Field>
              <Field label="Plate Size" hint="A3, A2">
                <SelectInput
                  value={plateSize} readOnly>
                <option>A3</option>
                <option>A2</option>
              </SelectInput>
              </Field>
            </Section>

            <Section number="04" title="Paper" accent={COLORS.ink}>
              <Field label="Paper stock">
                <SelectInput
                  value={paperStock}
                  onChange={(e) => setPaperStock(e.target.value)}
                >
                  <option>Offset</option>
                  <option>Glossy art</option>
                  <option>Satine art</option>
                  <option>Bristol stock</option>
                  <option>Cardboard</option>
                  <option>Newsprint</option>
                  <option>Grayboard</option>
                  <option>Autocopiant</option>
                </SelectInput>
              </Field>
              <Field label="Weight (gsm)">
                <NumberInput
                  min="0"
                  value={paperGrammage}
                  onChange={(e) => setpaperGrammage(e.target.value)}
                />
              </Field>
              <Field label="price per ream" hint={CURRENCIES.find(c=>c.code===currency)?.label}>
                <NumberInput
                  min="0"
                  step="1000"
                  value={priceperream}
                  onChange={(e) => setpriceperream(e.target.value)}
                />
              </Field>
              <Field label="PAPER CONDITIONING" hint="Number of sheets per ream">
                <NumberInput
                  min="0"
                  step="50"
                    value={sheetsPerReam}
                    onChange={(e) => setSheetsPerReam(e.target.value)}
                />
              </Field>
              <Field label="Number of final on cutting size" hint="Number of times it comes out on ream size">
                <NumberInput
                  min="1"
                  max="10"
                  step="1"
                  value={finalNumOnReam}
                  onChange={(e) => setfinalNumOnReam(e.target.value)}
                />
              </Field>
              <Field label="Spoilage" tooltip="Extra paper allowance to cover printing errors, misprints, and setup waste">
                <NumberInput
                  min="0"
                  max="100"
                  value={spoilagePercent}
                  onChange={(e) => setSpoilagePercent(e.target.value)}
                />
              </Field>
            </Section>
            
  {/* form for inner sheet */}
  {productType === "book" && (
  <>
    <div
      style={{
        width: '200px',
        height: '25px',
        backgroundColor: '#166534', // any color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '6px',
      }}
    >
      Inner Sheet Costing
    </div>
  <Field label="Number of PAGES" hint="Number of pages book contains">
                <NumberInput
                  min="0"
                  step="1"
                    value={Numpages}
                    onChange={(e) => setNumpages(e.target.value)}
                />
              </Field>
<Section number="05" title="Colour Separation" accent={COLORS.cyan}>
  <div
    style={{
      display: "inline-flex",
      border: `1px solid ${COLORS.line}`,
      borderRadius: 4,
      padding: 3,
      background: COLORS.paper,
      marginBottom: 27,
    }}
  >
    <button
      type="button"
      onClick={() => setInnerSheetSeparationType("tracingPaper")}
      style={{
        padding: "7px 10px",
        border: "none",
        borderRadius: 3,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        background: innerSheetSeparationType === "tracingPaper" ? COLORS.cyan : "transparent",
        color: innerSheetSeparationType === "tracingPaper" ? "#FFFFFF" : COLORS.slate,
        transition: "all 0.15s",
      }}
    >
      Tracing paper
    </button>
    <button
      type="button"
      onClick={() => setInnerSheetSeparationType("film")}
      style={{
        padding: "7px 50px",
        border: "none",
        borderRadius: 3,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        background: innerSheetSeparationType === "film" ? COLORS.cyan : "transparent",
        color: innerSheetSeparationType === "film" ? "#FFFFFF" : COLORS.slate,
        transition: "all 0.15s",
      }}
    >
      Film
    </button>
  </div>

  {innerSheetSeparationType === "film" && (
    <>
      <Field label="COLOUR SEPARATION SIZE" hint="size of films to be mounted">
        <SelectInput
          value={insheetplateSize}
          onChange={(e) => setinsheetplateSize(e.target.value)}
        >
          <option>A3</option>
          <option>A2</option>
        </SelectInput>
      </Field>
      <Field label="NUMBER OF COLOURS" hint="Printing Ink">
        <NumberInput
          min="1"
          max="4"
          value={insheetnumColors}
          onChange={(e) => setinsheetNumColors(e.target.value)}
        />
      </Field>
      <Field label="Unit Price" hint="per colour">
        <NumberInput
          min="0"
          step="1000"
          value={colorSeparationprice1}
          onChange={(e) => setcolorSeparationprice1(e.target.value)}
        />
      </Field>
    </>
  )}
</Section>

               <Section number="06" title="Impression" accent={COLORS.magenta}>
              <Field label="Impression U.P" hint="impression per copy">
                <NumberInput
                  min="4"
                  step="1"
                  value={priceImpression1}
                  onChange={(e) => setpriceImpression1(e.target.value)}
                />
              </Field>
              <Field label="Number of final on plate size" hint="Cutting size is print plate size">
                <SelectInput
                  value={finalNumOnCutting1}
                  onChange={(e) => setfinalNumOnCutting1(e.target.value)}
                  >
                <option>1</option>
                <option>2</option>
                <option>4</option>
                <option>8</option>
                <option>16</option>
                <option>32</option>
                </SelectInput>
              </Field>
              <Field label="Print side" hint="Recto or recto-verso">
  <div
    style={{
      display: "inline-flex",
      border: `1px solid ${COLORS.line}`,
      borderRadius: 4,
      padding: 3,
      background: COLORS.paper,
    }}
  >
    <button
      type="button"
      onClick={() => setIsRectoVerso1(false)}
      style={{
        padding: "7px 14px",
        border: "none",
        borderRadius: 3,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        background: !isRectoVerso1 ? COLORS.magenta : "transparent",
        color: !isRectoVerso1 ? "#FFFFFF" : COLORS.slate,
        transition: "all 0.1s",
      }}
    >
      Recto
    </button>
    <button
      type="button"
      onClick={() => setIsRectoVerso1(true)}
      style={{
        padding: "7px 14px",
        border: "none",
        borderRadius: 3,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        background: isRectoVerso1 ? COLORS.magenta : "transparent",
        color: isRectoVerso1 ? "#FFFFFF" : COLORS.slate,
        transition: "all 0.15s",
      }}
    >
      Recto-verso
    </button>
  </div>
</Field>
            </Section>

            <Section number="07" title="plates" accent={COLORS.yellow}>
              <Field label="Colors" hint="e.g. 4 for CMYK">
                <NumberInput
                  min="1"
                  max="5"
                  value={insheetnumColors}
                  onChange={(e) => setinsheetNumColors(e.target.value)}
                />
              </Field>
              <Field label="Plates" hint="Colors × sides">
                <NumberInput
                  min="0"
                  value={insheetnumColors}
                  onChange={(e) => setinsheetNumColors(e.target.value)}
                />
              </Field>
              <Field label="Cost per plate">
                <NumberInput
                  min="1000"
                  step="500"
                  value={costPerPlate1}
                  onChange={(e) => setCostPerPlate1(e.target.value)}
                />
              </Field>
              <Field label="Plate Size" hint="A3, A2">
                <SelectInput
                  value={insheetplateSize} readOnly>
                <option>A3</option>
                <option>A2</option>
              </SelectInput>
              </Field>
            </Section>

            <Section number="08" title="Paper" accent={COLORS.ink}>
              <Field label="Paper stock">
                <SelectInput
                  value={paperStock}
                  onChange={(e) => setPaperStock(e.target.value)}
                >
                  <option>Offset</option>
                  <option>Glossy art</option>
                  <option>Satine art</option>
                  <option>Bristol stock</option>
                  <option>Cardboard</option>
                  <option>Newsprint</option>
                  <option>Grayboard</option>
                  <option>Autocopiant</option>
                </SelectInput>
              </Field>
              <Field label="Weight (gsm)">
                <NumberInput
                  min="0"
                  value={paperGrammage1}
                  onChange={(e) => setpaperGrammage1(e.target.value)}
                />
              </Field>
              <Field label="price per ream" hint={CURRENCIES.find(c=>c.code===currency)?.label}>
                <NumberInput
                  min="0"
                  step="1000"
                  value={priceperream1}
                  onChange={(e) => setpriceperream1(e.target.value)}
                />
              </Field>
              <Field label="PAPER CONDITIONING" hint="Number of sheets per ream">
                <NumberInput
                  min="0"
                  step="50"
                    value={sheetsPerReam1}
                    onChange={(e) => setSheetsPerReam1(e.target.value)}
                />
              </Field>
              <Field label="Number of final on cutting size" hint="Number of times it comes out on ream size">
                <NumberInput
                  min="1"
                  max="10"
                  step="1"
                  value={finalNumOnReam1}
                  onChange={(e) => setfinalNumOnReam1(e.target.value)}
                />
              </Field>
              <Field label="Spoilage" tooltip="Extra paper allowance to cover printing errors, misprints, and setup waste">
                <NumberInput
                  min="0"
                  max="100"
                  value={spoilagePercent1}
                  onChange={(e) => setSpoilagePercent1(e.target.value)}
                />
              </Field>
            </Section>
            </>
    )}

            <Section  title="Others" accent={COLORS.slate}>
              {PRODUCTS_WITH_BINDING.includes(productType) && (
              <Field label="Binding Unit Price" hint="Binding; Stapling, Gluing">
                <NumberInput
                value={bindingUnitPrice}
               onChange={(e) => setBindingUnitPrice(e.target.value)}
                />
              </Field>
              )}
              <Field label="Lamination Unit Price" hint="Lamination; Gloss, Matte">
                <NumberInput
                step="10"
                value={laminationUnitPrice}
                onChange={(e) => setLaminationUnitPrice(e.target.value)}
                />
              </Field>
            </Section>
          </div>

          {/* Sticky summary docket */}
          <aside
            style={{
              position: "sticky",
              top: 24,
              background: COLORS.sheet,
              border: `1px solid ${COLORS.ink}`,
              borderRadius: 6,
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: `px dashed ${COLORS.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: COLORS.ink,
                }}
              >
                Cost summary
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <RegMark color={COLORS.cyan} size={12} />
                <RegMark color={COLORS.magenta} size={12} />
                <RegMark color={COLORS.yellow} size={12} />
                <RegMark color={COLORS.ink} size={12} />
              </div>
            </div>

            <div style={{ padding: "14px 20px 6px" }}>
              <h1><b>Cover Sheets</b></h1>
              <LedgerRow label="Colour Separation" value={calc.colorSeparationCost} currency={currency} muted />
              <LedgerRow label="Impression" value={calc.impCost} currency={currency} muted />
              <LedgerRow label="Plates" value={calc.plateCost} currency={currency} muted />
              <LedgerRow label="Paper" value={calc.paperCost} currency={currency} muted />
<LedgerRow label="Subtotal" value={calc.subtotal} currency={currency} strong />
              <div style={{ padding: "6px 20px", borderTop: `1px solid ${COLORS.line}` }}>
              
            </div>
            {productType == "book" &&(
              <>
              <h1><b>Inner Sheets</b></h1>
              <LedgerRow label="Colour Separation" value={calc.colorSeparationCost1} currency={currency} muted />
              <LedgerRow label="Impression" value={calc.impCost1} currency={currency} muted />
              <LedgerRow label="Plates" value={calc.plateCost1} currency={currency} muted />
              <LedgerRow label="Paper" value={calc.paperCost1} currency={currency} muted />
            </>
            )}
            </div>

            <div style={{ padding: "6px 20px", borderTop: `3px solid ${COLORS.line}` }}>
              {productType == "book" &&(
              <LedgerRow label="Subtotal" value={calc.subtotal1} currency={currency} strong />
              )}
              <LedgerRow label="Total" value={calc.total} currency={currency} strong />
            <LedgerRow label="Unit Price" value={calc.perUnit} currency={currency} strong />
            </div>
            <div
              style={{
                margin: "4px 20px 0",
                borderTop: `2px solid ${COLORS.ink}`,
              }}
            />

            <div style={{ padding: "12px 20px 20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: COLORS.ink,
                  }}
                >
                job Requirements
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 600,
                    fontSize: 24,
                    color: COLORS.ink,
                  }}
                >
                </span>
              </div>
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: COLORS.slate,
                  marginTop: 4,
                }}
              >
                <span>Total Plates</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {Math.ceil(calc.numPlates).toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: COLORS.slate,
                  marginTop: 4,
                }}
              >
                <span>Total Reams</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {`${calc.totalReams} reams + ${calc.leftoverReams.toFixed(2)} sheets`}
                </span>
              </div>
      
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: COLORS.slate,
                  marginTop: 4,
                }}
              >
                <span>Total Sheets</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {Math.ceil(calc.totalSheets).toLocaleString()}
                </span>
              </div>
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: COLORS.slate,
                  marginTop: 4,
                }}
              >
                <span>Number of Impressions</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {Math.ceil(calc.impressionNum).toLocaleString()} imp
                </span>
              </div>
              <div style={{ padding: "6px 10px", borderTop: `2px solid ${COLORS.line}` }}>
                </div>
               
                {productType == "book" &&(
              <>
            <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: COLORS.slate,
                  marginTop: 4,
                }}
              >
                
                <span>Total Reams</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {`${calc.totalReams1} reams + ${calc.leftoverReams1} sheets`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: COLORS.slate,
                  marginTop: 4,
                }}
              >
                <span>Total Sheets</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {Math.ceil(calc.totalSheets1).toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: COLORS.slate,
                  marginTop: 4,
                }}
              >
                <span>Number of Impressions</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {Math.ceil(calc.impressionNum1).toLocaleString()} imp
                </span>
              </div>
              </>
                )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
