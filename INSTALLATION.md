# PhishGuard Installation Guide

## Quick Start

1. **Download the Extension**
   - Download all files from this repository
   - Keep them in a folder named "PhishGuard"

2. **Install in Chrome/Edge**
   - Open Chrome or Edge browser
   - Go to `chrome://extensions/` (or `edge://extensions/`)
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the PhishGuard folder
   - The extension will appear in your extensions list

3. **Install in Firefox**
   - Open Firefox browser
   - Go to `about:debugging`
   - Click "This Firefox" in the left sidebar
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the PhishGuard folder

4. **Create Icons (Optional)**
   - Open `create_icons.html` in your browser
   - Right-click each icon and save as PNG
   - Place them in the `icons/` folder with names:
     - `icon16.png`
     - `icon32.png`
     - `icon48.png`
     - `icon128.png`

## Testing the Extension

1. **Test Phishing Detection**
   - Visit: `http://paypal-security.tk`
   - Visit: `http://amazon-verify.ml`
   - Visit: `http://facebook-login.ga`

2. **Test Safe Sites**
   - Visit: `https://www.google.com`
   - Visit: `https://www.github.com`
   - Visit: `https://www.wikipedia.org`

3. **Check Popup Interface**
   - Click the PhishGuard icon in your browser toolbar
   - Verify all features work correctly

## Troubleshooting

### Extension Not Loading
- Make sure all files are in the same folder
- Check that `manifest.json` is valid
- Try refreshing the extensions page

### Icons Not Showing
- Create icons using `create_icons.html`
- Ensure icon files are in the `icons/` folder
- Check file names match exactly

### Detection Not Working
- Check browser console for errors
- Verify extension has necessary permissions
- Try reloading the extension

## Features to Test

- ✅ URL analysis on page load
- ✅ Link scanning and warnings
- ✅ Form submission protection
- ✅ Popup interface functionality
- ✅ Settings persistence
- ✅ User reporting system
- ✅ Statistics tracking

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all files are present
3. Try reinstalling the extension
4. Check browser compatibility

---

**Your browser is now protected against phishing attacks!** 🛡️
