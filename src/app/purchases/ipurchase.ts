export interface IPurchase {
    id: number;
    code: string;
    date: string;
    purchase_detail: IPurchaseDetail[];
}

export interface IPurchaseDetail {
    product_variation: number;
    product_name: string;
    quantity_purchased: number;
}
