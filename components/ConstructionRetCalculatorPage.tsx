import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import Tooltip from './Tooltip';
import { InformationCircleIcon } from './icons/InformationCircleIcon';


interface ConstructionRetCalculatorPageProps {
  onBack: () => void;
}

interface FormData {
    projectType: 'Residential' | 'Commercial' | 'Industrial';
    location: 'Delhi' | 'Mumbai' | 'Bangalore' | 'Other';
    builtUpArea: number;
    areaUnit: 'sq.ft' | 'sq.m';
    floors: number;
    foundationType: 'RCC' | 'Pile';
    wallType: 'Brick' | 'AAC Block';
    roofingType: 'Slab' | 'Truss';
    flooringType: 'Tiles' | 'Marble' | 'Granite';
    finishing: 'Economy' | 'Standard' | 'Premium';
    contractorProfit: number;
    overhead: number;
    gst: number;
    contingencies: number;
    saleValue: number;
}

interface BoQItem {
    item: string;
    quantity: string;
    rate: string;
    unit: string;
    amount: number;
}

interface CalculationResult {
    totalCost: number;
    costPerSqUnit: number;
    materialCost: number;
    laborCost: number;
    overheadCost: number;
    contractorProfitAmount: number;
    gstAmount: number;
    contingenciesAmount: number;
    totalProfit: number;
    roi: number;
    boq: BoQItem[];
}


const mockRates = {
    // Per unit in INR
    components: {
        foundation: { 'RCC': 4500, 'Pile': 6000 }, // per cubic meter
        wall: { 'Brick': 2500, 'AAC Block': 3000 }, // per cubic meter
        roofing: { 'Slab': 5000, 'Truss': 3500 }, // per square meter of roof area
        flooring: { 'Tiles': 1200, 'Marble': 2500, 'Granite': 3000 }, // per square meter
        finishing: { 'Economy': 500, 'Standard': 800, 'Premium': 1500 }, // per square meter
    },
    laborFactor: 0.35, // Labor cost as a percentage of material cost
    locationMultiplier: {
        'Delhi': 1.1,
        'Mumbai': 1.25,
        'Bangalore': 1.15,
        'Other': 1.0,
    }
};

