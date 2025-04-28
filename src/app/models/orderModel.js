const { getConnection } = require('../../db');

class orderModel {
    createOrder(userId, items) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection();
                await connection.beginTransaction();

                // Calculate total
                let total = 0;
                for (const item of items) {
                    const [rows] = await connection.execute('SELECT price FROM items WHERE id = ?', [item.itemId]);
                    if (rows.length === 0) {
                        throw new Error(`Item ID ${item.itemId} not found`);
                    }
                    total += rows[0].price * item.quantity;
                }

                // Insert into orders
                const [orderResult] = await connection.execute(
                    'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
                    [userId, total, 'pending']
                );
                const orderId = orderResult.insertId;

                // Insert into order_items
                for (const item of items) {
                    const [rows] = await connection.execute('SELECT price FROM items WHERE id = ?', [item.itemId]);
                    await connection.execute(
                        'INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)',
                        [orderId, item.itemId, item.quantity, rows[0].price]
                    );
                }

                await connection.commit();
                await connection.end();
                resolve({ orderId, total });
            } catch (error) {
                await connection.rollback();
                await connection.end();
                console.error('Error creating order:', error);
                reject(error);
            }
        });
    }

    showCartbyID(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection();
                const [rows] = await connection.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
                await connection.end();
                resolve(rows);
            } catch (error) {
                console.error('Error fetching cart:', error);
                reject(error);
            }
        });
    }

    showAllOrders() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection();
                const [rows] = await connection.execute('SELECT * FROM orders');
                await connection.end();
                resolve(rows);
            } catch (error) {
                console.error('Error fetching all orders:', error);
                reject(error);
            }
        });
    }
}

module.exports = orderModel;