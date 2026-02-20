'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================
// Financial constants — edit these to update all calculations
// ============================================

const FINANCIAL_CONSTANTS = {
  outstandingShares: 250_000_000,
  currentSharePrice: 7.77,
  regARaiseTarget: 75_000_000,
  baselineROAS: 5,
  companyValuation: 2_000_000_000,
  ceoSharePriceEstimateLow: 60,
  ceoSharePriceEstimateHigh: 100,
  ipoTimeline: 'Q3 2025',
  regATimeline: '< 12 months',
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const

// ============================================
// Number formatting
// ============================================

function formatCurrency(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatShares(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value))
}

function formatMultiplier(value: number): string {
  return `${value.toFixed(1)}x`
}

// ============================================
// Premium Slider component
// ============================================

interface SliderProps {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  formatValue: (value: number) => string
  labelLeft?: string
  labelRight?: string
}

function PremiumSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  labelLeft,
  labelRight,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value))
    },
    [onChange]
  )

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-text-secondary">
          {label}
        </span>
        <span className="font-mono text-lg font-semibold text-text-primary">
          {formatValue(value)}
        </span>
      </div>

      <div className="relative">
        {/* Track background */}
        <div className="pointer-events-none absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-border-default" />

        {/* Active fill */}
        <div
          className="pointer-events-none absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
          style={{
            width: `${percentage}%`,
            background:
              'linear-gradient(90deg, var(--color-accent-blue), rgba(0, 102, 255, 0.7))',
          }}
        />

        {/* Native range input — fully styled */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="slider-input relative z-10 h-5 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>

      {(labelLeft || labelRight) && (
        <div className="flex justify-between">
          {labelLeft && (
            <span className="font-mono text-[10px] text-text-tertiary">
              {labelLeft}
            </span>
          )}
          {labelRight && (
            <span className="font-mono text-[10px] text-text-tertiary">
              {labelRight}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================
// Metric Card component
// ============================================

interface MetricCardProps {
  label: string
  value: string
  highlight?: boolean
  accent?: boolean
}

function MetricCard({ label, value, highlight, accent }: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-all duration-300 md:p-5',
        highlight
          ? 'border-accent-blue/30 bg-accent-blue/[0.04]'
          : 'border-border-subtle bg-white/[0.015]'
      )}
      style={
        highlight
          ? { boxShadow: '0 0 20px rgba(0, 102, 255, 0.08)' }
          : undefined
      }
    >
      <div
        className={cn(
          'font-mono text-xl font-semibold md:text-2xl',
          accent ? 'text-accent-blue' : 'text-text-primary'
        )}
        style={
          accent
            ? { textShadow: '0 0 24px rgba(0, 102, 255, 0.25)' }
            : undefined
        }
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
        {label}
      </div>
    </div>
  )
}

// ============================================
// Comparison Bar Chart
// ============================================

function ComparisonChart({
  baseline,
  optimized,
  savings,
  feeAmount,
}: {
  baseline: number
  optimized: number
  savings: number
  feeAmount: number
}) {
  const maxVal = baseline
  const optimizedPct = (optimized / maxVal) * 100
  const savingsPct = (savings / maxVal) * 100
  const feePct = (feeAmount / maxVal) * 100
  const netSavingsPct = savingsPct - feePct

  return (
    <div className="mt-8 space-y-6">
      <div className="font-mono text-xs uppercase tracking-[0.12em] text-text-secondary">
        Ad Spend Comparison
      </div>

      {/* Baseline bar */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
            Baseline (5x ROAS)
          </span>
          <span className="font-mono text-xs text-text-secondary">
            {formatCurrency(baseline, true)}
          </span>
        </div>
        <div className="h-8 w-full overflow-hidden rounded-md bg-border-subtle">
          <motion.div
            className="h-full rounded-md bg-text-tertiary/30"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          />
        </div>
      </div>

      {/* Optimized bar */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
            Optimized Ad Spend
          </span>
          <span className="font-mono text-xs text-text-secondary">
            {formatCurrency(optimized, true)}
          </span>
        </div>
        <div className="relative h-8 w-full overflow-hidden rounded-md bg-border-subtle">
          {/* Optimized spend portion */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-l-md bg-text-tertiary/30"
            animate={{ width: `${optimizedPct}%` }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          />
          {/* Net savings */}
          <motion.div
            className="absolute inset-y-0 rounded-r-md"
            style={{ backgroundColor: 'rgba(0, 102, 255, 0.2)' }}
            animate={{
              left: `${optimizedPct}%`,
              width: `${netSavingsPct}%`,
            }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          />
          {/* Fee portion */}
          {feePct > 0.5 && (
            <motion.div
              className="absolute inset-y-0 rounded-r-md"
              style={{ backgroundColor: 'rgba(0, 102, 255, 0.4)' }}
              animate={{
                left: `${optimizedPct + netSavingsPct}%`,
                width: `${feePct}%`,
              }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            />
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-sm bg-text-tertiary/30" />
          <span className="font-mono text-[10px] text-text-tertiary">
            Ad Spend
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: 'rgba(0, 102, 255, 0.2)' }}
          />
          <span className="font-mono text-[10px] text-text-tertiary">
            Net Savings
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: 'rgba(0, 102, 255, 0.4)' }}
          />
          <span className="font-mono text-[10px] text-text-tertiary">
            SM Performance Fee
          </span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// TAB 1: Reg A+ Performance Calculator
// ============================================

function RegATab() {
  const [roas, setRoas] = useState(8)
  const [investment, setInvestment] = useState(250_000)
  const [feePercent, setFeePercent] = useState(15)

  const calcs = useMemo(() => {
    const { regARaiseTarget, baselineROAS, currentSharePrice } =
      FINANCIAL_CONSTANTS

    const baselineAdSpend = regARaiseTarget / baselineROAS
    const optimizedAdSpend = regARaiseTarget / roas
    const totalSavings = baselineAdSpend - optimizedAdSpend
    const sharesPreserved = totalSavings / currentSharePrice
    const equityValuePreserved = sharesPreserved * currentSharePrice
    const performanceFee = totalSavings * (feePercent / 100)
    const netSavings = totalSavings - performanceFee
    const roiOnInvestment = netSavings / investment

    return {
      baselineAdSpend,
      optimizedAdSpend,
      totalSavings,
      sharesPreserved,
      equityValuePreserved,
      performanceFee,
      netSavings,
      roiOnInvestment,
    }
  }, [roas, investment, feePercent])

  return (
    <div className="space-y-8">
      {/* Sliders */}
      <div className="space-y-7">
        <PremiumSlider
          label="ROAS Target"
          min={5}
          max={12}
          step={0.5}
          value={roas}
          onChange={setRoas}
          formatValue={formatMultiplier}
          labelLeft="5x Baseline (DealMaker Forecast)"
          labelRight="12x"
        />

        <PremiumSlider
          label="Investment in Sovereign Media Services"
          min={100_000}
          max={500_000}
          step={25_000}
          value={investment}
          onChange={setInvestment}
          formatValue={(v) => formatCurrency(v)}
          labelLeft="$100K"
          labelRight="$500K"
        />

        <PremiumSlider
          label="Sovereign Media Performance Fee (% of Savings Above Baseline)"
          min={5}
          max={30}
          step={1}
          value={feePercent}
          onChange={setFeePercent}
          formatValue={(v) => `${v}%`}
          labelLeft="5%"
          labelRight="30%"
        />
      </div>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-border-default) 15%, var(--color-border-default) 85%, transparent)',
        }}
      />

      {/* Metric cards grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <MetricCard
          label="Baseline Ad Spend (5x)"
          value={formatCurrency(calcs.baselineAdSpend, true)}
        />
        <MetricCard
          label={`Optimized Ad Spend (${formatMultiplier(roas)})`}
          value={formatCurrency(calcs.optimizedAdSpend, true)}
        />
        <MetricCard
          label="Total Ad Spend Savings"
          value={formatCurrency(calcs.totalSavings, true)}
        />
        <MetricCard
          label="Shares Preserved by Frontieras"
          value={formatShares(calcs.sharesPreserved)}
          highlight
          accent
        />
        <MetricCard
          label="Equity Value Preserved"
          value={formatCurrency(calcs.equityValuePreserved, true)}
        />
        <MetricCard
          label="SM Performance Fee"
          value={formatCurrency(calcs.performanceFee, true)}
        />
        <MetricCard
          label="Net Savings to Frontieras"
          value={formatCurrency(calcs.netSavings, true)}
        />
        <MetricCard
          label="ROI on SM Investment"
          value={formatMultiplier(calcs.roiOnInvestment)}
          highlight
          accent
        />
      </div>

      {/* Bar chart */}
      <ComparisonChart
        baseline={calcs.baselineAdSpend}
        optimized={calcs.optimizedAdSpend}
        savings={calcs.totalSavings}
        feeAmount={calcs.performanceFee}
      />

      {/* Disclaimer */}
      <p className="mt-6 text-xs italic text-text-tertiary">
        Projections are based on baseline ROAS estimates provided by DealMaker.
        Actual campaign performance may vary. This model is intended for
        strategic planning purposes.
      </p>
    </div>
  )
}

// ============================================
// TAB 2: IPO Impact — Scenario Modeling
// ============================================

const SCENARIOS = [
  {
    name: 'Conservative',
    impact: 1,
    frame: 'Modest brand awareness improvement',
  },
  {
    name: 'Base Case',
    impact: 3,
    frame: 'Strong marketing execution with institutional visibility',
    featured: true,
  },
  {
    name: 'Aggressive',
    impact: 5,
    frame: 'Premium brand positioning with sustained investor demand',
  },
]

function IpoTab() {
  const [priceImpact, setPriceImpact] = useState(3)
  const [smInvestment, setSmInvestment] = useState(250_000)

  const calcs = useMemo(() => {
    const {
      outstandingShares,
      currentSharePrice,
      ceoSharePriceEstimateLow,
      ceoSharePriceEstimateHigh,
    } = FINANCIAL_CONSTANTS

    const marketCapImpact = priceImpact * outstandingShares
    const valuePerDollar = marketCapImpact / smInvestment

    return {
      currentSharePrice,
      ceoRangeLow: ceoSharePriceEstimateLow,
      ceoRangeHigh: ceoSharePriceEstimateHigh,
      priceImpact,
      marketCapImpact,
      valuePerDollar,
    }
  }, [priceImpact, smInvestment])

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div>
        <h3 className="font-display text-xl font-semibold text-text-primary md:text-2xl">
          Post-IPO Value Creation Scenarios
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Modeling the impact of strategic marketing investment on shareholder
          value
        </p>
      </div>

      {/* Sliders */}
      <div className="space-y-7">
        <PremiumSlider
          label="Estimated Share Price Impact from Marketing & Brand Positioning"
          min={0}
          max={10}
          step={0.5}
          value={priceImpact}
          onChange={setPriceImpact}
          formatValue={(v) => `+$${v.toFixed(2)}`}
          labelLeft="$0"
          labelRight="$10"
        />

        <p className="text-xs text-text-tertiary">
          Even a modest $1–2 increase in share price across 250M shares creates
          significant value
        </p>

        <PremiumSlider
          label="Sovereign Media Investment"
          min={100_000}
          max={500_000}
          step={25_000}
          value={smInvestment}
          onChange={setSmInvestment}
          formatValue={(v) => formatCurrency(v)}
          labelLeft="$100K"
          labelRight="$500K"
        />
      </div>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-border-default) 15%, var(--color-border-default) 85%, transparent)',
        }}
      />

      {/* Calculated outputs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <MetricCard
          label="Current Share Price"
          value={`$${calcs.currentSharePrice.toFixed(2)}`}
        />
        <MetricCard
          label="CEO Target Range"
          value={`$${calcs.ceoRangeLow} – $${calcs.ceoRangeHigh}`}
        />
        <MetricCard
          label="Marketing-Attributed Price Impact"
          value={`+$${calcs.priceImpact.toFixed(2)}/share`}
          accent
        />
        <MetricCard
          label="Market Cap Impact"
          value={formatCurrency(calcs.marketCapImpact, true)}
          highlight
          accent
        />
      </div>

      {/* Value ratio */}
      <div
        className="rounded-lg border border-accent-blue/20 bg-accent-blue/[0.03] px-5 py-4"
        style={{ boxShadow: '0 0 24px rgba(0, 102, 255, 0.05)' }}
      >
        <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
          Value Creation Ratio
        </span>
        <div className="mt-1 font-mono text-xl font-semibold text-accent-blue md:text-2xl">
          For every $1 invested → ${Math.round(calcs.valuePerDollar).toLocaleString()} in potential shareholder value
        </div>
      </div>

      {/* Scenario cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {SCENARIOS.map((scenario) => {
          const capImpact =
            scenario.impact * FINANCIAL_CONSTANTS.outstandingShares
          return (
            <div
              key={scenario.name}
              className={cn(
                'rounded-lg border p-5 transition-all duration-300',
                scenario.featured
                  ? 'border-accent-blue/30 bg-accent-blue/[0.04]'
                  : 'border-border-subtle bg-white/[0.015]'
              )}
              style={
                scenario.featured
                  ? { boxShadow: '0 0 20px rgba(0, 102, 255, 0.06)' }
                  : undefined
              }
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
                {scenario.name}
              </span>
              <div className="mt-3 font-mono text-lg font-semibold text-text-primary">
                +${scenario.impact.toFixed(2)}/share
              </div>
              <div
                className="mt-1 font-mono text-xl font-semibold text-accent-blue"
                style={{
                  textShadow: '0 0 20px rgba(0, 102, 255, 0.2)',
                }}
              >
                +{formatCurrency(capImpact, true)}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                {scenario.frame}
              </p>
            </div>
          )
        })}
      </div>

      {/* Reg A+ connection callout */}
      <div
        className="rounded-lg border-l-2 border-accent-blue/40 bg-white/[0.015] px-5 py-4"
      >
        <p className="text-sm leading-relaxed text-text-secondary">
          Reg A+ raise performance directly impacts IPO positioning. Higher ROAS
          during the Reg A+ preserves more equity and demonstrates capital
          efficiency to institutional investors — both of which support higher
          post-IPO valuations.
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs italic text-text-tertiary">
        Post-IPO share price projections are speculative scenario models based on
        management estimates. Actual stock performance is subject to market
        conditions, regulatory factors, and company execution. This is not
        financial advice.
      </p>
    </div>
  )
}

// ============================================
// Main Calculator Component
// ============================================

type TabId = 'reg-a' | 'ipo'

export function RegACalculator() {
  const [activeTab, setActiveTab] = useState<TabId>('reg-a')

  return (
    <div>
      {/* Tab toggle */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-full border border-border-default bg-white/[0.02] p-1">
          {[
            { id: 'reg-a' as TabId, label: 'Reg A+ Performance' },
            { id: 'ipo' as TabId, label: 'IPO Impact' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative rounded-full px-5 py-2.5 font-mono text-xs tracking-wider transition-all duration-300',
                activeTab === tab.id
                  ? 'text-text-primary'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full border border-border-hover bg-white/[0.06]"
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'reg-a' && (
          <motion.div
            key="reg-a"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            <RegATab />
          </motion.div>
        )}
        {activeTab === 'ipo' && (
          <motion.div
            key="ipo"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            <IpoTab />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
