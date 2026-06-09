-- Run this file once to set up your database
-- psql -U <your_user> -d <your_db> -f db/schema.sql

CREATE TABLE IF NOT EXISTS assets (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(150)   NOT NULL,
  category     VARCHAR(50)    NOT NULL,   -- agrishare | brickshare | luxshare | dailyrentals | truckshare
  description  TEXT,
  price_per_share NUMERIC(12, 2) NOT NULL,
  total_shares    INTEGER        NOT NULL,
  available_shares INTEGER       NOT NULL,
  location     VARCHAR(150),
  image_url    VARCHAR(300),
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- ─── Seed Data ────────────────────────────────────────────────────────────────

-- AgriShare
INSERT INTO assets (title, category, description, price_per_share, total_shares, available_shares, location, image_url) VALUES
('Kolar Gold Fields Farmland', 'agrishare', '12-acre tomato and ragi cultivation land with drip irrigation.', 5000.00, 200, 145, 'Kolar, Karnataka', 'https://via.placeholder.com/400x250?text=Kolar+Farm'),
('Nashik Grape Estate', 'agrishare', 'Premium 20-acre grape vineyard with export-grade produce.', 8000.00, 300, 220, 'Nashik, Maharashtra', 'https://via.placeholder.com/400x250?text=Nashik+Vineyard'),
('Punjab Wheat Fields', 'agrishare', '30-acre high-yield wheat cultivation with modern equipment access.', 4500.00, 250, 190, 'Ludhiana, Punjab', 'https://via.placeholder.com/400x250?text=Punjab+Wheat');

-- BrickShare
INSERT INTO assets (title, category, description, price_per_share, total_shares, available_shares, location, image_url) VALUES
('Bengaluru Tech Park Office', 'brickshare', 'Grade A commercial office space in Whitefield IT corridor.', 25000.00, 500, 380, 'Whitefield, Bengaluru', 'https://via.placeholder.com/400x250?text=Tech+Park'),
('Mumbai Sea-View Apartment', 'brickshare', 'Luxury 3BHK in Worli with direct Arabian Sea views.', 50000.00, 400, 210, 'Worli, Mumbai', 'https://via.placeholder.com/400x250?text=Worli+Flat'),
('Hyderabad Retail Plaza', 'brickshare', 'High-footfall retail space in HITEC City commercial strip.', 18000.00, 600, 440, 'HITEC City, Hyderabad', 'https://via.placeholder.com/400x250?text=Retail+Plaza');

-- LuxShare
INSERT INTO assets (title, category, description, price_per_share, total_shares, available_shares, location, image_url) VALUES
('Lamborghini Huracan EVO', 'luxshare', '2023 Lamborghini Huracan EVO. Available for weekend drives and events.', 15000.00, 100, 72, 'Bengaluru, Karnataka', 'https://via.placeholder.com/400x250?text=Lamborghini'),
('Rolls-Royce Ghost 2024', 'luxshare', 'Ultra-luxury saloon. Chauffeur-driven rental and fractional ownership.', 30000.00, 150, 90, 'Mumbai, Maharashtra', 'https://via.placeholder.com/400x250?text=Rolls+Royce'),
('Vintage Royal Enfield Collection', 'luxshare', 'Curated set of 5 restored vintage Royal Enfields. Collectible-grade.', 3000.00, 80, 55, 'Pune, Maharashtra', 'https://via.placeholder.com/400x250?text=Royal+Enfield');

-- Daily Rentals
INSERT INTO assets (title, category, description, price_per_share, total_shares, available_shares, location, image_url) VALUES
('Goa Beach Villa — 4BHK', 'dailyrentals', 'Private pool villa 200m from Baga Beach. Available daily and weekly.', 2000.00, 60, 45, 'Baga, Goa', 'https://via.placeholder.com/400x250?text=Goa+Villa'),
('Ferrari 458 Italia Daily', 'dailyrentals', 'Drive a Ferrari for a day. Includes insurance and 200km limit.', 5000.00, 40, 28, 'Bengaluru, Karnataka', 'https://via.placeholder.com/400x250?text=Ferrari'),
('Manali Mountain Chalet', 'dailyrentals', 'Cozy 3BR wooden chalet with valley views. Perfect winter getaway.', 1500.00, 50, 38, 'Manali, Himachal Pradesh', 'https://via.placeholder.com/400x250?text=Manali+Chalet');

-- TruckShare (Logistics)
INSERT INTO assets (title, category, description, price_per_share, total_shares, available_shares, location, image_url) VALUES
('18-Wheeler Fleet — Pan India', 'truckshare', 'Fleet of 10 heavy-duty trucks operating Mumbai–Delhi freight corridor.', 10000.00, 300, 210, 'Pan India', 'https://via.placeholder.com/400x250?text=Truck+Fleet'),
('Cold Chain Reefer Unit', 'truckshare', 'Refrigerated logistics vehicle for pharma and dairy supply chains.', 12000.00, 200, 155, 'Pune, Maharashtra', 'https://via.placeholder.com/400x250?text=Cold+Chain'),
('Last-Mile Delivery Fleet', 'truckshare', 'Network of 50 electric cargo bikes for urban last-mile delivery.', 2000.00, 400, 310, 'Bengaluru, Karnataka', 'https://via.placeholder.com/400x250?text=Last+Mile');
