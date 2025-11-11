# Røde Kors PoC monorepo

***Dette er en PoC og koden er på ingen måte produksjonsklar. Den er ikke kvalitetssikret og gjennomarbeidet. Det er mye som er kommentert ut ettersom man har testet noe frem og tilbake i PoC-en. AI (i form av Cursor) har også blitt brukt mye. Så lenge funksjonaliteten i PoC har vært god nok, har man ikke brukt tid på å refaktorere nevneverdig i koden. Kun når det kommer til UI har kodestruktur vært påtenkt da mye UI har vørt gjenbrukt mellom Enonic og Sanity frontendene og trente derfor å struktureres.***

## Prosjekter

- **Frontend for Enonic innhold**
- **Frontend for Sanity innhold**
- **Sanity studio**

### Frontends

- **Next.js 14**: Med APP router
- **PostCSS**: Custom CSS with PostCSS processing

### Sanity studio
- hosted på https://rk-poc.sanity.studio/

## Getting Started

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install

2. **Run development server**:
   - `npm run dev:enonic` - Start development server for enonic frontend
   - `npm run dev:sf` - Start development server for sanity frontend
   - `npm run dev:sanity` - Start development server for sanity studio (runs on localhost:3333)
   - see package.json for other scirpts

3. **Frontends run on**:
   Navigate to [http://localhost:3000](http://localhost:3000)


