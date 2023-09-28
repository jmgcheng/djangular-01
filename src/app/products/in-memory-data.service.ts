import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    
    const mockProducts = [
      {
        "id": 1,
        "product": {
            "id": 1,
            "code": "PC00001",
            "name": "PF Hotdog",
            "excerpt": "",
            "description": "",
            "image_url": null
        },
        "unit": {
            "id": 1,
            "name": "packs"
        },
        "size": null,
        "color": null,
        "code": "PC0001PV0001",
        "name": "TJ Hotdog Classic",
        "excerpt": "Lorem ipsum dolor sit amet.",
        "description": "This is the description",
        "image_url": "https://placehold.co/300"
      },
      {
        "id": 2,
        "product": {
            "id": 1,
            "code": "PC00001",
            "name": "PF Hotdog",
            "excerpt": "",
            "description": "",
            "image_url": null
        },
        "unit": {
            "id": 1,
            "name": "packs"
        },
        "size": null,
        "color": null,
        "code": "PC0001PV0002",
        "name": "TJ Hotdog Higante",
        "excerpt": "Consectetur adipiscing elit.",
        "description": "Another Description",
        "image_url": "https://placehold.co/300"
      },
      {
          "id": 3,
          "product": {
              "id": 1,
              "code": "PC00001",
              "name": "PF Hotdog",
              "excerpt": "",
              "description": "",
              "image_url": null
          },
          "unit": {
              "id": 1,
              "name": "packs"
          },
          "size": null,
          "color": null,
          "code": "PC0001PV0003",
          "name": "TJ Hotdog Cheesy Spicy",
          "excerpt": "",
          "description": "",
          "image_url": null
      }  
    ];

    const mockPurchases = [
      {
          "code": "PO00001",
          "purchase_detail": [
              {
                  "product_variation": 1,
                  "quantity_purchased": 100
              }
          ]
      },
      {
          "code": "PO00002",
          "purchase_detail": [
              {
                  "product_variation": 1,
                  "quantity_purchased": 200
              },
              {
                  "product_variation": 2,
                  "quantity_purchased": 200
              }
          ]
      },
      {
          "code": "PO00003",
          "purchase_detail": [
              {
                  "product_variation": 1,
                  "quantity_purchased": 300
              },
              {
                  "product_variation": 2,
                  "quantity_purchased": 300
              },
              {
                  "product_variation": 3,
                  "quantity_purchased": 300
              }
          ]
      }
    ];

    const mockSales = [
      {
        "code": "SI0001",
        "sale_detail": [
            {
                "product_variation": 1,
                "quantity_released": 10
            }
        ]
      },
      {
          "code": "SI0002",
          "sale_detail": [
              {
                  "product_variation": 1,
                  "quantity_released": 20
              },
              {
                  "product_variation": 2,
                  "quantity_released": 20
              }
          ]
      },
      {
          "code": "SI0003",
          "sale_detail": [
              {
                  "product_variation": 3,
                  "quantity_released": 50
              }
          ]
      }     
    ];

    return { mockProducts, mockPurchases, mockSales };
  }
}
