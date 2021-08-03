DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products

CREATE TABLE products (
  id SERIAL Primary Key,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price TEXT NOT NULL
);

CREATE TABLE styles (
  style_id SERIAL Primary Key,
  productId INT,
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT NOT NULL,
  default_style BOOLEAN NOT NULL,
  FOREIGN KEY(productId) REFERENCES products(id)
);

CREATE TABLE related (
  id SERIAL Primary Key,
  current_product_id INT,
  related_product_id INT,
  FOREIGN KEY(current_product_id) REFERENCES products(id)
);

CREATE TABLE features (
  id SERIAL Primary Key,
  product_id INT,
  feature TEXT NOT NULL,
  value TEXT NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE photos (
  id SERIAL Primary Key,
  styleId INT,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  FOREIGN KEY(styleId) REFERENCES styles(style_id)
);

CREATE TABLE skus (
  id SERIAL Primary Key,
  styleId INT,
  size TEXT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY(styleId) REFERENCES styles(style_id)
);

CREATE INDEX idx_styles_productId ON styles(productId);

CREATE INDEX idx_related_current_id ON related(current_product_id);

CREATE INDEX idx_related_related_id ON related(related_product_id);

CREATE INDEX idx_features_product_id ON features(product_id);

CREATE INDEX idx_photos_styleId ON photos(styleId);

CREATE INDEX idx_skus_styleId ON skus(styleId);

