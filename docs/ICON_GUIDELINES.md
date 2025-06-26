# 🎨 Plugin Icon Guidelines

## 📏 Technical Specifications

### File Format Requirements

| Format   | Max Size | Recommended        | Notes                                    |
| -------- | -------- | ------------------ | ---------------------------------------- |
| **SVG**  | 10KB     | ✅ **Preferred**   | Vector format, scalable, small file size |
| **PNG**  | 20KB     | ✅ Acceptable      | Must have transparent background         |
| **JPEG** | 15KB     | ⚠️ Not recommended | No transparency support                  |

### Dimensions

```
Recommended sizes: 24×24px, 32×32px, 48×48px, 64×64px
Minimum size: 16×16px
Maximum size: 128×128px
Aspect ratio: 1:1 (square)
```

### SVG Specific Requirements

- ✅ No external dependencies
- ✅ No JavaScript code
- ✅ Optimized paths and shapes
- ✅ Self-contained (all styles inline)
- ❌ No `<script>` tags
- ❌ No external `href` references

## 🎯 Design Guidelines

### Visual Style

- **Simple & Clear**: Icon should be recognizable at 24×24px
- **High Contrast**: Use sufficient contrast for accessibility
- **Consistent Style**: Follow your brand guidelines
- **Universal Design**: Avoid cultural-specific symbols

### Color Recommendations

```css
/* Brand Colors */
Primary: Your brand's main color
Secondary: Complementary color (optional)
Background: Transparent or solid color

/* Accessibility */
Contrast ratio: Minimum 3:1 against background
Text readability: Consider colorblind users
```

### Best Practices

1. **Test at Small Sizes**: Verify clarity at 16×16px
2. **Use Transparency**: PNG/SVG with transparent background
3. **Optimize File Size**: Remove unnecessary elements
4. **Brand Consistency**: Align with your plugin's identity

## 🚫 Common Issues & Solutions

### ❌ File Too Large

**Problem**: Icon exceeds size limits
**Solutions**:

- Use SVG instead of PNG/JPEG
- Optimize with [SVGO](https://github.com/svg/svgo)
- Simplify complex shapes
- Remove unnecessary elements

### ❌ Wrong Dimensions

**Problem**: Non-square or outside size range
**Solutions**:

```bash
# Resize to 32×32px
convert icon.png -resize 32x32 icon_resized.png

# Check dimensions
identify icon.png
```

### ❌ No Transparency

**Problem**: White/colored background instead of transparent
**Solutions**:

- Use PNG-24 with alpha channel
- Remove background in image editor
- Use SVG with no background fill

### ❌ SVG Contains Scripts

**Problem**: Security risk from JavaScript in SVG
**Solutions**:

- Remove all `<script>` tags
- Use static SVG elements only
- Validate with our CI checks

## 🔧 Optimization Tools

### SVG Optimization

```bash
# Install SVGO
npm install -g svgo

# Optimize SVG
svgo input.svg -o output.svg

# Custom optimization
svgo --config svgo.config.js input.svg
```

### PNG Compression

```bash
# Using ImageMagick
convert input.png -strip -quality 85 output.png

# Using pngquant
pngquant --quality=65-80 input.png
```

## 📊 Validation Process

### Automated Checks

Our CI automatically validates:

- File format and size
- Dimensions and aspect ratio
- SVG security (no scripts)
- PNG transparency
- Overall file optimization

### Manual Review

Design team reviews for:

- Visual clarity at small sizes
- Brand appropriateness
- Accessibility compliance
- Style consistency

## 🎯 Examples

### ✅ Good Examples

```svg
<!-- Simple, clean SVG -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="18" height="18" rx="3" fill="#3b82f6"/>
  <path d="M12 7v10m-5-5h10" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
```

### ❌ Avoid These

```svg
<!-- Too complex, large file size -->
<svg width="24" height="24">
  <defs>
    <linearGradient id="grad1">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <script>alert('Not allowed!');</script>
  <!-- Too many complex paths... -->
</svg>
```

## 🔄 Submission Process

1. **Create Icon**: Follow specifications above
2. **Validate Locally**: Test your icon at different sizes
3. **Submit PR**: Include icon.svg/png in your plugin directory
4. **Automated Validation**: Our CI checks your icon
5. **Review Feedback**: Address any suggestions from the validation
6. **Approval**: Icon approved and deployed to CDN

## 💡 Getting Help

- **Design Questions**: Open an issue with `icon-design` label
- **Technical Issues**: Check our [troubleshooting guide](./TROUBLESHOOTING.md)
- **Examples**: Browse existing plugins for inspiration

---

_Need help creating your icon? Consider using tools like [Figma](https://figma.com), [Canva](https://canva.com), or [SVG-Edit](https://svg-edit.github.io/svgedit/) for design._
