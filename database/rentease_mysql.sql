-- RentEase Database Schema for MySQL/phpMyAdmin
-- Generated from Supabase PostgreSQL schema

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Database: `rentease`
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `rentease` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `rentease`;

-- --------------------------------------------------------
-- Table structure for table `profiles`
-- --------------------------------------------------------

CREATE TABLE `profiles` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `full_name` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `avatar_url` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `properties`
-- --------------------------------------------------------

CREATE TABLE `properties` (
  `id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `property_type` ENUM('apartment', 'office', 'studio', 'penthouse', 'commercial') NOT NULL DEFAULT 'apartment',
  `status` ENUM('available', 'rented', 'maintenance') NOT NULL DEFAULT 'available',
  `price` DECIMAL(12, 2) NOT NULL,
  `bedrooms` INT DEFAULT 1,
  `bathrooms` INT DEFAULT 1,
  `area_sqft` INT DEFAULT NULL,
  `address` VARCHAR(500) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) DEFAULT NULL,
  `zip_code` VARCHAR(20) DEFAULT NULL,
  `country` VARCHAR(100) DEFAULT 'USA',
  `latitude` DECIMAL(10, 8) DEFAULT NULL,
  `longitude` DECIMAL(11, 8) DEFAULT NULL,
  `amenities` JSON DEFAULT NULL,
  `images` JSON DEFAULT NULL,
  `featured` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `rentals`
-- --------------------------------------------------------

CREATE TABLE `rentals` (
  `id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  `user_id` VARCHAR(36) NOT NULL,
  `property_id` VARCHAR(36) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected', 'completed') NOT NULL DEFAULT 'pending',
  `total_amount` DECIMAL(12, 2) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_rentals_user` (`user_id`),
  KEY `fk_rentals_property` (`property_id`),
  CONSTRAINT `fk_rentals_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `saved_properties`
-- --------------------------------------------------------

CREATE TABLE `saved_properties` (
  `id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  `user_id` VARCHAR(36) NOT NULL,
  `property_id` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_property` (`user_id`, `property_id`),
  KEY `fk_saved_property` (`property_id`),
  CONSTRAINT `fk_saved_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `contact_messages`
-- --------------------------------------------------------

CREATE TABLE `contact_messages` (
  `id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Sample Data for properties table
-- --------------------------------------------------------

INSERT INTO `properties` (`id`, `title`, `description`, `property_type`, `status`, `price`, `bedrooms`, `bathrooms`, `area_sqft`, `address`, `city`, `state`, `zip_code`, `country`, `amenities`, `images`, `featured`) VALUES
(UUID(), 'Modern Downtown Apartment', 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.', 'apartment', 'available', 2500.00, 2, 2, 1200, '123 Main Street', 'New York', 'NY', '10001', 'USA', '["WiFi", "Gym", "Parking", "Pool"]', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', TRUE),
(UUID(), 'Cozy Studio Loft', 'Perfect studio for young professionals with modern amenities.', 'studio', 'available', 1500.00, 1, 1, 600, '456 Oak Avenue', 'Los Angeles', 'CA', '90001', 'USA', '["WiFi", "Laundry", "Pet Friendly"]', '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"]', FALSE),
(UUID(), 'Luxury Penthouse Suite', 'Exclusive penthouse with panoramic views and premium finishes.', 'penthouse', 'available', 8000.00, 4, 3, 3500, '789 Skyline Blvd', 'Miami', 'FL', '33101', 'USA', '["WiFi", "Gym", "Pool", "Concierge", "Rooftop Terrace"]', '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"]', TRUE),
(UUID(), 'Professional Office Space', 'Modern office space perfect for startups and small teams.', 'office', 'available', 3500.00, 0, 2, 2000, '321 Business Park', 'San Francisco', 'CA', '94102', 'USA', '["WiFi", "Meeting Rooms", "Kitchen", "24/7 Access"]', '["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"]', FALSE),
(UUID(), 'Commercial Retail Space', 'Prime retail location with high foot traffic.', 'commercial', 'available', 5000.00, 0, 1, 1800, '555 Shopping Plaza', 'Chicago', 'IL', '60601', 'USA', '["WiFi", "Storage", "Loading Dock"]', '["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"]', TRUE);
