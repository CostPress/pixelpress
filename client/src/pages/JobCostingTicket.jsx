import React, { useState, useMemo } from "react";

const COLORS = {
  paper: "#F7F4EC",
  sheet: "#FFFFFF",
  ink: "#1C1B18",
  slate: "#8A8374",
  line: "#E0DACB",
  cyan: "#0093C9",
  magenta: "#D31670",
  yellow: "#C99400",
  danger: "#B4432E",
};

const CURRENCIES = [
  { code: "USD", label: "$ USD" },
  { code: "XAF", label: "FCFA XAF" },
  { code: "EUR", label: "€ EUR" },
  { code: "GBP", label: "£ GBP" },
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

function Field({ label, hint, children }) {
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

export default function JobCostingTicket() {
  const [ticketNo] = useState(
    () => "PP-" + String(Math.floor(1000 + Math.random() * 9000))
  );

  const [jobName, setJobName] = useState("");
  const [client, setClient] = useState("");
  const [quantity, setQuantity] = useState(1000);
  const [finishedSize, setFinishedSize] = useState("");
  const [currency, setCurrency] = useState("USD");

  const [paperStock, setPaperStock] = useState("Uncoated bond");
  const [paperWeight, setPaperWeight] = useState(80);
  const [costPerSheet, setCostPerSheet] = useState(0.05);
  const [sheetsNeeded, setSheetsNeeded] = useState(1100);
  const [spoilagePercent, setSpoilagePercent] = useState(5);

  const [numColors, setNumColors] = useState(4);
  const [costPerPlate, setCostPerPlate] = useState(8);
  const [numPlates, setNumPlates] = useState(4);
  const [inkCostPerColor, setInkCostPerColor] = useState(12);
  const [coveragePercent, setCoveragePercent] = useState(80);

  const [pressHourlyRate, setPressHourlyRate] = useState(25);
  const [makereadyHours, setMakereadyHours] = useState(0.5);
  const [runningSpeed, setRunningSpeed] = useState(3000);
  const [laborRate, setLaborRate] = useState(8);
  const [numOperators, setNumOperators] = useState(1);

  const [overheadPercent, setOverheadPercent] = useState(15);
  const [marginPercent, setMarginPercent] = useState(20);

  const calc = useMemo(() => {
    const totalSheets = num(sheetsNeeded) * (1 + num(spoilagePercent) / 100);
    const paperCost = totalSheets * num(costPerSheet);
    const plateCost = num(numPlates) * num(costPerPlate);
    const inkCost =
      num(numColors) * num(inkCostPerColor) * (num(coveragePercent) / 100);
    const speed = num(runningSpeed) > 0 ? num(runningSpeed) : 1;
    const pressTimeHours = num(makereadyHours) + totalSheets / speed;
    const pressCost = pressTimeHours * num(pressHourlyRate);
    const laborCost = pressTimeHours * num(laborRate) * num(numOperators);
    const subtotal = paperCost + plateCost + inkCost + pressCost + laborCost;
    const overheadAmt = subtotal * (num(overheadPercent) / 100);
    const marginAmt = (subtotal + overheadAmt) * (num(marginPercent) / 100);
    const total = subtotal + overheadAmt + marginAmt;
    const qty = num(quantity) > 0 ? num(quantity) : 1;
    const perUnit = total / qty;
    return {
      totalSheets,
      paperCost,
      plateCost,
      inkCost,
      pressTimeHours,
      pressCost,
      laborCost,
      subtotal,
      overheadAmt,
      marginAmt,
      total,
      perUnit,
    };
  }, [
    sheetsNeeded,
    spoilagePercent,
    costPerSheet,
    numPlates,
    costPerPlate,
    numColors,
    inkCostPerColor,
    coveragePercent,
    runningSpeed,
    makereadyHours,
    pressHourlyRate,
    laborRate,
    numOperators,
    overheadPercent,
    marginPercent,
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
              <RegMark color={COLORS.ink} size={22} />
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 34,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color: COLORS.ink,
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
            <Section number="01" title="Job details" accent={COLORS.ink}>
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

            <Section number="02" title="Paper" accent={COLORS.yellow}>
              <Field label="Paper stock">
                <SelectInput
                  value={paperStock}
                  onChange={(e) => setPaperStock(e.target.value)}
                >
                  <option>Uncoated bond</option>
                  <option>Gloss art</option>
                  <option>Matte art</option>
                  <option>Card stock</option>
                  <option>Recycled</option>
                  <option>Newsprint</option>
                </SelectInput>
              </Field>
              <Field label="Weight (gsm)">
                <NumberInput
                  min="0"
                  value={paperWeight}
                  onChange={(e) => setPaperWeight(e.target.value)}
                />
              </Field>
              <Field label="Cost per sheet" hint={CURRENCIES.find(c=>c.code===currency)?.label}>
                <NumberInput
                  min="0"
                  step="0.01"
                  value={costPerSheet}
                  onChange={(e) => setCostPerSheet(e.target.value)}
                />
              </Field>
              <Field label="Sheets required" hint="Before spoilage">
                <NumberInput
                  min="0"
                  value={sheetsNeeded}
                  onChange={(e) => setSheetsNeeded(e.target.value)}
                />
              </Field>
              <Field label="Spoilage" hint="Wastage allowance">
                <NumberInput
                  min="0"
                  max="100"
                  value={spoilagePercent}
                  onChange={(e) => setSpoilagePercent(e.target.value)}
                />
              </Field>
            </Section>

            <Section number="03" title="Ink & plates" accent={COLORS.cyan}>
              <Field label="Colors" hint="e.g. 4 for CMYK">
                <NumberInput
                  min="0"
                  value={numColors}
                  onChange={(e) => setNumColors(e.target.value)}
                />
              </Field>
              <Field label="Plates" hint="Colors × sides">
                <NumberInput
                  min="0"
                  value={numPlates}
                  onChange={(e) => setNumPlates(e.target.value)}
                />
              </Field>
              <Field label="Cost per plate">
                <NumberInput
                  min="0"
                  step="0.01"
                  value={costPerPlate}
                  onChange={(e) => setCostPerPlate(e.target.value)}
                />
              </Field>
              <Field label="Ink cost per color" hint="Flat, per job">
                <NumberInput
                  min="0"
                  step="0.01"
                  value={inkCostPerColor}
                  onChange={(e) => setInkCostPerColor(e.target.value)}
                />
              </Field>
              <Field label="Coverage" hint="Estimated ink coverage">
                <NumberInput
                  min="0"
                  max="100"
                  value={coveragePercent}
                  onChange={(e) => setCoveragePercent(e.target.value)}
                />
              </Field>
            </Section>

            <Section number="04" title="Press & labor" accent={COLORS.magenta}>
              <Field label="Press rate" hint="Per hour">
                <NumberInput
                  min="0"
                  step="0.01"
                  value={pressHourlyRate}
                  onChange={(e) => setPressHourlyRate(e.target.value)}
                />
              </Field>
              <Field label="Makeready time" hint="Hours">
                <NumberInput
                  min="0"
                  step="0.1"
                  value={makereadyHours}
                  onChange={(e) => setMakereadyHours(e.target.value)}
                />
              </Field>
              <Field label="Running speed" hint="Sheets per hour">
                <NumberInput
                  min="1"
                  value={runningSpeed}
                  onChange={(e) => setRunningSpeed(e.target.value)}
                />
              </Field>
              <Field label="Labor rate" hint="Per operator, per hour">
                <NumberInput
                  min="0"
                  step="0.01"
                  value={laborRate}
                  onChange={(e) => setLaborRate(e.target.value)}
                />
              </Field>
              <Field label="Operators">
                <NumberInput
                  min="0"
                  value={numOperators}
                  onChange={(e) => setNumOperators(e.target.value)}
                />
              </Field>
            </Section>

            <Section number="05" title="Overhead & margin" accent={COLORS.slate}>
              <Field label="Overhead" hint="% of subtotal">
                <NumberInput
                  min="0"
                  value={overheadPercent}
                  onChange={(e) => setOverheadPercent(e.target.value)}
                />
              </Field>
              <Field label="Margin" hint="% added on top">
                <NumberInput
                  min="0"
                  value={marginPercent}
                  onChange={(e) => setMarginPercent(e.target.value)}
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
                borderBottom: `1px dashed ${COLORS.line}`,
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
              <LedgerRow label="Paper" value={calc.paperCost} currency={currency} muted />
              <LedgerRow label="Plates" value={calc.plateCost} currency={currency} muted />
              <LedgerRow label="Ink" value={calc.inkCost} currency={currency} muted />
              <LedgerRow label="Press time" value={calc.pressCost} currency={currency} muted />
              <LedgerRow label="Labor" value={calc.laborCost} currency={currency} muted />
            </div>

            <div style={{ padding: "6px 20px", borderTop: `1px solid ${COLORS.line}` }}>
              <LedgerRow label="Subtotal" value={calc.subtotal} currency={currency} strong />
              <LedgerRow
                label={`Overhead (${num(overheadPercent)}%)`}
                value={calc.overheadAmt}
                currency={currency}
                muted
              />
              <LedgerRow
                label={`Margin (${num(marginPercent)}%)`}
                value={calc.marginAmt}
                currency={currency}
                muted
              />
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
                  Total price
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 600,
                    fontSize: 24,
                    color: COLORS.ink,
                  }}
                >
                  {formatMoney(calc.total, currency)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: COLORS.slate,
                }}
              >
                <span>Cost per unit</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {formatMoney(calc.perUnit, currency)}
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
                <span>Total sheets</span>
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
                <span>Press time</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {calc.pressTimeHours.toFixed(2)} hrs
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
