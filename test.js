function summarizeOrders(orders) {
    if (!orders || orders.length === 0) return [];
    
    const summary = new Map();
    
    for (const order of orders) {
        const uniqueProducts = new Set();
        
        for (const item of order.items) {
            const { productId, productName, quantity, price } = item;
            const totalSales = quantity * price;
            
            if (!summary.has(productId)) {
                summary.set(productId, {
                    productId,
                    productName,
                    totalQuantity: 0,
                    totalSales: 0,
                    orderCount: 0
                });
            }
            
            const product = summary.get(productId);
            product.totalQuantity += quantity;
            product.totalSales += totalSales;
            
            if (!uniqueProducts.has(productId)) {
                product.orderCount += 1;
                uniqueProducts.add(productId);
            }
        }
    }
    
    return Array.from(summary.values()).sort((a, b) => {
        if (b.totalSales !== a.totalSales) {
            return b.totalSales - a.totalSales;
        }
        return a.productName.localeCompare(b.productName);
    });
}

// ========================================
//             Testing the Function
// ========================================
const sampleOrders = [
    {
        orderId: 1,
        orderDate: "2025-01-10",
        items: [
            { productId: "P001", productName: "Pen", quantity: 10, price: 5 },
            { productId: "P002", productName: "Book", quantity: 2, price: 50 }
        ]
    },
    {
        orderId: 2,
        orderDate: "2025-01-11",
        items: [
            { productId: "P001", productName: "Pen", quantity: 5, price: 5 },
            { productId: "P003", productName: "Pencil", quantity: 10, price: 2 }
        ]
    },
    {
        orderId: 3,
        orderDate: "2025-01-12",
        items: [
            { productId: "P002", productName: "Book", quantity: 5, price: 45 },
            { productId: "P004", productName: "Eraser", quantity: 1, price: 3 }
        ]
    },
    {
        orderId: 4,
        orderDate: "2025-01-12",
        items: [
            { productId: "P003", productName: "Pencil", quantity: 5, price: 2 },
            { productId: "P001", productName: "Pen", quantity: 3, price: 5 }
        ]
    }
];

const summaryResult = summarizeOrders(sampleOrders);
console.log(summaryResult);


module.exports = { summarizeOrders };

/*
ตัวอย่างผลลัพธ์ (อาจต่างไปตามราคาที่กำหนดใน 'sampleOrders'):
 

[
    {
        productId: 'P002',
        productName: 'Book',
        totalQuantity: 7,
        totalSales: 325,
        orderCount: 2
    },
    {
        productId: 'P001',
        productName: 'Pen',
        totalQuantity: 18,
        totalSales: 90,
        orderCount: 3
    },
    {
        productId: 'P003',
        productName: 'Pencil',
        totalQuantity: 15,
        totalSales: 30,
        orderCount: 2
    },
    {
        productId: 'P004',
        productName: 'Eraser',
        totalQuantity: 1,
        totalSales: 3,
        orderCount: 1
    }
]

(เรียงตาม totalSales มาก -> น้อย,
    ถ้าเท่ากันแล้วจึงเรียงตาม productName)
*/
