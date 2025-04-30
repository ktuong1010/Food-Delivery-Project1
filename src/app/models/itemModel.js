const { getConnection } = require('../../db');
const slugify = require('slugify');

class itemModel{

    async generateUniqueSlug(name, connection) {
        let baseSlug = slugify(name, { lower: true, strict: true });
        let slug = baseSlug;
        let counter = 1;

        while (true) {
            const [rows] = await connection.execute('SELECT id FROM items WHERE slug = ?', [slug]);
            if (rows.length === 0) {
                return slug; // Slug is unique
            }
            slug = `${baseSlug}-${counter}`; // Append counter (e.g., pizza-1)
            counter++;
        }
    }

    additem(itemData) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection();

                const slug = await this.generateUniqueSlug(itemData.name, connection);
                const sql = 'INSERT INTO items (slug, name, description, image, price) VALUES (?, ?, ?, ?, ?)';
                const values = [slug, itemData.name, itemData.description, itemData.image, itemData.price];
                const [result] = await connection.execute(sql, values);
                await connection.end();
                resolve(result);
            } catch (error) {
                console.error('Error adding item:', error);
                reject(error);
            }
        });
    }

    showitem() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection();
                const sql = 'SELECT * FROM items';
                const [rows] = await connection.execute(sql);
                await connection.end();
                resolve(rows);
            } catch (error) {
                console.error('Error fetching items:', error);
                reject(error);
            }
        });
    }

    getItemBySlug(slug) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection();
                const sql = 'SELECT * FROM items WHERE slug = ?';
                const [rows] = await connection.execute(sql, [slug]);
                await connection.end();
                resolve(rows.length > 0 ? rows[0] : null);
            } catch (error) {
                console.error('Error fetching item by slug:', error);
                reject(error);
            }
        });
    }

    editItem(id, itemData) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection();
                const [current] = await connection.execute('SELECT id, slug, name, description, image, price FROM items WHERE id = ?', [id]);
                if (current.length === 0) {
                    await connection.end();
                    return reject(new Error('Item not found'));
                }

                const newSlug = itemData.name && itemData.name !== current[0].name
                    ? await this.generateUniqueSlug(itemData.name, connection, id)
                    : current[0].slug;

                const sql = 'UPDATE items SET slug = ?, name = ?, description = ?, image = ?, price = ? WHERE id = ?';
                const values = [
                    newSlug,
                    itemData.name,
                    itemData.description,
                    itemData.image,
                    itemData.price,
                    id
                ];

                const [result] = await connection.execute(sql, values);
                await connection.end();
                resolve(result);
            } catch (error) {
                console.error('Error editing item:', error);
                reject(error);
            }
        });
    }
    searchItems(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await getConnection();
                const sql = 'SELECT * FROM items WHERE name LIKE ? OR description LIKE ?';
                const [rows] = await connection.execute(sql, [`%${query}%`, `%${query}%`]);
                await connection.end();
                resolve(rows);
            } catch (error) {
                console.error('Error searching items:', error);
                reject(error);
            }
        });
    }

}

module.exports = itemModel;