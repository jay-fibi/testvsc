import { Stock } from './types';
export declare class TickerHandler {
    private stocks;
    private tickerElement;
    private updateInterval;
    private intervalId?;
    constructor(tickerId: string);
    private createTickerItem;
    private renderTicker;
    private updateStockPrices;
    initialize(): void;
    startAutoUpdate(): void;
    stopAutoUpdate(): void;
    getStocks(): Stock[];
    setUpdateInterval(milliseconds: number): void;
}
//# sourceMappingURL=tickerHandler.d.ts.map