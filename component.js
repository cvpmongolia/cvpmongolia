// Table Component for Trading Helper

class TradingTable {
  constructor(ticker, fullName, color = '#FFFFFF') {
    this.ticker = ticker;
    this.fullName = fullName;
    this.color = color;
    this.metrics = ['Trend', 'WPOC', 'Test Level', 'Liquidity'];
    this.timeframes = ['Weekly', 'Daily', 'H4', 'H1'];
  }

  // Generate the HTML structure for the table
  render() {
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'mb-8 ticker-component group';
    
    // Title section with trash button
    const titleSection = document.createElement('div');
    titleSection.className = 'flex justify-between items-center mb-4';
    
    const title = document.createElement('h2');
    title.className = 'text-xl font-semibold drop-shadow-md';
    title.style.color = this.color;
    title.textContent = this.fullName;
    
    const trashBtn = document.createElement('button');
    trashBtn.className = 'delete-ticker-btn opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-white/10 rounded-lg';
    trashBtn.setAttribute('data-ticker', this.ticker);
    trashBtn.setAttribute('title', `${this.fullName} тикерийн ажлын талбарыг цэвэрлэх`);
    trashBtn.innerHTML = '<img src="./assets/trash-bin.svg" alt="Delete Ticker" class="w-5 h-5">';
    
    titleSection.appendChild(title);
    titleSection.appendChild(trashBtn);
    tableWrapper.appendChild(titleSection);
    
    const tableContainer = document.createElement('div');
    tableContainer.className = 'overflow-x-auto';
    
    const table = document.createElement('table');
    table.className = 'w-full border-collapse bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.className = 'bg-white/5';
    
    const metricHeader = document.createElement('th');
    metricHeader.className = 'border border-white/50 px-4 py-3 text-left font-semibold';
    metricHeader.textContent = '';
    headerRow.appendChild(metricHeader);
    
    this.timeframes.forEach(timeframe => {
      const th = document.createElement('th');
      th.className = 'border border-white/50 px-4 py-3 text-center font-semibold';
      th.textContent = timeframe;
      
      // Color code timeframes with darker variants for better visibility
      if (timeframe === 'Weekly') {
        th.style.color = '#FFC107';
      } else if (timeframe === 'Daily') {
        th.style.color = '#AB47BC';
      } else if (timeframe === 'H4') {
        th.style.color = '#43A047';
      } else if (timeframe === 'H1') {
        th.style.color = '#E53935';
      }
      
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    this.metrics.forEach(metric => {
      const row = document.createElement('tr');
      row.className = 'bg-white/15 hover:bg-white/20 transition-colors';
      
      const metricCell = document.createElement('td');
      metricCell.className = 'border border-white/50 px-4 py-3 font-semibold';
      metricCell.textContent = metric;
      row.appendChild(metricCell);
      
      this.timeframes.forEach(timeframe => {
        const cell = document.createElement('td');
        cell.className = 'border border-white/50 px-4 py-3 text-center drop-zone relative min-h-[60px]';
        
        // Create unique cell identifier
        const timeframeKey = timeframe.toLowerCase().replace('/', '');
        const metricKey = metric.toLowerCase().replace(' ', '');
        cell.setAttribute('data-cell', `${this.ticker}-${metricKey}-${timeframeKey}`);
        
        row.appendChild(cell);
      });
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    tableWrapper.appendChild(tableContainer);
    
    // Add "Generate Basic Expectation" button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'mt-4 flex justify-center gap-3';
    buttonContainer.setAttribute('data-button-container', this.ticker);
    
    const generateBtn = document.createElement('button');
    generateBtn.className = 'generate-expectation-btn px-6 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all backdrop-blur-sm';
    generateBtn.textContent = 'Ерөнхий хүлээлт гаргах';
    generateBtn.setAttribute('data-ticker', this.ticker);
    
    const showAdviceBtn = document.createElement('button');
    showAdviceBtn.className = 'show-advice-btn hidden px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all flex-1';
    showAdviceBtn.textContent = 'Ерөнхий хүлээлтийн зөвлөмж харах';
    showAdviceBtn.setAttribute('data-ticker', this.ticker);
    
    buttonContainer.appendChild(generateBtn);
    buttonContainer.appendChild(showAdviceBtn);
    tableWrapper.appendChild(buttonContainer);
    
    // Add expectation details container
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'expectation-details mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hidden transition-all duration-300 ease-in-out';
    detailsContainer.setAttribute('data-ticker', this.ticker);
    detailsContainer.style.maxHeight = '0';
    detailsContainer.style.overflow = 'hidden';
    
    tableWrapper.appendChild(detailsContainer);
    
    return tableWrapper;
  }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TradingTable;
}
