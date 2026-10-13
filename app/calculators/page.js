import CalculatorSuite from '../../components/CalculatorSuite'

export const metadata={title:'Crochet Calculators',description:'Estimate yarn, convert gauge, and calculate a foundation chain.',alternates:{canonical:'/calculators'}}
export default function CalculatorsPage(){return <section className="container"><p className="eyebrow">Make planning easier</p><h1>Yarn & crochet calculators</h1><p>Use these estimates to plan your project, then make a swatch before committing to a full piece.</p><CalculatorSuite/></section>}