const ConstructionRetCalculatorPage: React.FC<ConstructionRetCalculatorPageProps> = ({ onBack }) => {
    const [formData, setFormData] = useState<FormData>({
        projectType: 'Residential',
        location: 'Mumbai',
        builtUpArea: 1500,
        areaUnit: 'sq.ft',
        floors: 1,
        foundationType: 'RCC',
        wallType: 'Brick',
        roofingType: 'Slab',
        flooringType: 'Tiles',
        finishing: 'Standard',
        contractorProfit: 10,
        overhead: 15,
        gst: 18,
        contingencies: 5,
        saleValue: 9000000,
    });
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openSection, setOpenSection] = useState('project');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        setTimeout(() => {
            const { builtUpArea, areaUnit, floors, foundationType, wallType, roofingType, flooringType, finishing, location, overhead, contractorProfit, contingencies, gst, saleValue } = formData;
            const areaInSqm = areaUnit === 'sq.ft' ? builtUpArea * 0.092903 : builtUpArea;
            const groundAreaSqm = areaInSqm / floors;
            
            // 1. Calculate Quantities (Illustrative Thumb Rules)
            const foundationVolumeCbm = groundAreaSqm * 0.4; // Assuming 0.4m depth avg
            const wallVolumeCbm = areaInSqm * 0.3; // Assuming 0.3 cbm wall per sqm of BUA
            const roofAreaSqm = groundAreaSqm;
            const flooringAreaSqm = areaInSqm;
            const finishingAreaSqm = areaInSqm * 3; // Approx. for walls and ceilings

            // 2. Calculate Component Costs
            const locationMod = mockRates.locationMultiplier[location];
            const foundationRate = mockRates.components.foundation[foundationType] * locationMod;
            const wallRate = mockRates.components.wall[wallType] * locationMod;
            const roofingRate = mockRates.components.roofing[roofingType] * locationMod;
            const flooringRate = mockRates.components.flooring[flooringType] * locationMod;
            const finishingRate = mockRates.components.finishing[finishing] * locationMod;
            
            const foundationCost = foundationVolumeCbm * foundationRate;
            const wallCost = wallVolumeCbm * wallRate;
            const roofingCost = roofAreaSqm * roofingRate;
            const flooringCost = flooringAreaSqm * flooringRate;
            const finishingCost = finishingAreaSqm * finishingRate;

            const materialCost = foundationCost + wallCost + roofingCost + flooringCost + finishingCost;
            const laborCost = materialCost * mockRates.laborFactor;

            const boq: BoQItem[] = [
                { item: 'Foundation', quantity: `${foundationVolumeCbm.toFixed(2)}`, rate: `${foundationRate.toFixed(2)}`, unit: 'cbm', amount: foundationCost },
                { item: 'Walls', quantity: `${wallVolumeCbm.toFixed(2)}`, rate: `${wallRate.toFixed(2)}`, unit: 'cbm', amount: wallCost },
                { item: 'Roofing', quantity: `${roofAreaSqm.toFixed(2)}`, rate: `${roofingRate.toFixed(2)}`, unit: 'sqm', amount: roofingCost },
                { item: 'Flooring', quantity: `${flooringAreaSqm.toFixed(2)}`, rate: `${flooringRate.toFixed(2)}`, unit: 'sqm', amount: flooringCost },
                { item: 'Finishing', quantity: `${finishingAreaSqm.toFixed(2)}`, rate: `${finishingRate.toFixed(2)}`, unit: 'sqm', amount: finishingCost },
            ];

            // 3. Calculate Total Cost Sequentially
            const subTotal1 = materialCost + laborCost;
            const overheadCost = subTotal1 * (overhead / 100);
            const subTotal2 = subTotal1 + overheadCost;
            const contractorProfitAmount = subTotal2 * (contractorProfit / 100);
            const subTotal3 = subTotal2 + contractorProfitAmount;
            const contingenciesAmount = subTotal3 * (contingencies / 100);
            const subTotal4 = subTotal3 + contingenciesAmount;
            const gstAmount = subTotal4 * (gst / 100);
            const totalCost = subTotal4 + gstAmount;

            // 4. Final Metrics
            const costPerSqUnit = totalCost / (areaUnit === 'sq.ft' ? builtUpArea : areaInSqm);
            const totalProfit = saleValue - totalCost;
            const roi = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;
            
            setResult({
                totalCost, costPerSqUnit, materialCost, laborCost, overheadCost, contractorProfitAmount, gstAmount, contingenciesAmount, totalProfit, roi, boq
            });
            setIsLoading(false);
        }, 1500);
    };

    const AccordionSection: React.FC<{ title: string; sectionId: string; children: React.ReactNode }> = ({ title, sectionId, children }) => (
        <details open={openSection === sectionId} onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) setOpenSection(sectionId); }}>
            <summary className="font-semibold text-lg cursor-pointer py-2 border-b">{title}</summary>
            <div className="p-4 space-y-4">
                {children}
            </div>
        </details>
    );

    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
    const labelClasses = "block text-sm font-medium text-black mb-1";
    
    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Construction RET Calculator (India)</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Estimate project cost & ROI using CPWD/SOR-based component rates.</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-24">
                        <form onSubmit={handleSubmit} className="space-y-1">
                            <AccordionSection title="1. Project Information" sectionId="project">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label className={labelClasses}>Project Type</label><select name="projectType" value={formData.projectType} onChange={handleInputChange} className={inputClasses}>
                                        <option>Residential</option><option>Commercial</option><option>Industrial</option>
                                    </select></div>
                                    <div><label className={labelClasses}>Location</label><select name="location" value={formData.location} onChange={handleInputChange} className={inputClasses}>
                                        <option>Delhi</option><option>Mumbai</option><option>Bangalore</option><option>Other</option>
                                    </select></div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-grow"><label className={labelClasses}>Built-up Area</label><input type="number" name="builtUpArea" value={formData.builtUpArea} onChange={handleInputChange} className={inputClasses}/></div>
                                        <select name="areaUnit" value={formData.areaUnit} onChange={handleInputChange} className={`${inputClasses} w-24`}><option>sq.ft</option><option>sq.m</option></select>
                                    </div>
                                    <div><label className={labelClasses}>No. of Floors</label><input type="number" name="floors" value={formData.floors} onChange={handleInputChange} className={inputClasses} /></div>
                                </div>
                            </AccordionSection>
                            <AccordionSection title="2. Construction Components" sectionId="components">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label className={labelClasses}>Foundation</label><select name="foundationType" value={formData.foundationType} onChange={handleInputChange} className={inputClasses}><option>RCC</option><option>Pile</option></select></div>
                                    <div><label className={labelClasses}>Wall</label><select name="wallType" value={formData.wallType} onChange={handleInputChange} className={inputClasses}><option>Brick</option><option>AAC Block</option></select></div>
                                    <div><label className={labelClasses}>Roofing</label><select name="roofingType" value={formData.roofingType} onChange={handleInputChange} className={inputClasses}><option>Slab</option><option>Truss</option></select></div>
                                    <div><label className={labelClasses}>Flooring</label><select name="flooringType" value={formData.flooringType} onChange={handleInputChange} className={inputClasses}><option>Tiles</option><option>Marble</option><option>Granite</option></select></div>
                                    <div className="md:col-span-2"><label className={labelClasses}>Finishing</label><select name="finishing" value={formData.finishing} onChange={handleInputChange} className={inputClasses}><option>Economy</option><option>Standard</option><option>Premium</option></select></div>
                                </div>
                            </AccordionSection>
                            <AccordionSection title="3. Cost Factors & ROI" sectionId="costs">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label className={labelClasses}><div className="flex items-center gap-1.5">Overheads (%) <Tooltip text="Indirect costs like office rent, salaries, and utilities, expressed as a percentage of material and labor cost."><InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer"/></Tooltip></div></label><input type="number" name="overhead" value={formData.overhead} onChange={handleInputChange} className={inputClasses} /></div>
                                    <div><label className={labelClasses}><div className="flex items-center gap-1.5">Contractor's Profit (%) <Tooltip text="The profit margin the contractor adds on top of the project's subtotal after overheads."><InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer"/></Tooltip></div></label><input type="number" name="contractorProfit" value={formData.contractorProfit} onChange={handleInputChange} className={inputClasses} /></div>
                                    <div><label className={labelClasses}><div className="flex items-center gap-1.5">Contingencies (%) <Tooltip text="A budget reserve for unforeseen costs or risks, calculated as a percentage of the subtotal."><InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer"/></Tooltip></div></label><input type="number" name="contingencies" value={formData.contingencies} onChange={handleInputChange} className={inputClasses} /></div>
                                    <div><label className={labelClasses}><div className="flex items-center gap-1.5">GST (%) <Tooltip text="Goods and Services Tax applied to the final cost before the sale."><InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer"/></Tooltip></div></label><input type="number" name="gst" value={formData.gst} onChange={handleInputChange} className={inputClasses} /></div>
                                    <div className="md:col-span-2"><label className={labelClasses}><div className="flex items-center gap-1.5">Expected Sale Value (₹) <Tooltip text="The total market price you expect to sell the completed project for."><InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer"/></Tooltip></div></label><input type="number" name="saleValue" value={formData.saleValue} onChange={handleInputChange} className={inputClasses} /></div>
                                </div>
                            </AccordionSection>
                            <div className="pt-4"><button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400">
                                {isLoading ? 'Calculating...' : 'Calculate Project Cost'}
                            </button></div>
                        </form>
                    </div>
                    <ResultsDisplay result={result} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
};

