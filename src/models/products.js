import pool from '../config/db';

function getProducts(page, count) {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
    SELECT
      *
    FROM
      products
    LIMIT $2
    OFFSET $1;
    `;

    pool.query(sqlQuery, [page, count], (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows);
    });
  });
}

function getProductInformation(productId) {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
    SELECT
      id, name, slogan, description, default_price, (
        SELECT
          array_agg(json_build_object('feature', feature, 'value', value))
        FROM
          features
        WHERE
          product_id = $1
        ) AS features
    FROM
      products
    WHERE
      id = $1;
    `;

    pool.query(sqlQuery, [productId], (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows);
    });
  });
}

function getRelatedProducts(productId) {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
    SELECT
      array_agg(related_product_id)
    FROM
      related
    WHERE
      current_product_id = $1;
    `;

    pool.query(sqlQuery, [productId], (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows[0].array_agg);
    });
  });
}

export {
  getProducts,
  getProductInformation,
  getRelatedProducts,
};
