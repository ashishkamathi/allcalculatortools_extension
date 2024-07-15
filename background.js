chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
  chrome.storage.local.set({ calculators: [] });

  fetch('https://allcalculator.tools/page-sitemap.xml')
    .then(response => response.text())
    .then(data => {
      console.log('Sitemap fetched successfully.');
      const urls = parseXML(data);
      const calculatorUrls = urls.filter(url => url.includes('-calculator') || url.includes('-converter'));
      console.log('Filtered URLs:', calculatorUrls);

      Promise.all(calculatorUrls.map(url => fetchMetaTitle(url)))
        .then(results => {
          console.log('Meta titles fetched:', results);
          chrome.storage.local.set({ calculators: results }, () => {
            console.log('Filtered URLs with meta titles stored successfully.');
          });
        })
        .catch(error => console.error('Error fetching meta titles:', error));
    })
    .catch(error => console.error('Error fetching sitemap:', error));
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCalculators") {
    chrome.storage.local.get(['calculators'], (result) => {
      sendResponse(result.calculators);
    });
    return true;  // Will respond asynchronously.
  }
});

function parseXML(xmlString) {
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xmlString)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function fetchMetaTitle(url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : url;
      return { url, title };
    })
    .catch(error => {
      console.error('Error fetching meta title for URL:', url, error);
      return { url, title: url };
    });
}