const ResultsDisplay: React.FC<{ result: CalculationResult | null, isLoading: boolean }> = ({ result, isLoading }) => {
    if (isLoading) { return <div className="bg-white p-6 rounded-lg shadow-md min-h-[500px] flex items-center justify-center">Loading...</div>; }
    if (!result) { return <div className="bg-white p-6 rounded-lg shadow-md min-h-[500px] flex items-center justify-center text-black">Your detailed project report will appear here.</div>; }
    
    const pieData = [
        { name: 'Material', value: result.materialCost, fill: '#8884d8' },
        { name: 'Labor', value: result.laborCost, fill: '#82ca9d' },
        { name: 'Overheads', value: result.overheadCost, fill: '#ffc658' },
        { name: 'Profit', value: result.contractorProfitAmount, fill: '#ff8042' },
        { name: 'Taxes & Fees', value: result.gstAmount + result.contingenciesAmount, fill: '#0088FE' },
    ];
    
    const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in space-y-6">
            <h2 className="text-2xl font-bold text-black">Project Estimation Report</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-100 p-3 rounded-lg"><p className="text-xs text-black">Total Cost</p><p className="font-bold text-lg text-blue-600">{formatCurrency(result.totalCost)}</p></div>
                <div className="bg-slate-100 p-3 rounded-lg"><p className="text-xs text-black">Cost/Sq.Unit</p><p className="font-bold text-lg text-blue-600">{formatCurrency(result.costPerSqUnit)}</p></div>
                <div className="bg-slate-100 p-3 rounded-lg"><p className="text-xs text-black">Profit</p><p className="font-bold text-lg text-green-600">{formatCurrency(result.totalProfit)}</p></div>
                <div className="bg-slate-100 p-3 rounded-lg"><p className="text-xs text-black">ROI</p><p className="font-bold text-lg text-green-600">{result.roi.toFixed(2)}%</p></div>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-black mb-2">Cost Breakdown</h3>
                <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer><PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(entry) => `${((entry.value / result.totalCost) * 100).toFixed(0)}%`}>
                            {pieData.map(entry => <Cell key={`cell-${entry.name}`} fill={entry.fill} />)}
                        </Pie>
                        <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                    </PieChart></ResponsiveContainer>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-black mb-2">Simplified Bill of Quantities (BoQ)</h3>
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100"><tr className="text-left text-black">
                            <th className="p-2">Item</th><th className="p-2 text-right">Quantity</th><th className="p-2 text-right">Rate (₹)</th><th className="p-2 text-right">Amount (₹)</th>
                        </tr></thead>
                        <tbody>
                            {result.boq.map(item => (<tr key={item.item} className="border-t">
                                <td className="p-2 font-medium text-black">{item.item}</td>
                                <td className="p-2 text-right text-black">{item.quantity} {item.unit}</td>
                                <td className="p-2 text-right text-black">{parseFloat(item.rate).toLocaleString('en-IN')}</td>
                                <td className="p-2 text-right font-semibold text-black">{formatCurrency(item.amount)}</td>
                            </tr>))}
                            <tr className="border-t bg-slate-50"><td colSpan={3} className="p-2 font-bold text-right text-black">Material & Labor Subtotal</td><td className="p-2 text-right font-bold text-black">{formatCurrency(result.materialCost + result.laborCost)}</td></tr>
                             <tr className="border-t bg-slate-50"><td colSpan={3} className="p-2 text-right text-black">Overheads, Profit, etc.</td><td className="p-2 text-right text-black">{formatCurrency(result.overheadCost + result.contractorProfitAmount + result.contingenciesAmount)}</td></tr>
                             <tr className="border-t bg-slate-50"><td colSpan={3} className="p-2 text-right text-black">GST</td><td className="p-2 text-right text-black">{formatCurrency(result.gstAmount)}</td></tr>
                            <tr className="border-t bg-slate-200"><td colSpan={3} className="p-2 font-extrabold text-right text-black">Grand Total</td><td className="p-2 text-right font-extrabold text-black">{formatCurrency(result.totalCost)}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ConstructionRetCalculatorPage;
