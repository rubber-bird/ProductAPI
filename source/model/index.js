'use strict';

const model = (pool) => {
  /**
   * Gets all product records from the table that are matching the specified conditions.
   * @param {integer} page - Current page
   * @param {integer} count - Number of product being returned
   * @returns {Promise<Object>} A promise which is fulfilled with the object containing the
   * result of query. In the case of rejection promise is filled with error that
   * occured during the query
   */
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

  /**
   * Gets one product record from the table that are matching the specified conditions.
   * @param {integer} productId
   * @returns {Promise<Object>} A promise which is fulfilled with the object containing the
   * result of query. In the case of rejection promise is filled with error that
   * occured during the query.
   * Might be a good thing to check out this resource
   * {@link https://www.postgresql.org/docs/9.4/functions-json.html|PostgresDocs}
   */
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

  /**
   * Gets several records of styles from the table which are matching with the specified product.
   * @param {integer} productId
   * @returns {Promise<Object>} A promise which is fulfilled with the object containing the
   * result of query. In the case of rejection promise is filled with error that
   * occured during the query.
   */

  function getProductStyles(productId) {
    return new Promise((resolve, reject) => {
      const sqlQuery = `
      SELECT
        st.style_id,
        st.name,
        st.sale_price,
        st.original_price,
        st.default_style,
        (SELECT
          json_agg(json_build_object("thumbnail_url", thumbnail_url, "url", url))
        FROM
          photos ph
        WHERE
          ph.styleid = st.style_id
        )
          AS photos,
        (SELECT
          json_agg(json_build_object("size", size, "quantity", quantity))
        FROM
          skus sk
        WHERE
          sk.styleid = st.style_id)
        AS skus
      FROM
        styles st
      WHERE
        productid = $1;
      `;

      pool.query(sqlQuery, [productId], (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.rows);
      });
    });
  }

  /**
   * Gets one product record from the table that are matching the specified conditions.
   * @param {integer} productId
   * @returns {Promise<Object>} A promise which is fulfilled with the object containing the
   * result of query. In the case of rejection promise is filled with error that
   * occured during the query
   */
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
          reject(new Error(err.stack));
        }
        resolve(data.rows[0].array_agg);
      });
    });
  }

  return {
    getProducts,
    getProductInformation,
    getProductStyles,
    getRelatedProducts,
  };
};

const connection = (conn) => {
  return new Promise((resolve, reject) => {
    if (!conn) {
      reject(new Error('no connection'));
    }

    resolve(model(conn));
  });
};

module.exports = connection;
