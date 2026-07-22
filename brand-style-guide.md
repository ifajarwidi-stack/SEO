# Bank Jago - Brand Style Guide for Digital Reports

## 1. Brand Identity

**Brand Name:** Bank Jago  
**Industry:** Digital Banking / Financial Services  
**Brand Personality:** Modern, accessible, trustworthy, dynamic

---

## 2. Color Palette

### Primary Colors

| Color Name | Hex Code | RGB | Usage | Notes |
|------------|----------|-----|-------|-------|
| **Hero Gold** | `#FFAC00` | RGB(255, 172, 0) | Primary CTA, KPI highlights, key metrics | Warm, energetic, premium feel |
| **Dark Brown** | `#352625` | RGB(53, 38, 37) | Text, headers, backgrounds | Strong, grounded, professional |
| **Everyday White** | `#F8F1E8` | RGB(248, 241, 232) | Light backgrounds, card surfaces | Soft white, not harsh |

### Secondary Color

| Color Name | Hex Code | RGB | Usage | Notes |
|------------|----------|-----|-------|-------|
| **Modern Purple** | `#9D31F0` | RGB(157, 49, 240) | Accent, interactive elements, charts | Contemporary, draws attention |

### Neutrals & Utility

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Text Primary** | `#352625` (Dark Brown) | Body text, labels |
| **Text Secondary** | `#6B5D5C` | Subtle text, metadata |
| **Border** | `#E5DED7` | Dividers, subtle separation |
| **Background Light** | `#F8F1E8` (Everyday White) | Page background, cards |
| **Background Dark** | `#2A1F1E` | Dark mode background |

---

## 3. Color Hierarchy in Dashboards

### Primary Color Usage - Hero Gold (#FFAC00)

**When to use Hero Gold:**
- 🔴 Critical KPIs & metrics (Domain Rating, referring domains count)
- 🔴 Primary call-to-action buttons
- 🔴 Important chart values & highlights
- 🔴 Section headers emphasis
- 🔴 Progress indicators (positive growth)

**Examples:**
- Domain Rating value: `#FFAC00` text on white background
- Growth indicators: Gold color for +X% changes
- Primary stat tiles: Gold border/accent
- CTA buttons: Gold background with Dark Brown text

### Secondary Color Usage - Modern Purple (#9D31F0)

**When to use Purple:**
- 📊 Line charts & trend visualizations
- 📊 Secondary metrics comparison
- 📊 Sidebar navigation accents
- 📊 Secondary buttons & interactions
- 📊 Data points in multi-series charts

**Examples:**
- Domain Rating trend line: Purple stroke
- Alternate chart series: Purple color
- Hover states: Purple highlight
- Secondary CTAs: Purple outline

### Dark Brown Usage - #352625

**When to use Dark Brown:**
- ✍️ All body text
- ✍️ Headers (H1-H6)
- ✍️ Labels & annotations
- ✍️ Dark mode backgrounds
- ✍️ Professional table headers

---

## 4. Logo Specifications

### Logo Placement

**Header Section:**
```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO 80-100px]  Bank Jago - SEO Monthly Report           │
│                   June 2026                                 │
└─────────────────────────────────────────────────────────────┘
```

### Sizing Guidelines

| Context | Size | File Format |
|---------|------|-------------|
| Dashboard header | 80-100px height | PNG / SVG |
| Favicon | 32px × 32px | PNG / ICO |
| Social share | 1200×630px | PNG / JPG |
| Print (if needed) | Minimum 1 inch | Vector (EPS/PDF) |

### Spacing & Clearance

