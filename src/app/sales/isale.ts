export interface ISale {
    id: number | null;
    code: string;
    date: string;
    sale_detail: ISaleDetail[];
}

export interface ISaleDetail {
    product_variation: number;
    product_name: string;
    quantity_released: number;
}