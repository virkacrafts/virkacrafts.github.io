'use client'

import {useMemo, useState} from 'react'

const value = (input) => Math.max(0, Number(input) || 0)

export default function CalculatorSuite() {
  const [project, setProject] = useState(100), [gauge, setGauge] = useState(16), [weight, setWeight] = useState(100)
  const [stitches, setStitches] = useState(20), [measured, setMeasured] = useState(4), [wanted, setWanted] = useState(20)
  const [width, setWidth] = useState(20), [chainGauge, setChainGauge] = useState(4)
  const yarn = useMemo(() => gauge ? Math.ceil(value(project) / value(gauge) * value(weight) * 1.1) : 0, [project, gauge, weight])
  const gaugeResult = useMemo(() => measured ? (value(stitches) / value(measured) * value(wanted)).toFixed(1) : '0', [stitches, measured, wanted])
  const chain = useMemo(() => Math.ceil(value(width) * value(chainGauge)) + 1, [width, chainGauge])
  return <div className="calculator-grid"><section className="calculator"><h2>Yarn estimator</h2><label>Project area (cm²)<input type="number" min="0" value={project} onChange={e => setProject(e.target.value)}/></label><label>Reference project area (cm²)<input type="number" min="1" value={gauge} onChange={e => setGauge(e.target.value)}/></label><label>Reference yarn weight (g)<input type="number" min="0" value={weight} onChange={e => setWeight(e.target.value)}/></label><output>Estimated yarn: {yarn} g (includes 10% allowance)</output></section><section className="calculator"><h2>Gauge converter</h2><label>Stitches in your swatch<input type="number" min="0" value={stitches} onChange={e => setStitches(e.target.value)}/></label><label>Swatch width (cm)<input type="number" min="1" value={measured} onChange={e => setMeasured(e.target.value)}/></label><label>Desired width (cm)<input type="number" min="0" value={wanted} onChange={e => setWanted(e.target.value)}/></label><output>Cast on / work: {gaugeResult} stitches</output></section><section className="calculator"><h2>Foundation chain</h2><label>Finished width (cm)<input type="number" min="0" value={width} onChange={e => setWidth(e.target.value)}/></label><label>Stitches per cm<input type="number" min="0" step="0.1" value={chainGauge} onChange={e => setChainGauge(e.target.value)}/></label><output>Foundation chain: {chain} chains (includes turning chain)</output></section></div>
}