- **Minimum clearance around logo:** 10px (don't crowd with text)
- **Logo to title spacing:** 15-20px horizontal gap
- **Logo to content spacing:** 20px vertical gap below header

### Logo Files Needed

**Current Status:**
- [ ] Logo SVG file (vector, scalable)
- [ ] Logo PNG file (80px, 100px, high-res)
- [ ] Logo favicon (32px × 32px)

---

## 5. Typography

### Font Stack

**Recommended:**
```
Primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
Fallback: system fonts (ensures readability)
```

### Text Sizes & Weights

| Element | Size | Weight | Color | Usage |
|---------|------|--------|-------|-------|
| **H1 (Page Title)** | 32px | 700 Bold | Dark Brown | Report title |
| **H2 (Section)** | 24px | 700 Bold | Dark Brown | Major sections |
| **H3 (Subsection)** | 18px | 600 Semi | Dark Brown | Subsections |
| **Body Text** | 14px | 400 Regular | Dark Brown | Content |
| **Label/Small** | 12px | 500 Medium | Text Secondary | Metadata, labels |
| **KPI Value** | 36px | 700 Bold | Hero Gold | Large metrics |

---

## 6. Dashboard Layout Grid

### Header Section (Full Width)
```
Height: 120px
Background: Everyday White (#F8F1E8)
Border-bottom: 1px solid #E5DED7
Content:
  - Logo (80-100px) on left
  - Title + Subtitle centered/right
  - Theme toggle (top right)
```

### Navigation Sidebar
```
Width: 220px (collapsible)
Background: Everyday White
Active link color: Hero Gold
Hover state: Light gold background
Section dividers: Border #E5DED7
```

### Main Content Area
```
Max-width: 1200px
Padding: 30px
Gap between sections: 40px
Card background: White with subtle shadow
Card border: None (use shadow for elevation)
```

### Chart Containers
```
Aspect ratio: 16:9 or 4:3
Background: Everyday White
Border radius: 8px
Shadow: subtle elevation (0 1px 3px rgba(0,0,0,0.1))
Line charts: Use Hero Gold + Purple
Bar charts: Hero Gold for primary metric
Accent lines/markers: Purple
```

---

## 7. Interactive Elements

### Buttons

**Primary Button (CTA):**
- Background: Hero Gold (#FFAC00)
- Text: Dark Brown (#352625), 14px, 600 Semi Bold
- Padding: 12px 24px
- Border radius: 6px
- Hover: Darken gold by 10%
- Active: Darken gold by 15%

**Secondary Button:**
- Background: Transparent
- Border: 2px solid Hero Gold
- Text: Dark Brown, 14px, 600 Semi Bold
- Hover: Gold background with transparency

**Tertiary Button:**
- Background: Transparent
- Border: 1px solid #E5DED7
- Text: Dark Brown
- Hover: Border color → Purple

### Links

**Standard Link:**
- Color: Hero Gold
- Underline: None (on hover: underline)
- Font-weight: 500
- Hover: Purple color

---

## 8. Data Visualization Rules

### Chart Color Palette (for multi-series data)

**Recommended order for categorical data:**

| Series | Color | Hex | Usage |
|--------|-------|-----|-------|
| 1 | Hero Gold | #FFAC00 | Primary metric |
| 2 | Modern Purple | #9D31F0 | Secondary metric |
| 3 | Dark Brown | #352625 | Tertiary metric |
| 4 | Teal | #0D9488 | Fourth metric (if needed) |
| 5 | Coral | #F97316 | Fifth metric (if needed) |

### Line Charts

- **Primary line:** Hero Gold, 2-3px stroke
- **Secondary line:** Modern Purple, 2-3px stroke
- **Grid lines:** #E5DED7, 1px, subtle
- **Data points:** Filled circles, match line color

### Bar Charts

- **Main bars:** Hero Gold
- **Comparison bars:** Modern Purple or teal
- **Value labels:** Dark Brown text, inside/outside bars
- **Background grid:** None or very subtle

### Heatmaps / Status Indicators

- **Positive (↑):** Hero Gold
- **Negative (↓):** Coral / Warning orange
- **Neutral:** Gray / Light border
- **Alert:** Red (separate from primary palette)

---

## 9. Light Mode vs Dark Mode

### Light Mode (Default)

| Element | Light Mode | Code |
|---------|-----------|------|
| Page background | Everyday White | #F8F1E8 |
| Text primary | Dark Brown | #352625 |
| Card background | White | #FFFFFF |
| Borders | Light Gray | #E5DED7 |
| Primary accent | Hero Gold | #FFAC00 |
| Secondary accent | Purple | #9D31F0 |

### Dark Mode

| Element | Dark Mode | Code |
|---------|----------|------|
| Page background | Very Dark Brown | #1A1412 |
| Text primary | Off-white | #E8E1D8 |
| Card background | Dark Brown | #2A1F1E |
| Borders | Dark Gray | #3D2E2D |
| Primary accent | Bright Gold | #FFD700 (adjusted for contrast) |
| Secondary accent | Purple | #9D31F0 (lightened if needed) |

---

## 10. CSS Custom Properties (Variables)

For easy implementation and maintenance:

```css
:root {
  /* Brand Colors */
  --brand-gold: #FFAC00;
  --brand-purple: #9D31F0;
  --brand-brown: #352625;
  --brand-white: #F8F1E8;
  --brand-brown-dark: #2A1F1E;
  
  /* Neutrals */
  --text-primary: #352625;
  --text-secondary: #6B5D5C;
  --border-color: #E5DED7;
  --bg-light: #F8F1E8;
  --bg-white: #FFFFFF;
  
  /* Utilities */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Typography */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-light: #1A1412;
    --bg-white: #2A1F1E;
    --text-primary: #E8E1D8;
    --text-secondary: #A69D9A;
    --border-color: #3D2E2D;
  }
}
```

---

## 11. Implementation Checklist

### For HTML Dashboard Update

- [ ] Add Bank Jago logo to header (80-100px)
- [ ] Update primary color scheme to gold + purple
- [ ] Apply CSS custom properties for all colors
- [ ] Update chart colors (line: gold, accent: purple)
- [ ] Adjust KPI tiles background/text colors
- [ ] Add proper spacing/clearance around logo
- [ ] Test dark mode color contrast
- [ ] Update favicon with Jago branding
- [ ] Verify WCAG AA accessibility (color contrast ratio ≥ 4.5:1)
- [ ] Test on mobile (80-100px logo should be responsive)

### For Markdown Template Update

- [ ] Add color codes to brand reference section
- [ ] Include color palette examples
- [ ] Document usage guidelines

### For Future Reports

- [ ] All new dashboards should follow this guide
- [ ] Maintain consistent logo placement
- [ ] Use CSS variables for easy theme switching
- [ ] Document any deviations from this guide

---

## 12. Files & Resources

**Current Status:**

| File | Location | Status |
|------|----------|--------|
| Color Palette Image | Provided by user | ✅ Received |
| Logo PNG/SVG | Needed | ⏳ Request |
| HTML Dashboard | `/tmp/claude-0/.../jago-june-2026.html` | 🔄 To be updated |
| Markdown Tracking | `/home/user/SEO/ahrefs-jago-data.md` | ✅ Created |
| Style Guide | This file | ✅ Created |

---

## 13. Contact & Maintenance

**Last Updated:** July 2026  
**Next Review:** August 2026  
**Owner:** SEO/Content Team  
**Stakeholders:** Brand, Design, Content

---

## Quick Reference - Primary Use Cases

### ✅ Use Hero Gold (#FFAC00) For:
- Domain Rating increase/decrease values
- Referring domains count highlight
- Top keyword metrics
- Primary CTA buttons
- Section emphasis headers

### ✅ Use Modern Purple (#9D31F0) For:
- Domain Rating trend line chart
- Secondary metrics comparison
- Interactive hover states
- Alternative data series
- Secondary action buttons

### ✅ Use Dark Brown (#352625) For:
- All body text and labels
- Main section headers
- Table headers and captions
- Navigation items
- Professional text elements

### ✅ Use Everyday White (#F8F1E8) For:
- Page and card backgrounds
- Light surfaces
- Section dividers
- Clean spacing areas

---

**Version:** 1.0  
**Status:** Active  
**Created:** July 2026
