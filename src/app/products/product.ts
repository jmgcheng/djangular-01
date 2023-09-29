/*
    i'm forced to create interface for structure
    using any[] type while calling observable will produce error if you are trying to get an attribute eg product.id
        Property id does not exist on type string
*/ 

export interface IProductVariation {
    id: number;
    product: IProduct;
    unit: IProductUnit;
    size: IProductSize | null;
    color: IProductColor | null;
    code: string;
    name: string;
    excerpt: string | null;
    description: string | null;
    image_url: string | null;
    current_quantity: number;
  }

export interface IProduct {
    id: number;
    code: string;
    name: string;
    excerpt: string | null;
    description: string | null;
    image_url: string | null;
}

export interface IProductUnit {
    id: number;
    name: string;
}

export interface IProductSize {
    id: number;
    name: string;
}

export interface IProductColor {
    id: number;
    name: string;
}