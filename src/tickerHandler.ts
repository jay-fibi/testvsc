// NASDAQ Ticker Tape Handler

import { Stock } from './types';

export class TickerHandler {
  private stocks: Stock[];
  private tickerElement: HTMLElement;
  private updateInterval: number = 5000; // 5 seconds
  private intervalId?: number;

  constructor(tickerId: string) {
    const ticker = document.getElementById(tickerId);
    if (!ticker) {
      throw new Error(`Ticker element with id "${tickerId}" not found`);
    }
    this.tickerElement = ticker;

    // Initialize NASDAQ stocks with realistic data
    this.stocks = [
      { symbol: 'AAPL', price: 185.92, change: 2.34 },
      { symbol: 'MSFT', price: 378.91, change: -1.23 },
      { symbol: 'GOOGL', price: 142.18, change: 3.45 },
      { symbol: 'AMZN', price: 178.35, change: 4.12 },
      { symbol: 'TSLA', price: 248.50, change: -5.67 },
      { symbol: 'META', price: 484.03, change: 6.89 },
      { symbol: 'NVDA', price: 505.48, change: 8.92 },
      { symbol: 'NFLX', price: 629.33, change: -2.45 },
      { symbol: 'AMD', price: 142.87, change: 1.76 },
      { symbol: 'INTC', price: 43.21, change: -0.98 }
    ];
  }

  private createTickerItem(stock: Stock): string {
    const changeClass = stock.change >= 0 ? 'up' : 'down';
    const changeSymbol = stock.change >= 0 ? '▲' : '▼';
    const changePercent = Math.abs(stock.change).toFixed(2);
    
    return `
      <div class="ticker-item">
        <span class="ticker-symbol">${stock.symbol}</span>
        <span class="ticker-price">$${stock.price.toFixed(2)}</span>
        <span class="ticker-change ${changeClass}">${changeSymbol} ${changePercent}%</span>
      </div>
    `;
  }

  private renderTicker(): void {
    let tickerHTML = '';
    
    // Duplicate the stocks to create seamless loop
    const duplicatedStocks = [...this.stocks, ...this.stocks];
    
    duplicatedStocks.forEach(stock => {
      tickerHTML += this.createTickerItem(stock);
    });
    
    this.tickerElement.innerHTML = tickerHTML;
  }

  private updateStockPrices(): void {
    this.stocks.forEach(stock => {
      // Simulate price changes with random fluctuations
      const randomChange = (Math.random() - 0.5) * 2;
      stock.change = parseFloat(randomChange.toFixed(2));
      stock.price = parseFloat((stock.price * (1 + randomChange / 100)).toFixed(2));
      
      // Prevent prices from going too low
      if (stock.price < 10) {
        stock.price = 10;
      }
    });
  }

  public initialize(): void {
    this.renderTicker();
    this.startAutoUpdate();
  }

  public startAutoUpdate(): void {
    // Clear any existing interval
    this.stopAutoUpdate();

    // Update stock prices periodically
    this.intervalId = window.setInterval(() => {
      this.updateStockPrices();
      this.renderTicker();
    }, this.updateInterval);
  }

  public stopAutoUpdate(): void {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public getStocks(): Stock[] {
    return [...this.stocks];
  }

  public setUpdateInterval(milliseconds: number): void {
    this.updateInterval = milliseconds;
    if (this.intervalId !== undefined) {
      this.startAutoUpdate();
    }
  }
}
