# PhishGuard API Integration Guide

## 🔗 **API Integration Overview**

PhishGuard now supports real-time URL analysis through your custom API backend. The extension sends URLs to your API and displays the results in real-time.

## 📋 **API Requirements**

### **Expected Request Format**
```json
POST /your-api-endpoint
Content-Type: application/json
Authorization: Bearer your-api-key (optional)

{
  "url": "https://example.com/suspicious-page",
  "timestamp": 1703123456789
}
```

### **Expected Response Format**
```json
{
  "isPhishing": true,
  "confidence": 0.85,
  "reasons": [
    "Suspicious domain pattern detected",
    "High risk keywords found",
    "Unusual URL structure"
  ],
  "riskScore": 0.85
}
```

### **Response Fields**
- `isPhishing` (boolean): Whether the URL is classified as phishing
- `confidence` (number, 0-1): Confidence level of the analysis
- `reasons` (string[]): Array of reasons for the classification
- `riskScore` (number, 0-1): Overall risk score (0 = safe, 1 = dangerous)

## 🚀 **Setup Instructions**

### **1. Configure API Settings**
1. Open PhishGuard extension popup
2. Scroll to "API Configuration" section
3. Enable "Enable API Analysis"
4. Enter your API endpoint URL
5. Add API key if required
6. Set timeout (default: 5000ms)
7. Click "Test Connection" to verify
8. Click "Save Config" to save settings

### **2. API Endpoint Examples**

#### **Python Flask Example**
```python
from flask import Flask, request, jsonify
import your_ml_model

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_url():
    data = request.get_json()
    url = data.get('url')
    
    # Your ML model analysis
    result = your_ml_model.predict(url)
    
    return jsonify({
        'isPhishing': result['is_phishing'],
        'confidence': result['confidence'],
        'reasons': result['reasons'],
        'riskScore': result['risk_score']
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

#### **Node.js Express Example**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { url } = req.body;
  
  // Your ML model analysis
  const result = await analyzeUrl(url);
  
  res.json({
    isPhishing: result.isPhishing,
    confidence: result.confidence,
    reasons: result.reasons,
    riskScore: result.riskScore
  });
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});
```

## 🔧 **How It Works**

### **Real-time Analysis Flow**
1. **URL Detection**: User visits a webpage
2. **API Call**: Extension sends URL to your API
3. **ML Processing**: Your backend processes the URL
4. **Result Display**: Extension shows analysis results
5. **User Action**: User can proceed or go back

### **Fallback System**
- If API is unavailable, falls back to local analysis
- If API times out, uses local detection
- Local analysis runs in parallel for reliability

## 📊 **Display Features**

### **Analysis Result Popup**
- Shows URL being analyzed
- Displays risk score with color coding
- Lists detailed reasons
- Indicates analysis source (API vs Local)
- Auto-dismisses after 10 seconds

### **Risk Score Colors**
- 🟢 **Green (0-40%)**: Low risk
- 🟡 **Yellow (40-70%)**: Medium risk  
- 🔴 **Red (70-100%)**: High risk

## 🛠️ **API Configuration Options**

### **Settings Available**
- **Enable/Disable API**: Toggle API analysis on/off
- **API Endpoint**: Your backend URL
- **API Key**: Optional authentication
- **Timeout**: Request timeout (1-30 seconds)

### **Security Features**
- API key authentication support
- Request timeout protection
- Error handling and fallback
- Secure data transmission

## 🧪 **Testing Your API**

### **Test Connection**
1. Configure your API endpoint
2. Click "Test Connection" button
3. Extension will test with a safe URL
4. Check console for detailed logs

### **Manual Testing**
```bash
curl -X POST https://your-api.com/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-key" \
  -d '{"url": "https://www.google.com", "timestamp": 1703123456789}'
```

## 📝 **Error Handling**

### **Common Issues**
- **Connection Failed**: Check endpoint URL and network
- **Timeout**: Increase timeout or optimize API response
- **Invalid Response**: Ensure response format matches expected schema
- **Authentication Failed**: Verify API key

### **Debug Mode**
Check browser console for detailed error messages:
1. Right-click on extension icon
2. Select "Inspect popup"
3. Check Console tab for errors

## 🔒 **Security Considerations**

### **Data Privacy**
- URLs are sent to your API for analysis
- No personal data is transmitted
- API keys are stored locally in browser
- All communication uses HTTPS

### **Rate Limiting**
- Consider implementing rate limiting on your API
- Extension respects timeout settings
- Failed requests fall back to local analysis

## 📈 **Performance Optimization**

### **API Optimization**
- Cache results for repeated URLs
- Implement async processing
- Use efficient ML models
- Consider CDN for global access

### **Extension Settings**
- Adjust timeout based on API performance
- Enable/disable API as needed
- Monitor API usage and costs

## 🚨 **Troubleshooting**

### **API Not Working**
1. Check endpoint URL format
2. Verify API is accessible
3. Test with curl/Postman
4. Check browser console errors
5. Ensure CORS is enabled

### **Results Not Displaying**
1. Verify response format
2. Check risk score values
3. Ensure reasons array is present
4. Test with known phishing URLs

## 📞 **Support**

For API integration issues:
1. Check this documentation
2. Review browser console logs
3. Test API independently
4. Contact support with error details

---

**Your PhishGuard extension is now ready for real-time API analysis!** 🛡️
