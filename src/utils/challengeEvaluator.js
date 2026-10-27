/**
 * Safe client-side evaluation engine for Dev-root coding challenges (Phase 5).
 * Evaluates HTML, CSS, and JavaScript solutions against structured test criteria.
 */

export function evaluateChallenge(challenge, code) {
  const { testCriteria } = challenge;
  let passed = true;
  const errors = [];
  const feedback = [];

  if (!testCriteria) {
    if (code && code.trim().length > 20) {
      passed = true;
      feedback.push('Code submitted successfully! Compare with reference solution.');
    } else {
      passed = false;
      errors.push('Your code is too brief. Implement the requested requirements.');
    }
    return { passed, errors, feedback };
  }

  if (testCriteria.type === 'html') {
    try {
      // Handle browser DOMParser or jsdom in tests
      let doc;
      if (typeof DOMParser !== 'undefined') {
        const parser = new DOMParser();
        doc = parser.parseFromString(code, 'text/html');
      } else {
        // Fallback or node environment test check
        doc = {
          querySelector: (sel) => code.includes(`<${sel}`),
          querySelectorAll: (sel) => (code.match(new RegExp(`<${sel}`, 'g')) || [])
        };
      }

      if (testCriteria.requiredTags) {
        testCriteria.requiredTags.forEach((tag) => {
          let found = false;
          if (doc.querySelector && typeof doc.querySelector === 'function') {
            try {
              found = doc.querySelector(tag) !== null;
            } catch (e) {
              found = code.includes(`<${tag}`);
            }
          } else {
            found = code.includes(`<${tag}`);
          }

          if (!found) {
            passed = false;
            errors.push(`Missing required HTML element: <${tag}>.`);
          } else {
            feedback.push(`Found required element: <${tag}>.`);
          }
        });
      }

      if (testCriteria.attributes) {
        Object.entries(testCriteria.attributes).forEach(([tag, attrs]) => {
          let el = null;
          try {
            el = doc.querySelector(tag);
          } catch (e) {
            // ignore
          }

          attrs.forEach((attr) => {
            if (el && el.hasAttribute && typeof el.hasAttribute === 'function') {
              if (!el.hasAttribute(attr)) {
                passed = false;
                errors.push(`The <${tag}> element is missing required attribute: '${attr}'.`);
              } else {
                feedback.push(`Attribute '${attr}' correctly present on <${tag}>.`);
              }
            } else {
              // Regex fallback
              const re = new RegExp(`<${tag}[^>]*${attr}=`, 'i');
              if (!re.test(code)) {
                passed = false;
                errors.push(`The <${tag}> element is missing required attribute: '${attr}'.`);
              }
            }
          });
        });
      }

      if (testCriteria.minParagraphs) {
        let pCount = 0;
        if (doc.querySelectorAll && typeof doc.querySelectorAll === 'function') {
          try {
            pCount = doc.querySelectorAll('p').length;
          } catch (e) {
            pCount = (code.match(/<p\b/gi) || []).length;
          }
        } else {
          pCount = (code.match(/<p\b/gi) || []).length;
        }

        if (pCount < testCriteria.minParagraphs) {
          passed = false;
          errors.push(`Expected at least ${testCriteria.minParagraphs} paragraphs (<p>), but found ${pCount}.`);
        }
      }
    } catch (err) {
      passed = false;
      errors.push(`HTML Parser Error: ${err.message}`);
    }
  } else if (testCriteria.type === 'css') {
    if (testCriteria.requiredProperties) {
      Object.entries(testCriteria.requiredProperties).forEach(([selector, props]) => {
        if (!code.includes(selector)) {
          passed = false;
          errors.push(`Missing CSS rule for selector '${selector}'.`);
        } else {
          props.forEach((prop) => {
            if (!code.includes(prop)) {
              passed = false;
              errors.push(`Rule '${selector}' appears to be missing property '${prop}'.`);
            } else {
              feedback.push(`Found property '${prop}' in '${selector}'.`);
            }
          });
        }
      });
    }
  } else if (testCriteria.type === 'react' || challenge.category === 'react') {
    // For React JSX challenges, evaluate code patterns and component structure
    if (testCriteria.requiredCodePatterns) {
      testCriteria.requiredCodePatterns.forEach((pat) => {
        if (!code.includes(pat)) {
          passed = false;
          errors.push(`Component is missing required pattern or hook: '${pat}'.`);
        }
      });
    }

    const funcName = testCriteria.functionName;
    if (funcName && !code.includes(`function ${funcName}`) && !code.includes(`const ${funcName}`)) {
      passed = false;
      errors.push(`React component '${funcName}' is not defined.`);
    }

    if (!code.includes('return') || !code.includes('<')) {
      passed = false;
      errors.push(`React component '${funcName}' must return JSX markup.`);
    }

    if (passed) {
      feedback.push(`React component '${funcName}' successfully declared and returns valid JSX.`);
    }
  } else if (testCriteria.type === 'javascript') {
    // Check required code patterns first if defined
    if (testCriteria.requiredCodePatterns) {
      testCriteria.requiredCodePatterns.forEach((pat) => {
        if (!code.includes(pat)) {
          passed = false;
          errors.push(`Code is missing expected pattern: '${pat}'.`);
        }
      });
    }

    try {
      const funcName = testCriteria.functionName;
      // Strip import statements for evaluation
      const cleanCode = code.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
      const factory = new Function(`
        ${cleanCode};
        return typeof ${funcName} !== 'undefined' ? ${funcName} : null;
      `);
      const userFn = factory();

      if (typeof userFn !== 'function') {
        passed = false;
        errors.push(`Function '${funcName}' is not defined or is not a function.`);
      } else if (testCriteria.testCases && testCriteria.testCases.length > 0) {
        testCriteria.testCases.forEach((tc, idx) => {
          const result = userFn(...tc.input);
          const resultStr = JSON.stringify(result);
          const expectedStr = JSON.stringify(tc.expected);

          if (resultStr !== expectedStr) {
            passed = false;
            errors.push(`Test Case #${idx + 1} Failed: Expected ${expectedStr}, but got ${resultStr}.`);
          } else {
            feedback.push(`Test Case #${idx + 1} Passed!`);
          }
        });
      } else {
        feedback.push(`Function '${funcName}' compiled and exported successfully.`);
      }
    } catch (err) {
      passed = false;
      errors.push(`JavaScript Runtime Exception: ${err.message}`);
    }
  }

  return { passed, errors, feedback };
}
