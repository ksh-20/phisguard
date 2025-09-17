class PhishGuard {
  constructor() {
    this.suspiciousPatterns = [
      // Common phishing patterns
      /paypal.*\.(tk|ml|ga|cf)$/i,
      /amazon.*\.(tk|ml|ga|cf)$/i,
      /facebook.*\.(tk|ml|ga|cf)$/i,
      /google.*\.(tk|ml|ga|cf)$/i,
      /apple.*\.(tk|ml|ga|cf)$/i,
      /microsoft.*\.(tk|ml|ga|cf)$/i,
      /netflix.*\.(tk|ml|ga|cf)$/i,
      /spotify.*\.(tk|ml|ga|cf)$/i,
      /instagram.*\.(tk|ml|ga|cf)$/i,
      /twitter.*\.(tk|ml|ga|cf)$/i,
      /linkedin.*\.(tk|ml|ga|cf)$/i,
      /bank.*\.(tk|ml|ga|cf)$/i,
      /login.*\.(tk|ml|ga|cf)$/i,
      /secure.*\.(tk|ml|ga|cf)$/i,
      /account.*\.(tk|ml|ga|cf)$/i,
      /verify.*\.(tk|ml|ga|cf)$/i,
      /update.*\.(tk|ml|ga|cf)$/i,
      /confirm.*\.(tk|ml|ga|cf)$/i,
      /support.*\.(tk|ml|ga|cf)$/i,
      /service.*\.(tk|ml|ga|cf)$/i
    ];
    
    this.legitimateDomains = [
      'google.com', 'facebook.com', 'amazon.com', 'microsoft.com',
      'apple.com', 'netflix.com', 'spotify.com', 'instagram.com',
      'twitter.com', 'linkedin.com', 'paypal.com', 'ebay.com',
      'youtube.com', 'wikipedia.org', 'github.com', 'stackoverflow.com'
    ];
    
    this.init();
  }

  init() {
    this.analyzeCurrentPage();
    this.monitorLinks();
    this.monitorFormSubmissions();
  }

  analyzeCurrentPage() {
    try {
      const currentUrl = window.location.href;
      
      // Skip analysis for error pages or restricted URLs
      if (this.isErrorPage() || this.isRestrictedUrl(currentUrl)) {
        console.log('Skipping analysis for error/restricted page:', currentUrl);
        return;
      }
      
      const riskScore = this.calculateRiskScore(currentUrl);
      
      if (riskScore.score > 0.7) {
        this.showWarning(currentUrl, riskScore);
      }
    } catch (error) {
      console.error('Error analyzing current page:', error);
    }
  }

  isErrorPage() {
    // Check for common error page indicators
    const bodyText = document.body ? document.body.textContent.toLowerCase() : '';
    const title = document.title.toLowerCase();
    
    const errorIndicators = [
      'this site can\'t be reached',
      'this page isn\'t working',
      '404 not found',
      'page not found',
      'server error',
      'access denied',
      'forbidden',
      'this page could not be loaded',
      'connection timed out',
      'dns_probe_finished_nxdomain'
    ];
    
    return errorIndicators.some(indicator => 
      bodyText.includes(indicator) || title.includes(indicator)
    );
  }

  isRestrictedUrl(url) {
    const restrictedPatterns = [
      /^chrome:\/\//,
      /^chrome-extension:\/\//,
      /^moz-extension:\/\//,
      /^edge:\/\//,
      /^about:/,
      /^data:/,
      /^file:\/\//
    ];
    
    return restrictedPatterns.some(pattern => pattern.test(url));
  }

  monitorLinks() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && link.href) {
        const riskScore = this.calculateRiskScore(link.href);
        if (riskScore > 0.6) {
          event.preventDefault();
          this.showLinkWarning(link.href, riskScore);
        }
      }
    });

    // Monitor dynamically added links
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const links = node.querySelectorAll ? node.querySelectorAll('a') : [];
            links.forEach(link => {
              if (link.href) {
                const riskScore = this.calculateRiskScore(link.href);
                if (riskScore > 0.6) {
                  this.markSuspiciousLink(link, riskScore);
                }
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  monitorFormSubmissions() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      const action = form.action || window.location.href;
      const riskScore = this.calculateRiskScore(action);
      
      if (riskScore > 0.6) {
        event.preventDefault();
        this.showFormWarning(action, riskScore);
      }
    });
  }

  calculateRiskScore(url) {
    try {
      const urlObj = new URL(url);
      let score = 0;
      let reasons = [];

      // Check for suspicious TLDs
      const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.cc', '.click', '.download'];
      const tld = urlObj.hostname.split('.').pop();
      if (suspiciousTlds.some(suspiciousTld => urlObj.hostname.endsWith(suspiciousTld))) {
        score += 0.3;
        reasons.push('Suspicious TLD detected');
      }

      // Check for suspicious patterns
      for (const pattern of this.suspiciousPatterns) {
        if (pattern.test(urlObj.hostname)) {
          score += 0.4;
          reasons.push('Suspicious domain pattern detected');
          break;
        }
      }

      if (url.length > 100) {
        score += 0.1;
        reasons.push('Unusually long URL');
      }

      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (ipPattern.test(urlObj.hostname)) {
        score += 0.2;
        reasons.push('IP address instead of domain name');
      }

      const subdomainCount = urlObj.hostname.split('.').length - 2;
      if (subdomainCount > 3) {
        score += 0.15;
        reasons.push('Excessive subdomains');
      }

      const suspiciousChars = /[^\w\-\.]/;
      if (suspiciousChars.test(urlObj.hostname)) {
        score += 0.1;
        reasons.push('Suspicious characters in domain');
      }

      const hostname = urlObj.hostname.toLowerCase();
      for (const legitDomain of this.legitimateDomains) {
        if (this.calculateLevenshteinDistance(hostname, legitDomain) <= 2 && hostname !== legitDomain) {
          score += 0.3;
          reasons.push(`Possible typosquatting of ${legitDomain}`);
          break;
        }
      }

      if (urlObj.protocol !== 'https:') {
        score += 0.1;
        reasons.push('Not using HTTPS');
      }

      const suspiciousKeywords = ['login', 'secure', 'account', 'verify', 'update', 'confirm', 'support'];
      const path = urlObj.pathname.toLowerCase();
      for (const keyword of suspiciousKeywords) {
        if (path.includes(keyword)) {
          score += 0.05;
          reasons.push(`Suspicious keyword in URL: ${keyword}`);
        }
      }

      return {
        score: Math.min(score, 1.0),
        reasons: reasons
      };
    } catch (error) {
      return { score: 0.8, reasons: ['Invalid URL format'] };
    }
  }

  calculateLevenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }

  showWarning(url, riskData) {
    const warning = document.createElement('div');
    warning.id = 'phishguard-warning';
    warning.innerHTML = `
      <div class="phishguard-warning-content">
        <div class="phishguard-warning-header">
          <h3>⚠️PhishGuard Warning</h3>
          <button id="phishguard-close" class="phishguard-close-btn">&times;</button>
        </div>
        <div class="phishguard-warning-body">
          <p><strong>This website may be a phishing attempt!</strong></p>
          <p>Risk Score: ${Math.round(riskData.score * 100)}%</p>
          <p>URL: ${url}</p>
          <div class="phishguard-reasons">
            <strong>Reasons:</strong>
            <ul>
              ${riskData.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
          </div>
          <div class="phishguard-actions">
            <button id="phishguard-leave" class="phishguard-btn phishguard-btn-danger">Leave Site</button>
            <button id="phishguard-continue" class="phishguard-btn phishguard-btn-secondary">Continue Anyway</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(warning);

    // Add event listeners
    document.getElementById('phishguard-close').addEventListener('click', () => {
      warning.remove();
    });

    document.getElementById('phishguard-leave').addEventListener('click', () => {
      window.history.back();
      warning.remove();
    });

    document.getElementById('phishguard-continue').addEventListener('click', () => {
      warning.remove();
    });
  }

  showLinkWarning(url, riskData) {
    const warning = document.createElement('div');
    warning.id = 'phishguard-link-warning';
    warning.innerHTML = `
      <div class="phishguard-warning-content">
        <div class="phishguard-warning-header">
          <h3>⚠️Suspicious Link Detected</h3>
          <button id="phishguard-link-close" class="phishguard-close-btn">&times;</button>
        </div>
        <div class="phishguard-warning-body">
          <p><strong>This link may be dangerous!</strong></p>
          <p>Risk Score: ${Math.round(riskData.score * 100)}%</p>
          <p>URL: ${url}</p>
          <div class="phishguard-reasons">
            <strong>Reasons:</strong>
            <ul>
              ${riskData.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
          </div>
          <div class="phishguard-actions">
            <button id="phishguard-link-cancel" class="phishguard-btn phishguard-btn-danger">Cancel</button>
            <button id="phishguard-link-proceed" class="phishguard-btn phishguard-btn-secondary">Proceed</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(warning);

    // Add event listeners
    document.getElementById('phishguard-link-close').addEventListener('click', () => {
      warning.remove();
    });

    document.getElementById('phishguard-link-cancel').addEventListener('click', () => {
      warning.remove();
    });

    document.getElementById('phishguard-link-proceed').addEventListener('click', () => {
      window.open(url, '_blank');
      warning.remove();
    });
  }

  showFormWarning(url, riskData) {
    const warning = document.createElement('div');
    warning.id = 'phishguard-form-warning';
    warning.innerHTML = `
      <div class="phishguard-warning-content">
        <div class="phishguard-warning-header">
          <h3>⚠️Suspicious Form Submission</h3>
          <button id="phishguard-form-close" class="phishguard-close-btn">&times;</button>
        </div>
        <div class="phishguard-warning-body">
          <p><strong>This form may be submitting to a suspicious website!</strong></p>
          <p>Risk Score: ${Math.round(riskData.score * 100)}%</p>
          <p>URL: ${url}</p>
          <div class="phishguard-reasons">
            <strong>Reasons:</strong>
            <ul>
              ${riskData.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
          </div>
          <div class="phishguard-actions">
            <button id="phishguard-form-cancel" class="phishguard-btn phishguard-btn-danger">Cancel Submission</button>
            <button id="phishguard-form-proceed" class="phishguard-btn phishguard-btn-secondary">Submit Anyway</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(warning);

    // Add event listeners
    document.getElementById('phishguard-form-close').addEventListener('click', () => {
      warning.remove();
    });

    document.getElementById('phishguard-form-cancel').addEventListener('click', () => {
      warning.remove();
    });

    document.getElementById('phishguard-form-proceed').addEventListener('click', () => {
      warning.remove();
      // Re-submit the form
      const form = document.querySelector('form');
      if (form) {
        form.submit();
      }
    });
  }

  markSuspiciousLink(link, riskData) {
    link.style.border = '2px solid #ff4444';
    link.style.backgroundColor = '#ffe6e6';
    link.title = `Suspicious link detected (Risk: ${Math.round(riskData.score * 100)}%)`;
    
    // Add warning icon
    const warningIcon = document.createElement('span');
    warningIcon.innerHTML = '⚠️';
    warningIcon.style.marginLeft = '5px';
    warningIcon.style.color = '#ff4444';
    link.appendChild(warningIcon);
  }

  displayAnalysisResult(url, riskScore) {
    // Create a floating analysis result display
    const resultDisplay = document.createElement('div');
    resultDisplay.id = 'phishguard-analysis-result';
    resultDisplay.innerHTML = `
      <div class="phishguard-analysis-content">
        <div class="phishguard-analysis-header">
          <h3>🔍 URL Analysis Result</h3>
          <button id="phishguard-analysis-close" class="phishguard-close-btn">&times;</button>
        </div>
        <div class="phishguard-analysis-body">
          <div class="analysis-url">
            <strong>URL:</strong> ${url}
          </div>
          <div class="analysis-score">
            <strong>Risk Score:</strong> 
            <span class="risk-value ${this.getRiskClass(riskScore.score)}">${Math.round(riskScore.score * 100)}%</span>
            ${riskScore.source ? `<span class="analysis-source">(${riskScore.source})</span>` : ''}
          </div>
          <div class="analysis-reasons">
            <strong>Analysis Details:</strong>
            <ul>
              ${riskScore.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
          </div>
          <div class="analysis-actions">
            <button id="phishguard-analysis-close-btn" class="phishguard-btn phishguard-btn-primary">Close</button>
          </div>
        </div>
      </div>
    `;

    // Remove any existing analysis result
    const existingResult = document.getElementById('phishguard-analysis-result');
    if (existingResult) {
      existingResult.remove();
    }

    document.body.appendChild(resultDisplay);

    // Add event listeners
    document.getElementById('phishguard-analysis-close').addEventListener('click', () => {
      resultDisplay.remove();
    });

    document.getElementById('phishguard-analysis-close-btn').addEventListener('click', () => {
      resultDisplay.remove();
    });

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (resultDisplay.parentNode) {
        resultDisplay.remove();
      }
    }, 10000);
  }

  getRiskClass(score) {
    if (score >= 0.7) return 'high-risk';
    if (score >= 0.4) return 'medium-risk';
    return 'low-risk';
  }
}

// Initialize PhishGuard when the page loads
let phishGuardInstance;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    phishGuardInstance = new PhishGuard();
  });
} else {
  phishGuardInstance = new PhishGuard();
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showWarning' && phishGuardInstance) {
    const riskData = {
      score: 0.8,
      reasons: [request.reason]
    };
    phishGuardInstance.showWarning(request.url, riskData);
  } else if (request.action === 'displayAnalysisResult' && phishGuardInstance) {
    phishGuardInstance.displayAnalysisResult(request.url, request.riskScore);
  }
  sendResponse({ success: true });
});